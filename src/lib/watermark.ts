/** The watermark shown on the result preview and baked into every free export. */
export const WATERMARK_TEXT = "✨ AniGen";

export type WatermarkLayout = {
  x: number;
  y: number;
  boxW: number;
  boxH: number;
  fontSize: number;
  padX: number;
  scale: number;
};

/** Geometry of the watermark pill: always anchored to the bottom-right corner. */
export function computeWatermarkLayout(
  width: number,
  height: number,
  textWidth: number,
): WatermarkLayout {
  const scale = Math.max(width, height) / 1024;
  const fontSize = Math.max(14, Math.round(26 * scale));
  const padX = Math.round(fontSize * 0.75);
  const padY = Math.round(fontSize * 0.5);
  const margin = Math.round(fontSize * 0.9);
  const boxW = textWidth + padX * 2;
  const boxH = fontSize + padY * 2;
  return { x: width - boxW - margin, y: height - boxH - margin, boxW, boxH, fontSize, padX, scale };
}

/**
 * Bakes the AniGen watermark (bottom-right pill, same badge shown on the
 * result preview) into an image and returns it as a PNG blob.
 */
export async function watermarkImage(src: string): Promise<Blob> {
  const img = await loadImage(src);

  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth || img.width;
  canvas.height = img.naturalHeight || img.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return await (await fetch(src)).blob();

  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  const text = WATERMARK_TEXT;
  const probe = computeWatermarkLayout(canvas.width, canvas.height, 0);

  ctx.font = `700 ${probe.fontSize}px "Space Grotesk", Inter, system-ui, sans-serif`;
  ctx.textBaseline = "middle";
  const textWidth = ctx.measureText(text).width;
  const { x, y, boxW, boxH, fontSize, padX, scale } = computeWatermarkLayout(
    canvas.width,
    canvas.height,
    textWidth,
  );
  void fontSize;
  const r = boxH / 2;


  ctx.save();
  ctx.beginPath();
  roundRect(ctx, x, y, boxW, boxH, r);
  ctx.fillStyle = "rgba(12, 6, 24, 0.55)";
  ctx.fill();
  ctx.lineWidth = Math.max(1, scale);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
  ctx.stroke();

  const grad = ctx.createLinearGradient(x, y, x + boxW, y + boxH);
  grad.addColorStop(0, "#ff4ecd");
  grad.addColorStop(0.5, "#a855f7");
  grad.addColorStop(1, "#22d3ee");
  ctx.fillStyle = grad;
  ctx.shadowColor = "rgba(0,0,0,0.5)";
  ctx.shadowBlur = 4 * scale;
  ctx.fillText(text, x + padX, y + boxH / 2 + 1);
  ctx.restore();

  return await new Promise<Blob>((resolve) =>
    canvas.toBlob((b) => resolve(b ?? new Blob()), "image/png", 0.98),
  );
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
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
