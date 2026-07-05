import { PageEntranceMotion } from "@/components/motion/PageEntranceMotion";
import { InnerPageHeroMotion } from "@/components/motion/InnerPageHeroMotion";
import { PageFinalCtaMotion } from "@/components/motion/PageFinalCtaMotion";
import type { InnerPageHeroProps } from "@/components/sections/InnerPageHero";
import type { ReactNode } from "react";

export type AnimatedInnerPageTemplateProps = {
  /** Inner hero content — uses approved TextMaskReveal + ImageScrollReveal. */
  hero: InnerPageHeroProps;
  /** Page sections between hero and final CTA. Prefer server components where possible. */
  children: ReactNode;
  /** Override final CTA; pass `null` to omit. Defaults to approved PageFinalCtaMotion. */
  finalCta?: ReactNode | null;
  /** Client bootstraps after main — e.g. legacy JS motion for hydrated cards. */
  afterMain?: ReactNode;
  skipLinkLabel?: string;
};

/**
 * Default structure for new animated inner pages.
 *
 * Layout (navbar/footer) stays in the route `page.tsx`.
 * Wrap PageShell with `om-animated-page om-inner-page` and load STYLES.animatedInnerPage.
 *
 * @example
 * ```tsx
 * <AnimatedInnerPageTemplate hero={{ ... }}>
 *   <MySection />
 * </AnimatedInnerPageTemplate>
 * ```
 */
export function AnimatedInnerPageTemplate({
  hero,
  children,
  finalCta,
  afterMain,
  skipLinkLabel = "Aller au contenu principal",
}: AnimatedInnerPageTemplateProps) {
  return (
    <>
      <a href="#main" className="sr-only sr-only--focusable">
        {skipLinkLabel}
      </a>

      <PageEntranceMotion>
        <main id="main">
          <InnerPageHeroMotion {...hero} />
          {children}
          {finalCta !== null ? (finalCta ?? <PageFinalCtaMotion />) : null}
        </main>
      </PageEntranceMotion>

      {afterMain}
    </>
  );
}
