/** Stylesheet bundles per page — preserve exact ?v= cache-busters from static HTML. */

import {
  withoutGlobalFooterStyles,
  withoutGlobalNavScripts,
  withoutGlobalNavStyles,
} from "@/lib/nav/globalNav";

/** Shared inner editorial pages — hero, CTA (navbar/footer styles are global). */
const INNER_EDITORIAL_STYLES = withoutGlobalFooterStyles(
  withoutGlobalNavStyles([
    "/assets/stylesheets/offmarket-tokens.css?v=1765402900",
    "/assets/stylesheets/offmarket-overrides.css?v=1765338000",
    "/assets/stylesheets/om-typography.css?v=1765311000",
    "/assets/stylesheets/om-final-cta.css?v=1765404300",
    "/assets/stylesheets/om-inner-hero.css?v=1765441000",
  ]),
);

export const STYLES = {
  offMarket: [
    "/assets/stylesheets/offmarket-tokens.css?v=1765402900",
    "/assets/stylesheets/om-typography.css?v=1765311000",
    "/assets/stylesheets/om-contact.css?v=1765356000",
  ],
  about: [
    ...INNER_EDITORIAL_STYLES,
    "/assets/stylesheets/mav-who.css?v=1765338000",
    "/assets/stylesheets/om-testimonials.css?v=1765342000",
    "/assets/stylesheets/om-text-reveal.css?v=1765317800",
    "/assets/stylesheets/about-who.css?v=1767533000",
    "/assets/stylesheets/about-verified.css?v=1767534200",
    "/assets/stylesheets/about-timeline.css?v=1765446000",
  ],
  /** New inner pages using the approved Framer Motion system (see docs/motion-system.md). */
  animatedInnerPage: [
    ...INNER_EDITORIAL_STYLES,
    "/assets/stylesheets/om-page-motion.css?v=1765422400",
  ],
  quartiers: [
    ...INNER_EDITORIAL_STYLES,
    "/assets/stylesheets/om-territories.css?v=1765417000",
    "/assets/stylesheets/om-quartier-details.css?v=1765422700",
    "/assets/stylesheets/om-quartiers-motion.css?v=1765440000",
    "/assets/stylesheets/om-simulator.css?v=1768513200",
    "/assets/stylesheets/om-simulator-home.css?v=1768513800",
    "/assets/stylesheets/om-blog.css?v=1765405400",
  ],
  /** /nos-projets/ — inner hero + reused homepage featured-projects section. */
  nosProjets: [
    ...INNER_EDITORIAL_STYLES,
    "/assets/stylesheets/om-page-motion.css?v=1765422400",
    "/assets/stylesheets/om-featured-projects.css?v=1767546000",
    "/assets/stylesheets/om-private-access-popup.css?v=1765340000",
    "/assets/stylesheets/om-property-modal.css?v=1768512600",
    "/assets/stylesheets/om-contact.css?v=1765356300",
    "/assets/stylesheets/om-contact-page.css?v=1767579000",
    "/assets/stylesheets/om-nos-projets.css?v=1767547000",
  ],
  /** /sur-plan/villa-jaz/ — modal slides as vertical project detail sections. */
  villaJazDetail: [
    ...INNER_EDITORIAL_STYLES,
    "/assets/stylesheets/om-page-motion.css?v=1765422400",
    "/assets/stylesheets/om-property-modal.css?v=1768512600",
    "/assets/stylesheets/om-property-detail-page.css?v=1767564100",
  ],
  privacyPolicy: withoutGlobalFooterStyles(
    withoutGlobalNavStyles([
      "/assets/stylesheets/global.css?v=1765297300",
      "/assets/stylesheets/offmarket-tokens.css?v=1765402900",
      "/assets/stylesheets/offmarket-overrides.css?v=1765311000",
      "/assets/stylesheets/om-typography.css?v=1765311000",
      "/assets/stylesheets/om-legal.css?v=1765311000",
      "/assets/stylesheets/om-final-cta.css?v=1765404300",
      "/assets/stylesheets/om-page-motion.css?v=1765422400",
    ]),
  ),
  contact: withoutGlobalFooterStyles(
    withoutGlobalNavStyles([
      "/assets/stylesheets/offmarket-tokens.css?v=1765402900",
      "/assets/stylesheets/offmarket-overrides.css?v=1765338000",
      "/assets/stylesheets/om-typography.css?v=1765311000",
      "/assets/stylesheets/om-final-cta.css?v=1765404300",
      "/assets/stylesheets/om-page-motion.css?v=1765422400",
      "/assets/stylesheets/om-contact.css?v=1765356300",
      "/assets/stylesheets/om-contact-page.css?v=1767579000",
    ]),
  ),
  simulateur: withoutGlobalFooterStyles(
    withoutGlobalNavStyles([
      "/assets/stylesheets/global.css?v=1765268659",
      "/assets/stylesheets/offmarket-tokens.css?v=1765402900",
      "/assets/stylesheets/offmarket-overrides.css?v=1765338000",
      "/assets/stylesheets/om-typography.css?v=1765311000",
      "/assets/stylesheets/om-final-cta.css?v=1765404300",
      "/assets/stylesheets/om-page-motion.css?v=1765422400",
      "/assets/stylesheets/om-simulator.css?v=1768513200",
      "/assets/stylesheets/om-simulator-home.css?v=1768513800",
    ]),
  ),
} as const;

