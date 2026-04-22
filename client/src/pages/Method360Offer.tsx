/**
 * Method360Offer — One-Time Offer (OTO) Page
 * Design: Dark forest green / gold affluent positioning
 * Fires after ANY 360° Method form submission before delivering the original ask.
 * Framing: "Before we send you what you asked for — one thing."
 * Offer: Baseline Walkthrough + Full Membership at a limited-time rate
 */

import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, CheckCircle, Clock, Star, Shield, Home } from "lucide-react";

const PDF_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/360-priority-roadmap-sample_945b4356.pdf";

const HOME_SCORE_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/home-score-timeline_8704d21b.png";

// Countdown: 15 minutes from page load
function useCountdown(minutes: number) {
  const total = minutes * 60;
  const [seconds, setSeconds] = useState(total);
  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return { m, s, expired: seconds <= 0 };
}

export default function Method360Offer() {
  const [, navigate] = useLocation();
  const { m, s, expired } = useCountdown(15);
  const [accepted, setAccepted] = useState(false);
  const [declined, setDeclined] = useState(false);

  // Retrieve context from sessionStorage (set by submitting forms)
  const origin = sessionStorage.getItem("360_offer_origin") || "/360-method";
  const firstName = sessionStorage.getItem("360_offer_name")?.split(" ")[0] || "there";

  useEffect(() => {
    document.title = "One-Time Offer | 360° Method — Handy Pioneers";
    window.scrollTo(0, 0);
  }, []);

  function handleAccept() {
    setAccepted(true);
    // In a Stripe-enabled build, this would open the checkout flow.
    // For now, navigate to the membership page with tier pre-selected.
    sessionStorage.setItem("360_selected_tier", "managed");
    setTimeout(() => navigate("/membership?enrolled=true"), 1200);
  }

  function handleDecline() {
    setDeclined(true);
    setTimeout(() => navigate(origin), 800);
  }

  return (
    <div className="min-h-screen bg-[#0D1F14] text-[#F5F0E8]">
      <Navbar />

      {/* ── URGENCY BANNER ── */}
      <div className="bg-[#C9A84C] text-[#0D1F14] py-2 px-4 text-center text-sm font-bold tracking-wide">
        {expired ? (
          <span>This offer has expired. You can still enroll at the standard rate below.</span>
        ) : (
          <span>
            This offer is available for the next{" "}
            <span className="font-black text-base">
              {m}:{s.toString().padStart(2, "0")}
            </span>{" "}
            — it will not appear again.
          </span>
        )}
      </div>

      <div className="max-w-3xl mx-auto px-4 py-14">

        {/* ── BEFORE WE SEND YOU WHAT YOU ASKED FOR ── */}
        <p className="text-[#C9A84C] text-xs font-bold tracking-[0.2em] uppercase mb-3 text-center">
          One moment, {firstName}
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-center leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          Before we send you what you asked for —
          <br />
          <span className="text-[#C9A84C]">one thing.</span>
        </h1>
        <p className="text-[#B8C8B8] text-center text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          You just took the first step. Most homeowners never do. What you're about to see is
          what separates a home that holds its value from one that quietly loses it.
        </p>

        {/* ── OFFER CARD ── */}
        <div className="rounded-2xl border-2 border-[#C9A84C] bg-[#1A3A28] overflow-hidden mb-8">
          {/* Header */}
          <div className="bg-[#C9A84C] text-[#0D1F14] px-6 py-3 flex items-center justify-between">
            <span className="font-black text-sm tracking-widest uppercase">Limited-Time Offer</span>
            <span className="flex items-center gap-1 text-sm font-bold">
              <Clock className="w-4 h-4" />
              {expired ? "Expired" : `${m}:${s.toString().padStart(2, "0")} remaining`}
            </span>
          </div>

          <div className="px-6 py-8">
            <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Baseline Walkthrough + Full 360° Membership
            </h2>
            <p className="text-[#8BA898] text-sm mb-6">
              Everything you need to know what you own — and a team to keep it that way.
            </p>

            {/* What's included */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
              {[
                { icon: Home, text: "Baseline Walkthrough — full property scan, every system rated and photographed" },
                { icon: Star, text: "360° Priority Roadmap — your NOW / SOON / WAIT action plan delivered within 5 days" },
                { icon: CheckCircle, text: "Home Score established — your baseline number, tracked every visit" },
                { icon: Shield, text: "Four seasonal visits per year — spring, summer, fall, winter" },
                { icon: CheckCircle, text: "Shareable PDF record — ready for your agent, lender, or insurer" },
                { icon: CheckCircle, text: "Direct access to Marcin — one call, one point of contact, always" },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Icon className="w-4 h-4 text-[#C9A84C] mt-0.5 shrink-0" />
                  <span className="text-[#B8C8B8] text-sm leading-snug">{text}</span>
                </div>
              ))}
            </div>

            {/* Price block */}
            <div className="bg-[#0D1F14] rounded-xl p-5 mb-6 text-center">
              <p className="text-[#8BA898] text-xs uppercase tracking-widest mb-1">Today Only</p>
              <p className="text-[#C9A84C] text-5xl font-black mb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                First Month Complimentary
              </p>
              <p className="text-[#B8C8B8] text-sm mb-1">
                Baseline Walkthrough included. Then $99/mo — cancel anytime.
              </p>
              <p className="text-[#6A8A78] text-xs">
                Standard rate: $99/mo + $349 Baseline Walkthrough fee. You save $349 today.
              </p>
            </div>

            {/* CTA */}
            {!accepted && !declined && (
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleAccept}
                  className="w-full bg-[#C9A84C] hover:bg-[#B8973B] text-[#0D1F14] font-black py-4 px-6 rounded-xl text-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
                >
                  Yes — Add the Baseline + Membership
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={handleDecline}
                  className="w-full text-[#6A8A78] text-sm py-2 hover:text-[#8BA898] transition-colors underline underline-offset-2"
                >
                  No thanks — just send me what I originally asked for
                </button>
              </div>
            )}

            {accepted && (
              <div className="text-center py-4">
                <CheckCircle className="w-10 h-10 text-[#C9A84C] mx-auto mb-2" />
                <p className="text-[#C9A84C] font-bold text-lg">Excellent. Taking you to enrollment now…</p>
              </div>
            )}

            {declined && (
              <div className="text-center py-4">
                <p className="text-[#8BA898] text-sm">Understood. Sending you what you asked for…</p>
              </div>
            )}
          </div>
        </div>

        {/* ── HOME SCORE VISUAL ── */}
        <div className="mb-10">
          <p className="text-[#8BA898] text-xs uppercase tracking-widest text-center mb-3">
            What happens to your home's score over 18 months
          </p>
          <img
            src={HOME_SCORE_IMG}
            alt="Home Score improvement timeline: 62 to 91 over 18 months"
            className="w-full rounded-xl"
          />
          <p className="text-[#6A8A78] text-xs text-center mt-2">
            Illustrative example. Results vary by property condition and scope of work completed.
          </p>
        </div>

        {/* ── SAMPLE REPORT DOWNLOAD ── */}
        <div className="bg-[#1A3A28] rounded-xl p-6 flex flex-col md:flex-row items-center gap-5 mb-10">
          <div className="flex-1">
            <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-1">Sample Deliverable</p>
            <h3 className="text-lg font-bold mb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              See the actual report before you decide
            </h3>
            <p className="text-[#8BA898] text-sm">
              This is what you receive within 5 days of your Baseline Walkthrough — a full
              NOW / SOON / WAIT priority roadmap for your home.
            </p>
          </div>
          <a
            href={PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-[#0D1F14] border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0D1F14] font-bold py-3 px-5 rounded-lg text-sm transition-all duration-200 flex items-center gap-2"
          >
            Download Sample Report
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* ── DISCLAIMER ── */}
        <p className="text-[#4A6A54] text-xs leading-relaxed text-center">
          The 360° Method is a proactive maintenance service, not a licensed home inspection under RCW 18.280.
          Handy Pioneers cannot be held liable for issues not identified during an assessment.
          Membership is a recurring monthly subscription. Cancel anytime with 30 days notice.
          This offer is available one time only and will not be shown again after this session.
        </p>
      </div>

      <Footer />
    </div>
  );
}
