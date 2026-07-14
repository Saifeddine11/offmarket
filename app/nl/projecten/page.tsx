import type { Metadata } from "next";
import { BodyClass } from "@/components/layout/BodyClass";
import { HtmlInit } from "@/components/layout/HtmlInit";
import { LegacyScripts } from "@/components/layout/LegacyScripts";
import { PageShell } from "@/components/layout/PageShell";
import { NosProjetsPageContent } from "@/components/sections/NosProjetsPageContent";
import { SCRIPTS } from "@/lib/assets";
import { buildPageMetadata, buildPageViewport } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Onze vastgoedprojecten in Marrakech — Villa's, appartementen en off-market",
  description:
    "Ontdek geselecteerde vastgoedprojecten in Marrakech: nieuwbouwvilla's, nieuwe appartementen, off-market kansen en vertrouwelijke panden die vóór presentatie worden beoordeeld.",
  ogDescription:
    "Een selectie van villa's, appartementen en vertrouwelijke kansen in Marrakech, beoordeeld vóór presentatie.",
  twitterDescription:
    "Een selectie van villa's, appartementen en vertrouwelijke kansen in Marrakech, beoordeeld vóór presentatie.",
  canonicalPath: "/nl/projecten/",
  ogLocale: "nl_NL",
  ogImage: "https://offmarketofficial.com/assets/mavericks/gallery/mavericks-collection-estates.jpg",
});

export const viewport = buildPageViewport("#565449");

export default function NlProjectenPage() {
  return (
    <PageShell className="om-nos-projets-page om-animated-page om-inner-page">
      <HtmlInit preloaderDisabled />
      <BodyClass className="om-nos-projets-page om-animated-page om-inner-page" />

      <NosProjetsPageContent locale="nl" />
      <LegacyScripts srcs={SCRIPTS.nosProjets} />
    </PageShell>
  );
}
