type HeroResourceHintsProps = {
  posterHref?: string;
};

/** Preloads above-the-fold hero poster without changing layout. */
export function HeroResourceHints({
  posterHref = "/assets/images/hero/mavericks-hero-poster.webp",
}: HeroResourceHintsProps) {
  return (
    <link
      rel="preload"
      as="image"
      href={posterHref}
      fetchPriority="high"
    />
  );
}
