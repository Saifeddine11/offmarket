import type { Metadata } from "next";
import { BodyClass } from "@/components/layout/BodyClass";
import { LegacyScripts } from "@/components/layout/LegacyScripts";
import { PageShell } from "@/components/layout/PageShell";
import { LeadForm } from "@/components/forms/LeadForm";
import { buildPageMetadata, buildPageViewport } from "@/lib/seo/metadata";
import { SCRIPTS } from "@/lib/assets";
import Link from "next/link";

export const metadata: Metadata = buildPageMetadata({
  title: "Accesso privato | OFF MARKET Marrakech",
  description:
    "Richiedi l'accesso privato a opportunità immobiliari off-market selezionate a Marrakech, tra ville private, proprietà riservate e progetti su piano.",
  canonicalPath: "/it/off-market/",
});

export const viewport = buildPageViewport("#565449");

export default function ItOffMarketPage() {
  return (
    <PageShell className="om-off-market-page">
      <BodyClass className="om-off-market-page" />

      <a href="#main" className="om-contact-skip-link">
        Vai al contenuto principale
      </a>
      <Link className="om-off-market-close" href="/it/" aria-label="Torna alla home">
        ×
      </Link>

      <main id="main" className="om-off-market-main">
        <header className="om-off-market-hero">
          <p className="om-off-market-hero__eyebrow">ACCESSO PRIVATO</p>
          <h1 className="om-off-market-hero__title">
            Accedi alle proprietà off-market
          </h1>
          <p className="om-off-market-hero__subtitle">
            Le opportunità riservate non sono pubblicate online. Compila il
            modulo per ricevere una selezione privata in linea con il tuo
            progetto.
          </p>
          <a className="om-off-market-hero__cta" href="#off-market-form">
            Richiedi accesso
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
            Modulo di accesso off-market
          </h2>
          <LeadForm
            source="off_market_page"
            context="private_access"
            intent="off-market"
            intentMode="from-url"
            locale="it"
            variant="bare"
          />
        </section>
      </main>

      <footer className="om-off-market-footer">
        <p>
          <Link href="/it/">OFF MARKET</Link> — Immobiliare privato a Marrakech
        </p>
      </footer>

      <LegacyScripts srcs={SCRIPTS.offMarket} />
    </PageShell>
  );
}
