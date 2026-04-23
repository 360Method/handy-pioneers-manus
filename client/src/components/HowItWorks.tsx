const steps = [
  {
    num: "01",
    title: "Request Work Online",
    desc: "Click 'Start Your Project' and fill out a quick request through our online system. It takes less than 2 minutes.",
  },
  {
    num: "02",
    title: "We Listen and Build Your Plan",
    desc: "We walk the property, assess the full scope, and present a written plan tailored to your home — not a generic quote.",
  },
  {
    num: "03",
    title: "We Get to Work",
    desc: "Once approved, we schedule your project and deliver quality craftsmanship backed by our 1-year labor guarantee.",
  },
];

export default function HowItWorks() {
  return (
    <section
      className="py-20"
      style={{ backgroundColor: "oklch(0.32 0.07 160)" }}
    >
      <div className="container">
        <div className="text-center mb-14 reveal">
          <div className="section-divider justify-center mb-4">
            <span className="section-divider-label" style={{ color: "oklch(0.80 0.10 65)" }}>
              Simple Process
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            How It Works
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line on desktop */}
          <div
            className="hidden md:block absolute top-10 left-1/6 right-1/6 h-px"
            style={{ backgroundColor: "rgba(200,137,42,0.3)" }}
          />

          {steps.map(({ num, title, desc }, i) => (
            <div
              key={num}
              className="reveal flex flex-col items-center text-center"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-6 border-2 relative z-10"
                style={{
                  backgroundColor: "oklch(0.22 0.07 160)",
                  borderColor: "oklch(0.65 0.14 65)",
                }}
              >
                <span
                  className="text-2xl font-bold"
                  style={{ color: "oklch(0.80 0.10 65)", fontFamily: "'Playfair Display', serif" }}
                >
                  {num}
                </span>
              </div>
              <h3
                className="text-xl font-bold text-white mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {title}
              </h3>
              <p
                className="text-base leading-relaxed"
                style={{ color: "rgba(255,255,255,0.75)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 reveal">
          <button
            className="hcp-button"
            onClick={() => window.open("https://client.handypioneers.com/book", "_blank", "noopener")}
          >
            📅 Start Your Project
          </button>
        </div>
      </div>
    </section>
  );
}
