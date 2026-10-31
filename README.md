# mh-mohammed-hanish
Mohammed Hanish Portfolio

## لوحة الإدارة

الدليل العربي للتشغيل وتسجيل الدخول والمراجعة: [docs/ADMIN.ar.md](docs/ADMIN.ar.md).

الموقع ثابت ومتوافق مع GitHub Pages. شغّله محليًا باستخدام `python3 -m http.server 8000 --bind 127.0.0.1`، ثم افتح مسار `/admin/` محليًا. الدخول الحقيقي يحتاج إعداد GitHub OAuth وخدمة Cloudflare Worker الواردة في الدليل. لا توجد كلمات مرور داخل ملفات الموقع.

الاختبارات: `npm ci` ثم `npm test`، ومع تشغيل الخادم المحلي ووجود Chromium: `npm run test:browser`. الاختبار يستخدم مستودعًا داخل ذاكرة المتصفح ولا يكتب إلى GitHub.
