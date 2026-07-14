import { PageFinalCtaMotion } from "@/components/motion/PageFinalCtaMotion";
import type { SiteLocale } from "@/lib/i18n/types";

const LEGAL_COPY = {
  fr: {
    eyebrow: "INFORMATIONS LÉGALES",
    title: "Mentions légales",
    activity: "Immobilier privé à Marrakech",
    phoneLabel: "Téléphone",
    phone: "Contact OFF MARKET",
    intro:
      "Ce site présente une sélection privée d'opportunités immobilières à Marrakech. Les informations affichées sont indicatives et ne constituent pas une offre contractuelle.",
    privacyTitle: "Données personnelles",
    privacyText:
      "Les informations transmises via les formulaires de contact sont utilisées uniquement pour répondre aux demandes des utilisateurs.",
    cookiesTitle: "Cookies",
    cookiesText:
      "Le site peut utiliser des cookies techniques nécessaires au bon fonctionnement de l'expérience.",
    contactTitle: "Contact",
    contactTextBefore:
      "Pour toute demande relative au site ou à vos données, vous pouvez écrire à",
  },
  en: {
    eyebrow: "LEGAL INFORMATION",
    title: "Legal notice",
    activity: "Private real estate in Marrakech",
    phoneLabel: "Phone",
    phone: "Contact OFF MARKET",
    intro:
      "This site presents a private selection of real estate opportunities in Marrakech. The information displayed is indicative and does not constitute a contractual offer.",
    privacyTitle: "Personal data",
    privacyText:
      "Information submitted through the contact forms is used only to respond to user requests.",
    cookiesTitle: "Cookies",
    cookiesText:
      "The site may use technical cookies required for the proper functioning of the experience.",
    contactTitle: "Contact",
    contactTextBefore:
      "For any request relating to the site or your data, you can write to",
  },
  it: {
    eyebrow: "INFORMAZIONI LEGALI",
    title: "Note legali",
    activity: "Immobiliare privato a Marrakech",
    phoneLabel: "Telefono",
    phone: "Contattare OFF MARKET",
    intro:
      "Questo sito presenta una selezione privata di opportunità immobiliari a Marrakech. Le informazioni visualizzate sono indicative e non costituiscono un'offerta contrattuale.",
    privacyTitle: "Dati personali",
    privacyText:
      "Le informazioni inviate tramite i moduli di contatto sono utilizzate esclusivamente per rispondere alle richieste degli utenti.",
    cookiesTitle: "Cookie",
    cookiesText:
      "Il sito può utilizzare cookie tecnici necessari al corretto funzionamento dell'esperienza.",
    contactTitle: "Contatto",
    contactTextBefore:
      "Per qualsiasi richiesta relativa al sito o ai tuoi dati, puoi scrivere a",
  },
  nl: {
    eyebrow: "JURIDISCHE INFORMATIE",
    title: "Wettelijke vermeldingen",
    activity: "Discreet geselecteerd vastgoed in Marrakech",
    phoneLabel: "Telefoon",
    phone: "Contacteer OFF MARKET",
    intro:
      "Deze site presenteert een private selectie van vastgoedkansen in Marrakech. De weergegeven informatie is indicatief en vormt geen contractueel aanbod.",
    privacyTitle: "Persoonsgegevens",
    privacyText:
      "Informatie die via de contactformulieren wordt verzonden, wordt alleen gebruikt om op aanvragen van gebruikers te reageren.",
    cookiesTitle: "Cookies",
    cookiesText:
      "De site kan technische cookies gebruiken die nodig zijn voor de goede werking van de ervaring.",
    contactTitle: "Contact",
    contactTextBefore:
      "Voor elke aanvraag over de site of uw gegevens kunt u schrijven naar",
  },
} satisfies Record<SiteLocale, Record<string, string>>;

