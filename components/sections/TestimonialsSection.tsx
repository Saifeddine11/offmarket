import { HtmlChunk } from "@/components/html/HtmlChunk";
import { getHomeSectionHtml } from "@/lib/home/sections";
import type { SiteLocale } from "@/lib/i18n/types";

/** Homepage testimonials / “Avis clients” section — exact legacy markup. */
export function TestimonialsSection({ locale = "fr" }: { locale?: SiteLocale }) {
  return <HtmlChunk html={getHomeSectionHtml("testimonials", locale)} />;
}
