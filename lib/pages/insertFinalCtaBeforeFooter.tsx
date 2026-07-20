import type { ReactNode } from "react";

import { PageFinalCtaMotion } from "@/components/motion/PageFinalCtaMotion";
import type { BodySegment } from "@/lib/static-html/parsePage";

const FINAL_CTA_MARKER = "om-final-cta";
const FOOTER_MARKERS = ['class="om-footer"', "class='om-footer'", 'id="contact"'];

function segmentHtml(segment: BodySegment): string {
  return segment.kind === "html" ? segment.html : "";
}

export function pageHasFinalCta(segments: readonly BodySegment[]): boolean {
  return segments.some((segment) => segmentHtml(segment).includes(FINAL_CTA_MARKER));
}

function findFooterMarkerIndex(html: string): number {
  let best = -1;
  for (const marker of FOOTER_MARKERS) {
    const index = html.indexOf(marker);
    if (index >= 0 && (best < 0 || index < best)) {
      best = index;
    }
  }
  return best;
}

/** Locates the start of the footer element that contains a known footer marker. */
function findFooterStart(html: string): number {
  const markerAt = findFooterMarkerIndex(html);
  if (markerAt < 0) {
    return -1;
  }

  const footerTagAt = html.lastIndexOf("<footer", markerAt);
  if (footerTagAt >= 0) {
    return footerTagAt;
  }

  const divTagAt = html.lastIndexOf("<div", markerAt);
  return divTagAt >= 0 ? divTagAt : markerAt;
}

function findFooterSegmentIndex(segments: readonly BodySegment[]): number {
  return segments.findIndex((segment) => findFooterMarkerIndex(segmentHtml(segment)) >= 0);
}

/**
 * Inserts the shared final CTA block immediately before the site footer in static
 * HTML page segments (sur-plan, blog, …).
 *
 * When the footer lives in the same HTML segment as page content, the segment is
 * split so the CTA is placed between content and footer — not above the page.
 */
export function insertFinalCtaBeforeFooter(
  segments: readonly BodySegment[],
  cta: ReactNode = <PageFinalCtaMotion />,
): BodySegment[] {
  if (pageHasFinalCta(segments)) {
    return [...segments];
  }

  const footerIndex = findFooterSegmentIndex(segments);
  if (footerIndex < 0) {
    return [...segments];
  }

  const ctaSegment: BodySegment = {
    kind: "react",
    key: "page-final-cta",
    element: cta,
  };

  const footerSegment = segments[footerIndex];
  const footerHtml = segmentHtml(footerSegment);
  const footerStart = findFooterStart(footerHtml);

  // Footer shares a segment with preceding page content — split around the footer.
  if (
    footerSegment.kind === "html" &&
    footerStart > 0 &&
    footerHtml.slice(0, footerStart).trim().length > 0
  ) {
    const beforeFooter: BodySegment = {
      kind: "html",
      html: footerHtml.slice(0, footerStart),
    };
    const footerOnly: BodySegment = {
      kind: "html",
      html: footerHtml.slice(footerStart),
    };

    return [
      ...segments.slice(0, footerIndex),
      beforeFooter,
      ctaSegment,
      footerOnly,
      ...segments.slice(footerIndex + 1),
    ];
  }

  return [
    ...segments.slice(0, footerIndex),
    ctaSegment,
    ...segments.slice(footerIndex),
  ];
}
