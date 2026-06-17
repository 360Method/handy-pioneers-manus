/**
 * PromoBanner - a slim, dismissible top bar showing the current seasonal offer.
 * Sits above the (sticky) navbar in normal flow, so it scrolls away and the nav
 * sticks to the top after it. Dismissal is remembered per-offer in localStorage,
 * so a new month's promo shows again. Renders nothing when there's no active
 * promo (the PromoContext is null-safe). Voice: limited-time seasonal offer,
 * never "cheap/bargain"; CTA drives a booking, not a hard sell.
 */
import { useEffect, useState } from "react";
import { usePromo } from "@/contexts/PromoContext";

/** Stable per-offer dismissal key (the public view has no id; headline is unique). */
function dismissKey(headline: string): string {
  return "hp_promo_dismissed_" + headline.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 64);
}

export default function PromoBanner() {
  const { promo } = usePromo();
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    if (!promo) return;
    try {
      setDismissed(Boolean(window.localStorage.getItem(dismissKey(promo.headline))));
    } catch {
      setDismissed(false); // private mode: show it
    }
  }, [promo]);

  if (!promo || dismissed) return null;

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
      role="region"
      aria-label="Current offer"
      style={{
        width: "100%",
        backgroundColor: "oklch(0.22 0.07 160)",
        color: "oklch(0.96 0.015 80)",
        fontFamily: "'Source Sans 3', sans-serif",
        fontSize: "0.9375rem",
        lineHeight: 1.4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.875rem",
        padding: "0.5rem 1rem",
        flexWrap: "wrap",
      }}
    >
      <span style={{ fontWeight: 600 }}>{promo.headline}</span>
      <a
        href="/contact"
        style={{
          backgroundColor: "oklch(0.65 0.14 65)",
          color: "oklch(0.18 0.05 160)",
          textDecoration: "none",
          borderRadius: "0.4rem",
          padding: "0.3rem 0.85rem",
          fontSize: "0.8125rem",
          fontWeight: 700,
          whiteSpace: "nowrap",
        }}
      >
        Book now
      </a>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss offer"
        style={{
          background: "transparent",
          border: "none",
          color: "oklch(0.85 0.04 80)",
          fontSize: "1.1rem",
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
