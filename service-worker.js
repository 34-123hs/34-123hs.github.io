const CACHE_NAME = "site-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/fallback.html"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => 
      caches.match(event.request).then(res => res || caches.match('/fallback.html'))
    )
  );
});