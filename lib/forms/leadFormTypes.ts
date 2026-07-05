import type { SiteLocale } from "@/lib/i18n/types";

export type LeadFormContextValues = {
  propertyType?: string;
  budget?: string;
  objective?: string;
  source?: string;
  context?: string;
};

export type LeadFormProps = {
  source?: string;
  context?: string;
  title?: string;
  subtitle?: string;
  defaultPropertyType?: string;
  defaultBudget?: string;
  defaultObjective?: string;
  compact?: boolean;
  locale?: SiteLocale;
  intent?: string;
  intentMode?: "fixed" | "from-url";
  showMessage?: boolean;
  showHeader?: boolean;
  /** `section` wraps with homepage-style header; `bare` renders the form only. */
  variant?: "section" | "bare";
  sectionClassName?: string;
  /** Questionnaire step 4 — back control rendered in the form footer. */
  onBack?: () => void;
};

export function resolveLeadContextValues(
  props: LeadFormProps,
): LeadFormContextValues {
  return {
    propertyType: props.defaultPropertyType,
    budget: props.defaultBudget,
    objective: props.defaultObjective,
    source: props.source,
    context: props.context,
  };
}

export function detectPageLocale(): SiteLocale {
  if (typeof document === "undefined") return "fr";
  const lang = document.documentElement.lang || "fr";
  if (lang.startsWith("en")) return "en";
  if (lang.startsWith("it")) return "it";
  if (lang.startsWith("nl")) return "nl";
  return "fr";
}
