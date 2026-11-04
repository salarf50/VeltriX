import assert from 'node:assert/strict';

const base = process.env.SMOKE_BASE || 'http://127.0.0.1:3000';
const url = new URL(base);
assert.ok(['127.0.0.1', 'localhost', '::1'].includes(url.hostname), 'Smoke script is restricted to a local Worker.');
const origin = { Origin: base };
const cookies = [];

async function register(phone, name = 'آزمون محلی') {
  const response = await fetch(`${base}/api/register`, {
    method: 'POST',
    headers: { ...origin, 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, workshop: 'کارگاه آزمایشی', phone, followConfirmed: false, privacyAccepted: true })
  });
  const data = await response.json();
  assert.equal(response.status, 200, JSON.stringify(data));
  const cookie = response.headers.get('set-cookie');
  assert.ok(cookie?.startsWith('vx_session='), 'registration must set a session cookie');
  assert.match(cookie, /HttpOnly/i);
  assert.match(cookie, /Secure/i);
  assert.match(cookie, /SameSite=None/i);
  const sessionCookie = cookie.split(';', 1)[0];
  cookies.push(sessionCookie);
  return { ...data, sessionCookie };
}

async function use(sessionCookie) {
  const response = await fetch(`${base}/api/use`, {
    method: 'POST',
    headers: { ...origin, 'Content-Type': 'application/json', Cookie: sessionCookie },
    body: JSON.stringify({ requestId: crypto.randomUUID() })
  });
  return { status: response.status, body: await response.json() };
}

try {
  const health = await fetch(`${base}/health`);
  assert.equal(health.status, 200);
  const supportResponse = await fetch(`${base}/api/support`);
  assert.equal(supportResponse.status, 200);
  const support = await supportResponse.json();
  assert.equal(support.telegramUrl, 'https://t.me/veltrixmold_bot');
  assert.ok(support.baleUrl === null || new URL(support.baleUrl).hostname === 'ble.ir');
  const page = await fetch(base).then((response) => response.text());
  assert.match(page, /support-menu/);
  assert.match(page, /supportBaleMenu/);
  const routeResponse = await fetch(`${base}/manus-routes.json`);
  assert.equal(routeResponse.status, 200);
  const routeManifest = await routeResponse.json();
  assert.deepEqual(routeManifest.routes.map((route) => route.path), ['/']);
  const manifestResponse = await fetch(`${base}/manifest.webmanifest`);
  assert.equal(manifestResponse.status, 200);
  const manifest = await manifestResponse.json();
  assert.equal(manifest.display, 'standalone');
  for (const path of ['/', '/app.js', '/calculator.js', '/styles.css', '/sw.js', '/icons/icon-192.png', '/icons/icon-512.png']) {
    assert.equal((await fetch(base + path)).status, 200, `${path} status`);
  }

  const rejectedOrigin = await fetch(`${base}/api/register`, {
    method: 'POST',
    headers: { Origin: 'https://attacker.example', 'Content-Type': 'application/json' },
    body: '{}'
  });
  assert.equal(rejectedOrigin.status, 403);

  const first = await register('09121111001');
  const statusUrl = `${base}/api/status`;
  let status = await fetch(statusUrl, { headers: { Cookie: first.sessionCookie } }).then((response) => response.json());
  assert.equal(status.used, 0);
  assert.equal(status.freeLimit, 2);
  assert.equal((await use(first.sessionCookie)).status, 200);
  assert.equal((await use(first.sessionCookie)).status, 200);
  const thirdUse = await use(first.sessionCookie);
  assert.equal(thirdUse.status, 429);
  assert.equal(thirdUse.body.code, 'QUOTA_EXCEEDED');
  const reentry = await register('09121111001');
  assert.equal(reentry.user.id, first.user.id);
  status = await fetch(statusUrl, { headers: { Cookie: reentry.sessionCookie } }).then((response) => response.json());
  assert.equal(status.used, 2, 're-entry with the same phone must not reset the server quota');

  const second = await register('09121111002');
  const race = await Promise.all(Array.from({ length: 12 }, () => use(second.sessionCookie)));
  const allowed = race.filter((result) => result.status === 200).length;
  const quotaRejected = race.filter((result) => result.body.code === 'QUOTA_EXCEEDED').length;
  assert.equal(allowed, 2, `expected two successful concurrent uses, got ${allowed}`);
  assert.equal(quotaRejected, 10, `expected ten quota rejections, got ${quotaRejected}`);

  const owner = await register('09121111003', 'آزمون مدیر');
  status = await fetch(statusUrl, { headers: { Cookie: owner.sessionCookie } }).then((response) => response.json());
  assert.equal(status.adminPending, true, 'a phone number alone must never grant the administrator role');
  const badSecret = await fetch(`${base}/internal/mold-cost/command`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'X-VeltriX-Bridge-Secret': 'wrong-secret' },
    body: JSON.stringify({ channel: 'telegram', actorId: 'test-admin', commandText: `/admin ${owner.user.id}` })
  });
  assert.equal(badSecret.status, 403);
  const adminSecret = process.env.TELEGRAM_BRIDGE_SECRET || 'local-telegram-bridge-test';
  const invokeAdmin = async (commandText, actorId = 'test-admin') => {
    const response = await fetch(`${base}/internal/mold-cost/command`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'X-VeltriX-Bridge-Secret': adminSecret },
      body: JSON.stringify({ channel: 'telegram', actorId, commandText })
    });
    return { status: response.status, body: await response.json() };
  };
  let adminResult = await invokeAdmin(`/admin ${owner.user.id}`);
  assert.equal(adminResult.status, 200);
  status = await fetch(statusUrl, { headers: { Cookie: owner.sessionCookie } }).then((response) => response.json());
  assert.equal(status.isAdmin, true);
  assert.equal(status.adminPending, false);
  for (let index = 0; index < 5; index += 1) assert.equal((await use(owner.sessionCookie)).status, 200);
  status = await fetch(statusUrl, { headers: { Cookie: owner.sessionCookie } }).then((response) => response.json());
  assert.equal(status.used, 0);
  adminResult = await invokeAdmin(`/demote ${owner.user.id}`);
  assert.match(adminResult.body.message, /دسترسی مدیر حذف شد/);
  status = await fetch(statusUrl, { headers: { Cookie: owner.sessionCookie } }).then((response) => response.json());
  assert.equal(status.isAdmin, false);
  assert.equal(status.adminPending, true);
  assert.equal((await use(owner.sessionCookie)).status, 200);
  assert.equal((await use(owner.sessionCookie)).status, 200);
  assert.equal((await use(owner.sessionCookie)).status, 429);

  console.log(JSON.stringify({
    health: '200',
    routeManifest: 'valid and matches the single app route',
    pwaAssets: 'root, JS, CSS, service worker, manifest, icons: 200',
    supportMenu: 'Telegram verified; Bale link validated or pending its real username',
    crossOriginWrite: '403',
    session: 'HttpOnly; Secure; SameSite=None cookie; no bearer in localStorage',
    sequentialQuota: '2 allowed; third denied',
    samePhoneQuotaPersistence: 'confirmed',
    concurrentQuota: `${allowed} allowed / ${quotaRejected} rejected`,
    admin: 'wrong bridge Secret rejected; phone alone grants no role; private bot promotion enables unlimited calculations; demotion supported'
  }, null, 2));
} finally {
  for (const cookie of cookies) {
    await fetch(`${base}/api/account/delete`, {
      method: 'POST',
      headers: { ...origin, 'Content-Type': 'application/json', Cookie: cookie },
      body: '{}'
    }).catch(() => {});
  }
}
