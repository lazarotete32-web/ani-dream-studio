import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/generate-image")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: { prompt?: unknown; image?: unknown };
        try {
          body = (await request.json()) as { prompt?: unknown; image?: unknown };
        } catch {
          return new Response("Invalid request", { status: 400 });
        }
        const { prompt, image } = body;
        if (typeof prompt !== "string" || !prompt.trim() || prompt.length > 4_000) {
          return new Response("A valid prompt is required", { status: 400 });
        }
        if (typeof image !== "string" || !image.startsWith("data:image/")) {
          return new Response("A valid source image is required", { status: 400 });
        }
        if (image.length > 14_000_000) {
          return new Response("Image is too large. Choose an image under 10 MB.", { status: 413 });
        }
        const key = process.env["LOVABLE_API_KEY"];
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const content: unknown[] = [{ type: "text", text: prompt }];
        content.push({ type: "image_url", image_url: { url: image } });

        const upstream = await fetch(
          "https://ai.gateway.lovable.dev/v1/images/generations",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${key}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "google/gemini-3-pro-image",
              messages: [{ role: "user", content }],
              modalities: ["image", "text"],
              stream: true,
            }),
          },
        );
        if (!upstream.ok || !upstream.body) {
          return new Response(await upstream.text(), { status: upstream.status });
        }
        return new Response(upstream.body, {
          headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
          },
        });
      },
    },
  },
});
