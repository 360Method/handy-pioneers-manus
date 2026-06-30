/**
 * Image src helper.
 *
 * Our image data stores absolute https://handypioneers.com/... URLs because the
 * social / Open Graph meta tags need absolute URLs. But a visible <img> should
 * load from whatever host the page is actually served from, so that staging
 * (where new images live before they are promoted to prod) shows its own images
 * instead of pointing at a prod URL that does not exist yet.
 *
 * localImage() strips the prod origin so the <img> resolves on the current host;
 * use the original absolute URL for og:image / SEO.
 */
const SITE = "https://handypioneers.com";

export function localImage(url?: string): string | undefined {
  if (!url) return url;
  return url.startsWith(SITE) ? url.slice(SITE.length) : url;
}
