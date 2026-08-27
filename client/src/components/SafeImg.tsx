import { useState } from "react";

/**
 * An <img> that never renders as a broken-image icon.
 *
 * Two jobs. If the src is empty, nothing renders at all. If the src is set but
 * the browser fails to load it, the element removes itself rather than leaving
 * the browser's broken-file glyph on a client-facing page.
 *
 * Written after 2026-08-26, when a third-party CDN started answering 403 to all
 * 36 images the site loaded from it and every one of them rendered as a broken
 * icon on production. Hosting our own pixels is the real fix; this is the seat
 * belt for the day something slips through anyway.
 */
type Props = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src?: string;
  /** Rendered in place of the image if it is missing or fails. Defaults to nothing. */
  fallback?: React.ReactNode;
};

export default function SafeImg({ src, fallback = null, alt = "", ...rest }: Props) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return <>{fallback}</>;
  return <img src={src} alt={alt} onError={() => setFailed(true)} {...rest} />;
}
