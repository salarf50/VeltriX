import { APP_ASSETS } from './generated-assets';
import { configuredSupportLinks, flushNotificationOutbox, queueAdminNotice, supportLinks, type NotificationEnv } from './notifications';

type Ctx = import('@cloudflare/workers-types').ExecutionContext;

type Env = NotificationEnv;

interface UserRow {
  id: string;
  name: string;
  workshop: string;
  is_admin: number;
  disabled: number;
  subscription_expires_at: string | null;
  registration_notified?: number;
}

const FREE_LIMIT = 2;
const SESSION_DAYS = 30;
const PRIVACY_VERSION = '1.0';
const NO_STORE = 'no-store, max-age=0';
const PERSIAN_DIGITS: Record<string, string> = {
  '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4', '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9',
  '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4', '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9'
};

function json(data: unknown, status = 200, headers: HeadersInit = {}): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': NO_STORE,
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'no-referrer',
      ...headers
    }
  });
}

function errorResponse(code: string, message: string, status: number, extra: Record<string, unknown> = {}): Response {
  return json({ ok: false, code, message, ...extra }, status);
}

function isLocalHost(hostname: string): boolean {
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1';
}

function missingProductionConfig(env: Env): string[] {
  const missing: string[] = [];
  if (!env.TELEGRAM_BRIDGE_SECRET) missing.push('TELEGRAM_BRIDGE_SECRET');
  if (!env.BALEH_BRIDGE_SECRET) missing.push('BALEH_BRIDGE_SECRET');
  if (!env.TELEGRAM_BOT) missing.push('TELEGRAM_BOT_SERVICE');
  if (!env.BALEH_BOT) missing.push('BALEH_BOT_SERVICE');
  return missing;
}

function ensureBrowserOrigin(request: Request): boolean {
  const origin = request.headers.get('Origin');
  if (!origin) return true;
  try { return new URL(origin).origin === new URL(request.url).origin; } catch { return false; }
}

async function readJson(request: Request): Promise<Record<string, unknown> | null> {
  const contentLength = Number(request.headers.get('Content-Length') || 0);
  if (contentLength > 16_384) return null;
  try {
    const value: unknown = await request.json();
    if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
    return value as Record<string, unknown>;
  } catch { return null; }
}

function normalizePhone(value: unknown): { display: string; normalized: string } | null {
  if (typeof value !== 'string') return null;
  const ascii = value.trim().replace(/[۰-۹٠-٩]/g, (digit) => PERSIAN_DIGITS[digit]);
  let digits = ascii.replace(/\D/g, '');
  if (digits.startsWith('00')) digits = digits.slice(2);
  if (digits.startsWith('0') && digits.length === 11) digits = `98${digits.slice(1)}`;
  if (digits.length < 8 || digits.length > 15) return null;
  return { display: ascii.slice(0, 24), normalized: digits };
}

function cleanText(value: unknown, maxLength: number): string | null {
  if (typeof value !== 'string') return null;
  const text = value.trim().replace(/[\u0000-\u001f\u007f]/g, '');
  if (!text || text.length > maxLength) return null;
  return text;
}

async function sha256(value: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

function randomToken(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function currentMonth(): { key: string; label: string } {
  const now = new Date();
  const keyParts = new Intl.DateTimeFormat('en-US-u-ca-persian-nu-latn', {
    timeZone: 'Asia/Tehran', year: 'numeric', month: '2-digit'
  }).formatToParts(now);
  const year = keyParts.find((part) => part.type === 'year')?.value || '0000';
  const month = keyParts.find((part) => part.type === 'month')?.value || '00';
  const label = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
    timeZone: 'Asia/Tehran', year: 'numeric', month: 'long'
  }).format(now);
  return { key: `${year}-${month.padStart(2, '0')}`, label };
}

