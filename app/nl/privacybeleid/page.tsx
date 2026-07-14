import type { Metadata } from "next";
import { BodyClass } from "@/components/layout/BodyClass";
import { CallbackModal } from "@/components/layout/CallbackModal";
import { HtmlInit } from "@/components/layout/HtmlInit";
import { LegacyScripts } from "@/components/layout/LegacyScripts";
import { StylesheetLinks } from "@/components/layout/StylesheetLinks";
import { LegalPageContent } from "@/components/sections/LegalPageContent";
import { SCRIPTS, STYLES } from "@/lib/assets";
import { buildPageMetadata, buildPageViewport } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacybeleid en wettelijke vermeldingen | OFF MARKET Marrakech",
  description:
    "Juridische informatie en privacybeleid voor de website van OFF MARKET Marrakech.",
  canonicalPath: "/nl/privacybeleid/",
  ogLocale: "nl_NL",
});

export const viewport = buildPageViewport("#565449");

export default function NlPrivacybeleidPage() {
  return (
    <>
      <HtmlInit addNotReady />
      <BodyClass className="om-inner-page" />
      <StylesheetLinks hrefs={STYLES.privacyPolicy} />
      <style>{`
        body { color: #565449; }
        .js.not-ready, .js.not-ready * { transition: none !important; }
      `}</style>

      <a href="#main" className="sr-only sr-only--focusable">
        Naar hoofdinhoud
      </a>

      <LegalPageContent locale="nl" />
      <CallbackModal locale="nl" secondaryHref="/nl/contact/" />
      <LegacyScripts srcs={SCRIPTS.privacyPolicy} />
    </>
  );
}
