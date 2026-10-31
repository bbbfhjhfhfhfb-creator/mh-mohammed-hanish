/* Test real CMS actions in its memory backend. Never writes to GitHub. */
const {chromium}=require('playwright');const fs=require('node:fs');const assert=require('node:assert/strict');
(async()=>{
 const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 try{
  const p=await b.newPage({viewport:{width:1440,height:1000}});const errors=[];p.on('pageerror',e=>errors.push(e.message));p.on('dialog',d=>d.accept());
  const data=fs.readFileSync('content/site.json','utf8');
  await p.addInitScript(d=>window.repoFiles={content:{'site.json':{content:d,path:'content/site.json'}}},data);
  await p.route('**/admin/config.yml',r=>{const c=JSON.parse(fs.readFileSync('admin/config.yml'));c.backend={name:'test-repo',login:false};return r.fulfill({body:JSON.stringify(c),contentType:'text/yaml'})});
  await p.goto('http://127.0.0.1:8000/admin/');await p.getByRole('button',{name:'فتح محرر الإضافة والتعديل والحذف',exact:true}).click();
  const editor=await (await p.locator('iframe[title="محرر MH"]').elementHandle()).contentFrame();
  await editor.getByRole('button',{name:'إضافة عمل',exact:true}).waitFor();
  assert.ok(editor.url().endsWith('#/collections/site/entries/settings'),'dashboard must open content settings directly');
  const works=editor.getByText('الصور والفيديوهات — اسحب لتغيير الترتيب',{exact:true}).locator('..').locator('..');
  const remove=works.getByRole('button',{name:'حذف العنصر',exact:true});
  assert.equal(await remove.count(),18);
  await works.getByRole('button',{name:'إضافة عمل',exact:true}).click();
  await editor.waitForFunction(()=>document.querySelectorAll('[aria-label="حذف العنصر"]').length>52);
  assert.equal(await remove.count(),19);
  await remove.last().click();assert.equal(await remove.count(),18);
  await works.getByRole('button',{name:'تعديل العنصر',exact:true}).first().click();
  await works.getByLabel('العنوان',{exact:true}).first().waitFor();
  await remove.first().click();assert.equal(await remove.count(),17);
  await editor.getByRole('button',{name:'حفظ المسودة',exact:true}).click();
  await editor.waitForFunction(()=>Object.keys(window.repoFilesUnpublished||{}).length>0);
  assert.equal(await editor.evaluate(()=>JSON.parse(window.repoFiles.content['site.json'].content).works.length),18,'draft must not change published content');
  console.log('PASS direct editor entry, visible add/edit/delete controls, adding/removing media items, draft isolation');
  await editor.getByRole('button',{name:/^الحالة:/}).click();
  await editor.getByText('جاهز',{exact:true}).click();
  await editor.getByRole('button',{name:'نشر على الموقع',exact:true}).click();
  await editor.getByText('نشر الآن على الموقع',{exact:true}).click();
  await editor.waitForFunction(()=>JSON.parse(window.repoFiles.content['site.json'].content).works.length===17);
  assert.equal(await editor.evaluate(()=>JSON.parse(window.repoFiles.content['site.json'].content).works.some(w=>w.title==='عمل فيديو جديد')),false);
  assert.equal(await editor.evaluate(()=>JSON.parse(window.repoFiles.content['site.json'].content).works.some(w=>w.src==='assets/event-video-03.mp4')),true);
  console.log('PASS ready-state publication in memory, chosen gallery item removed, missing-file reference preserved');
  await p.setViewportSize({width:390,height:844});
  await works.getByRole('button',{name:'إضافة عمل',exact:true}).scrollIntoViewIfNeeded();
  const box=await works.getByRole('button',{name:'إضافة عمل',exact:true}).boundingBox();assert.ok(box.x>=0&&box.x+box.width<=391,'add action must fit phone viewport');
  const deleteBox=await remove.first().boundingBox();assert.ok(deleteBox.x>=0&&deleteBox.x+deleteBox.width<=391,'delete action must fit phone viewport');
  assert.deepEqual(errors,[]);console.log('PASS mobile add/delete controls and no browser exceptions');
 }finally{await b.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
