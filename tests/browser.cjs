/* Run against the isolated local server; GitHub is never mutated. */
const {chromium}=require('playwright');
const fs=require('node:fs');const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium',args:['--no-sandbox']});
 try {
  const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:8000/');await page.waitForFunction(()=>document.querySelector('.work-grid video[src]'));
  assert.equal(await page.locator('.work').count(),18);assert.equal(await page.locator('.service').count(),6);
  await page.locator('[data-filter="portrait"]').click();assert.equal(await page.locator('.work:not(.hidden)').count(),6);
  await page.setViewportSize({width:390,height:844});await page.locator('.menu-toggle').click();assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'true');
  await page.goto('http://127.0.0.1:8000/admin/');await page.waitForFunction(()=>document.querySelector('#file-summary').textContent.includes('مفقود'));
  assert.match(await page.locator('#file-summary').innerText(),/1 مفقود/);assert.match(await page.locator('.missing').innerText(),/event-video-03.mp4/);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  console.log('PASS public rendering, categories, mobile navigation, admin responsiveness, missing-file audit');
  const data=fs.readFileSync('content/site.json','utf8');
  await page.addInitScript(d=>{window.repoFiles={content:{'site.json':{content:d,path:'content/site.json'}}};},data);
  await page.route('**/admin/config.yml',r=>{const c=JSON.parse(fs.readFileSync('admin/config.yml'));c.backend={name:'test-repo',login:false};return r.fulfill({body:JSON.stringify(c),contentType:'text/yaml'});});
  await page.setViewportSize({width:1440,height:1000});
  await page.goto('http://127.0.0.1:8000/admin/editor.html#/collections/site/entries/settings');
  await page.getByText('تم حفظ التغييرات',{exact:true}).waitFor();
  const headline=page.getByLabel('العنوان',{exact:true}).first();await headline.fill('معاينة <img src=x onerror=alert(1)>');
  await page.waitForFunction(()=>Array.from(document.querySelectorAll('iframe')).some(f=>{try{return f.contentDocument?.querySelector('iframe')?.contentDocument?.querySelector('.hero h2')?.textContent.includes('معاينة')}catch{return false}}));
  const frames=page.frames();const preview=frames.find(f=>f.parentFrame()?.parentFrame());
  assert.equal(await preview.locator('.hero h2 img').count(),0);
  assert.match(await preview.locator('.hero h2').innerText(),/<img/);
  await page.getByRole('button',{name:'حفظ المسودة',exact:true}).click();
  await page.waitForFunction(()=>Object.keys(window.repoFilesUnpublished || {}).length>0);
  assert.equal(await page.evaluate(()=>JSON.parse(window.repoFiles.content['site.json'].content).hero.headline),JSON.parse(data).hero.headline);
  await page.setViewportSize({width:390,height:844});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  const box=await headline.boundingBox();assert.ok(box.x>=0 && box.x+box.width<=391,'mobile input must be inside viewport');
  await page.getByRole('button',{name:'معاينة المسودة',exact:true}).click();
  assert.equal(await page.locator('#phone-preview').getAttribute('aria-pressed'),'true');
  await page.getByRole('button',{name:'العودة للتحرير',exact:true}).click();
  await page.screenshot({path:'/tmp/mh-editor-mobile.png',fullPage:true});
  console.log('PASS actual CMS editor, unsaved live preview, escaped text, draft saved without changing published content (in-memory backend)');
  assert.deepEqual(errors,[]);
  // A missing content file must retain the original markup and interactions.
  await page.unroute('**/admin/config.yml');await page.route('**/content/site.json',r=>r.fulfill({status:503,body:'unavailable'}));
  await page.goto('http://127.0.0.1:8000/');await page.waitForFunction(()=>document.querySelector('#year').textContent);
  assert.equal(await page.locator('.work').count(),18);await page.locator('[data-filter="portrait"]').click();assert.equal(await page.locator('.work:not(.hidden)').count(),6);
  console.log('PASS original-site fallback when JSON unavailable');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
