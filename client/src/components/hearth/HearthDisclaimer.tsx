/**
 * The Hearth broker/NMLS disclosure. Render directly under any financing widget,
 * banner, or monthly-payment claim so the disclosure is on the same screen
 * without scrolling. Copy is the single source in lib/hearth.ts.
 */
import { HEARTH_DISCLAIMER } from "@/lib/hearth";

export default function HearthDisclaimer({
  className = "",
  color = "oklch(0.55 0.02 80)",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <p
      className={`text-xs leading-relaxed ${className}`}
      style={{ color, fontFamily: "'Source Sans 3', sans-serif" }}
    >
      {HEARTH_DISCLAIMER}
    </p>
  );
}
