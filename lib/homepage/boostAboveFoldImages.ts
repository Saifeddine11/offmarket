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

    let html = segment.html.replace(
      /<section class="mav-hero"[\s\S]*?<\/section>/,
      (heroBlock) => boostHeroBlock(heroBlock),
    );

    html = deferCinematicVideoSources(html);

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

/**
 * Keep the cinematic poster as the initial paint; move the MP4 off the critical
 * path until om-lazy-videos attaches the real source near the viewport.
 */
function deferCinematicVideoSources(html: string): string {
  return html.replace(
    /<video(\s+[^>]*\bclass="[^"]*om-cinematic-video__media[^"]*"[^>]*)>([\s\S]*?)<\/video>/gi,
    (_match, attrs: string, children: string) => {
      let nextAttrs = attrs;
      if (/\bpreload=/i.test(nextAttrs)) {
        nextAttrs = nextAttrs.replace(/\bpreload="[^"]*"/i, 'preload="none"');
      } else {
        nextAttrs += ' preload="none"';
      }

      if (!/\bposter=/i.test(nextAttrs)) {
        nextAttrs +=
          ' poster="/assets/offmarket/hero/offmarket-hero-poster.webp"';
      } else {
        nextAttrs = nextAttrs.replace(
          /poster="\/assets\/offmarket\/hero\/offmarket-hero-poster\.jpg"/i,
          'poster="/assets/offmarket/hero/offmarket-hero-poster.webp"',
        );
      }

      const nextChildren = children.replace(
        /<source(\s+[^>]*?)\bsrc="([^"]+)"([^>]*)>/gi,
        '<source$1data-src="$2"$3>',
      );

      return `<video${nextAttrs}>${nextChildren}</video>`;
    },
  );
}
