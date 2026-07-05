import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const STYLE_PROMPTS: Record<string, string> = {
  classic: "classic anime style, cel-shaded, vibrant colors, expressive eyes, clean lineart",
  manga: "black and white manga style, detailed ink linework, screentones, dramatic shading",
  cyberpunk: "cyberpunk anime style, neon lights, futuristic city background, glowing accents, vivid pink and cyan",
  ghibli: "Studio Ghibli inspired anime style, soft watercolor backgrounds, gentle lighting, painterly",
  kawaii: "kawaii chibi anime style, pastel colors, cute, big sparkling eyes, soft shading",
  samurai: "feudal Japan samurai anime style, traditional clothing, ink wash background, cinematic lighting",
  disney: "Disney 3D animated feature film style, expressive large eyes, smooth shading, cinematic lighting, warm palette",
  pixar: "Pixar 3D animation style, soft rounded features, plush textures, warm lighting, cheerful expression, high detail render",
  simpsons: "The Simpsons cartoon style, yellow skin, thick black outlines, flat colors, Matt Groening aesthetic, overbite",
  comic: "American comic book style, bold ink outlines, halftone dots, dynamic shading, vivid primary colors, superhero aesthetic",
  pixel: "16-bit pixel art character portrait, limited retro palette, crisp pixels, JRPG sprite aesthetic",
  watercolor: "watercolor illustration, soft paint washes, textured paper, dreamy pastel colors, hand painted look",
  chibi: "chibi cartoon, oversized head tiny body, super cute, pastel palette, sparkling eyes, sticker style",
  retro90s: "retro 90s Saturday morning cartoon style, bold black outlines, saturated colors, playful expressions, slight VHS grain",
  gothic: "gothic dark fantasy anime style, moody purple lighting, intricate lace details, pale skin, dramatic shadows, Tim Burton influence",
};

export default defineTool({
  name: "describe_anime_style",
  title: "Describe anime style",
  description: "Return the full generation prompt AniGen uses for a given style id.",
  inputSchema: {
    style: z
      .enum([
        "classic", "manga", "cyberpunk", "ghibli", "kawaii", "samurai",
        "disney", "pixar", "simpsons", "comic", "pixel", "watercolor",
        "chibi", "retro90s", "gothic",
      ])
      .describe("The style id."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ style }) => {
    const prompt = STYLE_PROMPTS[style];
    return {
      content: [{ type: "text", text: prompt }],
      structuredContent: { style, prompt },
    };
  },
});
