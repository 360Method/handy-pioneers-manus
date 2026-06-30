// Service detail page - /services/:slug
// Renders from client/src/lib/services.ts. Mirrors the generator's static
// output (scripts/generate-static-pages.ts) so crawlers and users see the same.

import { useState } from "react";
import { useParams, Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import FinalCTA from "@/components/FinalCTA";
import SEO from "@/components/SEO";
import { ChevronDown, ArrowRight, Check } from "lucide-react";
import { openInquiry } from "@/lib/inquiry";
import { getService, type ServiceDef } from "@/lib/services";
import RemodelCostCalculator, { CostBandLine } from "@/components/RemodelCostCalculator";
import { getPreset, presetsByCategory, highLevelBand, formatBand } from "@/lib/remodelCost";
import { localImage } from "@/lib/img";

const ADU_HUB = "/services/accessory-dwelling-units";
import NotFound from "./NotFound";

const SITE = "https://handypioneers.com";

export function serviceJsonLd(svc: ServiceDef): Record<string, unknown>[] {
  const preset = svc.costKey ? getPreset(svc.costKey) : undefined;
  const offers = preset
    ? (() => {
        const band = highLevelBand(preset);
        return {
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "USD",
            lowPrice: band.low,
            highPrice: band.high,
            description: `Typical retail investment range for a ${preset.label.toLowerCase()} in Clark County, WA.`,
          },
        };
      })()
    : {};
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: svc.name,
      serviceType: svc.serviceType,
      description: svc.seoDesc,
      provider: { "@type": "LocalBusiness", "@id": `${SITE}/#business`, name: "Handy Pioneers", telephone: "(360) 838-6731", url: SITE },
      areaServed: { "@type": "AdministrativeArea", name: "Clark County, Washington" },
      url: `${SITE}/services/${svc.slug}`,
      ...offers,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        { "@type": "ListItem", position: 2, name: "Services", item: `${SITE}/services` },
        { "@type": "ListItem", position: 3, name: svc.name, item: `${SITE}/services/${svc.slug}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: svc.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];
}

function Accordion({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b last:border-b-0" style={{ borderColor: "oklch(0.88 0.015 80)" }}>
      <button
        className="w-full text-left py-5 flex items-start justify-between gap-4"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="text-base font-semibold leading-snug" style={{ fontFamily: "'Source Sans 3', sans-serif", color: "oklch(0.22 0.07 160)" }}>{q}</span>
        <ChevronDown size={18} className="shrink-0 mt-0.5 transition-transform duration-200" style={{ color: "oklch(0.65 0.14 65)", transform: open ? "rotate(180deg)" : "rotate(0deg)" }} />
      </button>
      {open && (
        <div className="pb-5 text-sm leading-relaxed" style={{ color: "oklch(0.42 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}>{a}</div>
      )}
    </div>
  );
}

export default function ServicePage() {
  const params = useParams<{ slug: string }>();
  const svc = getService(params.slug);
  if (!svc) return <NotFound />;
  const costPreset = svc.costKey ? getPreset(svc.costKey) : undefined;

  return (
    <>
      <SEO
        path={`/services/${svc.slug}`}
        title={svc.seoTitle}
        description={svc.seoDesc}
        image={svc.image}
        jsonLd={serviceJsonLd(svc)}
      />
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: "oklch(0.98 0.012 80)", fontFamily: "'Source Sans 3', sans-serif" }}>
        <TopBar />
        <Navbar />

        {/* Hero */}
        <section className="py-16 md:py-20" style={{ backgroundColor: "oklch(0.22 0.07 160)" }}>
          <div className="container max-w-3xl mx-auto px-6">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "oklch(0.65 0.14 65)" }}>
              <Link href="/services" className="hover:opacity-80" style={{ color: "oklch(0.65 0.14 65)" }}>Services</Link> · Clark County, WA
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>{svc.h1}</h1>
            {svc.intro.map((p, i) => (
              <p key={i} className="mt-4 text-lg" style={{ color: "rgba(255,255,255,0.78)", maxWidth: "640px" }}>{p}</p>
            ))}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button className="hcp-button" onClick={() => openInquiry()}>Schedule a Consultation</button>
              <a href="tel:+13608386731" className="inline-flex items-center justify-center px-6 py-3 rounded-lg border font-semibold text-sm text-white transition-opacity hover:opacity-80" style={{ borderColor: "rgba(255,255,255,0.35)" }}>Call (360) 838-6731</a>
            </div>
          </div>
        </section>

        {/* Hero image */}
        {svc.image && (
          <div className="container max-w-3xl mx-auto px-6 -mt-10 md:-mt-12 relative z-10">
            <img
              src={localImage(svc.image)}
              alt={svc.imageAlt}
              width={1600}
              height={900}
              loading="eager"
              className="w-full rounded-2xl shadow-xl"
              style={{ aspectRatio: "16 / 9", objectFit: "cover", border: "1px solid oklch(0.88 0.015 80)" }}
            />
          </div>
        )}

        <section className="pt-12 pb-14 md:pt-14 md:pb-16">
          <div className="container max-w-3xl mx-auto px-6">
            {/* What it typically costs (only on priced services) */}
            {(svc.costKey || svc.costHub) && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}>What this typically costs</h2>
                {svc.costHub ? (
                  <>
                    <p className="text-base mb-5" style={{ color: "oklch(0.34 0.02 80)" }}>
                      We publish our pricing instead of hiding it. Here are honest, realistic ranges for
                      an average-size project. Premium finishes and larger spaces go higher; the estimator
                      shows how scope moves the number.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4 mb-6">
                      {presetsByCategory(svc.costHub).map((p) => {
                        const inner = (
                          <>
                            <p className="text-sm font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}>{p.label}</p>
                            <p className="text-xl font-bold mt-0.5" style={{ color: "oklch(0.22 0.07 160)" }}>{formatBand(highLevelBand(p), true)}</p>
                            {p.serviceSlug && (
                              <span className="inline-flex items-center gap-1 mt-2 text-sm font-semibold" style={{ color: "oklch(0.45 0.12 160)" }}>
                                Learn more <ArrowRight size={14} />
                              </span>
                            )}
                          </>
                        );
                        return p.serviceSlug ? (
                          <Link key={p.key} href={`/services/${p.serviceSlug}`} className="block rounded-xl p-4 transition-shadow hover:shadow-md" style={{ backgroundColor: "oklch(1 0 0)", border: "1px solid oklch(0.88 0.015 80)" }}>
                            {inner}
                          </Link>
                        ) : (
                          <div key={p.key} className="rounded-xl p-4" style={{ backgroundColor: "oklch(1 0 0)", border: "1px solid oklch(0.88 0.015 80)" }}>
                            {inner}
                          </div>
                        );
                      })}
                    </div>
                    <RemodelCostCalculator category={svc.costHub} />
                  </>
                ) : (
                  <>
                    <p className="text-base mb-5" style={{ color: "oklch(0.34 0.02 80)" }}>
                      <CostBandLine presetKey={svc.costKey!} /> We publish this on purpose: you deserve a
                      realistic number before anyone is standing in your home. Slide the size and finish
                      below to see roughly where your project lands.
                    </p>
                    <RemodelCostCalculator defaultPresetKey={svc.costKey} lockProject />
                  </>
                )}
                {/* 360 Method partnership thread */}
                <p className="text-sm leading-relaxed mt-5" style={{ color: "oklch(0.42 0.02 80)" }}>
                  A project is one step, not the whole plan. In the 360 Method this is the Upgrade stage,
                  and we stay your partner through the next one, Scale ROI, making sure the money you put
                  in actually grows your home's value and gets you where you want to be.
                </p>
                <div className="flex flex-wrap gap-4 mt-3">
                  <Link href="/360-method" className="inline-flex items-center gap-1 font-semibold text-sm hover:opacity-80" style={{ color: "oklch(0.45 0.12 160)" }}>
                    How the 360 Method works <ArrowRight size={15} />
                  </Link>
                  {costPreset?.category === "adu" ? (
                    <Link href={ADU_HUB} className="inline-flex items-center gap-1 font-semibold text-sm hover:opacity-80" style={{ color: "oklch(0.45 0.12 160)" }}>
                      Compare all ADU options <ArrowRight size={15} />
                    </Link>
                  ) : (
                    <Link href="/remodel-cost" className="inline-flex items-center gap-1 font-semibold text-sm hover:opacity-80" style={{ color: "oklch(0.45 0.12 160)" }}>
                      See all project ranges and the full estimator <ArrowRight size={15} />
                    </Link>
                  )}
                </div>
              </div>
            )}

            {/* What's included */}
            <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}>What's included</h2>
            <ul className="space-y-3 mb-12">
              {svc.whatsIncluded.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-base" style={{ color: "oklch(0.34 0.02 80)" }}>
                  <Check size={18} className="shrink-0 mt-1" style={{ color: "oklch(0.55 0.14 160)" }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Signs you need this */}
            <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}>Signs it's time</h2>
            <ul className="space-y-3 mb-12">
              {svc.signsYouNeedThis.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-base" style={{ color: "oklch(0.34 0.02 80)" }}>
                  <ArrowRight size={18} className="shrink-0 mt-1" style={{ color: "oklch(0.65 0.14 65)" }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* FAQ */}
            <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}>Common questions</h2>
            <div className="rounded-2xl border overflow-hidden mb-12" style={{ backgroundColor: "oklch(1 0 0)", borderColor: "oklch(0.88 0.015 80)" }}>
              <div className="px-7">
                {svc.faq.map((f) => <Accordion key={f.q} q={f.q} a={f.a} />)}
              </div>
            </div>

            {/* Rules & resources (official sources, e.g. ADU regulations) */}
            {svc.resources && svc.resources.length > 0 && (
              <div className="rounded-2xl p-7 mb-12" style={{ backgroundColor: "oklch(0.96 0.012 80)", border: "1px solid oklch(0.88 0.015 80)" }}>
                <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}>Rules &amp; resources</h2>
                <p className="text-base mb-4" style={{ color: "oklch(0.34 0.02 80)" }}>
                  We build to code and to the rules where you live, and we want you informed. ADU
                  regulations are set by the state, the county, and your city, and they keep changing.
                  These are the official sources. The first step on any ADU is confirming exactly what
                  applies to your address, which we handle before any design or permit work.
                </p>
                <ul className="space-y-2">
                  {svc.resources.map((r) => (
                    <li key={r.url} className="flex items-start gap-2 text-base" style={{ color: "oklch(0.34 0.02 80)" }}>
                      <ArrowRight size={15} className="shrink-0 mt-1.5" style={{ color: "oklch(0.65 0.14 65)" }} />
                      <a href={r.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-70" style={{ color: "oklch(0.32 0.07 160)" }}>
                        {r.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Membership tie-in */}
            <div className="rounded-2xl p-7 mb-12" style={{ backgroundColor: "oklch(0.95 0.02 160)", border: "1px solid oklch(0.85 0.03 160)" }}>
              <p className="text-base" style={{ color: "oklch(0.30 0.05 160)" }}>{svc.membershipTieIn}</p>
              <Link href="/membership" className="inline-flex items-center gap-1 mt-3 font-semibold text-sm hover:opacity-80" style={{ color: "oklch(0.45 0.12 160)" }}>
                Explore the 360° Method membership <ArrowRight size={15} />
              </Link>
            </div>

            {/* Related services */}
            {svc.relatedServiceSlugs.length > 0 && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "oklch(0.65 0.14 65)" }}>Related services</h2>
                <div className="flex flex-wrap gap-3">
                  {svc.relatedServiceSlugs.map((rs) => {
                    const r = getService(rs);
                    if (!r) return null;
                    return (
                      <a key={rs} href={`/services/${rs}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg border text-sm font-semibold hover:opacity-80" style={{ borderColor: "oklch(0.85 0.015 80)", color: "oklch(0.30 0.05 160)", backgroundColor: "oklch(1 0 0)" }}>{r.name}</a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>

        <FinalCTA />
        <Footer />
      </div>
    </>
  );
}
