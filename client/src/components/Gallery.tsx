/**
 * Gallery — Blog-style project cards
 * Design: Pacific Northwest Craftsman
 * All 12 real project posts scraped from handypioneers.com/gallery/
 * Each card: thumbnail, category badge, title, excerpt, date, location, tags
 * Click opens a modal with larger photo, full description, tags, and CTAs
 */

import { useState } from "react";
import { X, Calendar, Tag, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o";

interface Project {
  id: number;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  description: string;
  image: string;
  tags: string[];
  location: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Porch Step Repair in Battle Ground",
    category: "Stairs & Railings",
    date: "November 21, 2025",
    excerpt: "Turned a shaky step situation into a rock-solid entrance — rebuilt two steps and installed new railings for a safe, beautiful front porch.",
    description: "At Handy Pioneers, we believe in making your home safer and more comfortable. Realizing the original front porch steps were not safe and starting to warp, we rolled up our sleeves and got to work. Our expertise in porch step repair came in handy as we rebuilt the two steps and railings. Now, you can safely use your front porch without any worries.",
    image: `${CDN}/porch-step-repair_2b0660e5.jpg`,
    tags: ["battle ground handyman", "battle ground wa", "Clark County", "porch step repair", "railings"],
    location: "Battle Ground, WA",
  },
  {
    id: 2,
    title: "Gutter Cleaning Service in Vancouver",
    category: "Gutters",
    date: "October 16, 2025",
    excerpt: "Removed accumulated debris, flushed downspouts, and tidied up the roof — turning over-flooding gutters back into an efficient drainage system.",
    description: "One thing we at Handy Pioneers understand is that rainwater flowing over your gutter can lead to a mess. Recently tackled a project where this was happening. Our gutter cleaning service got to the heart of the matter. We removed accumulated debris, flushed the downspouts, and tidied up the roof. This simple procedure turned over-flooding gutters back into an efficient drainage system, protecting our customer's property. That's what Handy Pioneers does — solving your problems and saving your day.",
    image: `${CDN}/gutter-cleaning_26e21b16.webp`,
    tags: ["gutter cleaning", "Clark County", "debris removal", "downspout flushing", "Vancouver WA"],
    location: "Vancouver, WA",
  },
  {
    id: 3,
    title: "Graffiti Removal and Painting Service in Vancouver",
    category: "Painting",
    date: "October 1, 2025",
    excerpt: "Transformed a vandalized vacant building exterior with a fresh coat of paint — quick, efficient, and restored to full curb appeal.",
    description: "When a busy out-of-town client found themselves with a littered and graffiti-covered vacant building, they reached out to Handy Pioneers for help. We jumped in immediately, offering our top-notch graffiti removal and painting service. After swiftly cleaning up the trash, we worked hard to transform the vandalized exterior with a fresh coat of paint. This quick and efficient solution relieved our client from the burden while restoring their property's look and value.",
    image: `${CDN}/graffiti-removal_9fbe4828.png`,
    tags: ["graffiti removal", "painting service", "building maintenance", "vacant building cleanup", "Vancouver WA"],
    location: "Vancouver, WA",
  },
  {
    id: 4,
    title: "Porch Screen Installation in Vancouver",
    category: "Screen Installation",
    date: "October 1, 2025",
    excerpt: "Installed a porch screen and rod for a homeowner who needed privacy but lacked the time and tools — quick, clean, and exactly what she wanted.",
    description: "Recently, the team at Handy Pioneers completed a porch screen installation job that significantly improved a home's privacy. This particular client wanted a porch screen and rod installed but lacked the necessary time and tools to carry out the task herself. Our skilled handymen stepped in, ensuring a quick and efficient installation that met the client's desires. This just shows how our quality handyman services can make a big difference in achieving your home's functional needs easily and conveniently.",
    image: `${CDN}/porch-screen_296aecd4.jpg`,
    tags: ["porch screen installation", "privacy screen", "rod installation", "Clark County", "Vancouver WA"],
    location: "Vancouver, WA",
  },
  {
    id: 5,
    title: "Kitchen Water Damage Repair in Camas",
    category: "Home Repair",
    date: "September 18, 2025",
    excerpt: "What started as moving a fridge revealed significant water damage — we repaired drywall, flooring, painted, and installed new cabinet and trim.",
    description: "When a customer reached out to us at Handy Pioneers for help moving a heavy fridge to fix a water leak, we discovered more than what we initially bargained for. There was significant water damage. Transforming an unfortunate scenario into a fresh renovation opportunity, we performed kitchen water damage repair, restoring the drywall, flooring, painting, and even installing new cabinet and trim. This project clearly shows how Handy Pioneers is ready to tackle unexpected problems to help our customers get the most out of their call for help.",
    image: `${CDN}/shower-recaulking_4ec1b209.webp`,
    tags: ["kitchen water damage repair", "drywall repair", "flooring installation", "cabinet installation", "Camas WA"],
    location: "Camas, WA",
  },
  {
    id: 6,
    title: "Shower Re-Caulking Service in Camas",
    category: "Caulking",
    date: "September 15, 2025",
    excerpt: "Carefully removed old caulk, prepped the surface, and applied fresh caulk — leaving the shower in top condition and saving the homeowner valuable time.",
    description: "A busy customer barely had the time or tools necessary for a shower re-caulking service. The task involved more than just removing the old caulk. At Handy Pioneers, we carefully prepared the surface before applying the new caulk, making sure the job was done right and the customer's shower was left in top condition. With our help, the customer was able to save valuable time and avoid potential complications. Why worry about doing it yourself when you can hire professionals who know how to handle such tasks?",
    image: `${CDN}/shower-recaulking_4ec1b209.webp`,
    tags: ["shower re-caulking", "caulking removal", "new caulk application", "Camas WA", "Clark County"],
    location: "Camas, WA",
  },
  {
    id: 7,
    title: "Porch Step and Lattice Replacement in Battle Ground",
    category: "Stairs & Railings",
    date: "September 15, 2025",
    excerpt: "Replaced rotting porch steps and privacy lattice for a returning client — boosting curb appeal, safety, and the longevity of their outdoor space.",
    description: "At Handy Pioneers, we pride ourselves on keeping our clients' homes in top shape. Recently, we completed a porch step and lattice replacement for a returning client whose front porch steps and privacy lattice had started to rot. This boosted the appeal of their home and increased the longevity and safety of their porch. With our experienced intervention, we renewed their outdoor space, proving once again that even the smallest improvements can make a big difference.",
    image: `${CDN}/porch-lattice_1e6a1918.jpg`,
    tags: ["porch step repair", "lattice installation", "front porch remodel", "Battle Ground WA", "Clark County"],
    location: "Battle Ground, WA",
  },
  {
    id: 8,
    title: "Kitchen Island Appliance Installation in Vancouver",
    category: "Appliance Installation",
    date: "August 1, 2025",
    excerpt: "Installed a telescoping downdraft and gas cooktop on a newly countered kitchen island — more functional, more efficient, and better looking.",
    description: "At Handy Pioneers, we recently finished a Punch List project in Vancouver that involved adding more functionality and appeal to a kitchen island. We installed a telescoping downdraft and a gas cooktop to match our client's newly installed countertops. With this update, the kitchen not only looks better, but it is more convenient and efficient to use. The client noted: 'Marcin did an excellent job installing my cooktop and downdraft. He arrived promptly and listened carefully to what I wanted. He kept me informed of his progress throughout the installation. I would definitely recommend him.'",
    image: `${CDN}/kitchen-island_b506045b.jpg`,
    tags: ["appliance installation", "gas cooktop installation", "kitchen island upgrade", "telescoping downdraft", "Vancouver WA"],
    location: "Vancouver, WA",
  },
  {
    id: 9,
    title: "Pressure Washing Service in Vancouver",
    category: "Pressure Washing",
    date: "July 1, 2025",
    excerpt: "Years of grime, moss, and tough stains completely wiped out from a driveway — curb appeal restored in a single visit.",
    description: "Had a fruitful day cleaning a driveway for a client in Vancouver. Years of grime, moss, and tough stains completely wiped out with our power-packed pressure washing service. We take pride here at Handy Pioneers to rejuvenate your property's exterior, rapidly boosting its curb appeal. Not only that, we extend this service to the whole of Clark County, including Camas. Cherish the feel of a fresh, clean driveway with our top-notch Pressure Washing Service in Clark County.",
    image: `${CDN}/pressure-washing-driveway_42597364.jpg`,
    tags: ["pressure washing", "driveway cleaning", "moss removal", "curb appeal", "Vancouver WA"],
    location: "Vancouver, WA",
  },
  {
    id: 10,
    title: "Deck Pressure Washing in Camas",
    category: "Pressure Washing",
    date: "July 1, 2025",
    excerpt: "Renewed a weather-beaten, moss-covered deck — now clean, safe for foot traffic, and prepped for summer activities.",
    description: "At Handy Pioneers, we recently helped a homeowner in Camas rediscover the beauty of their deck. This deck was showing the signs of many seasons passing, weather-beaten and rendered unsafe due to moss build-up. However, we were able to renew it with a robust session of deck pressure washing. The wood is now clean as a whistle — safe for foot traffic and prepped for the upcoming summer activities. That's our professional commitment towards maintaining the essential outdoor structures of your home.",
    image: `${CDN}/deck-pressure-washing_fb06fd69.webp`,
    tags: ["deck pressure washing", "moss removal", "deck restoration", "Camas WA", "Clark County"],
    location: "Camas, WA",
  },
  {
    id: 11,
    title: "Pressure Washing Services in Vancouver",
    category: "Pressure Washing",
    date: "July 1, 2025",
    excerpt: "Low-pressure house wash removed dirt, mildew, and grime from siding — a stunning, bright exterior restored to its original curb appeal.",
    description: "Earlier, we had a great project in Vancouver where we noticed that the siding was covered in dirt, mildew, and grime. No worries, we at Handy Pioneers knew exactly what to do! We used our expertise in Pressure Washing Services to perform a low-pressure house wash. The result? A stunning, bright, and refreshed exterior restored to its original curb appeal — no surface damage involved. Trust is at the core of what we do. And that's why homeowners in Vancouver, Camas, and Clark County always rely on us for safe and effective exterior cleaning.",
    image: `${CDN}/house-washing_aa00df1e.webp`,
    tags: ["pressure washing", "house wash", "siding cleaning", "curb appeal restoration", "Vancouver WA"],
    location: "Vancouver, WA",
  },
  {
    id: 12,
    title: "Window Cleaning Service in Camas",
    category: "Windows",
    date: "June 16, 2025",
    excerpt: "Cleaned windows hidden behind layers of dust, streaks, and spider webs — interior sills, tracks, and screens included, letting the light flood back in.",
    description: "These windows in Camas were terribly hidden behind layers of dust, pesky streaks, and spider webs tucked away in the inside sills. But now, thanks to the team at Handy Pioneers, they're sparkling and fresh — letting the light flood back in again! At Handy Pioneers, we're all about offering comprehensive and straight-up Window Cleaning Service. We don't just clean your windows, but also pay attention to the interior sills, tracks, and screens, making sure we do a good job, whether it's in Vancouver, Camas, or anywhere in Clark County.",
    image: `${CDN}/window-cleaning_66a54ef2.jpg`,
    tags: ["window cleaning", "streak removal", "interior sill cleaning", "Camas WA", "Clark County"],
    location: "Camas, WA",
  },
];

