import { toast } from "sonner";

const SHARE_TEXT =
  "I just turned my photo into anime with AniGen ✨ Try it: ";
const SHARE_URL =
  typeof window !== "undefined" ? window.location.origin : "https://ani-dream-studio.lovable.app";

async function dataUrlToFile(dataUrl: string, filename = "anigen.png"): Promise<File> {
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  return new File([blob], filename, { type: blob.type || "image/png" });
}

function downloadFile(file: File) {
  const url = URL.createObjectURL(file);
  const a = document.createElement("a");
  a.href = url;
  a.download = file.name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function copyText(text: string) {
  try { await navigator.clipboard.writeText(text); } catch {}
}

/** Try the native system share sheet with the file. Returns true on success. */
async function nativeShareFile(file: File, text: string): Promise<boolean> {
  const nav = navigator as Navigator & {
    canShare?: (data: ShareData) => boolean;
    share?: (data: ShareData) => Promise<void>;
  };
  if (!nav.share) return false;
  const data: ShareData = { files: [file], text, title: "AniGen", url: SHARE_URL };
  try {
    if (nav.canShare && !nav.canShare(data)) {
      // retry without files (some browsers block file share)
      await nav.share({ text: `${text} ${SHARE_URL}`, title: "AniGen" });
      return true;
    }
    await nav.share(data);
    return true;
  } catch (e: any) {
    if (e?.name === "AbortError") return true; // user cancelled — treat as handled
    return false;
  }
}

/** Generic share — opens the OS share sheet (TikTok/Instagram/WhatsApp/etc.) */
export async function shareGeneric(dataUrl: string) {
  const file = await dataUrlToFile(dataUrl);
  const ok = await nativeShareFile(file, SHARE_TEXT);
  if (!ok) {
    downloadFile(file);
    toast.success("Image saved — share it from your gallery");
  }
}

export async function shareWhatsApp(dataUrl: string) {
  const file = await dataUrlToFile(dataUrl);
  // Prefer native share on mobile so the image attaches directly inside WhatsApp.
  const ok = await nativeShareFile(file, SHARE_TEXT);
  if (ok) return;
  downloadFile(file);
  const msg = encodeURIComponent(`${SHARE_TEXT}${SHARE_URL}`);
  window.open(`https://wa.me/?text=${msg}`, "_blank", "noopener");
  toast.success("Image saved — attach it in WhatsApp");
}

export async function shareFacebook(dataUrl: string) {
  const file = await dataUrlToFile(dataUrl);
  const ok = await nativeShareFile(file, SHARE_TEXT);
  if (ok) return;
  // Facebook web sharer cannot accept a file — open the link sharer and save image.
  downloadFile(file);
  const url = encodeURIComponent(SHARE_URL);
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodeURIComponent(SHARE_TEXT)}`,
    "_blank",
    "noopener,width=600,height=600",
  );
  toast.success("Image saved — upload it to your Facebook post");
}

export async function shareInstagram(dataUrl: string) {
  const file = await dataUrlToFile(dataUrl);
  // Instagram has no web share URL — native sheet on mobile lists Instagram if installed.
  const ok = await nativeShareFile(file, SHARE_TEXT);
  if (ok) return;
  downloadFile(file);
  await copyText(`${SHARE_TEXT}${SHARE_URL}`);
  // Best-effort deep link (mobile only). Silently no-ops on desktop.
  setTimeout(() => { window.location.href = "instagram://library?LocalIdentifier="; }, 400);
  toast.success("Image saved + caption copied — paste in Instagram");
}

export async function shareTikTok(dataUrl: string) {
  const file = await dataUrlToFile(dataUrl);
  const ok = await nativeShareFile(file, SHARE_TEXT);
  if (ok) return;
  downloadFile(file);
  await copyText(`${SHARE_TEXT}${SHARE_URL}`);
  setTimeout(() => { window.location.href = "snssdk1233://"; }, 400);
  toast.success("Image saved + caption copied — open TikTok to post");
}
