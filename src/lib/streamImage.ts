import { createParser } from "eventsource-parser";
import { flushSync } from "react-dom";

type ImageEventPayload =
  | { type: "image_generation.partial_image"; b64_json: string }
  | { type: "image_generation.completed"; b64_json: string }
  | { type: "error"; error?: { message?: string } };

export async function streamImage(
  endpoint: string,
  body: { prompt: string; image?: string },
  onFrame: (dataUrl: string, isFinal: boolean) => void,
): Promise<string | null> {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok || !res.body) {
    throw new Error((await res.text()) || "Generation failed");
  }

  const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
  let last: string | null = null;
  let sawCompleted = false;
  let streamError: string | null = null;

  const parser = createParser({
    onEvent(event) {
      let payload: ImageEventPayload | null = null;
      try {
        payload = JSON.parse(event.data) as ImageEventPayload;
      } catch {
        return;
      }

      if (event.event === "error" || payload.type === "error") {
        streamError = payload.type === "error"
          ? payload.error?.message ?? "Image generation failed"
          : "Image generation failed";
        return;
      }

      const isPartial =
        event.event === "image_generation.partial_image" ||
        payload.type === "image_generation.partial_image";
      const isFinal =
        event.event === "image_generation.completed" ||
        payload.type === "image_generation.completed";
      if ((!isPartial && !isFinal) || !("b64_json" in payload)) return;

      const dataUrl = `data:image/png;base64,${payload.b64_json}`;
      last = dataUrl;
      flushSync(() => onFrame(dataUrl, isFinal));
      if (isFinal) sawCompleted = true;
    },
  });

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      parser.feed(value);
    }
  } finally {
    void reader.cancel().catch(() => undefined);
  }

  if (streamError) throw new Error(streamError);
  if (!sawCompleted || !last) {
    throw new Error("Image generation ended before the final image was ready. Please try again.");
  }
  return last;
}
      }
    }
  }
  if (last) onFrame(last, true);
  return last;
}
