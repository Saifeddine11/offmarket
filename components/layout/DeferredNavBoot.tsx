"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
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

/**
 * Bind dropdown / expand behaviour after hydration.
 * Nav markup is SSR'd — avoid multi-timeout refill that caused flicker.
 */
export function DeferredNavBoot() {
  const pathname = usePathname();

  useEffect(() => {
    dispatchNavBoot();
  }, [pathname]);

  return null;
}