async function applyRateLimit(env: Env, request: Request, keySuffix: string, limit: number, windowMs: number): Promise<boolean> {
  const rawIp = request.headers.get('CF-Connecting-IP') || 'local';
  const salt = env.TELEGRAM_BRIDGE_SECRET || env.BALEH_BRIDGE_SECRET || 'local-development-only';
  const rateKey = await sha256(`${salt}:${keySuffix}:${rawIp}`);
  const now = Date.now();
  const windowStart = Math.floor(now / windowMs) * windowMs;
  const row = await env.DB.prepare(
    `INSERT INTO rate_limits(rate_key, window_start, hits) VALUES(?, ?, 1)
     ON CONFLICT(rate_key) DO UPDATE SET
       hits = CASE WHEN rate_limits.window_start < excluded.window_start THEN 1 ELSE rate_limits.hits + 1 END,
       window_start = MAX(rate_limits.window_start, excluded.window_start)
     RETURNING hits`
  ).bind(rateKey, windowStart).first<{ hits: number }>();
  if (Math.random() < 0.01) {
    await env.DB.prepare('DELETE FROM rate_limits WHERE window_start < ?').bind(now - 7 * 24 * 60 * 60 * 1000).run();
    await env.DB.prepare('DELETE FROM sessions WHERE expires_at < ?').bind(new Date(now).toISOString()).run();
  }
  return (row?.hits || 0) > limit;
}

function readSessionToken(request: Request): string | null {
  const cookieHeader = request.headers.get('Cookie') || '';
  for (const part of cookieHeader.split(';')) {
    const [name, ...valueParts] = part.trim().split('=');
    if (name !== 'vx_session') continue;
    const token = valueParts.join('=');
    return /^[A-Za-z0-9_-]{32,128}$/.test(token) ? token : null;
  }
  return null;
}

function sessionCookie(token: string, maxAge: number): string {
  return `vx_session=${token}; Path=/; Max-Age=${maxAge}; HttpOnly; Secure; SameSite=None`;
}

const CLEAR_SESSION_COOKIE = 'vx_session=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=None';

async function requireSession(request: Request, env: Env): Promise<{ user: UserRow; tokenHash: string } | null> {
  const token = readSessionToken(request);
  if (!token) return null;
  const tokenHash = await sha256(token);
  const row = await env.DB.prepare(
    `SELECT u.id, u.name, u.workshop, u.is_admin, u.disabled, u.subscription_expires_at
     FROM sessions s JOIN users u ON u.id = s.user_id
     WHERE s.token_hash = ? AND s.expires_at > ? AND u.disabled = 0 LIMIT 1`
  ).bind(tokenHash, new Date().toISOString()).first<UserRow>();
  if (!row) return null;
  await env.DB.prepare('UPDATE users SET last_seen_at = ? WHERE id = ?').bind(new Date().toISOString(), row.id).run();
  return { user: row, tokenHash };
}

function subscriptionActive(user: UserRow): boolean {
  return Boolean(user.subscription_expires_at && user.subscription_expires_at > new Date().toISOString());
}

async function getUsage(env: Env, userId: string, monthKey: string): Promise<number> {
  const row = await env.DB.prepare(
    'SELECT COUNT(*) AS used FROM usage_events WHERE user_id = ? AND month_key = ? AND counts_against_quota = 1'
  ).bind(userId, monthKey).first<{ used: number }>();
  return Number(row?.used || 0);
}

