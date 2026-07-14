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
  title: "Our Story — OFF MARKET Marrakech",
  description:
    "Discover the OFF MARKET approach in Marrakech: a private house dedicated to selection, analysis and confidential access to real estate opportunities.",
  ogDescription:
    "A private, selective and confidential approach to real estate in Marrakech.",
  twitterDescription:
    "A private, selective and confidential approach to real estate in Marrakech.",
  canonicalPath: "/en/about/",
  ogLocale: "en_US",
  ogImage: "https://offmarketofficial.com/assets/mavericks/hero/mavericks-hero-villa.webp",
});

export const viewport = buildPageViewport("#565449");

export default function EnAboutPage() {
  return (
    <PageShell className="om-about-page om-inner-page">
      <HtmlInit preloaderDisabled />
      <BodyClass className="om-about-page om-inner-page" />

      <AboutPageContent
        langLinks={LANG_LINKS.about}
        aboutHref="/en/about/"
        locale="en"
      />
      <LegacyScripts srcs={SCRIPTS.innerEditorial} />
    </PageShell>
  );
}
