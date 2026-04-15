import { useEffect } from "react";
import { Link } from "wouter";
import { Star, ArrowLeft, Phone } from "lucide-react";

export default function Reviews() {
  useEffect(() => {
    document.title = "Customer Reviews | Handy Pioneers — Vancouver WA";
    // Re-init Elfsight widget
    if ((window as any).eapps) {
      try {
        (window as any).eapps.AppsManager.initAll();
      } catch (_) {}
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "oklch(0.97 0.015 80)" }}
    >
      {/* Top bar */}
      <div
        className="w-full text-white text-sm py-3 px-6 flex items-center justify-between"
        style={{ backgroundColor: "oklch(0.22 0.07 160)" }}
      >
        <Link href="/">
          <a
            className="flex items-center gap-2 hover:opacity-80 transition-opacity font-semibold"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            <ArrowLeft size={16} />
            Back to Handy Pioneers
          </a>
        </Link>
        <a
          href="tel:+13605449858"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity font-semibold"
          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
        >
          <Phone size={14} />
          (360) 544-9858
        </a>
      </div>

      {/* Hero header */}
      <div
        className="py-16 text-center"
        style={{ backgroundColor: "oklch(0.22 0.07 160)" }}
      >
        <div className="flex justify-center mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={28} fill="#C8892A" color="#C8892A" />
          ))}
        </div>
        <h1
          className="text-4xl md:text-5xl font-bold text-white mb-3"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          What Our Clients Say
        </h1>
        <p
          className="text-lg max-w-xl mx-auto px-4"
          style={{ color: "rgba(255,255,255,0.75)", fontFamily: "'Source Sans 3', sans-serif" }}
        >
          Real reviews from real Clark County homeowners — verified on Google.
          Every project. Every trade. Every neighborhood.
        </p>

        {/* Stats row */}
        <div className="flex justify-center gap-10 mt-8">
          {[
            { value: "4.9★", label: "Average Rating" },
            { value: "33+", label: "Verified Reviews" },
            { value: "100%", label: "Recommended" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-3xl font-bold"
                style={{ color: "oklch(0.80 0.10 65)", fontFamily: "'Playfair Display', serif" }}
              >
                {stat.value}
              </div>
              <div
                className="text-xs uppercase tracking-widest mt-1"
                style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews widget */}
      <div className="container py-12 max-w-5xl mx-auto px-4">
        <div
          className="elfsight-app-3439582a-5f81-4ddb-ab1a-54f99c9da7af"
          data-elfsight-app-lazy
        />
      </div>

      {/* CTA section */}
      <div
        className="py-16 text-center"
        style={{ backgroundColor: "oklch(0.22 0.07 160)" }}
      >
        <h2
          className="text-3xl font-bold text-white mb-3"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Ready to Add Your Story?
        </h2>
        <p
          className="mb-8 text-lg"
          style={{ color: "rgba(255,255,255,0.75)", fontFamily: "'Source Sans 3', sans-serif" }}
        >
          Join Clark County homeowners who trust Handy Pioneers for quality work,
          honest communication, and a 1-year labor guarantee.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="hcp-button text-base px-8 py-4"
            onClick={() => (window as any).HCPWidget?.openModal()}
          >
            Get a Free Estimate
          </button>
          <a
            href="tel:+13605449858"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded font-bold uppercase tracking-wide text-base border-2 border-white text-white hover:bg-white/10 transition-all"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            <Phone size={18} />
            (360) 544-9858
          </a>
        </div>
      </div>

      {/* Footer strip */}
      <div
        className="py-4 text-center text-xs"
        style={{ backgroundColor: "oklch(0.18 0.06 160)", color: "rgba(255,255,255,0.35)", fontFamily: "'Source Sans 3', sans-serif" }}
      >
        © {new Date().getFullYear()} Handy Pioneers · WA Lic. HANDYP*761NH ·{" "}
        <Link href="/privacy-policy">
          <a className="hover:opacity-70 transition-opacity">Privacy Policy</a>
        </Link>
        {" · "}
        <Link href="/terms-and-conditions">
          <a className="hover:opacity-70 transition-opacity">Terms &amp; Conditions</a>
        </Link>
      </div>
    </div>
  );
}
