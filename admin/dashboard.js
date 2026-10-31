'use strict';
async function checkFiles() {
  const summary = document.getElementById('file-summary'); const list = document.getElementById('file-status');
  list.replaceChildren(); summary.textContent = 'جارٍ فحص المراجع دون تعديلها…';
  try {
    const response = await fetch('../content/site.json', {cache:'no-cache'}); if (!response.ok) throw new Error();
    const d = await response.json();
    const refs = [...new Set([d.hero.cover,d.hero.background,...d.hero.videos,d.about.image,...d.works.flatMap(w=>[w.src,w.poster])].filter(Boolean))];
    let missing=0;let unknown=0;
    // Sequential HEAD requests avoid downloading large videos and limit server load.
    for (const path of refs) {
      const li = document.createElement('li'); let state;
      if (!window.MHContent.safeURL(path)) { state='مسار غير آمن'; unknown++; }
      else try { const r = await fetch(new URL(path, new URL('../', location.href)), {method:'HEAD',cache:'no-cache'}); state=r.ok ? 'متاح' : r.status===404 ? 'مفقود — احتفظ بالمرجع للمراجعة' : `تعذر الفحص (${r.status})`; if(r.status===404) missing++;else if(!r.ok) unknown++; } catch {state='تعذر الفحص؛ قد تمنع الخدمة الخارجية طلبات الفحص';unknown++;}
      li.textContent = `${path} — ${state}`; li.className = state === 'متاح' ? 'ok' : 'missing'; list.append(li);
    }
    summary.textContent = `${refs.length} مرجعًا · ${missing} مفقود · ${unknown} غير مؤكد`;
  } catch { summary.textContent = 'تعذر تحميل قائمة الملفات. لم تُحذف أي مراجع.'; }
}
document.getElementById('refresh').addEventListener('click',checkFiles);checkFiles();
async function checkLoginService() {
  const status=document.getElementById('setup');
  try {
    const response=await fetch('config.yml',{cache:'no-cache'});
    if(!response.ok) throw new Error();
    const config=await response.json();
    if(config.backend.base_url.includes('.invalid')) {
      status.textContent='تسجيل الدخول غير مفعّل: يلزم إعداد خدمة GitHub OAuth أولًا. يمكنك فحص الملفات الآن.';
      return;
    }
    const health=await fetch(new URL('/health',config.backend.base_url),{cache:'no-store',signal:AbortSignal.timeout(8000)});
    const result=await health.json();
    status.textContent=health.ok && result.ready === true ? 'خدمة تسجيل الدخول جاهزة. ادخل بحساب GitHub المصرح لحفظ المسودات.' : 'خدمة تسجيل الدخول لم تكتمل إعداداتها بعد. لم تُمنح صلاحية تعديل.';
  } catch {status.textContent='تعذر التحقق من خدمة الدخول. افحص إعداد الخدمة والاتصال قبل حفظ أي تعديل.';}
}
checkLoginService();
document.getElementById('open-editor').addEventListener('click',()=>{const host=document.getElementById('editor'); if(!host.firstChild){ const frame=document.createElement('iframe');frame.title='محرر MH';frame.src='editor.html#/collections/site/entries/settings';host.append(frame);}host.hidden=false;});
