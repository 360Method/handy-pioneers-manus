/**
 * uploadAttachment — sends a consultation photo or document to the HP Estimator
 * backend and returns its stored CDN URL.
 *
 * Used by ProjectInquiryForm so homeowners can attach photos/documents to their
 * consultation request. Each file is uploaded on its own request (clean progress,
 * resilient to one bad file); the collected URLs are passed as `photoUrls` on the
 * inquiry submit. Photos are downscaled in the browser first so large phone
 * pictures upload reliably; documents (PDF, etc.) are sent as-is.
 */
import { getApiBase } from "./api";

export interface UploadedAttachment {
  url: string;
  name: string;
  type: string;
}

// Keep each upload under the server's 15 MB cap (and the 25 MB JSON body limit
// once base64-encoded). Photos are compressed below this; documents must already
// be under it.
const MAX_FILE_BYTES = 15 * 1024 * 1024;
const MAX_IMAGE_DIMENSION = 2400; // px — plenty of detail for inspection photos
const IMAGE_QUALITY = 0.82;

function readAsBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result ?? "");
      // result is a data URL: data:<mime>;base64,<data> — keep just the data.
      resolve(result.includes(",") ? result.split(",")[1] : result);
    };
    reader.onerror = () => reject(new Error("Could not read the file."));
    reader.readAsDataURL(blob);
  });
}

/**
 * Downscale a large image in the browser. Returns the original file if the image
 * can't be decoded (e.g. some HEIC files) or compression wouldn't help.
 */
async function compressImage(file: File): Promise<{ blob: Blob; mimeType: string }> {
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_IMAGE_DIMENSION / Math.max(bitmap.width, bitmap.height));
    const targetW = Math.round(bitmap.width * scale);
    const targetH = Math.round(bitmap.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("no 2d context");
    ctx.drawImage(bitmap, 0, 0, targetW, targetH);
    bitmap.close?.();

    const blob: Blob | null = await new Promise((resolve) =>
      canvas.toBlob((b) => resolve(b), "image/jpeg", IMAGE_QUALITY)
    );
    if (!blob) throw new Error("toBlob failed");

    // Only use the compressed version if it actually came out smaller.
    if (blob.size < file.size) return { blob, mimeType: "image/jpeg" };
    return { blob: file, mimeType: file.type };
  } catch {
    return { blob: file, mimeType: file.type };
  }
}

/**
 * Upload a single file. Throws with a friendly message on failure so the caller
 * can surface it per-file.
 */
export async function uploadInquiryFile(file: File): Promise<UploadedAttachment> {
  const isImage = file.type.startsWith("image/");
  const { blob, mimeType } = isImage
    ? await compressImage(file)
    : { blob: file as Blob, mimeType: file.type };

  if (blob.size > MAX_FILE_BYTES) {
    throw new Error(`"${file.name}" is too large. Please keep each file under 15 MB.`);
  }

  const base64 = await readAsBase64(blob);

  const res = await fetch(`${getApiBase()}/api/public/upload`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filename: file.name, mimeType, base64 }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.error ?? `Could not upload "${file.name}". Please try again.`);
  }

  const data = await res.json();
  return { url: data.url as string, name: file.name, type: file.type };
}
