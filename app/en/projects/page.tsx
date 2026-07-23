import type { Metadata } from "next";
import { BodyClass } from "@/components/layout/BodyClass";
import { HtmlInit } from "@/components/layout/HtmlInit";
import { PageShell } from "@/components/layout/PageShell";
import { NosProjetsPageContent } from "@/components/sections/NosProjetsPageContent";
import { buildPageMetadata, buildPageViewport } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Our real estate projects in Marrakech — Villas, apartments and off-market",
  description:
    "Discover selected real estate projects in Marrakech: off-plan villas, new apartments, off-market opportunities and confidential properties reviewed before presentation.",
  ogDescription:
    "A selection of villas, apartments and confidential opportunities in Marrakech, reviewed before presentation.",
  twitterDescription:
    "A selection of villas, apartments and confidential opportunities in Marrakech, reviewed before presentation.",
  canonicalPath: "/en/projects/",
  ogLocale: "en_US",
  ogImage: "https://offmarketofficial.com/assets/mavericks/gallery/mavericks-collection-estates.jpg",
});

export const viewport = buildPageViewport("#565449");

export default function EnProjectsPage() {
  return (
    <PageShell className="om-nos-projets-page om-animated-page om-inner-page">
      <HtmlInit preloaderDisabled />
      <BodyClass className="om-nos-projets-page om-animated-page om-inner-page" />

      <NosProjetsPageContent locale="en" />
    </PageShell>
  );
}
