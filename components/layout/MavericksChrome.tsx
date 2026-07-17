import Link from "next/link";

import { getChromeCopy } from "@/lib/i18n/chromeCopy";
import { langCodeToLocale, type LangCode } from "@/lib/i18n/types";
import type { SiteLocale } from "@/lib/i18n/types";

export type { LangCode };

type LangLinks = {
  en: string;
  fr: string;
  it: string;
  nl: string;
};

type MavericksChromeProps = {
  variant?: "hero" | "inner-hero" | "page-light" | "default";
  activeLang?: LangCode;
  langLinks?: LangLinks;
  locale?: SiteLocale;
  /** Desktop placeholder nav active item (filled by om-nav-menu.js at runtime). */
  activeDesktopNav?: "simulateur";
  showMobileLangSwitcher?: boolean;
};

const DEFAULT_LANG_LINKS: LangLinks = {
  en: "/en/",
  fr: "/",
  it: "/it/",
  nl: "/nl/",
};

const ENABLE_LANGUAGE_SWITCHER = true;

function localeToLangCode(locale: SiteLocale): LangCode {
  if (locale === "en") return "EN";
  if (locale === "it") return "IT";
  if (locale === "nl") return "NL";
  return "FR";
}

const ACCESS_BTN_ICON = (
  <span className="om-button__icon" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 17 17 7M9 7h8v8"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

export function MavericksChrome({
  variant = "default",
  activeLang,
  langLinks = DEFAULT_LANG_LINKS,
  locale,
  activeDesktopNav,
  showMobileLangSwitcher = false,
}: MavericksChromeProps) {
  const resolvedLocale = locale ?? langCodeToLocale(activeLang ?? "FR");
  const resolvedActiveLang = activeLang ?? localeToLangCode(resolvedLocale);
  const copy = getChromeCopy(resolvedLocale);

  const chromeClass =
    variant === "hero"
      ? "mv-chrome mv-chrome--hero is-mounted"
      : variant === "inner-hero"
        ? "mv-chrome mv-chrome--hero mv-chrome--inner-hero is-mounted"
        : variant === "page-light"
          ? "mv-chrome mv-chrome--page-light"
          : "mv-chrome";

  const usePlaceholderNav = variant === "page-light";
  const showAccessIcon = variant === "page-light" || variant === "hero";

  const desktopNavHtml = usePlaceholderNav
    ? copy.placeholderNav
        .map((item) => {
          const isActive =
            activeDesktopNav === "simulateur" && item.href.includes("simulateur");
          return (
            `<a href="${item.href}"` +
            (isActive ? ' class="is-active" aria-current="page"' : "") +
            `>${item.label}</a>`
          );
        })
        .join("")
    : "";

  const mobileNavItemsHtml = usePlaceholderNav
    ? copy.placeholderNav
        .map(
          (item) =>
            '<li class="cinematic-menu-item mv-chrome__menu-item">' +
            `<a href="${item.href}" class="cinematic-menu-link">` +
            item.label +
            "</a></li>",
        )
        .join("")
    : "";

  return (
    <div className={chromeClass} id="mv-chrome" data-mv-chrome suppressHydrationWarning>
      <div
        className="cinematic-menu-backdrop"
        data-mv-backdrop
        aria-hidden="true"
        suppressHydrationWarning
      />

      <nav className="mv-chrome__nav-mobile om-header" aria-label={copy.menuAria}>
        <div className="om-header__bar">
          <Link
            href={copy.homeHref}
            className="mv-chrome__logo-link om-header__logo"
            aria-label="OFF MARKET"
          >
            <img
              src="/assets/logos/logoblack.webp"
              alt=""
              className="mv-chrome__logo mv-chrome__logo--dark"
              width={120}
              height={36}
              decoding="async"
            />
          </Link>
          <div className="om-header__actions">
            <button
              type="button"
              className="om-header__icon-btn om-header__icon-btn--ghost om-header__icon-btn--menu"
              data-mv-menu-toggle
              aria-expanded="false"
              aria-label={copy.menuAria}
              suppressHydrationWarning
            >
              <span
                className="mv-menu-toggle-icon"
                data-mv-toggle-icon
                aria-hidden="true"
              >
                <span className="mv-menu-toggle-icon__bar mv-menu-toggle-icon__bar--top" />
                <span className="mv-menu-toggle-icon__bar mv-menu-toggle-icon__bar--bottom" />
              </span>
            </button>
          </div>
        </div>
      </nav>

      <nav className="mv-chrome__nav-desktop om-header" aria-label={copy.menuAria}>
        <div className="om-header__bar">
          <Link
            href={copy.homeHref}
            className="mv-chrome__logo-link om-header__logo"
            aria-label="OFF MARKET"
          >
            <img
              src="/assets/logos/logoblack.webp"
              alt=""
              className="mv-chrome__logo mv-chrome__logo--dark"
              width={140}
              height={42}
              decoding="async"
            />
          </Link>
          <nav
            className="om-header__nav"
            aria-label={copy.mainNavAria}
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: desktopNavHtml }}
          />
          <div className="om-header__actions">
            {ENABLE_LANGUAGE_SWITCHER ? (
              <div
                className="om-language-dropdown"
                data-language-dropdown
                suppressHydrationWarning
              >
                <button
                  className="om-language-dropdown__trigger"
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded="false"
                  aria-label={copy.chooseLanguageAria}
                  suppressHydrationWarning
                >
                  <span className="om-language-dropdown__current">{resolvedActiveLang}</span>
                  <span className="om-language-dropdown__chevron" aria-hidden="true">
                    ▾
                  </span>
                </button>
                <div
                  className="om-language-dropdown__menu"
                  role="listbox"
                  aria-label={copy.chooseLanguageAria}
                >
                  <Link
                    href={langLinks.en}
                    className={`om-language-dropdown__option${resolvedActiveLang === "EN" ? " is-active" : ""}`}
                    role="option"
                    aria-selected={resolvedActiveLang === "EN"}
                    data-lang="EN"
                  >
                    EN
                  </Link>
                  <Link
                    href={langLinks.fr}
                    className={`om-language-dropdown__option${resolvedActiveLang === "FR" ? " is-active" : ""}`}
                    role="option"
                    aria-selected={resolvedActiveLang === "FR"}
                    data-lang="FR"
                  >
                    FR
                  </Link>
                  <Link
                    href={langLinks.it}
                    className={`om-language-dropdown__option${resolvedActiveLang === "IT" ? " is-active" : ""}`}
                    role="option"
                    aria-selected={resolvedActiveLang === "IT"}
                    data-lang="IT"
                  >
                    IT
                  </Link>
                  <Link
                    href={langLinks.nl}
                    className={`om-language-dropdown__option${resolvedActiveLang === "NL" ? " is-active" : ""}`}
                    role="option"
                    aria-selected={resolvedActiveLang === "NL"}
                    data-lang="NL"
                  >
                    NL
                  </Link>
                </div>
              </div>
            ) : null}
            <Link className="om-header__access-btn" href={copy.accessHref}>
              {showAccessIcon ? ACCESS_BTN_ICON : null}
              <span>{copy.accessLabel}</span>
            </Link>
          </div>
        </div>
      </nav>

      <div
        className="cinematic-menu-panel"
        data-mv-menu-panel
        role="dialog"
        aria-modal="true"
        aria-label={copy.menuAria}
        aria-hidden="true"
        suppressHydrationWarning
      >
        <div className="mv-chrome__menu-mobile-spacer" aria-hidden="true" />
        <div className="mv-chrome__menu-desktop-spacer" aria-hidden="true" />
        <nav className="cinematic-menu-scroll">
          <ul
            className="mv-chrome__menu-list"
            data-mv-menu-items
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: mobileNavItemsHtml }}
          />
        </nav>
        <div className="mv-chrome__menu-footer">
          <Link
            className="om-header__access-btn om-header__access-btn--menu"
            href={copy.accessHref}
          >
            {ACCESS_BTN_ICON}
            <span>{copy.accessLabel}</span>
          </Link>
          {ENABLE_LANGUAGE_SWITCHER && showMobileLangSwitcher ? (
            <nav
              className="mv-lang-switcher mv-lang-switcher--on-dark mv-lang-switcher--mobile-only"
              aria-label={copy.chooseLanguageAria}
            >
              <Link href={langLinks.en} className="mv-lang-switcher__btn" data-lang="EN">
                EN
              </Link>
              <span className="mv-lang-switcher__sep" aria-hidden="true">
                /
              </span>
              <Link
                href={langLinks.fr}
                className={`mv-lang-switcher__btn${resolvedActiveLang === "FR" ? " is-active" : ""}`}
                data-lang="FR"
                aria-current={resolvedActiveLang === "FR" ? "true" : undefined}
              >
                FR
              </Link>
              <span className="mv-lang-switcher__sep" aria-hidden="true">
                /
              </span>
              <Link href={langLinks.it} className="mv-lang-switcher__btn" data-lang="IT">
                IT
              </Link>
              <span className="mv-lang-switcher__sep" aria-hidden="true">
                /
              </span>
              <Link href={langLinks.nl} className="mv-lang-switcher__btn" data-lang="NL">
                NL
              </Link>
            </nav>
          ) : null}
          <p className="mv-chrome__menu-brand">OFF MARKET</p>
          <p className="mv-chrome__menu-tagline">{copy.menuTagline}</p>
        </div>
      </div>
    </div>
  );
}
