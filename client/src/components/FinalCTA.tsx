const CTA_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/hp-cta-bg-aoXSQumAFkkVoFJ3HQ2vPV.webp";

export default function FinalCTA() {
  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{
        backgroundImage: `url(${CTA_BG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(20, 35, 28, 0.88)" }}
      />

      <div className="container relative z-10 text-center">
        <div className="reveal max-w-2xl mx-auto">
          {/* Diamond divider */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px flex-1 max-w-16" style={{ backgroundColor: "oklch(0.65 0.14 65)" }} />
            <div
              className="w-3 h-3 rotate-45"
              style={{ backgroundColor: "oklch(0.65 0.14 65)" }}
            />
            <div className="h-px flex-1 max-w-16" style={{ backgroundColor: "oklch(0.65 0.14 65)" }} />
          </div>

          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Ready to Start Your Project?
          </h2>
          <p
            className="text-lg md:text-xl mb-10 leading-relaxed"
            style={{
              color: "rgba(255,255,255,0.80)",
              fontFamily: "'Source Sans 3', sans-serif",
            }}
          >
            Book online in minutes and get a free, no-obligation estimate. Licensed,
            insured, and backed by a 1-year labor guarantee.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="hcp-button"
              onClick={() => (window as any).HCPWidget?.openModal()}
              style={{ fontSize: "1.125rem", padding: "1.125rem 2.5rem" }}
            >
              Request Estimate Today!
            </button>
            <a
              href="tel:+13605449858"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded font-bold uppercase tracking-wide text-base border-2 border-white/50 text-white hover:bg-white/10 transition-all"
              style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "1.125rem" }}
            >
              📞 (360) 544-9858
            </a>
          </div>

          <p
            className="mt-8 text-sm"
            style={{ color: "rgba(255,255,255,0.50)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Serving Vancouver · Camas · Battle Ground · Ridgefield · Washougal · La Center
          </p>
        </div>
      </div>
    </section>
  );
}
