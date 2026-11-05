import assert from 'node:assert/strict';
import test from 'node:test';
import { forwardMoldCostAdminCommand, handleInternalMoldCostRequest } from './mold-cost-bridge.js';

const secret = 'test-bridge-secret';
const headers = { 'X-VeltriX-Bridge-Secret': secret };

function decode(response) {
  return response.json();
}

test('internal info fails closed without the channel secret', async () => {
  let called = false;
  const response = await handleInternalMoldCostRequest(
    new Request('https://bot.example/internal/mold-cost/info'),
    { TELEGRAM_BRIDGE_SECRET: secret },
    { channel: 'telegram', adminChatId: '11', getMe: async () => { called = true; return { ok: true, result: { username: 'bot' } }; } }
  );
  assert.equal(response.status, 404);
  assert.equal(called, false);
});

test('internal info returns only a validated public bot username', async () => {
  const response = await handleInternalMoldCostRequest(
    new Request('https://bot.example/internal/mold-cost/info', { headers }),
    { TELEGRAM_BRIDGE_SECRET: secret },
    { channel: 'telegram', adminChatId: '11', getMe: async () => ({ ok: true, result: { username: 'veltrix_test_bot' } }) }
  );
  assert.deepEqual(await decode(response), { ok: true, username: 'veltrix_test_bot' });
});

test('notify accepts a bounded plain-text message and sends only to configured admin', async () => {
  let delivery;
  const response = await handleInternalMoldCostRequest(
    new Request('https://bot.example/internal/mold-cost/notify', {
      method: 'POST', headers: { ...headers, 'Content-Type': 'application/json' }, body: JSON.stringify({ text: 'استفادهٔ آزمایشی: ۱' })
    }),
    { BALEH_BRIDGE_SECRET: secret },
    { channel: 'bale', adminChatId: '22', getMe: async () => ({ ok: false }), sendAdmin: async (chatId, text) => { delivery = { chatId, text }; return { ok: true }; } }
  );
  assert.deepEqual(delivery, { chatId: '22', text: 'استفادهٔ آزمایشی: ۱' });
  assert.deepEqual(await decode(response), { ok: true });
});

test('admin command is not forwarded from an unapproved sender', async () => {
  let serviceCalled = false;
  const replies = [];
  const handled = await forwardMoldCostAdminCommand(
    { TELEGRAM_BRIDGE_SECRET: secret, MOLD_COST_APP: { fetch: async () => { serviceCalled = true; return new Response('{}'); } } },
    { message: { chat: { id: 11 }, from: { id: 12 }, text: '/activate 00000000-0000-4000-8000-000000000001 30' } },
    { channel: 'telegram', adminChatId: '11', adminUserId: '11', sendReply: async (chatId, text) => replies.push({ chatId, text }) }
  );
  assert.equal(handled, true);
  assert.equal(serviceCalled, false);
  assert.match(replies[0].text, /فقط مدیر تأییدشده/);
});

test('verified admin command uses the channel-specific secret and private service binding', async () => {
  let requestDetails;
  const replies = [];
  const handled = await forwardMoldCostAdminCommand(
    {
      TELEGRAM_BRIDGE_SECRET: secret,
      BALEH_BRIDGE_SECRET: 'different-secret',
      MOLD_COST_APP: { fetch: async (request) => {
        requestDetails = { url: request.url, method: request.method, secret: request.headers.get('X-VeltriX-Bridge-Secret'), body: await request.json() };
        return new Response(JSON.stringify({ message: 'اشتراک فعال شد.' }), { headers: { 'Content-Type': 'application/json' } });
      } }
    },
    { message: { chat: { id: 11 }, from: { id: 11 }, text: '/activate 00000000-0000-4000-8000-000000000001 30' } },
    { channel: 'telegram', adminChatId: '11', adminUserId: '11', sendReply: async (chatId, text) => replies.push({ chatId, text }) }
  );
  assert.equal(handled, true);
  assert.equal(requestDetails.url, 'https://mold-cost.internal/internal/mold-cost/command');
  assert.equal(requestDetails.method, 'POST');
  assert.equal(requestDetails.secret, secret);
  assert.deepEqual(requestDetails.body, { channel: 'telegram', commandText: '/activate 00000000-0000-4000-8000-000000000001 30', actorId: '11' });
  assert.deepEqual(replies, [{ chatId: 11, text: 'اشتراک فعال شد.' }]);
});
