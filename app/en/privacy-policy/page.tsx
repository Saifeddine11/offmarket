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
  title: "Privacy policy and legal notice | OFF MARKET Marrakech",
  description:
    "Legal information and privacy policy for the OFF MARKET Marrakech website.",
  canonicalPath: "/en/privacy-policy/",
  ogLocale: "en_US",
});

export const viewport = buildPageViewport("#565449");

export default function EnPrivacyPolicyPage() {
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
        Skip to main content
      </a>

      <LegalPageContent locale="en" />
      <CallbackModal locale="en" secondaryHref="/en/contact/" />
      <LegacyScripts srcs={SCRIPTS.privacyPolicy} />
    </>
  );
}
