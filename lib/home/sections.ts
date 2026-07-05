import rootSections from "@/content/home/root-sections.json";

export type HomeSectionKey = "intro" | "testimonials";

const SECTIONS = rootSections.sections as Record<string, string>;

/** Homepage section HTML extracted from the French root homepage archive. */
export function getHomeSectionHtml(key: HomeSectionKey): string {
  return SECTIONS[key] ?? "";
}
