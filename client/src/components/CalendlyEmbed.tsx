/**
 * CalendlyEmbed - reusable inline Calendly scheduler.
 *
 * Logs a `schedule_view` on mount and fires a `schedule` (Meta Schedule)
 * conversion when Calendly posts `calendly.event_scheduled`. The `funnel` prop
 * tags the events so GA4/Meta can separate consultation vs baseline bookings.
 */
import { useEffect } from "react";
import { track } from "@/lib/analytics";
import { calendlyEmbedSrc } from "@/lib/booking";

interface Props {
  /** e.g. "consultation" | "baseline" - tags the analytics events. */
  funnel: string;
  height?: number;
}

export default function CalendlyEmbed({ funnel, height = 720 }: Props) {
  useEffect(() => {
    track("schedule_view", { funnel });
    const onMsg = (e: MessageEvent) => {
      if (e?.data?.event === "calendly.event_scheduled") {
        track("schedule", { funnel });
      }
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, [funnel]);

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        backgroundColor: "oklch(1 0 0)",
        boxShadow: "0 4px 32px oklch(0 0 0 / 0.08)",
        border: "1px solid oklch(0.90 0.015 80)",
      }}
    >
      <iframe
        src={calendlyEmbedSrc()}
        title="Schedule with Handy Pioneers"
        width="100%"
        height={height}
        style={{ border: "none", display: "block" }}
      />
    </div>
  );
}
