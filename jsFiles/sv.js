if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('Service Worker registered:', registration);
        }, function(error) {
            console.error('Service Worker registration failed:', error);
        });
    });
}

// Додавання файлів для кешування
const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
        '../cssFiles/stylesNavBar.css',
        '../cssFiles/stylesNavList.css',
        '../cssFiles/stylesTable.css',
        '../cssFiles/styles.css',
        '../cssFiles/formsStyles.css',
        '../htmlFiles/addEditFormFile.html',
        '../htmlFiles/deleteFormFile.html',
        '../htmlFiles/index.html',
        '../htmlFiles/tableFile.html',
        '../jsFiles/addEditForm.js',
        '../jsFiles/addEditFunctions.js',
        '../jsFiles/navList.js'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            console.log('Cache opened');
            return cache.addAll(urlsToCache);
        })
    );
});

// Використання кешованих файлів
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});

// Видалення застарілих файлів з кешу
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    return cacheName.startsWith('my-site-cache-') && cacheName !== CACHE_NAME;
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});
// Встановлюємо Service Worker
self.addEventListener('install', event => {
    // Встановлюємо кеш
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Використовуємо кеш для запитів
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Якщо ресурс є в кеші - повертаємо його
                if (response) {
                    return response;
                }

                // Якщо ресурсу немає в кеші - завантажуємо його з мережі і кешуємо
                return fetch(event.request)
                    .then(response => {
                        // Перевіряємо, що відповідь від сервера коректна
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Копіюємо відповідь в кеш і повертаємо її
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                        return response;
                    });
            })
    );
});
