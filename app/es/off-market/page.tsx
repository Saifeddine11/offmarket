import type { Metadata } from "next";
import { BodyClass } from "@/components/layout/BodyClass";
import { LegacyScripts } from "@/components/layout/LegacyScripts";
import { PageShell } from "@/components/layout/PageShell";
import { LeadForm } from "@/components/forms/LeadForm";
import { buildPageMetadata, buildPageViewport } from "@/lib/seo/metadata";
import { SCRIPTS } from "@/lib/assets";

export const metadata: Metadata = buildPageMetadata({
  title: "Acceso privado | OFF MARKET Marrakech",
  description:
    "Solicite acceso privado a oportunidades inmobiliarias off-market seleccionadas en Marrakech, incluidas villas privadas, propiedades confidenciales y proyectos sobre plano.",
  canonicalPath: "/es/off-market/",
  ogLocale: "es_ES",
});

export const viewport = buildPageViewport("#565449");

export default function EsOffMarketPage() {
  return (
    <PageShell className="om-off-market-page">
      <BodyClass className="om-off-market-page" />
      <a href="#main" className="om-contact-skip-link">
        Saltar al contenido principal
      </a>
      <main id="main" className="om-off-market-main">
        <header className="om-off-market-hero">
          <p className="om-off-market-hero__eyebrow">ACCESO PRIVADO</p>
          <h1 className="om-off-market-hero__title">
            Acceder a propiedades off-market
          </h1>
          <p className="om-off-market-hero__subtitle">
            Las oportunidades confidenciales no se publican en línea. Complete
            el formulario para recibir una selección privada alineada con su
            proyecto.
          </p>
          <a className="om-off-market-hero__cta" href="#off-market-form">
            Solicitar acceso
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
            Formulario de acceso off-market
          </h2>
          <LeadForm
            source="off_market_page"
            context="private_access"
            intent="off-market"
            intentMode="from-url"
            locale="es"
            variant="bare"
          />
        </section>
      </main>
      <LegacyScripts srcs={SCRIPTS.offMarket} />
    </PageShell>
  );
}
