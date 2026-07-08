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
  title: "Mentions légales | OFF MARKET",
  description:
    "Mentions légales et informations de confidentialité du site OFF MARKET.",
  canonicalPath: "/privacy-policy/",
});

export const viewport = buildPageViewport("#565449");

export default function PrivacyPolicyPage() {
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
        Aller au contenu principal
      </a>

      <LegalPageContent />
      <CallbackModal />
      <LegacyScripts srcs={SCRIPTS.privacyPolicy} />
    </>
  );
}
