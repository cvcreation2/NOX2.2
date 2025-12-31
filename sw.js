const CACHE_NAME = 'nox-vpn-pro-v3';

// Install event - claim clients immediately
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - Dynamic Caching Strategy (Network First, falling back to Cache)
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Handle caching
  event.respondWith(
    (async () => {
      try {
        // Try network first
        const networkResponse = await fetch(event.request);
        
        // Check if response is valid
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          const cache = await caches.open(CACHE_NAME);
          cache.put(event.request, responseToCache);
        }
        
        return networkResponse;
      } catch (error) {
        // If network fails, try cache
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }
        // If both fail and it's a navigation request, return index.html (SPA support)
        if (event.request.mode === 'navigate') {
            const indexCache = await caches.match('./index.html');
            return indexCache || fetch('./index.html');
        }
        throw error;
      }
    })()
  );
});