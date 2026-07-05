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

function findFooterSegmentIndex(segments: readonly BodySegment[]): number {
  return segments.findIndex((segment) => {
    const html = segmentHtml(segment);
    return FOOTER_MARKERS.some((marker) => html.includes(marker));
  });
}

/**
 * Inserts the shared final CTA block immediately before the site footer in static
 * HTML page segments (sur-plan, blog, …).
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

  return [
    ...segments.slice(0, footerIndex),
    ctaSegment,
    ...segments.slice(footerIndex),
  ];
}
