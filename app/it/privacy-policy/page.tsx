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
  title: "Privacy e note legali | OFF MARKET Marrakech",
  description:
    "Informazioni legali e privacy policy del sito OFF MARKET Marrakech.",
  canonicalPath: "/it/privacy-policy/",
  ogLocale: "it_IT",
});

export const viewport = buildPageViewport("#565449");

export default function ItPrivacyPolicyPage() {
  return (
    <>
      <HtmlInit addNotReady />
      <BodyClass className="om-inner-page" />
      <StylesheetLinks hrefs={STYLES.privacyPolicy} />
      <style>{`body { color: #565449; } .js.not-ready, .js.not-ready * { transition: none !important; }`}</style>
      <a href="#main" className="sr-only sr-only--focusable">
        Vai al contenuto principale
      </a>
      <LegalPageContent locale="it" />
      <CallbackModal locale="it" secondaryHref="/it/contatto/" />
      <LegacyScripts srcs={SCRIPTS.privacyPolicy} />
    </>
  );
}
