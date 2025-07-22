// Service Worker for caching and performance optimization
const CACHE_NAME = "sera-ui-v1.0.0";
const STATIC_CACHE_NAME = "sera-ui-static-v1.0.0";

// Resources to cache immediately
const STATIC_RESOURCES = [
  "/",
  "/docs",
  "/docs/installation",
  "/docs/button",
  "/docs/card",
  "/docs/tabs",
  "/manifest.json",
  "/logo.svg",
];

// API endpoints to cache
const API_CACHE_PATTERNS = [
  /^https:\/\/api\.github\.com\/repos\//,
  /^https:\/\/seraui\.seraprogrammer\.com\/api\//,
];

// Install event - cache static resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_RESOURCES))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter(
              (cacheName) =>
                cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE_NAME
            )
            .map((cacheName) => caches.delete(cacheName))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle API requests with cache-first strategy
  if (API_CACHE_PATTERNS.some((pattern) => pattern.test(request.url))) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            // Serve from cache and update in background
            fetch(request)
              .then((response) => {
                if (response.ok) {
                  cache.put(request, response.clone());
                }
              })
              .catch(() => {}); // Ignore network errors
            return cachedResponse;
          }

          // Not in cache, fetch from network
          return fetch(request)
            .then((response) => {
              if (response.ok) {
                cache.put(request, response.clone());
              }
              return response;
            })
            .catch(() => {
              // Return offline fallback for API requests
              return new Response(
                JSON.stringify({
                  error: "Offline",
                  message: "This request requires an internet connection",
                }),
                {
                  status: 503,
                  headers: { "Content-Type": "application/json" },
                }
              );
            });
        });
      })
    );
    return;
  }

  // Handle static resources with cache-first strategy
  if (request.method === "GET") {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request)
          .then((response) => {
            // Cache successful responses
            if (response.ok && response.status === 200) {
              const responseClone = response.clone();
              caches
                .open(CACHE_NAME)
                .then((cache) => cache.put(request, responseClone));
            }
            return response;
          })
          .catch(() => {
            // Return offline page for navigation requests
            if (request.mode === "navigate") {
              return (
                caches.match("/offline.html") ||
                new Response("Offline", { status: 503 })
              );
            }
            throw error;
          });
      })
    );
  }
});

// Background sync for failed requests
self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync") {
    event.waitUntil(
      // Retry failed requests
      retryFailedRequests()
    );
  }
});

async function retryFailedRequests() {
  // Implementation for retrying failed requests
  // This would typically involve checking IndexedDB for queued requests
  console.log("Retrying failed requests...");
}
