/**
 * Gallery - Photo-only gallery section.
 * Design: Pacific Northwest Craftsman
 * Shows a masonry grid of project photos with tag filtering and a lightbox.
 * Project Stories have moved to the Blog section (#blog).
 */

import { useState } from "react";
import { ZoomIn } from "lucide-react";
import PhotoLightbox from "@/components/PhotoLightbox";
import { openInquiry } from "@/lib/inquiry";

// ─── PHOTO GALLERY DATA ───────────────────────────────────────────────────────
interface Photo {
  id: number;
  src: string;
  caption: string;
  tag?: string;
}

const photos: Photo[] = [
  { id: 25, src: "/images/porch-post-before-after-camas-2026-08.webp", caption: "Porch post rot repair in Camas - a rotted base rebuilt and raised on a standoff base", tag: "Before & After" },
  { id: 26, src: "/images/porch-column-rot-repair-camas-2026-08.webp", caption: "Porch column rot repair in Camas - structural posts flashed, then new wraps and paint", tag: "Before & After" },
  { id: 27, src: "/images/porch-post-standoff-base-camas-2026-08.webp", caption: "Why porch posts rot - set straight into concrete, versus raised clear on a standoff base", tag: "Before & After" },
  { id: 24, src: "/images/kitchen-remodel-before-after-2026-07.webp", caption: "Kitchen remodel - new flooring, white shaker cabinets, quartz countertops, and fresh paint", tag: "Before & After" },
  { id: 1, src: "/images/hero-gallery/wjLagUVyHJnefJeB.jpg", caption: "Lower-level kitchenette: an unfinished basement wall turned into a kitchen and living area", tag: "Remodel" },
  { id: 2, src: "/images/hero-gallery/UCqTnokKBAzttFFs.jpg", caption: "Basement room transformation with new flooring, kitchen area, and dining space", tag: "Before & After" },
  { id: 3, src: "/images/hero-gallery/OGRouAudxeyHawdy.jpg", caption: "Bathroom remodel with white subway tiles, bathtub, and modern black fixtures", tag: "Remodel" },
  { id: 4, src: "/images/hero-gallery/HsevCHMMnApBXAqN.jpg", caption: "Bathroom remodel featuring new vanity, sink, flooring, and fresh paint", tag: "Remodel" },
  { id: 5, src: "/images/hero-gallery/jXBeWLauPzuNoocm.jpg", caption: "Bathroom remodel with new vanity, mirror, lighting, and flooring", tag: "Remodel" },
  { id: 6, src: "/images/hero-gallery/WrTgmbwrBOLkeuvQ.jpg", caption: "Garage transformation - demolition and clean-out to organized empty space", tag: "Before & After" },
  { id: 7, src: "/images/hero-gallery/VzlGuBOWFXHnpjig.jpg", caption: "Living room and kitchen remodel with hardwood flooring, updated lighting, and fresh paint", tag: "Remodel" },
  { id: 8, src: "/images/hero-gallery/elKuhgxmpmZnBtDa.jpg", caption: "Bathroom remodel - outdated yellow room transformed into a modern white space", tag: "Before & After" },
  { id: 9, src: "/images/hero-gallery/MPYajNZmbQZgLzvS.jpg", caption: "Bathroom remodel - outdated space updated with modern fixtures and finishes", tag: "Remodel" },
  { id: 10, src: "/images/hero-gallery/RUDYmgCyMipRnwka.jpg", caption: "Lower-level kitchenette: a bare wall turned into a full cooking wall", tag: "Remodel" },
  { id: 11, src: "/images/hero-gallery/ifxXRKwuQfvSbApZ.jpg", caption: "Lower-level kitchenette: an old storage room turned into a kitchenette with white cabinets and new flooring", tag: "Before & After" },
  { id: 12, src: "/images/hero-gallery/nRlKKIJALACEEquv.jpg", caption: "Kitchen remodel with dark countertops, updated cabinets, and modern fixtures", tag: "Remodel" },
  { id: 13, src: "/images/garage-conversion-adu-exterior.jpg", caption: "Garage converted to an attached ADU: the garage door replaced with new siding, two windows, and an entry door", tag: "Before & After" },
  { id: 14, src: "/images/hero-gallery/qMQRAbINWFvrUPEB.jpg", caption: "Bathroom remodel featuring new flooring, trim, and toilet replacement", tag: "Remodel" },
  { id: 15, src: "/images/hero-gallery/jPOgJPckBdaPcCPr.jpg", caption: "Room transformation with new flooring, light-colored paint, and window blinds", tag: "Before & After" },
  { id: 16, src: "/images/hero-gallery/AwSmGNttlDLyBDuO.jpg", caption: "Attached ADU: a dated yellow bonus room turned into a unit with a full kitchen and laundry", tag: "Before & After" },
  { id: 18, src: "/images/hero-gallery/ryLhHcoLDKcrOody.jpg", caption: "Living room transformation with hardwood flooring, recessed lighting, and updated fireplace", tag: "Remodel" },
  { id: 28, src: "/images/lvp-bedroom-before-after-2026-09.webp", caption: "Luxury vinyl plank flooring in a rental bedroom, ready for the next tenant", tag: "Before & After" },
  { id: 19, src: "/images/hero-gallery/xwDBZkjnyzCPfPzP.jpg", caption: "Bathroom transformation with new tiles, vanity, and modern fixtures", tag: "Before & After" },
  { id: 20, src: "/images/hero-gallery/NnOoZJHBczCXjeKB.jpg", caption: "Basement room transformation with new flooring, recessed lighting, and fresh paint", tag: "Before & After" },
  { id: 21, src: "/images/hero-gallery/pJHcMDChEQIqznEz.jpg", caption: "Clean and organized kitchen with white cabinets and stainless steel appliances", tag: "Remodel" },
  { id: 22, src: "/images/hero-gallery/hsBQUCJsPHmAqWDF.jpg", caption: "Trex railing installation with custom gate on a deck - before and after", tag: "Carpentry" },
  { id: 23, src: "/images/hero-gallery/XVCTcQFFmRquAQZe.jpg", caption: "72-inch TV wall mount installation - clean and professional finish", tag: "Before & After" },
];

