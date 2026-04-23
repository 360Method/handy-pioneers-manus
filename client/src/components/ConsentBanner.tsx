/**
 * ConsentBanner — small, quiet, affluent-homeowner voice.
 *
 * Renders only when at least one analytics env var is set — if we're
 * not running analytics at all there's nothing to consent to.  Once
 * dismissed (via either button), sets a long-lived localStorage flag
 * and stays out of the way.
 *
 * Two actions:
 *   - "Got it" → dismiss.
 *   - "Manage preferences" → placeholder link for a future preferences
 *     page.  Keeps the door open without pretending a preferences UI
 *     exists yet.
 */
import { useEffect, useState } from "react";

const STORAGE_KEY = "hp_consent_ack_v1";

const HAS_ANALYTICS =
  Boolean(import.meta.env.VITE_GA4_MEASUREMENT_ID) ||
  Boolean(import.meta.env.VITE_META_PIXEL_ID);

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!HAS_ANALYTICS) return;
    try {
      const acked = window.localStorage.getItem(STORAGE_KEY);
      if (!acked) setVisible(true);
    } catch {
      // Private mode / SSR — fall through.
      setVisible(true);
    }
  }, []);

  if (!HAS_ANALYTICS || !visible) return null;

  const dismiss = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, new Date().toISOString());
    } catch {
      // non-fatal
    }
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Privacy notice"
      style={{
        position: "fixed",
        bottom: "1rem",
        left: "1rem",
        right: "1rem",
        maxWidth: "640px",
        marginInline: "auto",
        zIndex: 2147483600,
        backgroundColor: "oklch(0.22 0.07 160)",
        color: "oklch(0.96 0.015 80)",
        borderRadius: "0.75rem",
        padding: "1rem 1.25rem",
        boxShadow: "0 12px 32px rgba(10, 20, 15, 0.28)",
        fontFamily: "'Source Sans 3', sans-serif",
        fontSize: "0.9375rem",
        lineHeight: 1.5,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "0.875rem",
      }}
    >
      <p style={{ margin: 0, flex: "1 1 260px" }}>
        A quick note: we use a handful of analytics tools to understand how
        Clark County homeowners find and use this site. No ad networks, no
        selling anything. You can review the details any time.
      </p>
      <div style={{ display: "flex", gap: "0.5rem", flex: "0 0 auto" }}>
        <a
          href="/privacy-policy"
          style={{
            color: "oklch(0.85 0.06 80)",
            textDecoration: "underline",
            padding: "0.5rem 0.75rem",
            fontSize: "0.875rem",
            fontWeight: 600,
          }}
        >
          Manage preferences
        </a>
        <button
          type="button"
          onClick={dismiss}
          style={{
            backgroundColor: "oklch(0.65 0.14 65)",
            color: "oklch(0.18 0.05 160)",
            border: "none",
            borderRadius: "0.5rem",
            padding: "0.55rem 1rem",
            fontSize: "0.875rem",
            fontWeight: 700,
            cursor: "pointer",
            letterSpacing: "0.01em",
          }}
        >
          Got it
        </button>
      </div>
    </div>
  );
}
