/**
 * Method360Step.tsx - /360-method/:step
 *
 * One page per step of the 360 Method. The canon step (name, number, the
 * roadmap sentence, phase tone) comes from methodCanon.ts; everything else
 * comes from methodSteps.ts. The page teaches the step to any homeowner first,
 * then shows how the Proactive Path delivers it. Mirrors the static body in
 * scripts/generate-static-pages.ts (methodStepBodyHtml) so crawlers and
 * visitors read the same thing.
 *
 * Unknown or not yet published slugs render NotFound, the same way
 * ServicePage does; the server's VALID_ROUTES accepts the nine keys.
 */
import { useEffect } from "react";
import { Link, useParams, useLocation } from "wouter";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ZoomableImage from "@/components/ZoomableImage";
import FaqAccordion from "@/components/FaqAccordion";
import ThreeSixtyRoadmap from "@/components/method/ThreeSixtyRoadmap";
import NotFound from "./NotFound";
import { METHOD_CANON } from "@/lib/methodCanon";
import { getStepPage, stepView, stepNeighbors, comingLabel, methodStepJsonLd, STEP_PATH, type MethodStepPage } from "@/lib/methodSteps";
import { getPublishedPosts } from "@/lib/blog";
import { SERVICES } from "@/lib/services";
import { openInquiry } from "@/lib/inquiry";
import { track } from "@/lib/analytics";

const INK = "oklch(0.22 0.07 160)";
const GOLD = "oklch(0.65 0.14 65)";
const BODY = "oklch(0.42 0.02 80)";
const HAIR = "oklch(0.88 0.015 80)";
const SANS = "'Source Sans 3', sans-serif";
const SERIF = "'Playfair Display', serif";

function CtaButtons({ page, dark }: { page: MethodStepPage; dark?: boolean }) {
  const [, navigate] = useLocation();
  const primary = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded font-bold uppercase tracking-wide text-sm transition-opacity hover:opacity-90";
  const secondary = `inline-flex items-center justify-center gap-2 px-6 py-3 rounded font-semibold text-sm border transition-opacity hover:opacity-80 ${dark ? "text-white" : ""}`;
  const secStyle = dark ? { borderColor: "rgba(255,255,255,0.35)", fontFamily: SANS } : { borderColor: HAIR, color: INK, fontFamily: SANS };
  const go = (href: string, label: string) => {
    track("cta_click", { location: `method_step_${page.key}`, label });
    navigate(href);
  };
  if (page.cta === "baseline") {
    return (
      <>
        <button className={primary} style={{ backgroundColor: GOLD, color: "white", fontFamily: SANS }} onClick={() => go("/membership", "baseline")}>
          Schedule your Baseline Walkthrough <ArrowRight size={16} />
        </button>
        <button className={secondary} style={secStyle} onClick={() => go("/roadmap-generator", "roadmap")}>
          Turn an inspection report into a roadmap
        </button>
      </>
    );
  }
  if (page.cta === "roadmap") {
    return (
      <>
        <button className={primary} style={{ backgroundColor: GOLD, color: "white", fontFamily: SANS }} onClick={() => go("/roadmap-generator", "roadmap")}>
          Get your 360 Roadmap <ArrowRight size={16} />
        </button>
        <button className={secondary} style={secStyle} onClick={() => { track("cta_click", { location: `method_step_${page.key}`, label: "consultation" }); openInquiry(); }}>
          Schedule a Consultation
        </button>
      </>
    );
  }
  return (
    <>
      <button className={primary} style={{ backgroundColor: GOLD, color: "white", fontFamily: SANS }} onClick={() => { track("cta_click", { location: `method_step_${page.key}`, label: "consultation" }); openInquiry(); }}>
        Schedule a Consultation <ArrowRight size={16} />
      </button>
      <button className={secondary} style={secStyle} onClick={() => go("/membership", "membership")}>
        See the Proactive Path plans
      </button>
    </>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <div className="mb-6">
      {eyebrow && <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: GOLD, fontFamily: SANS }}>{eyebrow}</p>}
      <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: SERIF, color: INK }}>{title}</h2>
    </div>
  );
}

