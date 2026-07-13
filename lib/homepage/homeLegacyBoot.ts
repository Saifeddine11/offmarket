import {
  getHomeLegacyScriptUrls,
  HOMEPAGE_PAGE_ID_BY_LOCALE,
  type HomepageLocale,
  type HomepagePageId,
} from "@/lib/homepage/homeLegacyAssets";

const HOME_SECTION_SELECTORS = [
  ".mav-hero",
  ".mav-who",
  ".om-featured-projects",
  ".om-territories",
  ".om-cinematic-video",
  "#simulateur",
  ".om-testimonials",
  ".om-home-private-access",
  "[data-om-blog]",
  ".om-final-cta",
  ".om-footer",
] as const;

export function applyHomeDocumentState() {
  const html = document.documentElement;

  html.classList.add("js", "is-preloader-disabled", "js-no-reveal");
  html.classList.remove(
    "not-ready",
    "is-preloader-active",
    "has-scroll-smooth",
    "no-scroll-smooth",
  );

  const chrome = document.getElementById("mv-chrome");
  chrome?.classList.remove("is-preloader-hidden");

  document.querySelectorAll(".js-preloader, .preloader").forEach((node) => {
    const el = node as HTMLElement;
    el.style.display = "none";
    el.classList.add("is-hidden");
  });
}

export function resetHomeSectionState() {
  document.querySelectorAll("[data-reveal-section]").forEach((section) => {
    section.removeAttribute("data-reveal-observer-bound");
    section.removeAttribute("data-reveal-visible");
    section.classList.remove("is-visible");
  });

  document
    .querySelectorAll(
      [
        "[data-om-territories-init]",
        "[data-word-reveal-ready]",
        "[data-pa-reveal-bound]",
        "[data-reveal-observer-bound]",
      ].join(","),
    )
    .forEach((node) => {
      node.removeAttribute("data-om-territories-init");
      node.removeAttribute("data-word-reveal-ready");
      node.removeAttribute("data-pa-reveal-bound");
      node.removeAttribute("data-reveal-observer-bound");
    });

  document.querySelectorAll("[data-om-mobile-reveal]").forEach((node) => {
    const el = node as HTMLElement;
    el.removeAttribute("data-om-mobile-reveal");
    el.classList.remove("om-m-inview");
    el.style.removeProperty("--om-m-reveal-delay");
  });

  document.querySelectorAll(".pin-spacer").forEach((spacer) => {
    const el = spacer as HTMLElement;
    el.style.height = "0";
    el.style.minHeight = "0";
    el.style.margin = "0";
    el.style.padding = "0";
    el.style.pointerEvents = "none";
  });

  if (typeof window !== "undefined" && "ScrollTrigger" in window) {
    const scrollTrigger = (
      window as Window & {
        ScrollTrigger?: { getAll: () => { kill: () => void }[]; refresh: () => void };
      }
    ).ScrollTrigger;

    scrollTrigger?.getAll().forEach((trigger) => trigger.kill());
  }
}

export function resetHomeScrollPosition() {
  if (window.location.hash) return;

  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    document.querySelectorAll(`script[src="${src}"]`).forEach((node) => {
      node.remove();
    });

    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(script);
  });
}

export async function bootHomeLegacyScripts(pageId: HomepagePageId = "home-root") {
  window.__staticHtmlScriptQueue = Promise.resolve();

  for (const src of getHomeLegacyScriptUrls(pageId)) {
    await loadScript(src);
  }

  window.__staticHtmlScriptQueue = Promise.resolve();
}

export function resolveHomepageLocale(pathname: string | null): HomepageLocale | null {
  if (!pathname) return null;
  const normalized =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

  if (normalized === "" || normalized === "/") return "root";
  if (normalized === "/fr") return "fr";
  if (normalized === "/en") return "en";
  if (normalized === "/it") return "it";
  if (normalized === "/nl") return "nl";
  return null;
}

export function resolveHomepagePageId(pathname: string | null): HomepagePageId | null {
  const locale = resolveHomepageLocale(pathname);
  return locale ? HOMEPAGE_PAGE_ID_BY_LOCALE[locale] : null;
}

export function dispatchHomeBootEvents() {
  document.dispatchEvent(new CustomEvent("om-hero-boot"));
  document.dispatchEvent(new CustomEvent("om-nav-boot"));

  window.__mavHeroBlurBoot?.();
  window.__mavHeroCounterBoot?.();
  window.__omNavMenuRender?.();
  window.__omTerritoriesBoot?.();
  window.OM_SIMULATOR_boot?.();
  window.OM_BLOG_boot?.();
  window.omScrollGuard?.run();

  if (typeof window !== "undefined" && "ScrollTrigger" in window) {
    (
      window as Window & { ScrollTrigger?: { refresh: () => void } }
    ).ScrollTrigger?.refresh();
  }
}

export function forceHomeRevealFallback() {
  document.documentElement.classList.add("om-home-reveal-fallback");

  document
    .querySelectorAll(
      "[data-reveal], [data-reveal-section], [data-om-mobile-reveal], [data-word-reveal]",
    )
    .forEach((node) => {
      node.classList.add("is-visible", "is-word-reveal-complete", "om-m-inview");
    });
}

export function homeSectionsDiagnostic() {
  return HOME_SECTION_SELECTORS.map((selector) => {
    const el = document.querySelector(selector);
    if (!el) {
      return { selector, present: false, visible: false, height: 0 };
    }

    const rect = el.getBoundingClientRect();
    const styles = getComputedStyle(el);

    return {
      selector,
      present: true,
      visible:
        styles.visibility !== "hidden" &&
        styles.display !== "none" &&
        Number(styles.opacity) > 0.05,
      height: Math.round(rect.height),
    };
  });
}

export function homeSectionsHealthy() {
  const report = homeSectionsDiagnostic();
  const required = report.filter(
    (entry) =>
      entry.selector !== ".om-cinematic-video" && entry.selector !== "[data-om-blog]",
  );

  return required.every((entry) => entry.present && entry.visible && entry.height > 0);
}

declare global {
  interface Window {
    __staticHtmlScriptQueue?: Promise<void>;
    __mavHeroBlurBoot?: () => void;
    __mavHeroCounterBoot?: () => void;
    __omNavMenuRender?: () => void;
    __omTerritoriesBoot?: () => void;
    OM_SIMULATOR_boot?: () => void;
    OM_BLOG_boot?: () => void;
    omScrollGuard?: { run: () => void; clearScrollLocks: () => void };
  }
}
