import Link from "next/link";

import { FooterNewsletter } from "@/components/layout/FooterNewsletter";
import { getFooterCopy } from "@/lib/i18n/footerCopy";
import type { SiteLocale } from "@/lib/i18n/types";

type SiteFooterProps = {
  currentPage?: "about" | "contact" | "privacy-policy" | null;
  locale?: SiteLocale;
};

function FooterEmailIcon() {
  return (
    <svg
      className="om-footer__contact-icon"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 6.5h16a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5H4A1.5 1.5 0 0 1 2.5 16V8A1.5 1.5 0 0 1 4 6.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="m4.5 8 7.2 5.1a1 1 0 0 0 1.1 0L20 8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SiteFooter({
  currentPage = null,
  locale = "fr",
}: SiteFooterProps) {
  const copy = getFooterCopy(locale);

  return (
    <footer id="contact" className="om-footer">
      <div className="om-footer__transition" aria-hidden="true" />
      <div className="om-footer__inner">
        <div className="om-footer__grid">
          <div className="om-footer__col om-footer__col--brand">
            <Link href={copy.logoHref} className="om-footer__logo-link">
              <img
                src="/assets/logos/logoblanc.webp"
                alt={copy.logoAlt}
                className="om-footer__logo"
                width={132}
                height={36}
                decoding="async"
              />
            </Link>
            <p className="om-footer__headline">{copy.brandHeadline}</p>
            <p className="om-footer__support">{copy.brandSupport}</p>
            <FooterNewsletter
              locale={locale}
              title={copy.newsletterTitle}
              text={copy.newsletterText}
              placeholder={copy.newsletterPlaceholder}
              buttonLabel={copy.newsletterButton}
              successMessage={copy.newsletterSuccess}
              errorMessage={copy.newsletterError}
              rateLimitMessage={copy.newsletterRateLimit}
              emailLabel={copy.newsletterEmailLabel}
            />
          </div>

          <div className="om-footer__col om-footer__col--nav">
            <p className="om-footer__label">{copy.navTitle}</p>
            <ul className="om-footer__links">
              {copy.navLinks.map((link) => {
                const active =
                  (link.href === "/about/" && currentPage === "about") ||
                  (link.href === "/contact/" && currentPage === "contact");

                return (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="om-footer__col om-footer__col--immobilier">
            <p className="om-footer__label">{copy.immobilierTitle}</p>
            <ul className="om-footer__links">
              {copy.immobilierLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="om-footer__col om-footer__col--cta">
            <p className="om-footer__statement">{copy.ctaStatement}</p>
            <Link href={copy.ctaHref} className="om-footer__cta">
              {copy.ctaButton}
            </Link>
            <div className="om-footer__contact-actions">
              <a
                href={`mailto:${copy.email}`}
                className="om-footer__contact-btn"
                aria-label={copy.email}
              >
                <FooterEmailIcon />
                <span>{copy.email}</span>
              </a>
            </div>
            <div className="om-footer__address">
              <p className="om-footer__address-title">{copy.addressTitle}</p>
              <p>{copy.addressLine}</p>
              <p>{copy.addressNote}</p>
            </div>
          </div>
        </div>

        <div className="om-footer__bottom">
          <div className="om-footer__bar">
            <p className="om-footer__copyright">
              ©{" "}
              <span data-mv-year suppressHydrationWarning>
                {new Date().getFullYear()}
              </span>{" "}
              OFF MARKET. {copy.rights}
            </p>
            <nav className="om-footer__legal" aria-label={copy.legalNavAria}>
              {[
                {
                  href: copy.privacyHref,
                  label: copy.privacy,
                  current: currentPage === "privacy-policy",
                },
                { href: copy.termsHref, label: copy.terms, current: false },
                { href: copy.legalHref, label: copy.legal, current: false },
              ]
                .filter((link) => link.href && link.href !== "#")
                .map((link) => (
                  <Link
                    key={link.href + link.label}
                    href={link.href}
                    aria-current={link.current ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
