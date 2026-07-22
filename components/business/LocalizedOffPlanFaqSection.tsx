import { HomeFaqBoot } from "@/components/home/HomeFaqBoot";
import {
  buildHomeFaqHtml,
  buildHomeFaqJsonLd,
  HOME_FAQ_STYLES,
} from "@/components/home/homeFaqContent";
import type { SiteLocale } from "@/lib/i18n/types";

export function LocalizedOffPlanFaqSection({
  locale,
}: {
  locale: Exclude<SiteLocale, "fr">;
}) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: HOME_FAQ_STYLES }} />
      <div dangerouslySetInnerHTML={{ __html: buildHomeFaqHtml(locale) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildHomeFaqJsonLd(locale) }}
      />
      <HomeFaqBoot sectionId="faq" />
    </>
  );
}