const CATEGORIES = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalIndex, setModalIndex] = useState(0);

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  const openModal = (project: Project) => {
    const idx = filtered.findIndex((p) => p.id === project.id);
    setSelectedProject(project);
    setModalIndex(idx);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "";
  };

  const prevProject = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIndex = (modalIndex - 1 + filtered.length) % filtered.length;
    setModalIndex(newIndex);
    setSelectedProject(filtered[newIndex]);
  };

  const nextProject = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIndex = (modalIndex + 1) % filtered.length;
    setModalIndex(newIndex);
    setSelectedProject(filtered[newIndex]);
  };

  return (
    <section id="gallery" className="py-20" style={{ backgroundColor: "oklch(0.97 0.015 80)" }}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-10 reveal">
          <div className="section-divider justify-center mb-4">
            <span className="section-divider-label">Our Work</span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
          >
            Project Gallery
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "oklch(0.45 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Real projects, real results. Browse our completed work across Clark County.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 reveal">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                backgroundColor: activeCategory === cat ? "oklch(0.32 0.07 160)" : "oklch(0.90 0.015 80)",
                color: activeCategory === cat ? "oklch(1 0 0)" : "oklch(0.35 0.04 80)",
                border: "none",
                letterSpacing: "0.03em",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog-style Card Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <article
              key={project.id}
              className="reveal rounded-xl overflow-hidden border cursor-pointer group"
              style={{
                backgroundColor: "oklch(1 0 0)",
                borderColor: "oklch(0.88 0.015 80)",
                transitionDelay: `${i * 60}ms`,
                boxShadow: "0 2px 8px oklch(0 0 0 / 0.06)",
                transition: "box-shadow 0.25s ease, transform 0.25s ease",
              }}
              onClick={() => openModal(project)}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px oklch(0 0 0 / 0.14)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px oklch(0 0 0 / 0.06)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              {/* Thumbnail */}
              <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <span
                  className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: "oklch(0.32 0.07 160)",
                    color: "oklch(1 0 0)",
                    fontFamily: "'Source Sans 3', sans-serif",
                    letterSpacing: "0.08em",
                  }}
                >
                  {project.category}
                </span>
              </div>

              {/* Card body */}
              <div className="p-5">
                <div
                  className="flex items-center gap-1.5 text-xs mb-2"
                  style={{ color: "oklch(0.60 0.04 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  <Calendar size={12} />
                  <span>{project.date}</span>
                  <span className="mx-1">·</span>
                  <span>{project.location}</span>
                </div>

                <h3
                  className="font-bold text-lg mb-2 leading-snug"
                  style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
                >
                  {project.title}
                </h3>

                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: "oklch(0.45 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  {project.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs"
                      style={{
                        backgroundColor: "oklch(0.93 0.015 80)",
                        color: "oklch(0.40 0.04 80)",
                        fontFamily: "'Source Sans 3', sans-serif",
                      }}
                    >
                      <Tag size={9} />
                      {tag}
                    </span>
                  ))}
                </div>

                <div
                  className="flex items-center gap-1 text-sm font-semibold"
                  style={{ color: "oklch(0.65 0.14 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  Read More <ArrowRight size={14} />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 reveal">
          <button
            className="hcp-button"
            onClick={() => (window as any).HCPWidget?.openModal()}
          >
            Request Estimate Today
          </button>
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "oklch(0 0 0 / 0.78)" }}
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl"
            style={{ backgroundColor: "oklch(1 0 0)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "oklch(0.92 0.01 80)", color: "oklch(0.22 0.07 160)" }}
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {/* Prev/Next navigation */}
            <button
              onClick={prevProject}
              className="absolute left-3 top-40 z-10 w-9 h-9 rounded-full flex items-center justify-center shadow-lg"
              style={{ backgroundColor: "oklch(1 0 0 / 0.92)", color: "oklch(0.22 0.07 160)" }}
              aria-label="Previous project"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextProject}
              className="absolute right-3 top-40 z-10 w-9 h-9 rounded-full flex items-center justify-center shadow-lg"
              style={{ backgroundColor: "oklch(1 0 0 / 0.92)", color: "oklch(0.22 0.07 160)" }}
              aria-label="Next project"
            >
              <ChevronRight size={20} />
            </button>

            {/* Hero image */}
            <div className="w-full overflow-hidden rounded-t-2xl" style={{ aspectRatio: "16/9" }}>
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: "oklch(0.32 0.07 160)",
                    color: "oklch(1 0 0)",
                    fontFamily: "'Source Sans 3', sans-serif",
                  }}
                >
                  {selectedProject.category}
                </span>
                <span
                  className="flex items-center gap-1 text-xs"
                  style={{ color: "oklch(0.55 0.04 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  <Calendar size={12} />
                  {selectedProject.date} · {selectedProject.location}
                </span>
              </div>

              <h2
                className="text-2xl md:text-3xl font-bold mb-4"
                style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
              >
                {selectedProject.title}
              </h2>

              <p
                className="text-base leading-relaxed mb-6"
                style={{ color: "oklch(0.38 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                {selectedProject.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs"
                    style={{
                      backgroundColor: "oklch(0.93 0.015 80)",
                      color: "oklch(0.40 0.04 80)",
                      fontFamily: "'Source Sans 3', sans-serif",
                    }}
                  >
                    <Tag size={10} />
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  className="hcp-button"
                  onClick={() => {
                    closeModal();
                    (window as any).HCPWidget?.openModal();
                  }}
                >
                  Request Estimate
                </button>
                <a
                  href="tel:+13605449858"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-semibold text-sm border transition-colors"
                  style={{
                    borderColor: "oklch(0.32 0.07 160)",
                    color: "oklch(0.32 0.07 160)",
                    fontFamily: "'Source Sans 3', sans-serif",
                    textDecoration: "none",
                  }}
                >
                  Call (360) 544-9858
                </a>
              </div>

              {/* Project counter */}
              <p
                className="text-xs mt-4 text-center"
                style={{ color: "oklch(0.65 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Project {modalIndex + 1} of {filtered.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
