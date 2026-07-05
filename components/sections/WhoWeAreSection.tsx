import { HtmlChunk } from "@/components/html/HtmlChunk";
import { getHomeSectionHtml } from "@/lib/home/sections";

/** Homepage “Qui sommes-nous” section — exact legacy markup. */
export function WhoWeAreSection() {
  return <HtmlChunk html={getHomeSectionHtml("intro")} />;
}
