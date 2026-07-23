import type { BodySegment } from "@/lib/static-html/parsePage";

/**
 * Boost loading priority for above-the-fold hero media only.
 * Does not alter crops, dimensions, or below-the-fold lazy behaviour.
 */
export function boostAboveFoldImages(segments: BodySegment[]): BodySegment[] {
  return segments.map((segment) => {
    if (segment.kind !== "html") {
      return segment;
    }

    const html = segment.html.replace(
      /<section class="mav-hero"[\s\S]*?<\/section>/,
      (heroBlock) => boostHeroBlock(heroBlock),
    );

    return { ...segment, html };
  });
}

function boostHeroBlock(heroBlock: string): string {
  let block = heroBlock;

  block = block.replace(/<img([^>]*)>/gi, (match) => {
    if (
      !/\bclass="[^"]*mav-hero__media[^"]*"/i.test(match) &&
      !/\bdata-src="/i.test(match) &&
      !/\bsrc="\/assets\//i.test(match)
    ) {
      return match;
    }
    let tag = match;
    if (!/\bfetchpriority=/i.test(tag)) {
      tag = tag.replace("<img", '<img fetchpriority="high"');
    }
    if (!/\bloading=/i.test(tag)) {
      tag = tag.replace("<img", '<img loading="eager"');
    }
    if (!/\bdecoding=/i.test(tag)) {
      tag = tag.replace("<img", '<img decoding="async"');
    }
    return tag;
  });

  return block;
}
