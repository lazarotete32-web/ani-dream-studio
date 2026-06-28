import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { Upload, Camera, Sparkles, X, Wand2 } from "lucide-react";
import { createParser } from "eventsource-parser";
import { flushSync } from "react-dom";
import classicImg from "@/assets/style-classic.jpg";
import mangaImg from "@/assets/style-manga.jpg";
import cyberpunkImg from "@/assets/style-cyberpunk.jpg";
import ghibliImg from "@/assets/style-ghibli.jpg";
import kawaiiImg from "@/assets/style-kawaii.jpg";
import samuraiImg from "@/assets/style-samurai.jpg";

export const Route = createFileRoute("/generate")({
  head: () => ({ meta: [{ title: "AI Generator — AniGen" }] }),
  component: Generate,
});

const styles = [
  { id: "classic", name: "Classic Anime", img: classicImg },
  { id: "manga", name: "Manga", img: mangaImg },
  { id: "cyberpunk", name: "Cyberpunk", img: cyberpunkImg },
  { id: "ghibli", name: "Ghibli", img: ghibliImg },
  { id: "kawaii", name: "Kawaii", img: kawaiiImg },
  { id: "samurai", name: "Samurai", img: samuraiImg },
];

const readAsDataUrl = (f: File) =>
  new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = () => reject(r.error);
    r.readAsDataURL(f);
  });

