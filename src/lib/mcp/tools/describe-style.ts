import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const STYLE_PROMPTS: Record<string, string> = {
  classic: "classic anime style, cel-shaded, vibrant colors, expressive eyes, clean lineart",
  manga: "black and white manga style, detailed ink linework, screentones, dramatic shading",
  cyberpunk: "cyberpunk anime style, neon lights, futuristic city background, glowing accents, vivid pink and cyan",
  ghibli: "soft painterly anime style inspired by classic Japanese hand-drawn animation, watercolor backgrounds, gentle warm lighting",
  kawaii: "kawaii chibi anime style, pastel colors, cute, big sparkling eyes, soft shading",
  samurai: "feudal Japan samurai anime style, traditional clothing, ink wash background, cinematic lighting",
  disney: "polished 3D animated feature film style, expressive large eyes, smooth shading, cinematic warm lighting",
  pixar: "high-end 3D animation style, soft rounded features, plush textures, warm cinematic lighting",
  simpsons: "flat 2D cartoon character with bright yellow skin, thick black outlines, huge round white eyes, prominent overbite, four-fingered hands, 1990s American animated sitcom aesthetic",
  comic: "American comic book style, bold ink outlines, halftone dots, dynamic shading, vivid primary colors",
  pixel: "16-bit pixel art character portrait, limited retro palette, crisp pixels, JRPG sprite aesthetic",
  watercolor: "watercolor illustration, soft paint washes, textured paper, dreamy pastel colors",
  chibi: "chibi cartoon, oversized head tiny body, super cute, pastel palette, sparkling eyes",
  retro90s: "retro 90s Saturday morning cartoon style, bold black outlines, saturated colors, slight VHS grain",
  gothic: "gothic dark fantasy anime style, moody purple lighting, pale skin, dramatic shadows",
  lego: "LEGO minifigure style, plastic brick aesthetic, cylindrical yellow head, blocky torso",
  claymation: "claymation stop-motion style, visible clay texture and fingerprints, handcrafted",
  papercraft: "paper cutout collage style, layered construction paper, torn edges",
  mecha: "mecha anime style, robotic armor, glowing energy lights, hangar background",
  shonen: "shonen action anime, spiky dynamic hair, intense eyes, energy aura, motion lines",
  shojo: "shojo romance anime, sparkles and flowers, huge shimmering eyes, soft pastels",
  vaporwave: "vaporwave aesthetic, pink and cyan gradient, retro grid, Greek statue vibe, glitch",
  lowpoly: "low poly 3D geometric portrait, faceted flat-shaded triangles, minimal palette",
  sketch: "detailed pencil sketch portrait, graphite hatching, black and white",
  oil: "classical oil painting portrait, renaissance chiaroscuro, visible brush strokes",
  ukiyoe: "ukiyo-e Japanese woodblock print, flat colors, bold outlines, traditional kimono",
  popart: "pop art style, halftone Ben-Day dots, bold primary colors, silkscreen print",
  graffiti: "urban graffiti street art, spray paint on brick wall, drips, wildstyle tags",
  noir: "1940s film noir, black and white, high contrast, venetian blind shadows",
  steampunk: "steampunk portrait, brass goggles, gears, leather, Victorian industrial, sepia",
  fantasy: "high fantasy digital painting portrait, armored hero, magical glowing elements",
  stopmotion: "stop-motion puppet character, felt and wool textures, handcrafted doll",
  felt: "handmade felt doll character, fuzzy wool, embroidered features",
  plush: "cute plush stuffed toy character, soft fabric, button eyes, fluffy stitches",
  origami: "origami folded paper character, geometric colorful folds, sharp creases",
  sticker: "die-cut vinyl sticker style, thick white outline, bold flat colors, glossy",
  tattoo: "traditional American old-school tattoo flash, bold outlines, limited palette, roses",
  mosaic: "mosaic art portrait of small colorful ceramic tiles with grout lines",
  stainedglass: "stained glass window portrait, black lead lines, glowing colored panels",
  storybook: "children's storybook illustration, whimsical watercolor, cozy scene",
  artdeco: "1920s art deco portrait, geometric gold patterns, Gatsby-era glamour",
  minimalist: "minimalist single continuous line portrait drawing on white background",
  holographic: "iridescent holographic chrome portrait, rainbow foil, futuristic glossy",
  superflat: "superflat Japanese pop art, flat vivid colors, smiling flowers",
  crayon: "child's crayon drawing style portrait, waxy colorful strokes on white paper",
};

const STYLE_IDS = Object.keys(STYLE_PROMPTS) as [string, ...string[]];

export default defineTool({
  name: "describe_anime_style",
  title: "Describe anime style",
  description: "Return the full generation prompt AniGen uses for a given style id.",
  inputSchema: {
    style: z.enum(STYLE_IDS as [string, ...string[]]).describe("The style id."),
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
