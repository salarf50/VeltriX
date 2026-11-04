# VeltriX Mold Cost

اپ مستقل برآورد هزینهٔ قالب؛ در مسیر ریشهٔ سایت VeltriX ادغام نمی‌شود و CNC دست‌نخورده می‌ماند. سورس نهایی در `apps/mold-cost/` مخزن GitHub است و به Worker مستقل deploy می‌شود. PWA برای iPhone و APK Android/TWA از یک کد رابط تحویل می‌شوند. محاسبات قطعی JavaScript هستند؛ هیچ مدل AI فراخوانی نمی‌شود و توکن مدل مصرف نمی‌شود.

## اجرای محلی

```bash
npm ci
npx wrangler d1 migrations apply veltrix-mold-cost-db --local
npm run dev
```

`npm test` فرمول‌ها را آزمایش می‌کند؛ `npm run build` TypeScript و Wrangler build را بررسی می‌کند؛ `npm run test:integration` سلامت، مسیرها، assetها، کوکی نشست، CORS و محدودیت سهمیه را روی D1 محلی بررسی می‌کند. تست‌های محلی دادهٔ production را لمس نمی‌کنند.

## معماری

`public/` رابط فارسی RTL، محاسبه‌گر، manifest، service worker و آیکون‌ها را نگه می‌دارد. `src/worker.ts` API حساب، سهمیه و اشتراک را اجرا می‌کند. همهٔ مبالغ، ورودی و خروجی، فقط تومان‌اند. D1 جدول‌های `users`, `sessions`, `usage_events`, `subscription_log`, `rate_limits` و `notification_outbox` دارد. Worker اپ با service bindings به Workerهای ربات وصل می‌شود؛ اعلان‌ها با صف و retry زمان‌بندی‌شده تحویل می‌شوند. تلفن و مبلغ برآورد در پیام مدیر درج نمی‌شود.

نشست تصادفی ۳۰روزه به شکل hash در D1 و کوکی `HttpOnly; Secure; SameSite=None` در مرورگر نگه‌داری می‌شود. ماه سهمیه بر اساس تقویم شمسی/منطقهٔ زمانی تهران است. شمارهٔ تلفن در این نسخه پیامکی تأیید نمی‌شود و به‌تنهایی اثبات هویت نیست؛ نقش مدیر نیز فقط از گفت‌وگوی خصوصی ربات مدیر و با فرمان `/admin USER_ID` فعال می‌شود. پس از تأیید، سهمیهٔ محاسباتی حساب نامحدود است. این برنامه مدل AI را فراخوانی نمی‌کند، پس توکن مدل مصرف نمی‌شود.

## ربات‌ها

ربات Telegram موجود: <https://t.me/veltrixmold_bot>. لینک Bale از API واقعی خود ربات (`getMe`) گرفته می‌شود و طبق مستند رسمی به شکل `https://ble.ir/<bot_username>` ساخته می‌شود. کاربر bridge امن را تأیید کرده است. دو Worker فعال با Secretهای مستقل و مسیرهای داخلی محدودشده به هم وصل می‌شوند؛ توکن‌ها خوانده یا در Git ثبت نمی‌شوند و وب‌هوک‌های جاری با همان URL باقی می‌مانند. workflowهای فعلی پس از push همان webhook را با `drop_pending_updates=false` دوباره ثبت می‌کنند.

## نصب

iPhone: آدرس مستقل PWA را در Safari باز کنید، Share و سپس Add to Home Screen را بزنید. Android: همان PWA به Trusted Web Activity بسته‌بندی می‌شود. APK نهایی پس از تنظیم `/.well-known/assetlinks.json` بر اساس package ID `ir.veltrix.moldcost` و گواهی امضا ساخته می‌شود؛ Play Store جزو این تحویل نیست. کلید امضا خارج از Git می‌ماند و باید برای انتشارهای بعدی نگه‌داری شود.

## پیکربندی Cloudflare

D1 مستقل است و migrationهای remote فقط روی همین دیتابیس تازه اجرا می‌شوند. اپ روی `https://veltrix-mold-cost.ali-fayyazi439.workers.dev` هدف‌گذاری شده؛ سایت اصلی و DNS آن تغییر نمی‌کنند. Worker در مرحلهٔ آماده‌سازی غیرعمومی می‌ماند و پس از آزمون پل‌ها public می‌شود.