const PHOTO_TAGS = ["All", ...Array.from(new Set(photos.map((p) => p.tag).filter(Boolean))) as string[]];

export default function Gallery() {
  const [activePhotoTag, setActivePhotoTag] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredPhotos = activePhotoTag === "All" ? photos : photos.filter((p) => p.tag === activePhotoTag);

  const lightboxPhotos = filteredPhotos.map((p) => ({ src: p.src, alt: p.caption, caption: p.caption, tag: p.tag }));

  return (
    <section id="gallery" className="py-20" style={{ backgroundColor: "oklch(0.97 0.015 80)" }}>
      <div className="container">
        {/* Section Header */}
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

        {/* Tag Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 reveal">
          {PHOTO_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => { setActivePhotoTag(tag); setLightboxIndex(null); }}
              className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200"
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
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 reveal" style={{ columnGap: "0.75rem" }}>
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              className="relative overflow-hidden rounded-xl cursor-pointer group mb-3 break-inside-avoid"
              onClick={() => setLightboxIndex(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setLightboxIndex(index); } }}
              aria-label={`Open photo: ${photo.caption}`}
            >
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div
                className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(to top, oklch(0 0 0 / 0.72) 0%, transparent 55%)" }}
              >
                <div className="flex items-end justify-between gap-2">
                  <div className="min-w-0">
                    {photo.tag && (
                      <span className="inline-block px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider mb-1" style={{ backgroundColor: "oklch(0.65 0.14 65)", color: "oklch(1 0 0)", fontFamily: "'Source Sans 3', sans-serif" }}>
                        {photo.tag}
                      </span>
                    )}
                    <p className="text-xs font-medium leading-snug truncate" style={{ color: "oklch(0.96 0.01 80)", fontFamily: "'Source Sans 3', sans-serif" }}>
                      {photo.caption}
                    </p>
                  </div>
                  <ZoomIn size={16} color="oklch(0.96 0.01 80)" className="flex-none" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10 reveal">
          <button className="hcp-button" onClick={() => openInquiry()}>
            Request Estimate Today
          </button>
        </div>
      </div>

      <PhotoLightbox photos={lightboxPhotos} index={lightboxIndex} onChange={setLightboxIndex} />
    </section>
  );
}
