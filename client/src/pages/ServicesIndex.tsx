// Services hub - /services. Internal-link hub to every service page.
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import FinalCTA from "@/components/FinalCTA";
import SEO from "@/components/SEO";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/services";

export default function ServicesIndex() {
  return (
    <>
      <SEO
        path="/services"
        title="Home Services in Clark County, WA | Handy Pioneers"
        description="Remodeling, deck and rot repair, painting, flooring, gutters, carpentry, and proactive maintenance for Vancouver WA and all of Clark County. One accountable team."
      />
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: "oklch(0.98 0.012 80)", fontFamily: "'Source Sans 3', sans-serif" }}>
        <TopBar />
        <Navbar />
        <section className="py-16 md:py-20" style={{ backgroundColor: "oklch(0.22 0.07 160)" }}>
          <div className="container max-w-4xl mx-auto px-6">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "oklch(0.65 0.14 65)" }}>Our Services · Clark County, WA</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>What we do, and how we keep your home holding its value</h1>
            <p className="mt-4 text-lg" style={{ color: "rgba(255,255,255,0.78)", maxWidth: "640px" }}>From a single repair to a full remodel to year-round care, one team accountable for the result. Serving Vancouver, Camas, Washougal, Ridgefield, Battle Ground, and all of Clark County.</p>
          </div>
        </section>
        <section className="py-14 md:py-16">
          <div className="container max-w-4xl mx-auto px-6">
            <div className="grid sm:grid-cols-2 gap-4">
              {SERVICES.map((s) => (
                <a key={s.slug} href={`/services/${s.slug}`} target="_blank" rel="noopener noreferrer" className="group rounded-2xl border p-6 transition-shadow hover:shadow-md" style={{ backgroundColor: "oklch(1 0 0)", borderColor: "oklch(0.88 0.015 80)" }}>
                  <h2 className="text-lg font-bold flex items-center justify-between" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}>
                    {s.name}
                    <ArrowRight size={16} className="opacity-50 group-hover:translate-x-1 transition-transform" style={{ color: "oklch(0.65 0.14 65)" }} />
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "oklch(0.42 0.02 80)" }}>{s.intro[0]}</p>
                </a>
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
