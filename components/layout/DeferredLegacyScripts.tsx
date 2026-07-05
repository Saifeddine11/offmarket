"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __staticHtmlScriptQueue?: Promise<void>;
  }
}

type DeferredLegacyScriptsProps = {
  srcs: readonly string[];
};

function loadScript(src: string): Promise<void> {
  return new Promise((resolve) => {
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
}

/** Loads mutation-heavy legacy scripts only after React has hydrated the page. */
export function DeferredLegacyScripts({ srcs }: DeferredLegacyScriptsProps) {
  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      window.__staticHtmlScriptQueue = Promise.resolve();

      for (const src of srcs) {
        if (cancelled) return;
        window.__staticHtmlScriptQueue = window.__staticHtmlScriptQueue.then(() =>
          loadScript(src),
        );
        await window.__staticHtmlScriptQueue;
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [srcs]);

  return null;
}
