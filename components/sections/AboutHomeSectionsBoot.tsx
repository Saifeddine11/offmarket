"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { SCRIPTS } from "@/lib/assets";

const ABOUT_WHO_COPY = {
  title:
    "Une maison privée pour lire le marché immobilier de Marrakech avec exigence.",
  lead: "OFF MARKET accompagne les acheteurs, investisseurs et propriétaires avec une sélection ciblée, une analyse claire et un accès discret aux opportunités pertinentes.",
} as const;

/** Strip legacy word-reveal ghost/fill spans — they render as doubled words. */
function restoreAboutWhoPlainText() {
  const title = document.querySelector<HTMLElement>("#mav-who-title");
  const lead = document.querySelector<HTMLElement>(".about-who .about-who__lead");

  for (const [el, fallback] of [
    [title, ABOUT_WHO_COPY.title],
    [lead, ABOUT_WHO_COPY.lead],
  ] as const) {
    if (!el || !el.closest(".about-who")) continue;

    const plain =
      el.getAttribute("aria-label")?.trim() ||
      el.textContent?.replace(/\s+/g, " ").trim() ||
      fallback;

    el.textContent = plain;
    el.removeAttribute("data-word-reveal");
    el.removeAttribute("data-word-reveal-ready");
    el.removeAttribute("aria-label");
    el.classList.remove("om-word-reveal", "is-word-reveal-complete", "mav-reveal-item");
  }
}

function resetAboutSectionState() {
  restoreAboutWhoPlainText();

  document
    .querySelectorAll(
      "#about-qui-sommes-nous [data-word-reveal], #lectures-privees [data-word-reveal]",
    )
    .forEach((el) => {
      if (el.getAttribute("data-word-reveal-ready") !== "true") return;

      const label = el.getAttribute("aria-label");
      if (label) {
        el.textContent = label;
      }

      el.removeAttribute("data-word-reveal-ready");
      el.removeAttribute("aria-label");
      el.classList.remove("om-word-reveal", "is-word-reveal-complete");
    });

  document.querySelectorAll("[data-reveal-section]").forEach((section) => {
    section.removeAttribute("data-reveal-observer-bound");
    section.classList.remove("is-visible");
    section.removeAttribute("data-reveal-visible");
  });

  document.querySelectorAll("[data-testimonial-card]").forEach((card) => {
    const parent = card.parentNode;
    if (!parent) return;
    parent.replaceChild(card.cloneNode(true), card);
  });

  document
    .querySelectorAll("[data-om-mobile-reveal]")
    .forEach((node) => {
      const el = node as HTMLElement;
      el.removeAttribute("data-om-mobile-reveal");
      el.classList.remove("om-m-inview");
      el.style.removeProperty("--om-m-reveal-delay");
    });
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    document.querySelectorAll(`script[src="${src}"]`).forEach((node) => {
      node.remove();
    });

    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(script);
  });
}

async function bootAboutHomeSections() {
  resetAboutSectionState();

  for (const src of SCRIPTS.aboutHomeSections) {
    await loadScript(src);
  }

  restoreAboutWhoPlainText();

  if (typeof window !== "undefined" && "ScrollTrigger" in window) {
    (
      window as Window & { ScrollTrigger: { refresh: () => void } }
    ).ScrollTrigger.refresh();
  }
}

/**
 * Homepage section scripts must run after React hydrates HtmlChunk markup.
 * Defer-loaded legacy scripts can init too early and lose their DOM hooks.
 */
export function AboutHomeSectionsBoot() {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;

    const run = () => {
      if (cancelled) return;
      restoreAboutWhoPlainText();
      void bootAboutHomeSections()
        .then(() => {
          restoreAboutWhoPlainText();
        })
        .catch(() => {
        document.documentElement.classList.add("om-reveal-fallback");
        document
          .querySelectorAll("[data-reveal-section], [data-word-reveal]")
          .forEach((el) => {
            el.classList.add("is-visible", "is-word-reveal-complete");
          });
      });
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(run);
    });

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return null;
}
