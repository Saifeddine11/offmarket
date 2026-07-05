import type { BodySegment } from "@/lib/static-html/parsePage";

export const HERO_POSTER_PRELOAD =
  "/assets/images/hero/mavericks-hero-poster.webp";

const HERO_SCRIPTS = [
  "mav-navbar-hero-visibility.js",
  "mav-hero-blur-text.js",
  "mav-hero-counter.js",
  "mav-lazy-videos.js",
] as const;

const EARLY_NAV_SCRIPTS = [
  "mavericks-chrome.js",
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

  // mavericks-chrome.js requires GSAP for menu animations; mount still runs without it.
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

  moveAfter("mav-hero.css", "mavericks-chrome.css");
  moveAfter("om-buttons.css", "mav-hero.css");
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
