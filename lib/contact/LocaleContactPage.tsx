import type { Metadata } from "next";
import { BodyClass } from "@/components/layout/BodyClass";
import { HtmlInit } from "@/components/layout/HtmlInit";
import { LegacyScripts } from "@/components/layout/LegacyScripts";
import { PageShell } from "@/components/layout/PageShell";
import { ContactPageContent } from "@/components/sections/ContactPageContent";
import { SCRIPTS } from "@/lib/assets";
import { LANG_LINKS } from "@/lib/routes";
import type { SiteLocale } from "@/lib/i18n/types";
import {
  getPageMetadata,
  metadataToPageContent,
  type ContactPageId,
} from "@/lib/content/pages";
import { buildMetadataFromParsed, buildPageViewport } from "@/lib/seo/metadata";

type LocaleContactKey = "fr/contact" | "en/contact" | "it/contatto" | "nl/contact";

const LOCALE_PAGE_IDS: Record<LocaleContactKey, ContactPageId> = {
  "fr/contact": "contact-fr",
  "en/contact": "contact-en",
  "it/contatto": "contact-it",
  "nl/contact": "contact-nl",
};

const CONFIG: Record<
  LocaleContactKey,
  {
    homeHref: string;
    activeLang: "FR" | "EN" | "IT" | "NL";
    langLinks: (typeof LANG_LINKS)["contact"];
    locale: SiteLocale;
  }
> = {
  "fr/contact": {
    homeHref: "/",
    activeLang: "FR",
    langLinks: LANG_LINKS.contact,
    locale: "fr",
  },
  "en/contact": {
    homeHref: "/en/",
    activeLang: "EN",
    langLinks: LANG_LINKS.contact,
    locale: "en",
  },
  "it/contatto": {
    homeHref: "/it/",
    activeLang: "IT",
    langLinks: LANG_LINKS.contact,
    locale: "it",
  },
  "nl/contact": {
    homeHref: "/nl/",
    activeLang: "NL",
    langLinks: LANG_LINKS.contact,
    locale: "nl",
  },
};

export function buildLocaleContactMetadata(key: LocaleContactKey): Metadata {
  const meta = getPageMetadata(LOCALE_PAGE_IDS[key]);
  return buildMetadataFromParsed(metadataToPageContent(meta));
}

export function buildLocaleContactViewport(key: LocaleContactKey) {
  const meta = getPageMetadata(LOCALE_PAGE_IDS[key]);
  return buildPageViewport(meta.themeColor);
}

export function LocaleContactPage({ localeKey }: { localeKey: LocaleContactKey }) {
  const cfg = CONFIG[localeKey];

  return (
    <PageShell className="om-contact-lead-body om-inner-page">
      <HtmlInit preloaderDisabled />
      <BodyClass className="om-contact-lead-body om-inner-page" />
      <style>{`body { margin: 0; background: #f5f4f2; color: #11120d; }`}</style>

      <ContactPageContent homeHref={cfg.homeHref} locale={cfg.locale} />
      <LegacyScripts srcs={SCRIPTS.contact} />
    </PageShell>
  );
}
