const CACHE_NAME = 'plan-alimentacion-v2';
const CACHE_PREFIX = 'plan-alimentacion-';
const CORE_FILES = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (event) => {
  // cache:'reload' saltea el cache HTTP de GitHub Pages (10 min) para no guardar archivos viejos
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(CORE_FILES.map((u) => new Request(u, { cache: 'reload' })))
    )
  );
  self.skipWaiting();
});

// Borra solo los caches viejos de ESTA app: el Cache Storage es por origen
// (federicojnapoli-ctrl.github.io) y lo comparten varios-app, mi-plan, etc.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k.startsWith(CACHE_PREFIX) && k !== CACHE_NAME)
          .map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
