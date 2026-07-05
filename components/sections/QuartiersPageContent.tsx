import Link from "next/link";

import { DeferredQuartiersLegacyBoot } from "@/components/layout/DeferredQuartiersLegacyBoot";
import { QuartiersDynamicMotion } from "@/components/motion/QuartiersDynamicMotion";
import { QuartiersPageMotion } from "@/components/motion/QuartiersPageMotion";
import { BlogPreviewSection } from "@/components/sections/BlogPreviewSection";
import { HomeSimulatorSection } from "@/components/sections/HomeSimulatorSection";
import { InnerPageHero } from "@/components/sections/InnerPageHero";
import { PageFinalCtaMotion } from "@/components/sections/PageFinalCtaMotion";
import { QuartierDetailSection } from "@/components/sections/QuartierDetailSection";
import { TerritoriesSection } from "@/components/sections/TerritoriesSection";

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

export function QuartiersPageContent() {
  return (
    <>
      <a href="#main" className="sr-only sr-only--focusable">
        Aller au contenu principal
      </a>

      <QuartiersPageMotion>
        <main id="main">
          <InnerPageHero
            breadcrumbs={[
              { label: "Accueil", href: "/" },
              { label: "Quartiers", current: true },
            ]}
            title="Où investir à Marrakech"
            subtitle="Chaque quartier a sa logique : centralité, standing, rareté ou potentiel locatif."
            secondary="Guéliz, Hivernage, Triangle d’Or et Médina se comparent selon votre budget, votre usage et votre horizon."
            imageSrc="/assets/mavericks/gallery/mavericks-the-passage.webp"
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

          <TerritoriesSection
            motion
            variant="quartiers"
            id="quartiers-territories"
            title="Top 3 des quartiers où investir à Marrakech"
            subtitle="Une lecture claire des secteurs les plus recherchés pour acheter, investir ou comparer un projet immobilier à Marrakech."
          />

          <QuartierDetailSection motion />

          <HomeSimulatorSection
            motion
            id="quartiers-simulateur"
            titleId="om-quartiers-simulator-title"
            title="Simuler un projet selon votre quartier cible"
            text="Comparez votre budget, votre objectif et votre stratégie avant d’étudier une opportunité à Marrakech."
            primaryCtaHref="/contact/"
            secondaryCtaHref="/sur-plan/"
          />

          <BlogPreviewSection id="quartiers-blog" mode="quartiers" motion />

          <PageFinalCtaMotion />
        </main>
      </QuartiersPageMotion>

      <QuartiersDynamicMotion />
      <DeferredQuartiersLegacyBoot />
    </>
  );
}
