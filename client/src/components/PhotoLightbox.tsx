/**
 * PhotoLightbox - the one full-screen photo viewer on the site, with
 * previous/next, a caption, and a counter. The homepage gallery, the service
 * pages, and the membership, multifamily and 360 Method pages all use it.
 * Closes on the X, a click outside the photo, or Escape. Arrow keys page, and
 * on a phone a sideways swipe pages too.
 */

import { useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface LightboxPhoto {
  src: string;
  alt: string;
  caption?: string;
  /** Optional category pill shown before the caption (homepage gallery). */
  tag?: string;
}

interface Props {
  photos: LightboxPhoto[];
  index: number | null;
  onChange: (index: number | null) => void;
}

const SWIPE_MIN_PX = 40;

export default function PhotoLightbox({ photos, index, onChange }: Props) {
  const open = index !== null && photos.length > 0;
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  // A swipe can be followed by a synthetic click; don't let it close the viewer.
  const justSwiped = useRef(false);

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

  // Move keyboard focus into the viewer when it opens.
  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  if (!open) return null;
  const photo = photos[Math.min(index!, photos.length - 1)];
  const many = photos.length > 1;
  const go = (delta: number) => onChange(((index ?? 0) + delta + photos.length) % photos.length);
  const step = (delta: number) => (e: React.MouseEvent) => {
    e.stopPropagation();
    go(delta);
  };
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start || !many) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) >= SWIPE_MIN_PX && Math.abs(dx) > Math.abs(dy)) {
      justSwiped.current = true;
      window.setTimeout(() => { justSwiped.current = false; }, 400);
      go(dx < 0 ? 1 : -1);
    }
  };
  const btn = "absolute z-20 w-10 h-10 rounded-full flex items-center justify-center";
  const btnStyle = { backgroundColor: "oklch(0.25 0.02 80)", color: "oklch(0.96 0.01 80)" };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "oklch(0 0 0 / 0.92)" }}
      onClick={() => { if (!justSwiped.current) onChange(null); }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      data-photo-lightbox=""
    >
      <button ref={closeRef} onClick={() => onChange(null)} className={`${btn} top-4 right-4`} style={btnStyle} aria-label="Close">
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
          {photo.tag && (
            <span
              className="inline-block px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider mr-2"
              style={{ backgroundColor: "oklch(0.65 0.14 65)", color: "oklch(1 0 0)", fontFamily: "'Source Sans 3', sans-serif" }}
            >
              {photo.tag}
            </span>
          )}
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
