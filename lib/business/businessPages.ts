import { getPageContent } from "@/lib/content/pages";
import type { PageContent } from "@/lib/content/types";
import type { SiteLocale } from "@/lib/i18n/types";
import { SITE_URL } from "@/lib/legacy/routes";

const OFF_PLAN_META: Record<Extract<SiteLocale, "es" | "no">, Partial<PageContent>> = {
  es: {
    htmlLang: "es",
    title: "Inmobiliaria sobre plano en Marrakech — Proyectos seleccionados | OFF MARKET",
    description:
      "Guía de compra inmobiliaria sobre plano en Marrakech y Marruecos: proyectos nuevos, documentos que verificar, pagos, riesgos, entrega y lectura de inversión.",
    canonical: `${SITE_URL}/es/sobre-plano/`,
    ogTitle: "Inmobiliaria sobre plano en Marrakech — OFF MARKET",
    ogDescription:
      "Proyectos sobre plano seleccionados por arquitectura, ubicación y potencial patrimonial en Marrakech.",
    ogLocale: "es_ES",
    twitterTitle: "Inmobiliaria sobre plano en Marrakech — OFF MARKET",
    twitterDescription:
      "Proyectos sobre plano seleccionados por arquitectura, ubicación y potencial patrimonial en Marrakech.",
  },
  no: {
    htmlLang: "no",
    title: "Nybygg i Marrakech — Utvalgte prosjekter | OFF MARKET",
    description:
      "Guide til kjøp av nybygg i Marrakech og Marokko: nye prosjekter, dokumenter som bør kontrolleres, betalinger, risiko, levering og investeringsanalyse.",
    canonical: `${SITE_URL}/no/nybygg/`,
    ogTitle: "Nybygg i Marrakech — OFF MARKET",
    ogDescription:
      "Nybyggprosjekter valgt for arkitektur, beliggenhet og langsiktig verdi i Marrakech.",
    ogLocale: "nb_NO",
    twitterTitle: "Nybygg i Marrakech — OFF MARKET",
    twitterDescription:
      "Nybyggprosjekter valgt for arkitektur, beliggenhet og langsiktig verdi i Marrakech.",
  },
};

export function getLocalizedOffPlanContent(
  locale: Extract<SiteLocale, "es" | "no">,
): PageContent {
  return {
    ...getPageContent("sur-plan"),
    ...OFF_PLAN_META[locale],
  };
}
