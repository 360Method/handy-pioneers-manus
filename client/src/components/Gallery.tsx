/**
 * Gallery — Unified gallery section combining Project Stories carousel + Photo Grid
 * Design: Pacific Northwest Craftsman
 * Two tabs: "Project Stories" (carousel with blog cards) and "Photo Gallery" (masonry grid)
 * Both tabs share a single section header and CTA.
 */

import { useState, useRef } from "react";
import { X, Calendar, Tag, ChevronLeft, ChevronRight, MapPin, ZoomIn, BookOpen, Images } from "lucide-react";

// ─── PROJECT STORIES DATA ─────────────────────────────────────────────────────
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
  { id: 1, title: "Porch Step Repair in Battle Ground", category: "Stairs & Railings", date: "November 21, 2025", excerpt: "Rebuilt two rotting steps and installed new railings for a safe, beautiful front porch.", description: "At Handy Pioneers, we believe in making your home safer and more comfortable. Realizing the original front porch steps were not safe and starting to warp, we rolled up our sleeves and got to work. Our expertise in porch step repair came in handy as we rebuilt the two steps and railings. Now, you can safely use your front porch without any worries.", image: `${CDN}/porch-step-repair_2b0660e5.jpg`, tags: ["battle ground handyman", "battle ground wa", "Clark County", "porch step repair", "railings"], location: "Battle Ground, WA" },
  { id: 2, title: "Gutter Cleaning Service in Vancouver", category: "Gutters", date: "October 16, 2025", excerpt: "Removed debris, flushed downspouts, and tidied the roof — turning overflowing gutters into an efficient drainage system.", description: "One thing we at Handy Pioneers understand is that rainwater flowing over your gutter can lead to a mess. Our gutter cleaning service removed accumulated debris, flushed the downspouts, and tidied up the roof — turning over-flooding gutters back into an efficient drainage system.", image: `${CDN}/gutter-cleaning_26e21b16.webp`, tags: ["gutter cleaning", "Clark County", "debris removal", "downspout flushing", "Vancouver WA"], location: "Vancouver, WA" },
  { id: 3, title: "Graffiti Removal and Painting in Vancouver", category: "Painting", date: "October 1, 2025", excerpt: "Transformed a vandalized vacant building with a fresh coat of paint — quick, efficient, and restored to full curb appeal.", description: "When a busy out-of-town client found themselves with a graffiti-covered vacant building, we jumped in immediately. After swiftly cleaning up the trash, we transformed the vandalized exterior with a fresh coat of paint — relieving our client from the burden while restoring their property's look and value.", image: `${CDN}/graffiti-removal_9fbe4828.png`, tags: ["graffiti removal", "painting service", "building maintenance", "Vancouver WA"], location: "Vancouver, WA" },
  { id: 4, title: "Porch Screen Installation in Vancouver", category: "Screen Installation", date: "October 1, 2025", excerpt: "Installed a privacy screen and rod for a homeowner who needed it done right but lacked the time and tools.", description: "This client wanted a porch screen and rod installed but lacked the necessary time and tools. Our skilled handymen stepped in, ensuring a quick and efficient installation that met the client's desires — proving how our quality handyman services make a big difference.", image: `${CDN}/porch-screen_296aecd4.jpg`, tags: ["porch screen installation", "privacy screen", "rod installation", "Clark County", "Vancouver WA"], location: "Vancouver, WA" },
  { id: 5, title: "Kitchen Water Damage Repair in Camas", category: "Home Repair", date: "September 18, 2025", excerpt: "What started as moving a fridge revealed major water damage — drywall, flooring, paint, and new cabinet all restored.", description: "When a customer asked us to help move a heavy fridge, we discovered significant water damage. We transformed the unfortunate scenario into a fresh renovation — restoring drywall, flooring, painting, and installing new cabinet and trim.", image: `${CDN}/shower-recaulking_4ec1b209.webp`, tags: ["kitchen water damage repair", "drywall repair", "flooring installation", "cabinet installation", "Camas WA"], location: "Camas, WA" },
  { id: 6, title: "Shower Re-Caulking Service in Camas", category: "Caulking", date: "September 15, 2025", excerpt: "Removed old caulk, prepped the surface, and applied fresh caulk — shower left in top condition.", description: "A busy customer barely had the time or tools for a shower re-caulking service. We carefully prepared the surface before applying new caulk — making sure the job was done right and saving the customer valuable time.", image: `${CDN}/shower-recaulking_4ec1b209.webp`, tags: ["shower re-caulking", "caulking removal", "new caulk application", "Camas WA", "Clark County"], location: "Camas, WA" },
  { id: 7, title: "Porch Step & Lattice Replacement in Battle Ground", category: "Stairs & Railings", date: "September 15, 2025", excerpt: "Replaced rotting steps and privacy lattice for a returning client — curb appeal and safety fully restored.", description: "We completed a porch step and lattice replacement for a returning client whose front porch steps and privacy lattice had started to rot. This boosted the appeal of their home and increased the longevity and safety of their porch.", image: `${CDN}/porch-lattice_1e6a1918.jpg`, tags: ["porch step repair", "lattice installation", "front porch remodel", "Battle Ground WA", "Clark County"], location: "Battle Ground, WA" },
  { id: 8, title: "Kitchen Island Appliance Installation in Vancouver", category: "Appliance Installation", date: "August 1, 2025", excerpt: "Installed a telescoping downdraft and gas cooktop on a newly countered kitchen island — more functional and better looking.", description: "We installed a telescoping downdraft and a gas cooktop to match our client's newly installed countertops. The client noted: 'Marcin did an excellent job installing my cooktop and downdraft. He arrived promptly and listened carefully to what I wanted. I would definitely recommend him.'", image: `${CDN}/kitchen-island_b506045b.jpg`, tags: ["appliance installation", "gas cooktop installation", "kitchen island upgrade", "telescoping downdraft", "Vancouver WA"], location: "Vancouver, WA" },
  { id: 9, title: "Pressure Washing Service in Vancouver", category: "Pressure Washing", date: "July 1, 2025", excerpt: "Years of grime, moss, and tough stains wiped out from a driveway — curb appeal fully restored in one visit.", description: "Years of grime, moss, and tough stains completely wiped out with our power-packed pressure washing service. We take pride in rejuvenating your property's exterior, rapidly boosting its curb appeal across Clark County.", image: `${CDN}/pressure-washing-driveway_42597364.jpg`, tags: ["pressure washing", "driveway cleaning", "moss removal", "curb appeal", "Vancouver WA"], location: "Vancouver, WA" },
  { id: 10, title: "Deck Pressure Washing in Camas", category: "Pressure Washing", date: "July 1, 2025", excerpt: "Renewed a weather-beaten, moss-covered deck — now clean, safe, and prepped for summer.", description: "We helped a homeowner in Camas rediscover the beauty of their deck. Weather-beaten and rendered unsafe due to moss build-up, we renewed it with a robust session of deck pressure washing — now clean as a whistle and safe for foot traffic.", image: `${CDN}/deck-pressure-washing_fb06fd69.webp`, tags: ["deck pressure washing", "moss removal", "deck restoration", "Camas WA", "Clark County"], location: "Camas, WA" },
  { id: 11, title: "House Washing Services in Vancouver", category: "Pressure Washing", date: "July 1, 2025", excerpt: "Low-pressure house wash removed dirt, mildew, and grime from siding — exterior restored to original curb appeal.", description: "The siding was covered in dirt, mildew, and grime. We performed a low-pressure house wash — resulting in a stunning, bright, and refreshed exterior restored to its original curb appeal with no surface damage.", image: `${CDN}/house-washing_aa00df1e.webp`, tags: ["pressure washing", "house wash", "siding cleaning", "curb appeal restoration", "Vancouver WA"], location: "Vancouver, WA" },
  { id: 12, title: "Window Cleaning Service in Camas", category: "Windows", date: "June 16, 2025", excerpt: "Cleaned windows buried under dust, streaks, and spider webs — sills, tracks, and screens included.", description: "These windows in Camas were hidden behind layers of dust, streaks, and spider webs. Now they're sparkling and fresh — letting the light flood back in. We clean windows, interior sills, tracks, and screens throughout Clark County.", image: `${CDN}/window-cleaning_66a54ef2.jpg`, tags: ["window cleaning", "streak removal", "interior sill cleaning", "Camas WA", "Clark County"], location: "Camas, WA" },
];

