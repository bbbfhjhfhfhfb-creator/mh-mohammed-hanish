/* A sandboxed iframe renders unsaved entry data, using the same public renderer. */
(async () => {
  const response = await fetch('../index.html');
  if (!response.ok) throw new Error('Preview template unavailable');
  const template = await response.text();
  const base = new URL('../',location.href).href;
  const Preview = createClass({
    render() {
      const data = this.props.entry.get('data').toJS();
      const asset = path => path ? String(this.props.getAsset(path) || path) : '';
      if (data.hero) { data.hero.cover=asset(data.hero.cover); data.hero.background=asset(data.hero.background); data.hero.videos=(data.hero.videos || []).map(asset); }
      if (data.about) data.about.image=asset(data.about.image);
      (data.works || []).forEach(w=>{w.src=asset(w.src);w.poster=asset(w.poster);});
      // Escape HTML delimiters so text cannot terminate the JSON script element.
      const json = JSON.stringify(data).replace(/</g,'\\u003c').replace(/>/g,'\\u003e').replace(/&/g,'\\u0026');
      const html = template.replace('<head>',`<head><base href="${base}">`).replace('<script src="content.js">',`<script>window.MH_PREVIEW_DATA=${json};<\/script><script src="content.js">`);
      return h('iframe',{title:'معاينة المسودة قبل النشر',srcDoc:html,sandbox:'allow-scripts allow-same-origin',style:{width:'100%',height:'90vh',border:0}});
    }
  });
  CMS.registerPreviewTemplate('settings',Preview);
  CMS.registerEventListener({name:'preSave',handler:({entry})=>{
    const d=entry.get('data').toJS(); const ids=(d.categories || []).map(c=>c.id);
    if(new Set(ids).size!==ids.length || ids.includes('all')) throw new Error('معرّفات التصنيفات مكررة أو محجوزة');
    if((d.works || []).some(w=>!ids.includes(w.category))) throw new Error('اختر لكل عمل معرّف تصنيف موجود');
    const paths=[d.hero?.cover,d.hero?.background,...(d.hero?.videos || []),d.about?.image,...(d.works || []).flatMap(w=>[w.src,w.poster])];
    for(const p of paths.filter(Boolean)) if(!/^(assets\/[a-zA-Z0-9_./%-]+|https:\/\/[^\s]+)$/.test(p) || p.includes('..')) throw new Error('استخدم مسار assets أو رابط HTTPS آمنًا');
    return entry.get('data');
  }});
  CMS.init({config:{load_config_file:true},config_file:'config.yml'});
})();
