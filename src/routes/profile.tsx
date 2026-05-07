import { createFileRoute, Link } from "@tanstack/react-router";
import { Settings as SettingsIcon, Crown, Zap, Image as ImageIcon, Heart, Share2 } from "lucide-react";
import classicImg from "@/assets/style-classic.jpg";
import cyberpunkImg from "@/assets/style-cyberpunk.jpg";
import ghibliImg from "@/assets/style-ghibli.jpg";
import kawaiiImg from "@/assets/style-kawaii.jpg";
import samuraiImg from "@/assets/style-samurai.jpg";
import mangaImg from "@/assets/style-manga.jpg";
import afterImg from "@/assets/after-anime.jpg";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — AniGen" }] }),
  component: Profile,
});

const creations = [afterImg, cyberpunkImg, ghibliImg, classicImg, kawaiiImg, samuraiImg, mangaImg, afterImg, cyberpunkImg];

function Profile() {
  return (
    <div className="flex flex-col gap-6 px-5 pt-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Profile</h1>
        <Link to="/settings" className="glass flex h-10 w-10 items-center justify-center rounded-full">
          <SettingsIcon className="h-4 w-4" />
        </Link>
      </header>

      {/* User card */}
      <div className="glass-strong relative overflow-hidden rounded-3xl p-5 neon-border">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-cyber blur-md" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-cyber text-2xl font-bold">
              A
            </div>
          </div>
          <div className="flex-1">
            <p className="text-lg font-bold">Aria Nakamura</p>
            <p className="text-xs text-muted-foreground">aria@anigen.app</p>
            <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-gradient-cyber px-2 py-0.5 text-[10px] font-bold">
              <Crown className="h-2.5 w-2.5" /> FREE PLAN
            </span>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-3 border-t border-border pt-4">
          {[
            { v: "47", l: "Creations" },
            { v: "5", l: "Credits" },
            { v: "12", l: "Liked" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <p className="text-xl font-bold text-gradient">{s.v}</p>
              <p className="text-[10px] text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      <Link
        to="/subscription"
        className="flex items-center gap-3 rounded-2xl bg-gradient-cyber p-4 shadow-glow-pink"
      >
        <Crown className="h-7 w-7" />
        <div className="flex-1">
          <p className="text-sm font-bold">Upgrade to Pro</p>
          <p className="text-[11px] text-white/80">Unlimited generations & no ads</p>
        </div>
        <span className="text-lg">›</span>
      </Link>

      {/* Daily credits */}
      <div className="glass rounded-2xl p-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-neon-cyan" />
            <span className="text-sm font-bold">Daily free credits</span>
          </div>
          <span className="text-xs text-muted-foreground">resets in 8h</span>
        </div>
        <div className="flex gap-1.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-2 flex-1 rounded-full bg-gradient-cyber" />
          ))}
        </div>
      </div>

      {/* Tabs */}
      <section>
        <div className="mb-3 flex gap-4 border-b border-border">
          <button className="border-b-2 border-neon-pink pb-2 text-sm font-bold text-neon-pink">
            <ImageIcon className="mr-1 inline h-3.5 w-3.5" /> Creations
          </button>
          <button className="pb-2 text-sm text-muted-foreground">
            <Heart className="mr-1 inline h-3.5 w-3.5" /> Liked
          </button>
          <button className="pb-2 text-sm text-muted-foreground">
            <Share2 className="mr-1 inline h-3.5 w-3.5" /> Shared
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {creations.map((c, i) => (
            <Link
              key={i}
              to="/result"
              className="relative aspect-square overflow-hidden rounded-xl"
            >
              <img src={c} alt="" loading="lazy" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
