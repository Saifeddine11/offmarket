import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import type { FeaturedProjectsSectionProps } from "@/components/sections/FeaturedProjectsSection";
import type { BodySegment } from "@/lib/static-html/parsePage";

function findFeaturedSectionEnd(html: string, startIndex: number): number {
  const tagRe = /<\/?section\b[^>]*>/gi;
  tagRe.lastIndex = startIndex;
  let depth = 0;
  let match: RegExpExecArray | null;

  while ((match = tagRe.exec(html)) !== null) {
    if (match[0].startsWith("</")) {
      depth--;
      if (depth === 0) {
        return match.index + match[0].length;
      }
    } else {
      depth++;
    }
  }

  return -1;
}

function extractText(html: string, className: string): string | undefined {
  const re = new RegExp(
    `class="om-featured-projects__${className}"[^>]*>([\\s\\S]*?)<\\/(?:p|h2)>`,
    "i",
  );
  const match = html.match(re);
  if (!match) return undefined;
  return match[1].replace(/<[^>]+>/g, "").trim();
}

function parseFeaturedProjectsProps(
  sectionHtml: string,
): FeaturedProjectsSectionProps {
  const ctaLabelMatch = sectionHtml.match(
    /om-featured-projects__intro-action[\s\S]*?<span>([^<]+)<\/span>\s*<\/a>/i,
  );
  const ctaHrefMatch = sectionHtml.match(
    /om-featured-projects__intro-action[\s\S]*?<a[^>]+href="([^"]+)"/i,
  );

  const props: FeaturedProjectsSectionProps = {
    eyebrow: extractText(sectionHtml, "eyebrow"),
    title: extractText(sectionHtml, "title"),
    lead: extractText(sectionHtml, "lead"),
    note: extractText(sectionHtml, "note"),
    ctaLabel: ctaLabelMatch?.[1]?.trim(),
    ctaHref: ctaHrefMatch?.[1],
    ctaProof: extractText(sectionHtml, "cta-proof"),
  };

  return Object.fromEntries(
    Object.entries(props).filter(([, value]) => value !== undefined),
  ) as FeaturedProjectsSectionProps;
}

/**
 * Swap legacy inline featured-projects markup for the shared React section.
 * Preserves locale copy by parsing intro text from the static HTML chunk.
 */
export function replaceFeaturedProjectsSection(
  segments: BodySegment[],
): BodySegment[] {
  const result: BodySegment[] = [];

  for (const segment of segments) {
    if (
      segment.kind !== "html" ||
      !segment.html.includes('id="featured-projects"')
    ) {
      result.push(segment);
      continue;
    }

    const start = segment.html.search(/<section[^>]*id="featured-projects"/i);
    if (start < 0) {
      result.push(segment);
      continue;
    }

    const end = findFeaturedSectionEnd(segment.html, start);
    if (end < 0) {
      result.push(segment);
      continue;
    }

    const sectionHtml = segment.html.slice(start, end);
    const props = parseFeaturedProjectsProps(sectionHtml);
    const before = segment.html.slice(0, start);
    const after = segment.html.slice(end);

    if (before) {
      result.push({ kind: "html", html: before });
    }

    result.push({
      kind: "react",
      key: "featured-projects",
      element: <FeaturedProjectsSection {...props} />,
    });

    if (after) {
      result.push({ kind: "html", html: after });
    }
  }

  return result;
}
