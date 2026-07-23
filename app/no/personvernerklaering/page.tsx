import type { Metadata } from "next";
import { LegalDocumentPage, getLegalMetadata } from "@/components/legal/LegalDocumentPage";
import type { LegalDocumentKey, LegalLocale } from "@/lib/legal/legalContent";

const locale: LegalLocale = "no";
const document: LegalDocumentKey = "privacy";

export const metadata: Metadata = getLegalMetadata(locale, document);

export default function NorwegianPrivacyPage() {
  return <LegalDocumentPage locale={locale} document={document} />;
}

