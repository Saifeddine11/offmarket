"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    __staticHtmlScriptQueue?: Promise<void>;
    __omFeaturedProjectsBoot?: () => void;
  }
}

function gridHasCards(): boolean {
  const grid = document.querySelector(
    ".om-featured-projects [data-om-property-cards]",
  );
  if (!grid) return false;
  return grid.querySelectorAll(".om-reveal-card, .om-featured-projects__card")
    .length > 0;
}

function bootFeatured(): boolean {
  if (typeof window.__omFeaturedProjectsBoot !== "function") return false;
  window.__omFeaturedProjectsBoot();
  return true;
}

/**
 * Keeps featured property cards filled after mount / soft locale navigation.
 *
 * The React shell mounts an empty grid; om-featured-projects.js fills it.
 * That script only auto-runs once, and React re-renders used to wipe the grid
 * when dangerouslySetInnerHTML was set to "". This boot + watchdog re-fills
 * whenever the grid is empty.
 */
export function FeaturedProjectsBoot() {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    let retryId = 0;
    let watchId = 0;
    let observer: MutationObserver | null = null;

    function ensureCards() {
      if (cancelled) return;
      if (gridHasCards()) return;
      bootFeatured();
    }

    function startWatchdog() {
      ensureCards();

      watchId = window.setInterval(() => {
        ensureCards();
      }, 400);

      const grid = document.querySelector(
        ".om-featured-projects [data-om-property-cards]",
      );
      if (grid && typeof MutationObserver === "function") {
        observer = new MutationObserver(() => {
          ensureCards();
        });
        observer.observe(grid, { childList: true });
      }

      // Stop the interval after cards have been stable for a while; observer
      // remains for late React remounts that clear the grid.
      window.setTimeout(() => {
        if (watchId) {
          window.clearInterval(watchId);
          watchId = 0;
        }
      }, 8000);
    }

    const queue = window.__staticHtmlScriptQueue ?? Promise.resolve();
    void queue.then(() => {
      if (cancelled) return;
      if (bootFeatured()) {
        startWatchdog();
        return;
      }

      retryId = window.setInterval(() => {
        if (bootFeatured()) {
          window.clearInterval(retryId);
          retryId = 0;
          startWatchdog();
        }
      }, 50);

      window.setTimeout(() => {
        if (retryId) window.clearInterval(retryId);
        if (!cancelled) startWatchdog();
      }, 5000);
    });

    const paintId = window.setTimeout(() => {
      ensureCards();
    }, 120);

    const onPageShow = () => ensureCards();
    window.addEventListener("pageshow", onPageShow);

    return () => {
      cancelled = true;
      if (retryId) window.clearInterval(retryId);
      if (watchId) window.clearInterval(watchId);
      window.clearTimeout(paintId);
      observer?.disconnect();
      window.removeEventListener("pageshow", onPageShow);
    };
  }, [pathname]);

  return null;
}
