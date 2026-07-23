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
  title: "Vår historie — OFF MARKET Marrakech",
  description:
    "Oppdag OFF MARKETs metode i Marrakech: et privat miljø for utvalg, analyse og konfidensiell tilgang til eiendomsmuligheter.",
  ogDescription:
    "En privat, selektiv og konfidensiell tilnærming til eiendom i Marrakech.",
  twitterDescription:
    "En privat, selektiv og konfidensiell tilnærming til eiendom i Marrakech.",
  canonicalPath: "/no/om-oss/",
  ogLocale: "nb_NO",
  ogImage: "https://offmarketofficial.com/assets/mavericks/hero/mavericks-hero-villa.webp",
});

export const viewport = buildPageViewport("#565449");

export default function NoOmOssPage() {
  return (
    <PageShell className="om-about-page om-inner-page">
      <HtmlInit preloaderDisabled />
      <BodyClass className="om-about-page om-inner-page" />
      <AboutPageContent
        langLinks={LANG_LINKS.about}
        aboutHref="/no/om-oss/"
        locale="no"
      />
      <LegacyScripts srcs={SCRIPTS.innerEditorial} />
    </PageShell>
  );
}
