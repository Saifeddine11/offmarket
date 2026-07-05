import Link from "next/link";

type MavericksChromeProps = {
  variant?: "inner-hero" | "default";
  activeLang?: "FR" | "EN" | "IT" | "NL";
  langLinks?: {
    en: string;
    fr: string;
    it: string;
    nl: string;
  };
};

const DEFAULT_LANG_LINKS = {
  en: "/en/",
  fr: "/",
  it: "/it/",
  nl: "/nl/",
};

export function MavericksChrome({
  variant = "default",
  activeLang = "FR",
  langLinks = DEFAULT_LANG_LINKS,
}: MavericksChromeProps) {
  const chromeClass =
    variant === "inner-hero"
      ? "mv-chrome mv-chrome--hero mv-chrome--inner-hero"
      : "mv-chrome";

  return (
    <div className={chromeClass} id="mv-chrome" data-mv-chrome>
      <div
        className="cinematic-menu-backdrop"
        data-mv-backdrop
        aria-hidden="true"
      />

      <nav className="mv-chrome__nav-mobile om-header" aria-label="Menu">
        <div className="om-header__bar">
          <Link
            href="/"
            className="mv-chrome__logo-link om-header__logo"
            aria-label="OFF MARKET"
          >
            <img
              src="/assets/logos/logo-rouge.png"
              alt=""
              className="mv-chrome__logo mv-chrome__logo--rouge"
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
              aria-label="Menu"
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

      <nav className="mv-chrome__nav-desktop om-header" aria-label="Menu">
        <div className="om-header__bar">
          <Link
            href="/"
            className="mv-chrome__logo-link om-header__logo"
            aria-label="OFF MARKET"
          >
            <img
              src="/assets/logos/logo-rouge.png"
              alt=""
              className="mv-chrome__logo mv-chrome__logo--rouge"
              width={140}
              height={42}
              decoding="async"
            />
          </Link>
          <nav className="om-header__nav" aria-label="Navigation principale" />
          <div className="om-header__actions">
            <div className="om-language-dropdown" data-language-dropdown>
              <button
                className="om-language-dropdown__trigger"
                type="button"
                aria-haspopup="listbox"
                aria-expanded="false"
                aria-label="Choisir la langue"
              >
                <span className="om-language-dropdown__current">
                  {activeLang}
                </span>
                <span className="om-language-dropdown__chevron" aria-hidden="true">
                  ▾
                </span>
              </button>
              <div
                className="om-language-dropdown__menu"
                role="listbox"
                aria-label="Choisir la langue"
              >
                <Link
                  href={langLinks.en}
                  className={`om-language-dropdown__option${activeLang === "EN" ? " is-active" : ""}`}
                  role="option"
                  aria-selected={activeLang === "EN"}
                  data-lang="EN"
                >
                  EN
                </Link>
                <Link
                  href={langLinks.fr}
                  className={`om-language-dropdown__option${activeLang === "FR" ? " is-active" : ""}`}
                  role="option"
                  aria-selected={activeLang === "FR"}
                  data-lang="FR"
                >
                  FR
                </Link>
                <Link
                  href={langLinks.it}
                  className={`om-language-dropdown__option${activeLang === "IT" ? " is-active" : ""}`}
                  role="option"
                  aria-selected={activeLang === "IT"}
                  data-lang="IT"
                >
                  IT
                </Link>
                <Link
                  href={langLinks.nl}
                  className={`om-language-dropdown__option${activeLang === "NL" ? " is-active" : ""}`}
                  role="option"
                  aria-selected={activeLang === "NL"}
                  data-lang="NL"
                >
                  NL
                </Link>
              </div>
            </div>
            <Link className="om-header__access-btn" href="/off-market/">
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
              <span>Demander l&apos;accès</span>
            </Link>
          </div>
        </div>
      </nav>

      <div
        className="cinematic-menu-panel"
        data-mv-menu-panel
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden="true"
      >
        <div className="mv-chrome__menu-mobile-spacer" aria-hidden="true" />
        <div className="mv-chrome__menu-desktop-spacer" aria-hidden="true" />
        <nav className="cinematic-menu-scroll">
          <ul className="mv-chrome__menu-list" data-mv-menu-items />
        </nav>
        <div className="mv-chrome__menu-footer">
          <Link
            className="om-header__access-btn om-header__access-btn--menu"
            href="/off-market/"
          >
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
            <span>Demander l&apos;accès</span>
          </Link>
          <p className="mv-chrome__menu-brand">OFF MARKET</p>
          <p className="mv-chrome__menu-tagline">
            Immobilier privé à Marrakech
          </p>
        </div>
      </div>
    </div>
  );
}
