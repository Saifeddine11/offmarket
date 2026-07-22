"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    __staticHtmlScriptQueue?: Promise<void>;
    __omTerritoriesBoot?: () => void;
    OM_SIMULATOR_boot?: () => void;
    OM_BLOG_boot?: () => void;
    __omQuartiersMotionBoot?: () => void;
  }
}

function bootLegacySections(): boolean {
  let ready = true;

  const needsTerritories = !!document.querySelector("[data-om-territories-set]");
  const needsSimulator = !!document.querySelector(
    "[data-simulator], .om-simulator--home",
  );
  const needsBlog = !!document.querySelector("[data-om-blog]");

  if (needsTerritories) {
    if (typeof window.__omTerritoriesBoot === "function") {
      window.__omTerritoriesBoot();
    } else {
      ready = false;
    }
  }

  if (needsSimulator) {
    if (typeof window.OM_SIMULATOR_boot === "function") {
      window.OM_SIMULATOR_boot();
    } else {
      ready = false;
    }
  }

  if (needsBlog) {
    if (typeof window.OM_BLOG_boot === "function") {
      window.OM_BLOG_boot();
    } else {
      ready = false;
    }
  }

  if (ready && typeof window.__omQuartiersMotionBoot === "function") {
    window.__omQuartiersMotionBoot();
  }

  return ready;
}

function resetLegacyMounts() {
  document.querySelectorAll<HTMLElement>("[data-om-territories-set]").forEach((section) => {
    section.removeAttribute("data-om-territories-init");
    section.querySelector<HTMLElement>("[data-om-territories-stage]")?.replaceChildren();
    section.querySelector<HTMLElement>("[data-om-territories-mobile]")?.replaceChildren();
  });

  document.querySelectorAll<HTMLElement>("[data-om-blog] [data-om-blog-root]").forEach((root) => {
    root.replaceChildren();
  });
}

/** Boots territories, simulator, and blog after React hydration on inner pages. */
export function DeferredQuartiersLegacyBoot() {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    let retryId: number | undefined;
    let queueWaitId: number | undefined;

    const startRetry = () => {
      if (cancelled) return;
      if (bootLegacySections()) return;

      retryId = window.setInterval(() => {
        if (cancelled) return;
        if (bootLegacySections()) {
          window.clearInterval(retryId);
        }
      }, 50);

      window.setTimeout(() => {
        if (retryId) window.clearInterval(retryId);
      }, 15000);
    };

    const waitForScripts = () => {
      const queue = window.__staticHtmlScriptQueue;
      if (queue) {
        void queue.then(startRetry);
        return;
      }

      queueWaitId = window.setInterval(() => {
        if (cancelled) return;
        if (window.__staticHtmlScriptQueue) {
          window.clearInterval(queueWaitId);
          void window.__staticHtmlScriptQueue.then(startRetry);
        }
      }, 50);

      window.setTimeout(() => {
        if (queueWaitId) window.clearInterval(queueWaitId);
        startRetry();
      }, 15000);
    };

    resetLegacyMounts();
    waitForScripts();

    return () => {
      cancelled = true;
      if (retryId) window.clearInterval(retryId);
      if (queueWaitId) window.clearInterval(queueWaitId);
    };
  }, [pathname]);

  return null;
}
