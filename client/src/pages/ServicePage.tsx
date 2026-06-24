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
import NotFound from "./NotFound";

const SITE = "https://handypioneers.com";

export function serviceJsonLd(svc: ServiceDef): Record<string, unknown>[] {
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
              src={svc.image}
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
