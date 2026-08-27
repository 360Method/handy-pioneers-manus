/**
 * Real photographs of real Handy Pioneers jobs, used in the "recent work" grids
 * on the Membership and Multifamily pages.
 *
 * Two rules, and they are not negotiable:
 *  1. Every image here is a photo of work we actually did. Nothing generated,
 *     nothing stock. A caption must describe the job in the frame.
 *  2. The file lives under client/public/images/ on our own origin. This grid
 *     used to load six photos from Manus's CDN and every one of them went to
 *     403 on 2026-08-26, so the whole section rendered as broken-image icons.
 *
 * The six CDN photos it replaced were maintenance-visit shots: roof moss
 * cleaning, gutter cleaning, hose bib winterisation, exterior light fixture
 * replacement, rotted stair restoration, and a driveway pressure wash. Those
 * originals are gone. When those jobs come round again, shoot them, drop the
 * files in client/public/images/ with a dated filename, and add them here.
 */
export type WorkPhoto = { src: string; caption: string };

export const WORK_PHOTOS: WorkPhoto[] = [
  {
    src: "/images/porch-post-before-after-camas-16x9-2026-08.webp",
    caption: "Porch post rot repair, Camas",
  },
  {
    src: "/images/porch-columns-finished-camas-2026-08.webp",
    caption: "Porch columns rebuilt and painted, Camas",
  },
  {
    src: "/images/porch-post-standoff-base-camas-16x9-2026-08.webp",
    caption: "Standoff bases fitted to keep posts out of standing water, Camas",
  },
  {
    src: "/images/kitchen-remodel-before-after-2026-07.webp",
    caption: "Kitchen remodel, Clark County",
  },
  {
    src: "/images/flooring-install-vancouver-2026-06.webp",
    caption: "Flooring installation, Vancouver",
  },
  {
    src: "/images/hero-gallery/hsBQUCJsPHmAqWDF.jpg",
    caption: "Trex railing and custom gate on a deck",
  },
];
