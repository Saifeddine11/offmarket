import type { Metadata } from "next";
import { BodyClass } from "@/components/layout/BodyClass";
import { HtmlInit } from "@/components/layout/HtmlInit";
import { LegacyScripts } from "@/components/layout/LegacyScripts";
import { PageShell } from "@/components/layout/PageShell";
import { ContactPageContent } from "@/components/sections/ContactPageContent";
import { SCRIPTS } from "@/lib/assets";
import { buildPageMetadata, buildPageViewport } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Kontakt OFF MARKET Marrakech | Privat eiendomstilgang",
  description:
    "Kontakt OFF MARKET Marrakech for å drøfte et eiendomsprosjekt, et off-market søk, en nybygginvestering eller kjøp av villa.",
  ogDescription:
    "Kontakt OFF MARKET Marrakech for å drøfte eiendomsprosjektet ditt og få tilgang til et privat utvalg.",
  twitterDescription:
    "Kontakt OFF MARKET Marrakech for å drøfte eiendomsprosjektet ditt og få tilgang til et privat utvalg.",
  canonicalPath: "/no/kontakt/",
  ogLocale: "nb_NO",
  ogImage: "https://offmarketofficial.com/assets/offmarket/location/offmarket-gueliz-hypercentre.webp",
});

export const viewport = buildPageViewport("#565449");

export default function NoKontaktPage() {
  return (
    <PageShell className="om-contact-lead-body om-inner-page">
      <HtmlInit preloaderDisabled />
      <BodyClass className="om-contact-lead-body om-inner-page" />
      <style>{`body { margin: 0; background: #f5f4f2; color: #11120d; }`}</style>
      <ContactPageContent homeHref="/no/" locale="no" />
      <LegacyScripts srcs={SCRIPTS.contact} />
    </PageShell>
  );
}