async function handleRegister(request: Request, env: Env, local: boolean): Promise<Response> {
  if (request.method !== 'POST') return errorResponse('METHOD_NOT_ALLOWED', 'روش درخواست پشتیبانی نمی‌شود.', 405);
  if (!ensureBrowserOrigin(request)) return errorResponse('ORIGIN_REJECTED', 'مبدأ درخواست معتبر نیست.', 403);
  if (!local) {
    const missing = missingProductionConfig(env);
    if (missing.length) return errorResponse('CONFIG_MISSING', 'پیکربندی امن اپ کامل نشده است.', 503, { missing });
  }
  if (await applyRateLimit(env, request, 'register', 8, 10 * 60 * 1000)) {
    return errorResponse('RATE_LIMITED', 'تعداد تلاش‌ها زیاد است؛ چند دقیقه بعد دوباره امتحان کنید.', 429);
  }
  const body = await readJson(request);
  if (!body) return errorResponse('INVALID_BODY', 'اطلاعات درخواست معتبر نیست.', 400);
  const name = cleanText(body.name, 100);
  const workshop = cleanText(body.workshop, 120);
  const phone = normalizePhone(body.phone);
  if (!name || !workshop || !phone) return errorResponse('INVALID_PROFILE', 'نام، کارگاه و شماره تلفن معتبر لازم است.', 400);
  if (body.privacyAccepted !== true) return errorResponse('CONSENT_REQUIRED', 'پذیرش جداگانهٔ حریم خصوصی لازم است.', 400);
  const now = new Date().toISOString();
  let user = await env.DB.prepare(
    'SELECT id, name, workshop, is_admin, disabled, subscription_expires_at, registration_notified FROM users WHERE phone_normalized = ? LIMIT 1'
  ).bind(phone.normalized).first<UserRow>();
  let isNew = false;
  if (!user) {
    const id = crypto.randomUUID();
    try {
      await env.DB.prepare(
        `INSERT INTO users(id, name, workshop, phone, phone_normalized, follow_confirmed, privacy_accepted, privacy_accepted_at, privacy_version, is_admin, created_at, last_seen_at, registration_notified)
         VALUES(?, ?, ?, ?, ?, ?, 1, ?, ?, 0, ?, ?, 0)`
      ).bind(id, name, workshop, phone.display, phone.normalized, body.followConfirmed === true ? 1 : 0, now, PRIVACY_VERSION, now, now).run();
      user = { id, name, workshop, is_admin: 0, disabled: 0, subscription_expires_at: null, registration_notified: 0 };
      isNew = true;
    } catch {
      user = await env.DB.prepare(
        'SELECT id, name, workshop, is_admin, disabled, subscription_expires_at, registration_notified FROM users WHERE phone_normalized = ? LIMIT 1'
      ).bind(phone.normalized).first<UserRow>();
      if (!user) return errorResponse('REGISTRATION_FAILED', 'ثبت‌نام انجام نشد؛ دوباره تلاش کنید.', 409);
    }
  }
  if (!user || user.disabled) return errorResponse('ACCOUNT_UNAVAILABLE', 'این حساب در دسترس نیست.', 403);
  await env.DB.prepare(
    `UPDATE users SET privacy_accepted = 1, privacy_accepted_at = ?, privacy_version = ?,
     follow_confirmed = CASE WHEN ? = 1 THEN 1 ELSE follow_confirmed END, last_seen_at = ? WHERE id = ?`
  ).bind(now, PRIVACY_VERSION, body.followConfirmed === true ? 1 : 0, now, user.id).run();
  if (!local && !user.registration_notified) {
    try {
      await queueAdminNotice(env, user.id, `registration:${user.id}`, 'registration', `VeltriX Mold Cost — ثبت‌نام کاربر\nشناسه حساب: ${user.id}\nزمان: ${now}`);
    } catch {
      console.error('registration notice queue failed');
    }
  }
  const token = randomToken();
  const tokenHash = await sha256(token);
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000).toISOString();
  await env.DB.prepare('INSERT INTO sessions(token_hash, user_id, created_at, expires_at) VALUES(?, ?, ?, ?)')
    .bind(tokenHash, user.id, now, expiresAt).run();
  return json({ ok: true, expiresAt, isNew, user: { id: user.id, name: user.name, workshop: user.workshop } }, 200, {
    'Set-Cookie': sessionCookie(token, SESSION_DAYS * 24 * 60 * 60)
  });
}

async function handleStatus(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'GET') return errorResponse('METHOD_NOT_ALLOWED', 'روش درخواست پشتیبانی نمی‌شود.', 405);
  const session = await requireSession(request, env);
  if (!session) return errorResponse('UNAUTHORIZED', 'نشست معتبر نیست؛ دوباره ثبت‌نام کنید.', 401);
  if (await applyRateLimit(env, request, `status:${session.user.id}`, 60, 60 * 1000)) {
    return errorResponse('RATE_LIMITED', 'درخواست‌های پیاپی زیاد است.', 429);
  }
  const month = currentMonth();
  const used = await getUsage(env, session.user.id, month.key);
  const isAdmin = session.user.is_admin === 1;
  const active = subscriptionActive(session.user);
  return json({
    ok: true,
    user: { id: session.user.id, name: session.user.name, workshop: session.user.workshop },
    monthKey: month.key,
    monthLabel: month.label,
    used,
    freeLimit: FREE_LIMIT,
    remaining: Math.max(0, FREE_LIMIT - used),
    isAdmin,
    adminPending: !isAdmin && !active,
    subscriptionActive: active,
    subscriptionExpiresAt: session.user.subscription_expires_at,
    ...configuredSupportLinks(env)
  });
}

