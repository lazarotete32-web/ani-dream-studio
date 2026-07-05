import { createFileRoute } from "@tanstack/react-router";

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


export const Route = createFileRoute("/api/generate-anime")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        let body: { imageDataUrl?: string; style?: string; prompt?: string };
        try {
          body = await request.json();
        } catch {
          return new Response("Invalid JSON", { status: 400 });
        }
        const { imageDataUrl, style = "classic", prompt = "" } = body;
        if (!imageDataUrl || !imageDataUrl.startsWith("data:image/")) {
          return new Response("Missing image", { status: 400 });
        }

        const stylePrompt = STYLE_PROMPTS[style] ?? STYLE_PROMPTS.classic;
        const userText = `Transform the person in this photo into a high-quality anime character. Keep the same face, pose, hairstyle and identifying features clearly recognizable. Apply this style: ${stylePrompt}.${prompt ? ` Extra direction: ${prompt}.` : ""} Output a single full anime illustration of the person.`;

        const upstream = await fetch("https://ai.gateway.lovable.dev/v1/images/generations", {
          method: "POST",
          headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "google/gemini-3.1-flash-image",
            messages: [
              {
                role: "user",
                content: [
                  { type: "text", text: userText },
                  { type: "image_url", image_url: { url: imageDataUrl } },
                ],
              },
            ],
            modalities: ["image", "text"],
            stream: true,
          }),
        });

        if (!upstream.ok || !upstream.body) {
          const errText = await upstream.text().catch(() => "");
          return new Response(errText || "Upstream error", { status: upstream.status });
        }

        return new Response(upstream.body, {
          headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
          },
        });
      },
    },
  },
});
