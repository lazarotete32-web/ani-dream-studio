import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => navigate({ to: "/login" }), 2200);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      <div className="absolute inset-0 bg-glow" />
      <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-neon-blue/30 blur-3xl animate-pulse-glow" />
      <div className="absolute -right-20 bottom-32 h-72 w-72 rounded-full bg-neon-pink/30 blur-3xl animate-pulse-glow" />

      <div className="relative flex flex-col items-center gap-6 text-center">
        <div className="relative animate-float">
          <div className="absolute inset-0 rounded-3xl bg-gradient-cyber blur-2xl opacity-70" />
          <div className="relative flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-cyber shadow-neon">
            <Sparkles className="h-14 w-14 text-white" strokeWidth={2.2} />
          </div>
        </div>
        <div>
          <h1 className="text-5xl font-bold tracking-tight">
            <span className="text-gradient">AniGen</span>
          </h1>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Transform Your Photo Into Anime In Seconds
          </p>
        </div>
        <div className="mt-8 flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-2 w-2 rounded-full bg-neon-pink animate-pulse-glow"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
