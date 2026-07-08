import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Download, Share2, Heart, RefreshCw, Crown } from "lucide-react";
import beforeFallback from "@/assets/before-photo.jpg";
import afterFallback from "@/assets/after-anime.jpg";
import { z } from "zod";
import {
  shareGeneric,
  shareTikTok,
  shareInstagram,
  shareFacebook,
  shareWhatsApp,
} from "@/lib/share";

const search = z.object({ style: z.string().optional() });

export const Route = createFileRoute("/result")({
  head: () => ({ meta: [{ title: "Your Anime — AniGen" }] }),
  validateSearch: (s) => search.parse(s),
  component: Result,
});

function Result() {
  const [pos, setPos] = useState(50);
  const [liked, setLiked] = useState(false);
  const [beforeImg, setBeforeImg] = useState(beforeFallback);
  const [afterImg, setAfterImg] = useState(afterFallback);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const b = sessionStorage.getItem("anigen:before");
      const a = sessionStorage.getItem("anigen:after");
      if (b) setBeforeImg(b);
      if (a) setAfterImg(a);
    } catch {}
  }, []);

  const downloadAfter = async () => {
    const { watermarkImage } = await import("@/lib/watermark");
    const marked = await watermarkImage(afterImg);
    const a = document.createElement("a");
    a.href = marked;
    a.download = "anigen.png";
    a.click();
  };


  const move = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  };

  return (
    <div className="flex flex-col gap-6 px-5 pt-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Your <span className="text-gradient">Masterpiece</span></h1>
          <p className="text-xs text-muted-foreground">Drag the slider to compare</p>
        </div>
        <button
          onClick={() => setLiked(!liked)}
          className={`flex h-10 w-10 items-center justify-center rounded-full glass ${liked ? "text-neon-pink" : ""}`}
        >
          <Heart className={`h-5 w-5 ${liked ? "fill-neon-pink" : ""}`} />
        </button>
      </header>

      {/* Before/After slider */}
      <div
        ref={ref}
        onMouseMove={(e) => e.buttons === 1 && move(e.clientX)}
        onTouchMove={(e) => move(e.touches[0].clientX)}
        onClick={(e) => move(e.clientX)}
        className="relative aspect-square cursor-ew-resize overflow-hidden rounded-3xl select-none shadow-neon"
      >
        <img src={afterImg} alt="After" className="absolute inset-0 h-full w-full object-cover" />
        <div
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${pos}%` }}
        >
          <img
            src={beforeImg}
            alt="Before"
            className="h-full w-full object-cover"
            style={{ width: `${ref.current?.clientWidth ?? 0}px` }}
          />
        </div>
        <div
          className="absolute inset-y-0 w-0.5 bg-gradient-cyber"
          style={{ left: `${pos}%` }}
        >
          <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-cyber shadow-neon">
            <span className="text-xs font-bold">⇄</span>
          </div>
        </div>
        <span className="absolute left-3 top-3 rounded-full bg-background/70 px-3 py-1 text-[10px] font-semibold backdrop-blur">
          BEFORE
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-gradient-cyber px-3 py-1 text-[10px] font-semibold">
          AFTER
        </span>
        {/* Watermark for free users */}
        <span className="absolute bottom-3 right-3 rounded-full bg-background/70 px-2.5 py-1 text-[9px] font-bold backdrop-blur">
          ✨ AniGen
        </span>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button onClick={downloadAfter} className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-cyber py-3.5 text-sm font-bold shadow-neon">
          <Download className="h-4 w-4" /> Download HD
        </button>
        <button onClick={() => shareGeneric(afterImg)} className="glass flex items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold">
          <Share2 className="h-4 w-4" /> Share
        </button>
      </div>

      {/* Share to apps */}
      <section>
        <p className="mb-3 text-xs text-muted-foreground">Share directly to</p>
        <div className="grid grid-cols-4 gap-3">
          {[
            { n: "TikTok", c: "from-neon-pink to-neon-cyan", a: () => shareTikTok(afterImg) },
            { n: "Instagram", c: "from-neon-purple to-neon-pink", a: () => shareInstagram(afterImg) },
            { n: "Facebook", c: "from-neon-blue to-neon-purple", a: () => shareFacebook(afterImg) },
            { n: "WhatsApp", c: "from-neon-cyan to-neon-blue", a: () => shareWhatsApp(afterImg) },
          ].map((s) => (
            <button key={s.n} onClick={s.a} className="flex flex-col items-center gap-2 active:scale-95 transition">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${s.c} text-base font-bold shadow-neon`}>
                {s.n[0]}
              </div>
              <span className="text-[10px] text-muted-foreground">{s.n}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Premium banner */}
      <Link
        to="/subscription"
        className="glass-strong flex items-center gap-3 rounded-2xl p-4 neon-border"
      >
        <Crown className="h-8 w-8 text-neon-pink" />
        <div className="flex-1">
          <p className="text-sm font-bold">Remove watermark</p>
          <p className="text-[11px] text-muted-foreground">Upgrade to Pro for clean exports</p>
        </div>
        <span className="rounded-full bg-gradient-cyber px-3 py-1 text-[11px] font-bold">Upgrade</span>
      </Link>

      <Link
        to="/generate"
        className="flex items-center justify-center gap-2 py-2 text-sm font-semibold text-neon-cyan"
      >
        <RefreshCw className="h-4 w-4" /> Generate another
      </Link>
    </div>
  );
}
