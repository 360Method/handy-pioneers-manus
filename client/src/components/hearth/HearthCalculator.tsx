/**
 * Hearth payment calculator - loads Hearth's widget script once and renders the
 * iframe it populates (id "hearth-widget_calculator_v1"). Homeowners can enter a
 * project amount and see estimated monthly payment options inline, no credit hit.
 *
 * Script injection is idempotent (guarded by the element id), modeled on the
 * gtag/fbq loader in Analytics.tsx. Renders nothing when HEARTH_ENABLED is off.
 * Pair with <HearthDisclaimer /> on the same screen (Reg Z).
 */
import { useEffect } from "react";
import { track } from "@/lib/analytics";
import {
  HEARTH_ENABLED,
  HEARTH_ORG_ID,
  HEARTH_PARTNER,
  HEARTH_WIDGET_SRC,
} from "@/lib/hearth";

function loadHearthScript() {
  if (typeof document === "undefined") return;
  if (document.getElementById("hearth-script")) return; // already injected
  const s = document.createElement("script");
  s.id = "hearth-script";
  s.src = HEARTH_WIDGET_SRC;
  s.async = true;
  s.setAttribute("data-orgid", HEARTH_ORG_ID);
  s.setAttribute("data-partner", HEARTH_PARTNER);
  document.body.appendChild(s);
}

export default function HearthCalculator({
  location,
  className = "",
}: {
  location: string;
  className?: string;
}) {
  useEffect(() => {
    if (!HEARTH_ENABLED) return;
    loadHearthScript();
    track("financing_calculator_view", { location });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!HEARTH_ENABLED) return null;

  return (
    <div className={className} style={{ width: "100%" }}>
      {/* Hearth's script finds this iframe by id and renders the calculator in it. */}
      <iframe
        id="hearth-widget_calculator_v1"
        title="Estimate your monthly payment with Hearth"
        style={{ width: "100%", border: "none", minHeight: "220px" }}
      />
    </div>
  );
}
