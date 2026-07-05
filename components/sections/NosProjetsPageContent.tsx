import Link from "next/link";

import { AnimatedInnerPageTemplate } from "@/components/templates/AnimatedInnerPageTemplate";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { HomePrivateAccessLeadSection } from "@/components/sections/HomePrivateAccessLeadSection";

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

export function NosProjetsPageContent() {
  return (
    <AnimatedInnerPageTemplate
      hero={{
        breadcrumbs: [
          { label: "Accueil", href: "/" },
          { label: "Nos projets", current: true },
        ],
        title: "Nos projets",
        subtitle:
          "Une sélection de villas, appartements, projets sur plan et opportunités confidentielles à Marrakech, étudiés avant présentation.",
        imageSrc: "/assets/mavericks/gallery/mavericks-collection-estates.jpg",
        actions: (
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
              <span>Voir les projets sur plan</span>
            </Link>
          </>
        ),
      }}
    >
      <FeaturedProjectsSection />
      <HomePrivateAccessLeadSection
        source="nos_projets_page"
        context="nos_projets"
        intent="nos-projets"
      />
    </AnimatedInnerPageTemplate>
  );
}
