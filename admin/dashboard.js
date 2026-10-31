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
fetch('config.yml').then(r=>r.json()).then(c=>{document.getElementById('setup').textContent = c.backend.base_url.includes('.invalid') ? 'تسجيل الدخول غير مفعّل: يلزم إعداد خدمة GitHub OAuth أولًا. يمكنك فحص الملفات الآن.' : 'تم تحديد خدمة تسجيل الدخول. تحقق من صلاحيات الحساب وحماية الفرع قبل الحفظ.';}).catch(()=>{document.getElementById('setup').textContent='تعذر قراءة إعدادات الدخول.';});
document.getElementById('open-editor').addEventListener('click',()=>{const host=document.getElementById('editor'); if(!host.firstChild){ const frame=document.createElement('iframe');frame.title='محرر MH';frame.src='editor.html';host.append(frame);}host.hidden=false;});
