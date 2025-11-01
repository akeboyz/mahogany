// Service Worker for Media Caching
// Version 1.0

const CACHE_NAME = 'signage-media-cache-v1';
const DATA_CACHE_NAME = 'signage-data-cache-v1';

// Files to cache immediately on install
const STATIC_CACHE = [
  './',
  './index.html',
  './menu.html',
  './category.html',
  './product.html'
];

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching static files');
      return cache.addAll(STATIC_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== DATA_CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Check if it's a media file (video, image, audio)
  const isMedia = /\.(mp4|MP4|webm|ogg|jpg|jpeg|png|gif|webp|mp3|wav)$/i.test(url.pathname);

  // Check if it's a data file (JSON)
  const isData = /\.json$/i.test(url.pathname) && !url.pathname.includes('version.txt');

  if (isMedia) {
    // Media files: Cache-first strategy
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          console.log('[Service Worker] Serving media from cache:', url.pathname);
          return cachedResponse;
        }

        console.log('[Service Worker] Fetching and caching media:', url.pathname);
        return fetch(event.request).then((response) => {
          // Don't cache if not successful
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
            console.log('[Service Worker] Cached media:', url.pathname);
          });

          return response;
        }).catch((error) => {
          console.error('[Service Worker] Fetch failed for media:', url.pathname, error);
          throw error;
        });
      })
    );
  } else if (isData) {
    // Data files: Network-first, fallback to cache
    event.respondWith(
      fetch(event.request).then((response) => {
        const responseToCache = response.clone();
        caches.open(DATA_CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return response;
      }).catch(() => {
        return caches.match(event.request);
      })
    );
  } else {
    // Other files: Cache-first with network fallback
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});

// Message handler for cache management
self.addEventListener('message', (event) => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }

  if (event.data.action === 'clearCache') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
      }).then(() => {
        console.log('[Service Worker] All caches cleared');
        event.ports[0].postMessage({ success: true });
      })
    );
  }

  if (event.data.action === 'preloadMedia') {
    const urls = event.data.urls || [];
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        console.log('[Service Worker] Preloading media files:', urls.length);
        return Promise.all(
          urls.map((url) => {
            return fetch(url).then((response) => {
              if (response.ok) {
                return cache.put(url, response);
              }
            }).catch((error) => {
              console.warn('[Service Worker] Failed to preload:', url, error);
            });
          })
        );
      }).then(() => {
        console.log('[Service Worker] Preloading complete');
      })
    );
  }
});
