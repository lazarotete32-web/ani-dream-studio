import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect } from "react";

import appCss from "../styles.css?url";
import { AppShell } from "@/components/AppShell";
import { registerServiceWorker } from "@/lib/register-sw";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass-strong max-w-md rounded-3xl p-8 text-center">
        <h1 className="text-7xl font-bold text-gradient">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Lost in the matrix</h2>
        <p className="mt-2 text-sm text-muted-foreground">This page doesn't exist.</p>
        <Link
          to="/home"
          className="mt-6 inline-flex rounded-full bg-gradient-cyber px-6 py-2.5 text-sm font-semibold shadow-neon"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass-strong max-w-md rounded-3xl p-8 text-center">
        <h1 className="text-xl font-semibold">Something glitched</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 rounded-full bg-gradient-cyber px-6 py-2.5 text-sm font-semibold shadow-neon"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#1a0b2e" },
      { title: "AniGen — Transform Your Photo Into Anime In Seconds" },
      { name: "description", content: "AniGen turns your photos into stunning anime art with AI. Classic, Cyberpunk, Ghibli, Kawaii, Samurai and more." },
      { property: "og:title", content: "AniGen — Transform Your Photo Into Anime In Seconds" },
      { property: "og:description", content: "AniGen turns your photos into stunning anime art with AI. Classic, Cyberpunk, Ghibli, Kawaii, Samurai and more." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "AniGen — Transform Your Photo Into Anime In Seconds" },
      { name: "twitter:description", content: "AniGen turns your photos into stunning anime art with AI. Classic, Cyberpunk, Ghibli, Kawaii, Samurai and more." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/q3luMJnekQRbs652lAibrF50dQ02/social-images/social-1778134282907-4f50351f-90d6-4d74-86ee-6956c0ee617f.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/q3luMJnekQRbs652lAibrF50dQ02/social-images/social-1778134282907-4f50351f-90d6-4d74-86ee-6956c0ee617f.webp" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "icon", type: "image/png", sizes: "512x512", href: "/icon-512.png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  useEffect(() => { registerServiceWorker(); }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <AppShell>
        <Outlet />
      </AppShell>
    </QueryClientProvider>
  );
}
