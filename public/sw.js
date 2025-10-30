const CACHE_NAME = 'digital-signage-v1';
const OFFLINE_URL = '/offline.html';

// Assets to cache immediately
const STATIC_CACHE_URLS = [
  '/',
  '/offline.html',
  '/manifest.webmanifest',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle Firebase API requests - network first
  if (url.hostname.includes('firebaseio.com') || url.hostname.includes('googleapis.com')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful responses for playlists and device configs
          if (response.ok && (url.pathname.includes('playlists') || url.pathname.includes('devices'))) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Return cached version if available
          return caches.match(request).then((cachedResponse) => {
            return cachedResponse || new Response('{"error":"offline"}', {
              status: 503,
              headers: { 'Content-Type': 'application/json' }
            });
          });
        })
    );
    return;
  }

  // Handle video files - cache first with network fallback
  if (request.url.includes('.mp4') || request.url.includes('.m3u8')) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then((response) => {
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        });
      })
    );
    return;
  }

  // Handle navigation requests
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => {
        return caches.match(OFFLINE_URL);
      })
    );
    return;
  }

  // Handle all other requests - cache first
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      return cachedResponse || fetch(request).then((response) => {
        // Don't cache non-successful responses
        if (!response.ok) {
          return response;
        }

        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseClone);
        });

        return response;
      });
    })
  );
});

// Background sync for analytics events
self.addEventListener('sync', (event) => {
  if (event.tag === 'analytics-sync') {
    event.waitUntil(syncAnalytics());
  }
});

// Message handler for cache management
self.addEventListener('message', (event) => {
  if (event.data && event.data.type) {
    switch (event.data.type) {
      case 'PREFETCH_PLAYLIST':
        prefetchPlaylistAssets(event.data.playlistId);
        break;
      case 'CLEAR_CACHE':
        clearCache();
        break;
      case 'CACHE_VIDEO':
        cacheVideo(event.data.videoUrl);
        break;
    }
  }
});

// Prefetch playlist assets
async function prefetchPlaylistAssets(playlistId) {
  try {
    // This would fetch the playlist and cache related video files
    const response = await fetch(`/api/playlists/${playlistId}`);
    if (response.ok) {
      const playlist = await response.json();
      const cache = await caches.open(CACHE_NAME);
      
      // Cache playlist JSON
      await cache.put(`/api/playlists/${playlistId}`, response.clone());
      
      // Prefetch video manifests (HLS)
      const videoUrls = Object.values(playlist.items)
        .filter(item => item.type === 'video')
        .map(item => item.src)
        .slice(0, 3); // Limit to next 3 videos
      
      for (const url of videoUrls) {
        if (url.includes('.m3u8')) {
          try {
            const manifestResponse = await fetch(url);
            if (manifestResponse.ok) {
              await cache.put(url, manifestResponse);
            }
          } catch (error) {
            console.log('Failed to prefetch manifest:', url);
          }
        }
      }
    }
  } catch (error) {
    console.error('Failed to prefetch playlist assets:', error);
  }
}

// Cache individual video
async function cacheVideo(videoUrl) {
  try {
    const cache = await caches.open(CACHE_NAME);
    const response = await fetch(videoUrl);
    if (response.ok) {
      await cache.put(videoUrl, response);
    }
  } catch (error) {
    console.error('Failed to cache video:', error);
  }
}

// Clear cache
async function clearCache() {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames.map(cacheName => caches.delete(cacheName))
  );
}

// Sync analytics events when back online
async function syncAnalytics() {
  // This would sync queued analytics events
  // Implementation would depend on your analytics storage strategy
  console.log('Syncing analytics events...');
}