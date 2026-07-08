"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    __staticHtmlScriptQueue?: Promise<void>;
    OM_SIMULATOR_boot?: () => void;
  }
}

function normalizePath(pathname: string) {
  return pathname.length > 1 && pathname.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname;
}

function isHomePath(pathname: string | null) {
  if (!pathname) return false;
  const normalized = normalizePath(pathname);
  return (
    normalized === "" ||
    normalized === "/" ||
    normalized === "/fr" ||
    normalized === "/en" ||
    normalized === "/it" ||
    normalized === "/nl"
  );
}

function isSimulatorPath(pathname: string | null) {
  if (!pathname) return false;
  return normalizePath(pathname) === "/simulateur";
}

/** Boots simulator roots after React hydration (om-simulator.js skips already-init roots). */
export function DeferredSimulatorBoot() {
  const pathname = usePathname();

  useEffect(() => {
    if (!isHomePath(pathname) && !isSimulatorPath(pathname)) return;

    function bootSimulator() {
      if (typeof window.OM_SIMULATOR_boot === "function") {
        window.OM_SIMULATOR_boot();
        return true;
      }
      return false;
    }

    (window.__staticHtmlScriptQueue ?? Promise.resolve()).then(() => {
      if (bootSimulator()) {
        return;
      }

      const retryId = window.setInterval(() => {
        if (bootSimulator()) {
          window.clearInterval(retryId);
        }
      }, 50);

      window.setTimeout(() => window.clearInterval(retryId), 5000);
    });
  }, [pathname]);

  return null;
}
