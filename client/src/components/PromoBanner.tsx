/**
 * PromoBanner - a bold, STICKY top bar showing the current seasonal offer. It's
 * fixed to the top of the viewport (stays visible as you scroll) and publishes
 * its height as the `--hp-promo-h` CSS var, which the navbar (top offset) and the
 * page (body padding-top, in index.css) use so nothing is hidden under it.
 *
 * Shown the whole time an offer is active (no dismiss - the point is that people
 * see it). Renders nothing when there's no active promo (PromoContext is null-safe).
 * CTAs: book the consultation form (openInquiry) or call us. No promo code - the
 * discount is applied by the consultant, so there's nothing for the customer to
 * enter. Voice: limited-time seasonal offer, never "cheap/bargain".
 */
import { useLayoutEffect, useRef } from "react";
import { usePromo } from "@/contexts/PromoContext";
import { openInquiry } from "@/lib/inquiry";

const HP_PHONE = "(360) 838-6731";
const HP_PHONE_TEL = "+13608386731";

export default function PromoBanner() {
  const { promo } = usePromo();
  const ref = useRef<HTMLDivElement>(null);

  // Keep the layout offset (navbar top + body padding) in sync with the bar height.
  useLayoutEffect(() => {
    const root = document.documentElement;
    if (!promo || !ref.current) {
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
  }, [promo]);

  if (!promo) return null;

  return (
    <div
      ref={ref}
      role="region"
      aria-label="Current offer"
      className="hp-promo-banner"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 60,
        // Warm amber (theme accent) so the bar pops against the white nav + off-white
        // page, with deep-forest-green text/controls for contrast and brand cohesion.
        backgroundColor: "oklch(0.72 0.15 72)",
        color: "oklch(0.24 0.07 160)",
        fontFamily: "'Source Sans 3', sans-serif",
        borderBottom: "2px solid oklch(0.22 0.07 160)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        textAlign: "center",
      }}
    >
      <span
        className="hp-promo-banner__tag"
        style={{
          fontWeight: 800,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "oklch(0.32 0.08 160)",
        }}
      >
        Limited time
      </span>
      <span className="hp-promo-banner__headline" style={{ fontWeight: 700 }}>
        {promo.headline}
      </span>
      <button
        type="button"
        onClick={() => openInquiry()}
        className="hp-promo-banner__cta"
        style={{
          backgroundColor: "oklch(0.24 0.07 160)",
          color: "oklch(0.97 0.015 80)",
          border: "none",
          borderRadius: "0.45rem",
          fontWeight: 800,
          cursor: "pointer",
          whiteSpace: "nowrap",
        }}
      >
        Book now
      </button>
      <a
        href={`tel:${HP_PHONE_TEL}`}
        className="hp-promo-banner__call"
        style={{
          color: "oklch(0.22 0.07 160)",
          fontWeight: 700,
          textDecoration: "underline",
          whiteSpace: "nowrap",
        }}
      >
        or call {HP_PHONE}
      </a>
    </div>
  );
}
