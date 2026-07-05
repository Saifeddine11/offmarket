"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { applyHomeDocumentState, resetHomeScrollPosition, resolveHomepagePageId } from "@/lib/homepage/homeLegacyBoot";

const LOCK_CLASSES = [
  "overflow-hidden",
  "is-locked",
  "modal-open",
  "scroll-locked",
] as const;

declare global {
  interface Window {
    omScrollGuard?: {
      run: () => void;
      clearScrollLocks: () => void;
    };
    __staticHtmlScriptQueue?: Promise<void>;
  }
}

function isHomePath(pathname: string | null) {
  return resolveHomepagePageId(pathname) !== null;
}

function isIntentionallyLocked(): boolean {
  const body = document.body;
  const html = document.documentElement;

  if (body.classList.contains("menu-open")) return true;
  if (body.classList.contains("om-modal-open") || html.classList.contains("om-modal-open")) {
    return true;
  }

  const propertyModal = document.querySelector("[data-property-modal]");
  if (propertyModal?.getAttribute("aria-hidden") === "false") return true;

  const callbackModal = document.getElementById("callback-modal");
  if (callbackModal && !callbackModal.classList.contains("is-hidden")) return true;

  return false;
}

function clearStaleScrollLocks() {
  if (isIntentionallyLocked()) return;

  const body = document.body;
  const html = document.documentElement;

  body.style.overflow = "";
  body.style.position = "";
  body.style.top = "";
  body.style.width = "";
  body.style.touchAction = "";
  html.style.overflow = "";
  html.style.position = "";
  html.style.height = "";
  html.style.top = "";

  html.classList.remove(
    "has-scroll-smooth",
    "no-scroll-smooth",
    "is-preloader-active",
    "not-ready",
  );

  for (const cls of LOCK_CLASSES) {
    body.classList.remove(cls);
    html.classList.remove(cls);
  }

  window.omScrollGuard?.run();
}

function scheduleScrollRecovery() {
  clearStaleScrollLocks();

  const afterScripts = window.__staticHtmlScriptQueue ?? Promise.resolve();
  afterScripts.then(() => {
    const delays = [0, 300, 1500, 3500];
    for (const delay of delays) {
      window.setTimeout(clearStaleScrollLocks, delay);
    }
  });
}

/** Clears orphaned scroll locks on client-side route changes. */
export function ScrollLockCleanup() {
  const pathname = usePathname();

  useEffect(() => {
    scheduleScrollRecovery();
  }, []);

  useEffect(() => {
    clearStaleScrollLocks();

    if (isHomePath(pathname)) {
      applyHomeDocumentState();
      resetHomeScrollPosition();
    }
  }, [pathname]);

  return null;
}
