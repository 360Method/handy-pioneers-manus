/**
 * PromoBanner - a bold, STICKY top bar showing the current seasonal offer. It's
 * fixed to the top of the viewport (stays visible as you scroll) and publishes
 * its height as the `--hp-promo-h` CSS var, which the navbar (top offset) and the
 * page (body padding-top, in index.css) use so nothing is hidden under it.
 *
 * Renders nothing when there's no active promo (PromoContext is null-safe) or once
 * dismissed (remembered per-offer, so next month's promo shows again). The "Book"
 * CTA opens the real consultation form via openInquiry(). Voice: limited-time
 * seasonal offer, never "cheap/bargain".
 */
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePromo } from "@/contexts/PromoContext";
import { openInquiry } from "@/lib/inquiry";

function dismissKey(headline: string): string {
  return "hp_promo_bar_dismissed_" + headline.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 64);
}

export default function PromoBanner() {
  const { promo } = usePromo();
  const [dismissed, setDismissed] = useState(true);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const copyCode = () => {
    if (!promo?.code) return;
    try {
      navigator.clipboard?.writeText(promo.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // non-fatal
    }
  };

  useEffect(() => {
    if (!promo) {
      setDismissed(true);
      return;
    }
    try {
      setDismissed(Boolean(window.localStorage.getItem(dismissKey(promo.headline))));
    } catch {
      setDismissed(false);
    }
  }, [promo]);

  const visible = Boolean(promo) && !dismissed;

  // Keep the layout offset (navbar top + body padding) in sync with the bar height.
  useLayoutEffect(() => {
    const root = document.documentElement;
    if (!visible || !ref.current) {
      root.style.setProperty("--hp-promo-h", "0px");
      return;
    }
    const el = ref.current;
    const sync = () => root.style.setProperty("--hp-promo-h", `${el.offsetHeight}px`);
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => {
      ro.disconnect();
      root.style.setProperty("--hp-promo-h", "0px");
    };
  }, [visible, promo]);

  if (!visible || !promo) return null;

  const dismiss = () => {
    try {
      window.localStorage.setItem(dismissKey(promo.headline), new Date().toISOString());
    } catch {
      // non-fatal
    }
    setDismissed(true);
  };

  return (
    <div
      ref={ref}
      role="region"
      aria-label="Current offer"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 60,
        backgroundColor: "oklch(0.22 0.07 160)",
        color: "oklch(0.97 0.015 80)",
        fontFamily: "'Source Sans 3', sans-serif",
        borderBottom: "2px solid oklch(0.65 0.14 65)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.75rem",
        padding: "0.6rem 2.5rem 0.6rem 1rem",
        flexWrap: "wrap",
        textAlign: "center",
      }}
    >
      <span
        style={{
          fontSize: "0.7rem",
          fontWeight: 800,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "oklch(0.8 0.12 70)",
        }}
      >
        Limited time
      </span>
      <span style={{ fontSize: "0.97rem", fontWeight: 700 }}>{promo.headline}</span>
      {promo.code && (
        <button
          type="button"
          onClick={copyCode}
          title="Copy code"
          style={{
            backgroundColor: "transparent",
            color: "oklch(0.9 0.04 80)",
            border: "1px dashed oklch(0.65 0.14 65)",
            borderRadius: "0.4rem",
            padding: "0.25rem 0.7rem",
            fontSize: "0.8rem",
            fontWeight: 800,
            letterSpacing: "0.04em",
            cursor: "pointer",
            whiteSpace: "nowrap",
            fontFamily: "'Source Sans 3', sans-serif",
          }}
        >
          {copied ? "Copied ✓" : `Code: ${promo.code} ⧉`}
        </button>
      )}
      <button
        type="button"
        onClick={() => openInquiry({ promoCode: promo.code ?? undefined })}
        style={{
          backgroundColor: "oklch(0.65 0.14 65)",
          color: "oklch(0.18 0.05 160)",
          border: "none",
          borderRadius: "0.45rem",
          padding: "0.4rem 1.1rem",
          fontSize: "0.84rem",
          fontWeight: 800,
          cursor: "pointer",
          whiteSpace: "nowrap",
        }}
      >
        Book now
      </button>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss offer"
        style={{
          position: "absolute",
          right: "0.6rem",
          top: "50%",
          transform: "translateY(-50%)",
          background: "transparent",
          border: "none",
          color: "oklch(0.82 0.04 80)",
          fontSize: "1.2rem",
          lineHeight: 1,
          cursor: "pointer",
          padding: "0 0.25rem",
        }}
      >
        ×
      </button>
    </div>
  );
}
