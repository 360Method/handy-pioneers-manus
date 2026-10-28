/**
 * FaqAccordion - one question that opens to its answer. Extracted from
 * ServicePage so the 360 Method step pages share the same look. Pair with a
 * FAQPage JSON-LD block built from the same array.
 */
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FaqAccordion({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b last:border-b-0" style={{ borderColor: "oklch(0.88 0.015 80)" }}>
      <button
        className="w-full text-left py-5 flex items-start justify-between gap-4"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="text-base font-semibold leading-snug" style={{ fontFamily: "'Source Sans 3', sans-serif", color: "oklch(0.22 0.07 160)" }}>{q}</span>
        <ChevronDown size={18} className="shrink-0 mt-0.5 transition-transform duration-200" style={{ color: "oklch(0.65 0.14 65)", transform: open ? "rotate(180deg)" : "rotate(0deg)" }} />
      </button>
      {open && (
        <div className="pb-5 text-sm leading-relaxed" style={{ color: "oklch(0.42 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}>{a}</div>
      )}
    </div>
  );
}
