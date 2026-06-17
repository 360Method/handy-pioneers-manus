/**
 * PromoModal - a one-time booking nudge for the current seasonal offer. Surfaces
 * shortly after load (once per offer per browser), shows the headline, and the
 * primary CTA opens the real consultation form via openInquiry(). Null-safe: no
 * active promo means it never appears. Voice: warm seasonal offer, low pressure.
 */
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { usePromo } from "@/contexts/PromoContext";
import { openInquiry } from "@/lib/inquiry";

function seenKey(headline: string): string {
  return "hp_promo_modal_seen_" + headline.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 64);
}

export default function PromoModal() {
  const { promo } = usePromo();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

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
    if (!promo) return;
    let seen = false;
    try {
      seen = Boolean(window.localStorage.getItem(seenKey(promo.headline)));
    } catch {
      seen = false;
    }
    if (seen) return;
    const t = setTimeout(() => {
      setOpen(true);
      try {
        window.localStorage.setItem(seenKey(promo.headline), new Date().toISOString());
      } catch {
        // non-fatal
      }
    }, 12000);
    return () => clearTimeout(t);
  }, [promo]);

  if (!promo) return null;

  const book = () => {
    setOpen(false);
    openInquiry({ promoCode: promo.code ?? undefined });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <p
            style={{
              fontSize: "0.72rem",
              fontWeight: 800,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "oklch(0.6 0.13 65)",
              fontFamily: "'Source Sans 3', sans-serif",
              margin: 0,
            }}
          >
            This month at Handy Pioneers
          </p>
          <DialogTitle
            className="text-2xl"
            style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
          >
            {promo.headline}
          </DialogTitle>
          <DialogDescription>
            Book your visit this month and we'll apply this offer to your project. No pressure, and
            you'll get a clear written plan either way.
          </DialogDescription>
        </DialogHeader>
        {promo.code && (
          <div
            className="flex items-center justify-between gap-3 rounded-lg px-4 py-3"
            style={{ backgroundColor: "oklch(0.95 0.02 80)", border: "1px dashed oklch(0.65 0.14 65)" }}
          >
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "oklch(0.45 0.02 80)",
                  fontFamily: "'Source Sans 3', sans-serif",
                }}
              >
                Your code
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "1.15rem",
                  fontWeight: 800,
                  letterSpacing: "0.05em",
                  color: "oklch(0.22 0.07 160)",
                  fontFamily: "'Source Sans 3', sans-serif",
                }}
              >
                {promo.code}
              </p>
            </div>
            <button
              type="button"
              onClick={copyCode}
              style={{
                backgroundColor: copied ? "oklch(0.45 0.1 150)" : "oklch(0.22 0.07 160)",
                color: "oklch(0.97 0.015 80)",
                border: "none",
                borderRadius: "0.45rem",
                padding: "0.45rem 0.9rem",
                fontSize: "0.82rem",
                fontWeight: 700,
                cursor: "pointer",
                whiteSpace: "nowrap",
                fontFamily: "'Source Sans 3', sans-serif",
              }}
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        )}
        <div className="flex flex-col gap-2 pt-1 sm:flex-row">
          <button
            type="button"
            onClick={book}
            style={{
              flex: 1,
              backgroundColor: "oklch(0.65 0.14 65)",
              color: "oklch(0.18 0.05 160)",
              border: "none",
              borderRadius: "0.5rem",
              padding: "0.7rem 1rem",
              fontSize: "0.95rem",
              fontWeight: 800,
              cursor: "pointer",
              fontFamily: "'Source Sans 3', sans-serif",
            }}
          >
            Book my visit
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            style={{
              backgroundColor: "transparent",
              color: "oklch(0.45 0.02 80)",
              border: "1px solid oklch(0.85 0.015 80)",
              borderRadius: "0.5rem",
              padding: "0.7rem 1rem",
              fontSize: "0.95rem",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'Source Sans 3', sans-serif",
            }}
          >
            Maybe later
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
