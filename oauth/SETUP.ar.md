# حالة الخدمة وإعداد OAuth

نُشرت خدمة `mh-admin-oauth` على Cloudflare، وفُعّل عنوانها:
https://mh-admin-oauth.hmwdyalrayd0.workers.dev

ضُبطت جميع الإعدادات المطلوبة، ومنها `CLIENT_ID` و`CLIENT_SECRET`، داخل Cloudflare. السر مخزّن بنوع Secret ولا يوجد في المستودع. عُدّل عنوان الخدمة في فرع المراجعة فقط، ولم يُعدّل الموقع المنشور.

تم التحقق المباشر في 1 نوفمبر 2026 من:
- `/health`: استجابة HTTP 200 و`ready: true` وتطابق أصل CORS مع موقع GitHub Pages.
- `/auth?provider=github`: تحويل HTTP 302 إلى GitHub بمعرّف التطبيق ورابط callback الصحيحين.
- وجود حالة OAuth وملف تعريف ارتباط بخصائص Secure وHttpOnly وSameSite=Lax.

أفاد صاحب الموقع بنجاح اختبار تسجيل الدخول الفعلي عبر الخدمة. لم تصل جلسة المتصفح أو رموز OAuth إلى بيئة العمل. يبقى اختبار حفظ مسودة ورفع وسائط عبر واجهة CMS بعد نشر اللوحة. بعض طلبات الفحص الآلية بعامل المستخدم الافتراضي أعادت 403؛ نجح الفحص بعامل مستخدم صريح. لا تُعطّل TLS أو حماية Cloudflare لمعالجة ذلك.

## خطوات الإعداد المرجعية (أُنجزت للخدمة الحالية)

1. افتح https://github.com/settings/applications/new وسجّل الدخول إلى حساب GitHub الذي سيدير الموقع.
2. املأ الحقول:
   - Application name: `MH Admin`
   - Homepage URL: `https://bbbfhjhfhfhfb-creator.github.io/mh-mohammed-hanish/`
   - Authorization callback URL: `https://mh-admin-oauth.hmwdyalrayd0.workers.dev/callback`
3. اضغط Register application. انسخ Client ID وولّد Client Secret.
4. في Cloudflare → Workers & Pages → mh-admin-oauth → Settings → Variables and Secrets:
   - أضف `CLIENT_ID` كمتغير Text.
   - أضف `CLIENT_SECRET` كمتغير Secret. لا ترسله في المحادثة أو تضفه إلى ملفات GitHub.
5. احفظ إعدادات Worker وانشرها. يعيد `/health` القيمة `{"ready":true}` عند اكتمال المتغيرات، ثم يلزم اختبار دخول حقيقي وتحقق من حساب المدير والمسودات.

الخدمة تسمح حاليًا للحساب `bbbfhjhfhfhfb-creator` فقط، وتتحقق أيضًا من صلاحية الكتابة على المستودع. إذا كان حساب المدير مختلفًا، أرسل اسم الحساب فقط لتعديل قائمة `ALLOWED_USERS`.

## الحماية والمراجعة

الرمز `1233` مدخل مخفي فقط وليس كلمة مرور. الكتابة إلى GitHub تتطلب مصادقة OAuth وصلاحيات المستودع. تغييرات الشيفرة موجودة في فرع `feature/arabic-admin` وطلب المراجعة رقم 1، ولم تُدمج. إعداد CMS النهائي يستهدف `main` حتى تظهر تعديلات المحتوى على GitHub Pages بعد النشر. وضع `editorial_workflow` يحفظ التعديلات كمسودات للمراجعة، ثم ينشرها إلى `main` عند اختيار «نشر» صراحةً. لا تختبر زر النشر على محتوى فعلي قبل الموافقة على تحديث الموقع.

لم يُنشأ تطبيق GitHub OAuth تلقائيًا: صلاحية GitHub للمستودع لا تتيح إنشاء OAuth Apps نيابة عن صاحب الحساب. لم تُطلب أو تُحفظ أي قيمة Client Secret في المحادثة أو المستودع.
