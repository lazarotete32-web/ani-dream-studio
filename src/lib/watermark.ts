/**
 * Adds an "AniGen ✨" watermark to a data URL / image URL and returns a new PNG data URL.
 * Falls back to the original src if canvas is unavailable (SSR / errors).
 */
export async function watermarkImage(src: string, label = "AniGen ✨"): Promise<string> {
  if (typeof document === "undefined") return src;
  try {
    const img = await loadImage(src);
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth || img.width;
    canvas.height = img.naturalHeight || img.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return src;
    ctx.drawImage(img, 0, 0);

    const pad = Math.round(Math.min(canvas.width, canvas.height) * 0.025);
    const fontSize = Math.max(18, Math.round(Math.min(canvas.width, canvas.height) * 0.038));
    ctx.font = `700 ${fontSize}px system-ui, -apple-system, "Segoe UI", sans-serif`;
    ctx.textBaseline = "bottom";
    ctx.textAlign = "right";

    const text = label;
    const metrics = ctx.measureText(text);
    const textW = metrics.width;
    const boxH = fontSize * 1.4;
    const boxW = textW + fontSize * 1.2;
    const x = canvas.width - pad;
    const y = canvas.height - pad;

    // translucent pill background
    ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
    roundRect(ctx, x - boxW, y - boxH, boxW, boxH, boxH / 2);
    ctx.fill();

    // neon-ish gradient text
    const grad = ctx.createLinearGradient(x - boxW, y - boxH, x, y);
    grad.addColorStop(0, "#22d3ee");
    grad.addColorStop(1, "#f472b6");
    ctx.fillStyle = grad;
    ctx.shadowColor = "rgba(0,0,0,0.6)";
    ctx.shadowBlur = 4;
    ctx.fillText(text, x - fontSize * 0.6, y - fontSize * 0.2);

    return canvas.toDataURL("image/png");
  } catch {
    return src;
  }
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}
