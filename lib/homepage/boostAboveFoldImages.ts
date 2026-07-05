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

  block = block.replace(
    /<video([^>]*)\bposter="([^"]+)"([^>]*)>/gi,
    (match, before, poster, after) => {
      if (/\bfetchpriority=/i.test(match)) {
        return match;
      }
      return `<video${before}poster="${poster}"${after} fetchpriority="high">`;
    },
  );

  block = block.replace(/<img([^>]*)>/gi, (match) => {
    if (!/\bdata-src="/i.test(match) && !/\bsrc="\/assets\//i.test(match)) {
      return match;
    }
    let tag = match;
    if (!/\bfetchpriority=/i.test(tag)) {
      tag = tag.replace("<img", '<img fetchpriority="high"');
    }
    if (!/\bloading=/i.test(tag)) {
      tag = tag.replace("<img", '<img loading="eager"');
    }
    return tag;
  });

  return block;
}
