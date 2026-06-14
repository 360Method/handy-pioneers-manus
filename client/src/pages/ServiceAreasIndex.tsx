// Service areas hub - /service-areas. Links to active Clark County cities
// and the honest Portland-metro "expanding soon" waitlist pages.
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import FinalCTA from "@/components/FinalCTA";
import SEO from "@/components/SEO";
import { ArrowRight } from "lucide-react";
import { ACTIVE_CITIES, WAITLIST_CITIES } from "@/lib/cities";

export default function ServiceAreasIndex() {
  return (
    <>
      <SEO
        path="/service-areas"
        title="Service Areas - Clark County, WA | Handy Pioneers"
        description="Handy Pioneers serves all of Clark County, WA: Vancouver, Camas, Washougal, Ridgefield, Battle Ground, La Center, and more. Expanding soon to the greater Portland metro."
      />
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: "oklch(0.98 0.012 80)", fontFamily: "'Source Sans 3', sans-serif" }}>
        <TopBar />
        <Navbar />
        <section className="py-16 md:py-20" style={{ backgroundColor: "oklch(0.22 0.07 160)" }}>
          <div className="container max-w-4xl mx-auto px-6">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "oklch(0.65 0.14 65)" }}>Where We Work</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Serving all of Clark County, Washington</h1>
            <p className="mt-4 text-lg" style={{ color: "rgba(255,255,255,0.78)", maxWidth: "640px" }}>From Vancouver to the foothills, we care for homes across Clark County, and we're expanding into the greater Portland metro next.</p>
          </div>
        </section>
        <section className="py-14 md:py-16">
          <div className="container max-w-4xl mx-auto px-6">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "oklch(0.65 0.14 65)" }}>Clark County, WA</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-14">
              {ACTIVE_CITIES.map((c) => (
                <Link key={c.slug} href={`/service-areas/${c.slug}`} className="flex items-center justify-between px-4 py-3 rounded-lg border text-sm font-semibold hover:opacity-80" style={{ borderColor: "oklch(0.88 0.015 80)", color: "oklch(0.22 0.07 160)", backgroundColor: "oklch(1 0 0)" }}>
                  {c.name}, WA<ArrowRight size={15} style={{ color: "oklch(0.65 0.14 65)" }} />
                </Link>
              ))}
            </div>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "oklch(0.65 0.14 65)" }}>Expanding soon: Greater Portland Metro</h2>
            <p className="text-sm mb-5" style={{ color: "oklch(0.50 0.02 80)" }}>We're not serving Oregon yet. Join a waitlist and you'll be first to know when we cross the river.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {WAITLIST_CITIES.map((c) => (
                <Link key={c.slug} href={`/service-areas/${c.slug}`} className="flex items-center justify-between px-4 py-3 rounded-lg border text-sm font-semibold hover:opacity-80" style={{ borderColor: "oklch(0.90 0.02 65)", color: "oklch(0.40 0.08 65)", backgroundColor: "oklch(0.99 0.01 65)" }}>
                  {c.name}, OR<ArrowRight size={15} style={{ color: "oklch(0.65 0.14 65)" }} />
                </Link>
              ))}
            </div>
          </div>
        </section>
        <FinalCTA />
        <Footer />
      </div>
    </>
  );
}
