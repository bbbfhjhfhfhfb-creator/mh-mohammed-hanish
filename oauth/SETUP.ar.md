# تفعيل خدمة الدخول للمرة الأولى

الخدمة مبرمجة في `worker.js` ومختبرة محليًا. لا يمكن نشرها دون الوصول إلى حساب Cloudflare وبيانات تطبيق GitHub OAuth. الرمز `1233` ليس بديلًا لهذه الخدمة ولا يسمح بالكتابة إلى المستودع.

1. افتح [Cloudflare Workers](https://dash.cloudflare.com/) وسجّل الدخول إلى حسابك، ثم أنشئ Worker باسم `mh-admin-oauth`. الصق محتوى `worker.js` في محرر الشيفرة وانشره. احفظ رابط `https://mh-admin-oauth.<account>.workers.dev`. سيبقى الدخول معطلًا حتى إكمال المتغيرات.
2. افتح [GitHub OAuth Apps](https://github.com/settings/developers) واختر New OAuth App. عيّن Homepage URL لرابط موقعك الفعلي، وAuthorization callback URL إلى رابط Worker متبوعًا بـ `/callback`. انسخ Client ID وولّد Client Secret.
3. في Worker → Settings → Variables and Secrets أضف:

| الاسم | النوع | القيمة |
| --- | --- | --- |
| `CLIENT_ID` | Text | Client ID من تطبيق GitHub |
| `CLIENT_SECRET` | Secret | Client Secret؛ يُدخل هنا فقط |
| `CMS_ORIGIN` | Text | أصل الموقع الفعلي، مثل `https://bbbfhjhfhfhfb-creator.github.io` دون مسار المشروع؛ تحقق من النطاق المستخدم |
| `ALLOWED_USERS` | Text | اسم حساب المدير في GitHub، أو عدة أسماء مفصولة بفاصلة |
| `REPOSITORY` | Text | `bbbfhjhfhfhfb-creator/mh-mohammed-hanish` |

4. احفظ وانشر إعدادات Worker. فتح `/health` يجب أن يرجع `{"ready":true}`. هذا يفحص وجود الإعدادات؛ نجاح الدخول الحقيقي هو الذي يثبت صلاحية بيانات OAuth.
5. أرسل رابط Worker فقط، ورابط الموقع الفعلي واسم حساب المدير إذا اختلف عن مالك المستودع. لا ترسل Client Secret أو أي رمز وصول. بعدها يمكن تعيين `backend.base_url` في `admin/config.yml` إلى عنوان Worker، وإجراء اختبار الدخول والمراجعة.

يجب حماية فرع الإنتاج بمراجعة PR. فرع CMS الحالي `feature/arabic-admin` متعمد للمراجعة؛ لا يغيّر الموقع المنشور. تفعيل الحفظ فيه يتطلب أن يكون الفرع موجودًا على GitHub. نقل مسار نشر المحتوى إلى الإنتاج يحتاج تعديل الفرع بعد الموافقة على الدمج والتحقق من قواعد الحماية.

عند استخدام Wrangler بدل المحرر، نفذ من مجلد `oauth`: `npx wrangler login` ثم `npx wrangler deploy`، واضبط المتغيرات من إعدادات الخدمة. أدخل السر عبر `npx wrangler secret put CLIENT_SECRET` أو لوحة Cloudflare، لا في ملف TOML ولا في أوامر محفوظة في سجل الطرفية.
