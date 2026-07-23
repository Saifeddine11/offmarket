"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    __staticHtmlScriptQueue?: Promise<void>;
    __staticHtmlLoadedScripts?: Record<string, Promise<void> | undefined>;
    __omFeaturedProjectsBoot?: () => void;
  }
}

function gridHasCards(section: HTMLElement): boolean {
  const grid = section.querySelector<HTMLElement>(
    "[data-om-property-cards]",
  );
  return !!grid?.querySelector(
    ".om-reveal-card, .om-featured-projects__card",
  );
}

function normalizeSrcs(srcs: readonly string[] | null | undefined): string[] {
  if (!Array.isArray(srcs)) {
    if (process.env.NODE_ENV !== "production" && srcs != null) {
      console.warn(
        "[FeaturedProjectsBoot] `srcs` was invalid; skipping legacy script load.",
        srcs,
      );
    }
    return [];
  }

  return srcs.filter(
    (src): src is string => typeof src === "string" && src.length > 0,
  );
}

function loadScript(src: string): Promise<void> {
  window.__staticHtmlLoadedScripts ??= {};

  if (window.__staticHtmlLoadedScripts[src]) {
    return window.__staticHtmlLoadedScripts[src]!;
  }

  const loadPromise = new Promise<void>((resolve) => {
    document.querySelectorAll(`script[src="${src}"]`).forEach((node) => {
      node.remove();
    });
    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    script.onload = () => resolve();
    script.onerror = () => resolve();
    document.body.appendChild(script);
  });

  window.__staticHtmlLoadedScripts[src] = loadPromise;
  return loadPromise;
}

async function loadLegacyScripts(srcs: readonly string[]): Promise<void> {
  window.__staticHtmlScriptQueue = Promise.resolve();

  for (const src of srcs) {
    window.__staticHtmlScriptQueue = window.__staticHtmlScriptQueue.then(() =>
      loadScript(src),
    );
    await window.__staticHtmlScriptQueue;
  }

  window.dispatchEvent(new CustomEvent("om-react-ready"));
  document.dispatchEvent(new CustomEvent("om-react-ready"));
  window.__omFeaturedProjectsBoot?.();
}

type FeaturedProjectsBootProps = {
  /** When set, load these legacy scripts after hydration (projects pages). */
  srcs?: readonly string[] | null;
};

/** Keeps the legacy card mount alive across React soft navigations. */
export function FeaturedProjectsBoot({ srcs }: FeaturedProjectsBootProps = {}) {
  const pathname = usePathname();

  useEffect(() => {
    let active = true;
    const scriptSrcs = normalizeSrcs(srcs);

    const section = document.querySelector<HTMLElement>(
      ".om-featured-projects",
    );

    if (!section) return;

    const ensureCards = () => {
      if (!active || gridHasCards(section)) return;
      window.__omFeaturedProjectsBoot?.();
    };

    const observer = new MutationObserver(ensureCards);
    observer.observe(section, { childList: true, subtree: true });
    document.addEventListener("om-featured-projects-ready", ensureCards);
    window.addEventListener("pageshow", ensureCards);

    const boot = async () => {
      if (scriptSrcs.length > 0) {
        await loadLegacyScripts(scriptSrcs);
      }
      if (!active) return;
      ensureCards();
      const queue = window.__staticHtmlScriptQueue;
      if (queue) void queue.then(ensureCards);
    };

    void boot();

    return () => {
      active = false;
      observer.disconnect();
      document.removeEventListener("om-featured-projects-ready", ensureCards);
      window.removeEventListener("pageshow", ensureCards);
    };
  }, [pathname, srcs]);

  return null;
}
