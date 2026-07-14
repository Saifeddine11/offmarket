import Link from "next/link";

type SiteFooterProps = {
  currentPage?: "about" | null;
};

export function SiteFooter({ currentPage = null }: SiteFooterProps) {
  return (
    <footer id="contact" className="om-footer">
      <div className="om-footer__transition" aria-hidden="true" />
      <div className="om-footer__inner">
        <div className="om-footer__container om-footer__content">
          <div className="om-footer__grid">
            <div className="om-footer__brand">
              <p className="om-footer__label">Maison OFF MARKET</p>
              <p className="om-footer__tagline">
                Sélection privée d&apos;opportunités immobilières à Marrakech.
              </p>
            </div>
            <div className="om-footer__column om-footer__column--nav">
              <p className="om-footer__label">Navigation</p>
              <ul className="om-footer__links">
                <li>
                  <Link href="/">Accueil</Link>
                </li>
                <li>
                  <Link
                    href="/about/"
                    aria-current={currentPage === "about" ? "page" : undefined}
                  >
                    Notre Histoire
                  </Link>
                </li>
                <li>
                  <Link href="/sur-plan/">Sur plan</Link>
                </li>
                <li>
                  <Link href="/simulateur/">Simulateur</Link>
                </li>
                <li>
                  <Link href="/contact/">Contact</Link>
                </li>
              </ul>
            </div>
            <div className="om-footer__column om-footer__column--contact">
              <p className="om-footer__label">Contact</p>
              <ul className="om-footer__links">
                <li>Marrakech, Maroc</li>
                <li>
                  <a href="mailto:contact@offmarketofficial.com">contact@offmarketofficial.com</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="om-footer__container om-footer__bottom">
          <div className="om-footer__bar">
            <p>
              © <span data-mv-year /> OFF MARKET. Tous droits réservés.
            </p>
            <Link href="/privacy-policy/">Mentions légales</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
