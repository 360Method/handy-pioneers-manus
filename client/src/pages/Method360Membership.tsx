/**
 * Method360Membership.tsx — /360-method/membership
 * The 360° Maintenance Membership — front-end funnel/sales page.
 * Per project knowledge: sales pages are front-end funnels only.
 * Payment/backend integration to be added when backend is enabled.
 */

import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Shield, CheckCircle, ArrowRight, Calendar, FileText, Phone, Star, TrendingUp, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

declare global {
  interface Window {
    HCPWidget?: { openModal: () => void };
  }
}

export default function Method360Membership() {
  const [, navigate] = useLocation();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", address: "", notes: "" });

  useEffect(() => {
    document.title = "360° Maintenance Membership | Handy Pioneers";
    window.scrollTo({ top: 0 });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("360° Maintenance Membership Inquiry");
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nProperty Address: ${formData.address}\nNotes: ${formData.notes}`
    );
    window.open(`mailto:hello@handypioneers.com?subject=${subject}&body=${body}`);
    setSubmitted(true);
  };

  const includes = [
    { icon: Calendar, title: "Scheduled Execution", description: "Your NOW and SOON priority items are worked through on a schedule we manage — so you never have to remember, coordinate, or chase a contractor again." },
    { icon: FileSearch2, title: "Annual Re-Assessment", description: "Your home's health record is updated every year. Your roadmap is revised as conditions change. Your property score is tracked over time." },
    { icon: Star, title: "Priority Scheduling", description: "Members are never placed in a general queue. When something comes up, you're first." },
    { icon: Phone, title: "Direct Access to Marcin", description: "A dedicated point of contact for every question, concern, or new project — coordinating the right trade partners so you never manage multiple contractors." },
    { icon: FileText, title: "Complete Home Record", description: "A running digital record of every assessment, every project, and every system in your home — available whenever you need it." },
    { icon: TrendingUp, title: "Annual Property Score", description: "Track your home's condition improving over time with an annual score that documents the progress of your investment." },
  ];

  const scarcityNote = "Membership is limited. We accept a finite number of homes into the program each quarter to ensure every client receives the level of attention the framework requires.";

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
            investment portfolios take for granted — applied to your home.
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

      {/* ─── The Alternative ─── */}
      <section className="py-16" style={{ backgroundColor: "oklch(0.96 0.008 80)" }}>
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

      {/* ─── Scarcity + Enrollment ─── */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.22 0.07 160)" }}>
        <div className="container max-w-3xl">
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
                {scarcityNote}
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
                className="text-2xl font-bold text-white mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Inquire About Membership
              </h3>
              <p
                className="text-sm mb-6"
                style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Submit your details. Marcin will reach out within one business day to discuss your
                home, confirm availability, and walk you through the enrollment process.
              </p>
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
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Source Sans 3', sans-serif" }}>Anything You'd Like Us to Know</label>
                  <textarea rows={3} className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 resize-none bg-white/10 text-white placeholder-white/30" style={{ borderColor: "rgba(255,255,255,0.20)", fontFamily: "'Source Sans 3', sans-serif" }} placeholder="Current condition, past work done, goals for the home..." value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded font-bold uppercase tracking-wide text-sm transition-all hover:opacity-90"
                  style={{ backgroundColor: "oklch(0.65 0.14 65)", color: "white", fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  Inquire About Membership <ArrowRight size={16} />
                </button>
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
                Inquiry Received
              </h3>
              <p
                className="text-base"
                style={{ color: "rgba(255,255,255,0.70)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Marcin will be in touch within one business day to discuss your home and confirm
                membership availability.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Local icon shim — FileSearch2 not always in lucide tree
function FileSearch2({ size, color }: { size: number; color: string }) {
  return <FileText size={size} color={color} />;
}
