import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Mail, Lock, Sparkles, Zap, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { claimDailyCredits } from "@/hooks/useCredits";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — AniGen" },
      { name: "description", content: "Sign in to AniGen and get 5 free AI anime credits every day." },
      { property: "og:title", content: "Sign in — AniGen" },
      { property: "og:description", content: "5 free anime generations every day, on every account." },
    ],
  }),
  component: Login,
});

function Login() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      void claimDailyCredits().then(() => navigate({ to: "/home" }));
    }
  }, [user, loading, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setMsg(null);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/home` },
        });
        if (error) throw error;
        if (!data.session) {
          setMsg("Check your inbox to confirm your email, then sign in.");
          setMode("login");
          return;
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      await claimDailyCredits();
      navigate({ to: "/home" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col px-6 pb-10 pt-16">
      <div className="absolute -right-24 top-10 h-64 w-64 rounded-full bg-neon-purple/30 blur-3xl" />
      <div className="absolute -left-24 bottom-10 h-64 w-64 rounded-full bg-neon-blue/30 blur-3xl" />

      <div className="relative flex flex-col items-center text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-cyber shadow-neon">
          <Sparkles className="h-7 w-7 text-white" />
        </div>
        <h1 className="mt-5 text-3xl font-bold">
          {mode === "login" ? "Welcome back" : "Join AniGen"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {mode === "login" ? "Continue your anime journey" : "Start transforming photos for free"}
        </p>
        <span className="glass mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs">
          <Zap className="h-3.5 w-3.5 text-neon-cyan" />
          5 free credits every day, per account
        </span>
      </div>

      <form onSubmit={submit} className="relative mt-8 flex flex-col gap-3">
        <div className="glass flex items-center gap-3 rounded-2xl px-4 py-3.5">
          <Mail className="h-5 w-5 text-neon-cyan" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="glass flex items-center gap-3 rounded-2xl px-4 py-3.5">
          <Lock className="h-5 w-5 text-neon-pink" />
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>

        {error && (
          <p className="rounded-2xl bg-destructive/15 px-4 py-3 text-xs text-destructive-foreground">{error}</p>
        )}
        {msg && (
          <p className="rounded-2xl bg-neon-cyan/10 px-4 py-3 text-xs text-neon-cyan">{msg}</p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="mt-3 flex items-center justify-center gap-2 rounded-2xl bg-gradient-cyber py-4 text-sm font-bold tracking-wide shadow-neon transition active:scale-[0.98] disabled:opacity-60"
        >
          {busy && <Loader2 className="h-4 w-4 animate-spin" />}
          {mode === "login" ? "Sign In" : "Create Account"}
        </button>
      </form>

      <p className="relative mt-8 text-center text-sm text-muted-foreground">
        {mode === "login" ? "New here?" : "Already have an account?"}{" "}
        <button
          onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(null); }}
          className="font-semibold text-neon-pink"
        >
          {mode === "login" ? "Create account" : "Sign in"}
        </button>
      </p>

      <Link to="/home" className="relative mt-4 text-center text-xs text-muted-foreground underline">
        Skip for now
      </Link>
    </div>
  );
}
