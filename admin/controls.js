/* Label Decap 3.17.3's native icon-only list buttons; keep its existing handlers. */
(() => {
  'use strict';
  let queued=false;
  function labelControls() {
    queued=false;
    document.querySelectorAll('[class*="StyledListItemTopBar"]').forEach(bar=>{
      const buttons=Array.from(bar.children).filter(n=>n.tagName==='BUTTON');
      for(const button of buttons){
        const remove=Boolean(button.querySelector('path[d^="M11.916"]'));
        const expand=Boolean(button.querySelector('path[d^="m5.123"]'));
        if(!remove && !expand)continue;
        const cls=remove?'mh-delete-action':'mh-edit-action';
        if(!button.classList.contains(cls))button.classList.add(cls);
        const label=remove?'حذف العنصر':'تعديل العنصر';
        if(button.getAttribute('aria-label')!==label)button.setAttribute('aria-label',label);
        button.title=remove?'حذف العنصر من القائمة؛ لا يحذف الملف الأصلي':'فتح حقول العنصر أو إغلاقها';
        button.type='button';
      }
    });
  }
  new MutationObserver(()=>{if(!queued){queued=true;requestAnimationFrame(labelControls);}}).observe(document.body,{childList:true,subtree:true});
  labelControls();
})();
