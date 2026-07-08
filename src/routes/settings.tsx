import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, Shield, HelpCircle, FileText, LogOut, ChevronRight, Globe, Moon, Crown } from "lucide-react";
import { InstallPWA } from "@/components/InstallPWA";


export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — AniGen" }] }),
  component: Settings,
});

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative h-6 w-11 rounded-full transition ${on ? "bg-gradient-cyber" : "bg-secondary"}`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${on ? "left-[22px]" : "left-0.5"}`}
      />
    </button>
  );
}

function Settings() {
  const [push, setPush] = useState(true);
  const [dark, setDark] = useState(true);
  const [hd, setHd] = useState(false);

  const Row = ({ icon: Icon, label, right, color = "text-foreground" }: any) => (
    <div className="flex items-center gap-3 px-4 py-3.5">
      <Icon className={`h-5 w-5 ${color}`} />
      <span className={`flex-1 text-sm ${color}`}>{label}</span>
      {right}
    </div>
  );

  return (
    <div className="flex flex-col gap-5 px-5 pt-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <Link
        to="/subscription"
        className="flex items-center gap-3 rounded-2xl bg-gradient-cyber p-4 shadow-glow-pink"
      >
        <Crown className="h-7 w-7" />
        <div className="flex-1">
          <p className="text-sm font-bold">Get AniGen Pro</p>
          <p className="text-[11px] text-white/80">Unlock everything</p>
        </div>
        <ChevronRight className="h-4 w-4" />
      </Link>

      <InstallPWA />


      <section>
        <p className="mb-2 px-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          Preferences
        </p>
        <div className="glass divide-y divide-border rounded-2xl">
          <Row icon={Bell} label="Push notifications" right={<Toggle on={push} onChange={() => setPush(!push)} />} />
          <Row icon={Moon} label="Dark mode" right={<Toggle on={dark} onChange={() => setDark(!dark)} />} />
          <Row icon={Globe} label="HD generation default" right={<Toggle on={hd} onChange={() => setHd(!hd)} />} />
        </div>
      </section>

      <section>
        <p className="mb-2 px-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          Account
        </p>
        <div className="glass divide-y divide-border rounded-2xl">
          <Row icon={Shield} label="Privacy & data" right={<ChevronRight className="h-4 w-4 text-muted-foreground" />} />
          <Row icon={FileText} label="Terms of service" right={<ChevronRight className="h-4 w-4 text-muted-foreground" />} />
          <Row icon={HelpCircle} label="Help & support" right={<ChevronRight className="h-4 w-4 text-muted-foreground" />} />
        </div>
      </section>

      <section>
        <div className="glass rounded-2xl">
          <Row icon={LogOut} label="Sign out" color="text-destructive" right={<ChevronRight className="h-4 w-4 text-destructive" />} />
        </div>
      </section>

      <p className="mt-2 text-center text-[10px] text-muted-foreground">
        AniGen v1.0.0 · Made with ✨
      </p>
    </div>
  );
}
