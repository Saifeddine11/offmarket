import type { Metadata } from "next";
import { BodyClass } from "@/components/layout/BodyClass";
import { LegacyScripts } from "@/components/layout/LegacyScripts";
import { PageShell } from "@/components/layout/PageShell";
import { LeadForm } from "@/components/forms/LeadForm";
import { buildPageMetadata, buildPageViewport } from "@/lib/seo/metadata";
import { SCRIPTS } from "@/lib/assets";
import Link from "next/link";

export const metadata: Metadata = buildPageMetadata({
  title: "Accès OFF MARKET Marrakech — Sélection privée de biens",
  description:
    "Demandez l'accès aux biens off-market à Marrakech. Recevez une sélection privée adaptée à votre budget et à votre projet immobilier.",
  canonicalPath: "/off-market/",
});

export const viewport = buildPageViewport("#565449");

export default function OffMarketPage() {
  return (
    <PageShell className="om-off-market-page">
      <BodyClass className="om-off-market-page" />

      <a href="#main" className="om-contact-skip-link">
        Aller au contenu principal
      </a>
      <Link className="om-off-market-close" href="/" aria-label="Retour à l'accueil">
        ×
      </Link>

      <main id="main" className="om-off-market-main">
        <header className="om-off-market-hero">
          <p className="om-off-market-hero__eyebrow">ACCÈS PRIVÉ</p>
          <h1 className="om-off-market-hero__title">
            Accéder aux biens off-market
          </h1>
          <p className="om-off-market-hero__subtitle">
            Les opportunités confidentielles ne sont pas publiées en ligne.
            Remplissez le formulaire pour recevoir une sélection privée adaptée
            à votre projet.
          </p>
          <a className="om-off-market-hero__cta" href="#off-market-form">
            Demander l&apos;accès
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
            Formulaire d&apos;accès off-market
          </h2>
          <LeadForm
            source="off_market_page"
            context="private_access"
            intent="off-market"
            intentMode="from-url"
            variant="bare"
          />
        </section>
      </main>

      <LegacyScripts srcs={SCRIPTS.offMarket} />
    </PageShell>
  );
}
