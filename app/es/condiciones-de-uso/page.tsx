import type { Metadata } from "next";
import { LegalDocumentPage, getLegalMetadata } from "@/components/legal/LegalDocumentPage";
import type { LegalDocumentKey, LegalLocale } from "@/lib/legal/legalContent";

const locale: LegalLocale = "es";
const document: LegalDocumentKey = "terms";

export const metadata: Metadata = getLegalMetadata(locale, document);

export default function SpanishTermsPage() {
  return <LegalDocumentPage locale={locale} document={document} />;
}

