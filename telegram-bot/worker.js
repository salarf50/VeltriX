const LANGS = ['fa', 'en', 'tr', 'ar', 'az'];
const TEXT = {
  fa: { welcome: 'سلام! به veltrix_mold خوش آمدید. زبان پیام شما تشخیص داده شد.', menu: 'لطفاً خدمت موردنظر را انتخاب کنید:', lead: 'برای بررسی پروژه، نام شرکت، کشور، نوع قطعه و تیراژ تقریبی را در یک پیام بفرستید. سپس می‌توانید عکس، نقشه یا فایل سه‌بعدی را ارسال کنید.', contact: 'برای ادامه، جزئیات پروژه را همین‌جا بفرستید. تیم VeltriX پس از بررسی اولیه با شما هماهنگ می‌کند.', saved: 'اطلاعات شما ثبت شد. درخواستتان برای بررسی به تیم VeltriX ارسال شد.', unknown: 'می‌توانم دربارهٔ خدمات قالب‌سازی، بررسی اولیه پروژه و ارسال اطلاعات فنی راهنمایی کنم. از منوی خدمات انتخاب کنید.', services: [['قالب تزریق پلاستیک','injection'],['Hot Runner / Valve Gate','hotrunner'],['قالب پزشکی و بسته‌بندی','medical'],['قالب خودرویی و لوازم خانگی','auto'],['ترموفرمینگ و دایکاست','thermo']] },
  en: { welcome: 'Hello! Welcome to veltrix_mold. I detected your language.', menu: 'Please choose a service:', lead: 'For a project review, send your company, country, part type and approximate volume in one message. You can then send a drawing, photo or 3D file.', contact: 'Send your project details here. The VeltriX team will follow up after the initial review.', saved: 'Your information was saved and sent to the VeltriX team.', unknown: 'I can help with mold manufacturing services, initial project reviews and technical project details. Choose a service from the menu.', services: [['Plastic injection molds','injection'],['Hot Runner / Valve Gate','hotrunner'],['Medical and packaging molds','medical'],['Automotive and appliance molds','auto'],['Thermoforming and die casting','thermo']] },
  tr: { welcome: 'Merhaba! veltrix_mold hesabına hoş geldiniz. Dilinizi algıladım.', menu: 'Lütfen bir hizmet seçin:', lead: 'Proje incelemesi için şirket, ülke, parça türü ve yaklaşık adet bilgisini gönderin. Ardından çizim, fotoğraf veya 3D dosyası gönderebilirsiniz.', contact: 'Proje ayrıntılarınızı buraya gönderin. VeltriX ekibi ilk incelemeden sonra sizinle iletişime geçecektir.', saved: 'Bilgileriniz kaydedildi ve VeltriX ekibine iletildi.', unknown: 'Kalıp imalatı, proje incelemesi ve teknik bilgiler konusunda yardımcı olabilirim. Menüden bir hizmet seçin.', services: [['Plastik enjeksiyon kalıpları','injection'],['Hot Runner / Valve Gate','hotrunner'],['Medikal ve ambalaj kalıpları','medical'],['Otomotiv ve beyaz eşya kalıpları','auto'],['Termoform ve basınçlı döküm','thermo']] },
  ar: { welcome: 'مرحباً! أهلاً بكم في veltrix_mold. تم التعرف على لغتكم.', menu: 'يرجى اختيار الخدمة:', lead: 'لمراجعة المشروع، أرسلوا اسم الشركة والدولة ونوع القطعة والكمية التقريبية. يمكنكم بعد ذلك إرسال الرسم أو الصورة أو ملف ثلاثي الأبعاد.', contact: 'أرسلوا تفاصيل المشروع هنا، وسيتواصل فريق VeltriX معكم بعد المراجعة الأولية.', saved: 'تم حفظ معلوماتكم وإرسالها إلى فريق VeltriX.', unknown: 'يمكنني المساعدة في خدمات تصنيع القوالب ومراجعة المشاريع والمعلومات الفنية. اختاروا خدمة من القائمة.', services: [['قوالب حقن البلاستيك','injection'],['Hot Runner / Valve Gate','hotrunner'],['القوالب الطبية والتغليف','medical'],['قوالب السيارات والأجهزة','auto'],['التشكيل الحراري والدايكاست','thermo']] },
  az: { welcome: 'Salam! veltrix_mold hesabına xoş gəlmisiniz. Diliniz müəyyən edildi.', menu: 'Zəhmət olmasa xidmət seçin:', lead: 'Layihə baxışı üçün şirkət, ölkə, detal növü və təxmini istehsal sayını göndərin. Daha sonra çertyoj, şəkil və ya 3D fayl göndərə bilərsiniz.', contact: 'Layihə məlumatlarını burada göndərin. VeltriX komandası ilkin baxışdan sonra sizinlə əlaqə saxlayacaq.', saved: 'Məlumatlarınız qeyd edildi və VeltriX komandasına göndərildi.', unknown: 'Qəlib istehsalı, layihə baxışı və texniki məlumatlar barədə kömək edə bilərəm. Menyudan xidmət seçin.', services: [['Plastik inyeksiya qəlibləri','injection'],['Hot Runner / Valve Gate','hotrunner'],['Tibbi və qablaşdırma qəlibləri','medical'],['Avtomobil və məişət texnikası qəlibləri','auto'],['Termoform və tökmə qəlibləri','thermo']] }
};

