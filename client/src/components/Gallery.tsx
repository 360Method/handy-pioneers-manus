/**
 * Gallery — Photo gallery with lightbox and project story modals.
 * Design: Pacific Northwest Craftsman
 * Each photo has scope, outcome, and location shown in the lightbox story panel.
 */

import { useState } from "react";
import { X, ChevronLeft, ChevronRight, MapPin, Wrench, CheckCircle } from "lucide-react";

// ─── PHOTO GALLERY DATA ───────────────────────────────────────────────────────
interface Photo {
  id: number;
  src: string;
  caption: string;
  tag?: string;
  location?: string;
  scope?: string;
  outcome?: string;
}

const photos: Photo[] = [
  { id: 1,  src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/p01_garage_adu_exterior_c4c14e19.jpg", caption: "Bonus room to ADU conversion — exterior", tag: "Remodel", location: "Vancouver, WA", scope: "Full bonus room conversion to accessory dwelling unit — framing, insulation, drywall, exterior siding, windows, and entry door.", outcome: "Homeowner added a rentable ADU, increasing property value and generating monthly rental income." },
  { id: 2,  src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/p02_garage_adu_interior_99806d01.jpg", caption: "Bonus room to ADU conversion — interior", tag: "Remodel", location: "Vancouver, WA", scope: "Interior finish work for ADU — flooring, trim, paint, kitchenette rough-in, and bathroom fixtures.", outcome: "Fully finished, move-in ready ADU unit with kitchen and bath." },
  { id: 3,  src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/p03_basement_remodel_d9572ee0.jpg", caption: "Basement remodel", tag: "Remodel", location: "Clark County, WA", scope: "Full basement remodel — framing, drywall, LVP flooring, recessed lighting, and egress window.", outcome: "Unfinished basement transformed into usable living space." },
  { id: 4,  src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/p04_basement_kitchenette_b2e08931.jpg", caption: "Basement kitchenette build-out", tag: "Remodel", location: "Clark County, WA", scope: "Kitchenette build-out in finished basement — custom cabinetry, countertop, sink, and mini-fridge rough-in.", outcome: "Self-contained kitchenette for in-law suite or rental unit." },
  { id: 5,  src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/p05_kitchenette_a88dedf1.jpg", caption: "Basement kitchenette — finished", tag: "Remodel", location: "Clark County, WA", scope: "Finished kitchenette with tile backsplash, under-cabinet lighting, and hardware installation.", outcome: "Polished, functional kitchenette ready for occupancy." },
  { id: 6,  src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/p06_master_bath_965c8074.jpg", caption: "Master bath remodel", tag: "Remodel", location: "Camas, WA", scope: "Full master bathroom gut and remodel — tile shower surround, new vanity, toilet, flooring, and fixtures.", outcome: "Outdated 1990s bathroom replaced with a clean, modern spa-style master bath." },
  { id: 7,  src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/p07_bathroom_74_5a9d7b5f.jpg", caption: "Bathroom remodel", tag: "Remodel", location: "Clark County, WA", scope: "Full bathroom remodel — tile work, vanity replacement, mirror, lighting, and paint.", outcome: "Refreshed bathroom with updated fixtures and clean tile work." },
  { id: 8,  src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/p08_bathroom_75_3009ef99.jpg", caption: "Bathroom remodel", tag: "Remodel", location: "Clark County, WA", scope: "Bathroom remodel including shower tile, new vanity, and flooring replacement.", outcome: "Functional, updated bathroom with quality tile and fixtures." },
  { id: 9,  src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/p09_bathroom_tub_e523c5db.jpg", caption: "Bathroom tub remodel", tag: "Remodel", location: "Clark County, WA", scope: "Tub surround tile replacement, caulking, and fixture updates.", outcome: "Watertight, refreshed tub area with new tile and grout." },
  { id: 10, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/p10_bathroom_upgrade1_8ef8f010.jpg", caption: "Bathroom upgrade", tag: "Remodel", location: "Clark County, WA", scope: "Vanity, mirror, and lighting upgrade with paint refresh.", outcome: "High-impact bathroom upgrade completed in under two days." },
  { id: 11, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/p11_bathroom_upgrade2_2467b93b.jpg", caption: "Bathroom upgrade", tag: "Remodel", location: "Clark County, WA", scope: "Toilet replacement, vanity swap, and tile touch-up.", outcome: "Quick turnaround upgrade with noticeable quality improvement." },
  { id: 12, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/p12_opening_living_room_0da286f6.jpg", caption: "Opening up living room — wall removal", tag: "Remodel", location: "Vancouver, WA", scope: "Load-bearing wall removal with beam installation to open kitchen/living area.", outcome: "Open-concept main floor with improved natural light and flow." },
  { id: 13, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/p13_flooring_trim_paint_a5970bcb.jpg", caption: "Flooring, trim & paint", tag: "Remodel", location: "Clark County, WA", scope: "LVP flooring installation throughout main floor, new baseboard trim, and full interior paint.", outcome: "Cohesive, refreshed interior ready for sale or occupancy." },
  { id: 14, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/p14_rot_repair_flooring_ba4c43ef.jpg", caption: "Rot repair & flooring replacement", tag: "Carpentry", location: "Clark County, WA", scope: "Subfloor rot repair, structural reinforcement, and new LVP flooring installation.", outcome: "Structurally sound floor with no soft spots and clean finish." },
  { id: 15, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/p15_rotted_stair_repair_3111225f.jpg", caption: "Rotted stair repair", tag: "Carpentry", location: "Clark County, WA", scope: "Exterior stair rot repair — replacement of rotted stringers, treads, and handrail.", outcome: "Safe, code-compliant exterior stairs with new pressure-treated lumber." },
  { id: 16, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/p16_pressure_washing1_adbe808f.jpg", caption: "Pressure washing — driveway & exterior", tag: "Maintenance", location: "Clark County, WA", scope: "High-pressure washing of driveway, walkways, and exterior siding.", outcome: "Removed years of algae and staining — curb appeal restored." },
  { id: 17, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/p17_pressure_washing3_d2f28cd1.jpg", caption: "Pressure washing — deck & siding", tag: "Maintenance", location: "Clark County, WA", scope: "Deck surface and siding pressure wash with mildew treatment.", outcome: "Clean deck surface ready for staining or sealing." },
  { id: 18, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/p18_roof_moss_7678be03.jpg", caption: "Roof cleaning & moss treatment", tag: "Maintenance", location: "Clark County, WA", scope: "Roof moss removal and zinc strip installation to prevent regrowth.", outcome: "Moss-free roof with long-term prevention treatment applied." },
  { id: 19, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/p19_house_washing_31356bc4.jpg", caption: "Full house washing", tag: "Maintenance", location: "Clark County, WA", scope: "Soft-wash full exterior house cleaning — siding, trim, and gutters.", outcome: "Entire exterior cleaned without damage to paint or siding." },
  { id: 20, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/p20_ceiling_fan_37d8049e.jpg", caption: "Ceiling fan replacement", tag: "Maintenance", location: "Clark County, WA", scope: "Old ceiling fan removal and new fan installation with remote control.", outcome: "Quiet, efficient ceiling fan installed and tested same day." },
  { id: 21, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/p21_exterior_light_14816f37.jpg", caption: "Exterior light fixture replacement", tag: "Maintenance", location: "Clark County, WA", scope: "Exterior light fixture swap — removal of old fixture, wiring check, and new fixture installation.", outcome: "Updated exterior lighting with improved brightness and style." },
  { id: 22, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/p22_gutter_ba_fe54062e.jpg", caption: "Gutter & fascia replacement — before & after", tag: "Before & After", location: "Clark County, WA", scope: "Full gutter system and fascia board replacement — removal of rotted fascia, new fascia install, and seamless gutter system.", outcome: "Watertight gutter system protecting the roofline and foundation. Dramatic visual improvement." },
  { id: 23, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/p23_bathroom_floor_ba_9c3a0022.jpg", caption: "Bathroom floor tile replacement — before & after", tag: "Before & After", location: "Camas, WA", scope: "Cracked bathroom floor tile removal, subfloor repair, and new porcelain tile installation with grout.", outcome: "Clean, waterproof bathroom floor replacing cracked and stained original tile." },
  { id: 24, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/p24_deck_pool_7e19af76.jpg", caption: "Deck build with pool surround", tag: "Carpentry", location: "Clark County, WA", scope: "New deck construction with pool surround — pressure-treated framing, composite decking, and railing system.", outcome: "Custom outdoor living space with pool access and built-in seating area." },
];

const PHOTO_TAGS = ["All", ...Array.from(new Set(photos.map((p) => p.tag).filter(Boolean))) as string[]];

export default function Gallery() {
  const [activePhotoTag, setActivePhotoTag] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredPhotos = activePhotoTag === "All" ? photos : photos.filter((p) => p.tag === activePhotoTag);
  const openLightbox = (index: number) => { setLightboxIndex(index); document.body.style.overflow = "hidden"; };
  const closeLightbox = () => { setLightboxIndex(null); document.body.style.overflow = ""; };
  const prevPhoto = (e: React.MouseEvent) => { e.stopPropagation(); if (lightboxIndex === null) return; setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length); };
  const nextPhoto = (e: React.MouseEvent) => { e.stopPropagation(); if (lightboxIndex === null) return; setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length); };
  const currentPhoto = lightboxIndex !== null ? filteredPhotos[lightboxIndex] : null;

  return (
    <section id="gallery" className="py-20" style={{ backgroundColor: "oklch(0.97 0.015 80)" }}>
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="section-divider justify-center mb-4">
            <span className="section-divider-label">Our Work</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}>
            Project Gallery
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "oklch(0.45 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}>
            Real projects, real results. Click any photo for the full project story.
          </p>
        </div>

        {/* Tag Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {PHOTO_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => { setActivePhotoTag(tag); setLightboxIndex(null); }}
              className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide cursor-pointer transition-all"
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                backgroundColor: activePhotoTag === tag ? "oklch(0.32 0.07 160)" : "oklch(0.90 0.015 80)",
                color: activePhotoTag === tag ? "oklch(1 0 0)" : "oklch(0.35 0.04 80)",
                border: "none",
                letterSpacing: "0.03em",
              }}
            >
              {tag}{tag === "All" && <span className="ml-1.5 text-xs opacity-70">({photos.length})</span>}
            </button>
          ))}
        </div>

        {/* Masonry Photo Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4" style={{ columnGap: "0.75rem" }}>
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              className="relative overflow-hidden rounded-xl cursor-pointer group mb-3 break-inside-avoid"
              onClick={() => openLightbox(index)}
            >
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <button className="hcp-button" onClick={() => (window as any).HCPWidget?.openModal()}>
            Schedule a Consultation
          </button>
        </div>
      </div>

      {/* ─── Photo Lightbox with Project Story ─── */}
      {currentPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "oklch(0 0 0 / 0.92)" }}
          onClick={closeLightbox}
        >
          {/* Close */}
          <button onClick={closeLightbox} className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "oklch(0.25 0.02 80)", color: "oklch(0.96 0.01 80)" }} aria-label="Close">
            <X size={20} />
          </button>
          {/* Prev */}
          <button onClick={prevPhoto} className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "oklch(0.25 0.02 80)", color: "oklch(0.96 0.01 80)" }} aria-label="Previous">
            <ChevronLeft size={22} />
          </button>
          {/* Next */}
          <button onClick={nextPhoto} className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "oklch(0.25 0.02 80)", color: "oklch(0.96 0.01 80)" }} aria-label="Next">
            <ChevronRight size={22} />
          </button>

          {/* Content panel */}
          <div
            className="relative w-full flex flex-col md:flex-row gap-0 rounded-2xl overflow-hidden"
            style={{ maxWidth: "900px", maxHeight: "88vh", backgroundColor: "oklch(0.12 0.03 160)", boxShadow: "0 24px 80px rgba(0,0,0,0.60)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Photo */}
            <div className="flex-1 min-h-0 flex items-center justify-center overflow-hidden" style={{ backgroundColor: "oklch(0.08 0.02 160)", minHeight: "240px" }}>
              <img
                src={currentPhoto.src}
                alt={currentPhoto.caption}
                className="w-full h-full object-contain"
                style={{ maxHeight: "88vh" }}
              />
            </div>

            {/* Story panel */}
            <div
              className="shrink-0 flex flex-col justify-between p-6 overflow-y-auto"
              style={{ width: "100%", maxWidth: "280px", borderLeft: "1px solid oklch(0.22 0.05 160)" }}
            >
              <div>
                {/* Tag + counter */}
                <div className="flex items-center justify-between mb-4">
                  {currentPhoto.tag && (
                    <span
                      className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider"
                      style={{ backgroundColor: "oklch(0.65 0.14 65)", color: "white", fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      {currentPhoto.tag}
                    </span>
                  )}
                  <span className="text-xs" style={{ color: "oklch(0.55 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}>
                    {(lightboxIndex ?? 0) + 1} / {filteredPhotos.length}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-white mb-3 leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {currentPhoto.caption}
                </h3>

                {/* Location */}
                {currentPhoto.location && (
                  <div className="flex items-center gap-1.5 mb-4">
                    <MapPin size={13} style={{ color: "oklch(0.65 0.14 65)" }} />
                    <span className="text-xs font-semibold" style={{ color: "oklch(0.65 0.14 65)", fontFamily: "'Source Sans 3', sans-serif" }}>
                      {currentPhoto.location}
                    </span>
                  </div>
                )}

                {/* Scope */}
                {currentPhoto.scope && (
                  <div className="mb-4">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Wrench size={12} style={{ color: "oklch(0.60 0.02 80)" }} />
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "oklch(0.60 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}>Scope</span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'Source Sans 3', sans-serif" }}>
                      {currentPhoto.scope}
                    </p>
                  </div>
                )}

                {/* Outcome */}
                {currentPhoto.outcome && (
                  <div className="rounded-lg p-3" style={{ backgroundColor: "rgba(200,137,42,0.12)", border: "1px solid rgba(200,137,42,0.25)" }}>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <CheckCircle size={12} style={{ color: "oklch(0.65 0.14 65)" }} />
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "oklch(0.65 0.14 65)", fontFamily: "'Source Sans 3', sans-serif" }}>Outcome</span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.75)", fontFamily: "'Source Sans 3', sans-serif" }}>
                      {currentPhoto.outcome}
                    </p>
                  </div>
                )}
              </div>

              {/* CTA */}
              <button
                className="mt-5 w-full py-2.5 rounded-lg text-xs font-bold uppercase tracking-wide border-0 cursor-pointer transition-opacity hover:opacity-80"
                style={{ backgroundColor: "oklch(0.65 0.14 65)", color: "white", fontFamily: "'Source Sans 3', sans-serif" }}
                onClick={() => { closeLightbox(); (window as any).HCPWidget?.openModal(); }}
              >
                Request a Similar Project
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
