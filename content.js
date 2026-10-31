/* Shared by the public page and the isolated CMS preview. Never inserts content as HTML. */
(function (root) {
  'use strict';
  function safeURL(value, allowBlob = false) {
    if (allowBlob && typeof value === "string" && value.startsWith("blob:") && new URL(value).origin === root.location.origin) return value;
    if (typeof value !== 'string' || !value || /[\\\u0000-\u0020]/.test(value)) return '';
    if (/^https:\/\//i.test(value)) {
      try { const u = new URL(value); return u.username || u.password ? '' : u.href; } catch { return ''; }
    }
    return /^assets\/(?!.*(?:\.\.|[?#]))[a-zA-Z0-9_./%-]+$/.test(value) ? value : '';
  }
  function render(data, doc = document) {
    if (!data || data.version !== 1) throw new Error('Unsupported site content');
    const url = value => safeURL(value, Boolean(root.MH_PREVIEW_DATA));
    const el = (tag, cls, text) => { const n = doc.createElement(tag); if (cls) n.className = cls; if (text !== undefined) n.textContent = text; return n; };
    const set = (selector, value) => { const n = doc.querySelector(selector); if (n && typeof value === 'string') n.textContent = value; };
    const list = (selector, values, make) => { const n = doc.querySelector(selector); if (n && Array.isArray(values)) n.replaceChildren(...values.map(make)); };
    if (data.hero) {
      set('.hero h2', data.hero.headline); set('.hero .intro', data.hero.intro);
      const bg = url(data.hero.background); if (bg) doc.querySelector('.hero-bg').style.backgroundImage = `url("${bg}")`;
      list('.hero-video-rotator', data.hero.videos, src => { const v = el('video','hero-reel'); v.src = url(src); v.poster = url(data.hero.cover); v.muted = true; v.loop = true; v.autoplay = true; v.playsInline = true; v.preload = 'metadata'; v.setAttribute('aria-hidden','true'); return v; });
    }
    if (data.about) {
      const a = data.about; doc.querySelector('.portrait-wrap img').src = url(a.image);
      // Only direct children: nested work fields and vision keep their structure.
      ['headings','paragraphs'].forEach((key) => { const nodes = doc.querySelectorAll(key === 'headings' ? '.about-copy > h2, .about-copy > h3' : '.about-copy > p'); if (Array.isArray(a[key])) nodes.forEach((n,i) => { if (a[key][i] !== undefined) n.textContent = a[key][i]; }); });
      list('.work-fields ul', a.fields, t => el('li','',t)); set('.vision-card p',a.vision);
    }
    list('.service-grid', data.services, s => { const a = el('article','service'); a.append(el('div','icon',s.icon),el('h3','',s.title),el('p','',s.description)); return a; });
    list('.filters', [{id:'all',label:'كل الأعمال'},...(data.categories || [])], (c) => { const b = el('button',c.id === 'all' ? 'filter active' : 'filter',c.label); b.type = 'button'; b.dataset.filter = c.id; return b; });
    list('.work-grid', (data.works || []).filter(w => w.visible !== false), w => { const a = el('article',w.kind === 'video' ? 'work video-work' : 'work'); a.dataset.type = w.category;
      const m = el(w.kind === 'video' ? 'video' : 'img',w.kind === 'video' ? 'portfolio-video' : ''); m.src = url(w.src);
      if (w.kind === 'video') { m.controls = true; m.preload = 'metadata'; m.playsInline = true; if (w.poster) m.poster = url(w.poster); } else { m.alt = w.alt || w.title; m.loading = 'lazy'; }
      const caption = el('div'); caption.append(el('strong','',w.title),el('small','',w.label)); a.append(m,caption); return a; });
    list('.social-links', data.socials, s => { const a = el('a','social-link',s.name + ' ↗'); a.href = url(s.url); a.target = '_blank'; a.rel = 'noopener noreferrer'; a.setAttribute('aria-label',s.name); return a; });
  }
  root.MHContent = { render, safeURL };
  if (typeof module !== 'undefined') module.exports = root.MHContent;
})(typeof window !== 'undefined' ? window : globalThis);
