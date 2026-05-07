import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock, Sparkles, Apple, Chrome } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — AniGen" }] }),
  component: Login,
});

function Login() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const navigate = useNavigate();

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

      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ to: "/home" });
        }}
        className="relative mt-10 flex flex-col gap-3"
      >
        <div className="glass flex items-center gap-3 rounded-2xl px-4 py-3.5">
          <Mail className="h-5 w-5 text-neon-cyan" />
          <input
            type="email"
            required
            placeholder="you@example.com"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="glass flex items-center gap-3 rounded-2xl px-4 py-3.5">
          <Lock className="h-5 w-5 text-neon-pink" />
          <input
            type="password"
            required
            placeholder="Password"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>

        <button
          type="submit"
          className="mt-3 rounded-2xl bg-gradient-cyber py-4 text-sm font-bold tracking-wide shadow-neon transition active:scale-[0.98]"
        >
          {mode === "login" ? "Sign In" : "Create Account"}
        </button>
      </form>

      <div className="relative my-6 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" /> or continue with <span className="h-px flex-1 bg-border" />
      </div>

      <div className="relative flex gap-3">
        <button className="glass flex flex-1 items-center justify-center gap-2 rounded-2xl py-3 text-sm font-medium">
          <Chrome className="h-4 w-4" /> Google
        </button>
        <button className="glass flex flex-1 items-center justify-center gap-2 rounded-2xl py-3 text-sm font-medium">
          <Apple className="h-4 w-4" /> Apple
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
