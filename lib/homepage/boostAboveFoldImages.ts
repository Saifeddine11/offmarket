import type { BodySegment } from "@/lib/static-html/parsePage";

const HERO_AVIF_SRCSET =
  "/assets/images/hero/herophoto2-640.avif 640w, /assets/images/hero/herophoto2-768.avif 768w, /assets/images/hero/herophoto2-1280.avif 1280w, /assets/images/hero/herophoto2.avif 1536w";
const HERO_WEBP_SRCSET =
  "/assets/images/hero/herophoto2-640.webp 640w, /assets/images/hero/herophoto2-768.webp 768w, /assets/images/hero/herophoto2-1280.webp 1280w, /assets/images/hero/herophoto2.webp 1536w";

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
    /(<source\s+type="image\/avif"\s+srcset=")[^"]+(")/i,
    `$1${HERO_AVIF_SRCSET}$2`,
  );
  block = block.replace(
    /(<source\s+type="image\/webp"\s+srcset=")[^"]+(")/i,
    `$1${HERO_WEBP_SRCSET}$2`,
  );

  // Prefer the mobile-sized WebP fallback for browsers without picture/srcset.
  block = block.replace(
    /(<img\b[^>]*\bclass="[^"]*mav-hero__media[^"]*"[^>]*\bsrc=")\/assets\/images\/hero\/herophoto2\.webp(")/i,
    "$1/assets/images/hero/herophoto2-768.webp$2",
  );

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
