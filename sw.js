const CACHE_NAME = 'novela-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/libro1.html',
  '/1/capitulo1.html'
  '/2/capitulo2.html'
  // puedes agregar más archivos o carpetas si quieres
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});