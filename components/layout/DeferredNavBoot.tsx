"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    __staticHtmlScriptQueue?: Promise<void>;
    __omNavMenuRender?: () => void;
  }
}

function dispatchNavBoot() {
  window.dispatchEvent(new CustomEvent("om-react-ready"));
  document.dispatchEvent(new CustomEvent("om-nav-boot"));

  if (typeof window.__omNavMenuRender === "function") {
    window.__omNavMenuRender();
  }
}

/** Re-renders primary nav after React hydration / static HTML remount. */
export function DeferredNavBoot() {
  const pathname = usePathname();

  useEffect(() => {
    dispatchNavBoot();

    (window.__staticHtmlScriptQueue ?? Promise.resolve()).then(() => {
      const delays = [0, 120, 400, 1200];
      for (const delay of delays) {
        window.setTimeout(dispatchNavBoot, delay);
      }
    });
  }, []);

  useEffect(() => {
    dispatchNavBoot();
  }, [pathname]);

  return null;
}
