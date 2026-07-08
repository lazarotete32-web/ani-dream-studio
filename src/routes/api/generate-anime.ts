import { createFileRoute } from "@tanstack/react-router";

const STYLE_PROMPTS: Record<string, string> = {
  classic: "classic anime style, cel-shaded, vibrant colors, expressive eyes, clean lineart",
  manga: "black and white manga style, detailed ink linework, screentones, dramatic shading",
  cyberpunk: "cyberpunk anime style, neon lights, futuristic city background, glowing accents, vivid pink and cyan",
  ghibli: "soft painterly anime style inspired by classic Japanese hand-drawn animation, watercolor backgrounds, gentle warm lighting",
  kawaii: "kawaii chibi anime style, pastel colors, cute, big sparkling eyes, soft shading",
  samurai: "feudal Japan samurai anime style, traditional clothing, ink wash background, cinematic lighting",
  disney: "polished 3D animated feature film style, expressive large eyes, smooth shading, cinematic warm lighting, family movie aesthetic",
  pixar: "high-end 3D animation style, soft rounded features, plush textures, warm cinematic lighting, cheerful expression, high detail render",
  // NOTE: brand names blocked by moderation. Fully descriptive prompt.
  simpsons: "flat 2D cartoon character with bright yellow skin, thick black outlines, huge round white eyes with small black pupils, prominent overbite, four-fingered hands, simple bold shapes, 1990s American animated sitcom aesthetic, no shading",
  comic: "American comic book style, bold ink outlines, halftone dots, dynamic shading, vivid primary colors, superhero aesthetic",
  pixel: "16-bit pixel art character portrait, limited retro palette, crisp pixels, JRPG sprite aesthetic",
  watercolor: "watercolor illustration, soft paint washes, textured paper, dreamy pastel colors, hand painted look",
  chibi: "chibi cartoon, oversized head tiny body, super cute, pastel palette, sparkling eyes, sticker style",
  retro90s: "retro 90s Saturday morning cartoon style, bold black outlines, saturated colors, playful expressions, slight VHS grain",
  gothic: "gothic dark fantasy anime style, moody purple lighting, intricate lace details, pale skin, dramatic shadows, Tim Burton influence",
  lego: "LEGO minifigure style, plastic brick aesthetic, cylindrical yellow head, blocky torso, studio product photography",
  claymation: "claymation stop-motion style, visible clay texture and fingerprints, slightly imperfect, warm handcrafted feel",
  papercraft: "paper cutout collage style, layered construction paper, torn edges, handmade craft aesthetic",
  mecha: "mecha anime style, character wearing detailed robotic armor, glowing energy lights, hangar background, cinematic",
  shonen: "shonen action anime style, spiky dynamic hair, intense eyes, energy aura, motion lines, saturated colors",
  shojo: "shojo romance anime style, sparkles and flowers, huge shimmering eyes, soft pastel palette, delicate linework",
  vaporwave: "vaporwave aesthetic, pink and cyan gradient, retro CRT grid, Greek statue vibe, glitch, 80s synthwave",
  lowpoly: "low poly 3D geometric portrait, faceted flat-shaded triangles, minimal color palette, clean render",
  sketch: "detailed pencil sketch portrait, graphite hatching and cross-hatching on textured paper, black and white",
  oil: "classical oil painting portrait, renaissance chiaroscuro lighting, visible brush strokes, rich dark background",
  ukiyoe: "ukiyo-e Japanese woodblock print style, flat colors, bold black outlines, traditional kimono, aged paper texture",
  popart: "pop art style portrait, halftone Ben-Day dots, bold primary colors, silkscreen print aesthetic, Warhol/Lichtenstein influence",
  graffiti: "urban graffiti street art style, spray paint on brick wall, drips, bold outlines, wildstyle tags in background",
  noir: "1940s film noir portrait, black and white, high contrast, venetian blind shadow across face, cinematic detective vibe",
  steampunk: "steampunk style portrait, brass goggles, gears, leather, Victorian industrial aesthetic, sepia tones",
  fantasy: "high fantasy digital painting portrait, armored hero, magical glowing elements, epic mountain landscape",
  stopmotion: "stop-motion puppet character, felt and wool textures, handcrafted doll, warm cinematic lighting",
  felt: "handmade felt doll character, soft fuzzy wool textures, embroidered features, cozy craft aesthetic",
  plush: "cute plush stuffed toy character, soft fabric, button eyes, fluffy stitched details, product shot",
  origami: "origami folded paper character, geometric colorful paper folds, sharp creases, minimalist background",
  sticker: "die-cut vinyl sticker style character, thick white outline, bold flat colors, glossy finish",
  tattoo: "traditional American old-school tattoo flash style, bold black outlines, limited palette, roses and banners",
  mosaic: "mosaic art style portrait made of small colorful ceramic tiles with visible grout lines, byzantine influence",
  stainedglass: "stained glass window portrait, thick black lead lines separating glowing colored glass panels, cathedral vibe",
  storybook: "children's storybook illustration, whimsical watercolor, warm cozy scene, soft rounded features",
  artdeco: "1920s art deco portrait, geometric gold patterns, elegant symmetry, Gatsby-era glamour, black and gold palette",
  minimalist: "minimalist single continuous line portrait drawing on white background, elegant simplicity, no shading",
  holographic: "iridescent holographic chrome portrait, rainbow foil reflections, futuristic glossy metallic surface",
  superflat: "superflat Japanese pop art style, flat vivid colors, cute smiling flowers, playful surreal composition",
  crayon: "child's crayon drawing style portrait, waxy colorful strokes on white paper, wobbly cheerful lines",
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
        const userText = `Transform the person in this photo into a high-quality stylized character. Keep the same face, pose, hairstyle and identifying features clearly recognizable. Apply this style: ${stylePrompt}.${prompt ? ` Extra direction: ${prompt}.` : ""} Output a single full illustration of the person in this style.`;

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
          let friendly = errText || "Upstream error";
          if (upstream.status === 402) {
            friendly = "AI credits esgotados. Adicione créditos em Cloud → AI para continuar gerando cartoons.";
          } else if (upstream.status === 429) {
            friendly = "Muitas requisições. Aguarde alguns segundos e tente novamente.";
          } else if (upstream.status === 401 || upstream.status === 403) {
            friendly = "Chave da IA inválida ou sem permissão.";
          }
          return new Response(friendly, { status: upstream.status });
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