async function handleUse(request: Request, env: Env, local: boolean): Promise<Response> {
  if (request.method !== 'POST') return errorResponse('METHOD_NOT_ALLOWED', 'روش درخواست پشتیبانی نمی‌شود.', 405);
  if (!ensureBrowserOrigin(request)) return errorResponse('ORIGIN_REJECTED', 'مبدأ درخواست معتبر نیست.', 403);
  if (!local) {
    const missing = missingProductionConfig(env);
    if (missing.length) return errorResponse('CONFIG_MISSING', 'پیکربندی امن اپ کامل نشده است.', 503, { missing });
  }
  const session = await requireSession(request, env);
  if (!session) return errorResponse('UNAUTHORIZED', 'نشست معتبر نیست؛ دوباره ثبت‌نام کنید.', 401);
  if (await applyRateLimit(env, request, `use:${session.user.id}`, 30, 60 * 1000)) {
    return errorResponse('RATE_LIMITED', 'تعداد درخواست‌های پیاپی زیاد است.', 429);
  }
  const body = await readJson(request);
  const requestId = typeof body?.requestId === 'string' && /^[a-f0-9-]{32,36}$/i.test(body.requestId) ? body.requestId : null;
  if (!requestId) return errorResponse('INVALID_REQUEST_ID', 'شناسهٔ درخواست معتبر نیست.', 400);
  const duplicate = await env.DB.prepare('SELECT id FROM usage_events WHERE user_id = ? AND request_id = ? LIMIT 1')
    .bind(session.user.id, requestId).first<{ id: number }>();
  if (duplicate) return json({ ok: true, alreadyUsed: true, ...await usagePayload(env, session.user) });

  const month = currentMonth();
  const now = new Date().toISOString();
  const inserted = await env.DB.prepare(
    `INSERT INTO usage_events(user_id, month_key, used_at, request_id, counts_against_quota)
     SELECT u.id, ?, ?, ?,
       CASE WHEN u.is_admin = 1 OR (u.subscription_expires_at IS NOT NULL AND u.subscription_expires_at > ?) THEN 0 ELSE 1 END
     FROM users u
     WHERE u.id = ? AND u.disabled = 0
       AND NOT EXISTS (SELECT 1 FROM usage_events e WHERE e.user_id = u.id AND e.request_id = ?)
       AND (
         u.is_admin = 1
         OR (u.subscription_expires_at IS NOT NULL AND u.subscription_expires_at > ?)
         OR (SELECT COUNT(*) FROM usage_events e WHERE e.user_id = u.id AND e.month_key = ? AND e.counts_against_quota = 1) < ?
       )`
  ).bind(month.key, now, requestId, now, session.user.id, requestId, now, month.key, FREE_LIMIT).run();

  if (Number(inserted.meta.changes || 0) !== 1) {
    const fresh = await env.DB.prepare('SELECT id, name, workshop, is_admin, disabled, subscription_expires_at FROM users WHERE id = ?')
      .bind(session.user.id).first<UserRow>();
    if (!fresh || fresh.disabled) return errorResponse('ACCOUNT_UNAVAILABLE', 'این حساب در دسترس نیست.', 403);
    const used = await getUsage(env, fresh.id, month.key);
    const allowed = fresh.is_admin === 1 || subscriptionActive(fresh);
    if (!allowed && used >= FREE_LIMIT) {
      return errorResponse('QUOTA_EXCEEDED', 'سهمیهٔ رایگان این ماه تمام شده است.', 429, configuredSupportLinks(env));
    }
    return errorResponse('USE_NOT_RECORDED', 'ثبت استفاده انجام نشد؛ دوباره تلاش کنید.', 503);
  }

  if (!local) {
    const after = await usagePayload(env, session.user);
    try {
      await queueAdminNotice(env, session.user.id, `usage:${session.user.id}:${requestId}`, 'usage', `VeltriX Mold Cost — استفاده از برآورد\nشناسه حساب: ${session.user.id}\nزمان: ${now}\nتعداد برآوردهای این ماه: ${after.totalUsed}؛ سهمیهٔ مصرفی: ${after.used}${after.unlimited ? ' (اشتراک/مدیر)' : ` از ${FREE_LIMIT}`}`);
    } catch {
      console.error('usage notice queue failed');
    }
  }
  return json({ ok: true, ...await usagePayload(env, session.user) });
}

