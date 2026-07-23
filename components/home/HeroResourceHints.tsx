const HERO_IMAGE_HREF = "/assets/images/hero/herophoto2-1280.webp";
const HERO_IMAGE_SRCSET =
  "/assets/images/hero/herophoto2-768.webp 768w, /assets/images/hero/herophoto2-1280.webp 1280w, /assets/images/hero/herophoto2.webp 1536w";

type HeroResourceHintsProps = {
  imageHref?: string;
  imageSrcSet?: string;
  imageSizes?: string;
};

/** Preloads above-the-fold hero image without changing layout. */
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
      type="image/webp"
      fetchPriority="high"
    />
  );
}
