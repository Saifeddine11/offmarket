import type { SiteLocale } from "@/lib/i18n/types";

export type PrivateAccessFormCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  success: string;
  fullName: string;
  fullNamePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  phoneLegend: string;
  countryCodeAria: string;
  phoneNumberAria: string;
  phonePlaceholder: string;
  budget: string;
  budgetHint: string;
  message: string;
  messageOptional: string;
  messagePlaceholder: string;
  submit: string;
  back: string;
  searchSummaryPrefix: string;
  privacyPrefix: string;
  privacyLink: string;
  contactHeaderEyebrow: string;
  contactHeaderTitle: string;
  contactHeaderSubtitle: string;
  contactHeaderHelper: string;
};

const FR: PrivateAccessFormCopy = {
  eyebrow: "ACCÈS PRIVÉ",
  title: "Recevoir ma sélection privée",
  subtitle:
    "Laissez vos coordonnées. Nous vous répondons avec une sélection adaptée à votre budget, votre objectif et le type de bien recherché.",
  success:
    "Votre demande privée a bien été envoyée. Un conseiller OFF MARKET vous contactera prochainement.",
  fullName: "Nom complet",
  fullNamePlaceholder: "Votre nom complet",
  email: "Email",
  emailPlaceholder: "votre@email.com",
  phoneLegend: "Numéro de téléphone",
  countryCodeAria: "Indicatif pays",
  phoneNumberAria: "Numéro",
  phonePlaceholder: "6 00 00 00 00",
  budget: "Budget",
  budgetHint: "Sélectionnez votre budget",
  message: "Message",
  messageOptional: "(optionnel)",
  messagePlaceholder:
    "Votre message, votre projet ou vos critères spécifiques",
  submit: "Envoyer ma demande",
  back: "Retour",
  searchSummaryPrefix: "Votre recherche",
  privacyPrefix:
    "En cliquant sur le bouton, vous acceptez qu'OFF MARKET vous contacte au sujet de votre demande.",
  privacyLink: "Confidentialité",
  contactHeaderEyebrow: "ACCÈS PRIVÉ",
  contactHeaderTitle: "Accéder aux projets off-market",
  contactHeaderSubtitle:
    "Remplissez le formulaire pour recevoir une sélection privée adaptée à votre budget et à votre projet.",
  contactHeaderHelper:
    "Les projets confidentiels ne sont pas publiés en ligne. Notre équipe vous recontacte avec les opportunités disponibles.",
};

const EN: PrivateAccessFormCopy = {
  eyebrow: "PRIVATE ACCESS",
  title: "Receive my private selection",
  subtitle:
    "Leave your details. We will respond with a selection aligned with your budget, objective and property type.",
  success:
    "Your private request has been sent. An OFF MARKET advisor will contact you shortly.",
  fullName: "Full name",
  fullNamePlaceholder: "Your full name",
  email: "Email",
  emailPlaceholder: "your@email.com",
  phoneLegend: "Phone number",
  countryCodeAria: "Country code",
  phoneNumberAria: "Number",
  phonePlaceholder: "6 00 00 00 00",
  budget: "Budget",
  budgetHint: "Select your budget",
  message: "Message",
  messageOptional: "(optional)",
  messagePlaceholder:
    "Your message, project details or specific criteria",
  submit: "Send my request",
  back: "Back",
  searchSummaryPrefix: "Your search",
  privacyPrefix:
    "By clicking the button, you agree that OFF MARKET may contact you about your request.",
  privacyLink: "Privacy policy",
  contactHeaderEyebrow: "PRIVATE ACCESS",
  contactHeaderTitle: "Access off-market projects",
  contactHeaderSubtitle:
    "Complete the form to receive a private selection tailored to your budget and project.",
  contactHeaderHelper:
    "Confidential projects are not published online. Our team will contact you with available opportunities.",
};

const IT: PrivateAccessFormCopy = {
  eyebrow: "ACCESSO PRIVATO",
  title: "Ricevi la mia selezione privata",
  subtitle:
    "Lascia i tuoi dati. Ti rispondiamo con una selezione in linea con budget, obiettivo e tipo di immobile.",
  success:
    "La tua richiesta privata è stata inviata. Un advisor OFF MARKET ti contatterà a breve.",
  fullName: "Nome completo",
  fullNamePlaceholder: "Il tuo nome completo",
  email: "Indirizzo email",
  emailPlaceholder: "tua@email.com",
  phoneLegend: "Numero di telefono",
  countryCodeAria: "Prefisso internazionale",
  phoneNumberAria: "Numero",
  phonePlaceholder: "6 00 00 00 00",
  budget: "Budget",
  budgetHint: "Seleziona il tuo budget",
  message: "Messaggio",
  messageOptional: "(facoltativo)",
  messagePlaceholder:
    "Il tuo messaggio, progetto o criteri specifici",
  submit: "Invia la mia richiesta",
  back: "Indietro",
  searchSummaryPrefix: "La tua ricerca",
  privacyPrefix:
    "Cliccando sul pulsante, accetti che OFF MARKET ti contatti in merito alla tua richiesta.",
  privacyLink: "Informativa privacy",
  contactHeaderEyebrow: "ACCESSO PRIVATO",
  contactHeaderTitle: "Accedi ai progetti off-market",
  contactHeaderSubtitle:
    "Compila il modulo per ricevere una selezione privata in linea con budget e progetto.",
  contactHeaderHelper:
    "I progetti riservati non sono pubblicati online. Il nostro team ti ricontatterà con le opportunità disponibili.",
};

