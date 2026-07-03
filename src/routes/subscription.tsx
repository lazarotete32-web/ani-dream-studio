import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Crown, Sparkles, Zap, X } from "lucide-react";

export const Route = createFileRoute("/subscription")({
  head: () => ({ meta: [{ title: "Go Pro — AniGen" }] }),
  component: Subscription,
});

const plans = [
  { id: "weekly", name: "Weekly", price: "$3.99", per: "/week", save: null },
  { id: "monthly", name: "Monthly", price: "$9.99", per: "/month", save: "POPULAR" },
  { id: "yearly", name: "Yearly", price: "$49.99", per: "/year", save: "SAVE 60%" },
];

const features = [
  "Unlimited AI generations",
  "No watermark on exports",
  "4K HD downloads",
  "All anime styles unlocked",
  "Priority generation queue",
  "Ad-free experience",
  "Early access to new styles",
];

function Subscription() {
  const [plan, setPlan] = useState("monthly");

  return (
    <div className="flex flex-col gap-6 px-5 pt-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-cyber p-6 shadow-neon">
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/20 blur-2xl" />
        <Crown className="h-12 w-12 text-white" />
        <h1 className="mt-3 text-3xl font-bold">AniGen Pro</h1>
        <p className="mt-1 text-sm text-white/80">Unleash unlimited anime magic</p>
      </div>

      <section className="glass rounded-2xl p-5">
        <h3 className="mb-4 text-sm font-bold">Everything in Pro</h3>
        <ul className="flex flex-col gap-3">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-3 text-sm">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-cyber">
                <Check className="h-3.5 w-3.5" />
              </div>
              {f}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="mb-3 text-sm font-bold">Choose your plan</h3>
        <div className="flex flex-col gap-3">
          {plans.map((p) => {
            const active = plan === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setPlan(p.id)}
                className={`relative flex items-center justify-between rounded-2xl p-4 text-left transition ${
                  active ? "bg-gradient-cyber shadow-neon" : "glass"
                }`}
              >
                {p.save && (
                  <span className="absolute -top-2 right-4 rounded-full bg-neon-cyan px-2 py-0.5 text-[10px] font-bold text-background">
                    {p.save}
                  </span>
                )}
                <div className="flex items-center gap-3">
                  <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${active ? "border-white bg-white" : "border-muted-foreground"}`}>
                    {active && <div className="h-2 w-2 rounded-full bg-neon-pink" />}
                  </div>
                  <div>
                    <p className="font-bold">{p.name}</p>
                    <p className="text-xs opacity-80">{p.price}{p.per}</p>
                  </div>
                </div>
                <span className="text-2xl font-bold">{p.price}</span>
              </button>
            );
          })}
        </div>
      </section>

      <button className="rounded-2xl bg-gradient-cyber py-4 text-base font-bold shadow-neon active:scale-[0.98]">
        Start 3-Day Free Trial
      </button>

      <section>
        <h3 className="mb-3 text-sm font-bold">Or buy extra credits</h3>
        <div className="grid grid-cols-3 gap-2">
          {[
            { c: 20, p: "$1.99" },
            { c: 100, p: "$7.99" },
            { c: 500, p: "$24.99" },
          ].map((c) => (
            <button key={c.c} className="glass flex flex-col items-center gap-1 rounded-2xl p-3">
              <Zap className="h-5 w-5 text-neon-cyan" />
              <p className="text-sm font-bold">{c.c}</p>
              <p className="text-[10px] text-muted-foreground">{c.p}</p>
            </button>
          ))}
        </div>
      </section>

      <p className="text-center text-[10px] text-muted-foreground">
        Auto-renews. Cancel anytime in Settings.
      </p>
    </div>
  );
}
