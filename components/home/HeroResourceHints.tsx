const HERO_IMAGE_HREF = "/assets/images/hero/herophoto2-640.avif";
const HERO_IMAGE_SRCSET =
  "/assets/images/hero/herophoto2-640.avif 640w, /assets/images/hero/herophoto2-768.avif 768w, /assets/images/hero/herophoto2-1280.avif 1280w, /assets/images/hero/herophoto2.avif 1536w";

type HeroResourceHintsProps = {
  imageHref?: string;
  imageSrcSet?: string;
  imageSizes?: string;
};

/**
 * Preloads the exact above-the-fold hero LCP image (AVIF).
 * Matches the <picture> source order so mobile does not also fetch WebP.
 * Fonts use font-display:swap and are not preloaded to avoid contending
 * with the hero image on the critical path.
 */
export function HeroResourceHints({
  imageHref = HERO_IMAGE_HREF,
  imageSrcSet = HERO_IMAGE_SRCSET,
  imageSizes = "100vw",
}: HeroResourceHintsProps) {
  return (
    <link
      rel="preload"
      as="image"
      href={imageHref}
      imageSrcSet={imageSrcSet}
      imageSizes={imageSizes}
      type="image/avif"
      fetchPriority="high"
    />
  );
}
