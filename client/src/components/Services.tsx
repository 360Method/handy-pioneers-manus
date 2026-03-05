import { Hammer, PaintBucket, Layers, DoorOpen, Fence, Wrench, TreePine, Home, Droplets, Tv, Wind, LayoutGrid, Scissors, Settings, Brush, Ruler, Zap, CheckSquare } from "lucide-react";

const services = [
  { icon: LayoutGrid, name: "Cabinets", desc: "Repair, installation & refinishing" },
  { icon: Ruler, name: "Carpentry & Woodworking", desc: "Custom builds & fine woodwork" },
  { icon: TreePine, name: "Decking", desc: "Build, repair & restore decks" },
  { icon: DoorOpen, name: "Doors", desc: "Repair, replacement & installation" },
  { icon: Fence, name: "Fencing", desc: "Fence repair, gates & new installs" },
  { icon: Layers, name: "Flooring", desc: "Hardwood, LVP, tile & more" },
  { icon: Settings, name: "General Contracting", desc: "Full project management" },
  { icon: Droplets, name: "Gutter Cleaning", desc: "Clear & protect your gutters" },
  { icon: Home, name: "Home Repair", desc: "Fixtures, drywall & general fixes" },
  { icon: PaintBucket, name: "Painting", desc: "Interior & exterior painting" },
  { icon: Zap, name: "Pressure Washing", desc: "House, driveway & roof cleaning" },
  { icon: CheckSquare, name: "Punch List Repairs", desc: "Inspection report items" },
  { icon: Hammer, name: "Remodeling", desc: "Kitchen, bath & full renovations" },
  { icon: Wrench, name: "Property Maintenance", desc: "Ongoing residential upkeep" },
  { icon: Brush, name: "Rot Repair", desc: "Wood rot detection & repair" },
  { icon: Scissors, name: "Trim Carpentry", desc: "Baseboards, crown & casing" },
  { icon: Tv, name: "TV Mounting", desc: "Clean installs, hidden cords" },
  { icon: Wind, name: "Windows", desc: "Repair, replacement & upgrades" },
];

export default function Services() {
  return (
    <section id="services" className="py-20" style={{ backgroundColor: "oklch(0.97 0.015 80)" }}>
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-14 reveal">
          <div className="section-divider justify-center mb-4">
            <span className="section-divider-label">What We Do</span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
          >
            Our Services
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "oklch(0.45 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            From quick repairs to full remodels, we handle it all. Don't see your project?
            Book online and we'll discuss the details.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {services.map(({ icon: Icon, name, desc }, i) => (
            <div
              key={name}
              className="reveal group flex flex-col items-center text-center p-4 rounded-lg border transition-all duration-200 hover:-translate-y-1 hover:shadow-md cursor-default"
              style={{
                backgroundColor: "oklch(1 0 0)",
                borderColor: "oklch(0.88 0.015 80)",
                transitionDelay: `${i * 30}ms`,
              }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors group-hover:scale-110 duration-200"
                style={{ backgroundColor: "oklch(0.95 0.02 160)" }}
              >
                <Icon size={22} style={{ color: "oklch(0.32 0.07 160)" }} />
              </div>
              <div
                className="text-sm font-bold leading-tight mb-1"
                style={{ color: "oklch(0.22 0.07 160)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                {name}
              </div>
              <div
                className="text-xs leading-snug hidden sm:block"
                style={{ color: "oklch(0.55 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                {desc}
              </div>
            </div>
          ))}
        </div>

        {/* CTA below services */}
        <div className="text-center mt-12 reveal">
          <p
            className="text-base mb-4"
            style={{ color: "oklch(0.45 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Not sure if we cover your project? Just ask — odds are we can help.
          </p>
          <button
            className="hcp-button"
            onClick={() => (window as any).HCPWidget?.openModal()}
          >
            Request a Free Estimate
          </button>
        </div>
      </div>
    </section>
  );
}
