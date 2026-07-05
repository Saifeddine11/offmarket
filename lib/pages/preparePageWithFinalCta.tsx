import type { PageContent } from "@/lib/content/types";
import { FINAL_CTA_STYLES } from "@/lib/assets";
import type { BodySegment } from "@/lib/static-html/parsePage";

import {
  insertFinalCtaBeforeFooter,
  pageHasFinalCta,
} from "@/lib/pages/insertFinalCtaBeforeFooter";

function mergeStylesheets(stylesheets: readonly string[]): string[] {
  const merged = [...stylesheets];
  for (const href of FINAL_CTA_STYLES) {
    if (!merged.some((entry) => entry.split("?")[0] === href.split("?")[0])) {
      merged.push(href);
    }
  }
  return merged;
}

function mergeBodyClass(bodyClass: string | null | undefined): string {
  const classes = new Set((bodyClass ?? "").split(/\s+/).filter(Boolean));
  classes.add("om-inner-page");
  return [...classes].join(" ");
}

export type PreparedPageWithFinalCta = {
  content: PageContent;
  bodySegments: BodySegment[];
  injected: boolean;
};

/** Ensures static routes get the shared final CTA block + styles before the site footer. */
export function preparePageWithFinalCta(content: PageContent): PreparedPageWithFinalCta {
  if (pageHasFinalCta(content.bodySegments)) {
    return { content, bodySegments: content.bodySegments, injected: false };
  }

  const bodySegments = insertFinalCtaBeforeFooter(content.bodySegments);
  if (bodySegments.length === content.bodySegments.length) {
    return { content, bodySegments: content.bodySegments, injected: false };
  }

  return {
    content: {
      ...content,
      stylesheets: mergeStylesheets(content.stylesheets),
      bodyClass: mergeBodyClass(content.bodyClass),
    },
    bodySegments,
    injected: true,
  };
}
