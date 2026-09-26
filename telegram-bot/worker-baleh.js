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
      ['نیاز به خدمات پرینت سه‌بعدی دارم', 'print3d'],
      ['نیاز به مشاوره دارم', 'consultation']
    ],
    project_review: 'شروع بررسی پروژه',
    print3d_start: 'برای ثبت درخواست خدمات پرینت سه‌بعدی، نام و شماره تماس شما را می‌گیرم و بعد از دریافت عکس یا فایل قطعه، اطلاعات را برای ادمین می‌فرستم.',
    consult_start: 'برای اینکه مشاوره مناسب‌تری دریافت کنید، نام، شماره تماس و موضوع مشاوره را می‌گیرم و برای ادمین ارسال می‌کنم.',
    ask_name: 'نام و نام خانوادگی‌تان را بفرستید.',
    ask_phone: 'شماره تماس‌تان را بفرستید.',
    ask_consult_topic: 'مشاوره را دربارهٔ چه زمینه‌ای می‌خواهید؟',
    ask_print3d_file: 'حالا لطفاً عکس یا فایل قطعه را بفرستید. اگر توضیحی دارید، همراه فایل بنویسید.',
    invalid_phone: 'لطفاً یک شماره تماس معتبر بفرستید (حداقل ۷ رقم).',
    print3d_thanks: 'ممنون ✅ اطلاعات شما و فایل/عکس قطعه برای ادمین ارسال شد. به‌زودی با شما تماس می‌گیریم.',
    consult_thanks: 'ممنون ✅ درخواست مشاورهٔ شما برای ادمین ارسال شد. به‌زودی با شما تماس می‌گیریم.'
  },
  en: {
    welcome: 'Hello, good time 🌿\nI’m from the VeltriX technical team. Glad you reached out.\nHow can I help you?',
    menu: 'I can guide you about our mold services:',
    lead_start: 'To review your project better, I’ll ask a few small questions. Is that okay?',
    ask_person_name: 'Please send your full name.',
    ask_company: 'What is the name of your company?',
    ask_country: 'Which country or city are you based in?',
    ask_part: 'What type of part or product do you need the mold for?',
    ask_volume: 'What’s the approximate production volume?',
    ask_file: 'If you have drawings, photos or 3D files, please send them so I can review more accurately.',
    thanks_lead: 'Thank you for the information ✅\nI’ve forwarded your request to the technical team. I’ll get back to you soon with the result.',
    media_thanks: 'I’ve received your file/photo, thank you. Registering it now.',
    unknown: 'I’m here to help. If you have questions about plastic injection molds, hot runner, medical or automotive molds, just tell me.',
    services: [
      ['I need 3D printing services', 'print3d'],
      ['I need a consultation', 'consultation']
    ],
    project_review: 'Start Project Review',
    print3d_start: 'To register your 3D printing request, I will collect your name and phone number, then send your part photo or file to the administrator.',
    consult_start: 'To arrange a useful consultation, I will collect your name, phone number, and consultation topic for the administrator.',
    ask_name: 'Please send your full name.',
    ask_phone: 'Please send your phone number.',
    ask_consult_topic: 'What would you like to discuss?',
    ask_print3d_file: 'Now please send a photo or file of the part. Add any useful notes with it.',
    invalid_phone: 'Please send a valid phone number with at least 7 digits.',
    print3d_thanks: 'Thank you ✅ Your details and part photo/file were sent to the administrator. We will contact you soon.',
    consult_thanks: 'Thank you ✅ Your consultation request was sent to the administrator. We will contact you soon.'
  },
  tr: {
    welcome: 'Merhaba, iyi günler 🌿\nVeltriX teknik ekibinden yazıyorum. Mesajınız için teşekkürler.\nSize nasıl yardımcı olabilirim?',
    menu: 'Kalıp hizmetlerimiz hakkında size yardımcı olabilirim:',
    lead_start: 'Projenizi daha iyi inceleyebilmem için birkaç küçük bilgi alabilir miyim?',
    ask_person_name: 'Lütfen adınızı ve soyadınızı gönderin.',
    ask_company: 'Şirketinizin adı nedir?',
    ask_country: 'Hangi ülke veya şehirdesiniz?',
    ask_part: 'Hangi parça veya ürün için kalıp istiyorsunuz?',
    ask_volume: 'Yaklaşık üretim adediniz nedir?',
    ask_file: 'Çizim, fotoğraf veya 3D dosyanız varsa gönderebilirsiniz.',
    thanks_lead: 'Bilgileriniz için teşekkürler ✅\nTalebinizi teknik ekibe ilettim. En kısa sürede size dönüş yapacağım.',
    media_thanks: 'Dosyanızı/fotoğrafınızı aldım, teşekkürler. Kaydediyorum.',
    unknown: 'Size yardımcı olmak için buradayım. Plastik enjeksiyon, hot runner, medikal veya otomotiv kalıpları hakkında sorularınızı sorabilirsiniz.',
    services: [
      ['3D baskı hizmetine ihtiyacım var', 'print3d'],
      ['Danışmanlığa ihtiyacım var', 'consultation']
    ],
    project_review: 'Proje İncelemesine Başla',
    print3d_start: '3D baskı talebinizi kaydetmek için adınızı ve telefonunuzu alacağım; ardından parça fotoğrafını veya dosyasını yöneticiye ileteceğim.',
    consult_start: 'Uygun bir danışmanlık için adınızı, telefonunuzu ve danışmanlık konusunu yöneticiye iletmek üzere alacağım.',
    ask_name: 'Lütfen adınızı ve soyadınızı gönderin.',
    ask_phone: 'Lütfen telefon numaranızı gönderin.',
    ask_consult_topic: 'Hangi konuda danışmanlık istiyorsunuz?',
    ask_print3d_file: 'Şimdi lütfen parçanın fotoğrafını veya dosyasını gönderin. Varsa açıklamanızı da ekleyin.',
    invalid_phone: 'Lütfen en az 7 haneli geçerli bir telefon numarası gönderin.',
    print3d_thanks: 'Teşekkürler ✅ Bilgileriniz ve parça dosyanız/fotoğrafınız yöneticiye iletildi. Yakında sizinle iletişime geçeceğiz.',
    consult_thanks: 'Teşekkürler ✅ Danışmanlık talebiniz yöneticiye iletildi. Yakında sizinle iletişime geçeceğiz.'
  },
  ar: {
    welcome: 'مرحباً، طاب يومكم 🌿\nأنا من الفريق الفني في VeltriX. سعيد بتواصلكم.\nكيف يمكنني مساعدتكم؟',
    menu: 'يمكنني إرشادكم حول خدمات تصنيع القوالب:',
    lead_start: 'لكي أتمكن من مراجعة مشروعكم بشكل أفضل، هل يمكنني طرح بعض الأسئلة البسيطة؟',
    ask_person_name: 'يرجى إرسال الاسم الكامل.',
    ask_company: 'ما اسم شركتكم؟',
    ask_country: 'في أي دولة أو مدينة أنتم؟',
    ask_part: 'ما نوع القطعة أو المنتج الذي تحتاجون قالباً له؟',
    ask_volume: 'ما الكمية التقريبية للإنتاج؟',
    ask_file: 'إذا كان لديكم رسومات أو صور أو ملفات ثلاثية الأبعاد، يرجى إرسالها.',
    thanks_lead: 'شكراً على المعلومات ✅\nأرسلت طلبكم إلى الفريق الفني. سأعود إليكم قريباً بالنتيجة.',
    media_thanks: 'استلمت الملف/الصورة، شكراً. أقوم بتسجيله الآن.',
    unknown: 'أنا هنا لمساعدتكم. يمكنكم سؤالي عن قوالب حقن البلاستيك أو الهوت رانر أو القوالب الطبية والسيارات.',
    services: [
      ['أحتاج إلى خدمات الطباعة ثلاثية الأبعاد', 'print3d'],
      ['أحتاج إلى استشارة', 'consultation']
    ],
    project_review: 'بدء مراجعة المشروع',
    print3d_start: 'لتسجيل طلب الطباعة ثلاثية الأبعاد، سأجمع اسمكم ورقم هاتفكم ثم أرسل صورة القطعة أو ملفها إلى المسؤول.',
    consult_start: 'لتنظيم استشارة مناسبة، سأجمع اسمكم ورقم هاتفكم وموضوع الاستشارة وأرسله إلى المسؤول.',
    ask_name: 'يرجى إرسال الاسم الكامل.',
    ask_phone: 'يرجى إرسال رقم الهاتف.',
    ask_consult_topic: 'في أي موضوع ترغبون في الاستشارة؟',
    ask_print3d_file: 'الآن يرجى إرسال صورة القطعة أو ملفها، ويمكنكم إضافة ملاحظاتكم معها.',
    invalid_phone: 'يرجى إرسال رقم هاتف صالح مكوّن من 7 أرقام على الأقل.',
    print3d_thanks: 'شكراً ✅ تم إرسال معلوماتكم وصورة/ملف القطعة إلى المسؤول. سنتواصل معكم قريباً.',
    consult_thanks: 'شكراً ✅ تم إرسال طلب الاستشارة إلى المسؤول. سنتواصل معكم قريباً.'
  },
  az: {
    welcome: 'Salam, yaxşı günlər 🌿\nVeltriX texniki komandasından yazıram. Mesajınız üçün təşəkkürlər.\nSizə necə kömək edə bilərəm?',
    menu: 'Qəlib xidmətlərimiz haqqında sizə kömək edə bilərəm:',
    lead_start: 'Layihənizi daha yaxşı nəzərdən keçirmək üçün bir neçə kiçik məlumat ala bilərəmmi?',
    ask_person_name: 'Zəhmət olmasa adınızı və soyadınızı göndərin.',
    ask_company: 'Şirkətinizin adı nədir?',
    ask_country: 'Hansı ölkə və ya şəhərdəsiniz?',
    ask_part: 'Hansı detal və ya məhsul üçün qəlib istəyirsiniz?',
    ask_volume: 'Təxmini istehsal sayınız nə qədərdir?',
    ask_file: 'Çertyoj, şəkil və ya 3D faylınız varsa göndərə bilərsiniz.',
    thanks_lead: 'Məlumatlarınız üçün təşəkkürlər ✅\nSorğunuzu texniki komandaya ötürdüm. Tezliklə nəticə ilə sizə qayıdacağam.',
    media_thanks: 'Faylınızı/şəklinizi aldım, təşəkkürlər. Qeyd edirəm.',
    unknown: 'Sizə kömək etmək üçün buradayam. Plastik inyeksiya, hot runner, tibbi və ya avtomobil qəlibləri haqqında suallarınızı verə bilərsiniz.',
    services: [
      ['3D çap xidmətinə ehtiyacım var', 'print3d'],
      ['Məsləhətləşməyə ehtiyacım var', 'consultation']
    ],
    project_review: 'Layihə baxışına başla',
    print3d_start: '3D çap sorğunuzu qeyd etmək üçün adınızı və telefonunuzu alacağam, sonra detalın şəklini və ya faylını administratora göndərəcəyəm.',
    consult_start: 'Uyğun məsləhət üçün adınızı, telefonunuzu və məsləhət mövzusunu administratora göndərmək üçün alacağam.',
    ask_name: 'Zəhmət olmasa adınızı və soyadınızı göndərin.',
    ask_phone: 'Zəhmət olmasa telefon nömrənizi göndərin.',
    ask_consult_topic: 'Hansı mövzuda məsləhət istəyirsiniz?',
    ask_print3d_file: 'İndi zəhmət olmasa detalın şəklini və ya faylını göndərin. Varsa izahınızı da əlavə edin.',
    invalid_phone: 'Zəhmət olmasa ən azı 7 rəqəmli düzgün telefon nömrəsi göndərin.',
    print3d_thanks: 'Təşəkkürlər ✅ Məlumatlarınız və detal faylınız/şəkliniz administratora göndərildi. Tezliklə sizinlə əlaqə saxlayacağıq.',
    consult_thanks: 'Təşəkkürlər ✅ Məsləhət sorğunuz administratora göndərildi. Tezliklə sizinlə əlaqə saxlayacağıq.'
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

function validPhone(value = '') {
  return String(value).replace(/\D/g, '').length >= 7;
}

function journeyPrompt(lang, step, total, question) {
  const labels = {
    fa: 'مرحله', en: 'Step', tr: 'Adım', ar: 'المرحلة', az: 'Mərhələ'
  };
  const encouragement = {
    fa: 'عالی پیش می‌روید؛ هر پاسخ، یک قدم واقعی برای تبدیل ایده به نتیجه است.',
    en: 'You are making real progress; every answer turns your idea into a clear next step.',
    tr: 'Harika ilerliyorsunuz; her cevap fikrinizi gerçek bir sonraki adıma dönüştürüyor.',
    ar: 'أنتم تتقدمون بشكل رائع؛ كل إجابة تحوّل فكرتكم إلى خطوة واضحة.',
    az: 'Əla irəliləyirsiniz; hər cavab ideyanızı real növbəti addıma çevirir.'
  };
  const label = labels[lang] || labels.en;
  const note = encouragement[lang] || encouragement.en;
  return '✨ ' + label + ' ' + step + '/' + total + '\n' + note + '\n\n' + question;
}

const ACTIONS = {
  fa: {
    location: '📍 مسیریابی با نشان', contact: '📞 دریافت شماره تماس',
    locationMessage: '📍 لینک مسیریابی VeltriX در نرم‌افزار نشان:\nhttps://nshn.ir/rbAyVnpCdN0H',
    contactMessage: '📞 شماره تماس VeltriX: +989141026956\nاین شماره هر روز از ساعت ۸ صبح تا ۷ عصر پاسخ‌گو است.\n\nدر بله، روبیکا، واتساپ و دایرکت اینستاگرام نیز پاسخ‌گو هستیم؛ اما برای دریافت سریع‌تر پاسخ، بهتر است از ربات استفاده کنید.'
  },
  en: {
    location: '📍 Navigate with Neshan', contact: '📞 Get phone number',
    locationMessage: '📍 VeltriX location link in Neshan:\nhttps://nshn.ir/rbAyVnpCdN0H',
    contactMessage: '📞 VeltriX phone: +989141026956\nWe respond every day from 8:00 AM to 7:00 PM.\n\nWe also respond on Baleh, Rubika, WhatsApp and Instagram Direct. For a faster response, please use the bot.'
  },
  tr: {
    location: '📍 Neshan ile yol tarifi', contact: '📞 Telefon numarasını al',
    locationMessage: '📍 VeltriX Neshan konum bağlantısı:\nhttps://nshn.ir/rbAyVnpCdN0H',
    contactMessage: '📞 VeltriX telefon: +989141026956\nHer gün 08:00-19:00 arasında yanıt veriyoruz.\n\nBaleh, Rubika, WhatsApp ve Instagram Direct üzerinden de yanıt veriyoruz; daha hızlı cevap için botu kullanmanız önerilir.'
  },
  ar: {
    location: '📍 الاتجاه عبر نشان', contact: '📞 الحصول على رقم الهاتف',
    locationMessage: '📍 رابط موقع VeltriX في تطبيق نشان:\nhttps://nshn.ir/rbAyVnpCdN0H',
    contactMessage: '📞 هاتف VeltriX: +989141026956\nنجيب يومياً من الساعة 8 صباحاً حتى 7 مساءً.\n\nنجيب أيضاً عبر بله وروبيكا وواتساب والرسائل المباشرة في إنستغرام؛ وللحصول على رد أسرع يُفضّل استخدام الروبوت.'
  },
  az: {
    location: '📍 Neshan ilə istiqamət', contact: '📞 Telefon nömrəsini al',
    locationMessage: '📍 VeltriX-in Neshan xəritə bağlantısı:\nhttps://nshn.ir/rbAyVnpCdN0H',
    contactMessage: '📞 VeltriX telefonu: +989141026956\nHər gün səhər 8-dən axşam 7-yə qədər cavab veririk.\n\nBaleh, Rubika, WhatsApp və Instagram Direct-də də cavab veririk; daha sürətli cavab üçün botdan istifadə etməyiniz tövsiyə olunur.'
  }
};

function menu(lang) {
  const texts = t(lang);
  return {
    inline_keyboard: [
      ...texts.services.map(([label, id]) => [{ text: label, callback_data: `service:${id}` }]),
      [{ text: texts.project_review, callback_data: 'lead' }],
      [{ text: (ACTIONS[lang] || ACTIONS.en).location, callback_data: 'location' }, { text: (ACTIONS[lang] || ACTIONS.en).contact, callback_data: 'contact' }]
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

function leadControls(lang, canGoBack = false) {
  const labels = {
    fa: { back: '⬅️ مرحله قبل', erase: '🗑 حذف حافظه' },
    en: { back: '⬅️ Previous step', erase: '🗑 Delete memory' },
    tr: { back: '⬅️ Önceki adım', erase: '🗑 Hafızayı sil' },
    ar: { back: '⬅️ الخطوة السابقة', erase: '🗑 حذف الذاكرة' },
    az: { back: '⬅️ Əvvəlki mərhələ', erase: '🗑 Yaddaşı sil' }
  }[lang] || { back: '⬅️ Previous step', erase: '🗑 Delete memory' };
  return { inline_keyboard: [[...(canGoBack ? [{ text: labels.back, callback_data: 'lead:back' }] : []), { text: labels.erase, callback_data: 'memory:delete' }]] };
}

function restartKeyboard() {
  return { keyboard: [[{ text: '/start' }]], resize_keyboard: true, one_time_keyboard: false };
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

async function deleteCustomerMemory(env, chatId) {
  if (!env.LEADS_KV) return;
  const listed = await env.LEADS_KV.list({ prefix: 'lead:', limit: 1000 });
  for (const key of listed.keys || []) {
    if (key.name.endsWith(`:${chatId}`)) await env.LEADS_KV.delete(key.name);
  }
  await Promise.all([
    env.LEADS_KV.delete(`latest:${chatId}`),
    env.LEADS_KV.delete(`state:${chatId}`),
    env.LEADS_KV.delete(`language:${chatId}`),
    env.LEADS_KV.delete(`latest_survey:${chatId}`)
  ]);
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

function isCompletedLead(lead) {
  return ['done', 'closed', 'completed'].includes(String(lead?.status || '').trim().toLowerCase());
}

async function latestLeads(env) {
  if (!env.LEADS_KV) return [];
  const listed = await env.LEADS_KV.list({ prefix: 'latest:', limit: 1000 });
  const leads = [];
  for (const key of listed.keys || []) {
    const leadKey = await env.LEADS_KV.get(key.name);
    if (!leadKey) continue;
    const raw = await env.LEADS_KV.get(leadKey);
    if (!raw) continue;
    try { leads.push(JSON.parse(raw)); } catch {}
  }
  return leads;
}

async function sendAdminReport(env, adminId) {
  const leads = await latestLeads(env);
  const open = leads.filter(lead => !isCompletedLead(lead));
  const done = leads.length - open.length;
  const byChannel = leads.reduce((out, lead) => { const key = lead.channel || 'unknown'; out[key] = (out[key] || 0) + 1; return out; }, {});
  const byLanguage = leads.reduce((out, lead) => { const key = lead.language || 'unknown'; out[key] = (out[key] || 0) + 1; return out; }, {});
  const line = (obj) => Object.entries(obj).map(([key, value]) => `${key}: ${value}`).join(' | ') || '-';
  await send(env, adminId, `📊 <b>گزارش مرکزی VeltriX</b>\n\nکل پرونده‌های آخرین وضعیت: <b>${leads.length}</b>\nباز و نیازمند پیگیری: <b>${open.length}</b>\nاتمام‌یافته: <b>${done}</b>\n\n🌐 زبان‌ها: ${line(byLanguage)}\n📥 کانال‌ها: ${line(byChannel)}\n\n${open.length ? 'پرونده‌های باز در پیام‌های بعدی ارسال می‌شوند.' : 'در حال حاضر پروندهٔ بازی وجود ندارد.'}`);
  for (const lead of open.sort((a, b) => String(a.date || '').localeCompare(String(b.date || ''))).slice(0, 40)) {
    await send(env, adminId, `👤 <b>${lead.name || 'بدون نام'}</b>\n🏢 ${lead.collected?.company || '-'}\n📌 ${lead.status || 'new'}\n🌐 ${lead.language || '-'}\n📥 ${lead.channel || '-'}\n🆔 <code>${lead.chat_id}</code>`, { reply_markup: adminLeadKeyboard(lead) });
  }
}

async function sendDailyReminder(env) {
  if (!env.LEADS_KV) return;
  const listed = await env.LEADS_KV.list({ prefix: 'latest:', limit: 1000 });
  const leads = [];
  for (const key of listed.keys || []) {
    const leadKey = await env.LEADS_KV.get(key.name);
    if (!leadKey) continue;
    const raw = await env.LEADS_KV.get(leadKey);
    if (!raw) continue;
    try {
      const lead = JSON.parse(raw);
      if (!isCompletedLead(lead)) leads.push(lead);
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

async function translateText(env, text, targetLang) {
  if (!text || !env.AI || targetLang === 'fa') return text || '';
  try {
    const result = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
      messages: [
        {
          role: 'system',
          content: `Translate the user's message into language code ${targetLang}. Return ONLY the translation, with no commentary, labels, quotation marks, or extra text. Preserve names, numbers, URLs, file names, and HTML tags exactly.`
        },
        { role: 'user', content: text }
      ]
    });
    return String(result?.response || text).trim();
  } catch {
    return text;
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
  if (['done', 'closed', 'completed'].includes(String(lead.status || '').trim().toLowerCase())) return false;
  const customerLang = normalizeLanguage((await getLanguage(env, chatId)) || lead.language || lang);
  const text = (msg.text || msg.caption || '').trim();
  let fileId = null;
  let mediaType = null;
  if (msg.photo) { fileId = msg.photo[msg.photo.length - 1].file_id; mediaType = 'photo'; }
  else if (msg.document) { fileId = msg.document.file_id; mediaType = 'document'; }
  else if (msg.video) { fileId = msg.video.file_id; mediaType = 'video'; }
  else if (msg.audio) { fileId = msg.audio.file_id; mediaType = 'audio'; }
  else if (msg.voice) { fileId = msg.voice.file_id; mediaType = 'voice'; }
  else if (msg.animation) { fileId = msg.animation.file_id; mediaType = 'animation'; }
  const persianText = text ? await translateText(env, text, 'fa') : '(فایل/رسانه ارسال شد)';
  await send(env, adminChatId(env), `💬 <b>پیام جدید از مشتری</b>\n\n👤 ${lead.name || '-'}\n🆔 <code>${chatId}</code>\n🌐 زبان مشتری: ${customerLang}\n\n${persianText}`, { reply_markup: adminLeadKeyboard(lead) });
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

    if (text === '/report' || text === '/گزارش') {
      await sendAdminReport(env, adminChatId(env));
      return;
    }

    if (env.LEADS_KV && text && !text.startsWith('/')) {
      const replyTarget = await env.LEADS_KV.get(`admin:reply:${adminChatId(env)}`);
      if (replyTarget) {
        const latestKey = await env.LEADS_KV.get(`latest:${replyTarget}`);
        const latestRaw = latestKey ? await env.LEADS_KV.get(latestKey) : null;
        const targetLead = latestRaw ? JSON.parse(latestRaw) : {};
        const targetLang = normalizeLanguage((await getLanguage(env, replyTarget)) || targetLead.language || 'fa');
        await send(env, replyTarget, await translateText(env, text, targetLang));
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
        const latestKey = await env.LEADS_KV.get(`latest:${targetId}`);
        const latestRaw = latestKey ? await env.LEADS_KV.get(latestKey) : null;
        const targetLead = latestRaw ? JSON.parse(latestRaw) : {};
        const targetLang = normalizeLanguage((await getLanguage(env, targetId)) || targetLead.language || 'fa');
        await send(env, targetId, await translateText(env, replyText, targetLang));
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
          const doneLang = normalizeLanguage((await getLanguage(env, targetId)) || lead.language || 'fa');
          const doneText = { fa: '✅ کار مشتری به پایان رسید. اگر دوباره به راهنمایی نیاز داشتید، دکمهٔ /start را بزنید.', en: '✅ This customer case is complete. If you need help again, press /start.', tr: '✅ Bu müşteri süreci tamamlandı. Yeniden yardım için /start düğmesine basın.', ar: '✅ اكتملت متابعة هذا العميل. إذا احتجتم المساعدة مجدداً اضغطوا على /start.', az: '✅ Bu müştəri işi tamamlandı. Yenidən kömək üçün /start düyməsinə basın.' };
          await send(env, targetId, doneText[doneLang] || doneText.fa, { reply_markup: restartKeyboard() });
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

    if (q.data === 'memory:delete') {
      await deleteCustomerMemory(env, chatId);
      return send(env, chatId, '✅ حافظه و لیدهای شما پاک شد. برای شروع دوباره /start را بزنید.', { reply_markup: languageMenu() });
    }

    if (q.data === 'lead:back') {
      const state = await getState(env, chatId);
      const previous = { company: 'person_name', phone: 'company', country: 'phone', part: 'country', volume: 'part', file: 'volume' }[state?.step];
      if (!state || !previous) return send(env, chatId, journeyPrompt(lang, 1, 7, t(lang).lead_start + '\n\n' + t(lang).ask_person_name), { reply_markup: leadControls(lang) });
      delete state.data?.[state.step];
      state.step = previous;
      await setState(env, chatId, state);
      const question = { person_name: t(lang).ask_person_name, company: t(lang).ask_company, phone: t(lang).ask_phone, country: t(lang).ask_country, part: t(lang).ask_part, volume: t(lang).ask_volume }[previous];
      return send(env, chatId, `✏️ ${question}`, { reply_markup: leadControls(lang, previous !== 'company') });
    }

    if (q.data === 'lead') {
      await setState(env, chatId, { step: 'person_name', data: {}, language: lang });
      return send(env, chatId, journeyPrompt(lang, 1, 7, t(lang).lead_start + '\n\n' + t(lang).ask_person_name), { reply_markup: leadControls(lang) });
    }

    if (q.data === 'back:menu') {
      return send(env, chatId, t(lang).menu, { reply_markup: menu(lang) });
    }

    if (q.data === 'location') {
      return send(env, chatId, (ACTIONS[lang] || ACTIONS.en).locationMessage, { reply_markup: backMenu(lang) });
    }

    if (q.data === 'contact') {
      return send(env, chatId, (ACTIONS[lang] || ACTIONS.en).contactMessage, { reply_markup: backMenu(lang) });
    }

    if (!q.data.startsWith('service:')) return;
    const serviceId = q.data.slice('service:'.length);
    if (serviceId === 'print3d') {
      await setState(env, chatId, { flow: 'print3d', step: 'print3d_name', data: {}, language: lang });
      return send(env, chatId, journeyPrompt(lang, 1, 3, t(lang).print3d_start + '\n\n' + t(lang).ask_name), { reply_markup: leadControls(lang) });
    }
    if (serviceId === 'consultation') {
      await setState(env, chatId, { flow: 'consultation', step: 'consult_name', data: {}, language: lang });
      return send(env, chatId, journeyPrompt(lang, 1, 3, t(lang).consult_start + '\n\n' + t(lang).ask_name), { reply_markup: leadControls(lang) });
    }
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
    return send(env, chatId, '🌿 به VeltriX خوش آمدید\nWelcome to VeltriX\nVeltriX\'e hoş geldiniz\nمرحباً بكم في VeltriX\nVeltriX-ə xoş gəlmisiniz\n\n✨ شما آماده‌اید یک قدم واقعی برای تبدیل ایده‌تان به نتیجه بردارید. زبان خود را انتخاب کنید تا مسیر را با هم شروع کنیم.', { reply_markup: languageMenu() });
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
    if (state.flow === 'print3d') {
      if (state.step === 'print3d_name') {
        state.data.name = text;
        state.step = 'print3d_phone';
        await setState(env, chatId, state);
        return send(env, chatId, journeyPrompt(lang, 2, 3, t(lang).ask_phone), { reply_markup: leadControls(lang) });
      }
      if (state.step === 'print3d_phone') {
        const phone = msg.contact?.phone_number || text;
        if (!validPhone(phone)) return send(env, chatId, t(lang).invalid_phone, { reply_markup: leadControls(lang) });
        state.data.phone = phone;
        state.step = 'print3d_file';
        await setState(env, chatId, state);
        return send(env, chatId, journeyPrompt(lang, 3, 3, t(lang).ask_print3d_file), { reply_markup: leadControls(lang) });
      }
      if (state.step === 'print3d_file') {
        if (!hasMedia) return send(env, chatId, journeyPrompt(lang, 3, 3, t(lang).ask_print3d_file), { reply_markup: leadControls(lang) });
        const fullText = 'درخواست پرینت سه‌بعدی\nنام: ' + state.data.name + '\nشماره تماس: ' + state.data.phone + '\nتوضیح فایل/قطعه: ' + (text || '-');
        await saveLead(env, { chat_id: chatId, username: from.username || '', name: state.data.name, language: lang, text: fullText, has_media: true, file_id: fileId, media_type: mediaType, date: new Date().toISOString(), channel: 'baleh', collected: { ...state.data, request_type: '3d_printing', file_caption: text || '' } });
        await clearState(env, chatId);
        return send(env, chatId, t(lang).print3d_thanks + '\n\n🏆 این مأموریت با موفقیت ثبت شد؛ تیم ما حالا بررسی فنی را آغاز می‌کند.');
      }
    }

    if (state.flow === 'consultation') {
      if (state.step === 'consult_name') {
        state.data.name = text;
        state.step = 'consult_phone';
        await setState(env, chatId, state);
        return send(env, chatId, journeyPrompt(lang, 2, 3, t(lang).ask_phone), { reply_markup: leadControls(lang) });
      }
      if (state.step === 'consult_phone') {
        const phone = msg.contact?.phone_number || text;
        if (!validPhone(phone)) return send(env, chatId, t(lang).invalid_phone, { reply_markup: leadControls(lang) });
        state.data.phone = phone;
        state.step = 'consult_topic';
        await setState(env, chatId, state);
        return send(env, chatId, journeyPrompt(lang, 3, 3, t(lang).ask_consult_topic), { reply_markup: leadControls(lang) });
      }
      if (state.step === 'consult_topic') {
        state.data.topic = text;
        const fullText = 'درخواست مشاوره\nنام: ' + state.data.name + '\nشماره تماس: ' + state.data.phone + '\nزمینه مشاوره: ' + state.data.topic;
        await saveLead(env, { chat_id: chatId, username: from.username || '', name: state.data.name, language: lang, text: fullText, has_media: false, file_id: null, date: new Date().toISOString(), channel: 'baleh', collected: { ...state.data, request_type: 'consultation' } });
        await clearState(env, chatId);
        return send(env, chatId, t(lang).consult_thanks + '\n\n🏆 شما یک قدم جدی برای حل مسئله‌تان برداشتید؛ تیم ما حالا درخواست را بررسی می‌کند.');
      }
    }
    if (state.step === 'person_name') {
      state.data.person_name = text;
      state.step = 'company';
      await setState(env, chatId, state);
      return send(env, chatId, journeyPrompt(lang, 2, 7, t(lang).ask_company), { reply_markup: leadControls(lang, true) });
    }
    if (state.step === 'company') {
      state.data.company = text;
      state.step = 'phone';
      await setState(env, chatId, state);
      return send(env, chatId, journeyPrompt(lang, 3, 7, t(lang).ask_phone), { reply_markup: leadControls(lang, true) });
    }
    if (state.step === 'phone') {
      const phone = msg.contact?.phone_number || text;
      if (!validPhone(phone)) return send(env, chatId, t(lang).invalid_phone, { reply_markup: leadControls(lang, true) });
      state.data.phone = phone;
      state.step = 'country';
      await setState(env, chatId, state);
      return send(env, chatId, journeyPrompt(lang, 4, 7, t(lang).ask_country), { reply_markup: leadControls(lang, true) });
    }
    if (state.step === 'country') {
      state.data.country = text;
      state.step = 'part';
      await setState(env, chatId, state);
      return send(env, chatId, journeyPrompt(lang, 5, 7, t(lang).ask_part), { reply_markup: leadControls(lang, true) });
    }
    if (state.step === 'part') {
      state.data.part = text;
      state.step = 'volume';
      await setState(env, chatId, state);
      return send(env, chatId, journeyPrompt(lang, 6, 7, t(lang).ask_volume), { reply_markup: leadControls(lang, true) });
    }
    if (state.step === 'volume') {
      state.data.volume = text;
      state.step = 'file';
      await setState(env, chatId, state);
      return send(env, chatId, journeyPrompt(lang, 7, 7, t(lang).ask_file), { reply_markup: leadControls(lang, true) });
    }
    if (state.step === 'file') {
      const fullText = `نام: ${state.data.person_name}\nشرکت: ${state.data.company}\nشماره تماس: ${state.data.phone}\nکشور: ${state.data.country}\nقطعه: ${state.data.part}\nتیراژ: ${state.data.volume}\nتوضیح اضافی: ${text || '-'}`;
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
        channel: 'baleh',
        collected: state.data
      });
      await clearState(env, chatId);
      return send(env, chatId, t(lang).thanks_lead + '\n\n🏆 اطلاعات تماس و پروژه‌تان کامل ثبت شد؛ تیم فنی حالا بررسی را آغاز می‌کند.');
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
      channel: 'baleh'
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
        channel: 'baleh'
      });
    }
    return send(env, chatId, ai, { reply_markup: menu(lang) });
  }

  return send(env, chatId, t(lang).unknown, { reply_markup: menu(lang) });
}

export default {
  async fetch(request, env, ctx) {
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
      ctx.waitUntil(processUpdate(env, update));
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
