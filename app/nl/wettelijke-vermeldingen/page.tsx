import type { Metadata } from "next";
import { LegalDocumentPage, getLegalMetadata } from "@/components/legal/LegalDocumentPage";
import type { LegalDocumentKey, LegalLocale } from "@/lib/legal/legalContent";

const locale: LegalLocale = "nl";
const document: LegalDocumentKey = "legal";

export const metadata: Metadata = getLegalMetadata(locale, document);

export default function DutchLegalNoticePage() {
  return <LegalDocumentPage locale={locale} document={document} />;
}

