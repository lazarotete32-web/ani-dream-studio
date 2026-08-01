function extractImage(obj: any): string | null {
  const choice = obj?.choices?.[0];
  const cands = [
    choice?.delta?.images?.[0]?.image_url?.url,
    choice?.message?.images?.[0]?.image_url?.url,
    obj?.data?.[0]?.b64_json && `data:image/png;base64,${obj.data[0].b64_json}`,
    obj?.b64_json && `data:image/png;base64,${obj.b64_json}`,
    obj?.image,
  ];
  for (const c of cands) if (typeof c === "string" && c.length > 0) return c;
  return null;
}

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

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let last: string | null = null;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;
      const payload = trimmed.slice(5).trim();
      if (!payload || payload === "[DONE]") continue;
      try {
        const parsed = JSON.parse(payload);
        const img = extractImage(parsed);
        if (img) {
          last = img;
          onFrame(img, false);
        }
      } catch {
        /* partial frame */
      }
    }
  }
  if (last) onFrame(last, true);
  return last;
}
