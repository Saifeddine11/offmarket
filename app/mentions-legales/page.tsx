import type { Metadata } from "next";
import { LegalDocumentPage, getLegalMetadata } from "@/components/legal/LegalDocumentPage";
import type { LegalDocumentKey, LegalLocale } from "@/lib/legal/legalContent";

const locale: LegalLocale = "fr";
const document: LegalDocumentKey = "legal";

export const metadata: Metadata = getLegalMetadata(locale, document);

export default function FrenchLegalNoticePage() {
  return <LegalDocumentPage locale={locale} document={document} />;
}

