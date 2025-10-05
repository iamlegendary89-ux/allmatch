// sw.js - Optimized Service Worker for SmartMatch Pro
// Design: Cache-first for static, network-with-cache for images; minimal size.
// Optimization: Precaches essentials, handles dynamic URLs, purges stale caches.
// Error Handling: Graceful fallbacks for network issues.

const CACHE_NAME = 'smartmatch-pro-v1';
const PRECACHE_ASSETS = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/manifest.json',
    'https://raw.githubusercontent.com/google/material-design-icons/master/png/device/smartphone/materialicons/192dp/2x/baseline_smartphone_black_192dp.png'
];

// Install event: Precache static assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(PRECACHE_ASSETS)
                    .catch(err => console.error('Cache addAll error:', err));
            })
            .then(() => self.skipWaiting())
            .catch(err => console.error('Install error:', err))
    );
});

// Activate event: Clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(name => name !== CACHE_NAME)
                    .map(name => caches.delete(name))
            );
        }).catch(err => console.error('Activate error:', err))
    );
});

// Fetch event: Cache-first for static, network-first for images
self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    
    // Cache-first for static assets
    if (PRECACHE_ASSETS.includes(url.pathname) || url.pathname === '/') {
        event.respondWith(
            caches.match(event.request)
                .then(cachedResponse => {
                    return cachedResponse || fetch(event.request)
                        .then(response => {
                            return caches.open(CACHE_NAME)
                                .then(cache => {
                                    cache.put(event.request, response.clone());
                                    return response;
                                });
                        })
                        .catch(err => {
                            console.error('Fetch error for static asset:', err);
                            return new Response('Offline fallback', { status: 503 });
                        });
                })
        );
    } else {
        // Network-first for dynamic images (Unsplash)
        event.respondWith(
            fetch(event.request)
                .then(networkResponse => {
                    return caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, networkResponse.clone());
                            return networkResponse;
                        });
                })
                .catch(() => {
                    return caches.match(event.request)
                        .then(cachedResponse => {
                            return cachedResponse || new Response(
                                '<div style="background: linear-gradient(135deg, #0ea5e9, #8b5cf6); width: 100%; height: 100%;"></div>',
                                { status: 200, headers: { 'Content-Type': 'text/html' } }
                            );
                        });
                })
        );
    }
});
