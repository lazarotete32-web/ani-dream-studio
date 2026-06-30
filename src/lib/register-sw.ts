// Single guarded registration entry point for the AniGen service worker.
// Refuses to register in dev, inside the Lovable preview iframe, or when the
// URL carries ?sw=off — unregistering any prior /sw.js in those cases.

const SW_URL = "/sw.js";

const isBlockedHost = (host: string) =>
  host.startsWith("id-preview--") ||
  host.startsWith("preview--") ||
  host === "lovableproject.com" ||
  host.endsWith(".lovableproject.com") ||
  host === "lovableproject-dev.com" ||
  host.endsWith(".lovableproject-dev.com") ||
  host === "beta.lovable.dev" ||
  host.endsWith(".beta.lovable.dev");

async function unregisterExisting() {
  if (!("serviceWorker" in navigator)) return;
  try {
    const regs = await navigator.serviceWorker.getRegistrations();
    await Promise.allSettled(
      regs
        .filter((r) => {
          const url = r.active?.scriptURL || r.installing?.scriptURL || r.waiting?.scriptURL || "";
          return url.endsWith(SW_URL);
        })
        .map((r) => r.unregister()),
    );
  } catch {}
}

export function registerServiceWorker() {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

  const inIframe = window.self !== window.top;
  const host = window.location.hostname;
  const swOff = new URLSearchParams(window.location.search).get("sw") === "off";
  const isProd = import.meta.env.PROD;

  if (!isProd || inIframe || isBlockedHost(host) || swOff) {
    void unregisterExisting();
    return;
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker.register(SW_URL, { scope: "/" }).catch(() => {
      /* swallow — offline is best-effort */
    });
  });
}
