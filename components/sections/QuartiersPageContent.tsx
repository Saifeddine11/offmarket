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

const QUARTIERS_COPY = {
  fr: {
    skip: "Aller au contenu principal",
    breadcrumbs: ["Accueil", "Quartiers"],
    title: "Où investir à Marrakech",
    subtitle:
      "Chaque quartier a sa logique : centralité, standing, rareté ou potentiel locatif.",
    secondary:
      "Guéliz, Hivernage, Triangle d'Or et Médina se comparent selon votre budget, votre usage et votre horizon.",
    primary: "Accéder au Off Market",
    primaryHref: "/off-market/",
    secondaryCta: "Nos projets",
    secondaryHref: "/sur-plan/",
    territoriesTitle: "Top 3 des quartiers où investir à Marrakech",
    territoriesEyebrow: "QUARTIERS",
    territoriesAria: "Territoires d'investissement à Marrakech",
    territoriesSubtitle:
      "Une lecture claire des secteurs les plus recherchés pour acheter, investir ou comparer un projet immobilier à Marrakech.",
    simulatorTitle: "Simuler un projet selon votre quartier cible",
    simulatorText:
      "Comparez votre budget, votre objectif et votre stratégie avant d'étudier une opportunité à Marrakech.",
    simulatorPrimary: "/contact/",
    simulatorSecondary: "/sur-plan/",
  },
  en: {
    skip: "Skip to main content",
    breadcrumbs: ["Home", "Neighbourhoods"],
    title: "Where to invest in Marrakech",
    subtitle:
      "Each neighbourhood has its own logic: centrality, standing, rarity or rental potential.",
    secondary:
      "Guéliz, Hivernage, Triangle d'Or and the Medina can be compared according to your budget, use and horizon.",
    primary: "Access Off-market",
    primaryHref: "/en/off-market/",
    secondaryCta: "Our projects",
    secondaryHref: "/en/projects/",
    territoriesTitle: "Top 3 neighbourhoods for investing in Marrakech",
    territoriesEyebrow: "NEIGHBOURHOODS",
    territoriesAria: "Investment neighbourhoods in Marrakech",
    territoriesSubtitle:
      "A clear reading of the most sought-after areas for buying, investing or comparing a real estate project in Marrakech.",
    simulatorTitle: "Simulate a project based on your target neighbourhood",
    simulatorText:
      "Compare your budget, objective and strategy before studying an opportunity in Marrakech.",
    simulatorPrimary: "/en/contact/",
    simulatorSecondary: "/en/off-plan/",
  },
  it: {
    skip: "Vai al contenuto principale",
    breadcrumbs: ["Home", "Quartieri"],
    title: "Dove investire a Marrakech",
    subtitle:
      "Ogni quartiere ha una logica: centralità, standing, rarità o potenziale locativo.",
    secondary:
      "Guéliz, Hivernage, Triangle d'Or e Medina si confrontano secondo budget, uso e orizzonte.",
    primary: "Accedi all'Off-market",
    primaryHref: "/it/off-market/",
    secondaryCta: "Progetti",
    secondaryHref: "/it/progetti-su-piano/",
    territoriesTitle: "Top 3 quartieri in cui investire a Marrakech",
    territoriesEyebrow: "QUARTIERI",
    territoriesAria: "Zone di investimento a Marrakech",
    territoriesSubtitle:
      "Una lettura chiara delle zone più ricercate per acquistare, investire o confrontare un progetto immobiliare a Marrakech.",
    simulatorTitle: "Simulare un progetto secondo il quartiere target",
    simulatorText:
      "Confronta budget, obiettivo e strategia prima di studiare un'opportunità a Marrakech.",
    simulatorPrimary: "/it/contatto/",
    simulatorSecondary: "/it/progetti-su-piano/",
  },
  nl: {
    skip: "Naar hoofdinhoud",
    breadcrumbs: ["Home", "Wijken"],
    title: "Waar investeren in Marrakech",
    subtitle:
      "Elke wijk heeft haar eigen logica: centraliteit, standing, schaarste of huurpotentieel.",
    secondary:
      "Guéliz, Hivernage, Triangle d'Or en de Medina worden vergeleken volgens uw budget, gebruik en horizon.",
    primary: "Off-market openen",
    primaryHref: "/nl/off-market/",
    secondaryCta: "Onze projecten",
    secondaryHref: "/nl/projecten/",
    territoriesTitle: "Top 3 wijken om in Marrakech te investeren",
    territoriesEyebrow: "WIJKEN",
    territoriesAria: "Investeringswijken in Marrakech",
    territoriesSubtitle:
      "Een heldere lezing van de meest gezochte zones om in Marrakech te kopen, te investeren of een vastgoedproject te vergelijken.",
    simulatorTitle: "Simuleer een project volgens uw doelwijk",
    simulatorText:
      "Vergelijk uw budget, doel en strategie voordat u een kans in Marrakech bestudeert.",
    simulatorPrimary: "/nl/contact/",
    simulatorSecondary: "/nl/nieuwbouw/",
  },
} satisfies Record<SiteLocale, {
  skip: string;
  breadcrumbs: [string, string];
  title: string;
  subtitle: string;
  secondary: string;
  primary: string;
  primaryHref: string;
  secondaryCta: string;
  secondaryHref: string;
  territoriesTitle: string;
  territoriesEyebrow: string;
  territoriesAria: string;
  territoriesSubtitle: string;
  simulatorTitle: string;
  simulatorText: string;
  simulatorPrimary: string;
  simulatorSecondary: string;
}>;

export function QuartiersPageContent({ locale = "fr" }: { locale?: SiteLocale }) {
  const copy = QUARTIERS_COPY[locale] ?? QUARTIERS_COPY.fr;
  return (
    <>
      <a href="#main" className="sr-only sr-only--focusable">
        {copy.skip}
      </a>

      <QuartiersPageMotion>
        <main id="main">
          <InnerPageHero
            breadcrumbs={[
              { label: copy.breadcrumbs[0], href: locale === "fr" ? "/" : `/${locale}/` },
              { label: copy.breadcrumbs[1], current: true },
            ]}
            title={copy.title}
            subtitle={copy.subtitle}
            secondary={copy.secondary}
            imageSrc="/assets/mavericks/gallery/mavericks-the-passage.webp"
            actions={
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
                  <span>{copy.secondaryCta}</span>
                </Link>
              </>
            }
          />

          <TerritoriesSection
            motion
            variant="quartiers"
            id="quartiers-territories"
            eyebrow={copy.territoriesEyebrow}
            ariaLabel={copy.territoriesAria}
            title={copy.territoriesTitle}
            subtitle={copy.territoriesSubtitle}
          />

          <QuartierDetailSection motion locale={locale} />

          <HomeSimulatorSection
            motion
            id="quartiers-simulateur"
            titleId="om-quartiers-simulator-title"
            title={copy.simulatorTitle}
            text={copy.simulatorText}
            primaryCtaHref={copy.simulatorPrimary}
            secondaryCtaHref={copy.simulatorSecondary}
            locale={locale}
          />

          <BlogPreviewSection id="quartiers-blog" mode="quartiers" motion />

          <PageFinalCtaMotion locale={locale} />
        </main>
      </QuartiersPageMotion>

      <QuartiersDynamicMotion />
      <DeferredQuartiersLegacyBoot />
    </>
  );
}
