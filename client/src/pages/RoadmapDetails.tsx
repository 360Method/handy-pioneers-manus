/**
 * RoadmapDetails.tsx - /roadmap/details (the roadmap-generator form)
 *
 * Give-first order (2026-06-06 redesign): the report comes FIRST (PDF drag-drop
 * or a web-hosted report URL - pre-filled when the landing-page dropzone handed
 * a file over), then the property (personal/investment toggle, address with the
 * Clark County ZIP gate, details), and only then the ask: email + optional
 * first name. No popup before this page; no last name or phone anywhere.
 *
 * Quiet capture: the moment a valid email is typed (field blur), the lead is
 * created in the background (POST /api/public/inquiry) so the dropout-recovery
 * drip arms even if the visitor never clicks Generate. The backend suppresses
 * the instant ack email for these (source: roadmap-funnel-quiet-capture).
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "wouter";
import { Upload, Link as LinkIcon, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getApiBase, isStagingHost } from "@/lib/api";
import { isInServiceArea } from "@/lib/serviceArea";
import { openInquiry } from "@/lib/inquiry";
import { takePendingReport } from "@/lib/roadmapFile";

const MAX_PDF_BYTES = 100 * 1024 * 1024; // 100 MB

interface Stash {
  leadId?: string;
  customerId?: string;
  firstName?: string;
  email?: string;
}

const UNIT_OPTIONS = [
  { value: 1, label: "Single-family rental" },
  { value: 2, label: "Duplex" },
  { value: 3, label: "Triplex" },
  { value: 4, label: "4-plex" },
  { value: 5, label: "5+ units" },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RoadmapDetails() {
  const [, navigate] = useLocation();
  const [stash, setStash] = useState<Stash>({});
  const [propertyKind, setPropertyKind] = useState<"personal" | "investment">("personal");
  const [form, setForm] = useState({
    street: "",
    city: "",
    state: "WA",
    zip: "",
    sqft: "",
    yearBuilt: "",
    notes: "",
    email: "",
    firstName: "",
  });
  const [unitCount, setUnitCount] = useState<number>(1);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [useUrlInstead, setUseUrlInstead] = useState(false);
  const [reportUrl, setReportUrl] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [waitlisted, setWaitlisted] = useState(false);
  // Quiet capture fires once per email value; an in-flight ref dedupes blurs.
  const capturedEmailRef = useRef<string | null>(null);
  const captureInFlightRef = useRef(false);

  useEffect(() => {
    document.title = "Your Report → Your Roadmap | Handy Pioneers";
    window.scrollTo(0, 0);
    // Landing-page dropzone handoff (in-memory; gone after a hard refresh).
    const handed = takePendingReport();
    if (handed) setPdfFile(handed);
    // Returning visitor in the same tab - restore quiet-capture linkage.
    try {
      const raw = sessionStorage.getItem("hp_roadmap");
      if (raw) {
        const s = JSON.parse(raw) as Stash;
        setStash(s);
        setForm((prev) => ({
          ...prev,
          email: s.email ?? prev.email,
          firstName: s.firstName ?? prev.firstName,
        }));
        if (s.email) capturedEmailRef.current = s.email.toLowerCase().trim();
      }
    } catch {
      /* fresh start is fine */
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /**
   * Quiet capture: create the lead the moment we have a working email, so the
   * recovery drip arms for visitors who fill this in but never click Generate.
   * Best-effort - a failure here never blocks the form.
   */
  const quietCapture = async (): Promise<Stash> => {
    const email = form.email.toLowerCase().trim();
    if (!EMAIL_RE.test(email)) return stash;
    if (capturedEmailRef.current === email) return stash;
    if (captureInFlightRef.current) return stash;
    captureInFlightRef.current = true;
    try {
      const res = await fetch(`${getApiBase()}/api/public/inquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          firstName: form.firstName.trim() || undefined,
          funnel: "roadmap_generator",
          source: "roadmap-funnel-quiet-capture",
          partnerRef: sessionStorage.getItem("hp_roadmap_ref") ?? undefined,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        const next: Stash = {
          leadId: data.leadId,
          customerId: data.customerId,
          email,
          firstName: form.firstName.trim() || undefined,
        };
        capturedEmailRef.current = email;
        setStash(next);
        sessionStorage.setItem("hp_roadmap", JSON.stringify(next));
        return next;
      }
    } catch {
      /* best-effort */
    } finally {
      captureInFlightRef.current = false;
    }
    return stash;
  };

  const onFile = (file: File | null) => {
    setPdfError(null);
    if (!file) {
      setPdfFile(null);
      return;
    }
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setPdfError("Please upload a PDF file");
      setPdfFile(null);
      return;
    }
    if (file.size > MAX_PDF_BYTES) {
      setPdfError("PDF must be 100 MB or smaller");
      setPdfFile(null);
      return;
    }
    setPdfFile(file);
  };

  const fileSizeLabel = useMemo(() => {
    if (!pdfFile) return null;
    const mb = pdfFile.size / (1024 * 1024);
    return mb < 1 ? `${Math.round(pdfFile.size / 1024)} KB` : `${mb.toFixed(1)} MB`;
  }, [pdfFile]);

  // Live service-area check: the visitor learns where we produce roadmaps the
  // moment a ZIP is typed, not after filling the whole form.
  const zipOutOfArea = form.zip.trim().length >= 5 && !isInServiceArea(form.zip);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const outOfArea = form.zip.trim().length >= 5 && !isInServiceArea(form.zip);
    // Waitlist needs only the address and an email; the report requirement
    // applies to the generate path alone.
    if (!outOfArea && !pdfFile && !reportUrl.trim()) {
      setError("Attach your report (PDF) or paste its web link so we can produce your roadmap.");
      return;
    }
    if (!form.street || !form.city || !form.zip) {
      setError("Please add the street, city, and ZIP.");
      return;
    }
    if (!EMAIL_RE.test(form.email.trim())) {
      setError(outOfArea ? "Add the email we should reach you at when your area opens." : "Add the email where your roadmap should arrive.");
      return;
    }

    // Make sure the lead exists (quiet capture may not have fired yet).
    const linked = await quietCapture();

    // Out-of-area → waitlist branch: no roadmap is generated; the funnel ends here.
    if (!isInServiceArea(form.zip)) {
      setSubmitting(true);
      try {
        await fetch(`${getApiBase()}/api/public/inquiry/details`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerId: linked.customerId,
            leadId: linked.leadId,
            street: form.street.trim(),
            city: form.city.trim(),
            state: form.state.trim(),
            zip: form.zip.trim(),
            sqft: form.sqft.trim(),
            yearBuilt: form.yearBuilt.trim(),
            notes: form.notes.trim(),
            funnel: "roadmap_generator",
            outOfArea: true,
          }),
        });
      } catch {
        /* best-effort - the quiet-capture lead already holds the contact */
      }
      setWaitlisted(true);
      setSubmitting(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (!consent) {
      setError("Please confirm the acknowledgment to continue.");
      return;
    }

    setSubmitting(true);
    try {
      const body = new FormData();
      body.append("email", form.email.trim());
      if (form.firstName.trim()) body.append("firstName", form.firstName.trim());
      body.append("propertyAddress", form.street.trim());
      body.append("city", form.city.trim());
      body.append("state", form.state.trim());
      body.append("zip", form.zip.trim());
      if (propertyKind === "personal") {
        if (form.sqft.trim()) body.append("sqft", form.sqft.trim());
      } else {
        body.append("unitCount", String(unitCount));
      }
      body.append("propertyKind", propertyKind);
      if (form.yearBuilt.trim()) body.append("yearBuilt", form.yearBuilt.trim());
      if (form.notes.trim()) body.append("notes", form.notes.trim());
      if (pdfFile) body.append("report_pdf", pdfFile);
      if (!pdfFile && reportUrl.trim()) body.append("reportUrl", reportUrl.trim());
      body.append("source", "roadmap_funnel");
      const partnerRef = sessionStorage.getItem("hp_roadmap_ref");
      if (partnerRef) body.append("partnerRef", partnerRef);
      // Honeypot - hidden field real visitors never fill (bot filter).
      body.append("website", honeypot);
      // Funnel linkage - quiet capture created these; the backend reuses them
      // so one funnel walk never makes duplicate CRM records.
      if (linked.customerId) body.append("hpCustomerId", linked.customerId);
      if (linked.leadId) body.append("hpLeadId", linked.leadId);

      const res = await fetch(`${getApiBase()}/api/roadmap-generator/submit`, {
        method: "POST",
        body,
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d?.error ?? `Submission failed (${res.status})`);
      }
      const data = await res.json();
      // Server-side service-area gate disagreed with the client list (defense
      // in depth) - show the waitlist state instead of the offer.
      if (data?.waitlisted) {
        setWaitlisted(true);
        setSubmitting(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      // Carry everything the offer page needs (tid in the URL is the
      // sessionStorage-loss fallback for the decline path).
      sessionStorage.setItem(
        "hp_roadmap",
        JSON.stringify({
          ...linked,
          ...form,
          propertyKind,
          unitCount: propertyKind === "investment" ? unitCount : undefined,
          translationId: data.id,
          confirmationUrl: data.confirmationUrl,
        })
      );
      // One-time ticket: the offer is a single, in-session view (no bookmark/reload/share).
      sessionStorage.setItem("hp_roadmap_offer", "1");
      navigate(`/roadmap/offer?tid=${encodeURIComponent(data.id ?? "")}`);
    } catch (err: any) {
      // On staging the backend may be down - let reviewers walk the flow anyway.
      if (isStagingHost()) {
        sessionStorage.setItem(
          "hp_roadmap",
          JSON.stringify({ ...stash, ...form, propertyKind, unitCount, translationId: "preview" })
        );
        sessionStorage.setItem("hp_roadmap_offer", "1");
        navigate("/roadmap/offer?tid=preview");
        return;
      }
      setError(err?.message ?? "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all";
  const inputStyle = { border: "1px solid oklch(85% 0.02 80)", background: "white", color: "oklch(22% 0.07 155)" } as const;
  const labelClass = "block text-xs font-semibold uppercase tracking-wide mb-1";
  const labelStyle = { color: "oklch(45% 0.02 60)" } as const;
  const sectionTitleClass = "text-sm font-bold uppercase tracking-widest";
  const sectionTitleStyle = { color: "oklch(0.50 0.06 65)", fontFamily: "'Source Sans 3', sans-serif" } as const;

  const toggleBase =
    "flex-1 py-3 px-4 rounded-md text-sm font-bold transition-all border";

  return (
    <div className="min-h-screen font-sans" style={{ background: "oklch(96% 0.015 80)" }}>
      <Navbar />

      <section className="text-white pt-14 pb-9 px-4" style={{ background: "oklch(22% 0.07 155)" }}>
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-display text-3xl sm:text-4xl font-black leading-tight">
            Your report in, your roadmap out.
          </h1>
          <p className="mt-3 text-sm" style={{ color: "oklch(100% 0 0 / 0.7)" }}>
            Attach the report, tell us where the home is, and your roadmap starts
            generating. Free, delivered within 24 hours.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {waitlisted ? (
            <div
              className="rounded-2xl p-10 border text-center"
              style={{ backgroundColor: "oklch(0.97 0.04 65)", borderColor: "oklch(0.85 0.10 65)" }}
            >
              <CheckCircle size={48} className="mx-auto mb-4" style={{ color: "oklch(0.55 0.14 65)" }} />
              <h3
                className="text-2xl font-bold mb-3"
                style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
              >
                Thank You - You're On Our List
              </h3>
              <p className="text-base mx-auto" style={{ color: "oklch(0.35 0.02 80)", maxWidth: "520px" }}>
                We currently produce roadmaps for Clark County, Washington homes. Every
                roadmap is individually researched and produced, so we limit the
                geography while we grow. Your details are on file and we will reach out
                the moment your area opens. Thank you for your understanding.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-xl p-6 sm:p-8 space-y-6"
              style={{ background: "white", border: "1px solid oklch(88% 0.02 80)", boxShadow: "0 6px 24px oklch(0% 0 0 / 0.06)" }}
              noValidate
            >
              {/* Service area, upfront. Every roadmap is produced at our expense,
                  so the geography is stated before anyone fills a single field. */}
              <div
                className="rounded-xl p-4 border text-sm leading-relaxed"
                style={{ backgroundColor: "oklch(0.97 0.02 160)", borderColor: "oklch(0.85 0.04 160)", color: "oklch(0.30 0.04 160)" }}
              >
                <span className="font-semibold">We currently produce roadmaps for homes in Clark County, Washington.</span>{" "}
                Each one is individually researched and produced at our expense, so we
                focus on the area we serve today. Outside Clark County? Leave your
                details anyway and you are first in line when we open your area.
              </div>

              {/* ── 1. The report (first - it's the whole point) ── */}
              <div>
                <p className={sectionTitleClass} style={sectionTitleStyle}>1 · Your inspection report</p>
                {!useUrlInstead ? (
                  <>
                    <label
                      htmlFor="rd-pdf-upload"
                      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setDragOver(false);
                        const f = e.dataTransfer.files?.[0];
                        if (f) onFile(f);
                      }}
                      className="block rounded-xl border-2 border-dashed px-6 py-8 text-center cursor-pointer transition-colors mt-2"
                      style={{
                        borderColor: pdfFile ? "oklch(0.55 0.10 160)" : dragOver ? "oklch(0.65 0.14 65)" : "oklch(0.80 0.03 80)",
                        backgroundColor: pdfFile ? "oklch(0.97 0.02 160)" : dragOver ? "oklch(0.97 0.04 65)" : "white",
                      }}
                    >
                      <Upload size={26} className="mx-auto mb-2" style={{ color: pdfFile ? "oklch(0.45 0.08 160)" : "oklch(0.50 0.06 65)" }} />
                      {pdfFile ? (
                        <>
                          <div className="font-semibold text-sm" style={{ color: "oklch(0.22 0.07 160)" }}>{pdfFile.name}</div>
                          <div className="text-xs mt-1" style={{ color: "oklch(0.50 0.02 80)" }}>{fileSizeLabel} · attached. Click to replace</div>
                        </>
                      ) : (
                        <>
                          <div className="font-semibold text-sm" style={{ color: "oklch(0.22 0.07 160)" }}>Drag a PDF here, or click to browse</div>
                          <div className="text-xs mt-1" style={{ color: "oklch(0.50 0.02 80)" }}>PDF only · up to 100 MB</div>
                        </>
                      )}
                      <input
                        id="rd-pdf-upload"
                        type="file"
                        accept="application/pdf,.pdf"
                        className="hidden"
                        onChange={(e) => onFile(e.target.files?.[0] ?? null)}
                      />
                    </label>
                    {pdfError && <p className="mt-1 text-xs" style={{ color: "oklch(0.55 0.18 25)" }}>{pdfError}</p>}
                    <button
                      type="button"
                      onClick={() => setUseUrlInstead(true)}
                      className="mt-2 text-xs font-semibold underline bg-transparent border-0 cursor-pointer"
                      style={{ color: "oklch(0.50 0.06 65)" }}
                    >
                      I have a Spectora or web-hosted report instead →
                    </button>
                  </>
                ) : (
                  <>
                    <div className="relative mt-2">
                      <LinkIcon size={16} className="absolute top-1/2 left-3 -translate-y-1/2" style={{ color: "oklch(0.50 0.06 65)" }} />
                      <input
                        placeholder="https://app.spectora.com/reports/…"
                        value={reportUrl}
                        onChange={(e) => setReportUrl(e.target.value)}
                        className="w-full rounded-md pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                        style={inputStyle}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setUseUrlInstead(false)}
                      className="mt-2 text-xs font-semibold underline bg-transparent border-0 cursor-pointer"
                      style={{ color: "oklch(0.50 0.06 65)" }}
                    >
                      ← Upload a PDF instead
                    </button>
                  </>
                )}
                <p className="mt-3 text-xs leading-relaxed" style={{ color: "oklch(0.50 0.02 80)" }}>
                  No inspection report?{" "}
                  <button
                    type="button"
                    onClick={() => openInquiry({ mode: "baseline" })}
                    className="font-semibold underline bg-transparent border-0 cursor-pointer p-0"
                    style={{ color: "oklch(0.50 0.06 65)" }}
                  >
                    See your options →
                  </button>{" "}
                  We recommend a professional inspection; if you'd rather not, Handy
                  Pioneers can do a baseline walkthrough (not a licensed inspection).
                </p>
              </div>

              {/* ── 2. The property ── */}
              <div className="space-y-5">
                <p className={sectionTitleClass} style={sectionTitleStyle}>2 · The property</p>
                <div>
                  <label className={labelClass} style={labelStyle}>This property is my…</label>
                  <div className="flex gap-3 mt-1">
                    <button
                      type="button"
                      onClick={() => setPropertyKind("personal")}
                      className={toggleBase}
                      style={
                        propertyKind === "personal"
                          ? { background: "oklch(22% 0.07 155)", color: "white", borderColor: "oklch(22% 0.07 155)" }
                          : { background: "white", color: "oklch(40% 0.02 60)", borderColor: "oklch(85% 0.02 80)" }
                      }
                    >
                      Personal home
                    </button>
                    <button
                      type="button"
                      onClick={() => setPropertyKind("investment")}
                      className={toggleBase}
                      style={
                        propertyKind === "investment"
                          ? { background: "oklch(22% 0.07 155)", color: "white", borderColor: "oklch(22% 0.07 155)" }
                          : { background: "white", color: "oklch(40% 0.02 60)", borderColor: "oklch(85% 0.02 80)" }
                      }
                    >
                      Investment property
                    </button>
                  </div>
                </div>

                <div>
                  <label className={labelClass} style={labelStyle} htmlFor="rd-street">Street Address</label>
                  <input id="rd-street" name="street" type="text" autoComplete="address-line1" placeholder="123 NE Main St" value={form.street} onChange={handleChange} className={inputClass} style={inputStyle} required />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-1">
                    <label className={labelClass} style={labelStyle} htmlFor="rd-city">City</label>
                    <input id="rd-city" name="city" type="text" autoComplete="address-level2" placeholder="Vancouver" value={form.city} onChange={handleChange} className={inputClass} style={inputStyle} required />
                  </div>
                  <div>
                    <label className={labelClass} style={labelStyle} htmlFor="rd-state">State</label>
                    <input id="rd-state" name="state" type="text" autoComplete="address-level1" value={form.state} onChange={handleChange} className={inputClass} style={inputStyle} />
                  </div>
                  <div>
                    <label className={labelClass} style={labelStyle} htmlFor="rd-zip">ZIP</label>
                    <input id="rd-zip" name="zip" type="text" inputMode="numeric" autoComplete="postal-code" placeholder="98661" value={form.zip} onChange={handleChange} className={inputClass} style={inputStyle} required />
                  </div>
                </div>
                {zipOutOfArea && (
                  <div
                    className="rounded-xl p-4 border text-sm leading-relaxed"
                    style={{ backgroundColor: "oklch(0.97 0.04 65)", borderColor: "oklch(0.85 0.10 65)", color: "oklch(0.35 0.04 65)" }}
                  >
                    <span className="font-semibold">That ZIP is outside our current area.</span>{" "}
                    We produce roadmaps for Clark County, Washington homes today,
                    because each one is individually researched and produced at our
                    expense. Add your email below and we will reach out the moment
                    your area opens. Thank you for your understanding.
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {propertyKind === "personal" ? (
                    <div>
                      <label className={labelClass} style={labelStyle} htmlFor="rd-sqft">Approx. Square Footage (optional)</label>
                      <input id="rd-sqft" name="sqft" type="text" inputMode="numeric" placeholder="2,400" value={form.sqft} onChange={handleChange} className={inputClass} style={inputStyle} />
                    </div>
                  ) : (
                    <div>
                      <label className={labelClass} style={labelStyle} htmlFor="rd-units">Property Size</label>
                      <select
                        id="rd-units"
                        value={unitCount}
                        onChange={(e) => setUnitCount(parseInt(e.target.value, 10))}
                        className={inputClass}
                        style={inputStyle}
                      >
                        {UNIT_OPTIONS.map((o) => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div>
                    <label className={labelClass} style={labelStyle} htmlFor="rd-year">Year Built (if known)</label>
                    <input id="rd-year" name="yearBuilt" type="text" inputMode="numeric" placeholder="1998" value={form.yearBuilt} onChange={handleChange} className={inputClass} style={inputStyle} />
                  </div>
                </div>
                <div>
                  <label className={labelClass} style={labelStyle} htmlFor="rd-notes">Anything we should know? (optional)</label>
                  <textarea id="rd-notes" name="notes" rows={2} placeholder="Concerns to prioritize, renovation plans…" value={form.notes} onChange={handleChange} className={inputClass} style={inputStyle} />
                </div>
              </div>

              {/* ── 3. Where the roadmap goes (the only ask) ── */}
              <div className="space-y-4">
                <p className={sectionTitleClass} style={sectionTitleStyle}>3 · Where should we send it?</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass} style={labelStyle} htmlFor="rd-email">Email</label>
                    <input
                      id="rd-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={() => void quietCapture()}
                      className={inputClass}
                      style={inputStyle}
                      required
                    />
                  </div>
                  <div>
                    <label className={labelClass} style={labelStyle} htmlFor="rd-firstname">First Name (optional)</label>
                    <input
                      id="rd-firstname"
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      placeholder="So the roadmap greets you"
                      value={form.firstName}
                      onChange={handleChange}
                      className={inputClass}
                      style={inputStyle}
                    />
                  </div>
                </div>
              </div>

              {/* Acknowledgment - generate path only; the waitlist makes no roadmap */}
              {!zipOutOfArea && (
              <div
                className="rounded-xl p-4 border"
                style={{ backgroundColor: "oklch(0.99 0.005 80)", borderColor: "oklch(0.85 0.015 80)", borderLeft: "4px solid oklch(0.65 0.14 65)" }}
              >
                <label className="flex gap-3 items-start cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1"
                    style={{ accentColor: "oklch(0.65 0.14 65)" }}
                  />
                  <span className="text-xs leading-relaxed" style={{ color: "oklch(0.35 0.02 80)" }}>
                    I understand the 360° Roadmap summarizes the inspection report I provide. It is
                    not a legal home inspection and does not replace a licensed home inspector's
                    findings. I'd like to receive my complimentary 360° Roadmap.
                  </span>
                </label>
              </div>
              )}

              {/* Honeypot - visually hidden; bots fill it, people never see it */}
              <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", height: 0, overflow: "hidden" }}>
                <label htmlFor="rd-website">Website</label>
                <input
                  id="rd-website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              {error && <p className="text-sm font-medium" style={{ color: "oklch(55% 0.18 25)" }}>{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-md font-bold text-sm uppercase tracking-wide transition-all text-white disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ background: "oklch(22% 0.07 155)" }}
              >
                {submitting
                  ? (zipOutOfArea ? "Saving…" : "Uploading…")
                  : (zipOutOfArea ? "Keep Me On The List" : "Generate My Roadmap →")}
              </button>
              <p className="text-center text-xs" style={{ color: "oklch(60% 0.02 60)" }}>
                Your report stays private. We never resell your data.
              </p>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
