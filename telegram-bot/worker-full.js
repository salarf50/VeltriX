// ==========================================
// آیدی ادمین تنظیم شده
// ==========================================
const ADMIN_CHAT_ID = "93648454";

// بقیه را در Cloudflare به صورت Secret تنظیم کن:
// TELEGRAM_BOT_TOKEN  → توکن ربات
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

async function telegram(env, method, body) {
  try {
    const res = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/${method}`, {
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
    await send(env, ADMIN_CHAT_ID, msg);
    await forwardLeadMedia(env, lead);
  } catch (e) {
    console.error('saveLead error:', e);
  }
}

async function forwardLeadMedia(env, lead) {
  if (!lead.file_id || !lead.media_type) return;
  const payload = { chat_id: ADMIN_CHAT_ID };
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

async function processUpdate(env, update) {
  // دستورات ادمین
  if (update.message && String(update.message.chat.id) === String(ADMIN_CHAT_ID)) {
    const text = update.message.text || '';

    if (text.startsWith('/reply ')) {
      const parts = text.split(' ');
      const targetId = parts[1];
      const replyText = parts.slice(2).join(' ').trim();
      if (targetId && replyText) {
        await send(env, targetId, replyText);
        await send(env, ADMIN_CHAT_ID, `✅ پیام برای <code>${targetId}</code> ارسال شد.`);
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
          await send(env, ADMIN_CHAT_ID, `✅ وضعیت لید <code>${targetId}</code> به <b>${newStatus}</b> تغییر کرد.`);
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
        fa: `<b>${service[0]}</b> برای تولید قطعات دقیق و باکیفیت طراحی و ساخته می‌شود. برای بررسی نیاز فنی و دریافت راهنمایی متناسب با پروژه، گزینهٔ بررسی پروژه را انتخاب کنید.`,
        en: `<b>${service[0]}</b> is designed and manufactured for accurate, high-quality part production. Choose Project Review for technical guidance tailored to your project.`,
        tr: `<b>${service[0]}</b>, hassas ve yüksek kaliteli parça üretimi için tasarlanır ve üretilir. Projenize özel teknik yönlendirme için Proje İncelemesini seçin.`,
        ar: `يتم تصميم وتصنيع <b>${service[0]}</b> لإنتاج قطع دقيقة وعالية الجودة. اختاروا مراجعة المشروع للحصول على إرشاد فني مناسب لمشروعكم.`,
        az: `<b>${service[0]}</b> dəqiq və yüksək keyfiyyətli detalların istehsalı üçün hazırlanır və istehsal edilir. Layihənizə uyğun texniki məsləhət üçün Layihə baxışını seçin.`
      };
      return send(env, chatId, prompts[lang] || prompts.en, {
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

    if (request.headers.get('X-Telegram-Bot-Api-Secret-Token') !== env.WEBHOOK_SECRET) {
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
  }
};
