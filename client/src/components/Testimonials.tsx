import { Star } from "lucide-react";
import { useEffect } from "react";

export default function Testimonials() {
  // Re-initialize Elfsight widget after React mounts the DOM node
  useEffect(() => {
    if ((window as any).eapps) {
      try {
        (window as any).eapps.AppsManager.initAll();
      } catch (_) {
        // Widget will self-initialize via the async platform.js script
      }
    }
  }, []);

  return (
    <section
      id="reviews"
      className="py-20"
      style={{ backgroundColor: "oklch(0.97 0.015 80)" }}
    >
      <div className="container">
        {/* Section header */}
        <div className="text-center mb-10 reveal">
          <div className="section-divider justify-center mb-4">
            <span className="section-divider-label">What Clients Say</span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
          >
            Customer Reviews
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} fill="#C8892A" color="#C8892A" />
              ))}
            </div>
            <span
              className="text-base font-semibold"
              style={{ color: "oklch(0.45 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}
            >
              5.0 · Verified Google Reviews
            </span>
          </div>
        </div>

        {/* Elfsight Google Reviews widget */}
        <div className="reveal">
          <div
            className="elfsight-app-3439582a-5f81-4ddb-ab1a-54f99c9da7af"
            data-elfsight-app-lazy
          />
        </div>

        {/* CTA below reviews */}
        <div className="text-center mt-10 reveal">
          <button
            className="hcp-button"
            onClick={() => (window as any).HCPWidget?.openModal()}
          >
            Request Estimate Today
          </button>
        </div>
      </div>
    </section>
  );
}
