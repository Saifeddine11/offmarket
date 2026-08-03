import type { LeadFormContextValues } from "@/lib/forms/leadFormTypes";
import { getFormCopy } from "@/lib/i18n/formCopy";
import type { SiteLocale } from "@/lib/i18n/types";

type PrivateAccessFormProps = {
  intent: string;
  intentMode?: "fixed" | "from-url";
  showContactHeader?: boolean;
  variant?: "default" | "embedded";
  contextValues?: LeadFormContextValues;
  showMessage?: boolean;
  locale?: SiteLocale;
  source?: string;
  context?: string;
  compact?: boolean;
  onBack?: () => void;
};

const SUBMIT_ARROW_ICON = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M7 17 17 7M9 7h8v8"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const HONEYPOT_LABELS: Record<SiteLocale, string> = {
  fr: "Site web de l'entreprise",
  en: "Company website",
  es: "Sitio web de la empresa",
  it: "Sito web aziendale",
  nl: "Bedrijfswebsite",
  no: "Bedriftens nettsted",
};

export function PrivateAccessForm({
  intent,
  intentMode = "fixed",
  showContactHeader = false,
  variant = "default",
  contextValues,
  showMessage = false,
  locale = "fr",
  source,
  context,
  compact = false,
  onBack,
}: PrivateAccessFormProps) {
  const copy = getFormCopy(locale);
  const formClassName = [
    "om-private-access-form",
    variant === "embedded" ? "om-private-access-form--embedded" : "",
    onBack ? "om-private-access-form--questionnaire-final" : "",
    compact ? "om-private-access-form--compact" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const leadSource = source ?? contextValues?.source;
  const leadContext = context ?? contextValues?.context;
  const privacyHref =
    locale === "en"
      ? "/en/privacy-policy/"
      : locale === "es"
        ? "/es/politica-de-privacidad/"
      : locale === "nl"
        ? "/nl/privacybeleid/"
        : locale === "no"
          ? "/no/personvernerklaering/"
        : locale === "it"
          ? "/it/privacy-policy/"
          : "/privacy-policy/";

  return (
    <form
      className={formClassName}
      action="/api/leads/"
      method="post"
      data-private-access-form
      data-form-intent={intentMode === "from-url" ? "from-url" : intent}
      data-form-locale={locale}
      data-lead-source={leadSource}
      data-lead-context={leadContext}
      noValidate
    >
      <input type="hidden" name="intent" value={intent} data-private-intent />

      {/* Honeypot — visually hidden, ignored by assistive tech */}
      <label className="om-private-access-form__label--sr" aria-hidden="true">
        <span>{HONEYPOT_LABELS[locale]}</span>
        <input
          type="text"
          name="companyWebsite"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </label>

      {contextValues?.propertyType ? (
        <input
          type="hidden"
          name="contextPropertyType"
          value={contextValues.propertyType}
          data-contact-context
        />
      ) : null}

      {contextValues?.budget ? (
        <input
          type="hidden"
          name="contextBudget"
          value={contextValues.budget}
          data-contact-context
        />
      ) : null}

      {contextValues?.objective ? (
        <input
          type="hidden"
          name="contextObjective"
          value={contextValues.objective}
          data-contact-context
        />
      ) : null}

      {leadSource ? (
        <input
          type="hidden"
          name="leadSource"
          value={leadSource}
          data-lead-source-field
        />
      ) : null}

      {leadContext ? (
        <input
          type="hidden"
          name="leadContext"
          value={leadContext}
          data-lead-context-field
        />
      ) : null}

      {showContactHeader ? (
        <header className="om-private-access-form__header">
          <p className="om-private-access-form__eyebrow">{copy.contactHeaderEyebrow}</p>
          <h2 className="om-private-access-form__title">{copy.contactHeaderTitle}</h2>
          <p className="om-private-access-form__subtitle">{copy.contactHeaderSubtitle}</p>
          <p className="om-private-access-form__helper">{copy.contactHeaderHelper}</p>
        </header>
      ) : null}

      <div className="om-private-access-form__grid om-private-access-form__grid--split">
        <label className="om-private-access-form__field">
          <span className="om-private-access-form__label">{copy.fullName}</span>
          <input
            className="om-private-access-form__input"
            type="text"
            name="fullName"
            autoComplete="name"
            required
            placeholder={copy.fullNamePlaceholder}
          />
        </label>
        <label className="om-private-access-form__field">
          <span className="om-private-access-form__label">{copy.email}</span>
          <input
            className="om-private-access-form__input"
            type="email"
            name="email"
            autoComplete="email"
            required
            placeholder={copy.emailPlaceholder}
          />
        </label>
      </div>

      <fieldset className="om-private-access-form__phone">
        <legend className="om-private-access-form__label">{copy.phoneLegend}</legend>
        <div className="om-private-access-form__phone-row">
          <label className="om-private-access-form__field om-private-access-form__field--code">
            <span className="om-private-access-form__label om-private-access-form__label--sr">
              {copy.countryCodeAria}
            </span>
            <span className="om-private-access-form__select-wrap">
              <select
                className="om-private-access-form__select"
                name="countryCode"
                data-private-country
                required
                aria-label={copy.countryCodeAria}
                suppressHydrationWarning
                dangerouslySetInnerHTML={{ __html: "" }}
              />
            </span>
          </label>
          <label className="om-private-access-form__field om-private-access-form__field--phone">
            <span className="om-private-access-form__label om-private-access-form__label--sr">
              {copy.phoneNumberAria}
            </span>
            <input
              className="om-private-access-form__input"
              type="tel"
              name="phone"
              autoComplete="tel-national"
              inputMode="tel"
              required
              placeholder={copy.phonePlaceholder}
            />
          </label>
        </div>
      </fieldset>

      {showMessage ? (
        <label className="om-private-access-form__field">
          <span className="om-private-access-form__label">
            {copy.message}{" "}
            <span className="om-private-access-form__optional">{copy.messageOptional}</span>
          </span>
          <textarea
            className="om-private-access-form__textarea"
            name="message"
            rows={4}
            placeholder={copy.messagePlaceholder}
          />
        </label>
      ) : null}

      <p
        className="om-private-access-form__status"
        data-private-status
        aria-live="polite"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: "" }}
      />

      <div className="om-private-access-form__actions">
        <div className="om-private-access-form__toolbar">
          {onBack ? (
            <button
              type="button"
              className="om-private-access-form__back"
              onClick={onBack}
            >
              {copy.back}
            </button>
          ) : (
            <span aria-hidden="true" />
          )}
          <button
            className="om-private-access-form__submit"
            type="submit"
            aria-busy="false"
          >
            <span>{copy.submit}</span>
            {onBack ? (
              <span className="om-private-access-form__submit-icon">{SUBMIT_ARROW_ICON}</span>
            ) : null}
          </button>
        </div>
        <p className="om-private-access-form__privacy">
          {copy.privacyPrefix}{" "}
          <a href={privacyHref}>{copy.privacyLink}</a>
        </p>
      </div>
    </form>
  );
}
