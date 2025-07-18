// Service Worker for Sera UI - Enhanced Performance and SEO
const CACHE_NAME = 'sera-ui-v1.0.0'
const STATIC_CACHE = 'sera-ui-static-v1.0.0'
const DYNAMIC_CACHE = 'sera-ui-dynamic-v1.0.0'

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/docs',
  '/docs/installation',
  '/docs/button',
  '/docs/card',
  '/docs/tabs',
  '/manifest.json',
  '/logo.svg',
  '/favicon.ico',
  '/og-image.png'
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('Caching static assets')
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => {
        return self.skipWaiting()
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => {
              return cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE
            })
            .map(cacheName => {
              console.log('Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            })
        )
      })
      .then(() => {
        return self.clients.claim()
      })
  )
})

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') return

  // Skip external requests
  if (url.origin !== location.origin) return

  // Handle different types of requests
  if (request.destination === 'document') {
    // HTML pages - Network first, cache fallback
    event.respondWith(
      fetch(request)
        .then(response => {
          const responseClone = response.clone()
          caches.open(DYNAMIC_CACHE)
            .then(cache => {
              cache.put(request, responseClone)
            })
          return response
        })
        .catch(() => {
          return caches.match(request)
            .then(response => {
              return response || caches.match('/')
            })
        })
    )
  } else if (request.destination === 'image') {
    // Images - Cache first, network fallback
    event.respondWith(
      caches.match(request)
        .then(response => {
          if (response) {
            return response
          }
          return fetch(request)
            .then(response => {
              const responseClone = response.clone()
              caches.open(DYNAMIC_CACHE)
                .then(cache => {
                  cache.put(request, responseClone)
                })
              return response
            })
        })
    )
  } else {
    // Other assets - Cache first, network fallback
    event.respondWith(
      caches.match(request)
        .then(response => {
          return response || fetch(request)
            .then(response => {
              const responseClone = response.clone()
              caches.open(DYNAMIC_CACHE)
                .then(cache => {
                  cache.put(request, responseClone)
                })
              return response
            })
        })
    )
  }
})

// Background sync for offline functionality
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Sync data when back online
      console.log('Background sync triggered')
    )
  }
})

// Push notifications (for future use)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json()
    const options = {
      body: data.body,
      icon: '/logo.svg',
      badge: '/logo.svg',
      data: data.url
    }
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    )
  }
})

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  
  if (event.notification.data) {
    event.waitUntil(
      clients.openWindow(event.notification.data)
    )
  }
})

// Periodic background sync (for future use)
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'content-sync') {
    event.waitUntil(
      // Sync content periodically
      console.log('Periodic sync triggered')
    )
  }
})