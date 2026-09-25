/**
 * PhotoLightbox - full-screen photo viewer with previous/next, a caption, and
 * a counter. Same look as the homepage gallery lightbox (Gallery.tsx).
 * Closes on the X, a click outside the photo, or Escape; arrow keys page.
 */

import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface LightboxPhoto {
  src: string;
  alt: string;
  caption?: string;
}

interface Props {
  photos: LightboxPhoto[];
  index: number | null;
  onChange: (index: number | null) => void;
}

export default function PhotoLightbox({ photos, index, onChange }: Props) {
  const open = index !== null && photos.length > 0;

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      else if (e.key === "ArrowLeft") onChange(((index ?? 0) - 1 + photos.length) % photos.length);
      else if (e.key === "ArrowRight") onChange(((index ?? 0) + 1) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, index, photos.length, onChange]);

  if (!open) return null;
  const photo = photos[index!];
  const many = photos.length > 1;
  const step = (delta: number) => (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(((index ?? 0) + delta + photos.length) % photos.length);
  };
  const btn = "absolute z-20 w-10 h-10 rounded-full flex items-center justify-center";
  const btnStyle = { backgroundColor: "oklch(0.25 0.02 80)", color: "oklch(0.96 0.01 80)" };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "oklch(0 0 0 / 0.92)" }}
      onClick={() => onChange(null)}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
    >
      <button onClick={() => onChange(null)} className={`${btn} top-4 right-4`} style={btnStyle} aria-label="Close">
        <X size={20} />
      </button>
      {many && (
        <>
          <button onClick={step(-1)} className={`${btn} left-3 top-1/2 -translate-y-1/2`} style={btnStyle} aria-label="Previous photo">
            <ChevronLeft size={22} />
          </button>
          <button onClick={step(1)} className={`${btn} right-3 top-1/2 -translate-y-1/2`} style={btnStyle} aria-label="Next photo">
            <ChevronRight size={22} />
          </button>
        </>
      )}
      <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
        <img src={photo.src} alt={photo.alt} className="w-full rounded-2xl object-contain" style={{ maxHeight: "78vh" }} />
        <div className="mt-3 text-center">
          {photo.caption && (
            <span className="text-sm" style={{ color: "oklch(0.80 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}>
              {photo.caption}
            </span>
          )}
          {many && (
            <p className="text-xs mt-1" style={{ color: "oklch(0.55 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}>
              {(index ?? 0) + 1} / {photos.length}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
