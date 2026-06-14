// City / service-area page - /service-areas/:slug
// Active (Clark County WA) and waitlist (Portland metro OR) variants.
// Waitlist pages make NO service claim and carry NO Service/areaServed schema.

import { useParams, Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import FinalCTA from "@/components/FinalCTA";
import SEO from "@/components/SEO";
import { ArrowRight, MapPin } from "lucide-react";
import { openInquiry } from "@/lib/inquiry";
import { getCity, type CityDef } from "@/lib/cities";
import { getService } from "@/lib/services";
import NotFound from "./NotFound";

const SITE = "https://handypioneers.com";

export function cityJsonLd(c: CityDef): Record<string, unknown>[] {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Service Areas", item: `${SITE}/service-areas` },
      { "@type": "ListItem", position: 3, name: c.name, item: `${SITE}/service-areas/${c.slug}` },
    ],
  };
  if (c.status === "waitlist") {
    // Honest pre-seed: a WebPage about an upcoming expansion. NO service claim.
    return [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `Handy Pioneers is expanding to ${c.name}, ${c.state}`,
        description: c.seoDesc,
        url: `${SITE}/service-areas/${c.slug}`,
      },
      breadcrumb,
    ];
  }
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `Home Care & Restoration in ${c.name}, ${c.state}`,
      provider: { "@type": "LocalBusiness", "@id": `${SITE}/#business`, name: "Handy Pioneers", telephone: "(360) 838-6731", url: SITE },
      areaServed: {
        "@type": "City",
        name: c.name,
        address: { "@type": "PostalAddress", addressLocality: c.name, addressRegion: c.state },
        geo: { "@type": "GeoCoordinates", latitude: c.geo.lat, longitude: c.geo.lng },
      },
      url: `${SITE}/service-areas/${c.slug}`,
    },
    breadcrumb,
  ];
}

export default function CityPage() {
  const params = useParams<{ slug: string }>();
  const c = getCity(params.slug);
  if (!c) return <NotFound />;
  const waitlist = c.status === "waitlist";

  return (
    <>
      <SEO path={`/service-areas/${c.slug}`} title={c.seoTitle} description={c.seoDesc} image={c.image} jsonLd={cityJsonLd(c)} />
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: "oklch(0.98 0.012 80)", fontFamily: "'Source Sans 3', sans-serif" }}>
        <TopBar />
        <Navbar />

        <section className="py-16 md:py-20" style={{ backgroundColor: "oklch(0.22 0.07 160)" }}>
          <div className="container max-w-3xl mx-auto px-6">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "oklch(0.65 0.14 65)" }}>
              <Link href="/service-areas" className="hover:opacity-80" style={{ color: "oklch(0.65 0.14 65)" }}>Service Areas</Link> · {c.name}, {c.state}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              {waitlist ? `Coming Soon to ${c.name}, ${c.state}` : `Home Care & Restoration in ${c.name}, WA`}
            </h1>
            {c.intro.map((p, i) => (
              <p key={i} className="mt-4 text-lg" style={{ color: "rgba(255,255,255,0.78)", maxWidth: "640px" }}>{p}</p>
            ))}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              {waitlist ? (
                <button className="hcp-button" onClick={() => openInquiry()}>Join the {c.name} Waitlist</button>
              ) : (
                <>
                  <button className="hcp-button" onClick={() => openInquiry()}>Schedule a Consultation</button>
                  <a href="tel:+13608386731" className="inline-flex items-center justify-center px-6 py-3 rounded-lg border font-semibold text-sm text-white transition-opacity hover:opacity-80" style={{ borderColor: "rgba(255,255,255,0.35)" }}>Call (360) 838-6731</a>
                </>
              )}
            </div>
          </div>
        </section>

        <section className="py-14 md:py-16">
          <div className="container max-w-3xl mx-auto px-6">
            {waitlist ? (
              <div className="rounded-2xl p-7 mb-10" style={{ backgroundColor: "oklch(0.96 0.03 65)", border: "1px solid oklch(0.85 0.06 65)" }}>
                <p className="text-base font-semibold mb-1" style={{ color: "oklch(0.40 0.10 65)" }}>We're not serving Oregon yet.</p>
                <p className="text-sm" style={{ color: "oklch(0.40 0.06 65)" }}>
                  Handy Pioneers is licensed and operating in Washington. We're planning our expansion into the greater Portland metro carefully. Join the waitlist and you'll be the first to hear when we're ready to serve {c.name}, with no pressure in the meantime.
                </p>
                <Link href="/360-method" className="inline-flex items-center gap-1 mt-3 font-semibold text-sm hover:opacity-80" style={{ color: "oklch(0.45 0.12 65)" }}>
                  Learn the 360° Method (it works anywhere in the PNW) <ArrowRight size={15} />
                </Link>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}>What we do in {c.name}</h2>
                <div className="grid sm:grid-cols-2 gap-3 mb-12">
                  {c.servicesOffered.map((slug) => {
                    const s = getService(slug);
                    if (!s) return null;
                    return (
                      <Link key={slug} href={`/services/${slug}`} className="flex items-center justify-between px-4 py-3 rounded-lg border text-sm font-semibold hover:opacity-80" style={{ borderColor: "oklch(0.88 0.015 80)", color: "oklch(0.30 0.05 160)", backgroundColor: "oklch(1 0 0)" }}>
                        {s.name}<ArrowRight size={15} style={{ color: "oklch(0.65 0.14 65)" }} />
                      </Link>
                    );
                  })}
                </div>
                <div className="rounded-2xl p-7 mb-4" style={{ backgroundColor: "oklch(0.95 0.02 160)", border: "1px solid oklch(0.85 0.03 160)" }}>
                  <p className="text-base" style={{ color: "oklch(0.30 0.05 160)" }}>Want your {c.name} home looked after on a schedule instead of patched up when something breaks? That's the Proactive Path.</p>
                  <Link href="/membership" className="inline-flex items-center gap-1 mt-3 font-semibold text-sm hover:opacity-80" style={{ color: "oklch(0.45 0.12 160)" }}>
                    Explore the 360° Method membership <ArrowRight size={15} />
                  </Link>
                </div>
              </>
            )}

            {c.neighborhoods.length > 0 && (
              <p className="text-sm flex items-start gap-2" style={{ color: "oklch(0.50 0.02 80)" }}>
                <MapPin size={15} className="shrink-0 mt-0.5" style={{ color: "oklch(0.65 0.14 65)" }} />
                <span>{waitlist ? "Including" : "Serving"} {c.neighborhoods.join(", ")}, and the surrounding {c.name} area.</span>
              </p>
            )}
          </div>
        </section>

        {!waitlist && <FinalCTA />}
        <Footer />
      </div>
    </>
  );
}