export function LegalPageContent({ locale = "fr" }: { locale?: SiteLocale }) {
  const copy = LEGAL_COPY[locale] ?? LEGAL_COPY.fr;
  return (
    <main
      id="main"
      className="om-legal-page"
      style={{
        maxWidth: "760px",
        margin: "0 auto",
        padding:
          "clamp(6rem, 10vw, 10rem) clamp(1.5rem, 5vw, 3rem) clamp(4rem, 7vw, 7rem)",
      }}
    >
      <header style={{ marginBottom: "3rem" }}>
        <span
          className="om-eyebrow"
          style={{ display: "block", marginBottom: "1.25rem" }}
        >
          {copy.eyebrow}
        </span>
        <h1
          style={{
            fontFamily: "var(--om-font-heading)",
            fontWeight: 500,
            letterSpacing: "var(--om-letter-tight)",
            color: "var(--om-ruby-950)",
            margin: 0,
          }}
        >
          {copy.title}
        </h1>
      </header>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2
          style={{
            fontFamily: "var(--om-font-heading)",
            fontWeight: 650,
            color: "var(--om-ruby-950)",
            margin: "0 0 0.75rem",
            letterSpacing: "-0.02em",
          }}
        >
          OFF MARKET
        </h2>
        <p
          style={{
            fontFamily: "var(--om-font-body)",
            lineHeight: 1.6,
            color: "rgba(86, 84, 73, 0.72)",
            margin: "0 0 0.4rem",
          }}
        >
          {copy.activity}
        </p>
        <p
          style={{
            fontFamily: "var(--om-font-body)",
            lineHeight: 1.6,
            color: "rgba(86, 84, 73, 0.72)",
            margin: "0 0 0.4rem",
          }}
        >
          Email :{" "}
          <a
            href="mailto:contact@offmarketofficial.com"
            style={{ color: "var(--om-ruby-800)" }}
          >
            contact@offmarketofficial.com
          </a>
        </p>
        <p
          style={{
            fontFamily: "var(--om-font-body)",
            lineHeight: 1.6,
            color: "rgba(86, 84, 73, 0.72)",
            margin: 0,
          }}
        >
          {copy.phoneLabel} : {copy.phone}
        </p>
      </section>

      <section style={{ marginBottom: "2.5rem" }}>
        <p
          style={{
            fontFamily: "var(--om-font-body)",
            lineHeight: 1.65,
            color: "rgba(86, 84, 73, 0.72)",
            margin: 0,
          }}
        >
          {copy.intro}
        </p>
      </section>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2
          style={{
            fontFamily: "var(--om-font-heading)",
            fontWeight: 650,
            color: "var(--om-ruby-950)",
            margin: "0 0 0.75rem",
            letterSpacing: "-0.02em",
          }}
        >
          {copy.privacyTitle}
        </h2>
        <p
          style={{
            fontFamily: "var(--om-font-body)",
            lineHeight: 1.65,
            color: "rgba(86, 84, 73, 0.72)",
            margin: 0,
          }}
        >
          {copy.privacyText}
        </p>
      </section>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2
          style={{
            fontFamily: "var(--om-font-heading)",
            fontWeight: 650,
            color: "var(--om-ruby-950)",
            margin: "0 0 0.75rem",
            letterSpacing: "-0.02em",
          }}
        >
          {copy.cookiesTitle}
        </h2>
        <p
          style={{
            fontFamily: "var(--om-font-body)",
            lineHeight: 1.65,
            color: "rgba(86, 84, 73, 0.72)",
            margin: 0,
          }}
        >
          {copy.cookiesText}
        </p>
      </section>

      <section>
        <h2
          style={{
            fontFamily: "var(--om-font-heading)",
            fontWeight: 650,
            color: "var(--om-ruby-950)",
            margin: "0 0 0.75rem",
            letterSpacing: "-0.02em",
          }}
        >
          {copy.contactTitle}
        </h2>
        <p
          style={{
            fontFamily: "var(--om-font-body)",
            lineHeight: 1.65,
            color: "rgba(86, 84, 73, 0.72)",
            margin: 0,
          }}
        >
          {copy.contactTextBefore}{" "}
          <a
            href="mailto:contact@offmarketofficial.com"
            style={{ color: "var(--om-ruby-800)" }}
          >
            contact@offmarketofficial.com
          </a>
          .
        </p>
      </section>

      <PageFinalCtaMotion locale={locale} />
    </main>
  );
}
