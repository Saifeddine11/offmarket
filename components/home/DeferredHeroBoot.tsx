"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    __staticHtmlScriptQueue?: Promise<void>;
    __mavHeroBlurBoot?: () => void;
    __mavHeroCounterBoot?: () => void;
  }
}

function isHomePath(pathname: string | null) {
  if (!pathname) return false;
  const normalized =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;
  return (
    normalized === "" ||
    normalized === "/" ||
    normalized === "/fr" ||
    normalized === "/en" ||
    normalized === "/it" ||
    normalized === "/nl"
  );
}

function dispatchHeroBoot() {
  document.dispatchEvent(new CustomEvent("om-hero-boot"));

  if (typeof window.__mavHeroBlurBoot === "function") {
    window.__mavHeroBlurBoot();
  }

  if (typeof window.__mavHeroCounterBoot === "function") {
    window.__mavHeroCounterBoot();
  }
}

/** Re-boots hero animations after React hydration / DOM remount. */
export function DeferredHeroBoot() {
  const pathname = usePathname();

  useEffect(() => {
    if (!isHomePath(pathname)) return;

    dispatchHeroBoot();

    (window.__staticHtmlScriptQueue ?? Promise.resolve()).then(() => {
      const delays = [0, 120, 400, 1200, 2200];
      for (const delay of delays) {
        window.setTimeout(dispatchHeroBoot, delay);
      }
    });
  }, [pathname]);

  return null;
}