/** Styles required when injecting PageFinalCtaMotion on static HTML routes. */
export const FINAL_CTA_STYLES = [
  "/assets/stylesheets/om-final-cta.css?v=1765404300",
  "/assets/stylesheets/om-page-motion.css?v=1765422400",
] as const;

export const SCRIPTS = {
  offMarket: ["/assets/javascripts/om-private-access-form.js?v=1765352200"],
  /** Inner editorial pages — page-specific boot (navbar scripts are global). */
  innerEditorial: withoutGlobalNavScripts([
    "/assets/javascripts/gsap.min.js?v=1765268700",
    "/assets/javascripts/om-language-switcher.js?v=1765350200",
    "/assets/javascripts/om-inner-hero.js?v=1765357000",
  ]),
  quartiers: withoutGlobalNavScripts([
    "/assets/javascripts/gsap.min.js?v=1765268700",
    "/assets/javascripts/om-language-switcher.js?v=1765350200",
    "/assets/javascripts/om-inner-hero.js?v=1765357000",
    "/assets/javascripts/om-territories.js?v=1765421000",
    "/assets/javascripts/om-simulator.js?v=1765405800",
    "/assets/javascripts/om-blog-data.js?v=1765405600",
    "/assets/javascripts/om-blog.js?v=1765405600",
  ]),
  about: withoutGlobalNavScripts([
    "/assets/javascripts/gsap.min.js?v=1765268700",
    "/assets/javascripts/om-language-switcher.js?v=1765350200",
    "/assets/javascripts/om-inner-hero.js?v=1765357000",
  ]),
  nosProjets: withoutGlobalNavScripts([
    "/assets/javascripts/gsap.min.js?v=1765268700",
    "/assets/javascripts/om-language-switcher.js?v=1765350200",
    "/assets/javascripts/om-inner-hero.js?v=1765357000",
    "/assets/javascripts/om-featured-projects.js?v=1765404001",
    "/assets/javascripts/om-property-modal.js?v=1767563620",
    "/assets/javascripts/om-private-access-popup.js?v=1765340000",
    "/assets/javascripts/om-private-access-form.js?v=1765352200",
  ]),
  villaJazDetail: withoutGlobalNavScripts([
    "/assets/javascripts/gsap.min.js?v=1765268700",
    "/assets/javascripts/om-language-switcher.js?v=1765350200",
    "/assets/javascripts/om-property-modal.js?v=1767563620",
  ]),
  /** Loaded post-hydration on About — Qui sommes-nous + testimonials animations. */
  aboutHomeSections: [
    "/assets/javascripts/scrolltrigger.min.js?v=1765268700",
    "/assets/javascripts/mav-who-reveal.js?v=1765404900",
    "/assets/javascripts/om-testimonials.js?v=1765295700",
    "/assets/javascripts/om-mobile-reveal.js?v=1765307200",
  ],
  privacyPolicy: withoutGlobalNavScripts([
    "/assets/javascripts/om-language-switcher.js?v=1765350200",
  ]),
  contact: withoutGlobalNavScripts([
    "/assets/javascripts/om-language-switcher.js?v=1765350200",
    "/assets/javascripts/om-private-access-form.js?v=1765352200",
  ]),
  simulateur: withoutGlobalNavScripts([
    "/assets/javascripts/om-simulator.js?v=1765405800",
    "/assets/javascripts/om-language-switcher.js?v=1765350200",
  ]),
  chromePageLight: withoutGlobalNavScripts([
    "/assets/javascripts/om-language-switcher.js?v=1765350200",
  ]),
} as const;