async function usagePayload(env: Env, user: UserRow): Promise<Record<string, unknown>> {
  const month = currentMonth();
  const used = await getUsage(env, user.id, month.key);
  const totalRow = await env.DB.prepare('SELECT COUNT(*) AS total FROM usage_events WHERE user_id = ? AND month_key = ?')
    .bind(user.id, month.key).first<{ total: number }>();
  const totalUsed = Number(totalRow?.total || 0);
  const unlimited = user.is_admin === 1 || subscriptionActive(user);
  return {
    monthKey: month.key,
    used,
    totalUsed,
    freeLimit: FREE_LIMIT,
    remaining: unlimited ? null : Math.max(0, FREE_LIMIT - used),
    unlimited
  };
}

async function handleLogout(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST' || !ensureBrowserOrigin(request)) return errorResponse('ORIGIN_REJECTED', 'درخواست معتبر نیست.', 403);
  const token = readSessionToken(request);
  if (token) await env.DB.prepare('DELETE FROM sessions WHERE token_hash = ?').bind(await sha256(token)).run();
  return json({ ok: true }, 200, { 'Set-Cookie': CLEAR_SESSION_COOKIE });
}

async function handleDeleteAccount(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST' || !ensureBrowserOrigin(request)) return errorResponse('ORIGIN_REJECTED', 'درخواست معتبر نیست.', 403);
  const session = await requireSession(request, env);
  if (!session) return errorResponse('UNAUTHORIZED', 'نشست معتبر نیست.', 401);
  await env.DB.prepare('DELETE FROM users WHERE id = ?').bind(session.user.id).run();
  return json({ ok: true }, 200, { 'Set-Cookie': CLEAR_SESSION_COOKIE });
}

function secretEquals(provided: string, expected?: string): boolean {
  if (!expected || provided.length !== expected.length) return false;
  let difference = 0;
  for (let index = 0; index < expected.length; index += 1) difference |= provided.charCodeAt(index) ^ expected.charCodeAt(index);
  return difference === 0;
}

async function handleBotCommand(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST') return errorResponse('METHOD_NOT_ALLOWED', 'روش درخواست پشتیبانی نمی‌شود.', 405);
  const body = await readJson(request);
  const channel = body?.channel === 'telegram' || body?.channel === 'bale' ? body.channel : null;
  const expected = channel === 'telegram' ? env.TELEGRAM_BRIDGE_SECRET : channel === 'bale' ? env.BALEH_BRIDGE_SECRET : undefined;
  if (!channel || !secretEquals(request.headers.get('X-VeltriX-Bridge-Secret') || '', expected)) {
    return errorResponse('FORBIDDEN', 'درخواست داخلی معتبر نیست.', 403);
  }
  const commandText = cleanText(body?.commandText, 500);
  const actorId = typeof body?.actorId === 'string' && /^[A-Za-z0-9_-]{1,40}$/.test(body.actorId) ? body.actorId : null;
  if (!commandText || !actorId) return errorResponse('INVALID_COMMAND', 'فرمان معتبر نیست.', 400);
  const parts = commandText.split(/\s+/);
  const command = parts[0].split('@')[0].toLowerCase();

  if (command === '/activate') {
    const userId = parts[1];
    const days = Number(parts[2]);
    if (parts.length !== 3 || !/^[0-9a-f-]{36}$/i.test(userId || '') || !Number.isInteger(days) || days < 1 || days > 3650) {
      return json({ ok: true, message: 'فرمت درست: /activate USER_ID DAYS (روز بین ۱ تا ۳۶۵۰)' });
    }
    const user = await env.DB.prepare('SELECT id, subscription_expires_at FROM users WHERE id = ? LIMIT 1')
      .bind(userId).first<{ id: string; subscription_expires_at: string | null }>();
    if (!user) return json({ ok: true, message: 'شناسهٔ حساب پیدا نشد.' });
    const nowMs = Date.now();
    const currentExpiry = user.subscription_expires_at ? Date.parse(user.subscription_expires_at) : 0;
    const expiresAt = new Date(Math.max(nowMs, Number.isFinite(currentExpiry) ? currentExpiry : 0) + days * 24 * 60 * 60 * 1000).toISOString();
    const now = new Date(nowMs).toISOString();
    await env.DB.batch([
      env.DB.prepare('UPDATE users SET subscription_expires_at = ? WHERE id = ?').bind(expiresAt, userId),
      env.DB.prepare('INSERT INTO subscription_log(user_id, activated_at, expires_at, activated_by) VALUES(?, ?, ?, ?)').bind(userId, now, expiresAt, `${channel}:${actorId}`)
    ]);
    return json({ ok: true, message: `اشتراک فعال شد.\nشناسه: ${userId}\nانقضا: ${expiresAt}` });
  }

  if ((command === '/admin' || command === '/demote') && parts.length === 2 && /^[0-9a-f-]{36}$/i.test(parts[1])) {
    const isAdmin = command === '/admin' ? 1 : 0;
    const result = await env.DB.prepare('UPDATE users SET is_admin = ? WHERE id = ?').bind(isAdmin, parts[1]).run();
    const message = Number(result.meta.changes || 0)
      ? (isAdmin ? `مدیر تأییدشده شد: ${parts[1]}` : `دسترسی مدیر حذف شد: ${parts[1]}`)
      : 'شناسهٔ حساب پیدا نشد.';
    return json({ ok: true, message });
  }
  return json({ ok: true, message: 'فرمان‌ها: /activate USER_ID DAYS ، /admin USER_ID ، /demote USER_ID' });
}

