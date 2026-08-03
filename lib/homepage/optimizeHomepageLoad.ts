import type { BodySegment } from "@/lib/static-html/parsePage";

export const HERO_POSTER_PRELOAD =
  "/assets/images/hero/herophoto2-640.avif";

/** Styles required for first paint: tokens/chrome/hero/type. */
const HOMEPAGE_CRITICAL_STYLES = [
  "global.css",
  "offmarket-tokens.css",
  "offmarket-overrides.css",
  "offmarket-logo.css",
  "offmarket-chrome.css",
  "om-nav-menu.css",
  "om-buttons.css",
  "om-hero.css",
  "om-typography.css",
  "om-scroll-layout.css",
  "om-cinematic-video.css",
] as const;

function styleFile(href: string): string {
  return href.split("/").pop()?.split("?")[0] ?? "";
}

/** Splits homepage CSS into render-critical vs deferred below-the-fold. */
export function partitionHomepageStylesheets(stylesheets: readonly string[]): {
  critical: string[];
  deferred: string[];
} {
  const criticalSet = new Set<string>(HOMEPAGE_CRITICAL_STYLES);
  const critical: string[] = [];
  const deferred: string[] = [];

  for (const href of stylesheets) {
    if (criticalSet.has(styleFile(href))) {
      critical.push(href);
    } else {
      deferred.push(href);
    }
  }

  return { critical, deferred };
}

const HERO_SCRIPTS = [
  "om-navbar-hero-visibility.js",
  "om-hero-blur-text.js",
  "om-lazy-videos.js",
] as const;

const EARLY_NAV_SCRIPTS = [
  "offmarket-chrome.js",
  "om-nav-menu.js",
  "om-nav-scroll.js",
] as const;

type ScriptSegment = Extract<BodySegment, { kind: "script" }>;

function scriptFile(src?: string): string {
  if (!src) {
    return "";
  }
  return src.split("/").pop()?.split("?")[0] ?? "";
}

function matchesFile(src: string | undefined, filename: string): boolean {
  return scriptFile(src) === filename;
}

/**
 * Reorders external homepage scripts so hero + nav boot before legacy bundles.
 * Preserves inline script positions and HTML segment order.
 */
export function reorderHomepageScripts(segments: BodySegment[]): BodySegment[] {
  const scriptIndices: number[] = [];
  const externalScripts: ScriptSegment[] = [];

  for (const [index, segment] of segments.entries()) {
    if (segment.kind === "script" && segment.src) {
      scriptIndices.push(index);
      externalScripts.push(segment);
    }
  }

  if (externalScripts.length === 0) {
    return segments;
  }

  const picked = new Set<ScriptSegment>();
  const ordered: ScriptSegment[] = [];

  function take(match: (script: ScriptSegment) => boolean) {
    for (const script of externalScripts) {
      if (picked.has(script) || !match(script)) {
        continue;
      }
      ordered.push(script);
      picked.add(script);
    }
  }

  take((script) => scriptFile(script.src).includes("browser-message"));
  take((script) => matchesFile(script.src, "om-no-preloader.js"));

  for (const filename of HERO_SCRIPTS) {
    take((script) => matchesFile(script.src, filename));
  }

  // offmarket-chrome.js requires GSAP for menu animations; mount still runs without it.
  take((script) => matchesFile(script.src, "gsap.min.js"));

  for (const filename of EARLY_NAV_SCRIPTS) {
    take((script) => matchesFile(script.src, filename));
  }

  for (const script of externalScripts) {
    if (picked.has(script) || scriptFile(script.src).includes("landing.js")) {
      continue;
    }
    ordered.push(script);
    picked.add(script);
  }

  take((script) => scriptFile(script.src).includes("landing.js"));

  const result = [...segments];
  scriptIndices.forEach((index, position) => {
    result[index] = ordered[position];
  });

  return result;
}

/** Lowers network priority for heavy legacy bundles on first paint. */
export function deprioritizeLegacyBundles(
  segments: BodySegment[],
): BodySegment[] {
  return segments.map((segment) => {
    if (segment.kind !== "script" || !segment.src) {
      return segment;
    }

    const file = scriptFile(segment.src);
    if (file === "shared.js" || file.includes("landing.js")) {
      return { ...segment, fetchpriority: "low" };
    }

    return segment;
  });
}

/** Loads hero + button CSS earlier without changing the stylesheet set. */
export function prioritizeHomepageStylesheets(
  stylesheets: readonly string[],
): string[] {
  const list = [...stylesheets];

  function moveAfter(filename: string, afterFilename: string) {
    const from = list.findIndex((href) => href.includes(filename));
    const after = list.findIndex((href) => href.includes(afterFilename));
    if (from < 0 || after < 0 || from <= after) {
      return;
    }
    const [item] = list.splice(from, 1);
    list.splice(after + 1, 0, item);
  }

  moveAfter("om-hero.css", "offmarket-chrome.css");
  moveAfter("om-buttons.css", "om-hero.css");
  moveAfter("om-contact-page.css", "om-contact.css");

  return list;
}

/**
 * Drops duplicate head init already applied in app/layout.tsx blocking script.
 */
export function stripDuplicateHeadInit<T extends { headInitScript: string | null }>(
  content: T,
): T {
  if (!content.headInitScript) {
    return content;
  }

  return {
    ...content,
    headInitScript: null,
  };
}
