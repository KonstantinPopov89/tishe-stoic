const CACHE='tishe-ab49f3d401bd';
const FILES=["./", "./app.js", "./assets/archer.webp", "./assets/hourglass.webp", "./assets/icon-180.png", "./assets/icon-192.png", "./assets/icon-512.png", "./assets/icon.svg", "./assets/marble.webp", "./data.js", "./index.html", "./manifest.webmanifest", "./style.css"];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES))));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('tishe-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
 event.respondWith(caches.open(CACHE).then(async cache=>{
  const hit=await cache.match(event.request,{ignoreSearch:true});if(hit)return hit;
  try{return await fetch(event.request)}catch(error){if(event.request.mode==='navigate')return cache.match('./');throw error}
 }));
});
