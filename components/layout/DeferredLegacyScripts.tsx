"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __staticHtmlScriptQueue?: Promise<void>;
    __staticHtmlLoadedScripts?: Record<string, Promise<void> | undefined>;
    __omFeaturedProjectsBoot?: () => void;
  }
}

type DeferredLegacyScriptsProps = {
  srcs?: readonly string[] | null;
};

function normalizeSrcs(srcs: DeferredLegacyScriptsProps["srcs"]): string[] {
  if (Array.isArray(srcs)) {
    return srcs.filter(
      (src): src is string => typeof src === "string" && src.length > 0,
    );
  }

  if (process.env.NODE_ENV !== "production") {
    console.warn(
      "[DeferredLegacyScripts] `srcs` was missing or invalid; defaulting to []. Check SCRIPTS registry.",
      srcs,
    );
  }

  return [];
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

function notifyLegacyDomReady() {
  window.dispatchEvent(new CustomEvent("om-react-ready"));
  document.dispatchEvent(new CustomEvent("om-react-ready"));
  window.__omFeaturedProjectsBoot?.();
}

/** Loads mutation-heavy legacy scripts only after React has hydrated the page. */
export function DeferredLegacyScripts({ srcs }: DeferredLegacyScriptsProps) {
  useEffect(() => {
    let cancelled = false;
    const scriptSrcs = normalizeSrcs(srcs);

    const run = async () => {
      window.__staticHtmlScriptQueue = Promise.resolve();

      for (const src of scriptSrcs) {
        if (cancelled) return;
        window.__staticHtmlScriptQueue = window.__staticHtmlScriptQueue.then(() =>
          loadScript(src),
        );
        await window.__staticHtmlScriptQueue;
      }

      if (!cancelled) notifyLegacyDomReady();
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [srcs]);

  return null;
}
