export type SiteLocale = "fr" | "en" | "it" | "nl" | "es" | "no";

export type LangCode = "FR" | "EN" | "IT" | "NL" | "ES" | "NO";

export function langCodeToLocale(code: LangCode): SiteLocale {
  switch (code) {
    case "EN":
      return "en";
    case "IT":
      return "it";
    case "NL":
      return "nl";
    case "ES":
      return "es";
    case "NO":
      return "no";
    default:
      return "fr";
  }
}
