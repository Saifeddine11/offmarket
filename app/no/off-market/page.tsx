import type { Metadata } from "next";
import { BodyClass } from "@/components/layout/BodyClass";
import { LegacyScripts } from "@/components/layout/LegacyScripts";
import { PageShell } from "@/components/layout/PageShell";
import { LeadForm } from "@/components/forms/LeadForm";
import { buildPageMetadata, buildPageViewport } from "@/lib/seo/metadata";
import { SCRIPTS } from "@/lib/assets";

export const metadata: Metadata = buildPageMetadata({
  title: "Privat tilgang | OFF MARKET Marrakech",
  description:
    "Be om privat tilgang til utvalgte off-market eiendomsmuligheter i Marrakech, inkludert private villaer, konfidensielle eiendommer og nybyggprosjekter.",
  canonicalPath: "/no/off-market/",
  ogLocale: "nb_NO",
});

export const viewport = buildPageViewport("#565449");

export default function NoOffMarketPage() {
  return (
    <PageShell className="om-off-market-page">
      <BodyClass className="om-off-market-page" />
      <a href="#main" className="om-contact-skip-link">
        Gå til hovedinnhold
      </a>
      <main id="main" className="om-off-market-main">
        <header className="om-off-market-hero">
          <p className="om-off-market-hero__eyebrow">PRIVAT TILGANG</p>
          <h1 className="om-off-market-hero__title">
            Få tilgang til off-market eiendommer
          </h1>
          <p className="om-off-market-hero__subtitle">
            Konfidensielle muligheter publiseres ikke på nett. Fyll ut skjemaet
            for å motta et privat utvalg tilpasset prosjektet ditt.
          </p>
          <a className="om-off-market-hero__cta" href="#off-market-form">
            Be om tilgang
          </a>
        </header>
        <section
          className="om-off-market-form-panel"
          id="off-market-form"
          aria-labelledby="om-off-market-form-title"
        >
          <h2
            id="om-off-market-form-title"
            className="om-private-access-form__label--sr"
          >
            Skjema for off-market tilgang
          </h2>
          <LeadForm
            source="off_market_page"
            context="private_access"
            intent="off-market"
            intentMode="from-url"
            locale="no"
            variant="bare"
          />
        </section>
      </main>
      <LegacyScripts srcs={SCRIPTS.offMarket} />
    </PageShell>
  );
}
