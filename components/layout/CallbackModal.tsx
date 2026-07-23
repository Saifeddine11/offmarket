import Link from "next/link";
import type { SiteLocale } from "@/lib/i18n/types";

type CallbackModalProps = {
  primaryHref?: string;
  secondaryHref?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  primaryClassName?: string;
  secondaryClassName?: string;
  locale?: SiteLocale;
};

const CALLBACK_COPY = {
  fr: {
    close: "Fermer",
    dialog: "Contact",
    title: "Recevoir une analyse privée",
    text:
      "Partagez votre projet. OFF MARKET vous répond avec une lecture ciblée et des comparables réels.",
    secondary: "Formulaire de contact",
  },
  en: {
    close: "Close",
    dialog: "Contact",
    title: "Receive a private analysis",
    text:
      "Share your project. OFF MARKET will respond with a targeted reading and real comparables.",
    secondary: "Contact form",
  },
  es: {
    close: "Cerrar",
    dialog: "Contacto",
    title: "Recibir un análisis privado",
    text:
      "Comparta su proyecto. OFF MARKET le responde con una lectura específica y comparables reales.",
    secondary: "Formulario de contacto",
  },
  it: {
    close: "Chiudi",
    dialog: "Contatto",
    title: "Ricevere un'analisi privata",
    text:
      "Condividi il tuo progetto. OFF MARKET risponde con una lettura mirata e comparabili reali.",
    secondary: "Modulo di contatto",
  },
  nl: {
    close: "Sluiten",
    dialog: "Contact",
    title: "Een private analyse ontvangen",
    text:
      "Deel uw project. OFF MARKET antwoordt met een gerichte analyse en echte vergelijkingspunten.",
    secondary: "Contactformulier",
  },
  no: {
    close: "Lukk",
    dialog: "Kontakt",
    title: "Motta en privat analyse",
    text:
      "Del prosjektet ditt. OFF MARKET svarer med en målrettet vurdering og reelle sammenligninger.",
    secondary: "Kontaktskjema",
  },
} satisfies Record<SiteLocale, {
  close: string;
  dialog: string;
  title: string;
  text: string;
  secondary: string;
}>;

export function CallbackModal({
  primaryHref = "mailto:contact@offmarketofficial.com",
  secondaryHref = "/contact/",
  primaryLabel = "contact@offmarketofficial.com",
  secondaryLabel,
  primaryClassName = "om-button om-button--primary",
  secondaryClassName = "om-button om-button--secondary",
  locale = "fr",
}: CallbackModalProps) {
  const copy = CALLBACK_COPY[locale] ?? CALLBACK_COPY.fr;
  const resolvedSecondaryLabel = secondaryLabel ?? copy.secondary;
  return (
    <div className="js-modal">
      <div
        className="modal modal--full ui-dark is-hidden"
        id="callback-modal"
        data-plugin="modal"
        data-modal-one-per-page="true"
        role="dialog"
        aria-hidden="true"
        aria-label={copy.dialog}
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
                    aria-label={copy.close}
                  >
                    ×
                  </button>
                  <div className="l-callback row ui-dark px-layout py-layout">
                    <div className="col col--md-12">
                      <p className="h2 leading-trim">
                        {copy.title}
                      </p>
                      <p className="mt-1">
                        {copy.text}
                      </p>
                      <div className="mt-2">
                        <Link href={primaryHref} className={primaryClassName}>
                          {primaryLabel}
                        </Link>
                      </div>
                      <div className="mt-1">
                        <Link href={secondaryHref} className={secondaryClassName}>
                          {resolvedSecondaryLabel}
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
