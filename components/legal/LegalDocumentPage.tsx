import type { Metadata } from "next";

import { BodyClass } from "@/components/layout/BodyClass";
import { CallbackModal } from "@/components/layout/CallbackModal";
import { HtmlInit } from "@/components/layout/HtmlInit";
import { LegacyScripts } from "@/components/layout/LegacyScripts";
import { StylesheetLinks } from "@/components/layout/StylesheetLinks";
import { LegalPageContent } from "@/components/sections/LegalPageContent";
import { LEGAL_DOCUMENTS, LEGAL_ROUTES, siteLocaleForLegalLocale, type LegalDocumentKey, type LegalLocale } from "@/lib/legal/legalContent";
import { SCRIPTS, STYLES } from "@/lib/assets";
import { buildPageMetadata, buildPageViewport } from "@/lib/seo/metadata";

const SKIP_LABELS: Record<LegalLocale, string> = {
  fr: "Aller au contenu principal",
  en: "Skip to main content",
  it: "Vai al contenuto principale",
  es: "Ir al contenido principal",
  nl: "Naar hoofdinhoud",
  no: "Gå til hovedinnholdet",
  ar: "انتقل إلى المحتوى الرئيسي",
};

const CONTACT_HREFS: Record<LegalLocale, string> = {
  fr: "/contact/",
  en: "/en/contact/",
  it: "/it/contatto/",
  es: "/es/contacto/",
  nl: "/nl/contact/",
  no: "/no/kontakt/",
  ar: "/contact/",
};

export function getLegalMetadata(locale: LegalLocale, document: LegalDocumentKey): Metadata {
  const content = LEGAL_DOCUMENTS[locale][document];
  return buildPageMetadata({
    title: `${content.title} | OFF MARKET`,
    description: content.description,
    canonicalPath: LEGAL_ROUTES[locale][document],
    ogLocale: content.ogLocale,
  });
}

export function LegalDocumentPage({
  locale,
  document,
}: {
  locale: LegalLocale;
  document: LegalDocumentKey;
}) {
  const siteLocale = siteLocaleForLegalLocale(locale);
  return (
    <>
      <HtmlInit addNotReady />
      <BodyClass className="om-inner-page" />
      <StylesheetLinks hrefs={STYLES.privacyPolicy} />
      <style>{`body { color: #565449; } .js.not-ready, .js.not-ready * { transition: none !important; }`}</style>
      <a href="#main" className="sr-only sr-only--focusable">
        {SKIP_LABELS[locale]}
      </a>
      <LegalPageContent locale={locale} document={document} />
      <CallbackModal locale={siteLocale} secondaryHref={CONTACT_HREFS[locale]} />
      <LegacyScripts srcs={SCRIPTS.privacyPolicy} />
    </>
  );
}
