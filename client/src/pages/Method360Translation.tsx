/**
 * Method360Translation.tsx — /360-method/translation
 * Path 1: "I have a recent inspection report."
 * The 360° Roadmap Generator — upload report, receive NOW/SOON/WAIT roadmap.
 * This is a front-end funnel page. Form submission triggers email to Marcin.
 */

import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { FileText, Upload, CheckCircle, ArrowRight, Clock, AlertTriangle, Eye, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Method360Translation() {
  const [, navigate] = useLocation();
  const [submitted, setSubmitted] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", address: "", notes: "" });

  useEffect(() => {
    document.title = "360° Roadmap Generator | Handy Pioneers";
    window.scrollTo({ top: 0 });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Front-end funnel: mailto fallback until backend is connected
    const subject = encodeURIComponent("360° Roadmap Generator Request");
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nProperty Address: ${formData.address}\nNotes: ${formData.notes}\n\n[Inspection report will be attached separately]`
    );
    window.open(`mailto:hello@handypioneers.com?subject=${subject}&body=${body}`);
    sessionStorage.setItem("360_offer_origin", "/360-method/translation");
    sessionStorage.setItem("360_offer_name", formData.name);
    navigate("/360-method/offer");
  };

  const roadmapItems = [
    {
      label: "NOW",
      color: "oklch(0.55 0.18 25)",
      bg: "oklch(0.97 0.04 25)",
      border: "oklch(0.80 0.12 25)",
      icon: AlertTriangle,
      description: "Items requiring immediate attention to prevent safety risks, structural deterioration, or compounding damage.",
    },
    {
      label: "SOON",
      color: "oklch(0.65 0.14 65)",
      bg: "oklch(0.97 0.04 65)",
      border: "oklch(0.85 0.10 65)",
      icon: Clock,
      description: "Items that are not urgent today but will become costly if deferred beyond the next 6–18 months.",
    },
    {
      label: "WAIT",
      color: "oklch(0.45 0.08 160)",
      bg: "oklch(0.96 0.02 160)",
      border: "oklch(0.80 0.06 160)",
      icon: Eye,
      description: "Items that are monitored, documented, and revisited at your next assessment cycle.",
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.98 0.005 80)" }}>
      <Navbar />

      {/* ─── Page Header ─── */}
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
            style={{ backgroundColor: "oklch(0.65 0.14 65)", color: "white", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            <FileText size={12} /> Path 1
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            The 360° Roadmap Generator
          </h1>
          <p
            className="text-lg leading-relaxed"
            style={{ color: "rgba(255,255,255,0.75)", fontFamily: "'Source Sans 3', sans-serif", maxWidth: "560px" }}
          >
            You have a home inspection report. We translate it into a clear, prioritized
            NOW / SOON / WAIT roadmap — so you know exactly what to address and in what order.
          </p>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="py-16" style={{ backgroundColor: "oklch(0.98 0.005 80)" }}>
        <div className="container max-w-4xl">
          <h2
            className="text-3xl font-bold mb-10 text-center"
            style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
          >
            Your Roadmap, Delivered in Three Tiers
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {roadmapItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="rounded-xl p-6 border"
                  style={{ backgroundColor: item.bg, borderColor: item.border }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Icon size={20} color={item.color} />
                    <span
                      className="text-lg font-bold"
                      style={{ color: item.color, fontFamily: "'Playfair Display', serif" }}
                    >
                      {item.label}
                    </span>
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.38 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* ─── Roadmap Visual ─── */}
          <div className="rounded-2xl overflow-hidden mb-10 relative" style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.12)" }}>
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/360-roadmap-desk-EVznZqGHziJ6M8u8QQzanJ.webp"
              alt="A homeowner reviewing their 360° Priority Roadmap — a color-coded home assessment report with NOW, SOON, and WAIT sections"
              className="w-full object-cover"
              style={{ maxHeight: "340px", objectPosition: "center 30%" }}
            />
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: "linear-gradient(to right, rgba(14,26,20,0.80) 0%, rgba(14,26,20,0.30) 60%, transparent 100%)" }}
            >
              <div className="container">
                <p
                  className="text-2xl md:text-3xl font-bold text-white max-w-sm"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Clarity replaces confusion.
                </p>
                <p className="text-sm mt-2" style={{ color: "rgba(255,255,255,0.70)", fontFamily: "'Source Sans 3', sans-serif" }}>
                  Your report, translated into a clear action plan.
                </p>
              </div>
            </div>
          </div>

          {/* ─── Disclaimer ─── */}
          <div
            className="rounded-xl p-5 border mb-12"
            style={{
              backgroundColor: "oklch(1 0 0)",
              borderColor: "oklch(0.85 0.015 80)",
              borderLeft: "4px solid oklch(0.65 0.14 65)",
            }}
          >
            <p
              className="text-xs font-bold uppercase tracking-widest mb-1"
              style={{ color: "oklch(0.65 0.14 65)", fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Important Disclaimer
            </p>
            <p
              className="text-xs leading-relaxed"
              style={{ color: "oklch(0.45 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}
            >
              The 360° Roadmap Generator is a proactive maintenance advisory service. It is not
              a legally binding real estate home inspection. Handy Pioneers does not assume
              liability for conditions not identified during the roadmap process. This service
              is designed to work in partnership with your licensed inspection report, not as a
              substitute for professional inspection services.
            </p>
          </div>

          {/* ─── Sample Report Download ─── */}
          <div
            className="rounded-2xl p-6 border flex flex-col md:flex-row items-center gap-5 mb-10"
            style={{ backgroundColor: "oklch(0.22 0.07 160)", borderColor: "oklch(0.32 0.07 160)" }}
          >
            <div className="flex-1">
              <p
                className="text-xs font-bold uppercase tracking-widest mb-1"
                style={{ color: "oklch(0.65 0.14 65)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Sample Deliverable
              </p>
              <h3
                className="text-lg font-bold text-white mb-1"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                See the actual report before you decide
              </h3>
              <p
                className="text-sm"
                style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                This is what you receive within 5 business days of submitting your inspection report
                — a full NOW / SOON / WAIT priority roadmap for your home.
              </p>
            </div>
            <button
              onClick={() => setShowPdfModal(true)}
              className="shrink-0 font-bold py-3 px-5 rounded-lg text-sm transition-all duration-200 flex items-center gap-2 cursor-pointer border-0"
              style={{
                backgroundColor: "oklch(0.65 0.14 65)",
                color: "oklch(0.10 0.04 80)",
                fontFamily: "'Source Sans 3', sans-serif",
              }}
            >
              Preview Sample Report →
            </button>
          </div>

          {/* ─── Form ─── */}
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
                Generate Your 360° Roadmap
              </h3>
              <p
                className="text-sm mb-6"
                style={{ color: "oklch(0.50 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Submit your details below. We'll reply within one business day to collect your
                inspection report and begin your roadmap.
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
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "oklch(0.40 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}>Phone Number</label>
                    <input type="tel" className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2" style={{ borderColor: "oklch(0.85 0.015 80)", fontFamily: "'Source Sans 3', sans-serif" }} value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "oklch(0.40 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}>Property Address *</label>
                    <input required className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2" style={{ borderColor: "oklch(0.85 0.015 80)", fontFamily: "'Source Sans 3', sans-serif" }} value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "oklch(0.40 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}>Additional Notes</label>
                  <textarea rows={3} className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 resize-none" style={{ borderColor: "oklch(0.85 0.015 80)", fontFamily: "'Source Sans 3', sans-serif" }} placeholder="Any context about the inspection or your priorities..." value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded font-bold uppercase tracking-wide text-sm text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: "oklch(0.65 0.14 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  <Upload size={16} /> Generate Your 360° Roadmap <ArrowRight size={16} />
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
                Marcin will be in touch within one business day to collect your inspection report
                and begin your 360° Priority Roadmap.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ─── What's Next: Membership CTA ─── */}
      <section className="py-16" style={{ backgroundColor: "oklch(0.22 0.07 160)" }}>
        <div className="container max-w-3xl text-center">
          <div
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-5"
            style={{ backgroundColor: "oklch(0.65 0.14 65)", color: "white", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            What Happens After Your Roadmap
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Don't Let the Roadmap Sit in a Drawer.
          </h2>
          <p
            className="text-base leading-relaxed mb-8 mx-auto"
            style={{ color: "rgba(255,255,255,0.70)", fontFamily: "'Source Sans 3', sans-serif", maxWidth: "520px" }}
          >
            Most homeowners receive a prioritized roadmap, set good intentions, and find themselves
            six months later with the same list — plus a few new items that escalated while they
            waited. The 360° Maintenance Membership puts your NOW, SOON, and WAIT items on a
            managed schedule. We execute. You own a better asset.
          </p>
          <button
            onClick={() => navigate("/membership")}
            className="inline-flex items-center gap-2 px-8 py-4 rounded font-bold uppercase tracking-wide text-sm transition-all hover:opacity-90"
            style={{ backgroundColor: "oklch(0.65 0.14 65)", color: "white", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Explore Membership <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* ─── PDF Preview Modal ─── */}
      {showPdfModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
          onClick={() => setShowPdfModal(false)}
        >
          <div
            className="relative w-full max-w-4xl rounded-2xl overflow-hidden flex flex-col"
            style={{ backgroundColor: "oklch(0.15 0.05 160)", maxHeight: "90vh", boxShadow: "0 24px 80px rgba(0,0,0,0.50)" }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              className="flex items-center justify-between px-6 py-4 shrink-0"
              style={{ borderBottom: "1px solid oklch(0.25 0.05 160)" }}
            >
              <div>
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-0.5"
                  style={{ color: "oklch(0.65 0.14 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  Sample Deliverable
                </p>
                <h3
                  className="text-lg font-bold text-white"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  360° Priority Roadmap — Sample Report
                </h3>
              </div>
              <button
                onClick={() => setShowPdfModal(false)}
                className="flex items-center justify-center w-9 h-9 rounded-full border-0 cursor-pointer transition-opacity hover:opacity-70"
                style={{ backgroundColor: "oklch(0.25 0.05 160)", color: "white" }}
                aria-label="Close preview"
              >
                <X size={18} />
              </button>
            </div>
            {/* PDF Embed */}
            <div className="flex-1 overflow-hidden" style={{ minHeight: 0 }}>
              <iframe
                src="https://docs.google.com/viewer?url=https%3A%2F%2Fd2xsxph8kpxj0f.cloudfront.net%2F310519663386531688%2FPMFhFJDf55eBmmtmS9ai7o%2F360-priority-roadmap-sample_945b4356.pdf&embedded=true"
                title="360° Priority Roadmap Sample Report"
                className="w-full h-full"
                style={{ minHeight: "60vh", border: "none" }}
              />
            </div>
            {/* Modal Footer */}
            <div
              className="flex items-center justify-between px-6 py-4 shrink-0"
              style={{ borderTop: "1px solid oklch(0.25 0.05 160)" }}
            >
              <p
                className="text-xs"
                style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                This is what you receive within 5 business days of submitting your report.
              </p>
              <button
                onClick={() => setShowPdfModal(false)}
                className="text-sm font-bold px-5 py-2 rounded-lg border-0 cursor-pointer transition-opacity hover:opacity-80"
                style={{ backgroundColor: "oklch(0.65 0.14 65)", color: "oklch(0.10 0.04 80)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
