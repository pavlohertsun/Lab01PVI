let CACHE_NAME = 'cache-v1';
let urlsToCache = [
    './index.html',
    './htmlFiles/deleteFormFile.html',
    './htmlFiles/tableFile.html',
    './htmlFiles/addEditFormFile.html',
    './cssFiles/formStyles.css',
    './cssFiles/styles.css',
    './cssFiles/stylesNavBar.css',
    './cssFiles/stylesNavList.css',
    './cssFiles/stylesTable.css',
    './jsFiles/addEditForm.js',
    './jsFiles/addEditFunctions.js',
    './jsFiles/navList.js',
];
self.addEventListener('install',event=>
{
    event.waitUntil(caches.open(CACHE_NAME).then(cache=>
        {
            return cache.addAll(urlsToCache);
        })
    );
})

self.addEventListener('fetch', function (event) //network first
{
    event.respondWith(
        fetch(event.request).catch(function()
        {
            return caches.match(event.request)
        })
    )
})
