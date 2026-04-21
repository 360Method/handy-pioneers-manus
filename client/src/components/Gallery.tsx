/**
 * Gallery — Photo-only gallery section.
 * Design: Pacific Northwest Craftsman
 * Shows a masonry grid of project photos with tag filtering and a lightbox.
 * Project Stories have moved to the Blog section (#blog).
 */

import { useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

// ─── PHOTO GALLERY DATA ───────────────────────────────────────────────────────
interface Photo {
  id: number;
  src: string;
  caption: string;
  tag?: string;
}

const photos: Photo[] = [
  { id: 1,  src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/p01_garage_adu_exterior_c4c14e19.jpg", caption: "Bonus room to ADU conversion — exterior", tag: "Remodel" },
  { id: 2,  src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/p02_garage_adu_interior_99806d01.jpg", caption: "Bonus room to ADU conversion — interior", tag: "Remodel" },
  { id: 3,  src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/p03_basement_remodel_d9572ee0.jpg", caption: "Basement remodel", tag: "Remodel" },
  { id: 4,  src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/p04_basement_kitchenette_b2e08931.jpg", caption: "Basement kitchenette build-out", tag: "Remodel" },
  { id: 5,  src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/p05_kitchenette_a88dedf1.jpg", caption: "Basement kitchenette — finished", tag: "Remodel" },
  { id: 6,  src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/p06_master_bath_965c8074.jpg", caption: "Master bath remodel", tag: "Remodel" },
  { id: 7,  src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/p07_bathroom_74_5a9d7b5f.jpg", caption: "Bathroom remodel", tag: "Remodel" },
  { id: 8,  src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/p08_bathroom_75_3009ef99.jpg", caption: "Bathroom remodel", tag: "Remodel" },
  { id: 9,  src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/p09_bathroom_tub_e523c5db.jpg", caption: "Bathroom tub remodel", tag: "Remodel" },
  { id: 10, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/p10_bathroom_upgrade1_8ef8f010.jpg", caption: "Bathroom upgrade", tag: "Remodel" },
  { id: 11, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/p11_bathroom_upgrade2_2467b93b.jpg", caption: "Bathroom upgrade", tag: "Remodel" },
  { id: 12, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/p12_opening_living_room_0da286f6.jpg", caption: "Opening up living room — wall removal", tag: "Remodel" },
  { id: 13, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/p13_flooring_trim_paint_a5970bcb.jpg", caption: "Flooring, trim & paint", tag: "Remodel" },
  { id: 14, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/p14_rot_repair_flooring_ba4c43ef.jpg", caption: "Rot repair & flooring replacement", tag: "Carpentry" },
  { id: 15, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/p15_rotted_stair_repair_3111225f.jpg", caption: "Rotted stair repair", tag: "Carpentry" },
  { id: 16, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/p16_pressure_washing1_adbe808f.jpg", caption: "Pressure washing — driveway & exterior", tag: "Maintenance" },
  { id: 17, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/p17_pressure_washing3_d2f28cd1.jpg", caption: "Pressure washing — deck & siding", tag: "Maintenance" },
  { id: 18, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/p18_roof_moss_7678be03.jpg", caption: "Roof cleaning & moss treatment", tag: "Maintenance" },
  { id: 19, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/p19_house_washing_31356bc4.jpg", caption: "Full house washing", tag: "Maintenance" },
  { id: 20, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/p20_ceiling_fan_37d8049e.jpg", caption: "Ceiling fan replacement", tag: "Maintenance" },
  { id: 21, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/p21_exterior_light_14816f37.jpg", caption: "Exterior light fixture replacement", tag: "Maintenance" },
  { id: 22, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/p22_gutter_ba_fe54062e.jpg", caption: "Gutter & fascia replacement — before & after", tag: "Before & After" },
  { id: 23, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/p23_bathroom_floor_ba_9c3a0022.jpg", caption: "Bathroom floor tile replacement — before & after", tag: "Before & After" },
  { id: 24, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/p24_deck_pool_7e19af76.jpg", caption: "Deck build with pool surround", tag: "Carpentry" },
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
              onClick={() => openLightbox(index)}
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
          <button className="hcp-button" onClick={() => (window as any).HCPWidget?.openModal()}>
            Request Estimate Today
          </button>
        </div>
      </div>

      {/* Photo Lightbox */}
      {currentPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "oklch(0 0 0 / 0.92)" }}
          onClick={closeLightbox}
        >
          <button onClick={closeLightbox} className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "oklch(0.25 0.02 80)", color: "oklch(0.96 0.01 80)" }} aria-label="Close">
            <X size={20} />
          </button>
          <button onClick={prevPhoto} className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "oklch(0.25 0.02 80)", color: "oklch(0.96 0.01 80)" }} aria-label="Previous">
            <ChevronLeft size={22} />
          </button>
          <button onClick={nextPhoto} className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "oklch(0.25 0.02 80)", color: "oklch(0.96 0.01 80)" }} aria-label="Next">
            <ChevronRight size={22} />
          </button>
          <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={currentPhoto.src}
              alt={currentPhoto.caption}
              className="w-full rounded-2xl object-contain"
              style={{ maxHeight: "78vh" }}
            />
            <div className="mt-3 text-center">
              {currentPhoto.tag && (
                <span className="inline-block px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider mr-2" style={{ backgroundColor: "oklch(0.65 0.14 65)", color: "oklch(1 0 0)", fontFamily: "'Source Sans 3', sans-serif" }}>
                  {currentPhoto.tag}
                </span>
              )}
              <span className="text-sm" style={{ color: "oklch(0.80 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}>
                {currentPhoto.caption}
              </span>
              <p className="text-xs mt-1" style={{ color: "oklch(0.55 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}>
                {(lightboxIndex ?? 0) + 1} / {filteredPhotos.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
