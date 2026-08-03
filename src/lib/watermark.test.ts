import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { WATERMARK_TEXT, computeWatermarkLayout, watermarkImage } from "./watermark";

/** Records everything drawn so tests can assert the pill lands bottom-right. */
type Draw = { text: string; x: number; y: number };

function installFakeCanvas(width: number, height: number) {
  const draws: Draw[] = [];
  const rects: { x: number; y: number; w: number; h: number }[] = [];
  const blob = new Blob(["png"], { type: "image/png" });

  const ctx = {
    font: "",
    textBaseline: "",
    fillStyle: "" as unknown,
    strokeStyle: "",
    lineWidth: 0,
    shadowColor: "",
    shadowBlur: 0,
    drawImage: vi.fn(),
    measureText: (t: string) => ({ width: t.length * 10 }),
    save: vi.fn(),
    restore: vi.fn(),
    beginPath: vi.fn(),
    closePath: vi.fn(),
    moveTo: (x: number, y: number) => rects.push({ x, y, w: 0, h: 0 }),
    lineTo: vi.fn(),
    arcTo: vi.fn(),
    fill: vi.fn(),
    stroke: vi.fn(),
    createLinearGradient: () => ({ addColorStop: vi.fn() }),
    fillText: (text: string, x: number, y: number) => draws.push({ text, x, y }),
  };

  const origCreate = document.createElement.bind(document);
  vi.spyOn(document, "createElement").mockImplementation(((tag: string) => {
    const el = origCreate(tag) as HTMLElement;
    if (tag === "canvas") {
      const c = el as HTMLCanvasElement;
      c.width = width;
      c.height = height;
      Object.defineProperty(c, "getContext", { value: () => ctx, configurable: true });
      Object.defineProperty(c, "toBlob", {
        value: (cb: (b: Blob) => void) => cb(blob),
        configurable: true,
      });
    }
    return el;
  }) as typeof document.createElement);

  // Image loads instantly in tests.
  class FakeImage {
    naturalWidth = width;
    naturalHeight = height;
    crossOrigin = "";
    onload: (() => void) | null = null;
    onerror: (() => void) | null = null;
    set src(_v: string) {
      queueMicrotask(() => this.onload?.());
    }
  }
  vi.stubGlobal("Image", FakeImage);

  return { draws, ctx, blob };
}

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("watermark layout", () => {
  it("uses the AniGen badge text", () => {
    expect(WATERMARK_TEXT).toBe("✨ AniGen");
  });

  it.each([
    [1024, 1024],
    [512, 768],
    [1920, 1080],
    [300, 300],
    [4096, 2160],
  ])("anchors the pill to the bottom-right for %ix%i", (w, h) => {
    const layout = computeWatermarkLayout(w, h, 120);
    // Fully inside the canvas
    expect(layout.x).toBeGreaterThan(0);
    expect(layout.y).toBeGreaterThan(0);
    expect(layout.x + layout.boxW).toBeLessThan(w);
    expect(layout.y + layout.boxH).toBeLessThan(h);
    // In the bottom-right quadrant
    expect(layout.x + layout.boxW / 2).toBeGreaterThan(w / 2);
    expect(layout.y + layout.boxH / 2).toBeGreaterThan(h / 2);
    // Symmetric margin from the right and bottom edges
    expect(w - (layout.x + layout.boxW)).toBe(h - (layout.y + layout.boxH));
  });
});

describe("watermarkImage", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  it("bakes '✨ AniGen' into the bottom-right of the exported image", async () => {
    const { draws } = installFakeCanvas(1024, 1024);
    const blob = await watermarkImage("blob:fake");

    expect(blob).toBeInstanceOf(Blob);
    expect(draws).toHaveLength(1);
    expect(draws[0].text).toBe("✨ AniGen");
    expect(draws[0].x).toBeGreaterThan(1024 / 2);
    expect(draws[0].y).toBeGreaterThan(1024 / 2);
    expect(draws[0].x).toBeLessThan(1024);
    expect(draws[0].y).toBeLessThan(1024);
  });

  it("keeps the watermark bottom-right on non-square exports", async () => {
    const { draws } = installFakeCanvas(720, 1280);
    await watermarkImage("blob:fake");
    expect(draws[0].text).toBe(WATERMARK_TEXT);
    expect(draws[0].x).toBeGreaterThan(360);
    expect(draws[0].y).toBeGreaterThan(640);
  });

  it("never falls back to an unwatermarked source blob when a canvas exists", async () => {
    installFakeCanvas(800, 800);
    await watermarkImage("blob:fake");
    expect(fetch).not.toHaveBeenCalled();
  });
});
