/**
 * Method360Membership.tsx — /360-method/membership
 * The 360° Maintenance Membership — front-end funnel/sales page.
 * 3-tier selection + Baseline Walkthrough scheduling integrated into enrollment.
 * Per project knowledge: sales pages are front-end funnels only.
 * Payment/backend (Stripe recurring subscription) to be added when backend is enabled.
 */

import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import {
  Shield, CheckCircle, ArrowRight, Calendar, FileText,
  Phone, Star, TrendingUp, Clock, Home, Zap, Crown
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const tiers = [
  {
    id: "essential",
    icon: Home,
    name: "Essential",
    tagline: "Your foundation.",
    price: "$59/mo",
    description: "The 360° Method baseline — your home assessed, documented, and on a prioritized roadmap.",
    features: [
      "Annual 360° Baseline Walkthrough",
      "NOW / SOON / WAIT Priority Roadmap",
      "Complete Home Health Record",
      "Annual Property Score",
      "Priority scheduling over non-members",
    ],
    highlight: false,
    color: "oklch(0.32 0.07 160)",
    bg: "oklch(1 0 0)",
    border: "oklch(0.85 0.015 80)",
  },
  {
    id: "managed",
    icon: Zap,
    name: "Managed",
    tagline: "Your home on autopilot.",
    price: "$99/mo",
    description: "We don't just give you the roadmap — we execute it. Your NOW and SOON items are scheduled and completed on a cadence we manage.",
    features: [
      "Everything in Essential",
      "Scheduled execution of NOW items",
      "Quarterly maintenance check-ins",
      "Direct access to Marcin",
      "Coordination of all licensed trade partners",
      "Annual roadmap revision",
    ],
    highlight: true,
    color: "white",
    bg: "oklch(0.22 0.07 160)",
    border: "oklch(0.22 0.07 160)",
  },
  {
    id: "premier",
    icon: Crown,
    name: "Premier",
    tagline: "Full asset stewardship.",
    price: "$149/mo",
    description: "The complete managed asset program. Your home treated with the same proactive stewardship applied to commercial investment properties.",
    features: [
      "Everything in Managed",
      "Bi-annual Baseline Walkthrough",
      "Strategic upgrade planning (ADVANCE phase)",
      "Pre-listing preparation advisory",
      "Emergency priority response",
      "Dedicated home file with full project history",
    ],
    highlight: false,
    color: "oklch(0.22 0.07 160)",
    bg: "oklch(0.98 0.008 65)",
    border: "oklch(0.65 0.14 65)",
  },
];

export default function Method360Membership() {
  const [, navigate] = useLocation();
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", address: "", sqft: "", yearBuilt: "", notes: ""
  });

  useEffect(() => {
    document.title = "360° Maintenance Membership | Handy Pioneers";
    window.scrollTo({ top: 0 });
  }, []);

  const selectedTierData = tiers.find(t => t.id === selectedTier);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tierLabel = selectedTierData?.name ?? "Not selected";
    const subject = encodeURIComponent(`360° Membership Enrollment — ${tierLabel} Tier`);
    const body = encodeURIComponent(
      `Membership Tier: ${tierLabel} (${selectedTierData?.price ?? ""})\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nProperty Address: ${formData.address}\nApprox. Sq Ft: ${formData.sqft}\nYear Built: ${formData.yearBuilt}\nNotes: ${formData.notes}`
    );
    window.open(`mailto:hello@handypioneers.com?subject=${subject}&body=${body}`);
    setSubmitted(true);
  };

  const includes = [
    { icon: Calendar, title: "Scheduled Execution", description: "Your NOW and SOON priority items are worked through on a schedule we manage — so you never have to remember, coordinate, or chase a contractor again." },
    { icon: FileText, title: "Annual Re-Assessment", description: "Your home's health record is updated every year. Your roadmap is revised as conditions change. Your property score is tracked over time." },
    { icon: Star, title: "Priority Scheduling", description: "Members are never placed in a general queue. When something comes up, you're first." },
    { icon: Phone, title: "Direct Access to Marcin", description: "A dedicated point of contact for every question, concern, or new project — coordinating the right trade partners so you never manage multiple contractors." },
    { icon: FileText, title: "Complete Home Record", description: "A running digital record of every assessment, every project, and every system in your home — available whenever you need it." },
    { icon: TrendingUp, title: "Annual Property Score", description: "Track your home's condition improving over time with an annual score that documents the progress of your investment." },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.98 0.005 80)" }}>
      <Navbar />

      {/* ─── Hero ─── */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.22 0.07 160)" }}>
        <div className="container max-w-3xl">
          <button
            onClick={() => navigate("/360-method")}
            className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest mb-6 hover:opacity-70 transition-opacity bg-transparent border-0 cursor-pointer"
            style={{ color: "oklch(0.80 0.10 65)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            ← Back to The 360° Method
          </button>
          <div
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-5"
            style={{ backgroundColor: "oklch(0.65 0.14 65)", color: "white", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            <Shield size={12} /> The Membership
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-5"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            The 360° Maintenance Membership
          </h1>
          <p
            className="text-xl leading-relaxed mb-4"
            style={{ color: "rgba(255,255,255,0.85)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Your Home. Managed. Protected. Advancing.
          </p>
          <p
            className="text-base leading-relaxed"
            style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'Source Sans 3', sans-serif", maxWidth: "560px" }}
          >
            The same level of proactive stewardship that owners of commercial properties and
            investment portfolios take for granted — applied to your home. Your Baseline Walkthrough
            is scheduled the moment you enroll.
          </p>
        </div>
      </section>

      {/* ─── The Problem ─── */}
      <section className="py-16" style={{ backgroundColor: "oklch(0.96 0.008 80)" }}>
        <div className="container max-w-3xl">
          <blockquote
            className="text-xl md:text-2xl leading-relaxed italic text-center"
            style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.30 0.07 160)" }}
          >
            "Most homeowners take the roadmap, set good intentions, and find themselves six months
            later with the same list — plus a few new items that escalated while they waited."
          </blockquote>
          <p
            className="text-center mt-4 text-sm font-semibold uppercase tracking-widest"
            style={{ color: "oklch(0.65 0.14 65)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            The 360° Membership was designed to prevent exactly that.
          </p>
        </div>
      </section>

      {/* ─── What's Included ─── */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.98 0.005 80)" }}>
        <div className="container max-w-5xl">
          <h2
            className="text-3xl md:text-4xl font-bold mb-3 text-center"
            style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
          >
            What You Can Expect From Membership
          </h2>
          <p
            className="text-center text-base mb-12"
            style={{ color: "oklch(0.50 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            This is not a maintenance contract. It is a managed asset program.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {includes.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="rounded-xl p-6 border flex flex-col gap-3"
                  style={{
                    backgroundColor: "oklch(1 0 0)",
                    borderColor: "oklch(0.88 0.015 80)",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "oklch(0.22 0.07 160)" }}
                  >
                    <Icon size={18} color="white" />
                  </div>
                  <h3
                    className="text-base font-bold"
                    style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.42 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Lifestyle Image ─── */}
      <section className="py-0 overflow-hidden">
        <div className="relative">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/360-membership-lifestyle-4YkLfTBpJGEjE7JVxZdMTW.webp"
            alt="Affluent homeowners relaxing in their beautifully maintained Pacific Northwest home, confident their property is protected and advancing in value"
            className="w-full object-cover"
            style={{ maxHeight: "480px", objectPosition: "center 30%" }}
          />
          <div
            className="absolute inset-0 flex items-center"
            style={{ background: "linear-gradient(to right, rgba(14,26,20,0.85) 0%, rgba(14,26,20,0.50) 50%, transparent 100%)" }}
          >
            <div className="container">
              <div className="max-w-lg">
                <p
                  className="text-3xl md:text-4xl font-bold text-white mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  This is what it feels like when your home is managed.
                </p>
                <p className="text-base" style={{ color: "rgba(255,255,255,0.70)", fontFamily: "'Source Sans 3', sans-serif" }}>
                  No deferred maintenance. No contractor coordination. No surprises.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Tier Selection ─── */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.96 0.008 80)" }}>
        <div className="container max-w-5xl">
          <h2
            className="text-3xl md:text-4xl font-bold mb-3 text-center"
            style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
          >
            Choose Your Membership Tier
          </h2>
          <p
            className="text-center text-base mb-12"
            style={{ color: "oklch(0.50 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Select the level of stewardship that fits your home and your goals.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {tiers.map((tier) => {
              const Icon = tier.icon;
              const isSelected = selectedTier === tier.id;
              return (
                <button
                  key={tier.id}
                  onClick={() => setSelectedTier(tier.id)}
                  className="rounded-2xl p-7 border-2 text-left flex flex-col gap-4 transition-all duration-200 cursor-pointer w-full"
                  style={{
                    backgroundColor: tier.bg,
                    borderColor: isSelected ? "oklch(0.65 0.14 65)" : tier.border,
                    boxShadow: isSelected
                      ? "0 0 0 3px oklch(0.65 0.14 65 / 0.25), 0 8px 32px rgba(0,0,0,0.12)"
                      : tier.highlight
                      ? "0 8px 32px rgba(0,0,0,0.18)"
                      : "0 2px 12px rgba(0,0,0,0.04)",
                    transform: isSelected ? "translateY(-2px)" : "none",
                  }}
                >
                  {tier.highlight && (
                    <div
                      className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded self-start"
                      style={{ backgroundColor: "oklch(0.65 0.14 65)", color: "white", fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      Most Popular
                    </div>
                  )}
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: tier.highlight ? "rgba(255,255,255,0.15)" : "oklch(0.22 0.07 160)" }}
                  >
                    <Icon size={18} color={tier.highlight ? "white" : "white"} />
                  </div>
                  <div>
                    <div
                      className="text-xs font-bold uppercase tracking-widest mb-1"
                      style={{ color: tier.highlight ? "rgba(255,255,255,0.55)" : "oklch(0.65 0.14 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      {tier.tagline}
                    </div>
                    <h3
                      className="text-2xl font-bold mb-1"
                      style={{ fontFamily: "'Playfair Display', serif", color: tier.color }}
                    >
                      {tier.name}
                    </h3>
                    <div
                      className="text-xl font-bold mb-3"
                      style={{ color: tier.highlight ? "oklch(0.80 0.10 65)" : "oklch(0.65 0.14 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      {tier.price}
                    </div>
                    <p
                      className="text-sm leading-relaxed mb-4"
                      style={{ color: tier.highlight ? "rgba(255,255,255,0.70)" : "oklch(0.42 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      {tier.description}
                    </p>
                  </div>
                  <ul className="space-y-2 flex-1">
                    {tier.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle
                          size={14}
                          className="shrink-0 mt-0.5"
                          style={{ color: tier.highlight ? "oklch(0.80 0.10 65)" : "oklch(0.45 0.08 160)" }}
                        />
                        <span
                          className="text-xs leading-relaxed"
                          style={{ color: tier.highlight ? "rgba(255,255,255,0.75)" : "oklch(0.42 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {isSelected && (
                    <div
                      className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mt-2"
                      style={{ color: "oklch(0.65 0.14 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      <CheckCircle size={14} /> Selected
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          {selectedTier && (
            <div className="text-center mt-8">
              <button
                onClick={() => {
                  const el = document.getElementById("enrollment-form");
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded font-bold uppercase tracking-wide text-sm text-white transition-all hover:opacity-90"
                style={{ backgroundColor: "oklch(0.65 0.14 65)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Continue with {selectedTierData?.name} — {selectedTierData?.price} <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ─── The Alternative ─── */}
      <section className="py-16" style={{ backgroundColor: "oklch(0.98 0.005 80)" }}>
        <div className="container max-w-3xl">
          <h2
            className="text-3xl font-bold mb-6"
            style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
          >
            The Alternative
          </h2>
          <p
            className="text-base leading-relaxed mb-4"
            style={{ color: "oklch(0.40 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            You could manage this yourself. Coordinate individual contractors for each item. Follow
            up on scheduling. Vet new vendors each time a new trade is needed. Track what was done
            and what's still outstanding.
          </p>
          <p
            className="text-base leading-relaxed font-semibold"
            style={{ color: "oklch(0.30 0.07 160)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Or you could hand it to a team that already knows your home, already has your roadmap,
            and already has the relationships to execute every item on it.
          </p>
        </div>
      </section>

      {/* ─── Enrollment Form ─── */}
      <section id="enrollment-form" className="py-20" style={{ backgroundColor: "oklch(0.22 0.07 160)" }}>
        <div className="container max-w-3xl">
          {/* Scarcity note */}
          <div
            className="rounded-xl p-5 border mb-10"
            style={{
              backgroundColor: "rgba(200,137,42,0.15)",
              borderColor: "oklch(0.65 0.14 65)",
            }}
          >
            <div className="flex items-start gap-3">
              <Clock size={18} className="shrink-0" style={{ color: "oklch(0.80 0.10 65)", marginTop: "2px" }} />
              <p
                className="text-sm leading-relaxed"
                style={{ color: "oklch(0.90 0.06 65)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Membership is limited. We accept a finite number of homes into the program each
                quarter to ensure every client receives the level of attention the framework requires.
              </p>
            </div>
          </div>

          {!submitted ? (
            <div
              className="rounded-2xl p-8 border"
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                borderColor: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
              }}
            >
              <h3
                className="text-2xl font-bold text-white mb-1"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {selectedTierData
                  ? `Enroll — ${selectedTierData.name} Tier (${selectedTierData.price})`
                  : "Inquire About Membership"}
              </h3>
              <p
                className="text-sm mb-6"
                style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                {selectedTierData
                  ? "Submit your details below. Marcin will contact you within one business day to confirm enrollment and schedule your Baseline Walkthrough — the first step of your membership."
                  : "Select a tier above, then complete this form. Marcin will reach out within one business day to confirm availability and schedule your Baseline Walkthrough."}
              </p>

              {/* Tier selector inline if none chosen */}
              {!selectedTier && (
                <div className="flex flex-wrap gap-3 mb-6">
                  {tiers.map(t => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSelectedTier(t.id)}
                      className="px-4 py-2 rounded-lg border text-sm font-semibold transition-all"
                      style={{
                        borderColor: "rgba(255,255,255,0.25)",
                        color: "rgba(255,255,255,0.80)",
                        backgroundColor: "rgba(255,255,255,0.08)",
                        fontFamily: "'Source Sans 3', sans-serif",
                      }}
                    >
                      {t.name} — {t.price}
                    </button>
                  ))}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Source Sans 3', sans-serif" }}>Full Name *</label>
                    <input required className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 bg-white/10 text-white placeholder-white/30" style={{ borderColor: "rgba(255,255,255,0.20)", fontFamily: "'Source Sans 3', sans-serif" }} value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Source Sans 3', sans-serif" }}>Email Address *</label>
                    <input required type="email" className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 bg-white/10 text-white placeholder-white/30" style={{ borderColor: "rgba(255,255,255,0.20)", fontFamily: "'Source Sans 3', sans-serif" }} value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Source Sans 3', sans-serif" }}>Phone Number *</label>
                    <input required type="tel" className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 bg-white/10 text-white placeholder-white/30" style={{ borderColor: "rgba(255,255,255,0.20)", fontFamily: "'Source Sans 3', sans-serif" }} value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Source Sans 3', sans-serif" }}>Property Address *</label>
                    <input required className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 bg-white/10 text-white placeholder-white/30" style={{ borderColor: "rgba(255,255,255,0.20)", fontFamily: "'Source Sans 3', sans-serif" }} value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Source Sans 3', sans-serif" }}>Approx. Square Footage</label>
                    <input className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 bg-white/10 text-white placeholder-white/30" style={{ borderColor: "rgba(255,255,255,0.20)", fontFamily: "'Source Sans 3', sans-serif" }} placeholder="e.g. 2,400" value={formData.sqft} onChange={e => setFormData({ ...formData, sqft: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Source Sans 3', sans-serif" }}>Year Built</label>
                    <input className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 bg-white/10 text-white placeholder-white/30" style={{ borderColor: "rgba(255,255,255,0.20)", fontFamily: "'Source Sans 3', sans-serif" }} placeholder="e.g. 1998" value={formData.yearBuilt} onChange={e => setFormData({ ...formData, yearBuilt: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Source Sans 3', sans-serif" }}>Anything You'd Like Us to Know</label>
                  <textarea rows={3} className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 resize-none bg-white/10 text-white placeholder-white/30" style={{ borderColor: "rgba(255,255,255,0.20)", fontFamily: "'Source Sans 3', sans-serif" }} placeholder="Current condition, past work done, goals for the home..." value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded font-bold uppercase tracking-wide text-sm transition-all hover:opacity-90"
                  style={{ backgroundColor: "oklch(0.65 0.14 65)", color: "white", fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  {selectedTierData ? `Enroll in ${selectedTierData.name}` : "Submit Inquiry"} <ArrowRight size={16} />
                </button>
                <p
                  className="text-xs"
                  style={{ color: "rgba(255,255,255,0.40)", fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  By submitting, you agree to be contacted by Handy Pioneers regarding your membership
                  inquiry. Msg &amp; data rates may apply. Reply STOP to opt out of SMS.
                </p>
              </form>
            </div>
          ) : (
            <div
              className="rounded-2xl p-10 border text-center"
              style={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.15)" }}
            >
              <CheckCircle size={48} className="mx-auto mb-4" style={{ color: "oklch(0.65 0.14 65)" }} />
              <h3
                className="text-2xl font-bold text-white mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Enrollment Request Received
              </h3>
              <p
                className="text-base"
                style={{ color: "rgba(255,255,255,0.70)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Marcin will be in touch within one business day to confirm your{" "}
                {selectedTierData?.name ?? ""} membership and schedule your Baseline Walkthrough.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
