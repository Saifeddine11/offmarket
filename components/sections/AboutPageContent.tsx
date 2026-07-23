import Link from "next/link";
import type { LangCode } from "@/components/layout/MavericksChrome";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { AboutHomeSectionsBoot } from "@/components/sections/AboutHomeSectionsBoot";
import { AboutFinalCtaSection } from "@/components/sections/AboutFinalCtaSection";
import { AboutVerifiedActorsSection } from "@/components/sections/AboutVerifiedActorsSection";
import { AboutWhoWeAreSection } from "@/components/sections/AboutWhoWeAreSection";
import { InnerPageHero } from "@/components/sections/InnerPageHero";
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
  locale?: SiteLocale;
};

const ABOUT_COPY = {
  fr: {
    skip: "Aller au contenu principal",
    breadcrumbs: ["Accueil", "Notre Histoire"],
    title: "Notre Histoire",
    subtitle:
      "Une maison privée pour lire le marché immobilier de Marrakech avec exigence, discrétion et précision.",
    primary: "Accéder au Off Market",
    primaryHref: "/off-market/",
    secondary: "Nos projets",
    secondaryHref: "/sur-plan/",
  },
  en: {
    skip: "Skip to main content",
    breadcrumbs: ["Home", "Our Story"],
    title: "Our Story",
    subtitle:
      "A private house for reading Marrakech real estate with rigour, discretion and precision.",
    primary: "Access Off-market",
    primaryHref: "/en/off-market/",
    secondary: "Our projects",
    secondaryHref: "/en/projects/",
  },
  es: {
    skip: "Saltar al contenido principal",
    breadcrumbs: ["Inicio", "Nuestra historia"],
    title: "Nuestra historia",
    subtitle:
      "Una casa privada para leer el mercado inmobiliario de Marrakech con exigencia, discreción y precisión.",
    primary: "Acceder al Off-market",
    primaryHref: "/es/off-market/",
    secondary: "Proyectos",
    secondaryHref: "/es/proyectos/",
  },
  it: {
    skip: "Vai al contenuto principale",
    breadcrumbs: ["Home", "La nostra storia"],
    title: "La nostra storia",
    subtitle:
      "Una casa privata per leggere il mercato immobiliare di Marrakech con rigore, discrezione e precisione.",
    primary: "Accedi all'Off-market",
    primaryHref: "/it/off-market/",
    secondary: "Progetti",
    secondaryHref: "/it/progetti/",
  },
  nl: {
    skip: "Naar hoofdinhoud",
    breadcrumbs: ["Home", "Ons verhaal"],
    title: "Ons verhaal",
    subtitle:
      "Een private speler die de vastgoedmarkt van Marrakech met zorg, discretie en precisie leest.",
    primary: "Off-market openen",
    primaryHref: "/nl/off-market/",
    secondary: "Onze projecten",
    secondaryHref: "/nl/projecten/",
  },
  no: {
    skip: "Gå til hovedinnhold",
    breadcrumbs: ["Hjem", "Vår historie"],
    title: "Vår historie",
    subtitle:
      "Et privat miljø for å lese eiendomsmarkedet i Marrakech med grundighet, diskresjon og presisjon.",
    primary: "Få tilgang til Off-market",
    primaryHref: "/no/off-market/",
    secondary: "Prosjekter",
    secondaryHref: "/no/prosjekter/",
  },
} satisfies Record<SiteLocale, {
  skip: string;
  breadcrumbs: [string, string];
  title: string;
  subtitle: string;
  primary: string;
  primaryHref: string;
  secondary: string;
  secondaryHref: string;
}>;

export function AboutPageContent({
  aboutHref = "/about/",
  locale = "fr",
}: AboutPageContentProps) {
  const copy = ABOUT_COPY[locale] ?? ABOUT_COPY.fr;
  const breadcrumbAriaLabel =
    locale === "en"
      ? "Breadcrumb"
      : locale === "nl"
        ? "Broodkruimel"
        : locale === "es"
          ? "Miga de pan"
          : locale === "no"
            ? "Brødsmulesti"
        : locale === "it"
          ? "Percorso di navigazione"
          : "Fil d'Ariane";
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/assets/images/hero/notre-histoire-hero-1280.webp"
        imageSrcSet="/assets/images/hero/notre-histoire-hero-768.webp 768w, /assets/images/hero/notre-histoire-hero-1280.webp 1280w, /assets/images/hero/notre-histoire-hero.webp 1536w"
        imageSizes="100vw"
        type="image/webp"
        fetchPriority="high"
      />
      <a href="#main" className="sr-only sr-only--focusable">
        {copy.skip}
      </a>

      <main id="main">
        <InnerPageHero
          breadcrumbAriaLabel={breadcrumbAriaLabel}
          breadcrumbs={[
            { label: copy.breadcrumbs[0], href: locale === "fr" ? "/" : `/${locale}/` },
            { label: copy.breadcrumbs[1], current: true },
          ]}
          title={copy.title}
          subtitle={copy.subtitle}
          imageSrc="/assets/images/hero/notre-histoire-hero.webp"
          imageSrcSet="/assets/images/hero/notre-histoire-hero-768.webp 768w, /assets/images/hero/notre-histoire-hero-1280.webp 1280w, /assets/images/hero/notre-histoire-hero.webp 1536w"
          imageAvifSrcSet="/assets/images/hero/notre-histoire-hero-768.avif 768w, /assets/images/hero/notre-histoire-hero-1280.avif 1280w, /assets/images/hero/notre-histoire-hero.avif 1536w"
          imageSizes="100vw"
          imageWidth={1536}
          imageHeight={1024}
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
                <span>{copy.secondary}</span>
              </Link>
            </>
          }
        />

        <AboutWhoWeAreSection locale={locale} />
        <AboutVerifiedActorsSection locale={locale} />
        <TestimonialsSection locale={locale} />
        <AboutFinalCtaSection locale={locale} />
        <AboutHomeSectionsBoot />
      </main>
    </>
  );
}
