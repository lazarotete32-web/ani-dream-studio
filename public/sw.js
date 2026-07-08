// Minimal AniGen service worker: network-first for navigations,
// cache-first for hashed built assets. Enables installability + fast reloads.
const CACHE = "anigen-v1";
const ASSET_RE = /\/(assets|_build)\//;

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  // Never cache API / auth / SSE
  if (url.pathname.startsWith("/api/") || url.pathname.startsWith("/~oauth")) return;

  // HTML navigations: network first, fallback to cache
  if (req.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(req);
          const cache = await caches.open(CACHE);
          cache.put(req, fresh.clone());
          return fresh;
        } catch {
          const cached = await caches.match(req);
          return cached || caches.match("/home") || Response.error();
        }
      })(),
    );
    return;
  }

  // Hashed assets: cache first
  if (ASSET_RE.test(url.pathname)) {
    event.respondWith(
      (async () => {
        const cached = await caches.match(req);
        if (cached) return cached;
        const fresh = await fetch(req);
        const cache = await caches.open(CACHE);
        cache.put(req, fresh.clone());
        return fresh;
      })(),
    );
  }
});
