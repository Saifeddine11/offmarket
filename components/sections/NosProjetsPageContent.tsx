import Link from "next/link";

import { AnimatedInnerPageTemplate } from "@/components/templates/AnimatedInnerPageTemplate";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { HomePrivateAccessLeadSection } from "@/components/sections/HomePrivateAccessLeadSection";
import { PageFinalCtaMotion } from "@/components/motion/PageFinalCtaMotion";
import type { SiteLocale } from "@/lib/i18n/types";

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

const PROJECTS_COPY = {
  fr: {
    breadcrumbs: ["Accueil", "Nos projets"],
    title: "Nos projets",
    subtitle:
      "Une sélection de villas, appartements, projets sur plan et opportunités confidentielles à Marrakech, étudiés avant présentation.",
    primary: "Accéder au Off Market",
    primaryHref: "/off-market/",
    secondary: "Voir les projets sur plan",
    secondaryHref: "/sur-plan/",
  },
  en: {
    breadcrumbs: ["Home", "Our Projects"],
    title: "Our projects",
    subtitle:
      "A selection of villas, apartments, off-plan projects and confidential opportunities in Marrakech, reviewed before presentation.",
    primary: "Access Off-market",
    primaryHref: "/en/off-market/",
    secondary: "View off-plan projects",
    secondaryHref: "/en/off-plan/",
  },
  it: {
    breadcrumbs: ["Home", "Progetti"],
    title: "Progetti",
    subtitle:
      "Una selezione di ville, appartamenti, progetti su piano e opportunità riservate a Marrakech, studiate prima della presentazione.",
    primary: "Accedi all'Off-market",
    primaryHref: "/it/off-market/",
    secondary: "Vedi i progetti su piano",
    secondaryHref: "/it/progetti-su-piano/",
  },
  nl: {
    breadcrumbs: ["Home", "Onze projecten"],
    title: "Onze projecten",
    subtitle:
      "Een selectie van villa's, appartementen, nieuwbouwprojecten en vertrouwelijke kansen in Marrakech, beoordeeld vóór presentatie.",
    primary: "Off-market openen",
    primaryHref: "/nl/off-market/",
    secondary: "Nieuwbouwprojecten bekijken",
    secondaryHref: "/nl/nieuwbouw/",
  },
} satisfies Record<SiteLocale, {
  breadcrumbs: [string, string];
  title: string;
  subtitle: string;
  primary: string;
  primaryHref: string;
  secondary: string;
  secondaryHref: string;
}>;

export function NosProjetsPageContent({ locale = "fr" }: { locale?: SiteLocale }) {
  const copy = PROJECTS_COPY[locale] ?? PROJECTS_COPY.fr;
  return (
    <AnimatedInnerPageTemplate
      skipLinkLabel={locale === "fr" ? "Aller au contenu principal" : locale === "nl" ? "Naar hoofdinhoud" : "Skip to main content"}
      finalCta={<PageFinalCtaMotion locale={locale} />}
      hero={{
        breadcrumbs: [
          { label: copy.breadcrumbs[0], href: locale === "fr" ? "/" : `/${locale}/` },
          { label: copy.breadcrumbs[1], current: true },
        ],
        title: copy.title,
        subtitle: copy.subtitle,
        imageSrc: "/assets/mavericks/gallery/mavericks-collection-estates.jpg",
        actions: (
          <>
            <Link
              href={copy.primaryHref}
              className="mav-hero__button mav-hero__button--primary om-button om-button--primary"
            >
              {HERO_BUTTON_ICON}
              <span>{copy.primary}</span>
            </Link>
            <Link
              href={copy.secondaryHref}
              className="mav-hero__button mav-hero__button--secondary om-button om-button--secondary"
            >
              {HERO_BUTTON_ICON}
              <span>{copy.secondary}</span>
            </Link>
          </>
        ),
      }}
    >
      <FeaturedProjectsSection locale={locale} />
      <HomePrivateAccessLeadSection
        source="nos_projets_page"
        context="nos_projets"
        intent="nos-projets"
        locale={locale}
      />
    </AnimatedInnerPageTemplate>
  );
}
