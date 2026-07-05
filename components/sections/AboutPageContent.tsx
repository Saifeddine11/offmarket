import Link from "next/link";
import type { LangCode } from "@/components/layout/MavericksChrome";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { AboutHomeSectionsBoot } from "@/components/sections/AboutHomeSectionsBoot";
import { AboutFinalCtaSection } from "@/components/sections/AboutFinalCtaSection";
import { AboutVerifiedActorsSection } from "@/components/sections/AboutVerifiedActorsSection";
import { AboutWhoWeAreSection } from "@/components/sections/AboutWhoWeAreSection";
import { InnerPageHero } from "@/components/sections/InnerPageHero";

const HERO_BUTTON_ICON = (
  <span className="om-button__icon" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 17 17 7M9 7h8v8"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

type LangLinks = {
  en: string;
  fr: string;
  it: string;
  nl: string;
};

type AboutPageContentProps = {
  langLinks: LangLinks;
  activeLang?: LangCode;
  aboutHref?: string;
};

export function AboutPageContent({
  aboutHref = "/about/",
}: AboutPageContentProps) {
  return (
    <>
      <a href="#main" className="sr-only sr-only--focusable">
        Aller au contenu principal
      </a>

      <main id="main">
        <InnerPageHero
          breadcrumbs={[
            { label: "Accueil", href: "/" },
            { label: "Notre Histoire", current: true },
          ]}
          title="Notre Histoire"
          subtitle="Une maison privée pour lire le marché immobilier de Marrakech avec exigence, discrétion et précision."
          imageSrc="/assets/mavericks/hero/mavericks-hero-villa.webp"
          actions={
            <>
              <Link
                href="/off-market/"
                className="mav-hero__button mav-hero__button--primary om-button om-button--primary"
              >
                {HERO_BUTTON_ICON}
                <span>Accéder au Off Market</span>
              </Link>
              <Link
                href="/sur-plan/"
                className="mav-hero__button mav-hero__button--secondary om-button om-button--secondary"
              >
                {HERO_BUTTON_ICON}
                <span>Nos projets</span>
              </Link>
            </>
          }
        />

        <AboutWhoWeAreSection />
        <AboutVerifiedActorsSection />
        <TestimonialsSection />
        <AboutFinalCtaSection />
        <AboutHomeSectionsBoot />
      </main>
    </>
  );
}