const NL: PrivateAccessFormCopy = {
  eyebrow: "PRIVÉTOEGANG",
  title: "Ontvang mijn private selectie",
  subtitle:
    "Laat uw gegevens achter. Wij antwoorden met een selectie die aansluit bij uw budget, doelstelling en het type vastgoed dat u zoekt.",
  success:
    "Uw private aanvraag is verzonden. Een OFF MARKET-adviseur neemt binnenkort contact met u op.",
  fullName: "Volledige naam",
  fullNamePlaceholder: "Uw volledige naam",
  email: "E-mail",
  emailPlaceholder: "uw@email.com",
  phoneLegend: "Telefoonnummer",
  countryCodeAria: "Landcode",
  phoneNumberAria: "Nummer",
  phonePlaceholder: "6 00 00 00 00",
  budget: "Budget",
  budgetHint: "Selecteer uw budget",
  message: "Bericht",
  messageOptional: "(optioneel)",
  messagePlaceholder:
    "Uw bericht, project of specifieke criteria",
  submit: "Verstuur mijn aanvraag",
  back: "Terug",
  searchSummaryPrefix: "Uw zoekopdracht",
  privacyPrefix:
    "Door op de knop te klikken, stemt u ermee in dat OFF MARKET contact met u opneemt over uw aanvraag.",
  privacyLink: "Privacy",
  contactHeaderEyebrow: "PRIVÉTOEGANG",
  contactHeaderTitle: "Toegang tot off-market projecten",
  contactHeaderSubtitle:
    "Vul het formulier in om een private selectie te ontvangen die past bij uw budget en project.",
  contactHeaderHelper:
    "Vertrouwelijke projecten worden niet online gepubliceerd. Ons team neemt contact met u op met beschikbare kansen.",
};

const ES: PrivateAccessFormCopy = {
  eyebrow: "ACCESO PRIVADO",
  title: "Recibir mi selección privada",
  subtitle:
    "Déjenos sus datos. Le responderemos con una selección adaptada a su presupuesto, su objetivo y el tipo de propiedad que busca.",
  success:
    "Su solicitud privada ha sido enviada. Un asesor OFF MARKET le contactará en breve.",
  fullName: "Nombre completo",
  fullNamePlaceholder: "Su nombre completo",
  email: "Correo electrónico",
  emailPlaceholder: "su@email.com",
  phoneLegend: "Número de teléfono",
  countryCodeAria: "Prefijo del país",
  phoneNumberAria: "Número",
  phonePlaceholder: "6 00 00 00 00",
  budget: "Presupuesto",
  budgetHint: "Seleccione su presupuesto",
  message: "Mensaje",
  messageOptional: "(opcional)",
  messagePlaceholder:
    "Su mensaje, su proyecto o sus criterios específicos",
  submit: "Enviar mi solicitud",
  back: "Atrás",
  searchSummaryPrefix: "Su búsqueda",
  privacyPrefix:
    "Al hacer clic en el botón, acepta que OFF MARKET contacte con usted sobre su solicitud.",
  privacyLink: "Privacidad",
  contactHeaderEyebrow: "ACCESO PRIVADO",
  contactHeaderTitle: "Acceder a los proyectos off-market",
  contactHeaderSubtitle:
    "Complete el formulario para recibir una selección privada adaptada a su presupuesto y a su proyecto.",
  contactHeaderHelper:
    "Los proyectos confidenciales no se publican en línea. Nuestro equipo le contactará con las oportunidades disponibles.",
};

const NO: PrivateAccessFormCopy = {
  eyebrow: "PRIVAT TILGANG",
  title: "Motta min private utvelgelse",
  subtitle:
    "Legg igjen kontaktopplysningene dine. Vi svarer med et utvalg tilpasset budsjettet, målet og boligtypen du ser etter.",
  success:
    "Din private forespørsel er sendt. En OFF MARKET-rådgiver kontakter deg snart.",
  fullName: "Fullt navn",
  fullNamePlaceholder: "Ditt fulle navn",
  email: "E-post",
  emailPlaceholder: "din@email.com",
  phoneLegend: "Telefonnummer",
  countryCodeAria: "Landskode",
  phoneNumberAria: "Nummer",
  phonePlaceholder: "6 00 00 00 00",
  budget: "Budsjett",
  budgetHint: "Velg budsjett",
  message: "Melding",
  messageOptional: "(valgfritt)",
  messagePlaceholder:
    "Meldingen din, prosjektet ditt eller spesifikke kriterier",
  submit: "Send forespørselen",
  back: "Tilbake",
  searchSummaryPrefix: "Ditt søk",
  privacyPrefix:
    "Ved å klikke på knappen godtar du at OFF MARKET kontakter deg om forespørselen din.",
  privacyLink: "Personvern",
  contactHeaderEyebrow: "PRIVAT TILGANG",
  contactHeaderTitle: "Få tilgang til off-market-prosjekter",
  contactHeaderSubtitle:
    "Fyll ut skjemaet for å motta et privat utvalg tilpasset budsjettet og prosjektet ditt.",
  contactHeaderHelper:
    "Konfidensielle prosjekter publiseres ikke på nett. Teamet vårt kontakter deg med tilgjengelige muligheter.",
};

const COPY: Record<SiteLocale, PrivateAccessFormCopy> = {
  fr: FR,
  en: EN,
  es: ES,
  it: IT,
  nl: NL,
  no: NO,
};

export function getFormCopy(locale?: SiteLocale): PrivateAccessFormCopy {
  return COPY[locale ?? "fr"];
}
