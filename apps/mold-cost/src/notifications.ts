type D1 = import('@cloudflare/workers-types').D1Database;
type BotChannel = 'telegram' | 'bale';

type WorkerService = { fetch(request: Request): Promise<Response> };

export interface NotificationEnv {
  DB: D1;
  TELEGRAM_BOT?: WorkerService;
  BALEH_BOT?: WorkerService;
  TELEGRAM_BRIDGE_SECRET?: string;
  BALEH_BRIDGE_SECRET?: string;
  TELEGRAM_SUPPORT_URL?: string;
  BALE_SUPPORT_URL?: string;
  ADMIN_PHONE?: string;
  ADMIN_NAME?: string;
}

interface OutboxRow {
  id: number;
  channel: BotChannel;
  message: string;
  attempts: number;
}

const CHANNELS: BotChannel[] = ['telegram', 'bale'];
const BRIDGE_HEADER = 'X-VeltriX-Bridge-Secret';
const DEFAULT_TELEGRAM_URL = 'https://t.me/veltrixmold_bot';
const BRIDGE_INFO_PATH = '/internal/mold-cost/info';
const BRIDGE_NOTIFY_PATH = '/internal/mold-cost/notify';

export function configuredSupportLinks(env: NotificationEnv): { supportUrl: string; baleSupportUrl: string | null } {
  return {
    supportUrl: safeTelegramUrl(env.TELEGRAM_SUPPORT_URL) || DEFAULT_TELEGRAM_URL,
    baleSupportUrl: safeBaleUrl(env.BALE_SUPPORT_URL)
  };
}

function safeTelegramUrl(value?: string): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || !['t.me', 'telegram.me'].includes(url.hostname.toLowerCase())) return null;
    return url.toString();
  } catch { return null; }
}

function safeBaleUrl(value?: string): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    const username = url.pathname.replace(/^\//, '').replace(/\/$/, '');
    if (url.protocol !== 'https:' || url.hostname.toLowerCase() !== 'ble.ir' || !/^[A-Za-z0-9_]{3,64}$/.test(username)) return null;
    if ([...url.searchParams.keys()].some((key) => key !== 'start')) return null;
    return url.toString();
  } catch { return null; }
}

function serviceFor(env: NotificationEnv, channel: BotChannel): WorkerService | undefined {
  return channel === 'telegram' ? env.TELEGRAM_BOT : env.BALEH_BOT;
}

function secretFor(env: NotificationEnv, channel: BotChannel): string | undefined {
  return channel === 'telegram' ? env.TELEGRAM_BRIDGE_SECRET : env.BALEH_BRIDGE_SECRET;
}

async function bridgeRequest(
  env: NotificationEnv,
  channel: BotChannel,
  path: string,
  method: 'GET' | 'POST',
  body?: Record<string, unknown>
): Promise<Response | null> {
  const service = serviceFor(env, channel);
  const secret = secretFor(env, channel);
  if (!service || !secret) return null;
  const headers = new Headers({ [BRIDGE_HEADER]: secret });
  let requestBody: string | undefined;
  if (body) {
    headers.set('Content-Type', 'application/json');
    requestBody = JSON.stringify(body);
  }
  return service.fetch(new Request(`https://mold-cost.internal${path}`, { method, headers, body: requestBody }));
}

export async function supportLinks(env: NotificationEnv, local: boolean): Promise<{ supportUrl: string; baleSupportUrl: string | null }> {
  const configured = configuredSupportLinks(env);
  let baleSupportUrl = configured.baleSupportUrl;
  if (!local) {
    try {
      const response = await bridgeRequest(env, 'bale', BRIDGE_INFO_PATH, 'GET');
      if (response?.ok) {
        const info = await response.json() as { ok?: boolean; username?: string };
        if (info.ok === true && typeof info.username === 'string' && /^[A-Za-z0-9_]{3,64}$/.test(info.username)) {
          baleSupportUrl = `https://ble.ir/${info.username}`;
        }
      }
    } catch { /* keep the configured verified link, if present */ }
  }
  return { ...configured, baleSupportUrl };
}

export async function queueAdminNotice(
  env: NotificationEnv,
  userId: string,
  eventKey: string,
  eventType: 'registration' | 'usage',
  message: string
): Promise<void> {
  const now = new Date().toISOString();
  const statements = CHANNELS.map((channel) => env.DB.prepare(
    `INSERT OR IGNORE INTO notification_outbox(event_key, user_id, event_type, channel, message, created_at, next_attempt_at)
     VALUES(?, ?, ?, ?, ?, ?, ?)`
  ).bind(eventKey, userId, eventType, channel, message, now, now));
  await env.DB.batch(statements);
  await flushNotificationOutbox(env, 8);
}

export async function flushNotificationOutbox(env: NotificationEnv, limit = 20): Promise<void> {
  const now = new Date().toISOString();
  const result = await env.DB.prepare(
    `SELECT id, channel, message, attempts FROM notification_outbox
     WHERE delivered_at IS NULL AND next_attempt_at <= ?
       AND (lease_until IS NULL OR lease_until < ?)
     ORDER BY id LIMIT ?`
  ).bind(now, now, Math.max(1, Math.min(limit, 50))).all<OutboxRow>();

  for (const row of result.results || []) {
    const claimedAt = new Date().toISOString();
    const leaseUntil = new Date(Date.now() + 2 * 60 * 1000).toISOString();
    const claim = await env.DB.prepare(
      `UPDATE notification_outbox SET lease_until = ?
       WHERE id = ? AND delivered_at IS NULL AND next_attempt_at <= ?
         AND (lease_until IS NULL OR lease_until < ?)`
    ).bind(leaseUntil, row.id, claimedAt, claimedAt).run();
    if (Number(claim.meta.changes || 0) !== 1) continue;

    try {
      const response = await bridgeRequest(env, row.channel, BRIDGE_NOTIFY_PATH, 'POST', { text: row.message });
      if (!response?.ok) throw new Error('bridge unavailable');
      const payload = await response.json() as { ok?: boolean };
      if (payload.ok !== true) throw new Error('bridge rejected');
      await env.DB.prepare(
        'UPDATE notification_outbox SET delivered_at = ?, attempts = attempts + 1, lease_until = NULL, last_error = NULL WHERE id = ?'
      ).bind(new Date().toISOString(), row.id).run();
    } catch {
      const delayMs = Math.min(6 * 60 * 60 * 1000, 60_000 * (2 ** Math.min(row.attempts, 8)));
      const retryAt = new Date(Date.now() + delayMs).toISOString();
      await env.DB.prepare(
        `UPDATE notification_outbox SET attempts = attempts + 1, next_attempt_at = ?,
         lease_until = NULL, last_error = 'DELIVERY_FAILED' WHERE id = ?`
      ).bind(retryAt, row.id).run();
    }
  }

  await env.DB.prepare(
    `UPDATE users SET registration_notified = 1
     WHERE registration_notified = 0
       AND EXISTS (SELECT 1 FROM notification_outbox n WHERE n.user_id = users.id AND n.event_type = 'registration')
       AND NOT EXISTS (SELECT 1 FROM notification_outbox n WHERE n.user_id = users.id AND n.event_type = 'registration' AND n.delivered_at IS NULL)`
  ).run();
}
