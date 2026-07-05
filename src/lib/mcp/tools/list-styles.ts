import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const STYLES = [
  { id: "classic", label: "Classic", description: "Cel-shaded, vibrant colors, expressive eyes, clean lineart." },
  { id: "manga", label: "Manga", description: "Black-and-white manga with detailed ink linework and screentones." },
  { id: "cyberpunk", label: "Cyberpunk", description: "Neon lights, futuristic city, glowing pink and cyan accents." },
  { id: "ghibli", label: "Ghibli", description: "Studio Ghibli inspired: soft watercolor, gentle painterly lighting." },
  { id: "kawaii", label: "Kawaii", description: "Chibi, pastel palette, big sparkling eyes, super cute." },
  { id: "samurai", label: "Samurai", description: "Feudal Japan samurai, traditional dress, ink-wash cinematic look." },
  { id: "disney", label: "Disney", description: "Disney 3D feature film look, expressive eyes, cinematic warm lighting." },
  { id: "pixar", label: "Pixar 3D", description: "Pixar 3D animation, plush textures, soft rounded features." },
  { id: "simpsons", label: "Simpsons", description: "Yellow-skin Simpsons cartoon, thick outlines, flat colors." },
  { id: "comic", label: "Comic Book", description: "American comic book: bold ink, halftone dots, vivid primaries." },
  { id: "pixel", label: "Pixel Art", description: "16-bit retro pixel-art sprite portrait." },
  { id: "watercolor", label: "Watercolor", description: "Watercolor illustration with soft paint washes and pastel colors." },
  { id: "chibi", label: "Chibi", description: "Chibi caricature: huge head, tiny body, sticker-cute." },
  { id: "retro90s", label: "Retro 90s", description: "Retro 90s Saturday morning cartoon, bold outlines, VHS grain." },
  { id: "gothic", label: "Gothic", description: "Gothic dark fantasy: moody purples, lace, Tim Burton influence." },
];

export default defineTool({
  name: "list_anime_styles",
  title: "List anime styles",
  description: "List every cartoon and anime art style AniGen can transform a photo into (15 total), with id, label and short description.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(STYLES, null, 2) }],
    structuredContent: { styles: STYLES },
  }),
});
