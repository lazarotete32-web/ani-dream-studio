import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Zap, Flame, TrendingUp, Star, Crown } from "lucide-react";
import heroImg from "@/assets/hero-anime.jpg";
import classicImg from "@/assets/style-classic.jpg";
import mangaImg from "@/assets/style-manga.jpg";
import cyberpunkImg from "@/assets/style-cyberpunk.jpg";
import ghibliImg from "@/assets/style-ghibli.jpg";
import kawaiiImg from "@/assets/style-kawaii.jpg";
import samuraiImg from "@/assets/style-samurai.jpg";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Home — AniGen" },
      { name: "description", content: "Transform your photo into anime art with AI. Classic, Cyberpunk, Ghibli & more." },
    ],
  }),
  component: Home,
});

const trending = [
  { img: cyberpunkImg, label: "Cyberpunk", uses: "2.4M" },
  { img: classicImg, label: "Classic", uses: "1.8M" },
  { img: ghibliImg, label: "Ghibli", uses: "1.2M" },
  { img: kawaiiImg, label: "Kawaii", uses: "980K" },
  { img: samuraiImg, label: "Samurai", uses: "740K" },
  { img: mangaImg, label: "Manga", uses: "612K" },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-8 px-5 pt-6">
      {/* Top bar */}
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Welcome to</p>
          <h1 className="text-2xl font-bold text-gradient">AniGen</h1>
        </div>
        <div className="glass flex items-center gap-2 rounded-full px-3 py-1.5">
          <Zap className="h-4 w-4 text-neon-cyan" />
          <span className="text-sm font-semibold">5</span>
          <span className="text-xs text-muted-foreground">credits</span>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-gradient-cyber opacity-90" />
        <img
          src={heroImg}
          alt="AI generated anime portrait"
          width={1024}
          height={1280}
          className="h-80 w-full object-cover mix-blend-overlay opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <div className="glass mb-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium">
            <Flame className="h-3 w-3 text-neon-pink" /> Trending #1 worldwide
          </div>
          <h2 className="text-3xl font-bold leading-tight">
            Transform Your Photo<br />Into <span className="text-gradient">Anime</span>
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">AI magic in under 10 seconds.</p>
          <Link
            to="/generate"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-cyber px-6 py-3 text-sm font-bold shadow-neon animate-pulse-glow"
          >
            <Sparkles className="h-4 w-4" /> Generate Now
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-3 gap-3">
        {[
          { v: "12M+", l: "Creations" },
          { v: "4.9★", l: "Rating" },
          { v: "180+", l: "Countries" },
        ].map((s) => (
          <div key={s.l} className="glass rounded-2xl p-3 text-center">
            <p className="text-lg font-bold text-gradient">{s.v}</p>
            <p className="text-[10px] text-muted-foreground">{s.l}</p>
          </div>
        ))}
      </section>

      {/* Trending styles */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-bold">Trending Styles</h3>
          <Link to="/generate" className="text-xs font-semibold text-neon-pink">See all</Link>
        </div>
        <div className="-mx-5 flex snap-x gap-3 overflow-x-auto px-5 pb-2 scrollbar-none">
          {trending.map((t) => (
            <Link
              key={t.label}
              to="/generate"
              className="group relative w-36 shrink-0 snap-start overflow-hidden rounded-2xl"
            >
              <img
                src={t.img}
                alt={t.label}
                loading="lazy"
                width={512}
                height={640}
                className="h-48 w-full object-cover transition group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3">
                <p className="text-sm font-bold">{t.label}</p>
                <p className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <TrendingUp className="h-2.5 w-2.5" /> {t.uses} uses
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Social proof */}
      <section className="glass rounded-3xl p-5">
        <div className="mb-4 flex items-center gap-2">
          <Flame className="h-5 w-5 text-neon-pink" />
          <h3 className="font-bold">Going viral on TikTok</h3>
        </div>
        <div className="flex flex-col gap-3">
          {[
            { n: "@aria.exe", t: "Literally addicted to this app 😭✨", l: "324K" },
            { n: "@kenji_art", t: "Best anime AI I've ever tried", l: "189K" },
            { n: "@miya.chan", t: "The cyberpunk style is INSANE 🔥", l: "412K" },
          ].map((r) => (
            <div key={r.n} className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-cyber text-xs font-bold">
                {r.n[1].toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold">{r.n}</p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-2.5 w-2.5 fill-neon-pink text-neon-pink" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{r.t}</p>
                <p className="mt-0.5 text-[10px] text-neon-cyan">♥ {r.l} likes</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Premium teaser */}
      <Link
        to="/subscription"
        className="relative overflow-hidden rounded-3xl bg-gradient-cyber p-5 shadow-glow-pink"
      >
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex items-center gap-4">
          <Crown className="h-10 w-10 text-white" />
          <div className="flex-1">
            <p className="text-base font-bold">Go AniGen Pro</p>
            <p className="text-xs text-white/80">Unlimited gens · No watermark · 4K HD</p>
          </div>
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur">Try</span>
        </div>
      </Link>
    </div>
  );
}
