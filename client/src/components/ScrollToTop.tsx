import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * Global rule: on any in-app navigation, jump to the top of the page.
 * Skips when the URL has a hash (so anchor links like /#services still scroll
 * to their section instead of being forced to the top).
 */
export default function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    if (typeof window !== "undefined" && !window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location]);
  return null;
}
