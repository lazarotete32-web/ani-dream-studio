import { Link, useLocation } from "@tanstack/react-router";
import { Home, Sparkles, User, Crown, Settings as SettingsIcon } from "lucide-react";
import type { ReactNode } from "react";

const tabs = [
  { to: "/home", icon: Home, label: "Home" },
  { to: "/generate", icon: Sparkles, label: "Create" },
  { to: "/subscription", icon: Crown, label: "Pro" },
  { to: "/profile", icon: User, label: "Profile" },
  { to: "/settings", icon: SettingsIcon, label: "Settings" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const hideNav = pathname === "/" || pathname === "/login";

  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col">
      <div className="pointer-events-none absolute inset-0 bg-glow opacity-60" />
      <main className="relative flex-1 pb-28">{children}</main>
      {!hideNav && (
        <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-md -translate-x-1/2 px-4 pb-4">
          <div className="glass-strong flex items-center justify-around rounded-3xl px-2 py-2 shadow-neon">
            {tabs.map((t) => {
              const active = pathname.startsWith(t.to);
              const Icon = t.icon;
              return (
                <Link
                  key={t.to}
                  to={t.to}
                  className="relative flex flex-1 flex-col items-center gap-1 rounded-2xl px-2 py-2 transition"
                >
                  {active && (
                    <span className="absolute inset-0 rounded-2xl bg-gradient-cyber opacity-20" />
                  )}
                  <Icon
                    className={`relative h-5 w-5 transition ${active ? "text-neon-pink" : "text-muted-foreground"}`}
                    strokeWidth={active ? 2.4 : 1.8}
                  />
                  <span
                    className={`relative text-[10px] font-medium ${active ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    {t.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
}
