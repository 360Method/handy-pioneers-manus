/**
 * PromoModal - a one-time booking nudge for the current seasonal offer. Surfaces
 * shortly after load (once per offer per browser), shows the headline, and the
 * CTAs let the customer book the consultation form or call us. Null-safe: no
 * active promo means it never appears. No promo code - the discount is applied by
 * the consultant. Voice: warm seasonal offer, low pressure.
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

const HP_PHONE = "(360) 838-6731";
const HP_PHONE_TEL = "+13608386731";

function seenKey(headline: string): string {
  return "hp_promo_modal_seen_" + headline.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 64);
}

export default function PromoModal() {
  const { promo } = usePromo();
  const [open, setOpen] = useState(false);

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
    // promoCode is passed for internal lead attribution only - not shown to the customer.
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
            Book your visit or give us a call this month and we'll apply this offer to your project.
            No pressure, and you'll get a clear written plan either way.
          </DialogDescription>
        </DialogHeader>
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
          <a
            href={`tel:${HP_PHONE_TEL}`}
            onClick={() => setOpen(false)}
            style={{
              flex: 1,
              textAlign: "center",
              backgroundColor: "transparent",
              color: "oklch(0.22 0.07 160)",
              border: "1px solid oklch(0.22 0.07 160)",
              borderRadius: "0.5rem",
              padding: "0.7rem 1rem",
              fontSize: "0.95rem",
              fontWeight: 700,
              cursor: "pointer",
              textDecoration: "none",
              fontFamily: "'Source Sans 3', sans-serif",
            }}
          >
            Call {HP_PHONE}
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