function Generate() {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [style, setStyle] = useState("cyberpunk");
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [drag, setDrag] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const camRef = useRef<HTMLInputElement>(null);

  const handleFile = (f?: File) => {
    if (!f) return;
    setPhotoFile(f);
    const url = URL.createObjectURL(f);
    setPhoto(url);
  };

  const start = async () => {
    if (!photoFile) return;
    setGenerating(true);
    setProgress(5);
    setPreview(null);
    setError(null);

    try {
      const imageDataUrl = await readAsDataUrl(photoFile);
      const beforeDataUrl = imageDataUrl;

      const res = await fetch("/api/generate-anime", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageDataUrl, style, prompt }),
      });

      if (!res.ok || !res.body) {
        const t = await res.text().catch(() => "");
        throw new Error(t || `Request failed (${res.status})`);
      }

      let finalUrl: string | null = null;
      let streamError: string | null = null;
      let frameIdx = 0;

      const parser = createParser({
        onEvent(ev) {
          let payload: any;
          try { payload = JSON.parse(ev.data); } catch { return; }
          if (ev.event === "error" || payload?.type === "error") {
            streamError = payload?.error?.message ?? "Generation failed";
            return;
          }
          if (
            ev.event !== "image_generation.partial_image" &&
            ev.event !== "image_generation.completed"
          ) return;
          if (!payload?.b64_json) return;
          const dataUrl = `data:image/png;base64,${payload.b64_json}`;
          const isFinal = ev.event === "image_generation.completed";
          frameIdx++;
          flushSync(() => {
            setPreview(dataUrl);
            setProgress(isFinal ? 100 : Math.min(90, 20 + frameIdx * 15));
          });
          if (isFinal) finalUrl = dataUrl;
        },
      });

      const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        parser.feed(value);
      }

      if (streamError) throw new Error(streamError);
      if (!finalUrl) throw new Error("No image returned");

      try {
        sessionStorage.setItem("anigen:before", beforeDataUrl);
        sessionStorage.setItem("anigen:after", finalUrl);
        sessionStorage.setItem("anigen:style", style);
      } catch {}

      setProgress(100);
      setTimeout(() => navigate({ to: "/result", search: { style } as never }), 300);
    } catch (e: any) {
      setError(e?.message || "Something went wrong");
      setGenerating(false);
    }
  };

  if (generating) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center px-8 text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 rounded-full bg-gradient-cyber blur-3xl opacity-70 animate-pulse-glow" />
          {preview ? (
            <img
              src={preview}
              alt="preview"
              className={`relative h-48 w-48 rounded-3xl object-cover shadow-neon transition-[filter] duration-300 ${
                progress >= 100 ? "blur-0" : "blur-md"
              }`}
            />
          ) : (
            <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-cyber shadow-neon">
              <Wand2 className="h-14 w-14 animate-float text-white" />
            </div>
          )}
        </div>
        <h2 className="text-2xl font-bold">Crafting your anime...</h2>
        <p className="mt-2 text-sm text-muted-foreground">AI is working its magic ✨</p>
        <div className="mt-8 h-2 w-full max-w-xs overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full bg-gradient-cyber transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-3 text-xs font-semibold text-neon-pink">{Math.round(progress)}%</p>
        {error && (
          <div className="mt-6 max-w-xs space-y-3">
            <p className="text-sm text-red-400">{error}</p>
            <button
              onClick={() => { setError(null); setGenerating(false); }}
              className="glass rounded-full px-4 py-2 text-xs font-semibold"
            >
              Try again
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 px-5 pt-6">
      <header>
        <h1 className="text-3xl font-bold">AI <span className="text-gradient">Generator</span></h1>
        <p className="mt-1 text-sm text-muted-foreground">Upload a photo and pick your vibe</p>
      </header>

      {/* Upload */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          handleFile(e.dataTransfer.files?.[0]);
        }}
        className={`relative aspect-square overflow-hidden rounded-3xl border-2 border-dashed transition ${
          drag ? "border-neon-pink bg-neon-pink/10" : "border-border glass"
        }`}
      >
        {photo ? (
          <>
            <img src={photo} alt="Upload" className="h-full w-full object-cover" />
            <button
              onClick={() => { setPhoto(null); setPhotoFile(null); }}
              className="absolute right-3 top-3 rounded-full bg-background/80 p-2 backdrop-blur"
            >
              <X className="h-4 w-4" />
            </button>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-cyber">
              <Upload className="h-7 w-7" />
            </div>
            <div>
              <p className="text-sm font-semibold">Drop your photo here</p>
              <p className="text-xs text-muted-foreground">or use the buttons below</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => fileRef.current?.click()}
                className="glass flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold"
              >
                <Upload className="h-3.5 w-3.5" /> Gallery
              </button>
              <button
                onClick={() => camRef.current?.click()}
                className="glass flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold"
              >
                <Camera className="h-3.5 w-3.5" /> Camera
              </button>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
            <input
              ref={camRef}
              type="file"
              accept="image/*"
              capture="user"
              hidden
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
          </div>
        )}
      </div>

      {/* Style picker */}
      <section>
        <h3 className="mb-3 text-sm font-bold">Choose your style</h3>
        <div className="grid grid-cols-3 gap-3">
          {styles.map((s) => (
            <button
              key={s.id}
              onClick={() => setStyle(s.id)}
              className={`relative overflow-hidden rounded-2xl transition ${
                style === s.id ? "ring-2 ring-neon-pink shadow-glow-pink" : ""
              }`}
            >
              <img
                src={s.img}
                alt={s.name}
                loading="lazy"
                width={512}
                height={640}
                className="aspect-[3/4] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent" />
              <p className="absolute inset-x-0 bottom-2 text-center text-[11px] font-semibold">
                {s.name}
              </p>
              {style === s.id && (
                <div className="absolute right-1.5 top-1.5 rounded-full bg-gradient-cyber p-1">
                  <Sparkles className="h-3 w-3" />
                </div>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Prompt enhance */}
      <section>
        <label className="mb-2 flex items-center gap-2 text-sm font-bold">
          <Wand2 className="h-4 w-4 text-neon-cyan" /> AI Prompt Enhance
          <span className="rounded-full bg-neon-purple/20 px-2 py-0.5 text-[10px] text-neon-pink">optional</span>
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. neon cyberpunk city, glowing eyes, rain..."
          rows={2}
          className="glass w-full resize-none rounded-2xl px-4 py-3 text-sm outline-none placeholder:text-muted-foreground"
        />
      </section>

      <button
        disabled={!photoFile}
        onClick={start}
        className="mb-2 flex items-center justify-center gap-2 rounded-2xl bg-gradient-cyber py-4 text-base font-bold shadow-neon transition disabled:opacity-40 disabled:shadow-none active:scale-[0.98]"
      >
        <Sparkles className="h-5 w-5" /> Generate Anime
      </button>
    </div>
  );
}
