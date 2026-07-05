import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const STYLES = [
  { id: "classic", label: "Classic", description: "Cel-shaded, vibrant colors, expressive eyes, clean lineart." },
  { id: "manga", label: "Manga", description: "Black-and-white manga with detailed ink linework and screentones." },
  { id: "cyberpunk", label: "Cyberpunk", description: "Neon lights, futuristic city, glowing pink and cyan accents." },
  { id: "ghibli", label: "Ghibli", description: "Studio Ghibli inspired: soft watercolor, gentle painterly lighting." },
  { id: "kawaii", label: "Kawaii", description: "Chibi, pastel palette, big sparkling eyes, super cute." },
  { id: "samurai", label: "Samurai", description: "Feudal Japan samurai, traditional dress, ink-wash cinematic look." },
];

export default defineTool({
  name: "list_anime_styles",
  title: "List anime styles",
  description: "List every anime art style AniGen can transform a photo into, with id, label and short description.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(STYLES, null, 2) }],
    structuredContent: { styles: STYLES },
  }),
});