// ─── PHOTO GALLERY DATA ───────────────────────────────────────────────────────
// TO ADD MORE PHOTOS: append a new object with id, src (CDN URL), caption, and optional tag.
interface Photo {
  id: number;
  src: string;
  caption: string;
  tag?: string;
}

const photos: Photo[] = [
  { id: 1, src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663386531688/wjLagUVyHJnefJeB.jpg", caption: "Basement transformation — unfinished space to modern kitchen and living area", tag: "Remodel" },
  { id: 2, src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663386531688/UCqTnokKBAzttFFs.jpg", caption: "Basement room transformation with new flooring, kitchen area, and dining space", tag: "Before & After" },
  { id: 3, src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663386531688/OGRouAudxeyHawdy.jpg", caption: "Bathroom remodel with white subway tiles, bathtub, and modern black fixtures", tag: "Remodel" },
  { id: 4, src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663386531688/HsevCHMMnApBXAqN.jpg", caption: "Bathroom remodel featuring new vanity, sink, flooring, and fresh paint", tag: "Remodel" },
  { id: 5, src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663386531688/jXBeWLauPzuNoocm.jpg", caption: "Bathroom remodel with new vanity, mirror, lighting, and flooring", tag: "Remodel" },
  { id: 6, src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663386531688/WrTgmbwrBOLkeuvQ.jpg", caption: "Garage transformation — demolition and clean-out to organized empty space", tag: "Before & After" },
  { id: 7, src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663386531688/VzlGuBOWFXHnpjig.jpg", caption: "Living room and kitchen remodel with hardwood flooring, updated lighting, and fresh paint", tag: "Remodel" },
  { id: 8, src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663386531688/elKuhgxmpmZnBtDa.jpg", caption: "Bathroom remodel — outdated yellow room transformed into a modern white space", tag: "Before & After" },
  { id: 9, src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663386531688/MPYajNZmbQZgLzvS.jpg", caption: "Bathroom remodel — outdated space updated with modern fixtures and finishes", tag: "Remodel" },
  { id: 10, src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663386531688/RUDYmgCyMipRnwka.jpg", caption: "Kitchen remodel — bare wall transformed into a functional modern cooking space", tag: "Remodel" },
  { id: 11, src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663386531688/ifxXRKwuQfvSbApZ.jpg", caption: "Room remodel — transformed into a modern kitchenette with white cabinets and new flooring", tag: "Before & After" },
  { id: 12, src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663386531688/nRlKKIJALACEEquv.jpg", caption: "Kitchen remodel with dark countertops, updated cabinets, and modern fixtures", tag: "Remodel" },
  { id: 13, src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663386531688/SJzOyycrDNaWEYHN.jpg", caption: "Exterior home remodel with new siding, windows, and updated landscaping", tag: "Remodel" },
  { id: 14, src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663386531688/qMQRAbINWFvrUPEB.jpg", caption: "Bathroom remodel featuring new flooring, trim, and toilet replacement", tag: "Remodel" },
  { id: 15, src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663386531688/jPOgJPckBdaPcCPr.jpg", caption: "Room transformation with new flooring, light-colored paint, and window blinds", tag: "Before & After" },
  { id: 16, src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663386531688/AwSmGNttlDLyBDuO.jpg", caption: "Complete room transformation — empty yellow space to modern kitchen and laundry area", tag: "Before & After" },
  { id: 17, src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663386531688/yzuTNmsrwjoSvvTt.jpg", caption: "House exterior before and after — newly installed white gutters", tag: "Before & After" },
  { id: 18, src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663386531688/ryLhHcoLDKcrOody.jpg", caption: "Living room transformation with hardwood flooring, recessed lighting, and updated fireplace", tag: "Remodel" },
  { id: 19, src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663386531688/xwDBZkjnyzCPfPzP.jpg", caption: "Bathroom transformation with new tiles, vanity, and modern fixtures", tag: "Before & After" },
  { id: 20, src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663386531688/NnOoZJHBczCXjeKB.jpg", caption: "Basement room transformation with new flooring, recessed lighting, and fresh paint", tag: "Before & After" },
  { id: 21, src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663386531688/pJHcMDChEQIqznEz.jpg", caption: "Clean and organized kitchen with white cabinets and stainless steel appliances", tag: "Remodel" },
  { id: 22, src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663386531688/hsBQUCJsPHmAqWDF.jpg", caption: "Trex railing installation with custom gate on a deck — before and after", tag: "Carpentry" },
  { id: 23, src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663386531688/XVCTcQFFmRquAQZe.jpg", caption: "72-inch TV wall mount installation — clean and professional finish", tag: "Before & After" },
];

const PHOTO_TAGS = ["All", ...Array.from(new Set(photos.map((p) => p.tag).filter(Boolean))) as string[]];
const PROJECT_CATS = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function Gallery() {
  const [activeTab, setActiveTab] = useState<"stories" | "photos">("stories");

  // Project Stories state
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalIndex, setModalIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Photo Gallery state
  const [activePhotoTag, setActivePhotoTag] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // ── Project Stories handlers ──
  const filteredProjects = activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory);

  const openProjectModal = (project: Project) => {
    const idx = filteredProjects.findIndex((p) => p.id === project.id);
    setSelectedProject(project);
    setModalIndex(idx);
    document.body.style.overflow = "hidden";
  };
  const closeProjectModal = () => { setSelectedProject(null); document.body.style.overflow = ""; };
  const prevProject = (e: React.MouseEvent) => { e.stopPropagation(); const i = (modalIndex - 1 + filteredProjects.length) % filteredProjects.length; setModalIndex(i); setSelectedProject(filteredProjects[i]); };
  const nextProject = (e: React.MouseEvent) => { e.stopPropagation(); const i = (modalIndex + 1) % filteredProjects.length; setModalIndex(i); setSelectedProject(filteredProjects[i]); };
  const scrollCarousel = (dir: "left" | "right") => { if (!carouselRef.current) return; carouselRef.current.scrollBy({ left: dir === "left" ? -340 : 340, behavior: "smooth" }); };

  // ── Photo Gallery handlers ──
  const filteredPhotos = activePhotoTag === "All" ? photos : photos.filter((p) => p.tag === activePhotoTag);
  const openLightbox = (index: number) => { setLightboxIndex(index); document.body.style.overflow = "hidden"; };
  const closeLightbox = () => { setLightboxIndex(null); document.body.style.overflow = ""; };
  const prevPhoto = (e: React.MouseEvent) => { e.stopPropagation(); if (lightboxIndex === null) return; setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length); };
  const nextPhoto = (e: React.MouseEvent) => { e.stopPropagation(); if (lightboxIndex === null) return; setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length); };
  const currentPhoto = lightboxIndex !== null ? filteredPhotos[lightboxIndex] : null;

  return (
    <section id="gallery" className="py-20" style={{ backgroundColor: "oklch(0.97 0.015 80)" }}>
      {/* ── Section Header ── */}
      <div className="container">
        <div className="text-center mb-8 reveal">
          <div className="section-divider justify-center mb-4">
            <span className="section-divider-label">Our Work</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}>
            Project Gallery
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "oklch(0.45 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}>
            Real projects, real results. Browse our completed work across Clark County.
          </p>
        </div>

        {/* ── Tab Switcher ── */}
        <div className="flex justify-center mb-8 reveal">
          <div className="inline-flex rounded-xl p-1" style={{ backgroundColor: "oklch(0.90 0.015 80)" }}>
            <button
              onClick={() => setActiveTab("stories")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                backgroundColor: activeTab === "stories" ? "oklch(0.32 0.07 160)" : "transparent",
                color: activeTab === "stories" ? "oklch(1 0 0)" : "oklch(0.40 0.04 80)",
              }}
            >
              <BookOpen size={15} />
              Project Stories
            </button>
            <button
              onClick={() => setActiveTab("photos")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                backgroundColor: activeTab === "photos" ? "oklch(0.32 0.07 160)" : "transparent",
                color: activeTab === "photos" ? "oklch(1 0 0)" : "oklch(0.40 0.04 80)",
              }}
            >
              <Images size={15} />
              Photo Gallery ({photos.length})
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          TAB 1: PROJECT STORIES CAROUSEL
      ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === "stories" && (
        <>
          {/* Category filter */}
          <div className="container">
            <div className="flex flex-wrap justify-center gap-2 mb-6 reveal">
              {PROJECT_CATS.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200"
                  style={{ fontFamily: "'Source Sans 3', sans-serif", backgroundColor: activeCategory === cat ? "oklch(0.32 0.07 160)" : "oklch(0.90 0.015 80)", color: activeCategory === cat ? "oklch(1 0 0)" : "oklch(0.35 0.04 80)", border: "none", letterSpacing: "0.03em" }}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Carousel */}
          <div className="relative">
            <button onClick={() => scrollCarousel("left")} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: "oklch(1 0 0)", color: "oklch(0.22 0.07 160)", border: "1px solid oklch(0.88 0.015 80)" }} aria-label="Scroll left"><ChevronLeft size={20} /></button>
            <button onClick={() => scrollCarousel("right")} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: "oklch(1 0 0)", color: "oklch(0.22 0.07 160)", border: "1px solid oklch(0.88 0.015 80)" }} aria-label="Scroll right"><ChevronRight size={20} /></button>
            <div ref={carouselRef} className="flex gap-5 overflow-x-auto px-12 pb-4" style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}>
              {filteredProjects.map((project) => (
                <article key={project.id} onClick={() => openProjectModal(project)}
                  className="flex-none rounded-xl overflow-hidden border cursor-pointer group"
                  style={{ width: "300px", backgroundColor: "oklch(1 0 0)", borderColor: "oklch(0.88 0.015 80)", boxShadow: "0 2px 8px oklch(0 0 0 / 0.06)", transition: "box-shadow 0.25s ease, transform 0.25s ease" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px oklch(0 0 0 / 0.14)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px oklch(0 0 0 / 0.06)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
                  <div className="relative overflow-hidden" style={{ height: "180px" }}>
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider" style={{ backgroundColor: "oklch(0.32 0.07 160)", color: "oklch(1 0 0)", fontFamily: "'Source Sans 3', sans-serif", letterSpacing: "0.07em" }}>{project.category}</span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-1 text-xs mb-1.5" style={{ color: "oklch(0.60 0.04 65)", fontFamily: "'Source Sans 3', sans-serif" }}><Calendar size={11} /><span>{project.date}</span></div>
                    <h3 className="font-bold text-base mb-1.5 leading-snug" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}>{project.title}</h3>
                    <p className="text-xs leading-relaxed mb-3" style={{ color: "oklch(0.48 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}>{project.excerpt}</p>
                    <div className="flex items-center gap-1 text-xs" style={{ color: "oklch(0.55 0.04 65)" }}><MapPin size={11} /><span style={{ fontFamily: "'Source Sans 3', sans-serif" }}>{project.location}</span></div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          TAB 2: PHOTO GALLERY MASONRY GRID
      ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === "photos" && (
        <div className="container">
          {/* Tag filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {PHOTO_TAGS.map((tag) => (
              <button key={tag} onClick={() => { setActivePhotoTag(tag); setLightboxIndex(null); }}
                className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200"
                style={{ fontFamily: "'Source Sans 3', sans-serif", backgroundColor: activePhotoTag === tag ? "oklch(0.32 0.07 160)" : "oklch(0.90 0.015 80)", color: activePhotoTag === tag ? "oklch(1 0 0)" : "oklch(0.35 0.04 80)", border: "none", letterSpacing: "0.03em" }}>
                {tag}
              </button>
            ))}
          </div>

          {/* Masonry grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4" style={{ columnGap: "0.75rem" }}>
            {filteredPhotos.map((photo, index) => (
              <div key={photo.id} className="relative overflow-hidden rounded-xl cursor-pointer group mb-3 break-inside-avoid" onClick={() => openLightbox(index)}>
                <img src={photo.src} alt={photo.caption} className="w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(to top, oklch(0 0 0 / 0.72) 0%, transparent 55%)" }}>
                  <div className="flex items-end justify-between gap-2">
                    <div className="min-w-0">
                      {photo.tag && <span className="inline-block px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider mb-1" style={{ backgroundColor: "oklch(0.65 0.14 65)", color: "oklch(1 0 0)", fontFamily: "'Source Sans 3', sans-serif" }}>{photo.tag}</span>}
                      <p className="text-xs font-medium leading-snug truncate" style={{ color: "oklch(0.96 0.01 80)", fontFamily: "'Source Sans 3', sans-serif" }}>{photo.caption}</p>
                    </div>
                    <ZoomIn size={16} color="oklch(0.96 0.01 80)" className="flex-none" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Shared CTA ── */}
      <div className="container">
        <div className="text-center mt-10 reveal">
          <button className="hcp-button" onClick={() => (window as any).HCPWidget?.openModal()}>
            Request Estimate Today
          </button>
        </div>
      </div>

      {/* ══ Project Story Modal ══ */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "oklch(0 0 0 / 0.82)" }} onClick={closeProjectModal}>
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl" style={{ backgroundColor: "oklch(1 0 0)" }} onClick={(e) => e.stopPropagation()}>
            <button onClick={closeProjectModal} className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: "oklch(0.92 0.01 80)", color: "oklch(0.22 0.07 160)" }} aria-label="Close"><X size={18} /></button>
            <button onClick={prevProject} className="absolute left-3 z-20 w-9 h-9 rounded-full flex items-center justify-center shadow-md" style={{ top: "calc(200px - 18px)", backgroundColor: "oklch(1 0 0 / 0.92)", color: "oklch(0.22 0.07 160)" }} aria-label="Previous"><ChevronLeft size={20} /></button>
            <button onClick={nextProject} className="absolute right-3 z-20 w-9 h-9 rounded-full flex items-center justify-center shadow-md" style={{ top: "calc(200px - 18px)", backgroundColor: "oklch(1 0 0 / 0.92)", color: "oklch(0.22 0.07 160)" }} aria-label="Next"><ChevronRight size={20} /></button>
            <div className="w-full overflow-hidden rounded-t-2xl" style={{ height: "260px" }}>
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider" style={{ backgroundColor: "oklch(0.32 0.07 160)", color: "oklch(1 0 0)", fontFamily: "'Source Sans 3', sans-serif" }}>{selectedProject.category}</span>
                <span className="flex items-center gap-1 text-xs" style={{ color: "oklch(0.55 0.04 65)", fontFamily: "'Source Sans 3', sans-serif" }}><Calendar size={11} />{selectedProject.date}</span>
                <span className="flex items-center gap-1 text-xs" style={{ color: "oklch(0.55 0.04 65)", fontFamily: "'Source Sans 3', sans-serif" }}><MapPin size={11} />{selectedProject.location}</span>
              </div>
              <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}>{selectedProject.title}</h2>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "oklch(0.38 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}>{selectedProject.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {selectedProject.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs" style={{ backgroundColor: "oklch(0.93 0.015 80)", color: "oklch(0.40 0.04 80)", fontFamily: "'Source Sans 3', sans-serif" }}><Tag size={9} />{tag}</span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="hcp-button" onClick={() => { closeProjectModal(); (window as any).HCPWidget?.openModal(); }}>Request Estimate</button>
                <a href="tel:+13605449858" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-semibold text-sm border transition-colors" style={{ borderColor: "oklch(0.32 0.07 160)", color: "oklch(0.32 0.07 160)", fontFamily: "'Source Sans 3', sans-serif", textDecoration: "none" }}>Call (360) 544-9858</a>
              </div>
              <p className="text-xs mt-4 text-center" style={{ color: "oklch(0.65 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}>Project {modalIndex + 1} of {filteredProjects.length}</p>
            </div>
          </div>
        </div>
      )}

      {/* ══ Photo Lightbox ══ */}
      {currentPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "oklch(0 0 0 / 0.92)" }} onClick={closeLightbox}>
          <button onClick={closeLightbox} className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "oklch(0.25 0.02 80)", color: "oklch(0.96 0.01 80)" }} aria-label="Close"><X size={20} /></button>
          <button onClick={prevPhoto} className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "oklch(0.25 0.02 80)", color: "oklch(0.96 0.01 80)" }} aria-label="Previous"><ChevronLeft size={22} /></button>
          <button onClick={nextPhoto} className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "oklch(0.25 0.02 80)", color: "oklch(0.96 0.01 80)" }} aria-label="Next"><ChevronRight size={22} /></button>
          <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={currentPhoto.src} alt={currentPhoto.caption} className="w-full rounded-2xl object-contain" style={{ maxHeight: "78vh" }} />
            <div className="mt-3 text-center">
              {currentPhoto.tag && <span className="inline-block px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider mr-2" style={{ backgroundColor: "oklch(0.65 0.14 65)", color: "oklch(1 0 0)", fontFamily: "'Source Sans 3', sans-serif" }}>{currentPhoto.tag}</span>}
              <span className="text-sm" style={{ color: "oklch(0.80 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}>{currentPhoto.caption}</span>
              <p className="text-xs mt-1" style={{ color: "oklch(0.55 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}>{(lightboxIndex ?? 0) + 1} / {filteredPhotos.length}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
