import Link from "next/link";

type CallbackModalProps = {
  primaryHref?: string;
  secondaryHref?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  primaryClassName?: string;
  secondaryClassName?: string;
};

export function CallbackModal({
  primaryHref = "mailto:contact@offmarket.ma",
  secondaryHref = "/contact/",
  primaryLabel = "contact@offmarket.ma",
  secondaryLabel = "Formulaire de contact",
  primaryClassName = "om-button om-button--primary",
  secondaryClassName = "om-button om-button--secondary",
}: CallbackModalProps) {
  return (
    <div className="js-modal">
      <div
        className="modal modal--full ui-dark is-hidden"
        id="callback-modal"
        data-plugin="modal"
        data-modal-one-per-page="true"
        role="dialog"
        aria-hidden="true"
        aria-label="Contact"
        // mavericks-chrome.js stamps data-om-callback-init, possibly pre-hydration
        suppressHydrationWarning
      >
        <div className="modal__background" />
        <div className="modal__animation">
          <div className="modal__scroller">
            <div className="modal__scroller__scrollable">
              <div className="modal__content-wrapper">
                <div className="modal__content ui-background js-modal-ignore-auto-close">
                  <button
                    type="button"
                    className="btn btn--primary btn--square modal__close js-modal-close"
                    aria-label="Fermer"
                  >
                    ×
                  </button>
                  <div className="l-callback row ui-dark px-layout py-layout">
                    <div className="col col--md-12">
                      <p className="h2 leading-trim">
                        Recevoir une analyse privée
                      </p>
                      <p className="mt-1">
                        Partagez votre projet. OFF MARKET vous répond avec une
                        lecture ciblée et des comparables réels.
                      </p>
                      <div className="mt-2">
                        <Link href={primaryHref} className={primaryClassName}>
                          {primaryLabel}
                        </Link>
                      </div>
                      <div className="mt-1">
                        <Link href={secondaryHref} className={secondaryClassName}>
                          {secondaryLabel}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
