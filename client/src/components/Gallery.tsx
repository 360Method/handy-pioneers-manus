import { useState } from "react";

// Real before/after project photos from Handy Pioneers
const galleryItems = [
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/adu-conversion_ed585b3c.jpg",
    title: "Bonus Room → ADU Conversion",
    description: "Full kitchen build-out in converted bonus room",
    category: "Remodeling",
    location: "Vancouver, WA",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/new-bathroom_3c55bd88.jpg",
    title: "New Bathroom Installation",
    description: "Complete bathroom added from empty room",
    category: "Remodeling",
    location: "Clark County, WA",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/basement-upgrade_ec9135c7.jpg",
    title: "Basement Upgrade",
    description: "Full basement renovation with new flooring & drywall",
    category: "Remodeling",
    location: "Vancouver, WA",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/kitchen-shelves_13a61a81.jpg",
    title: "Kitchen Shelf Install",
    description: "Custom open shelving with subway tile backsplash",
    category: "Carpentry",
    location: "Camas, WA",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/railing-install_7c601685.jpg",
    title: "Stair Railing Install",
    description: "New safety railing added to open staircase",
    category: "Carpentry",
    location: "Battle Ground, WA",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/light-fixture-2_72156f07.jpg",
    title: "Light Fixture Upgrade",
    description: "Modern chandelier replacing outdated fixture",
    category: "Home Repair",
    location: "Vancouver, WA",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/light-fixture-1_5f997e6e.jpg",
    title: "Ceiling Light Replacement",
    description: "Industrial-style flush mount installation",
    category: "Home Repair",
    location: "Ridgefield, WA",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/smart-lock_e5016a4e.jpg",
    title: "Smart Lock Installation",
    description: "Keypad smart lock with new hardware set",
    category: "Home Repair",
    location: "Washougal, WA",
  },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-20" style={{ backgroundColor: "oklch(0.97 0.015 80)" }}>
      <div className="container">
        {/* Section header */}
        <div className="reveal mb-12">
          <div className="section-divider mb-4">
            <span className="section-divider-label">Our Work</span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "oklch(0.22 0.05 160)", fontFamily: "'Playfair Display', serif" }}
          >
            Real Projects, Real Results
          </h2>
          <p
            className="text-lg max-w-xl"
            style={{ color: "oklch(0.45 0.03 160)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Before &amp; after photos from actual Clark County homes — no stock images, no staging.
          </p>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className="reveal group relative overflow-hidden rounded-lg cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
              style={{ animationDelay: `${i * 0.08}s` }}
              onClick={() => setLightbox(i)}
            >
              <div className="overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              {/* Hover overlay */}
              <div
                className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(to top, rgba(20,40,30,0.92) 0%, transparent 60%)" }}
              >
                <span
                  className="text-xs font-bold uppercase tracking-wider mb-1"
                  style={{ color: "oklch(0.65 0.14 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  {item.category}
                </span>
                <span
                  className="text-sm font-semibold text-white leading-tight"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  {item.title}
                </span>
                <span
                  className="text-xs mt-1"
                  style={{ color: "rgba(255,255,255,0.70)", fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  {item.location}
                </span>
              </div>
              {/* Category badge */}
              <div
                className="absolute top-3 left-3 px-2 py-1 rounded text-xs font-bold uppercase tracking-wide"
                style={{
                  backgroundColor: "oklch(0.22 0.05 160)",
                  color: "oklch(0.65 0.14 65)",
                  fontFamily: "'Source Sans 3', sans-serif",
                }}
              >
                {item.category}
              </div>
              {/* Click to expand hint */}
              <div
                className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: "rgba(255,255,255,0.20)" }}
              >
                <span className="text-white text-xs">⤢</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="reveal mt-10 text-center">
          <p
            className="text-sm mb-4"
            style={{ color: "oklch(0.45 0.03 160)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Ready to transform your home? Book a free estimate today.
          </p>
          <button
            className="hcp-button"
            onClick={() => (window as any).HCPWidget?.openModal()}
          >
            Request Estimate Today
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.92)" }}
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute -top-10 right-0 text-white/70 hover:text-white text-sm font-semibold uppercase tracking-wider"
              onClick={() => setLightbox(null)}
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              ✕ Close
            </button>
            <img
              src={galleryItems[lightbox].src}
              alt={galleryItems[lightbox].title}
              className="w-full rounded-lg shadow-2xl"
            />
            <div className="mt-3 text-center">
              <p
                className="text-white font-semibold"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {galleryItems[lightbox].title}
              </p>
              <p
                className="text-sm mt-1"
                style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                {galleryItems[lightbox].description} · {galleryItems[lightbox].location}
              </p>
            </div>
            {/* Prev/Next */}
            <div className="flex justify-between mt-4">
              <button
                className="text-white/70 hover:text-white text-sm font-semibold"
                onClick={() => setLightbox((lightbox - 1 + galleryItems.length) % galleryItems.length)}
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                ← Previous
              </button>
              <button
                className="text-white/70 hover:text-white text-sm font-semibold"
                onClick={() => setLightbox((lightbox + 1) % galleryItems.length)}
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
