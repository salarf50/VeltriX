(() => {
  'use strict';

  const STATS_ENDPOINT = 'https://veltrix-telegram-bot.ali-fayyazi439.workers.dev/public-stats';
  const HEARTBEAT_ENDPOINT = `${STATS_ENDPOINT}/heartbeat`;
  const visitorKey = 'veltrix_public_visitor_id';
  const heartbeatEveryMs = 60 * 1000;
  const refreshEveryMs = 90 * 1000;

  function getVisitorId() {
    try {
      let id = localStorage.getItem(visitorKey);
      if (!id) {
        id = (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`);
        localStorage.setItem(visitorKey, id);
      }
      return id;
    } catch {
      return `session-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    }
  }

  function addStyles() {
    if (document.getElementById('veltrix-live-stats-style')) return;
    const style = document.createElement('style');
    style.id = 'veltrix-live-stats-style';
    style.textContent = `
      #veltrix-live-stats {
        position: fixed;
        z-index: 9999;
        right: 16px;
        bottom: 16px;
        display: flex;
        align-items: center;
        gap: 9px;
        max-width: calc(100vw - 32px);
        padding: 8px 13px;
        border: 1px solid rgba(215,168,75,.42);
        border-radius: 999px;
        background: rgba(8,10,14,.91);
        box-shadow: 0 8px 28px rgba(0,0,0,.28);
        color: #e9edf3;
        font: 12px/1.4 Tahoma, Arial, sans-serif;
        direction: rtl;
        backdrop-filter: blur(8px);
      }
      #veltrix-live-stats .vls-dot {
        width: 7px;
        height: 7px;
        flex: 0 0 7px;
        border-radius: 50%;
        background: #52d273;
        box-shadow: 0 0 0 4px rgba(82,210,115,.12);
      }
      #veltrix-live-stats .vls-text { white-space: nowrap; }
      #veltrix-live-stats strong { color: #f0c766; font-weight: 700; }
      @media (max-width: 520px) {
        #veltrix-live-stats { right: 10px; bottom: 10px; padding: 7px 10px; font-size: 11px; }
      }
    `;
    document.head.appendChild(style);
  }

  function render(stats) {
    let bar = document.getElementById('veltrix-live-stats');
    if (!bar) {
      bar = document.createElement('aside');
      bar.id = 'veltrix-live-stats';
      bar.setAttribute('aria-label', 'آمار عمومی زندهٔ سایت');
      document.body.appendChild(bar);
    }
    const online = Number.isFinite(stats.online) ? stats.online : 0;
    const bots = Number.isFinite(stats.bot_users_total) ? stats.bot_users_total : 0;
    bar.innerHTML = `<span class="vls-dot" aria-hidden="true"></span><span class="vls-text"><strong>${online}</strong> نفر اکنون در سایت · <strong>${bots}</strong> کاربر ربات‌ها</span>`;
  }

  async function heartbeat() {
    try {
      await fetch(HEARTBEAT_ENDPOINT, {
        method: 'POST',
        mode: 'cors',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ visitor_id: getVisitorId() }),
        keepalive: true
      });
    } catch { /* آمار نباید مانع استفاده از سایت شود */ }
  }

  async function refresh() {
    try {
      const response = await fetch(STATS_ENDPOINT, { mode: 'cors', cache: 'no-store' });
      if (!response.ok) return;
      render(await response.json());
    } catch { /* نوار در صورت قطعی آمار مزاحم صفحه نمی‌شود */ }
  }

  function start() {
    addStyles();
    render({ online: 0, bot_users_total: 0 });
    heartbeat();
    refresh();
    window.setInterval(heartbeat, heartbeatEveryMs);
    window.setInterval(refresh, refreshEveryMs);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
