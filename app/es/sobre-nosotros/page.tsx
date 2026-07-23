import type { Metadata } from "next";
import { BodyClass } from "@/components/layout/BodyClass";
import { HtmlInit } from "@/components/layout/HtmlInit";
import { LegacyScripts } from "@/components/layout/LegacyScripts";
import { PageShell } from "@/components/layout/PageShell";
import { AboutPageContent } from "@/components/sections/AboutPageContent";
import { SCRIPTS } from "@/lib/assets";
import { LANG_LINKS } from "@/lib/routes";
import { buildPageMetadata, buildPageViewport } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Nuestra historia — OFF MARKET Marrakech",
  description:
    "Descubra el enfoque de OFF MARKET en Marrakech: una casa privada dedicada a la selección, el análisis y el acceso confidencial a oportunidades inmobiliarias.",
  ogDescription:
    "Un enfoque privado, selectivo y confidencial del mercado inmobiliario en Marrakech.",
  twitterDescription:
    "Un enfoque privado, selectivo y confidencial del mercado inmobiliario en Marrakech.",
  canonicalPath: "/es/sobre-nosotros/",
  ogLocale: "es_ES",
  ogImage: "https://offmarketofficial.com/assets/mavericks/hero/mavericks-hero-villa.webp",
});

export const viewport = buildPageViewport("#565449");

export default function EsSobreNosotrosPage() {
  return (
    <PageShell className="om-about-page om-inner-page">
      <HtmlInit preloaderDisabled />
      <BodyClass className="om-about-page om-inner-page" />
      <AboutPageContent
        langLinks={LANG_LINKS.about}
        aboutHref="/es/sobre-nosotros/"
        locale="es"
      />
      <LegacyScripts srcs={SCRIPTS.innerEditorial} />
    </PageShell>
  );
}
