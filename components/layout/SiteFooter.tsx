import Link from "next/link";

import { getFooterCopy } from "@/lib/i18n/footerCopy";
import type { SiteLocale } from "@/lib/i18n/types";

type SiteFooterProps = {
  currentPage?: "about" | "contact" | "privacy-policy" | null;
  aboutHref?: string;
  surPlanHref?: string;
  simulateurHref?: string;
  showPhone?: boolean;
  locale?: SiteLocale;
};

export function SiteFooter({
  currentPage = null,
  aboutHref,
  surPlanHref,
  simulateurHref,
  showPhone = false,
  locale = "fr",
}: SiteFooterProps) {
  const copy = getFooterCopy(locale);
  const resolvedAboutHref = aboutHref ?? copy.aboutHref;
  const resolvedSurPlanHref = surPlanHref ?? copy.offPlanHref;
  const resolvedSimulateurHref = simulateurHref ?? copy.simulatorHref;

  return (
    <footer id="contact" className="om-footer">
      <div className="om-footer__transition" aria-hidden="true" />
      <div className="om-footer__inner">
        <div className="om-footer__container om-footer__content">
          <div className="om-footer__grid">
            <div className="om-footer__brand">
              <p className="om-footer__label">{copy.brandLabel}</p>
              <p className="om-footer__tagline">{copy.tagline}</p>
            </div>
            <div className="om-footer__column om-footer__column--nav">
              <p className="om-footer__label">{copy.navLabel}</p>
              <ul className="om-footer__links">
                <li>
                  <Link href={copy.homeHref}>{copy.home}</Link>
                </li>
                {currentPage === "about" ? (
                  <li>
                    <Link href={resolvedAboutHref} aria-current="page">
                      {copy.ourStory}
                    </Link>
                  </li>
                ) : null}
                <li>
                  <Link href={resolvedSurPlanHref}>{copy.offPlan}</Link>
                </li>
                <li>
                  <Link href={resolvedSimulateurHref}>{copy.simulator}</Link>
                </li>
                <li>
                  <Link
                    href={copy.contactHref}
                    aria-current={currentPage === "contact" ? "page" : undefined}
                  >
                    {copy.contact}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="om-footer__column om-footer__column--contact">
              <p className="om-footer__label">{copy.contactLabel}</p>
              <ul className="om-footer__links">
                <li>{copy.location}</li>
                <li>
                  <a href="mailto:contact@offmarket.ma">contact@offmarket.ma</a>
                </li>
                {showPhone ? (
                  <li>
                    <span className="om-footer__phone">+212 (0) 000 000 000</span>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>
        </div>
        <div className="om-footer__container om-footer__bottom">
          <div className="om-footer__bar">
            <p>
              ©{" "}
              <span data-mv-year suppressHydrationWarning>
                {new Date().getFullYear()}
              </span>{" "}
              OFF MARKET. {copy.rights}
            </p>
            <Link
              href={copy.privacyHref}
              aria-current={currentPage === "privacy-policy" ? "page" : undefined}
            >
              {copy.legal}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
