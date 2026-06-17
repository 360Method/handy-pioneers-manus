/**
 * Guarantee - /guarantee
 * Plain-language explainer of the Handy Pioneers labor guarantee.
 * Customer-facing result-level page (the operational scope catalog stays internal).
 * Design: matches TermsAndConditions / site typography and color system.
 */

import { useEffect } from "react";
import { Link } from "wouter";
import SEO from "@/components/SEO";

export default function Guarantee() {
  useEffect(() => {
    document.title = "Our Labor Guarantee | Handy Pioneers";
    window.scrollTo(0, 0);
    return () => {
      document.title = "Handy Pioneers";
    };
  }, []);

  return (
    <>
      <SEO
        path="/guarantee"
        title="Our Labor Guarantee | Handy Pioneers - Vancouver, WA"
        description="What the Handy Pioneers labor guarantee covers and how we handle the hidden problems we sometimes find once a project is open. Honest, in writing, no surprises."
      />
      <div className="min-h-screen" style={{ backgroundColor: "oklch(0.97 0.015 80)" }}>
        {/* Header bar */}
        <div className="py-4 px-6 border-b" style={{ backgroundColor: "oklch(0.18 0.06 160)", borderColor: "oklch(0.25 0.06 160)" }}>
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 no-underline">
              <span className="text-lg font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.95 0.02 80)" }}>
                Handy Pioneers
              </span>
            </Link>
            <Link href="/" className="text-sm hover:opacity-80 transition-opacity" style={{ color: "oklch(0.75 0.04 80)", fontFamily: "'Source Sans 3', sans-serif" }}>
              ← Back to Home
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-6 py-14">
          <h1
            className="text-4xl font-bold mb-2"
            style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
          >
            Our Labor Guarantee
          </h1>
          <p className="text-sm mb-10" style={{ color: "oklch(0.55 0.03 80)", fontFamily: "'Source Sans 3', sans-serif" }}>
            Plain terms. In writing. No surprises.
          </p>

          <div className="prose max-w-none" style={{ fontFamily: "'Source Sans 3', sans-serif", color: "oklch(0.30 0.03 80)", lineHeight: "1.8" }}>

            <Section title="What it means">
              <p>
                Every job we complete is backed by a 1-year labor guarantee. If something we did fails because of how we did it, we come back and make it right - no service call fee, no trip charge, no back-and-forth. That is the simple version, and we mean it.
              </p>
            </Section>

            <Section title="We guarantee what we build on a sound foundation">
              <p>
                Most of our work is straightforward, and our guarantee is too. The honest part most contractors don't put in writing is what happens when we open something up and find a problem underneath that nobody could see - rotted decking under an old floor, a window frame gone soft behind the trim.
              </p>
              <p>
                When that happens, we stop, show you photos, and give you a clear choice in writing:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Rebuild it right</strong> - we fix the underlying problem and restore the area to a sound base, then do the work on top of it. That work is fully guaranteed.</li>
                <li><strong>Go over it</strong> - at your direction, we install over the existing condition to keep the cost down. We can't guarantee work that sits on a base we weren't able to make sound, so that specific part falls outside the guarantee. We put that in writing too, and everything else on the job stays covered.</li>
              </ul>
              <p>
                Either way, you decide with the full picture in front of you. We never bury a problem to keep a job moving.
              </p>
            </Section>

            <Section title="What's covered">
              <p>
                Defects in our workmanship on completed work, for one year. If a door we hung won't close right, a caulk line we ran separates, or a board we set lifts because of how it was fastened - we come back and fix it.
              </p>
            </Section>

            <Section title="What's not covered">
              <p>
                Material or manufacturer defects (those are handled through the manufacturer's own warranty), normal wear and tear, damage from work done by others after us, and damage from events outside anyone's control - flooding, storms, pests, or structural movement. And, as above, any scope we installed over a condition you asked us to cover instead of repair. If we didn't do it, or you asked us to go over a problem we flagged, we'll tell you straight.
              </p>
            </Section>

            <Section title="Questions">
              <p>
                Want to talk through what's covered on your project? Reach out anytime.
              </p>
              <address className="not-italic mt-2" style={{ color: "oklch(0.35 0.04 80)" }}>
                <strong>Handy Pioneers</strong><br />
                Vancouver, WA (Clark County)<br />
                Phone: <a href="tel:+13608386731" style={{ color: "oklch(0.32 0.07 160)" }}>(360) 838-6731</a><br />
                Email: <a href="mailto:info@handypioneers.com" style={{ color: "oklch(0.32 0.07 160)" }}>info@handypioneers.com</a>
              </address>
              <p className="mt-4 text-sm" style={{ color: "oklch(0.55 0.03 80)" }}>
                The full warranty language is in our{" "}
                <Link href="/terms-and-conditions" style={{ color: "oklch(0.32 0.07 160)" }}>Terms &amp; Conditions</Link>.
              </p>
            </Section>
          </div>
        </div>

        {/* Footer strip */}
        <div className="border-t py-6 text-center" style={{ borderColor: "oklch(0.88 0.015 80)" }}>
          <p className="text-xs" style={{ color: "oklch(0.60 0.03 80)", fontFamily: "'Source Sans 3', sans-serif" }}>
            © {new Date().getFullYear()} Handy Pioneers. All rights reserved. ·{" "}
            <Link href="/terms-and-conditions" className="hover:underline" style={{ color: "oklch(0.45 0.05 160)" }}>
              Terms &amp; Conditions
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2
        className="text-xl font-bold mb-3"
        style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
      >
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
