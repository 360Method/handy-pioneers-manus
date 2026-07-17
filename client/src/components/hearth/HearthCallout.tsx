/**
 * A compact "Finance this project" card for high-intent pages (remodel cost,
 * service pages) - drop it near a price so the next thought after the number is
 * "here's how to make it a monthly payment." Self-contained: headline, a few
 * value props, an Apply CTA, and the required disclaimer.
 */
import HearthCTA from "@/components/hearth/HearthCTA";
import HearthDisclaimer from "@/components/hearth/HearthDisclaimer";
import { HEARTH_ENABLED } from "@/lib/hearth";

const GREEN = "oklch(0.22 0.07 160)";
const GOLD = "oklch(0.65 0.14 65)";

const POINTS = [
  "Monthly payment options up to $250,000",
  "No impact to your credit to check",
  "0% APR options on approved credit",
  "Funding in as little as 1-3 days",
];

export default function HearthCallout({
  location,
  className = "",
}: {
  location: string;
  className?: string;
}) {
  if (!HEARTH_ENABLED) return null;

  return (
    <div
      className={`rounded-2xl p-6 md:p-7 ${className}`}
      style={{ backgroundColor: "oklch(0.96 0.02 160)", border: "1px solid oklch(0.85 0.03 160)" }}
    >
      <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: GOLD, letterSpacing: "0.08em" }}>
        Financing available
      </p>
      <h3 className="text-xl md:text-2xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: GREEN }}>
        Turn your project into a monthly payment
      </h3>
      <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: "oklch(0.34 0.03 160)", fontFamily: "'Source Sans 3', sans-serif" }}>
        Through our lending partner Hearth, you can see personalized monthly payment
        options in minutes, without affecting your credit score.
      </p>
      <ul className="grid sm:grid-cols-2 gap-x-5 gap-y-1.5 mb-5">
        {POINTS.map((p) => (
          <li key={p} className="flex items-start gap-2 text-sm" style={{ color: "oklch(0.30 0.04 160)", fontFamily: "'Source Sans 3', sans-serif" }}>
            <span style={{ color: GOLD }}>✓</span> {p}
          </li>
        ))}
      </ul>
      <HearthCTA variant="apply" location={location}>
        See my monthly payment options
      </HearthCTA>
      <HearthDisclaimer className="mt-4" />
    </div>
  );
}
