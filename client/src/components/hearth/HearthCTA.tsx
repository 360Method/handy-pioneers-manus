/**
 * The Hearth financing call-to-action. A branded link (opens Hearth in a new tab)
 * that fires a funnel event so we can see which placement drives applications.
 *
 * variant:
 *  - "apply"    -> starts an application (HEARTH_APPLY_URL)
 *  - "prequal"  -> soft "see your options" landing (HEARTH_PREQUAL_URL)
 * style:
 *  - "button"   -> brand amber .hcp-button
 *  - "link"     -> inline text link
 */
import { track } from "@/lib/analytics";
import { HEARTH_APPLY_URL, HEARTH_PREQUAL_URL } from "@/lib/hearth";

export default function HearthCTA({
  children,
  variant = "prequal",
  style = "button",
  location,
  className = "",
}: {
  children: React.ReactNode;
  variant?: "apply" | "prequal";
  style?: "button" | "link";
  location: string;
  className?: string;
}) {
  const href = variant === "apply" ? HEARTH_APPLY_URL : HEARTH_PREQUAL_URL;

  const onClick = () =>
    track("financing_apply_click", { variant, location });

  if (style === "link") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={`inline-flex items-center gap-1 font-semibold hover:opacity-80 transition-opacity ${className}`}
        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={`hcp-button no-underline ${className}`}
    >
      {children}
    </a>
  );
}
