/**
 * Analytics — GA4 + Meta Pixel scaffolding.
 *
 * Loads gtag.js / fbq only when the corresponding env var is set; renders
 * nothing at all if neither is configured.  Fires a pageview on initial
 * mount and again every time wouter's location changes.
 *
 * Env vars:
 *   VITE_GA4_MEASUREMENT_ID  — e.g. "G-XXXXXXXXXX"
 *   VITE_META_PIXEL_ID       — e.g. "1234567890"
 *
 * Usage: mount <Analytics /> once at the top of the router tree.
 */
import { useEffect } from "react";
import { useLocation } from "wouter";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & { callMethod?: (...args: unknown[]) => void; queue?: unknown[]; loaded?: boolean; version?: string; push?: unknown };
    _fbq?: unknown;
  }
}

const GA4_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID as string | undefined;
const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID as string | undefined;

let ga4Initialised = false;
let metaInitialised = false;

function initGA4() {
  if (ga4Initialised || !GA4_ID) return;
  ga4Initialised = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
  document.head.appendChild(s);

  window.gtag("js", new Date());
  // Manual pageview per-route. Turn off auto send so we don't double-count.
  window.gtag("config", GA4_ID, { send_page_view: false });
}

function initMetaPixel() {
  if (metaInitialised || !META_PIXEL_ID) return;
  metaInitialised = true;

  // Meta's standard snippet, minus the auto PageView (we fire manually).
  (function (f: any, b, e, v, n?: any, t?: any, s?: any) {
    if (f.fbq) return;
    n = f.fbq = function () {
      // eslint-disable-next-line prefer-rest-params
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = true;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbq.js");

  window.fbq!("init", META_PIXEL_ID);
}

function trackPageview(path: string) {
  if (GA4_ID && window.gtag) {
    window.gtag("event", "page_view", {
      page_path: path,
      page_location: window.location.href,
      send_to: GA4_ID,
    });
  }
  if (META_PIXEL_ID && window.fbq) {
    window.fbq("track", "PageView");
  }
}

export default function Analytics() {
  const [location] = useLocation();

  useEffect(() => {
    if (!GA4_ID && !META_PIXEL_ID) return;
    initGA4();
    initMetaPixel();
    // Fire an initial pageview on mount — location hook already gives us the
    // current path.
    trackPageview(location);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!GA4_ID && !META_PIXEL_ID) return;
    trackPageview(location);
  }, [location]);

  return null;
}
