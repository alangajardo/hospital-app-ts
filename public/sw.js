const CACHE_NAME = 'pwa-cache-v1'
const urlsToCache = ['/', 'index.html', 'main.js', '/icons/logo-500x500.png', '/assets/logo.png','/assets/instagram.png','/assets/tik-tok.png','/assets/servicios/servicio_1.jpg','/assets/servicios/servicio_2.jpg','/assets/servicios/servicio_3.jpg']

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            cache.addAll(urlsToCache)
        })
    )
})

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request).then((networkResponse) => {
                return caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
            });
        })
    );
});
