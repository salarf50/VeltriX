const BRIDGE_HEADER = 'X-VeltriX-Bridge-Secret';
const INTERNAL_ROOT = '/internal/mold-cost';

function response(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }
  });
}

function secretFor(env, channel) {
  return channel === 'telegram' ? env.TELEGRAM_BRIDGE_SECRET : env.BALEH_BRIDGE_SECRET;
}

export function constantTimeEqual(provided, expected) {
  if (typeof provided !== 'string' || !expected || provided.length !== expected.length) return false;
  let difference = 0;
  for (let index = 0; index < expected.length; index += 1) {
    difference |= provided.charCodeAt(index) ^ expected.charCodeAt(index);
  }
  return difference === 0;
}

export async function handleInternalMoldCostRequest(request, env, options) {
  const url = new URL(request.url);
  if (!url.pathname.startsWith(`${INTERNAL_ROOT}/`)) return null;

  const expected = secretFor(env, options.channel);
  const provided = request.headers.get(BRIDGE_HEADER) || '';
  if (!constantTimeEqual(provided, expected)) return response({ ok: false }, 404);

  if (request.method === 'GET' && url.pathname === `${INTERNAL_ROOT}/info`) {
    try {
      const result = await options.getMe();
      const username = result?.result?.username;
      if (result?.ok !== true || typeof username !== 'string' || !/^[A-Za-z0-9_]{3,64}$/.test(username)) {
        return response({ ok: false }, 503);
      }
      return response({ ok: true, username });
    } catch {
      return response({ ok: false }, 503);
    }
  }

  if (request.method === 'POST' && url.pathname === `${INTERNAL_ROOT}/notify`) {
    const length = Number(request.headers.get('Content-Length') || 0);
    if (length > 4096) return response({ ok: false }, 413);
    let body;
    try { body = await request.json(); } catch { return response({ ok: false }, 400); }
    const text = typeof body?.text === 'string' ? body.text.trim() : '';
    if (!text || text.length > 3000 || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(text)) {
      return response({ ok: false }, 400);
    }
    try {
      const result = await options.sendAdmin(options.adminChatId, text);
      if (result?.ok !== true) return response({ ok: false }, 502);
      return response({ ok: true });
    } catch {
      return response({ ok: false }, 502);
    }
  }

  return response({ ok: false }, 404);
}

export async function forwardMoldCostAdminCommand(env, update, options) {
  const message = update?.message;
  const text = typeof message?.text === 'string' ? message.text.trim() : '';
  const command = text.split(/\s+/, 1)[0].split('@')[0].toLowerCase();
  if (!['/activate', '/admin', '/demote'].includes(command)) return false;

  const chatId = message?.chat?.id;
  const actorId = message?.from?.id;
  if (chatId == null || String(chatId) !== String(options.adminChatId)) return false;
  if (actorId == null || String(actorId) !== String(options.adminUserId)) {
    await options.sendReply(chatId, 'فقط مدیر تأییدشده اجازهٔ اجرای این فرمان را دارد.');
    return true;
  }

  const secret = secretFor(env, options.channel);
  if (!secret || !env.MOLD_COST_APP) {
    await options.sendReply(chatId, 'سرویس برآورد موقتاً در دسترس نیست.');
    return true;
  }

  try {
    const responseFromApp = await env.MOLD_COST_APP.fetch(new Request('https://mold-cost.internal/internal/mold-cost/command', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', [BRIDGE_HEADER]: secret },
      body: JSON.stringify({ channel: options.channel, commandText: text, actorId: String(actorId) })
    }));
    const payload = await responseFromApp.json();
    if (!responseFromApp.ok || typeof payload?.message !== 'string') {
      await options.sendReply(chatId, 'اجرای فرمان انجام نشد؛ بعداً دوباره تلاش کنید.');
      return true;
    }
    await options.sendReply(chatId, payload.message);
  } catch {
    await options.sendReply(chatId, 'سرویس برآورد موقتاً در دسترس نیست.');
  }
  return true;
}
