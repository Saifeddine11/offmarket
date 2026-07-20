import type { Metadata } from "next";
import { BodyClass } from "@/components/layout/BodyClass";
import { LegacyScripts } from "@/components/layout/LegacyScripts";
import { PageShell } from "@/components/layout/PageShell";
import { LeadForm } from "@/components/forms/LeadForm";
import { buildPageMetadata, buildPageViewport } from "@/lib/seo/metadata";
import { SCRIPTS } from "@/lib/assets";

export const metadata: Metadata = buildPageMetadata({
  title: "Private toegang | OFF MARKET Marrakech",
  description:
    "Vraag private toegang aan tot geselecteerde off-market vastgoedkansen in Marrakech, waaronder private villa's, vertrouwelijke panden en nieuwbouwprojecten.",
  canonicalPath: "/nl/off-market/",
  ogLocale: "nl_NL",
});

export const viewport = buildPageViewport("#565449");

export default function NlOffMarketPage() {
  return (
    <PageShell className="om-off-market-page">
      <BodyClass className="om-off-market-page" />

      <a href="#main" className="om-contact-skip-link">
        Naar hoofdinhoud
      </a>

      <main id="main" className="om-off-market-main">
        <header className="om-off-market-hero">
          <p className="om-off-market-hero__eyebrow">PRIVÉTOEGANG</p>
          <h1 className="om-off-market-hero__title">
            Toegang tot off-market vastgoed
          </h1>
          <p className="om-off-market-hero__subtitle">
            Vertrouwelijke kansen worden niet online gepubliceerd. Vul het
            formulier in om een private selectie te ontvangen die aansluit bij uw project.
          </p>
          <a className="om-off-market-hero__cta" href="#off-market-form">
            Toegang aanvragen
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
            Off-market toegangsformulier
          </h2>
          <LeadForm
            source="off_market_page"
            context="private_access"
            intent="off-market"
            intentMode="from-url"
            locale="nl"
            variant="bare"
          />
        </section>
      </main>

      <LegacyScripts srcs={SCRIPTS.offMarket} />
    </PageShell>
  );
}