function staticResponse(pathname: string): Response {
  const asset = APP_ASSETS[pathname];
  if (!asset) return new Response('Not Found', { status: 404, headers: { 'Cache-Control': NO_STORE } });
  const extension = pathname.split('.').pop()?.toLowerCase();
  const contentType = extension === 'html' || pathname === '/' ? 'text/html; charset=utf-8'
    : extension === 'css' ? 'text/css; charset=utf-8'
    : extension === 'js' ? 'text/javascript; charset=utf-8'
    : extension === 'webmanifest' ? 'application/manifest+json; charset=utf-8'
    : extension === 'json' ? 'application/json; charset=utf-8'
    : extension === 'png' ? 'image/png'
    : extension === 'jpg' || extension === 'jpeg' ? 'image/jpeg'
    : 'application/octet-stream';
  const body = asset.encoding === 'base64'
    ? Uint8Array.from(atob(asset.body), (character) => character.charCodeAt(0))
    : asset.body;
  const cacheControl = pathname === '/' || pathname.endsWith('.html') || pathname.endsWith('.webmanifest') || pathname === '/sw.js'
    ? 'no-cache'
    : 'public, max-age=3600';
  return new Response(body, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': cacheControl,
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'no-referrer',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; manifest-src 'self'; worker-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests"
    }
  });
}

async function route(request: Request, env: Env, ctx: Ctx): Promise<Response> {
  const url = new URL(request.url);
  const local = isLocalHost(url.hostname);
  if (url.pathname === '/health' && request.method === 'GET') {
    const missing = local ? [] : missingProductionConfig(env);
    return json({ ok: missing.length === 0, app: 'veltrix-mold-cost', missing }, missing.length ? 503 : 200);
  }
  if (url.pathname === '/api/register') return handleRegister(request, env, local);
  if (url.pathname === '/api/support' && request.method === 'GET') {
    const links = await supportLinks(env, local);
    return json({ ok: true, telegramUrl: links.supportUrl, baleUrl: links.baleSupportUrl });
  }
  if (url.pathname === '/api/status') return handleStatus(request, env);
  if (url.pathname === '/api/use') return handleUse(request, env, local);
  if (url.pathname === '/api/logout') return handleLogout(request, env);
  if (url.pathname === '/api/account/delete') return handleDeleteAccount(request, env);
  if (url.pathname === '/internal/mold-cost/command') return handleBotCommand(request, env);
  if (request.method === 'GET' || request.method === 'HEAD') return staticResponse(url.pathname === '/' ? '/' : url.pathname);
  return errorResponse('METHOD_NOT_ALLOWED', 'روش درخواست پشتیبانی نمی‌شود.', 405);
}

export default {
  async fetch(request: Request, env: Env, ctx: Ctx): Promise<Response> {
    try {
      return await route(request, env, ctx);
    } catch {
      return errorResponse('INTERNAL_ERROR', 'خطای داخلی رخ داد؛ دوباره تلاش کنید.', 500);
    }
  },
  async scheduled(_controller: unknown, env: Env, ctx: Ctx): Promise<void> {
    ctx.waitUntil(flushNotificationOutbox(env, 40).catch(() => undefined));
  }
};
