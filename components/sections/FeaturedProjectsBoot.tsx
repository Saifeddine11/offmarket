"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    __staticHtmlScriptQueue?: Promise<void>;
    __omFeaturedProjectsBoot?: () => void;
  }
}

/**
 * Re-injects featured property cards after client-side locale / route changes.
 * The React shell mounts an empty grid; om-featured-projects.js fills it, but
 * that script only auto-runs once unless this boot hook is called again.
 */
export function FeaturedProjectsBoot() {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    let retryId = 0;

    function bootFeatured() {
      if (cancelled) return true;
      if (typeof window.__omFeaturedProjectsBoot === "function") {
        window.__omFeaturedProjectsBoot();
        return true;
      }
      return false;
    }

    const queue = window.__staticHtmlScriptQueue ?? Promise.resolve();
    void queue.then(() => {
      if (cancelled) return;
      if (bootFeatured()) return;

      retryId = window.setInterval(() => {
        if (bootFeatured()) {
          window.clearInterval(retryId);
        }
      }, 50);

      window.setTimeout(() => {
        if (retryId) window.clearInterval(retryId);
      }, 5000);
    });

    // Second pass after paint — covers cases where the section mounts slightly
    // after the script queue resolves during soft locale navigation.
    const paintId = window.setTimeout(() => {
      bootFeatured();
    }, 120);

    return () => {
      cancelled = true;
      if (retryId) window.clearInterval(retryId);
      window.clearTimeout(paintId);
    };
  }, [pathname]);

  return null;
}
