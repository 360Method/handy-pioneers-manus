/**
 * BaselineConfirmation.tsx - /baseline/confirmed (Step 4, decline path)
 * Shown when a homeowner books the baseline walkthrough without buying membership.
 */
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import { CheckCircle } from "lucide-react";

export default function BaselineConfirmation() {
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    document.title = "You're Booked | Handy Pioneers";
    window.scrollTo(0, 0);
    try {
      const raw = sessionStorage.getItem("hp_baseline");
      if (raw) setFirstName(JSON.parse(raw)?.firstName || "");
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <div className="min-h-screen font-sans" style={{ background: "oklch(96% 0.015 80)" }}>
      <Navbar />

      <section className="px-4 py-20">
        <div className="max-w-xl mx-auto text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: "oklch(65% 0.15 72 / 0.15)" }}
          >
            <CheckCircle className="w-8 h-8" style={{ color: "oklch(45% 0.12 155)" }} />
          </div>
          <h1
            className="font-display text-3xl sm:text-4xl font-black mb-4"
            style={{ color: "oklch(22% 0.07 155)" }}
          >
            {firstName ? `You're booked, ${firstName}.` : "You're booked."}
          </h1>
          <p className="text-base leading-relaxed mb-8" style={{ color: "oklch(40% 0.03 60)" }}>
            Your baseline walkthrough is reserved. Pick your time below to lock it in - the
            whole-home assessment takes about 2 hours, and we'll confirm the exact window with you.
          </p>
          <div className="mb-10">
            <CalendlyEmbed funnel="baseline" />
          </div>
          <div
            className="rounded-xl px-6 py-5 text-left mb-8"
            style={{ background: "white", border: "1px solid oklch(88% 0.02 80)" }}
          >
            <p className="text-sm font-semibold mb-2" style={{ color: "oklch(22% 0.07 155)" }}>
              What happens next
            </p>
            <ul className="space-y-2 text-sm" style={{ color: "oklch(40% 0.03 60)" }}>
              <li>• Your time is set the moment you book above (the walkthrough takes about 2 hours).</li>
              <li>• You receive a documented report with photos and a prioritized roadmap.</li>
              <li>• If membership is a fit, we'll set it up together - no pressure.</li>
            </ul>
          </div>
          <p className="text-sm" style={{ color: "oklch(50% 0.02 60)" }}>
            Questions now? Call or text{" "}
            <a href="tel:+13608386731" className="font-semibold underline" style={{ color: "oklch(45% 0.12 155)" }}>
              (360) 838-6731
            </a>
            .
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
