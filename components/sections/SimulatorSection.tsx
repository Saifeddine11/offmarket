import type { ReactNode } from "react";

import { PageFinalCtaSection } from "@/components/sections/PageFinalCtaSection";
import { HomeSimulatorSection } from "@/components/sections/HomeSimulatorSection";
import type { SiteLocale } from "@/lib/i18n/types";

const SIMULATOR_PAGE_COPY = {
  fr: {
    eyebrow: "SIMULATEUR PRIVÉ",
    title: "Simuler avant d'investir",
    text: (
      <>
        Estimez le potentiel d&apos;un bien à Marrakech selon son usage, son adresse et votre
        stratégie.{" "}
        <span className="om-brand-inline">OFF MARKET</span> affine ensuite les chiffres avec des
        comparables réels et des opportunités sélectionnées.
      </>
    ),
    primaryHref: "/contact/",
    secondaryHref: "/nos-projets/",
  },
  en: {
    eyebrow: "PRIVATE SIMULATOR",
    title: "Simulate before investing",
    text: (
      <>
        Estimate the potential of a property in Marrakech according to its use, address and your
        strategy.{" "}
        <span className="om-brand-inline">OFF MARKET</span> then refines the figures with real
        comparables and selected opportunities.
      </>
    ),
    primaryHref: "/en/contact/",
    secondaryHref: "/en/projects/",
  },
  es: {
    eyebrow: "SIMULADOR PRIVADO",
    title: "Simular antes de invertir",
    text: (
      <>
        Estime el potencial de una propiedad en Marrakech según su uso, su dirección y su
        estrategia.{" "}
        <span className="om-brand-inline">OFF MARKET</span> afina después las cifras con
        comparables reales y oportunidades seleccionadas.
      </>
    ),
    primaryHref: "/es/contacto/",
    secondaryHref: "/es/proyectos/",
  },
  it: {
    eyebrow: "SIMULATORE PRIVATO",
    title: "Simulare prima di investire",
    text: (
      <>
        Stima il potenziale di un bene a Marrakech secondo uso, indirizzo e strategia.{" "}
        <span className="om-brand-inline">OFF MARKET</span> affina poi i dati con comparabili
        reali e opportunità selezionate.
      </>
    ),
    primaryHref: "/it/contatto/",
    secondaryHref: "/it/progetti-su-piano/",
  },
  nl: {
    eyebrow: "PRIVÉSIMULATOR",
    title: "Simuleren vóór u investeert",
    text: (
      <>
        Schat het potentieel van een pand in Marrakech volgens gebruik, adres en uw strategie.{" "}
        <span className="om-brand-inline">OFF MARKET</span> verfijnt daarna de cijfers met echte
        vergelijkingspunten en geselecteerde kansen.
      </>
    ),
    primaryHref: "/nl/contact/",
    secondaryHref: "/nl/projecten/",
  },
  no: {
    eyebrow: "PRIVAT KALKULATOR",
    title: "Simuler før du investerer",
    text: (
      <>
        Estimer potensialet til en eiendom i Marrakech etter bruk, adresse og strategi.{" "}
        <span className="om-brand-inline">OFF MARKET</span> finjusterer deretter tallene med
        reelle sammenligninger og utvalgte muligheter.
      </>
    ),
    primaryHref: "/no/kontakt/",
    secondaryHref: "/no/prosjekter/",
  },
} satisfies Record<SiteLocale, {
  eyebrow: string;
  title: string;
  text: ReactNode;
  primaryHref: string;
  secondaryHref: string;
}>;

/** Dedicated /simulateur/ page — same calculator UI as the homepage embed. */
export function SimulatorSection({ locale = "fr" }: { locale?: SiteLocale }) {
  const copy = SIMULATOR_PAGE_COPY[locale] ?? SIMULATOR_PAGE_COPY.fr;
  return (
    <main id="main" className="om-simulator-page">
      <HomeSimulatorSection
        id="simulateur"
        eyebrow={copy.eyebrow}
        titleId="om-simulator-page-title"
        title={copy.title}
        text={copy.text}
        motion
        primaryCtaHref={copy.primaryHref}
        secondaryCtaHref={copy.secondaryHref}
        locale={locale}
      />

      <PageFinalCtaSection locale={locale} />
    </main>
  );
}