export default function Method360Step() {
  const params = useParams<{ step: string }>();
  const [, navigate] = useLocation();
  const page = getStepPage(params.step);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [params.step]);

  if (!page) return <NotFound />;

  const v = stepView(page);
  const { prev, next } = stepNeighbors(page.key);
  const accent = v.phase.tone.accent;
  const path = STEP_PATH(page.key);
  const related = getPublishedPosts().filter((p) => page.relatedBlogSlugs.includes(p.slug));
  const services = SERVICES.filter((s) => page.relatedServiceSlugs.includes(s.slug));

  return (
    <>
      <SEO
        path={path}
        title={page.seoTitle}
        description={page.seoDesc}
        image={v.og}
        ogType="article"
        publishedTime={page.publishDate}
        author="Marcin Micek"
        jsonLd={methodStepJsonLd(page)}
      />
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: "oklch(0.98 0.005 80)", fontFamily: SANS }}>
        <TopBar />
        <Navbar />

        {/* Hero */}
        <section className="py-14 md:py-20" style={{ backgroundColor: INK }}>
          <div className="container max-w-5xl mx-auto px-6">
            <nav aria-label="Breadcrumb" className="text-xs mb-5" style={{ color: "rgba(255,255,255,0.6)" }}>
              <Link href="/" className="hover:opacity-80">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/360-method" className="hover:opacity-80">The 360° Method</Link>
              <span className="mx-2">/</span>
              <Link href={`/360-method#${v.phaseKey}`} className="hover:opacity-80">{v.phase.label}</Link>
              <span className="mx-2">/</span>
              <span style={{ color: "rgba(255,255,255,0.85)" }}>Step {v.step.number}: {v.step.name}</span>
            </nav>
            <div className="grid md:grid-cols-5 gap-8 md:gap-10 items-center">
              <div className="md:col-span-3">
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "oklch(0.80 0.10 65)" }}>
                  The 360° Method · {v.phase.label} · Step {v.step.number} of 9
                </p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight" style={{ fontFamily: SERIF }}>{page.h1}</h1>
                <p className="mt-5 text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.82)", maxWidth: "600px" }}>{v.step.line}</p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <CtaButtons page={page} dark />
                </div>
              </div>
              <div className="md:col-span-2 w-full max-w-[520px] mx-auto">
                <ZoomableImage
                  src={v.panel}
                  alt={page.panelAlt}
                  caption={`Step ${v.step.number}: ${v.step.name}, from the 360 Method roadmap`}
                  className="w-full h-auto rounded-xl shadow-lg"
                  style={{ border: "1px solid rgba(255,255,255,0.15)", backgroundColor: "#faf6ef" }}
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </section>

        {/* You are here */}
        <section className="py-6 border-b" style={{ backgroundColor: "oklch(0.95 0.008 80)", borderColor: HAIR }}>
          <div className="container max-w-5xl mx-auto px-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
            <ThreeSixtyRoadmap canon={METHOD_CANON} variant="strip" currentStepKey={page.key} />
            <p className="text-sm font-semibold" style={{ color: INK }}>
              You are here: Step {v.step.number}, {v.step.name}.{" "}
              <Link href="/360-method" className="underline underline-offset-4 font-normal" style={{ color: "oklch(0.32 0.07 160)" }}>See the whole roadmap</Link>
            </p>
          </div>
        </section>

        {/* The gap */}
        <section className="py-14 md:py-16">
          <div className="container max-w-5xl mx-auto px-6">
            <SectionTitle eyebrow="The gap" title={METHOD_CANON.subtitle} />
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl p-7 border" style={{ backgroundColor: "oklch(1 0 0)", borderColor: HAIR }}>
                <h3 className="text-lg font-bold mb-4" style={{ fontFamily: SERIF, color: INK }}>{page.gap.nowTitle}</h3>
                <ul className="space-y-3">
                  {page.gap.now.map((t) => (
                    <li key={t} className="flex items-start gap-3 text-base" style={{ color: BODY }}>
                      <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "oklch(0.55 0.02 80)" }} />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl p-7 border" style={{ backgroundColor: v.phase.tone.wash, borderColor: accent }}>
                <h3 className="text-lg font-bold mb-4" style={{ fontFamily: SERIF, color: accent }}>{page.gap.couldTitle}</h3>
                <ul className="space-y-3">
                  {page.gap.could.map((t) => (
                    <li key={t} className="flex items-start gap-3 text-base" style={{ color: INK }}>
                      <Check size={18} className="shrink-0 mt-0.5" style={{ color: accent }} />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* What the step is + DIY */}
        <section className="py-14 md:py-16" style={{ backgroundColor: "oklch(0.95 0.008 80)" }}>
          <div className="container max-w-3xl mx-auto px-6">
            <SectionTitle eyebrow={`Step ${v.step.number}`} title={`What ${v.step.name} means`} />
            {page.whatItIs.map((p) => (
              <p key={p.slice(0, 40)} className="text-base md:text-lg leading-relaxed mb-5" style={{ color: BODY }}>{p}</p>
            ))}
            <h3 className="text-xl font-bold mt-10 mb-4" style={{ fontFamily: SERIF, color: INK }}>Do it yourself this season</h3>
            <ol className="space-y-3">
              {page.diySteps.map((s, i) => (
                <li key={s} className="flex items-start gap-4 text-base" style={{ color: BODY }}>
                  <span className="w-7 h-7 rounded-full shrink-0 inline-flex items-center justify-center text-xs font-bold" style={{ backgroundColor: v.phase.tone.wash, color: accent, border: `1px solid ${accent}` }}>{i + 1}</span>
                  <span className="pt-0.5">{s}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* How HP delivers it */}
        <section className="py-14 md:py-16">
          <div className="container max-w-3xl mx-auto px-6">
            <SectionTitle eyebrow="Inside the Proactive Path" title={`How Handy Pioneers delivers ${v.step.name}`} />
            <div className="rounded-2xl p-7 border" style={{ backgroundColor: "oklch(1 0 0)", borderColor: HAIR }}>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded" style={{ backgroundColor: accent, color: v.phase.tone.onAccent }}>{page.delivery.customerLabel}</span>
                <span className="text-sm" style={{ color: BODY }}>{page.delivery.cadence}</span>
              </div>
              <ul className="space-y-2.5 mb-5">
                {page.delivery.included.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-base" style={{ color: BODY }}>
                    <Check size={18} className="shrink-0 mt-0.5" style={{ color: GOLD }} />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm leading-relaxed" style={{ color: INK }}>{page.delivery.plans}</p>
              {page.delivery.yearTwoPlus && (
                <p className="text-sm leading-relaxed mt-2" style={{ color: BODY }}>{page.delivery.yearTwoPlus}</p>
              )}
              <Link href="/membership#pricing" className="inline-flex items-center gap-1 mt-4 font-semibold text-sm hover:opacity-80" style={{ color: "oklch(0.45 0.12 160)" }}>
                Compare the plans <ArrowRight size={15} />
              </Link>
            </div>

            {/* DIY vs with us */}
            <h3 className="text-xl font-bold mt-12 mb-4" style={{ fontFamily: SERIF, color: INK }}>On your own, or with us</h3>
            <div className="hidden sm:block rounded-2xl border overflow-hidden" style={{ borderColor: HAIR, backgroundColor: "oklch(1 0 0)" }}>
              <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "oklch(0.95 0.008 80)" }}>
                    <th className="text-left px-5 py-3 font-bold" style={{ color: INK }}> </th>
                    <th className="text-left px-5 py-3 font-bold" style={{ color: INK }}>On your own</th>
                    <th className="text-left px-5 py-3 font-bold" style={{ color: accent }}>With Handy Pioneers</th>
                  </tr>
                </thead>
                <tbody>
                  {page.diyVsWithUs.map((r) => (
                    <tr key={r.row} className="border-t" style={{ borderColor: HAIR }}>
                      <td className="px-5 py-3 font-semibold align-top" style={{ color: INK }}>{r.row}</td>
                      <td className="px-5 py-3 align-top" style={{ color: BODY }}>{r.diy}</td>
                      <td className="px-5 py-3 align-top" style={{ color: INK }}>{r.withUs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="sm:hidden space-y-3">
              {page.diyVsWithUs.map((r) => (
                <div key={r.row} className="rounded-xl border p-4" style={{ borderColor: HAIR, backgroundColor: "oklch(1 0 0)" }}>
                  <p className="font-bold text-sm mb-2" style={{ color: INK }}>{r.row}</p>
                  <p className="text-sm mb-1.5" style={{ color: BODY }}><span className="font-semibold">On your own:</span> {r.diy}</p>
                  <p className="text-sm" style={{ color: INK }}><span className="font-semibold" style={{ color: accent }}>With us:</span> {r.withUs}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 md:py-16" style={{ backgroundColor: "oklch(0.95 0.008 80)" }}>
          <div className="container max-w-3xl mx-auto px-6">
            <SectionTitle title="Common questions" />
            <div className="rounded-2xl border overflow-hidden" style={{ backgroundColor: "oklch(1 0 0)", borderColor: HAIR }}>
              <div className="px-7">
                {page.faq.map((f) => <FaqAccordion key={f.q} q={f.q} a={f.a} />)}
              </div>
            </div>
          </div>
        </section>

        {/* Where this sits + prev/next */}
        <section className="py-14 md:py-16">
          <div className="container max-w-5xl mx-auto px-6">
            <SectionTitle eyebrow="Where this sits" title="One step of nine" />
            <div className="rounded-2xl p-4 sm:p-6 border" style={{ backgroundColor: "oklch(0.98 0.005 80)", borderColor: HAIR }}>
              <ThreeSixtyRoadmap
                canon={METHOD_CANON}
                variant="compact"
                currentStepKey={page.key}
                footnote
                onSelect={(k) => { if (getStepPage(k)) navigate(STEP_PATH(k)); }}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              {prev ? (
                prev.published ? (
                  <Link href={STEP_PATH(prev.page.key)} className="rounded-xl border p-5 flex items-center gap-3 hover:shadow-md transition-shadow" style={{ borderColor: HAIR, backgroundColor: "oklch(1 0 0)" }}>
                    <ArrowLeft size={18} style={{ color: GOLD }} />
                    <span>
                      <span className="block text-xs uppercase tracking-widest font-bold" style={{ color: GOLD }}>Previous</span>
                      <span className="block font-semibold" style={{ color: INK }}>Step {stepView(prev.page).step.number}: {stepView(prev.page).step.name}</span>
                    </span>
                  </Link>
                ) : (
                  <div className="rounded-xl border p-5" style={{ borderColor: HAIR, color: BODY }}>
                    <span className="block text-xs uppercase tracking-widest font-bold">Previous</span>
                    <span className="block font-semibold">Step {stepView(prev.page).step.number}: {stepView(prev.page).step.name}</span>
                    <span className="block text-xs mt-1">{comingLabel(prev.page)}</span>
                  </div>
                )
              ) : (
                <Link href="/360-method" className="rounded-xl border p-5 flex items-center gap-3 hover:shadow-md transition-shadow" style={{ borderColor: HAIR, backgroundColor: "oklch(1 0 0)" }}>
                  <ArrowLeft size={18} style={{ color: GOLD }} />
                  <span className="font-semibold" style={{ color: INK }}>The 360° Method overview</span>
                </Link>
              )}
              {next ? (
                next.published ? (
                  <Link href={STEP_PATH(next.page.key)} className="rounded-xl border p-5 flex items-center justify-end gap-3 text-right hover:shadow-md transition-shadow" style={{ borderColor: HAIR, backgroundColor: "oklch(1 0 0)" }}>
                    <span>
                      <span className="block text-xs uppercase tracking-widest font-bold" style={{ color: GOLD }}>Next</span>
                      <span className="block font-semibold" style={{ color: INK }}>Step {stepView(next.page).step.number}: {stepView(next.page).step.name}</span>
                    </span>
                    <ArrowRight size={18} style={{ color: GOLD }} />
                  </Link>
                ) : (
                  <div className="rounded-xl border p-5 text-right" style={{ borderColor: HAIR, color: BODY }}>
                    <span className="block text-xs uppercase tracking-widest font-bold">Next</span>
                    <span className="block font-semibold">Step {stepView(next.page).step.number}: {stepView(next.page).step.name}</span>
                    <span className="block text-xs mt-1">{comingLabel(next.page)}</span>
                  </div>
                )
              ) : (
                <Link href="/membership" className="rounded-xl border p-5 flex items-center justify-end gap-3 text-right hover:shadow-md transition-shadow" style={{ borderColor: HAIR, backgroundColor: "oklch(1 0 0)" }}>
                  <span className="font-semibold" style={{ color: INK }}>Have the whole method run for you</span>
                  <ArrowRight size={18} style={{ color: GOLD }} />
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* Related reading */}
        {(related.length > 0 || services.length > 0) && (
          <section className="py-14 md:py-16" style={{ backgroundColor: "oklch(0.95 0.008 80)" }}>
            <div className="container max-w-5xl mx-auto px-6">
              <SectionTitle title="Related reading" />
              <div className="grid md:grid-cols-2 gap-8">
                {related.length > 0 && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: GOLD }}>From the blog</p>
                    <ul className="space-y-3">
                      {related.map((p) => (
                        <li key={p.slug}>
                          <Link href={`/blog/${p.slug}`} className="font-semibold hover:opacity-80" style={{ color: INK }}>{p.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {services.length > 0 && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: GOLD }}>Services that fit this step</p>
                    <ul className="space-y-3">
                      {services.map((s) => (
                        <li key={s.slug}>
                          <Link href={`/services/${s.slug}`} className="font-semibold hover:opacity-80" style={{ color: INK }}>{s.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* CTA band */}
        <section className="py-16 md:py-20" style={{ backgroundColor: INK }}>
          <div className="container max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: SERIF }}>
              {page.cta === "baseline" && "Start with the house you have"}
              {page.cta === "roadmap" && "Turn the list into a plan"}
              {page.cta === "consultation" && "Talk it through with someone who knows houses"}
            </h2>
            <p className="text-lg mb-8" style={{ color: "rgba(255,255,255,0.75)" }}>
              {page.cta === "baseline" && "A documented baseline is where every Proactive Path membership begins. Or send us the inspection report you already have."}
              {page.cta === "roadmap" && "Send us the inspection report you already paid for and get it back sorted into NOW, SOON and WAIT. Or book a consultation and we will walk the house with you."}
              {page.cta === "consultation" && "A consultation is a conversation about your home, in order of what matters. No pressure, and you keep the notes."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <CtaButtons page={page} dark />
            </div>
            {page.key === "scale" && (
              <p className="mt-6 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                {METHOD_CANON.footnote}{" "}
                <Link href="/financing" className="underline underline-offset-4">How homeowners commonly fund a project</Link>
              </p>
            )}
          </div>
        </section>

        {/* Disclaimer strip */}
        <section className="py-8" style={{ backgroundColor: "oklch(0.94 0.008 80)" }}>
          <div className="container max-w-3xl mx-auto px-6 text-xs leading-relaxed" style={{ color: BODY }}>
            {page.disclaimer === "inspection" && (
              <p className="mb-2">
                The 360° Method baseline and seasonal walkthroughs are proactive maintenance assessments by a trained home maintenance technician. They are not a licensed real estate home inspection and do not replace one. For a purchase or sale, engage a licensed home inspector.
              </p>
            )}
            {page.disclaimer === "education" && (
              <p className="mb-2">{METHOD_CANON.footnote} Handy Pioneers is a home service and remodel company, not a lender, broker or financial advisor. Talk to a qualified professional before making financial decisions about your home.</p>
            )}
            <p>
              The 360° Method™ and Proactive Path™, including the three-phase structure and the nine-step framework, are the proprietary methodology of Handy Pioneers. Any homeowner is welcome to use the steps on their own home.
            </p>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
