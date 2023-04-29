 let CACHE_NAME = 'my-site-cache-v1';
 let urlsToCache = [
     '/index.html',
     './htmlFiles/addEditFormFile.html',
     './htmlFiles/deleteFormFile.html',
     './htmlFiles/tableFile.html',
     './cssFiles/styles.css',
     './cssFiles/formStyles.css',
     './cssFiles/stylesNavBar.css',
     './cssFiles/stylesNavList.css',
     './cssFiles/stylesTable.css',
     './jsFiles/addEditForm.js',
     './jsFiles/addEditFunctions.js',
     './jsFiles/navList.js'
 ];

 self.addEventListener('install', async event=>
 {
     const cache = await caches.open(CACHE_NAME)
     await cache.addAll(urlsToCache)
 })

 self.addEventListener('activate', async event =>
 {
     const cacheNames = await caches.keys()
     await Promise.all(cacheNames.filter(name => name != CACHE_NAME)
         .map(name => caches.delete(name)))
 })

 self.addEventListener('fetch', function(event)
 {
     event.respondWith(fetch(event.request).catch(function (){
         return caches.match(event.request)
     }))
 })

 async function cacheFirst(request)
 {
     const cached = await caches.match(request)
     return cached ?? await fetch(request)
 }
