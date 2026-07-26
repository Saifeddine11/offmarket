import type { Metadata } from "next";
import { BodyClass } from "@/components/layout/BodyClass";
import { HtmlInit } from "@/components/layout/HtmlInit";
import { LegacyScripts } from "@/components/layout/LegacyScripts";
import { PageShell } from "@/components/layout/PageShell";
import { ContactPageContent } from "@/components/sections/ContactPageContent";
import { SCRIPTS } from "@/lib/assets";
import { buildPageMetadata, buildPageViewport } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Contacto OFF MARKET Marrakech | Acceso inmobiliario privado",
  description:
    "Contacte con OFF MARKET Marrakech para estudiar un proyecto inmobiliario, una búsqueda off-market, una inversión sobre plano o la compra de una villa.",
  ogDescription:
    "Contacte con OFF MARKET Marrakech para estudiar su proyecto inmobiliario y acceder a una selección privada.",
  twitterDescription:
    "Contacte con OFF MARKET Marrakech para estudiar su proyecto inmobiliario y acceder a una selección privada.",
  canonicalPath: "/es/contacto/",
  ogLocale: "es_ES",
  ogImage: "https://offmarketofficial.com/assets/offmarket/location/offmarket-gueliz-hypercentre.webp",
});

export const viewport = buildPageViewport("#565449");

export default function EsContactoPage() {
  return (
    <PageShell className="om-contact-lead-body om-inner-page">
      <HtmlInit preloaderDisabled />
      <BodyClass className="om-contact-lead-body om-inner-page" />
      <style>{`body { margin: 0; background: #f5f4f2; color: #11120d; }`}</style>
      <ContactPageContent homeHref="/es/" locale="es" />
      <LegacyScripts srcs={SCRIPTS.contact} />
    </PageShell>
  );
}
