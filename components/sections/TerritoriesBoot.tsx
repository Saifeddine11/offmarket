"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __omTerritoriesBoot?: () => void;
  }
}

/** Ensures territories cards mount after React hydration / client navigation. */
export function TerritoriesBoot() {
  useEffect(() => {
    const run = () => {
      if (typeof window.__omTerritoriesBoot === "function") {
        window.__omTerritoriesBoot();
      }
    };

    run();
    const id = window.setTimeout(run, 120);
    return () => window.clearTimeout(id);
  }, []);

  return null;
}
