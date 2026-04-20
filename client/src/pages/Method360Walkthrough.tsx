/**
 * Method360Walkthrough.tsx — /360-method/walkthrough
 * Path 2: "I don't have a recent inspection report."
 * The 360° Baseline Walkthrough — schedule a 2-3 hour proactive maintenance assessment.
 */

import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { ClipboardList, CheckCircle, ArrowRight, Home, FileSearch, MapPin, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Method360Walkthrough() {
  const [, navigate] = useLocation();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", address: "", sqft: "", yearBuilt: "", notes: "" });

  useEffect(() => {
    document.title = "360° Baseline Walkthrough | Handy Pioneers";
    window.scrollTo({ top: 0 });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("360° Baseline Walkthrough Request");
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nProperty Address: ${formData.address}\nApprox. Sq Ft: ${formData.sqft}\nYear Built: ${formData.yearBuilt}\nNotes: ${formData.notes}`
    );
    window.open(`mailto:hello@handypioneers.com?subject=${subject}&body=${body}`);
    setSubmitted(true);
  };

  const includes = [
    { icon: Home, text: "Comprehensive 2–3 hour on-site proactive maintenance assessment" },
    { icon: FileSearch, text: "Detailed written report documenting every system and surface" },
    { icon: MapPin, text: "Prioritized NOW / SOON / WAIT action roadmap" },
    { icon: Clock, text: "Annual re-assessment to track your home's condition over time" },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.98 0.005 80)" }}>
      <Navbar />

      {/* ─── Header ─── */}
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
            style={{ backgroundColor: "oklch(0.32 0.07 160)", color: "white", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            <ClipboardList size={12} /> Path 2
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            The 360° Baseline Walkthrough
          </h1>
          <p
            className="text-lg leading-relaxed"
            style={{ color: "rgba(255,255,255,0.75)", fontFamily: "'Source Sans 3', sans-serif", maxWidth: "560px" }}
          >
            A comprehensive on-site assessment that establishes your home's permanent health
            record — the foundation of everything the 360° Method delivers.
          </p>
        </div>
      </section>

      {/* ─── What's Included ─── */}
      <section className="py-16" style={{ backgroundColor: "oklch(0.98 0.005 80)" }}>
        <div className="container max-w-4xl">
          <h2
            className="text-3xl font-bold mb-8"
            style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
          >
            What the Walkthrough Includes
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {includes.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-xl p-5 border"
                  style={{ backgroundColor: "oklch(1 0 0)", borderColor: "oklch(0.88 0.015 80)" }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "oklch(0.32 0.07 160)" }}
                  >
                    <Icon size={18} color="white" />
                  </div>
                  <p
                    className="text-sm leading-relaxed pt-1"
                    style={{ color: "oklch(0.38 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>

          {/* ─── Walkthrough Image ─── */}
          <div className="rounded-2xl overflow-hidden mb-10 relative" style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.12)" }}>
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/360-walkthrough-inspection-HvVKXnbzbnfPNTu7juk3RW.webp"
              alt="Marcin conducting a 360° Baseline Walkthrough with a homeowner in a Pacific Northwest craftsman home"
              className="w-full object-cover"
              style={{ maxHeight: "380px", objectPosition: "center 20%" }}
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
                  Every system. Every surface. Documented.
                </p>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div
            className="rounded-xl p-5 border mb-10"
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
              The 360° Baseline Walkthrough is a proactive maintenance assessment conducted by a
              trained home maintenance technician. It is <strong>not a legally binding real estate
              home inspection</strong> and does not replace the services of a licensed home
              inspector. Handy Pioneers does not assume liability for conditions not identified
              during the walkthrough. For legal inspection purposes — including real estate
              transactions — we recommend engaging a licensed home inspector.
            </p>
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
                Schedule Your Baseline Walkthrough
              </h3>
              <p
                className="text-sm mb-6"
                style={{ color: "oklch(0.50 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Submit your details below. Marcin will contact you within one business day to
                confirm your assessment date.
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
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "oklch(0.40 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}>Approx. Square Footage</label>
                    <input className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2" style={{ borderColor: "oklch(0.85 0.015 80)", fontFamily: "'Source Sans 3', sans-serif" }} placeholder="e.g. 2,400" value={formData.sqft} onChange={e => setFormData({ ...formData, sqft: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "oklch(0.40 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}>Year Built</label>
                    <input className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2" style={{ borderColor: "oklch(0.85 0.015 80)", fontFamily: "'Source Sans 3', sans-serif" }} placeholder="e.g. 1998" value={formData.yearBuilt} onChange={e => setFormData({ ...formData, yearBuilt: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "oklch(0.40 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}>Anything You'd Like Us to Know</label>
                  <textarea rows={3} className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 resize-none" style={{ borderColor: "oklch(0.85 0.015 80)", fontFamily: "'Source Sans 3', sans-serif" }} placeholder="Known issues, recent work done, areas of concern..." value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded font-bold uppercase tracking-wide text-sm text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: "oklch(0.32 0.07 160)", fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  Schedule My Walkthrough <ArrowRight size={16} />
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
                Marcin will contact you within one business day to confirm your Baseline Walkthrough date.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
