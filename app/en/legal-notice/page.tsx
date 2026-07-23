import type { Metadata } from "next";
import { LegalDocumentPage, getLegalMetadata } from "@/components/legal/LegalDocumentPage";
import type { LegalDocumentKey, LegalLocale } from "@/lib/legal/legalContent";

const locale: LegalLocale = "en";
const document: LegalDocumentKey = "legal";

export const metadata: Metadata = getLegalMetadata(locale, document);

export default function EnglishLegalNoticePage() {
  return <LegalDocumentPage locale={locale} document={document} />;
}

