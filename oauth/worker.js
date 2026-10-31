/** Cloudflare Worker: GitHub OAuth bridge for Decap. No secret belongs in Pages. */
const COOKIE = '__Host-mh-oauth';
const headers = {'Cache-Control':'no-store','Referrer-Policy':'no-referrer','X-Content-Type-Options':'nosniff'};
const reply = (body,status=200,extra={}) => new Response(body,{status,headers:{...headers,...extra}});
export default {
 async fetch(request, env) {
  const url = new URL(request.url);
  const configured = env.CLIENT_ID && env.CLIENT_SECRET && env.CMS_ORIGIN && env.ALLOWED_USERS && env.REPOSITORY;
  if (!configured) return reply('OAuth service is not configured',503);
  const origin = new URL(env.CMS_ORIGIN).origin;
  if (!origin.startsWith('https://')) return reply('HTTPS origin required',503);
  if (url.pathname === '/auth') {
   if (request.method !== 'GET' || url.searchParams.get('provider') !== 'github') return reply('Unsupported request',400);
   const state = crypto.randomUUID() + crypto.randomUUID();
   const dest = new URL('https://github.com/login/oauth/authorize');
   dest.search = new URLSearchParams({client_id:env.CLIENT_ID,redirect_uri:url.origin+'/callback',scope:'public_repo',state});
   return reply('',302,{'Location':dest.href,'Set-Cookie':`${COOKIE}=${state}; Secure; HttpOnly; SameSite=Lax; Path=/; Max-Age=600`});
  }
  if (url.pathname !== '/callback' || request.method !== 'GET') return reply('Not found',404);
  const state = url.searchParams.get('state');
  const saved = (request.headers.get('Cookie') || '').split(';').map(s=>s.trim()).find(s=>s.startsWith(COOKIE+'='))?.slice(COOKIE.length+1);
  const clear = {'Set-Cookie':`${COOKIE}=; Secure; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`};
  if (!state || !saved || state !== saved || !url.searchParams.get('code')) return reply('Invalid or expired OAuth state',403,clear);
  try {
   const exchanged = await fetch('https://github.com/login/oauth/access_token',{method:'POST',headers:{Accept:'application/json','Content-Type':'application/json'},body:JSON.stringify({client_id:env.CLIENT_ID,client_secret:env.CLIENT_SECRET,code:url.searchParams.get('code'),redirect_uri:url.origin+'/callback'})});
   const token = await exchanged.json();
   if (!exchanged.ok || typeof token.access_token !== 'string') return reply('GitHub authentication failed',403,clear);
   const gh = {Authorization:`Bearer ${token.access_token}`,Accept:'application/vnd.github+json','User-Agent':'MH-admin-oauth','X-GitHub-Api-Version':'2022-11-28'};
   const userResponse = await fetch('https://api.github.com/user',{headers:gh});
   const user = await userResponse.json();
   const allowed = env.ALLOWED_USERS.split(',').map(s=>s.trim().toLowerCase());
   if (!userResponse.ok || !allowed.includes(String(user.login).toLowerCase())) return reply('Administrator not authorized',403,clear);
   if (!/^[\w.-]+\/[\w.-]+$/.test(env.REPOSITORY)) return reply('Invalid repository configuration',503,clear);
   const repoResponse = await fetch(`https://api.github.com/repos/${env.REPOSITORY}`,{headers:gh});
   const repo = await repoResponse.json();
   if (!repoResponse.ok || !repo.permissions?.push) return reply('Repository write permission required',403,clear);
   const escape = v=>JSON.stringify(v).replace(/</g,'\\u003c');
   const message = 'authorization:github:success:'+JSON.stringify({token:token.access_token,provider:'github'});
   const nonce = crypto.randomUUID();
   return reply(`<!doctype html><meta charset="utf-8"><title>MH OAuth</title><p>اكتمل تسجيل الدخول. يمكنك إغلاق هذه النافذة.</p><script nonce="${nonce}">const target=${escape(origin)};const message=${escape(message)};window.addEventListener('message',function receive(event){if(event.origin!==target||event.source!==window.opener)return;window.opener.postMessage(message,target);window.removeEventListener('message',receive);window.close();});if(window.opener)window.opener.postMessage('authorizing:github',target);<\/script>`,200,{...clear,'Content-Type':'text/html; charset=utf-8','Content-Security-Policy':`default-src 'none'; script-src 'nonce-${nonce}'; frame-ancestors 'none'; base-uri 'none'`});
  } catch { return reply('Authentication service unavailable; retry later',502,clear); }
 }
};
