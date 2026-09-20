// ==========================================
// آیدی ادمین تنظیم شده
// ==========================================
const DEFAULT_ADMIN_CHAT_ID = "1602861730";
function adminChatId(env) {
  return String(env.BALEH_ADMIN_CHAT_ID || DEFAULT_ADMIN_CHAT_ID);
}

// بقیه را در Cloudflare به صورت Secret تنظیم کن:
// BALEH_BOT_TOKEN  → توکن ربات
// WEBHOOK_SECRET      → یک رمز قوی (مثلاً veltrix2026secure)

// ==========================================
// از اینجا به بعد هیچی را تغییر نده
// ==========================================

const LANGS = ['fa', 'en', 'tr', 'ar', 'az'];

const TEXT = {
  fa: {
    welcome: 'سلام، وقتتون بخیر 🌿\nمن از تیم فنی VeltriX هستم. خوشحالم که پیام دادید.\nچطور می‌تونم کمکتون کنم؟',
    menu: 'اگر بخواید می‌تونم در مورد خدمات قالب‌سازی راهنماییتون کنم:',
    lead_start: 'برای اینکه بتونم پروژه‌تون رو بهتر بررسی کنم، چند تا اطلاعات کوچیک ازتون می‌پرسم. اوکی هست؟',
    ask_company: 'اسم شرکت یا مجموعه‌تون چیه؟',
    ask_country: 'کشور یا شهرتون کجاست؟',
    ask_part: 'نوع قطعه یا محصولی که می‌خواید قالبش رو بسازید چیه؟',
    ask_volume: 'تیراژ تقریبی تولیدتون چقدره؟',
    ask_file: 'اگر نقشه، عکس یا فایل سه‌بعدی دارید برام بفرستید تا دقیق‌تر بررسی کنم.',
    thanks_lead: 'ممنون از اطلاعاتی که دادید ✅\nدرخواستتون رو برای تیم فنی ارسال کردم. به‌زودی نتیجه بررسی رو بهتون اطلاع می‌دم.',
    media_thanks: 'فایل/عکس رو دریافت کردم، ممنون. دارم براتون ثبت می‌کنم.',
    unknown: 'در خدمتم. اگر در مورد قالب تزریق پلاستیک، هات‌رانر، قالب پزشکی یا خودرویی سوالی دارید بفرمایید.',
    services: [
      ['قالب تزریق پلاستیک', 'injection'],
      ['Hot Runner / Valve Gate', 'hotrunner'],
      ['قالب پزشکی و بسته‌بندی', 'medical'],
      ['قالب خودرویی و لوازم خانگی', 'auto'],
      ['ترموفرمینگ و دایکاست', 'thermo']
    ],
    project_review: 'شروع بررسی پروژه'
  },
  en: {
    welcome: 'Hello, good time 🌿\nI’m from the VeltriX technical team. Glad you reached out.\nHow can I help you?',
    menu: 'I can guide you about our mold services:',
    lead_start: 'To review your project better, I’ll ask a few small questions. Is that okay?',
    ask_company: 'What’s the name of your company?',
    ask_country: 'Which country or city are you based in?',
    ask_part: 'What type of part or product do you need the mold for?',
    ask_volume: 'What’s the approximate production volume?',
    ask_file: 'If you have drawings, photos or 3D files, please send them so I can review more accurately.',
    thanks_lead: 'Thank you for the information ✅\nI’ve forwarded your request to the technical team. I’ll get back to you soon with the result.',
    media_thanks: 'I’ve received your file/photo, thank you. Registering it now.',
    unknown: 'I’m here to help. If you have questions about plastic injection molds, hot runner, medical or automotive molds, just tell me.',
    services: [
      ['Plastic Injection Molds', 'injection'],
      ['Hot Runner / Valve Gate', 'hotrunner'],
      ['Medical & Packaging Molds', 'medical'],
      ['Automotive & Appliance Molds', 'auto'],
      ['Thermoforming & Die Casting', 'thermo']
    ],
    project_review: 'Start Project Review'
  },
  tr: {
    welcome: 'Merhaba, iyi günler 🌿\nVeltriX teknik ekibinden yazıyorum. Mesajınız için teşekkürler.\nSize nasıl yardımcı olabilirim?',
    menu: 'Kalıp hizmetlerimiz hakkında size yardımcı olabilirim:',
    lead_start: 'Projenizi daha iyi inceleyebilmem için birkaç küçük bilgi alabilir miyim?',
    ask_company: 'Şirketinizin adı nedir?',
    ask_country: 'Hangi ülke veya şehirdesiniz?',
    ask_part: 'Hangi parça veya ürün için kalıp istiyorsunuz?',
    ask_volume: 'Yaklaşık üretim adediniz nedir?',
    ask_file: 'Çizim, fotoğraf veya 3D dosyanız varsa gönderebilirsiniz.',
    thanks_lead: 'Bilgileriniz için teşekkürler ✅\nTalebinizi teknik ekibe ilettim. En kısa sürede size dönüş yapacağım.',
    media_thanks: 'Dosyanızı/fotoğrafınızı aldım, teşekkürler. Kaydediyorum.',
    unknown: 'Size yardımcı olmak için buradayım. Plastik enjeksiyon, hot runner, medikal veya otomotiv kalıpları hakkında sorularınızı sorabilirsiniz.',
    services: [
      ['Plastik Enjeksiyon Kalıpları', 'injection'],
      ['Hot Runner / Valve Gate', 'hotrunner'],
      ['Medikal ve Ambalaj Kalıpları', 'medical'],
      ['Otomotiv ve Beyaz Eşya Kalıpları', 'auto'],
      ['Termoform ve Basınçlı Döküm', 'thermo']
    ],
    project_review: 'Proje İncelemesine Başla'
  },
  ar: {
    welcome: 'مرحباً، طاب يومكم 🌿\nأنا من الفريق الفني في VeltriX. سعيد بتواصلكم.\nكيف يمكنني مساعدتكم؟',
    menu: 'يمكنني إرشادكم حول خدمات تصنيع القوالب:',
    lead_start: 'لكي أتمكن من مراجعة مشروعكم بشكل أفضل، هل يمكنني طرح بعض الأسئلة البسيطة؟',
    ask_company: 'ما اسم شركتكم؟',
    ask_country: 'في أي دولة أو مدينة أنتم؟',
    ask_part: 'ما نوع القطعة أو المنتج الذي تحتاجون قالباً له؟',
    ask_volume: 'ما الكمية التقريبية للإنتاج؟',
    ask_file: 'إذا كان لديكم رسومات أو صور أو ملفات ثلاثية الأبعاد، يرجى إرسالها.',
    thanks_lead: 'شكراً على المعلومات ✅\nأرسلت طلبكم إلى الفريق الفني. سأعود إليكم قريباً بالنتيجة.',
    media_thanks: 'استلمت الملف/الصورة، شكراً. أقوم بتسجيله الآن.',
    unknown: 'أنا هنا لمساعدتكم. يمكنكم سؤالي عن قوالب حقن البلاستيك أو الهوت رانر أو القوالب الطبية والسيارات.',
    services: [
      ['قوالب حقن البلاستيك', 'injection'],
      ['Hot Runner / Valve Gate', 'hotrunner'],
      ['القوالب الطبية والتغليف', 'medical'],
      ['قوالب السيارات والأجهزة', 'auto'],
      ['التشكيل الحراري والدايكاست', 'thermo']
    ],
    project_review: 'بدء مراجعة المشروع'
  },
  az: {
    welcome: 'Salam, yaxşı günlər 🌿\nVeltriX texniki komandasından yazıram. Mesajınız üçün təşəkkürlər.\nSizə necə kömək edə bilərəm?',
    menu: 'Qəlib xidmətlərimiz haqqında sizə kömək edə bilərəm:',
    lead_start: 'Layihənizi daha yaxşı nəzərdən keçirmək üçün bir neçə kiçik məlumat ala bilərəmmi?',
    ask_company: 'Şirkətinizin adı nədir?',
    ask_country: 'Hansı ölkə və ya şəhərdəsiniz?',
    ask_part: 'Hansı detal və ya məhsul üçün qəlib istəyirsiniz?',
    ask_volume: 'Təxmini istehsal sayınız nə qədərdir?',
    ask_file: 'Çertyoj, şəkil və ya 3D faylınız varsa göndərə bilərsiniz.',
    thanks_lead: 'Məlumatlarınız üçün təşəkkürlər ✅\nSorğunuzu texniki komandaya ötürdüm. Tezliklə nəticə ilə sizə qayıdacağam.',
    media_thanks: 'Faylınızı/şəklinizi aldım, təşəkkürlər. Qeyd edirəm.',
    unknown: 'Sizə kömək etmək üçün buradayam. Plastik inyeksiya, hot runner, tibbi və ya avtomobil qəlibləri haqqında suallarınızı verə bilərsiniz.',
    services: [
      ['Plastik inyeksiya qəlibləri', 'injection'],
      ['Hot Runner / Valve Gate', 'hotrunner'],
      ['Tibbi və qablaşdırma qəlibləri', 'medical'],
      ['Avtomobil və məişət texnikası qəlibləri', 'auto'],
      ['Termoform və tökmə qəlibləri', 'thermo']
    ],
    project_review: 'Layihə baxışına başla'
  }
};

