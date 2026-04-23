/**
 * Method360Referral.tsx — /360-method/referral
 * Path 3: "I need a deep dive or am preparing to list."
 * Inspector referral + then Path 1 execution.
 */

import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Users, CheckCircle, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Method360Referral() {
  const [, navigate] = useLocation();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", address: "", timeline: "", notes: "" });

  useEffect(() => {
    document.title = "360° Inspector Referral | Handy Pioneers";
    window.scrollTo({ top: 0 });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("360° Inspector Referral Request");
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nProperty Address: ${formData.address}\nTimeline: ${formData.timeline}\nNotes: ${formData.notes}`
    );
    window.open(`mailto:hello@handypioneers.com?subject=${subject}&body=${body}`);
    sessionStorage.setItem("360_offer_origin", "/360-method/referral");
    sessionStorage.setItem("360_offer_name", formData.name);
    navigate("/360-method/offer");
  };

  const steps = [
    { number: "01", title: "We Connect You", description: "We refer you to a vetted, licensed home inspector from our professional network — someone we trust to deliver a thorough, reliable report." },
    { number: "02", title: "Inspector Completes Assessment", description: "The licensed inspector conducts a comprehensive, legally documented assessment of your home." },
    { number: "03", title: "We Execute Path 1", description: "Once the report is complete, we translate it into your 360° Priority Roadmap and stand ready to execute every item on it." },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.98 0.005 80)" }}>
      <Navbar />

      {/* Header */}
      <section className="py-16" style={{ backgroundColor: "oklch(0.22 0.07 160)" }}>
        <div className="container max-w-3xl">
          <button
            onClick={() => navigate("/360-method")}
            className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest mb-6 hover:opacity-70 transition-opacity bg-transparent border-0 cursor-pointer"
            style={{ color: "oklch(0.80 0.10 65)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            ← Back to The 360° Method
          </button>
          <div
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4"
            style={{ backgroundColor: "oklch(0.45 0.10 160)", color: "white", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            <Users size={12} /> Path 3
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            The 360° Inspector Referral
          </h1>
          <p
            className="text-lg leading-relaxed"
            style={{ color: "rgba(255,255,255,0.75)", fontFamily: "'Source Sans 3', sans-serif", maxWidth: "560px" }}
          >
            For homeowners who want a comprehensive, legally documented assessment — or who are
            preparing to list. We connect you with a vetted licensed inspector, then execute the
            full 360° Roadmap Generator on the results.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16" style={{ backgroundColor: "oklch(0.98 0.005 80)" }}>
        <div className="container max-w-4xl">
          <h2
            className="text-3xl font-bold mb-10"
            style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
          >
            How the Referral Works
          </h2>
          <div className="space-y-4 mb-12">
            {steps.map((step) => (
              <div
                key={step.number}
                className="flex gap-6 rounded-xl p-6 border"
                style={{ backgroundColor: "oklch(1 0 0)", borderColor: "oklch(0.88 0.015 80)" }}
              >
                <div
                  className="text-3xl font-bold shrink-0"
                  style={{ color: "oklch(0.88 0.015 80)", fontFamily: "'Playfair Display', serif", lineHeight: 1 }}
                >
                  {step.number}
                </div>
                <div>
                  <h3
                    className="text-lg font-bold mb-1"
                    style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.42 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ─── Referral Image ─── */}
          <div className="rounded-2xl overflow-hidden mb-10 relative" style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.12)" }}>
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/360-referral-handshake-L4abEVnnoUQFbb9ozAJnnp.webp"
              alt="A licensed home inspector and Handy Pioneers contractor shaking hands in front of a Pacific Northwest home"
              className="w-full object-cover"
              style={{ maxHeight: "340px", objectPosition: "center 25%" }}
            />
            <div
              className="absolute inset-0 flex items-end"
              style={{ background: "linear-gradient(to top, rgba(14,26,20,0.80) 0%, transparent 55%)" }}
            >
              <div className="container pb-8">
                <p
                  className="text-xl md:text-2xl font-bold text-white max-w-md"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  A trusted network. One point of contact.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          {!submitted ? (
            <div
              className="rounded-2xl p-8 border"
              style={{
                backgroundColor: "oklch(1 0 0)",
                borderColor: "oklch(0.88 0.015 80)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
              }}
            >
              <h3
                className="text-2xl font-bold mb-2"
                style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
              >
                Request an Inspector Referral
              </h3>
              <p
                className="text-sm mb-6"
                style={{ color: "oklch(0.50 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Tell us about your property and timeline. We'll match you with the right inspector
                and coordinate the next steps.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "oklch(0.40 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}>Full Name *</label>
                    <input required className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2" style={{ borderColor: "oklch(0.85 0.015 80)", fontFamily: "'Source Sans 3', sans-serif" }} value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "oklch(0.40 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}>Email Address *</label>
                    <input required type="email" className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2" style={{ borderColor: "oklch(0.85 0.015 80)", fontFamily: "'Source Sans 3', sans-serif" }} value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "oklch(0.40 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}>Phone Number *</label>
                    <input required type="tel" className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2" style={{ borderColor: "oklch(0.85 0.015 80)", fontFamily: "'Source Sans 3', sans-serif" }} value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "oklch(0.40 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}>Property Address *</label>
                    <input required className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2" style={{ borderColor: "oklch(0.85 0.015 80)", fontFamily: "'Source Sans 3', sans-serif" }} value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "oklch(0.40 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}>Your Timeline</label>
                  <input className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2" style={{ borderColor: "oklch(0.85 0.015 80)", fontFamily: "'Source Sans 3', sans-serif" }} placeholder="e.g. Listing in 60 days, or No rush — planning ahead" value={formData.timeline} onChange={e => setFormData({ ...formData, timeline: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "oklch(0.40 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}>Additional Notes</label>
                  <textarea rows={3} className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 resize-none" style={{ borderColor: "oklch(0.85 0.015 80)", fontFamily: "'Source Sans 3', sans-serif" }} placeholder="Any context about the property or your goals..." value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded font-bold uppercase tracking-wide text-sm text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: "oklch(0.45 0.10 160)", fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  Request My Referral <ArrowRight size={16} />
                </button>
              </form>
            </div>
          ) : (
            <div
              className="rounded-2xl p-10 border text-center"
              style={{ backgroundColor: "oklch(0.96 0.02 160)", borderColor: "oklch(0.80 0.06 160)" }}
            >
              <CheckCircle size={48} className="mx-auto mb-4" style={{ color: "oklch(0.45 0.08 160)" }} />
              <h3
                className="text-2xl font-bold mb-2"
                style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
              >
                Request Received
              </h3>
              <p
                className="text-base"
                style={{ color: "oklch(0.42 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Marcin will be in touch within one business day to match you with the right
                inspector for your property and timeline.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
