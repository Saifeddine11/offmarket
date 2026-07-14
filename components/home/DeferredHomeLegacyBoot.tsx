"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import {
  applyHomeDocumentState,
  bootHomeLegacyScripts,
  dispatchHomeBootEvents,
  forceHomeRevealFallback,
  homeSectionsHealthy,
  resetHomeScrollPosition,
  resetHomeSectionState,
  resolveHomepagePageId,
} from "@/lib/homepage/homeLegacyBoot";

function isHomePath(pathname: string | null) {
  return resolveHomepagePageId(pathname) !== null;
}

function scheduleAfterPaint(task: () => void) {
  requestAnimationFrame(() => {
    requestAnimationFrame(task);
  });
}

/** Loads/boots the homepage legacy scripts on every home mount — both on a
 *  fresh load (their inline SSR loaders are stripped by RSC) and after
 *  client-side navigation back to `/`. */
export function DeferredHomeLegacyBoot() {
  const pathname = usePathname();
  const bootGeneration = useRef(0);

  useEffect(() => {
    if (!isHomePath(pathname)) {
      return;
    }

    const generation = ++bootGeneration.current;
    let cancelled = false;

    const finishBoot = () => {
      if (cancelled || generation !== bootGeneration.current) return;

      dispatchHomeBootEvents();

      window.setTimeout(() => {
        if (cancelled || generation !== bootGeneration.current) return;
        if (!homeSectionsHealthy()) {
          forceHomeRevealFallback();
        }
        dispatchHomeBootEvents();
      }, 1200);
    };

    const signal = { cancelled: false };

    const run = async () => {
      const pageId = resolveHomepagePageId(pathname);
      if (!pageId) return;

      applyHomeDocumentState();
      resetHomeSectionState();
      resetHomeScrollPosition();

      // The homepage's legacy <script> bundles are authored as inline loader
      // scripts in the static-HTML body segments. Next.js App Router strips
      // executable inline <script> elements during RSC serialization (only
      // typed, non-executable scripts such as application/ld+json survive), so
      // those loaders never reach the browser and none of the section scripts
      // (featured projects, territories, blog, gsap, …) run on a fresh load —
      // sections render their shells but stay empty. We therefore always load
      // the bundles client-side on home mount, the same path already used after
      // navigation. (`window.__staticHtmlScriptQueue` cannot gate this: it is a
      // global that leaks across client navigations, so a prior page having set
      // it says nothing about whether the homepage's own scripts have run.)
      //
      // Critical section scripts boot first; shared.js (~1.4MB) + landing.js
      // load after first paint so the page becomes interactive sooner.
      try {
        await bootHomeLegacyScripts(pageId, {
          signal,
          onCriticalReady: finishBoot,
        });
      } catch {
        forceHomeRevealFallback();
      }

      if (!signal.cancelled) finishBoot();
    };

    scheduleAfterPaint(() => {
      void run();
    });

    return () => {
      cancelled = true;
      signal.cancelled = true;
    };
  }, [pathname]);

  return null;
}
