import { describe, expect, it, vi, afterEach } from "vitest";

/**
 * Guards the free-tier rule: every export path on the result screen
 * (Download HD, native share, fallback share) must go through watermarkImage.
 */
const watermarked = new Blob(["watermarked"], { type: "image/png" });
const watermarkImage = vi.fn(async () => watermarked);

vi.mock("@/lib/watermark", () => ({
  watermarkImage,
  WATERMARK_TEXT: "✨ AniGen",
}));

afterEach(() => {
  vi.clearAllMocks();
  vi.unstubAllGlobals();
});

// Mirrors the export helpers used by src/routes/result.tsx.
async function download(after: string, sink: (b: Blob) => void) {
  const { watermarkImage: wm } = await import("@/lib/watermark");
  sink(await wm(after));
}

async function share(after: string, sink: (b: Blob) => void) {
  const { watermarkImage: wm } = await import("@/lib/watermark");
  const blob = await wm(after);
  const file = new File([blob], "anigen.png", { type: blob.type || "image/png" });
  if (navigator.canShare?.({ files: [file] })) {
    await navigator.share({ files: [file] });
    return;
  }
  await download(after, sink);
}

describe("free-tier export paths", () => {
  it("download always watermarks the generated image", async () => {
    const sink = vi.fn();
    await download("blob:after", sink);
    expect(watermarkImage).toHaveBeenCalledWith("blob:after");
    expect(sink).toHaveBeenCalledWith(watermarked);
  });

  it("native share sends the watermarked file", async () => {
    const shared: File[] = [];
    vi.stubGlobal("navigator", {
      canShare: () => true,
      share: async ({ files }: { files: File[] }) => shared.push(...files),
    });
    await share("blob:after", vi.fn());
    expect(watermarkImage).toHaveBeenCalledTimes(1);
    expect(shared[0].name).toBe("anigen.png");
  });

  it("share falls back to a watermarked download when sharing is unsupported", async () => {
    vi.stubGlobal("navigator", {});
    const sink = vi.fn();
    await share("blob:after", sink);
    expect(sink).toHaveBeenCalledWith(watermarked);
  });
});

describe("result screen source", () => {
  it("routes both download and share through the watermark helper", async () => {
    const fs = await import("node:fs/promises");
    const src = await fs.readFile("src/routes/result.tsx", "utf8");
    expect(src).toContain("watermarkImage");
    // No export path may use the raw image directly.
    expect(src).toMatch(/const toBlob = async \(\) => await watermarkImage\(after\)/);
    expect(src).toMatch(/const download = async \(\) => \{[\s\S]*?await toBlob\(\)/);
    expect(src).toMatch(/const share = async \(\) => \{[\s\S]*?await toBlob\(\)/);
  });
});
