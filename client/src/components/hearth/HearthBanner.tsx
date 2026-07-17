/**
 * A Hearth financing banner image, linked to the soft "see your options" landing.
 * Hearth ships these at fixed pixel sizes; we render them responsively
 * (max-width:100%, height auto) so a 700px banner never overflows a phone.
 * Always pair with <HearthDisclaimer /> on the same screen.
 */
import { track } from "@/lib/analytics";
import { HEARTH_PREQUAL_URL } from "@/lib/hearth";

type Size = "700x110" | "310x120" | "310x310" | "310x610";

function bannerSrc(size: Size, kind: "darkblue" | "zero"): string {
  const base = "https://hearth.imgix.net/contractor-v2/banners";
  const path =
    kind === "zero"
      ? `${base}/${size}_zero_percent.png`
      : `${base}/home_improvement-v2/${size}_darkblue.png`;
  return `${path}?dpr=2&auto=compress,format`;
}

export default function HearthBanner({
  size = "700x110",
  kind = "darkblue",
  location,
  className = "",
}: {
  size?: Size;
  kind?: "darkblue" | "zero";
  location: string;
  className?: string;
}) {
  const [w, h] = size.split("x").map(Number);
  const alt =
    kind === "zero"
      ? "See if you qualify for 0% APR financing options with Hearth"
      : "See monthly payment options for your project with Hearth";

  return (
    <a
      href={HEARTH_PREQUAL_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("financing_apply_click", { variant: "banner", location })}
      className={`inline-block ${className}`}
      style={{ maxWidth: `${w}px`, width: "100%" }}
    >
      <img
        src={bannerSrc(size, kind)}
        alt={alt}
        width={w}
        height={h}
        loading="lazy"
        style={{ width: "100%", height: "auto", borderRadius: "0.5rem", display: "block" }}
      />
    </a>
  );
}
