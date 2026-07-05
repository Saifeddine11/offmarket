import { HtmlChunk } from "@/components/html/HtmlChunk";
import { getHomeSectionHtml } from "@/lib/home/sections";

/** Homepage testimonials / “Avis clients” section — exact legacy markup. */
export function TestimonialsSection() {
  return <HtmlChunk html={getHomeSectionHtml("testimonials")} />;
}
