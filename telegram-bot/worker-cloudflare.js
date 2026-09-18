var L = ["fa", "en", "tr", "ar", "az"];
var T = { fa: { w: "\u0633\u0644\u0627\u0645\u060C \u0628\u0647 \u062A\u06CC\u0645 \u0641\u0646\u06CC VeltriX \u062E\u0648\u0634 \u0622\u0645\u062F\u06CC\u062F.", m: "\u062E\u062F\u0645\u0627\u062A \u0642\u0627\u0644\u0628\u200C\u0633\u0627\u0632\u06CC:", q: ["\u0646\u0627\u0645 \u0634\u0631\u06A9\u062A\u061F", "\u06A9\u0634\u0648\u0631 \u06CC\u0627 \u0634\u0647\u0631\u061F", "\u0646\u0648\u0639 \u0642\u0637\u0639\u0647 \u06CC\u0627 \u0645\u062D\u0635\u0648\u0644\u061F", "\u062A\u06CC\u0631\u0627\u0698 \u062A\u0642\u0631\u06CC\u0628\u06CC\u061F", "\u0646\u0642\u0634\u0647\u060C \u0639\u06A9\u0633 \u06CC\u0627 \u0641\u0627\u06CC\u0644 \u0633\u0647\u200C\u0628\u0639\u062F\u06CC \u0631\u0627 \u0628\u0641\u0631\u0633\u062A\u06CC\u062F."], ok: "\u0627\u0637\u0644\u0627\u0639\u0627\u062A \u062B\u0628\u062A \u0634\u062F \u0648 \u0628\u0631\u0627\u06CC \u062A\u06CC\u0645 \u0641\u0646\u06CC \u0627\u0631\u0633\u0627\u0644 \u0634\u062F.", s: [["\u0642\u0627\u0644\u0628 \u062A\u0632\u0631\u06CC\u0642 \u067E\u0644\u0627\u0633\u062A\u06CC\u06A9", "injection"], ["Hot Runner / Valve Gate", "hotrunner"], ["\u0642\u0627\u0644\u0628 \u067E\u0632\u0634\u06A9\u06CC \u0648 \u0628\u0633\u062A\u0647\u200C\u0628\u0646\u062F\u06CC", "medical"], ["\u0642\u0627\u0644\u0628 \u062E\u0648\u062F\u0631\u0648\u06CC\u06CC \u0648 \u0644\u0648\u0627\u0632\u0645 \u062E\u0627\u0646\u06AF\u06CC", "auto"], ["\u062A\u0631\u0645\u0648\u0641\u0631\u0645\u06CC\u0646\u06AF \u0648 \u062F\u0627\u06CC\u06A9\u0627\u0633\u062A", "thermo"]], p: "\u0634\u0631\u0648\u0639 \u0628\u0631\u0631\u0633\u06CC \u067E\u0631\u0648\u0698\u0647" }, en: { w: "Hello, welcome to VeltriX technical team.", m: "Mold services:", q: ["Company name?", "Country or city?", "Part or product type?", "Approximate volume?", "Please send a drawing, photo or 3D file."], ok: "Your information was saved and sent to our technical team.", s: [["Plastic injection molds", "injection"], ["Hot Runner / Valve Gate", "hotrunner"], ["Medical & packaging molds", "medical"], ["Automotive & appliance molds", "auto"], ["Thermoforming & die casting", "thermo"]], p: "Start project review" }, tr: { w: "Merhaba, VeltriX teknik ekibine ho\u015F geldiniz.", m: "Kal\u0131p hizmetleri:", q: ["\u015Eirket ad\u0131?", "\xDClke veya \u015Fehir?", "Par\xE7a veya \xFCr\xFCn t\xFCr\xFC?", "Yakla\u015F\u0131k \xFCretim adedi?", "\xC7izim, foto\u011Fraf veya 3D dosyas\u0131 g\xF6nderin."], ok: "Bilgileriniz kaydedildi ve teknik ekibe iletildi.", s: [["Plastik enjeksiyon kal\u0131plar\u0131", "injection"], ["Hot Runner / Valve Gate", "hotrunner"], ["Medikal ve ambalaj kal\u0131plar\u0131", "medical"], ["Otomotiv ve beyaz e\u015Fya kal\u0131plar\u0131", "auto"], ["Termoform ve d\xF6k\xFCm", "thermo"]], p: "Proje incelemesine ba\u015Fla" }, ar: { w: "\u0645\u0631\u062D\u0628\u0627\u064B \u0628\u0643\u0645 \u0641\u064A \u0627\u0644\u0641\u0631\u064A\u0642 \u0627\u0644\u0641\u0646\u064A VeltriX.", m: "\u062E\u062F\u0645\u0627\u062A \u0627\u0644\u0642\u0648\u0627\u0644\u0628:", q: ["\u0627\u0633\u0645 \u0627\u0644\u0634\u0631\u0643\u0629\u061F", "\u0627\u0644\u062F\u0648\u0644\u0629 \u0623\u0648 \u0627\u0644\u0645\u062F\u064A\u0646\u0629\u061F", "\u0646\u0648\u0639 \u0627\u0644\u0642\u0637\u0639\u0629 \u0623\u0648 \u0627\u0644\u0645\u0646\u062A\u062C\u061F", "\u0627\u0644\u0643\u0645\u064A\u0629 \u0627\u0644\u062A\u0642\u0631\u064A\u0628\u064A\u0629\u061F", "\u0623\u0631\u0633\u0644\u0648\u0627 \u0627\u0644\u0631\u0633\u0645 \u0623\u0648 \u0627\u0644\u0635\u0648\u0631\u0629 \u0623\u0648 \u0645\u0644\u0641 \u062B\u0644\u0627\u062B\u064A \u0627\u0644\u0623\u0628\u0639\u0627\u062F."], ok: "\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0648\u0625\u0631\u0633\u0627\u0644\u0647\u0627 \u0625\u0644\u0649 \u0627\u0644\u0641\u0631\u064A\u0642 \u0627\u0644\u0641\u0646\u064A.", s: [["\u0642\u0648\u0627\u0644\u0628 \u062D\u0642\u0646 \u0627\u0644\u0628\u0644\u0627\u0633\u062A\u064A\u0643", "injection"], ["Hot Runner / Valve Gate", "hotrunner"], ["\u0627\u0644\u0642\u0648\u0627\u0644\u0628 \u0627\u0644\u0637\u0628\u064A\u0629 \u0648\u0627\u0644\u062A\u063A\u0644\u064A\u0641", "medical"], ["\u0642\u0648\u0627\u0644\u0628 \u0627\u0644\u0633\u064A\u0627\u0631\u0627\u062A \u0648\u0627\u0644\u0623\u062C\u0647\u0632\u0629", "auto"], ["\u0627\u0644\u062A\u0634\u0643\u064A\u0644 \u0627\u0644\u062D\u0631\u0627\u0631\u064A \u0648\u0627\u0644\u062F\u0627\u064A\u0643\u0627\u0633\u062A", "thermo"]], p: "\u0628\u062F\u0621 \u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0645\u0634\u0631\u0648\u0639" }, az: { w: "Salam, VeltriX texniki komandas\u0131na xo\u015F g\u0259lmisiniz.", m: "Q\u0259lib xidm\u0259tl\u0259ri:", q: ["\u015Eirk\u0259tin ad\u0131?", "\xD6lk\u0259 v\u0259 ya \u015F\u0259h\u0259r?", "Detal v\u0259 ya m\u0259hsul n\xF6v\xFC?", "T\u0259xmini istehsal say\u0131?", "\xC7ertyoj, \u015F\u0259kil v\u0259 ya 3D fayl g\xF6nd\u0259rin."], ok: "M\u0259lumatlar\u0131n\u0131z qeyd edildi v\u0259 texniki komandaya g\xF6nd\u0259rildi.", s: [["Plastik inyeksiya q\u0259libl\u0259ri", "injection"], ["Hot Runner / Valve Gate", "hotrunner"], ["Tibbi v\u0259 qabla\u015Fd\u0131rma q\u0259libl\u0259ri", "medical"], ["Avtomobil v\u0259 m\u0259i\u015F\u0259t q\u0259libl\u0259ri", "auto"], ["Termoform v\u0259 t\xF6km\u0259", "thermo"]], p: "Layih\u0259 bax\u0131\u015F\u0131na ba\u015Fla" } };
function lang(x, f = "en") {
  x = String(x || "").toLowerCase();
  if (/[پچژگکی]/.test(x)) return "fa";
  if (/[ء-ي]/.test(x)) return "ar";
  if (/[əğıöüşçİı]/i.test(x)) return "az";
  if (/[ğüşöçıİ]/i.test(x)) return "tr";
  return L.includes(x.slice(0, 2)) ? x.slice(0, 2) : f;
}
function d(lang2) {
  let t = T[lang2] || T.en;
  return { inline_keyboard: [...t.s.map((x) => [{ text: x[0], callback_data: "s:" + x[1] }]), [{ text: t.p, callback_data: "lead" }]] };
}
async function tg(e, m, b) {
  return (await fetch(`https://api.telegram.org/bot${e.TELEGRAM_BOT_TOKEN}/${m}`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(b) })).json();
}
async function send(e, id, text, x = {}) {
  return tg(e, "sendMessage", { chat_id: id, text, ...x });
}
async function lead(e, x) {
  if (e.LEADS_KV) await e.LEADS_KV.put(`lead:${Date.now()}:${x.chat_id}`, JSON.stringify(x));
  if (e.ADMIN_CHAT_ID) await send(e, e.ADMIN_CHAT_ID, `VeltriX lead
${JSON.stringify(x, null, 2)}`);
}
async function go(e, u) {
  let m = u.message, q = u.callback_query;
  if (q) {
    let id2 = q.message.chat.id, l2 = lang(q.from?.language_code);
    await tg(e, "answerCallbackQuery", { callback_query_id: q.id });
    if (q.data === "lead") {
      await e.LEADS_KV?.put(`state:${id2}`, JSON.stringify({ l: l2, step: 0, data: {} }), { expirationTtl: 1209600 });
      return send(e, id2, T[l2].q[0]);
    }
    return send(e, id2, T[l2].m, { reply_markup: d(l2) });
  }
  if (!m?.chat) return;
  let id = m.chat.id, tx = (m.text || m.caption || "").trim(), l = lang(tx, lang(m.from?.language_code)), t = T[l];
  if (/^\/(start|menu)/.test(tx)) return e.LEADS_KV?.delete(`state:${id}`).then(() => send(e, id, `${t.w}

${t.m}`, { reply_markup: d(l) }));
  let st = await e.LEADS_KV?.get(`state:${id}`, "json");
  if (st) {
    st.data[["company", "country", "part", "volume", "file"][st.step]] = tx || "(file)";
    st.step++;
    if (st.step < 5) {
      await e.LEADS_KV.put(`state:${id}`, JSON.stringify(st), { expirationTtl: 1209600 });
      return send(e, id, t.q[st.step]);
    }
    await lead(e, { chat_id: id, name: [m.from?.first_name, m.from?.last_name].filter(Boolean).join(" "), username: m.from?.username || "", language: l, data: st.data, text: tx, date: (/* @__PURE__ */ new Date()).toISOString(), channel: "telegram" });
    await e.LEADS_KV.delete(`state:${id}`);
    return send(e, id, t.ok);
  }
  await lead(e, { chat_id: id, name: [m.from?.first_name, m.from?.last_name].filter(Boolean).join(" "), username: m.from?.username || "", language: l, text: tx, has_media: !!(m.photo || m.document || m.video), date: (/* @__PURE__ */ new Date()).toISOString(), channel: "telegram" });
  return send(e, id, t.ok, { reply_markup: d(l) });
}
var veltrix_compact_default = { async fetch(r, e) {
  let u = new URL(r.url);
  if (r.method === "GET" && u.pathname === "/health") return new Response(JSON.stringify({ ok: true, service: "veltrix-telegram-bot" }), { headers: { "content-type": "application/json" } });
  if (r.method !== "POST" || u.pathname !== `/telegram/${e.WEBHOOK_SECRET}` || r.headers.get("X-Telegram-Bot-Api-Secret-Token") !== e.WEBHOOK_SECRET) return new Response("Forbidden", { status: 403 });
  try {
    await go(e, await r.json());
  } catch (x) {
    console.error(x);
  }
  return new Response("ok");
} };
export {
  veltrix_compact_default as default
};
