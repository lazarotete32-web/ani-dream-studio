import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock, Sparkles, Apple, Chrome, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — AniGen" }] }),
  component: Login,
});

function Login() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<null | "email" | "google" | "apple">(null);
  const navigate = useNavigate();

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setLoading("email");
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/home` },
        });
        if (error) throw error;
        toast.success("Conta criada! A entrar...");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Bem-vindo de volta!");
      }
      navigate({ to: "/home" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Falha na autenticação");
    } finally {
      setLoading(null);
    }
  }

  async function handleOAuth(provider: "google" | "apple") {
    setLoading(provider);
    try {
      const result = await lovable.auth.signInWithOAuth(provider, {
        redirect_uri: window.location.origin,
      });
      if (result.error) throw result.error;
      if (result.redirected) return; // browser is navigating away
      toast.success("Autenticado!");
      navigate({ to: "/home" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : `Falha ao entrar com ${provider}`);
    } finally {
      setLoading(null);
    }
  }

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
      </div>

      <form onSubmit={handleEmail} className="relative mt-10 flex flex-col gap-3">
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

        <button
          type="submit"
          disabled={loading !== null}
          className="mt-3 flex items-center justify-center gap-2 rounded-2xl bg-gradient-cyber py-4 text-sm font-bold tracking-wide shadow-neon transition active:scale-[0.98] disabled:opacity-60"
        >
          {loading === "email" && <Loader2 className="h-4 w-4 animate-spin" />}
          {mode === "login" ? "Sign In" : "Create Account"}
        </button>
      </form>

      <div className="relative my-6 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" /> or continue with <span className="h-px flex-1 bg-border" />
      </div>

      <div className="relative flex gap-3">
        <button
          type="button"
          onClick={() => handleOAuth("google")}
          disabled={loading !== null}
          className="glass flex flex-1 items-center justify-center gap-2 rounded-2xl py-3 text-sm font-medium disabled:opacity-60"
        >
          {loading === "google" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Chrome className="h-4 w-4" />} Google
        </button>
        <button
          type="button"
          onClick={() => handleOAuth("apple")}
          disabled={loading !== null}
          className="glass flex flex-1 items-center justify-center gap-2 rounded-2xl py-3 text-sm font-medium disabled:opacity-60"
        >
          {loading === "apple" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Apple className="h-4 w-4" />} Apple
        </button>
      </div>

      <p className="relative mt-8 text-center text-sm text-muted-foreground">
        {mode === "login" ? "New here?" : "Already have an account?"}{" "}
        <button
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
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
