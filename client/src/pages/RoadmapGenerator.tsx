/**
 * RoadmapGenerator.tsx — /roadmap-generator
 *
 * Complimentary lead magnet ("360° Roadmap Generator"): homeowner uploads an
 * inspection report (PDF or URL), receives a branded NOW/SOON/WAIT roadmap
 * with investment ranges in their 360° client portal within 24 hours.
 *
 * Submits multipart/form-data to /api/roadmap-generator/submit. Backend is
 * expected at pro.handypioneers.com (see CROSS-REPO_CONTRACT in report); until
 * that is live, this site's Express server accepts the same shape at a local
 * intake endpoint and forwards via email.
 *
 * Voice: affluent. No forbidden vocabulary in any string below.
 */

import { forwardRef, useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  FileText,
  Upload,
  CheckCircle,
  ArrowRight,
  Clock,
  AlertTriangle,
  Eye,
  Link as LinkIcon,
  ShieldCheck,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { isInServiceArea, OUT_OF_AREA_MESSAGE } from "@/lib/serviceArea";
import SEO from "@/components/SEO";

// ─── Config ──────────────────────────────────────────────────────────────────
// TODO: move to CMS (nucleus) — endpoint URLs should be environment-aware
// Primary intake lives on the pro backend; the local Express server intake is a fallback
// so submissions still land (by email) if the pro endpoint is unreachable.
const PRIMARY_SUBMIT_ENDPOINT = "https://pro.handypioneers.com/api/roadmap-generator/submit";
const FALLBACK_SUBMIT_ENDPOINT = "/api/priority-translation/submit";
const MAX_PDF_BYTES = 100 * 1024 * 1024; // 100 MB

// ─── Schema ──────────────────────────────────────────────────────────────────
const urlOrEmpty = z
  .string()
  .trim()
  .optional()
  .refine(
    (v) => !v || /^https?:\/\/[^\s]+\.[^\s]+/i.test(v),
    "Please enter a valid https:// URL"
  );

const formSchema = z
  .object({
    first_name: z.string().trim().min(1, "Required").max(80),
    last_name: z.string().trim().min(1, "Required").max(80),
    email: z.string().trim().email("Please enter a valid email"),
    phone: z
      .string()
      .trim()
      .min(7, "Please enter a valid phone")
      .max(32, "Too long"),
    property_address: z.string().trim().min(5, "Required").max(200),
    property_zip: z
      .string()
      .trim()
      .regex(/^\d{5}(-\d{4})?$/, "Please enter a valid 5-digit ZIP code"),
    report_url: urlOrEmpty,
    notes: z.string().trim().max(1000).optional(),
    consent: z.literal(true, {
      message: "Please confirm the acknowledgment to continue",
    } as any),
    sms_consent: z.literal(true, {
      message: "Please consent to receive SMS messages to continue",
    } as any),
  });

type FormValues = z.infer<typeof formSchema>;

// ─── Page ────────────────────────────────────────────────────────────────────
export default function RoadmapGenerator() {
  const [, navigate] = useLocation();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [outOfAreaCaptured, setOutOfAreaCaptured] = useState(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [useUrlInstead, setUseUrlInstead] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      property_address: "",
      property_zip: "",
      report_url: "",
      notes: "",
      consent: undefined as unknown as true,
    },
    mode: "onBlur",
  });

  useEffect(() => {
    // TODO: move to CMS (nucleus) — page metadata for the 360° Roadmap Generator
    document.title = "360° Roadmap Generator — Upload Your Inspection Report | Handy Pioneers";

    const setMeta = (name: string, value: string, attr: "name" | "property" = "name") => {
      let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    };

    const description =
      "Upload your home inspection report and receive a prioritized NOW / SOON / WAIT roadmap in your private 360° client portal within 24 hours. Complimentary for Clark County, WA homeowners.";

    setMeta("description", description);
    setMeta("og:title", "360° Roadmap Generator | Handy Pioneers", "property");
    setMeta("og:description", description, "property");
    setMeta("twitter:title", "360° Roadmap Generator | Handy Pioneers");
    setMeta("twitter:description", description);

    window.scrollTo({ top: 0 });
  }, []);

  // ─── PDF helpers ──────────────────────────────────────────────────────────
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

  // ─── Submit ───────────────────────────────────────────────────────────────
  const onSubmit = async (values: FormValues) => {
    setSubmitError(null);

    const inArea = isInServiceArea(values.property_zip);

    if (inArea && !pdfFile && !values.report_url) {
      setSubmitError(
        "Please attach a PDF or paste a web report URL so we can produce your roadmap."
      );
      return;
    }

    setSubmitting(true);
    try {
      const body = new FormData();
      Object.entries(values).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== "") body.append(k, String(v));
      });
      if (pdfFile) body.append("report_pdf", pdfFile);
      body.append(
        "source",
        inArea ? "roadmap_generator_lead_magnet" : "roadmap_generator_waitlist_out_of_area"
      );
      body.append("in_service_area", inArea ? "true" : "false");

      // Prefer the pro backend; fall back to the local intake so submissions
      // still land (by email) if pro is unreachable / CORS-blocked / misconfigured.
      let res: Response;
      try {
        res = await fetch(PRIMARY_SUBMIT_ENDPOINT, { method: "POST", body });
        if (!res.ok) throw new Error(`Primary submission failed (${res.status})`);
      } catch (primaryErr) {
        console.warn("[roadmap-generator] primary endpoint unreachable, falling back", primaryErr);
        res = await fetch(FALLBACK_SUBMIT_ENDPOINT, { method: "POST", body });
        if (!res.ok) throw new Error(`Submission failed (${res.status})`);
      }

      if (inArea) {
        setSubmitted(true);
      } else {
        setOutOfAreaCaptured(true);
      }
      reset();
      setPdfFile(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setSubmitError(
        "We couldn't receive your submission just now. Please try again in a moment, or email help@handypioneers.com."
      );
      // eslint-disable-next-line no-console
      console.error("RoadmapGenerator submit error", err);
    } finally {
      setSubmitting(false);
    }
  };

  // ─── Content data ─────────────────────────────────────────────────────────
  // TODO: move to CMS (nucleus) — roadmap tier copy
  const roadmapItems = [
    {
      label: "NOW",
      color: "oklch(0.55 0.18 25)",
      bg: "oklch(0.97 0.04 25)",
      border: "oklch(0.80 0.12 25)",
      icon: AlertTriangle,
      description:
        "Items requiring immediate attention to prevent safety concerns, structural deterioration, or compounding damage.",
    },
    {
      label: "SOON",
      color: "oklch(0.65 0.14 65)",
      bg: "oklch(0.97 0.04 65)",
      border: "oklch(0.85 0.10 65)",
      icon: Clock,
      description:
        "Items that are not urgent today but will become costly if deferred beyond the next 6–18 months.",
    },
    {
      label: "WAIT",
      color: "oklch(0.45 0.08 160)",
      bg: "oklch(0.96 0.02 160)",
      border: "oklch(0.80 0.06 160)",
      icon: Eye,
      description:
        "Items that are monitored, documented, and revisited at your next assessment cycle.",
    },
  ];

  // TODO: move to CMS (nucleus) — how-it-works steps
  const steps = [
    {
      n: "1",
      title: "Upload Your Inspection Report",
      desc: "Attach the PDF you already have, or paste a link to your web-hosted report. The Generator accepts Spectora, HomeGauge, and most major formats.",
    },
    {
      n: "2",
      title: "The Generator Produces Your Roadmap",
      desc: "Our advisors run the report through the 360° Roadmap Generator — translating every finding into plain language, assigning a NOW / SOON / WAIT priority, and attaching an investment range grounded in Clark County market data.",
    },
    {
      n: "3",
      title: "Your 360° Roadmap Arrives In Your Portal",
      desc: "Within 24 hours, your 360° client portal is ready. Your roadmap lives inside — a single source of truth for your property, with progress tracking and direct access to our advisors.",
    },
  ];

  // TODO: move to CMS (nucleus) — FAQ items
  const faqItems = [
    {
      q: "Is this a home inspection?",
      a: "No. The 360° Roadmap Generator summarizes the inspection report you already have. It is not a legal home inspection and does not substitute for a licensed inspector's findings. Think of it as your trusted advisor translating the inspector's technical language into a clear action plan.",
    },
    {
      q: "What does it cost?",
      a: "Nothing. The 360° Roadmap Generator is complimentary. It is our way of introducing you to the 360° Method — the proactive standard of care we apply to every property we steward.",
    },
    {
      q: "How are investment ranges calculated?",
      a: "Each range is derived from the specific findings in your inspection report — what your home is telling us about the scope of work ahead. Consider them directional guides: a sense of the investment your property may warrant to address each priority. Actual figures come only after we walk the site with you and prepare a written scope of work. The ranges here are meant to orient your thinking, not to serve as a quote.",
    },
    {
      q: "Do I have to become a member?",
      a: "Not at all. The roadmap is yours to keep. Many homeowners execute items on their own timeline. Others ask us to return and address each item through our 360° Maintenance Membership — a managed standard of care that puts your roadmap on a schedule we own together.",
    },
    {
      q: "How quickly is my roadmap delivered?",
      a: "Within 24 hours of submission. You'll receive an email with a magic-link login to your client portal, along with the PDF attached for convenience.",
    },
    {
      q: "What happens to my data?",
      a: "Your report and findings stay within your private client portal. We never resell data and never share your report with third parties. You may request deletion at any time by emailing help@handypioneers.com.",
    },
  ];

  // ─── JSX ──────────────────────────────────────────────────────────────────
  return (
    <>
      <SEO
        path="/priority-translation"
        title="Priority Translation — Turn Your Inspection Report into a Plan | Handy Pioneers"
        description="Upload your Clark County WA home inspection report and our craftsmen will translate the findings into a prioritized, written scope of work. Built for Vancouver, Camas, Washougal, and Battle Ground homeowners."
      />
      <div className="min-h-screen" style={{ backgroundColor: "oklch(0.98 0.005 80)" }}>
      <Navbar />

      {/* ─── Hero ─── */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.22 0.07 160)" }}>
        <div className="container max-w-3xl">
          <div
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-5"
            style={{
              backgroundColor: "oklch(0.65 0.14 65)",
              color: "white",
              fontFamily: "'Source Sans 3', sans-serif",
            }}
          >
            <FileText size={12} /> Complimentary · 24-Hour Turnaround
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-5"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            The 360° Roadmap Generator
          </h1>
          <p
            className="text-lg leading-relaxed mb-8"
            style={{
              color: "rgba(255,255,255,0.80)",
              fontFamily: "'Source Sans 3', sans-serif",
              maxWidth: "620px",
            }}
          >
            Upload your inspection report. Within 24 hours, the 360° Roadmap
            Generator produces a prioritized NOW / SOON / WAIT plan with
            investment ranges, delivered to your private client portal — the
            same standard of care our members receive.
          </p>
          <div className="flex flex-wrap gap-6 text-sm" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
            <div className="flex items-center gap-2" style={{ color: "rgba(255,255,255,0.75)" }}>
              <CheckCircle size={16} style={{ color: "oklch(0.80 0.10 65)" }} /> Complimentary
            </div>
            <div className="flex items-center gap-2" style={{ color: "rgba(255,255,255,0.75)" }}>
              <CheckCircle size={16} style={{ color: "oklch(0.80 0.10 65)" }} /> 24-Hour Turnaround
            </div>
            <div className="flex items-center gap-2" style={{ color: "rgba(255,255,255,0.75)" }}>
              <CheckCircle size={16} style={{ color: "oklch(0.80 0.10 65)" }} /> Private Client Portal
            </div>
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <h2
            className="text-3xl font-bold mb-10 text-center"
            style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
          >
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {steps.map((s) => (
              <div
                key={s.n}
                className="rounded-xl p-6 border"
                style={{ backgroundColor: "white", borderColor: "oklch(0.88 0.015 80)" }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-4 font-bold text-lg"
                  style={{
                    backgroundColor: "oklch(0.22 0.07 160)",
                    color: "oklch(0.80 0.10 65)",
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  {s.n}
                </div>
                <h3
                  className="font-bold mb-2"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: "oklch(0.22 0.07 160)",
                    fontSize: "1.15rem",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.42 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          {/* ─── Three-Tier Roadmap Explainer ─── */}
          <h2
            className="text-3xl font-bold mb-8 text-center"
            style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
          >
            Your Roadmap, Delivered in Three Tiers
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
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
                      style={{
                        color: item.color,
                        fontFamily: "'Playfair Display', serif",
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: "oklch(0.38 0.02 80)",
                      fontFamily: "'Source Sans 3', sans-serif",
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Form ─── */}
      <section className="py-16" style={{ backgroundColor: "oklch(0.96 0.01 80)" }}>
        <div className="container max-w-3xl">
          {submitted ? (
            <ThankYouState />
          ) : outOfAreaCaptured ? (
            <WaitlistState />
          ) : (
            <div
              className="rounded-2xl p-8 border"
              style={{
                backgroundColor: "white",
                borderColor: "oklch(0.88 0.015 80)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
              }}
            >
              <h2
                className="text-3xl font-bold mb-2"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "oklch(0.22 0.07 160)",
                }}
              >
                Generate Your 360° Roadmap
              </h2>
              <p
                className="text-sm mb-6"
                style={{
                  color: "oklch(0.50 0.02 80)",
                  fontFamily: "'Source Sans 3', sans-serif",
                }}
              >
                Complete the fields below and attach your inspection report. The 360°
                Roadmap Generator will produce your roadmap and deliver it to your
                private client portal within 24 hours.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                {/* Names */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field
                    label="First Name"
                    error={errors.first_name?.message}
                    {...register("first_name")}
                  />
                  <Field
                    label="Last Name"
                    error={errors.last_name?.message}
                    {...register("last_name")}
                  />
                </div>

                {/* Contact */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field
                    label="Email Address"
                    type="email"
                    error={errors.email?.message}
                    {...register("email")}
                  />
                  <div>
                    <Field
                      label="Phone"
                      type="tel"
                      error={errors.phone?.message}
                      {...register("phone")}
                    />
                    <p className="text-xs leading-relaxed mt-2" style={{ color: "oklch(0.50 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}>
                      By providing your phone number, you agree to receive text messages from Handy Pioneers including estimate-ready notifications, appointment reminders, project status updates, and occasional service-related offers. Message frequency varies. Msg &amp; data rates may apply. Reply STOP to opt out, HELP for help. View our{" "}
                      <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: "oklch(0.55 0.12 65)", textDecoration: "underline" }}>Privacy Policy</a>{" "}
                      and{" "}
                      <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer" style={{ color: "oklch(0.55 0.12 65)", textDecoration: "underline" }}>Terms</a>.
                    </p>
                  </div>
                </div>

                {/* Property address + ZIP (gated to Clark County WA) */}
                <Field
                  label="Property Address"
                  placeholder="Street, city"
                  error={errors.property_address?.message}
                  {...register("property_address")}
                />
                <div className="grid sm:grid-cols-[1fr_180px] gap-4">
                  <div className="hidden sm:block" />
                  <Field
                    label="Property ZIP"
                    placeholder="98683"
                    inputMode="numeric"
                    maxLength={10}
                    error={errors.property_zip?.message}
                    {...register("property_zip")}
                  />
                </div>

                {/* ─── Report upload ─── */}
                <div>
                  <label
                    className="block text-xs font-bold uppercase tracking-wider mb-2"
                    style={{
                      color: "oklch(0.40 0.02 80)",
                      fontFamily: "'Source Sans 3', sans-serif",
                    }}
                  >
                    Your Inspection Report *
                  </label>

                  {!useUrlInstead ? (
                    <>
                      <label
                        htmlFor="pdf-upload"
                        onDragOver={(e) => {
                          e.preventDefault();
                          setDragOver(true);
                        }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setDragOver(false);
                          const f = e.dataTransfer.files?.[0];
                          if (f) onFile(f);
                        }}
                        className="block rounded-xl border-2 border-dashed px-6 py-10 text-center cursor-pointer transition-colors"
                        style={{
                          borderColor: dragOver
                            ? "oklch(0.65 0.14 65)"
                            : "oklch(0.80 0.03 80)",
                          backgroundColor: dragOver ? "oklch(0.97 0.04 65)" : "white",
                          fontFamily: "'Source Sans 3', sans-serif",
                        }}
                      >
                        <Upload
                          size={28}
                          className="mx-auto mb-3"
                          style={{ color: "oklch(0.50 0.06 65)" }}
                        />
                        {pdfFile ? (
                          <>
                            <div
                              className="font-semibold text-sm"
                              style={{ color: "oklch(0.22 0.07 160)" }}
                            >
                              {pdfFile.name}
                            </div>
                            <div
                              className="text-xs mt-1"
                              style={{ color: "oklch(0.50 0.02 80)" }}
                            >
                              {fileSizeLabel} · Click to replace
                            </div>
                          </>
                        ) : (
                          <>
                            <div
                              className="font-semibold text-sm"
                              style={{ color: "oklch(0.22 0.07 160)" }}
                            >
                              Drag a PDF here, or click to browse
                            </div>
                            <div
                              className="text-xs mt-1"
                              style={{ color: "oklch(0.50 0.02 80)" }}
                            >
                              PDF only · up to 100 MB
                            </div>
                          </>
                        )}
                        <input
                          id="pdf-upload"
                          type="file"
                          accept="application/pdf,.pdf"
                          className="hidden"
                          onChange={(e) => onFile(e.target.files?.[0] ?? null)}
                        />
                      </label>
                      {pdfError && <InlineError>{pdfError}</InlineError>}
                      <button
                        type="button"
                        onClick={() => setUseUrlInstead(true)}
                        className="mt-3 text-xs font-semibold underline bg-transparent border-0 cursor-pointer"
                        style={{
                          color: "oklch(0.50 0.06 65)",
                          fontFamily: "'Source Sans 3', sans-serif",
                        }}
                      >
                        I have a Spectora or web-hosted report instead →
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="relative">
                        <LinkIcon
                          size={16}
                          className="absolute top-1/2 left-3 -translate-y-1/2"
                          style={{ color: "oklch(0.50 0.06 65)" }}
                        />
                        <input
                          placeholder="https://app.spectora.com/reports/…"
                          className="w-full rounded-lg border px-10 py-3 text-sm focus:outline-none focus:ring-2"
                          style={{
                            borderColor: "oklch(0.85 0.015 80)",
                            fontFamily: "'Source Sans 3', sans-serif",
                          }}
                          {...register("report_url")}
                        />
                      </div>
                      {errors.report_url?.message && (
                        <InlineError>{errors.report_url.message}</InlineError>
                      )}
                      <button
                        type="button"
                        onClick={() => setUseUrlInstead(false)}
                        className="mt-3 text-xs font-semibold underline bg-transparent border-0 cursor-pointer"
                        style={{
                          color: "oklch(0.50 0.06 65)",
                          fontFamily: "'Source Sans 3', sans-serif",
                        }}
                      >
                        ← Upload a PDF instead
                      </button>
                    </>
                  )}
                </div>

                {/* Optional notes */}
                <div>
                  <label
                    className="block text-xs font-bold uppercase tracking-wider mb-1"
                    style={{
                      color: "oklch(0.40 0.02 80)",
                      fontFamily: "'Source Sans 3', sans-serif",
                    }}
                  >
                    Anything else we should know? (optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Context about the property, concerns you want prioritized, upcoming renovation plans…"
                    className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 resize-none"
                    style={{
                      borderColor: "oklch(0.85 0.015 80)",
                      fontFamily: "'Source Sans 3', sans-serif",
                    }}
                    {...register("notes")}
                  />
                </div>

                {/* ─── Mandatory disclaimer + consent ─── */}
                <div
                  className="rounded-xl p-5 border"
                  style={{
                    backgroundColor: "oklch(0.99 0.005 80)",
                    borderColor: "oklch(0.85 0.015 80)",
                    borderLeft: "4px solid oklch(0.65 0.14 65)",
                  }}
                >
                  <p
                    className="text-xs font-bold uppercase tracking-widest mb-2"
                    style={{
                      color: "oklch(0.65 0.14 65)",
                      fontFamily: "'Source Sans 3', sans-serif",
                    }}
                  >
                    Important Acknowledgment
                  </p>
                  <p
                    className="text-xs leading-relaxed mb-3"
                    style={{
                      color: "oklch(0.45 0.02 80)",
                      fontFamily: "'Source Sans 3', sans-serif",
                    }}
                  >
                    The 360° Roadmap Generator summarizes the inspection report you
                    provide. It is not a legal home inspection and does not replace a
                    licensed home inspector's findings.
                  </p>
                  <label
                    className="flex gap-3 items-start cursor-pointer"
                    style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    <input
                      type="checkbox"
                      {...register("consent")}
                      className="mt-1"
                      style={{ accentColor: "oklch(0.65 0.14 65)" }}
                    />
                    <span
                      className="text-xs"
                      style={{ color: "oklch(0.35 0.02 80)" }}
                    >
                      I understand and would like to receive my complimentary 360°
                      Roadmap.
                    </span>
                  </label>
                  {errors.consent?.message && (
                    <InlineError>{errors.consent.message}</InlineError>
                  )}
                  <label
                    className="flex gap-3 items-start cursor-pointer"
                    style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    <input
                      type="checkbox"
                      {...register("sms_consent")}
                      className="mt-1"
                      style={{ accentColor: "oklch(0.65 0.14 65)" }}
                    />
                    <span className="text-xs" style={{ color: "oklch(0.35 0.02 80)" }}>
                      I agree to receive SMS text messages from Handy Pioneers at the phone number provided. Message frequency varies. Msg &amp; data rates may apply. Reply STOP to opt out. See{" "}
                      <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: "oklch(0.55 0.12 65)", textDecoration: "underline" }}>Privacy Policy</a>{" "}
                      and{" "}
                      <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer" style={{ color: "oklch(0.55 0.12 65)", textDecoration: "underline" }}>Terms</a>.
                    </span>
                  </label>
                  {errors.sms_consent?.message && (
                    <InlineError>{errors.sms_consent.message}</InlineError>
                  )}
                </div>

                {submitError && (
                  <div
                    className="rounded-lg p-3 text-sm"
                    style={{
                      backgroundColor: "oklch(0.97 0.04 25)",
                      color: "oklch(0.40 0.15 25)",
                      fontFamily: "'Source Sans 3', sans-serif",
                    }}
                  >
                    {submitError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded font-bold uppercase tracking-wide text-sm text-white transition-all hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: "oklch(0.65 0.14 65)",
                    fontFamily: "'Source Sans 3', sans-serif",
                  }}
                >
                  {submitting ? (
                    "Generating…"
                  ) : (
                    <>
                      <Upload size={16} /> Generate Your 360° Roadmap{" "}
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>

                <p
                  className="text-xs"
                  style={{
                    color: "oklch(0.55 0.02 80)",
                    fontFamily: "'Source Sans 3', sans-serif",
                  }}
                >
                  Your report stays private. We never resell your data.
                </p>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-16">
        <div className="container max-w-3xl">
          <h2
            className="text-3xl font-bold mb-8 text-center"
            style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
          >
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger
                  className="text-left"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: "oklch(0.22 0.07 160)",
                  }}
                >
                  {item.q}
                </AccordionTrigger>
                <AccordionContent
                  style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    color: "oklch(0.40 0.02 80)",
                  }}
                >
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="py-16" style={{ backgroundColor: "oklch(0.22 0.07 160)" }}>
        <div className="container max-w-3xl text-center">
          <ShieldCheck
            size={40}
            className="mx-auto mb-4"
            style={{ color: "oklch(0.80 0.10 65)" }}
          />
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Clarity, Within 24 Hours
          </h2>
          <p
            className="text-base leading-relaxed mb-8 mx-auto"
            style={{
              color: "rgba(255,255,255,0.75)",
              fontFamily: "'Source Sans 3', sans-serif",
              maxWidth: "520px",
            }}
          >
            Stop guessing which inspector comment matters most. Submit your report
            and receive a prioritized roadmap in your private client portal — the
            same standard of care our members receive.
          </p>
          <button
            onClick={() => {
              const el = document.querySelector("form");
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded font-bold uppercase tracking-wide text-sm transition-all hover:opacity-90"
            style={{
              backgroundColor: "oklch(0.65 0.14 65)",
              color: "white",
              fontFamily: "'Source Sans 3', sans-serif",
            }}
          >
            Submit Your Report <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
}

// ─── Subcomponents ───────────────────────────────────────────────────────────
type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

const Field = forwardRef<HTMLInputElement, FieldProps>(function Field(
  { label, error, ...rest },
  ref
) {
  return (
    <div>
      <label
        className="block text-xs font-bold uppercase tracking-wider mb-1"
        style={{
          color: "oklch(0.40 0.02 80)",
          fontFamily: "'Source Sans 3', sans-serif",
        }}
      >
        {label} *
      </label>
      <input
        ref={ref}
        className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2"
        style={{
          borderColor: error ? "oklch(0.70 0.15 25)" : "oklch(0.85 0.015 80)",
          fontFamily: "'Source Sans 3', sans-serif",
        }}
        {...rest}
      />
      {error && <InlineError>{error}</InlineError>}
    </div>
  );
});

function InlineError({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mt-1 text-xs"
      style={{
        color: "oklch(0.55 0.18 25)",
        fontFamily: "'Source Sans 3', sans-serif",
      }}
    >
      {children}
    </p>
  );
}

function WaitlistState() {
  return (
    <div
      className="rounded-2xl p-10 border text-center"
      style={{
        backgroundColor: "oklch(0.97 0.04 65)",
        borderColor: "oklch(0.85 0.10 65)",
      }}
    >
      <CheckCircle
        size={48}
        className="mx-auto mb-4"
        style={{ color: "oklch(0.55 0.14 65)" }}
      />
      <h3
        className="text-2xl font-bold mb-3"
        style={{
          fontFamily: "'Playfair Display', serif",
          color: "oklch(0.22 0.07 160)",
        }}
      >
        Thank You — You're On Our List
      </h3>
      <p
        className="text-base mb-3 mx-auto"
        style={{
          color: "oklch(0.35 0.02 80)",
          fontFamily: "'Source Sans 3', sans-serif",
          maxWidth: "520px",
        }}
      >
        We currently steward properties in Clark County, Washington only.
        We've kept your details on file and will reach out the moment we
        expand into your area.
      </p>
      <p
        className="text-sm mx-auto"
        style={{
          color: "oklch(0.45 0.02 80)",
          fontFamily: "'Source Sans 3', sans-serif",
          maxWidth: "520px",
        }}
      >
        In the meantime, the standard of care behind the 360° Method is
        documented across our blog and project library — you're welcome
        to use it as a reference.
      </p>
    </div>
  );
}

function ThankYouState() {
  return (
    <div
      className="rounded-2xl p-10 border text-center"
      style={{
        backgroundColor: "oklch(0.96 0.02 160)",
        borderColor: "oklch(0.80 0.06 160)",
      }}
    >
      <CheckCircle
        size={48}
        className="mx-auto mb-4"
        style={{ color: "oklch(0.45 0.08 160)" }}
      />
      <h3
        className="text-2xl font-bold mb-3"
        style={{
          fontFamily: "'Playfair Display', serif",
          color: "oklch(0.22 0.07 160)",
        }}
      >
        Your 360° Roadmap Is Being Generated
      </h3>
      <p
        className="text-base mb-4 mx-auto"
        style={{
          color: "oklch(0.35 0.02 80)",
          fontFamily: "'Source Sans 3', sans-serif",
          maxWidth: "520px",
        }}
      >
        You'll receive your 360° Roadmap within 24 hours.
      </p>
      <p
        className="text-sm mb-3 mx-auto"
        style={{
          color: "oklch(0.32 0.02 80)",
          fontFamily: "'Source Sans 3', sans-serif",
          maxWidth: "520px",
          fontWeight: 600,
        }}
      >
        We're creating your client portal account — look for a login link in your
        email within 24 hours.
      </p>
      <p
        className="text-sm mx-auto"
        style={{
          color: "oklch(0.45 0.02 80)",
          fontFamily: "'Source Sans 3', sans-serif",
          maxWidth: "520px",
        }}
      >
        Your portal becomes the living health record for your property —
        a single, private home for every roadmap, finding, and return visit.
      </p>
    </div>
  );
}
