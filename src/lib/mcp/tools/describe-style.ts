import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const STYLE_PROMPTS: Record<string, string> = {
  classic: "classic anime style, cel-shaded, vibrant colors, expressive eyes, clean lineart",
  manga: "black and white manga style, detailed ink linework, screentones, dramatic shading",
  cyberpunk: "cyberpunk anime style, neon lights, futuristic city background, glowing accents, vivid pink and cyan",
  ghibli: "Studio Ghibli inspired anime style, soft watercolor backgrounds, gentle lighting, painterly",
  kawaii: "kawaii chibi anime style, pastel colors, cute, big sparkling eyes, soft shading",
  samurai: "feudal Japan samurai anime style, traditional clothing, ink wash background, cinematic lighting",
};

export default defineTool({
  name: "describe_anime_style",
  title: "Describe anime style",
  description: "Return the full generation prompt AniGen uses for a given style id (classic, manga, cyberpunk, ghibli, kawaii, samurai).",
  inputSchema: {
    style: z.enum(["classic", "manga", "cyberpunk", "ghibli", "kawaii", "samurai"]).describe("The style id."),
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
