type RenderOptions = {
  styleId: string;
  category?: string;
};

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Could not process this photo."));
    image.src = src;
  });
}

function styleSeed(value: string): number {
  return [...value].reduce((total, char) => (total * 31 + char.charCodeAt(0)) >>> 0, 17);
}

/**
 * Produces a lightweight, deterministic cartoon render in the browser when
 * the remote image service is temporarily unavailable.
 */
export async function renderLocalCartoon(
  source: string,
  { styleId, category }: RenderOptions,
): Promise<string> {
  const image = await loadImage(source);
  const longestSide = Math.max(image.naturalWidth, image.naturalHeight);
  const scale = Math.min(1, 1200 / Math.max(1, longestSide));
  const width = Math.max(1, Math.round(image.naturalWidth * scale));
  const height = Math.max(1, Math.round(image.naturalHeight * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) throw new Error("This browser cannot process images.");

  const seed = styleSeed(styleId);
  const hue = seed % 360;
  const isMonochrome = styleId.includes("manga") || styleId.includes("noir");
  const isSimpsons = category === "Simpsons";
  const saturation = isMonochrome ? 0 : 1.25 + (seed % 25) / 100;
  const contrast = 1.2 + (seed % 18) / 100;

  context.filter = `saturate(${saturation}) contrast(${contrast}) brightness(1.04)`;
  context.drawImage(image, 0, 0, width, height);
  context.filter = "none";

  const frame = context.getImageData(0, 0, width, height);
  const pixels = frame.data;
  const levels = isMonochrome ? 4 : 6 + (seed % 3);
  const step = 255 / Math.max(1, levels - 1);

  for (let index = 0; index < pixels.length; index += 4) {
    let red = pixels[index];
    let green = pixels[index + 1];
    let blue = pixels[index + 2];
    const luminance = red * 0.299 + green * 0.587 + blue * 0.114;

    if (isMonochrome) {
      red = luminance;
      green = luminance;
      blue = luminance;
    } else if (isSimpsons && red > green * 1.04 && red > blue * 1.18) {
      red = Math.min(255, red * 1.2 + 20);
      green = Math.min(240, green * 1.18 + 24);
      blue *= 0.55;
    }

    pixels[index] = Math.round(red / step) * step;
    pixels[index + 1] = Math.round(green / step) * step;
    pixels[index + 2] = Math.round(blue / step) * step;
  }

  context.putImageData(frame, 0, 0);
  context.globalCompositeOperation = "soft-light";
  context.fillStyle = `hsl(${hue} 72% 52% / 0.18)`;
  context.fillRect(0, 0, width, height);
  context.globalCompositeOperation = "source-over";

  const vignette = context.createRadialGradient(
    width / 2,
    height / 2,
    Math.min(width, height) * 0.2,
    width / 2,
    height / 2,
    Math.max(width, height) * 0.72,
  );
  vignette.addColorStop(0, "rgb(0 0 0 / 0)");
  vignette.addColorStop(1, "rgb(0 0 0 / 0.28)");
  context.fillStyle = vignette;
  context.fillRect(0, 0, width, height);

  return canvas.toDataURL("image/jpeg", 0.92);
}