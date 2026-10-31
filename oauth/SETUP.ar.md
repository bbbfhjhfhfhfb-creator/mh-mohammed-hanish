# حالة الخدمة والخطوة المتبقية

نُشرت خدمة `mh-admin-oauth` على Cloudflare، وفُعّل عنوانها:
https://mh-admin-oauth.hmwdyalrayd0.workers.dev

ضُبطت `CMS_ORIGIN` و`ALLOWED_USERS` و`REPOSITORY`. لم تُضبط `CLIENT_ID` و`CLIENT_SECRET` بعد؛ تسجيل الدخول غير مفعّل لحين إعداد تطبيق GitHub OAuth. عُدّل عنوان الخدمة في فرع المراجعة فقط، ولم يُعدّل الموقع المنشور.

## إنشاء تطبيق GitHub OAuth

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

الرمز `1233` مدخل مخفي فقط وليس كلمة مرور. الكتابة إلى GitHub تتطلب مصادقة OAuth وصلاحيات المستودع. فرع CMS الحالي `feature/arabic-admin` للمراجعة؛ لا ينشر إلى `main`. لا تغيّر هذا الفرع قبل مراجعة الدمج وحماية فرع الإنتاج.

لم يُنشأ تطبيق GitHub OAuth تلقائيًا: صلاحية GitHub للمستودع لا تتيح إنشاء OAuth Apps نيابة عن صاحب الحساب. لم تُطلب أو تُحفظ أي قيمة Client Secret في المحادثة أو المستودع.
