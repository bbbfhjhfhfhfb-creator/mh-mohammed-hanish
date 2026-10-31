/* Discreet navigation shortcut only. GitHub OAuth still protects all writes. */
(() => {
  'use strict';
  if (window.MH_PREVIEW_DATA) return;
  const logo = document.querySelector('.header .brand');
  if (!logo) return;
  let taps = 0;
  let lastTap = 0;
  let dialog;
  function openEntry() {
    if (!dialog) {
      dialog = document.createElement('dialog');
      dialog.className = 'mh-admin-entry';
      dialog.setAttribute('aria-labelledby', 'mh-entry-title');
      const form = document.createElement('form');
      const title = document.createElement('h2'); title.id = 'mh-entry-title'; title.textContent = 'دخول الإدارة';
      const label = document.createElement('label'); label.htmlFor = 'mh-entry-code'; label.textContent = 'رمز الوصول';
      const input = document.createElement('input'); input.id = 'mh-entry-code'; input.type = 'password'; input.inputMode = 'numeric'; input.autocomplete = 'off'; input.maxLength = 4; input.required = true; input.setAttribute('aria-describedby','mh-entry-error');
      const error = document.createElement('p'); error.id = 'mh-entry-error'; error.setAttribute('role','status');
      const actions = document.createElement('div'); actions.className = 'mh-entry-actions';
      const submit = document.createElement('button'); submit.type = 'submit'; submit.textContent = 'متابعة';
      const cancel = document.createElement('button'); cancel.type = 'button'; cancel.textContent = 'إلغاء'; cancel.className = 'mh-entry-cancel'; cancel.addEventListener('click',()=>dialog.close());
      actions.append(submit,cancel); form.append(title,label,input,error,actions); dialog.append(form); document.body.append(dialog);
      form.addEventListener('submit',event=>{
        event.preventDefault();
        const code = input.value.replace(/[٠-٩]/g,d=>String(d.charCodeAt(0)-1632)).replace(/[۰-۹]/g,d=>String(d.charCodeAt(0)-1776));
        // This is intentionally a public navigation code, never an admin password.
        if (code === '1233') { input.value=''; location.assign(new URL('admin/',new URL('.',location.href)).href); }
        else { error.textContent='الرمز غير صحيح'; input.setAttribute('aria-invalid','true'); input.select(); }
      });
      dialog.addEventListener('close',()=>{form.reset();error.textContent='';input.removeAttribute('aria-invalid');});
      dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
    }
    if (!dialog.open) { dialog.showModal(); dialog.querySelector('input').focus(); }
  }
  logo.addEventListener('click',event=>{
    // Keep keyboard focus on the logo across repeated Enter presses.
    if(event.detail===0){event.preventDefault();document.getElementById('home')?.scrollIntoView({behavior:'smooth'});}
    const now=Date.now();taps=now-lastTap<=1800?taps+1:1;lastTap=now;
    if(taps===5){event.preventDefault();taps=0;openEntry();}
  });
})();