function detectLanguage(text = '', fallback = 'en') {
  if (!text || text.trim().length < 2) return normalizeLanguage(fallback);
  if (/[\u067E\u0686\u0698\u06AF\u06A9\u06CC]/.test(text)) return 'fa';
  if (/[\u0600-\u06FF]/.test(text)) return 'ar';
  if (/[əğıöüşçİı]/i.test(text)) return 'az';
  if (/[ğüşöçıİ]/i.test(text)) return 'tr';
  return 'en';
}

function normalizeLanguage(v = '') {
  const code = String(v).toLowerCase().slice(0, 2);
  return LANGS.includes(code) ? code : 'en';
}

function t(lang) {
  return TEXT[LANGS.includes(lang) ? lang : 'en'];
}

function menu(lang) {
  const texts = t(lang);
  return {
    inline_keyboard: [
      ...texts.services.map(([label, id]) => [{ text: label, callback_data: `service:${id}` }]),
      [{ text: texts.project_review, callback_data: 'lead' }]
    ]
  };
}

function languageMenu() {
  return {
    inline_keyboard: [
      [{ text: 'فارسی', callback_data: 'lang:fa' }, { text: 'English', callback_data: 'lang:en' }],
      [{ text: 'Türkçe', callback_data: 'lang:tr' }, { text: 'العربية', callback_data: 'lang:ar' }],
      [{ text: 'Azərbaycan dili', callback_data: 'lang:az' }]
    ]
  };
}

function backMenu(lang) {
  const labels = { fa: 'بازگشت به منو', en: 'Back to menu', tr: 'Menüye dön', ar: 'العودة إلى القائمة', az: 'Menyuya qayıt' };
  return { inline_keyboard: [[{ text: labels[lang] || labels.en, callback_data: 'back:menu' }]] };
}

function adminLeadKeyboard(lead) {
  const id = String(lead.chat_id);
  return {
    inline_keyboard: [
      [{ text: '✉️ پاسخ به مشتری', callback_data: `admin:reply:${id}` }],
      [
        { text: '📞 تماس شد', callback_data: `admin:status:${id}:contacted` },
        { text: '🔧 در حال پیگیری', callback_data: `admin:status:${id}:in_progress` }
      ],
      [{ text: '✅ اتمام کار مشتری', callback_data: `admin:status:${id}:done` }],
      [{ text: '🔁 پیگیری مشتری', callback_data: `admin:followup:${id}` }]
    ]
  };
}