function detectLanguage(text = '') {
  if(/[\u0600-\u06FF]/.test(text)) return /[\u067E\u0686\u0698\u06AF]/.test(text) ? 'fa' : 'ar';
  if(/[əğıöüşçİı]/i.test(text)) return 'az';
  if(/[ğüşöçıİ]/i.test(text)) return 'tr';
  return 'en';
}
function normalizeLanguage(value = '') {
  const code = String(value).toLowerCase().slice(0, 2);
  return LANGS.includes(code) ? code : 'en';
}
function t(lang) { return TEXT[LANGS.includes(lang) ? lang : 'en']; }
function menu(lang) { return { inline_keyboard: t(lang).services.map(([label, id]) => [{text: label, callback_data: `service:${id}`}]).concat([[{text: 'Project review / بررسی پروژه', callback_data: 'lead'}]]) }; }
async function telegram(env, method, body) {
  const r = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/${method}`, {method:'POST', headers:{'content-type':'application/json'}, body:JSON.stringify(body)});
  return r.json();
}
async function send(env, chatId, text, extra={}) { return telegram(env, 'sendMessage', {chat_id: chatId, text, ...extra}); }
async function saveLead(env, lead) {
  if (env.LEADS_KV) await env.LEADS_KV.put(`lead:${Date.now()}:${lead.chat_id}`, JSON.stringify(lead));
  if (env.SHEETS_WEBHOOK_URL) await fetch(env.SHEETS_WEBHOOK_URL, {method:'POST', headers:{'content-type':'application/json'}, body:JSON.stringify(lead)});
  if (env.ADMIN_CHAT_ID) await send(env, env.ADMIN_CHAT_ID, `New VeltriX lead\n\n${JSON.stringify(lead, null, 2)}`);
}
async function aiReply(env, lang, text) {
  if (!env.AI) return null;
  try {
    const result = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {messages:[{role:'system',content:`You are VeltriX mold manufacturing assistant. Reply in ${lang}. Be concise. Never promise exact price, delivery date, certification, or final engineering approval. Ask for project details and recommend human follow-up.`},{role:'user',content:text}]});
    return result?.response || null;
  } catch (_) { return null; }
}
async function processUpdate(env, update) {
  const msg = update.message;
  if(update.callback_query) {
    const q = update.callback_query; const chatId=q.message.chat.id; const lang=normalizeLanguage(q.from?.language_code || 'en');
    await telegram(env,'answerCallbackQuery',{callback_query_id:q.id});
    if(q.data==='lead') return send(env, chatId, t(lang).lead);
    const service = t(lang).services.find(x=>x[1]===q.data.split(':')[1]);
    return send(env, chatId, service ? `${service[0]}\n\n${t(lang).contact}` : t(lang).unknown);
  }
  if(!msg || !msg.chat) return;
  const text = msg.text || '';
  const lang = text ? detectLanguage(text) : normalizeLanguage(msg.from?.language_code || 'en');
  if(text.startsWith('/start') || text.startsWith('/menu')) return send(env, msg.chat.id, `${t(lang).welcome}\n\n${t(lang).menu}`, {reply_markup:menu(lang)});
  if(text.startsWith('/help')) return send(env, msg.chat.id, `${t(lang).menu}\n\n${t(lang).lead}`, {reply_markup:menu(lang)});
  const reply = await aiReply(env, lang, text);
  const lead = {chat_id: msg.chat.id, username: msg.from?.username || '', name: [msg.from?.first_name,msg.from?.last_name].filter(Boolean).join(' '), language: lang, text, date: new Date().toISOString(), channel:'telegram'};
  await saveLead(env, lead);
  return send(env, msg.chat.id, reply || `${t(lang).saved}\n\n${t(lang).contact}`, {reply_markup:menu(lang)});
}

export default { async fetch(request, env) {
  const url = new URL(request.url);
  if(request.method === 'GET' && url.pathname === '/health') return new Response(JSON.stringify({ok:true,service:'veltrix-telegram-bot'}), {headers:{'content-type':'application/json'}});
  if(request.method !== 'POST' || url.pathname !== `/telegram/${env.WEBHOOK_SECRET}`) return new Response('Not found', {status:404});
  if(request.headers.get('X-Telegram-Bot-Api-Secret-Token') !== env.WEBHOOK_SECRET) return new Response('Forbidden', {status:403});
  const update = await request.json();
  await processUpdate(env, update);
  return new Response('ok');
} };
