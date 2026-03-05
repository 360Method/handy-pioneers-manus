import { Star } from "lucide-react";

declare global {
  interface Window {
    HCPWidget?: { openModal: () => void };
  }
}

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/hp-hero-bg-R4GcYQJHeouBp86VQhqvCa.webp";

export default function Hero() {
  const handleBookOnline = () => {
    if (window.HCPWidget) window.HCPWidget.openModal();
  };

  return (
    <section
      className="relative min-h-[90vh] flex items-center"
      style={{
        backgroundImage: `url(${HERO_BG})`,
        backgroundSize: "cover",
        backgroundPosition: "center 30%",
      }}
    >
      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(20,35,28,0.88) 0%, rgba(20,35,28,0.70) 50%, rgba(20,35,28,0.30) 100%)",
        }}
      />

      <div className="container relative z-10">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="#C8892A" color="#C8892A" />
              ))}
            </div>
            <span
              className="text-sm font-semibold"
              style={{ color: "oklch(0.80 0.10 65)", fontFamily: "'Source Sans 3', sans-serif" }}
            >
              5-Star Rated · Licensed &amp; Insured
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Your Trusted
            <br />
            <span style={{ color: "oklch(0.80 0.10 65)" }}>Vancouver</span>
            <br />
            Handyman &amp;
            <br />
            Remodeler
          </h1>

          {/* Subheadline */}
          <p
            className="text-lg md:text-xl mb-8 leading-relaxed"
            style={{ color: "rgba(255,255,255,0.85)", fontFamily: "'Source Sans 3', sans-serif", maxWidth: "520px" }}
          >
            Quality craftsmanship and reliable service for all your home repair
            and remodeling needs. Proudly serving Clark County, WA — backed by
            a 1-year labor guarantee.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              className="hcp-button text-base px-8 py-4"
              onClick={handleBookOnline}
              style={{ fontSize: "1rem", padding: "1rem 2.5rem" }}
            >
              Click to Request Estimate Online
            </button>
            <a
              href="tel:+13605449858"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded font-bold uppercase tracking-wide text-base border-2 border-white text-white hover:bg-white/10 transition-all"
              style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "1rem" }}
            >
              📞 (360) 544-9858
            </a>
          </div>

          {/* Service area note */}
          <p
            className="mt-6 text-sm"
            style={{ color: "rgba(255,255,255,0.60)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Serving Vancouver · Camas · Battle Ground · Ridgefield · Washougal · La Center
          </p>
        </div>
      </div>
    </section>
  );
}