async function telegram(env, method, body) {
  try {
    const res = await fetch(`https://tapi.bale.ai/bot${env.BALEH_BOT_TOKEN}/${method}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body)
    });
    return await res.json();
  } catch (e) {
    console.error('Telegram error:', e);
    return null;
  }
}

async function send(env, chatId, text, extra = {}) {
  return telegram(env, 'sendMessage', {
    chat_id: chatId,
    text,
    parse_mode: 'HTML',
    ...extra
  });
}

async function getState(env, chatId) {
  if (!env.LEADS_KV) return null;
  const raw = await env.LEADS_KV.get(`state:${chatId}`);
  return raw ? JSON.parse(raw) : null;
}

async function setState(env, chatId, state) {
  if (!env.LEADS_KV) return;
  await env.LEADS_KV.put(`state:${chatId}`, JSON.stringify(state), { expirationTtl: 60 * 60 * 24 * 14 });
}

async function clearState(env, chatId) {
  if (!env.LEADS_KV) return;
  await env.LEADS_KV.delete(`state:${chatId}`);
}

async function getLanguage(env, chatId) {
  if (!env.LEADS_KV) return null;
  const saved = await env.LEADS_KV.get(`language:${chatId}`);
  return saved ? normalizeLanguage(saved) : null;
}

async function setLanguage(env, chatId, lang) {
  if (!env.LEADS_KV) return;
  await env.LEADS_KV.put(`language:${chatId}`, normalizeLanguage(lang), { expirationTtl: 60 * 60 * 24 * 90 });
}

async function updateLeadStatus(env, chatId, status) {
  if (!env.LEADS_KV) return null;
  const latestKey = await env.LEADS_KV.get(`latest:${chatId}`);
  if (!latestKey) return null;
  const raw = await env.LEADS_KV.get(latestKey);
  if (!raw) return null;
  const lead = JSON.parse(raw);
  lead.status = status;
  lead.status_updated_at = new Date().toISOString();
  await env.LEADS_KV.put(latestKey, JSON.stringify(lead));
  return lead;
}

async function sendDailyReminder(env) {
  if (!env.LEADS_KV) return;
  const listed = await env.LEADS_KV.list({ prefix: 'lead:', limit: 1000 });
  const leads = [];
  for (const key of listed.keys || []) {
    const raw = await env.LEADS_KV.get(key.name);
    if (!raw) continue;
    try {
      const lead = JSON.parse(raw);
      if (!['done', 'closed', 'completed'].includes(lead.status)) leads.push(lead);
    } catch {}
  }

  leads.sort((a, b) => String(a.date || '').localeCompare(String(b.date || '')));
  if (!leads.length) {
    await send(env, adminChatId(env), '☀️ یادآوری روزانه\n\nدر حال حاضر مشتریِ باز و نیازمند پیگیری وجود ندارد.');
    return;
  }

  await send(env, adminChatId(env), `☀️ <b>یادآوری روزانه مشتری‌ها</b>\nتعداد پرونده‌های باز: <b>${leads.length}</b>\nبرای هر مشتری از دکمه‌های زیر استفاده کنید.`);
  for (const lead of leads.slice(0, 40)) {
    const status = lead.status || 'new';
    const text = `👤 <b>${lead.name || 'بدون نام'}</b>\n🏢 ${lead.collected?.company || '-'}\n🌍 ${lead.collected?.country || '-'}\n📌 وضعیت: <b>${status}</b>\n🕒 ${lead.date || '-'}\n🆔 <code>${lead.chat_id}</code>`;
    await send(env, adminChatId(env), text, { reply_markup: adminLeadKeyboard(lead) });
  }
}

function surveyKeyboard() {
  return {
    inline_keyboard: [
      [{ text: '⭐️ 1', callback_data: 'survey:1' }, { text: '⭐️ 2', callback_data: 'survey:2' }, { text: '⭐️ 3', callback_data: 'survey:3' }],
      [{ text: '⭐️ 4', callback_data: 'survey:4' }, { text: '⭐️ 5', callback_data: 'survey:5' }],
      [{ text: 'بدون نظر', callback_data: 'survey:skip' }]
    ]
  };
}

async function saveSurvey(env, chatId, survey) {
  if (!env.LEADS_KV) return;
  const key = `survey:${Date.now()}:${chatId}`;
  await env.LEADS_KV.put(key, JSON.stringify({ chat_id: chatId, ...survey, date: new Date().toISOString() }));
  await env.LEADS_KV.put(`latest_survey:${chatId}`, key);
}

async function weeklyReview(env) {
  if (!env.LEADS_KV) return;
  const listed = await env.LEADS_KV.list({ prefix: 'lead:', limit: 1000 });
  const completed = [];
  for (const key of listed.keys || []) {
    const raw = await env.LEADS_KV.get(key.name);
    if (!raw) continue;
    try {
      const lead = JSON.parse(raw);
      if (lead.status === 'done') {
        const surveyKey = await env.LEADS_KV.get(`latest_survey:${lead.chat_id}`);
        const survey = surveyKey ? JSON.parse(await env.LEADS_KV.get(surveyKey) || '{}') : {};
        completed.push({ lead, survey });
      }
    } catch {}
  }
  if (!completed.length) {
    await send(env, adminChatId(env), '📊 گزارش هفتگی\n\nهنوز مشتری تکمیل‌شده‌ای برای تحلیل هفتگی وجود ندارد.');
    return;
  }

  await send(env, adminChatId(env), `📊 <b>گزارش هفتگی مشتری‌ها</b>\nتعداد مشتری‌های تکمیل‌شده: <b>${completed.length}</b>`);
  for (const { lead, survey } of completed.slice(0, 40)) {
    let review = `نقاط قوت: دریافت موفق درخواست مشتری و تکمیل پرونده\nنقاط ضعف: داده کافی برای تحلیل دقیق وجود ندارد\nاقدام پیشنهادی: یک پیگیری کوتاه برای دریافت بازخورد بیشتر`;
    if (env.AI) {
      try {
        const result = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', { messages: [
          { role: 'system', content: 'به فارسی و کوتاه، فقط در سه خط با برچسب‌های «نقاط قوت»، «نقاط ضعف»، «اقدام پیشنهادی» گزارش بده. از ادعای بدون داده خودداری کن.' },
          { role: 'user', content: JSON.stringify({ lead: { company: lead.collected?.company, country: lead.collected?.country, part: lead.collected?.part, volume: lead.collected?.volume, sentiment: lead.sentiment, status: lead.status }, survey }) }
        ] });
        review = result?.response || review;
      } catch {}
    }
    await send(env, adminChatId(env), `👤 <b>${lead.name || 'بدون نام'}</b>\n🏢 ${lead.collected?.company || '-'}\n⭐ امتیاز رضایت: ${survey.rating || 'ثبت نشده'}\n\n${review}`, { reply_markup: adminLeadKeyboard(lead) });
  }
}

async function analyzeAndTranslate(env, text) {
  if (!text || !env.AI) {
    return { translated: text || '(بدون متن)', sentiment: 'neutral', urgency: 'normal' };
  }
  try {
    const result = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
      messages: [
        {
          role: 'system',
          content: `Analyze the user message and respond ONLY in this exact JSON format:
{
  "translated": "Persian translation of the message",
  "sentiment": "positive" or "neutral" or "negative" or "angry",
  "urgency": "low" or "normal" or "high"
}
Do not add any other text.`
        },
        { role: 'user', content: text }
      ]
    });
    const parsed = JSON.parse(result?.response || '{}');
    return {
      translated: parsed.translated || text,
      sentiment: parsed.sentiment || 'neutral',
      urgency: parsed.urgency || 'normal'
    };
  } catch {
    return { translated: text, sentiment: 'neutral', urgency: 'normal' };
  }
}

async function saveLead(env, lead) {
  try {
    const analysis = await analyzeAndTranslate(env, lead.text);
    lead.sentiment = analysis.sentiment;
    lead.urgency = analysis.urgency;
    lead.translated = analysis.translated;
    lead.status = 'new';

    if (env.LEADS_KV) {
      const key = `lead:${Date.now()}:${lead.chat_id}`;
      await env.LEADS_KV.put(key, JSON.stringify(lead));
      await env.LEADS_KV.put(`latest:${lead.chat_id}`, key);
    }

    const langNames = { fa: 'فارسی', en: 'انگلیسی', tr: 'ترکی', ar: 'عربی', az: 'آذری' };
    const sentimentEmoji = { positive: '😊', neutral: '😐', negative: '😞', angry: '😠' };
    const urgencyEmoji = { low: '🟢', normal: '🟡', high: '🔴' };

    const msg = `
🆕 <b>لید جدید VeltriX</b>

${urgencyEmoji[lead.urgency] || '🟡'} اولویت: <b>${lead.urgency}</b>
${sentimentEmoji[lead.sentiment] || '😐'} احساس مشتری: <b>${lead.sentiment}</b>

👤 نام: ${lead.name || '-'}
🔗 یوزرنیم: @${lead.username || '-'}
🆔 آیدی: <code>${lead.chat_id}</code>
🌐 زبان: ${langNames[lead.language] || lead.language}

📝 متن اصلی:
${lead.text || '(فقط فایل)'}

🇮🇷 ترجمه فارسی:
${lead.translated}

📎 فایل: ${lead.has_media ? 'بله' : 'خیر'}
${lead.file_id ? `File ID: <code>${lead.file_id}</code>` : ''}

برای پاسخ به مشتری:
<code>/reply ${lead.chat_id} متن پیام</code>

برای تغییر وضعیت:
<code>/status ${lead.chat_id} contacted</code>
`;
    await send(env, adminChatId(env), msg, { reply_markup: adminLeadKeyboard(lead) });
    await forwardLeadMedia(env, lead);
  } catch (e) {
    console.error('saveLead error:', e);
  }
}

async function forwardLeadMedia(env, lead) {
  if (!lead.file_id || !lead.media_type) return;
  const payload = { chat_id: adminChatId(env) };
  if (lead.media_type === 'photo') payload.photo = lead.file_id;
  else if (lead.media_type === 'document') payload.document = lead.file_id;
  else if (lead.media_type === 'video') payload.video = lead.file_id;
  else if (lead.media_type === 'audio') payload.audio = lead.file_id;
  else if (lead.media_type === 'voice') payload.voice = lead.file_id;
  else if (lead.media_type === 'animation') payload.animation = lead.file_id;
  else return;

  const result = await telegram(env, `send${lead.media_type[0].toUpperCase()}${lead.media_type.slice(1)}`, payload);
  if (!result?.ok) console.error('Lead media forwarding failed:', result);
}

async function aiReply(env, lang, text, state = null) {
  if (!env.AI) return null;
  const systemPrompt = `You are a real human technical sales person at VeltriX Mold.
Speak naturally and warmly. The customer must never feel they are talking to a bot.

STRICT RULES:
1. Reply ONLY in language code: ${lang}
2. NEVER reveal you are an AI or bot.
3. NEVER give any price, cost, quotation, delivery time, or deadline.
4. If asked about price or time, say the support team will inform them.
5. Extract information gradually, one question at a time.
6. Be concise and professional.
7. Current collected data: ${JSON.stringify(state?.data || {})}`;

  try {
    const result = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: text }
      ]
    });
    return result?.response || null;
  } catch {
    return null;
  }
}

async function relayCustomerMessage(env, msg, lang) {
  if (!env.LEADS_KV || !msg?.chat?.id) return false;
  const chatId = msg.chat.id;
  const latestKey = await env.LEADS_KV.get(`latest:${chatId}`);
  if (!latestKey) return false;
  const raw = await env.LEADS_KV.get(latestKey);
  if (!raw) return false;
  const lead = JSON.parse(raw);
  if (['done', 'closed', 'completed'].includes(lead.status)) return false;
  const text = (msg.text || msg.caption || '').trim();
  let fileId = null;
  let mediaType = null;
  if (msg.photo) { fileId = msg.photo[msg.photo.length - 1].file_id; mediaType = 'photo'; }
  else if (msg.document) { fileId = msg.document.file_id; mediaType = 'document'; }
  else if (msg.video) { fileId = msg.video.file_id; mediaType = 'video'; }
  else if (msg.audio) { fileId = msg.audio.file_id; mediaType = 'audio'; }
  else if (msg.voice) { fileId = msg.voice.file_id; mediaType = 'voice'; }
  else if (msg.animation) { fileId = msg.animation.file_id; mediaType = 'animation'; }
  await send(env, adminChatId(env), `💬 <b>پیام جدید از مشتری</b>\n\n👤 ${lead.name || '-'}\n🆔 <code>${chatId}</code>\n🌐 ${lang}\n\n${text || '(فایل/رسانه ارسال شد)'}`, { reply_markup: adminLeadKeyboard(lead) });
  if (fileId && mediaType) await forwardLeadMedia(env, { file_id: fileId, media_type: mediaType });
  return true;
}

async function processUpdate(env, update) {
  if (update.message?.text === '/id') {
    await send(env, update.message.chat.id, `شناسهٔ این گفت‌وگو: <code>${update.message.chat.id}</code>`);
    return;
  }

  // دستورات ادمین
  if (update.message && String(update.message.chat.id) === String(adminChatId(env))) {
    const text = update.message.text || '';

    if (env.LEADS_KV && text && !text.startsWith('/')) {
      const replyTarget = await env.LEADS_KV.get(`admin:reply:${adminChatId(env)}`);
      if (replyTarget) {
        await send(env, replyTarget, text);
        await env.LEADS_KV.delete(`admin:reply:${adminChatId(env)}`);
        await updateLeadStatus(env, replyTarget, 'contacted');
        await send(env, adminChatId(env), `✅ پاسخ برای مشتری <code>${replyTarget}</code> ارسال شد و وضعیت به «تماس شد» تغییر کرد.`);
        return;
      }
    }

    if (text.startsWith('/reply ')) {
      const parts = text.split(' ');
      const targetId = parts[1];
      const replyText = parts.slice(2).join(' ').trim();
      if (targetId && replyText) {
        await send(env, targetId, replyText);
        await send(env, adminChatId(env), `✅ پیام برای <code>${targetId}</code> ارسال شد.`);
      }
      return;
    }

    if (text.startsWith('/status ')) {
      const parts = text.split(' ');
      const targetId = parts[1];
      const newStatus = parts[2];
      if (targetId && newStatus && env.LEADS_KV) {
        const latestKey = await env.LEADS_KV.get(`latest:${targetId}`);
        if (latestKey) {
          const lead = JSON.parse(await env.LEADS_KV.get(latestKey));
          lead.status = newStatus;
          await env.LEADS_KV.put(latestKey, JSON.stringify(lead));
          await send(env, adminChatId(env), `✅ وضعیت لید <code>${targetId}</code> به <b>${newStatus}</b> تغییر کرد.`);
        }
      }
      return;
    }
    return;
  }

  // Callback
  if (update.callback_query) {
    const q = update.callback_query;
    const chatId = q.message.chat.id;
    await telegram(env, 'answerCallbackQuery', { callback_query_id: q.id });

    if (String(chatId) === String(adminChatId(env)) && q.data.startsWith('admin:')) {
      const parts = q.data.split(':');
      const action = parts[1];
      const targetId = parts[2];
      if (action === 'reply' && targetId) {
        if (env.LEADS_KV) await env.LEADS_KV.put(`admin:reply:${adminChatId(env)}`, targetId, { expirationTtl: 60 * 60 * 2 });
        return send(env, adminChatId(env), `✍️ متن پاسخ برای مشتری <code>${targetId}</code> را در پیام بعدی ارسال کنید.`);
      }
      if (action === 'followup' && targetId) {
        if (env.LEADS_KV) await env.LEADS_KV.put(`admin:reply:${adminChatId(env)}`, targetId, { expirationTtl: 60 * 60 * 2 });
        await updateLeadStatus(env, targetId, 'in_progress');
        return send(env, adminChatId(env), `🔁 متن پیگیری مشتری <code>${targetId}</code> را در پیام بعدی ارسال کنید.`);
      }
      if (action === 'status' && targetId && parts[3]) {
        const status = parts[3];
        const lead = await updateLeadStatus(env, targetId, status);
        const labels = { contacted: 'تماس شد', in_progress: 'در حال پیگیری', done: 'اتمام کار' };
        if (status === 'done' && lead) {
          const surveyLang = (await getLanguage(env, targetId)) || 'fa';
          const surveyText = {
            fa: 'از همکاری شما سپاسگزاریم. لطفاً میزان رضایت خود از پیگیری و خدمات VeltriX را از ۱ تا ۵ امتیاز دهید.',
            en: 'Thank you for working with us. Please rate your satisfaction with VeltriX from 1 to 5.',
            tr: 'İş birliğiniz için teşekkürler. VeltriX hizmetinden memnuniyetinizi 1 ile 5 arasında puanlayın.',
            ar: 'شكراً لتعاونكم معنا. يرجى تقييم رضاكم عن خدمة VeltriX من 1 إلى 5.',
            az: 'Əməkdaşlığınız üçün təşəkkür edirik. VeltriX xidmətindən məmnuniyyətinizi 1-dən 5-ə qədər qiymətləndirin.'
          };
          await send(env, targetId, surveyText[surveyLang] || surveyText.fa, { reply_markup: surveyKeyboard() });
        }
        return send(env, adminChatId(env), lead
          ? `✅ وضعیت مشتری <code>${targetId}</code> به «${labels[status] || status}» تغییر کرد.`
          : `⚠️ لید مشتری <code>${targetId}</code> پیدا نشد.`);
      }
      return;
    }

    if (q.data.startsWith('survey:')) {
      const value = q.data.slice('survey:'.length);
      if (value === 'skip') {
        await saveSurvey(env, chatId, { rating: null, comment: '' });
        await clearState(env, chatId);
        return send(env, chatId, 'ممنون از همراهی شما.');
      }
      const rating = Number(value);
      if (rating >= 1 && rating <= 5) {
        await setState(env, chatId, { step: 'survey_comment', data: { rating } });
        return send(env, chatId, 'اگر مایل هستید، نظر کوتاه خود را هم بنویسید؛ در غیر این صورت «بدون نظر» را ارسال کنید.');
      }
      return;
    }

    if (q.data.startsWith('lang:')) {
      const selected = normalizeLanguage(q.data.slice(5));
      await setLanguage(env, chatId, selected);
      await clearState(env, chatId);
      return send(env, chatId, t(selected).welcome, { reply_markup: menu(selected) });
    }

    const lang = (await getLanguage(env, chatId)) || normalizeLanguage(q.from?.language_code || 'en');

    if (q.data === 'lead') {
      await setState(env, chatId, { step: 'company', data: {}, language: lang });
      return send(env, chatId, t(lang).lead_start + '\n\n' + t(lang).ask_company);
    }

    if (q.data === 'back:menu') {
      return send(env, chatId, t(lang).menu, { reply_markup: menu(lang) });
    }

    if (!q.data.startsWith('service:')) return;
    const serviceId = q.data.slice('service:'.length);
    const service = t(lang).services.find(x => x[1] === serviceId);
    if (service) {
      const prompts = {
        fa: {
          injection: 'ساخت قالب تزریق پلاستیک سفارشی VeltriX، طراحی مسیر ورود مواد، خنک‌کاری، هواگیری و پرانش را متناسب با هندسه قطعه در نظر می‌گیرد. برای بررسی فایل قطعه، انتخاب ماده و شروع پروژه تولیدی خود با ما پیام دهید.',
          hotrunner: 'قالب‌های هات‌رانر، مذاب پلیمر را در منیفولد و نازل‌های گرم نگه می‌دارند و قالب‌های ولوگیت با پین‌های مکانیکی، باز و بسته‌شدن هر گیت را کنترل می‌کنند. راهکار هات‌رانر و ولوگیت بر اساس رزین، هندسه قطعه و نیاز تولید شما انتخاب می‌شود تا کنترل پرشدن و کاهش ضایعات رانر بررسی شود.',
          medical: 'خدمات VeltriX شامل قالب‌های تزریق برای قطعات پزشکی و بسته‌بندی پلاستیکی است که بر اساس هندسه قطعه، رزین و الزامات تولید انتخاب می‌شوند. برای ظروف دیواره‌نازک، درپوش، پیش‌فرم بطری PET و قطعات دقیق، فایل CAD یا مشخصات قطعه را ارسال کنید تا گزینه‌های قالب چندحفره‌ای و راهگاه گرم بررسی شود.',
          auto: 'قالب‌های خودرو و لوازم خانگی VeltriX برای تولید قطعات پلاستیکی دقیق و تکرارپذیر طراحی می‌شوند. برای بررسی قطعه و انتخاب راهکار مناسب، فایل CAD و مشخصات کاربرد را برای ما ارسال کنید.',
          thermo: 'خدمات VeltriX شامل طراحی و ساخت ابزارهای ترموفرمینگ و قالب‌های دایکست برای شکل‌دهی دقیق قطعات پلاستیکی و فلزی است. فایل CAD یا مشخصات قطعه خود را ارسال کنید تا درباره انتخاب ابزار، جزئیات فنی و مسیر ساخت پروژه راهنمایی بگیرید.'
        },
        en: {
          injection: 'VeltriX provides custom plastic injection mold manufacturing with attention to material flow, cooling, venting, and part ejection for repeatable production. Send us your part file or requirements to discuss moldability, material selection, and the next step for your project.',
          hotrunner: 'Hot runner molds keep polymer melt liquid in heated manifolds and nozzles, while valve-gate molds use mechanically actuated pins to control each gate’s opening and closing. Choose the configuration for your resin, part geometry, and production needs to evaluate controlled filling and lower runner scrap.',
          medical: 'VeltriX provides injection molds for medical components and plastic packaging, with the design selected around part geometry, resin, and production requirements. For thin-wall containers, closures, PET bottle preforms, and precision parts, send your CAD file to review suitable multi-cavity or hot-runner options.',
          auto: 'VeltriX develops automotive and appliance molds for accurate, repeatable plastic-part production. Send your CAD file and part requirements to discuss suitable mold design, cooling, gating, and ejection options.',
          thermo: 'VeltriX provides thermoforming tooling and die-casting dies for forming plastic sheets and cast-metal components. Send your CAD file or part requirements to discuss tool design, manufacturability, and the right next step for your project.'
        },
        tr: {
          injection: 'VeltriX, tekrarlanabilir üretim için malzeme akışı, soğutma, havalandırma ve parçanın kalıptan çıkarılmasını dikkate alan özel plastik enjeksiyon kalıpları üretir. Parça dosyanızı veya gereksinimlerinizi göndererek kalıplanabilirlik, malzeme seçimi ve projenizin sonraki adımını görüşebilirsiniz.',
          hotrunner: 'Sıcak yolluklu kalıplar polimer eriyiğini ısıtılmış manifold ve memelerde sıvı tutar; valf kapılı kalıplar ise her kapının açılıp kapanmasını mekanik pimlerle kontrol eder. Konfigürasyon reçinenize, parça geometrinize ve üretim ihtiyacınıza göre seçilerek dolum kontrolü ve yolluk firesi değerlendirilir.',
          medical: 'VeltriX, tıbbi parçalar ve plastik ambalajlar için parça geometrisi, reçine ve üretim gereksinimlerine göre enjeksiyon kalıpları sunar. İnce cidarlı kaplar, kapaklar, PET şişe ön kalıpları veya hassas parçalarınız için CAD dosyanızı göndererek çok gözlü ve sıcak yolluk seçeneklerini değerlendirin.',
          auto: 'VeltriX, otomotiv ve beyaz eşya parçalarının doğru ve tekrarlanabilir üretimi için kalıplar geliştirir. Uygun kalıp tasarımı, soğutma, yolluk ve itici seçeneklerini görüşmek için CAD dosyanızı ve parça gereksinimlerinizi bize gönderin.',
          thermo: 'VeltriX, plastik levhaların termoformlanması ve döküm metal parçaların üretimi için termoform kalıpları ile basınçlı döküm kalıpları sunar. CAD dosyanızı veya parça gereksinimlerinizi göndererek kalıp tasarımı, üretilebilirlik ve projeniz için uygun sonraki adım hakkında bilgi alın.'
        },
        ar: {
          injection: 'تقدم VeltriX تصنيع قوالب حقن بلاستيكية مخصصة مع مراعاة تدفق المادة والتبريد والتنفيـس وإخراج القطعة لتحقيق إنتاج متكرر. أرسل ملف القطعة أو متطلباتك لمناقشة قابلية التصنيع واختيار المادة والخطوة التالية لمشروعك.',
          hotrunner: 'تحافظ قوالب المجرى الساخن على بقاء مصهور البوليمر سائلاً داخل المنايفولد والفوهات المسخّنة، بينما تتحكم قوالب البوابة الصمامية بفتح كل بوابة وإغلاقها عبر دبابيس ميكانيكية. اختَر التهيئة وفق الراتنج وهندسة القطعة ومتطلبات الإنتاج لتقييم التحكم في الملء وتقليل هدر المجرى.',
          medical: 'تقدم VeltriX قوالب حقن للمكوّنات الطبية والتغليف البلاستيكي، مع اختيار التصميم وفق هندسة القطعة ونوع الراتنج ومتطلبات الإنتاج. للحاويات رقيقة الجدار والأغطية ومسبقات زجاجات PET والقطع الدقيقة، أرسل ملف CAD لمراجعة خيارات القوالب متعددة التجاويف أو ذات المجرى الساخن.',
          auto: 'تطوّر VeltriX قوالب السيارات والأجهزة المنزلية لإنتاج قطع بلاستيكية دقيقة ومتكررة الجودة. أرسل ملف CAD ومتطلبات القطعة لمناقشة خيارات تصميم القالب والتبريد والتغذية والإخراج المناسبة.',
          thermo: 'تقدّم VeltriX أدوات التشكيل الحراري وقوالب الصب بالقالب لتشكيل الصفائح البلاستيكية وإنتاج المكوّنات المعدنية المصبوبة. أرسل ملف CAD أو متطلبات القطعة لمناقشة تصميم الأداة وقابلية التصنيع والخطوة المناسبة لمشروعك.'
        },
        az: {
          injection: 'VeltriX təkrarlana bilən istehsal üçün material axını, soyutma, havalandırma və detalın qəlibdən çıxarılmasını nəzərə alan xüsusi plastik inyeksiya qəlibləri hazırlayır. Detal faylınızı və ya tələblərinizi göndərin, qəliblənmə imkanlarını, material seçimini və layihənizin növbəti mərhələsini müzakirə edək.',
          hotrunner: 'İsti kanallı qəliblər polimer ərintisini qızdırılan manifold və ucluqlarda maye saxlayır, klapanlı qapı qəlibləri isə hər qapının açılıb-bağlanmasını mexaniki millərlə idarə edir. Qəlib həlli xammalınıza, detalın həndəsəsinə və istehsal tələbinizə uyğun seçilərək dolmanın idarə olunması və kanal tullantısının azalması qiymətləndirilir.',
          medical: 'VeltriX tibbi komponentlər və plastik qablaşdırma üçün detalın həndəsəsinə, materialına və istehsal tələblərinə uyğun enjeksiyon qəlibləri təklif edir. İncə divarlı qablar, qapaqlar, PET butulka preformları və dəqiq detallar üçün CAD faylınızı göndərin ki, çoxyuvalı və isti kanallı qəlib variantlarını nəzərdən keçirək.',
          auto: 'VeltriX avtomobil və məişət texnikası hissələrinin dəqiq və təkrarlanan istehsalı üçün qəliblər hazırlayır. Uyğun qəlib dizaynı, soyutma, giriş kanalı və çıxarıcı seçimlərini müzakirə etmək üçün CAD faylınızı və detal tələblərinizi bizə göndərin.',
          thermo: 'VeltriX plastik vərəqlərin termoforminqi və tökmə metal hissələrin istehsalı üçün termoform alətləri və təzyiqli tökmə qəlibləri təqdim edir. CAD faylınızı və ya detal tələblərinizi göndərin ki, alət dizaynı, istehsala yararlılıq və layihəniz üçün uyğun növbəti addım barədə məsləhət alasınız.'
        }
      };
      return send(env, chatId, (prompts[lang] || prompts.en)[serviceId] || (prompts.en)[serviceId], {
        reply_markup: backMenu(lang)
      });
    }
    return;
  }

  const msg = update.message;
  if (!msg || !msg.chat) return;

  const chatId = msg.chat.id;
  const text = (msg.text || msg.caption || '').trim();
  const from = msg.from || {};
  const savedLanguage = await getLanguage(env, chatId);
  const lang = savedLanguage || (text ? detectLanguage(text, from.language_code) : normalizeLanguage(from.language_code || 'en'));

  if (text.startsWith('/start') || text.startsWith('/menu')) {
    await clearState(env, chatId);
    if (!savedLanguage) {
      return send(env, chatId, 'لطفاً زبان خود را انتخاب کنید / Please choose your language / Lütfen dilinizi seçin / يرجى اختيار اللغة', { reply_markup: languageMenu() });
    }
    return send(env, chatId, t(lang).welcome, { reply_markup: menu(lang) });
  }

  const hasMedia = !!(msg.photo || msg.document || msg.video || msg.audio || msg.voice || msg.animation);
  let fileId = null;
  let mediaType = null;
  if (msg.photo) fileId = msg.photo[msg.photo.length - 1].file_id;
  if (msg.photo) mediaType = 'photo';
  else if (msg.document) { fileId = msg.document.file_id; mediaType = 'document'; }
  else if (msg.video) { fileId = msg.video.file_id; mediaType = 'video'; }
  else if (msg.audio) { fileId = msg.audio.file_id; mediaType = 'audio'; }
  else if (msg.voice) { fileId = msg.voice.file_id; mediaType = 'voice'; }
  else if (msg.animation) { fileId = msg.animation.file_id; mediaType = 'animation'; }

  let state = await getState(env, chatId);

  // گرفتن اطلاعات مویرگی
  if (state && state.step) {
    if (state.step === 'survey_comment') {
      await saveSurvey(env, chatId, { rating: state.data?.rating || null, comment: text || 'بدون نظر' });
      await clearState(env, chatId);
      return send(env, chatId, 'ممنون از بازخورد شما؛ نظر شما برای بهبود خدمات VeltriX ثبت شد.');
    }
    if (state.step === 'company') {
      state.data.company = text;
      state.step = 'country';
      await setState(env, chatId, state);
      return send(env, chatId, t(lang).ask_country);
    }
    if (state.step === 'country') {
      state.data.country = text;
      state.step = 'part';
      await setState(env, chatId, state);
      return send(env, chatId, t(lang).ask_part);
    }
    if (state.step === 'part') {
      state.data.part = text;
      state.step = 'volume';
      await setState(env, chatId, state);
      return send(env, chatId, t(lang).ask_volume);
    }
    if (state.step === 'volume') {
      state.data.volume = text;
      state.step = 'file';
      await setState(env, chatId, state);
      return send(env, chatId, t(lang).ask_file);
    }
    if (state.step === 'file') {
      const fullText = `شرکت: ${state.data.company}\nکشور: ${state.data.country}\nقطعه: ${state.data.part}\nتیراژ: ${state.data.volume}\nتوضیح اضافی: ${text || '-'}`;
      await saveLead(env, {
        chat_id: chatId,
        username: from.username || '',
        name: [from.first_name, from.last_name].filter(Boolean).join(' '),
        language: lang,
        text: fullText,
        has_media: hasMedia,
        file_id: fileId,
        media_type: mediaType,
        date: new Date().toISOString(),
        channel: 'telegram',
        collected: state.data
      });
      await clearState(env, chatId);
      return send(env, chatId, t(lang).thanks_lead);
    }
  }

  if (await relayCustomerMessage(env, msg, lang)) {
    return send(env, chatId, t(lang).media_thanks || 'پیامتان برای تیم فنی ارسال شد ✅');
  }

  if (hasMedia) {
    await saveLead(env, {
      chat_id: chatId,
      username: from.username || '',
      name: [from.first_name, from.last_name].filter(Boolean).join(' '),
      language: lang,
      text: text || '(فایل ارسال شده)',
      has_media: true,
      file_id: fileId,
      media_type: mediaType,
      date: new Date().toISOString(),
      channel: 'telegram'
    });
    return send(env, chatId, t(lang).media_thanks + '\n\n' + t(lang).thanks_lead);
  }

  const ai = await aiReply(env, lang, text, state);
  if (ai) {
    if (/(ارسال کردم|forwarded|ilettim|أرسلت|ötürdüm)/i.test(ai)) {
      await saveLead(env, {
        chat_id: chatId,
        username: from.username || '',
        name: [from.first_name, from.last_name].filter(Boolean).join(' '),
        language: lang,
        text,
        has_media: false,
        file_id: null,
        date: new Date().toISOString(),
        channel: 'telegram'
      });
    }
    return send(env, chatId, ai, { reply_markup: menu(lang) });
  }

  return send(env, chatId, t(lang).unknown, { reply_markup: menu(lang) });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'GET' && url.pathname === '/health') {
      return new Response(JSON.stringify({ ok: true, service: 'veltrix-bot' }), {
        headers: { 'content-type': 'application/json' }
      });
    }

    if (request.method !== 'POST' || url.pathname !== `/telegram/${env.WEBHOOK_SECRET}`) {
      return new Response('Not found', { status: 404 });
    }

    if (request.method === 'POST' && false) {
      return new Response('Forbidden', { status: 403 });
    }

    try {
      const update = await request.json();
      await processUpdate(env, update);
      return new Response('ok');
    } catch (e) {
      console.error('Worker error:', e);
      return new Response('ok');
    }
  },

  async scheduled(controller, env, ctx) {
    if (controller.cron === '31 5 * * 1') {
      ctx.waitUntil(weeklyReview(env));
    } else {
      ctx.waitUntil(sendDailyReminder(env));
    }
  }
};
