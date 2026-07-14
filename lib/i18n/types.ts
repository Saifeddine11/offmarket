export type SiteLocale = "fr" | "en" | "it" | "nl";

export type LangCode = "FR" | "EN" | "IT" | "NL";

export function langCodeToLocale(code: LangCode): SiteLocale {
  switch (code) {
    case "EN":
      return "en";
    case "IT":
      return "it";
    case "NL":
      return "nl";
    default:
      return "fr";
  }
}
