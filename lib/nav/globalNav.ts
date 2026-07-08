import type { BodySegment } from "@/lib/static-html/parsePage";

/** Styles loaded once from app/layout.tsx for the global navbar. */
export const GLOBAL_NAV_STYLES = [
  "/assets/stylesheets/offmarket-logo.css?v=1765317600",
  "/assets/stylesheets/mavericks-chrome.css?v=1767578200",
  "/assets/stylesheets/om-nav-menu.css?v=1767581000",
  "/assets/stylesheets/om-buttons.css?v=1765338000",
] as const;

/** Styles loaded once from app/layout.tsx for the global footer. */
export const GLOBAL_FOOTER_STYLES = [
  "/assets/stylesheets/offmarket-tokens.css?v=1765402900",
  "/assets/stylesheets/om-footer.css?v=1767562400",
] as const;

/** Scripts loaded once from app/layout.tsx — matches homepage nav boot order. */
export const GLOBAL_NAV_SCRIPTS = [
  "/assets/javascripts/om-no-preloader.js?v=1765312000",
  "/assets/javascripts/gsap.min.js?v=1765268700",
  "/assets/javascripts/om-nav-menu.js?v=1767581000",
  "/assets/javascripts/mavericks-chrome.js?v=1765406000",
  "/assets/javascripts/om-nav-scroll.js?v=1767562700",
  "/assets/javascripts/mav-navbar-hero-visibility.js?v=1765287000",
] as const;

const GLOBAL_NAV_STYLE_FILES = new Set(
  GLOBAL_NAV_STYLES.map((href) => scriptOrStyleFile(href)),
);

const GLOBAL_FOOTER_STYLE_FILES = new Set(
  GLOBAL_FOOTER_STYLES.map((href) => scriptOrStyleFile(href)),
);

const GLOBAL_NAV_SCRIPT_FILES = new Set(
  GLOBAL_NAV_SCRIPTS.map((href) => scriptOrStyleFile(href)),
);

function scriptOrStyleFile(href: string): string {
  return href.split("/").pop()?.split("?")[0] ?? "";
}

export function withoutGlobalFooterStyles<T extends readonly string[]>(
  hrefs: T,
): string[] {
  return hrefs.filter((href) => !GLOBAL_FOOTER_STYLE_FILES.has(scriptOrStyleFile(href)));
}

export function withoutGlobalNavStyles<T extends readonly string[]>(
  hrefs: T,
): string[] {
  return hrefs.filter((href) => !GLOBAL_NAV_STYLE_FILES.has(scriptOrStyleFile(href)));
}

export function withoutGlobalNavScripts<T extends readonly string[]>(
  srcs: T,
): string[] {
  return srcs.filter((href) => !GLOBAL_NAV_SCRIPT_FILES.has(scriptOrStyleFile(href)));
}

/** Removes legacy embedded #mv-chrome markup from static HTML pages. */
export function stripEmbeddedChrome(html: string): string {
  const marker = 'id="mv-chrome"';
  const markerAt = html.indexOf(marker);
  if (markerAt < 0) {
    return html;
  }

  let start = html.lastIndexOf("<div", markerAt);
  if (start < 0) {
    return html;
  }

  const commentStart = html.lastIndexOf("<!--", start);
  if (commentStart >= 0 && start - commentStart < 120) {
    start = commentStart;
  }

  let depth = 0;
  let index = start;

  while (index < html.length) {
    const nextOpen = html.indexOf("<div", index);
    const nextClose = html.indexOf("</div>", index);

    if (nextClose < 0) {
      break;
    }

    if (nextOpen >= 0 && nextOpen < nextClose) {
      depth += 1;
      index = nextOpen + 4;
      continue;
    }

    depth -= 1;
    index = nextClose + 6;

    if (depth === 0) {
      return html.slice(0, start) + html.slice(index);
    }
  }

  return html;
}

/** Removes legacy embedded site footer markup from static HTML pages. */
export function stripEmbeddedFooter(html: string): string {
  const footerMatch = html.match(/<footer[^>]*class="[^"]*om-footer[^"]*"/i);
  if (!footerMatch || footerMatch.index === undefined) {
    return html;
  }

  const start = footerMatch.index;
  const closeTag = "</footer>";
  const closeAt = html.indexOf(closeTag, start);

  if (closeAt < 0) {
    return html;
  }

  return html.slice(0, start) + html.slice(closeAt + closeTag.length);
}

export function stripEmbeddedFooterFromSegments(
  segments: BodySegment[],
): BodySegment[] {
  return segments.map((segment) => {
    if (segment.kind !== "html" || !segment.html.includes("om-footer")) {
      return segment;
    }

    return {
      ...segment,
      html: stripEmbeddedFooter(segment.html),
    };
  });
}

export function stripEmbeddedChromeFromSegments(
  segments: BodySegment[],
): BodySegment[] {
  return segments.map((segment) => {
    if (segment.kind !== "html" || !segment.html.includes('id="mv-chrome"')) {
      return segment;
    }

    return {
      ...segment,
      html: stripEmbeddedChrome(segment.html),
    };
  });
}

export function stripGlobalNavScriptsFromSegments(
  segments: BodySegment[],
): BodySegment[] {
  return segments.filter((segment) => {
    if (segment.kind !== "script" || !segment.src) {
      return true;
    }

    return withoutGlobalNavScripts([segment.src]).length > 0;
  });
}

export function prepareStaticPageSegments(segments: BodySegment[]): BodySegment[] {
  return stripGlobalNavScriptsFromSegments(
    stripEmbeddedFooterFromSegments(stripEmbeddedChromeFromSegments(segments)),
  );
}
