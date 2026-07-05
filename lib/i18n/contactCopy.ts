import type { SiteLocale } from "@/lib/i18n/types";

export type ContactCopy = {
  skipToMain: string;
  breadcrumbAria: string;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  h1: string;
  intro: string;
  formColumnAria: string;
  infoBrand: string;
  infoCity: string;
  infoText: string;
  trustChips: readonly string[];
  stepLabel: (step: number) => string;
  questions: {
    propertyType: string;
    budget: string;
    objective: string;
  };
  propertyTypes: readonly string[];
  budgets: readonly string[];
  objectives: readonly string[];
  back: string;
  continue: string;
};

const FR: ContactCopy = {
  skipToMain: "Aller au contenu principal",
  breadcrumbAria: "Fil d'Ariane",
  breadcrumbHome: "Accueil",
  breadcrumbCurrent: "Contact",
  h1: "Parlez-nous de votre projet",
  intro:
    "Quelques réponses suffisent pour comprendre ce que vous recherchez et vous orienter vers une sélection plus adaptée.",
  formColumnAria: "Questionnaire de contact",
  infoBrand: "OFF MARKET",
  infoCity: "Marrakech",
  infoText:
    "Réponse privée selon votre projet, votre budget et votre objectif.",
  trustChips: ["Sélection privée", "Achat sur plan", "Villa & appartement"],
  stepLabel: (step) => `Étape ${step} sur 3`,
  questions: {
    propertyType: "Quel type de bien cherchez-vous ?",
    budget: "Quel budget voulez-vous étudier ?",
    objective: "Quel est votre objectif principal ?",
  },
  propertyTypes: [
    "Villa",
    "Appartement",
    "Projet sur plan",
    "Terrain",
    "Riad",
    "Je ne sais pas encore",
  ],
  budgets: [
    "120 000 € – 250 000 €",
    "250 000 € – 350 000 €",
    "350 000 € – 500 000 €",
    "+ 500 000 €",
    "Je veux être conseillé",
  ],
  objectives: [
    "Investir et louer",
    "Acheter pour habiter",
    "Résidence secondaire",
    "Préparer une revente",
    "Trouver une opportunité rare",
    "Je compare encore",
  ],
  back: "Retour",
  continue: "Continuer",
};

const EN: ContactCopy = {
  skipToMain: "Skip to main content",
  breadcrumbAria: "Breadcrumb",
  breadcrumbHome: "Home",
  breadcrumbCurrent: "Contact",
  h1: "Discuss a private real estate project",
  intro:
    "Tell us what you are looking for in Marrakech. Our team will review your request and guide you toward selected opportunities that match your criteria.",
  formColumnAria: "Contact questionnaire",
  infoBrand: "OFF MARKET",
  infoCity: "Marrakech",
  infoText:
    "A private response tailored to your project, budget and objective.",
  trustChips: ["Private selection", "Off-plan", "Villa & apartment"],
  stepLabel: (step) => `Step ${step} of 3`,
  questions: {
    propertyType: "What type of property are you looking for?",
    budget: "What budget would you like to explore?",
    objective: "What is your primary objective?",
  },
  propertyTypes: [
    "Villa",
    "Apartment",
    "Off-plan property",
    "Land",
    "Riad",
    "I'm not sure yet",
  ],
  budgets: [
    "€120,000 – €250,000",
    "€250,000 – €350,000",
    "€350,000 – €500,000",
    "€500,000+",
    "I'd like guidance",
  ],
  objectives: [
    "Invest",
    "Live in",
    "Second home",
    "Rent out",
    "Resell later",
    "Still comparing",
  ],
  back: "Back",
  continue: "Continue",
};

const IT: ContactCopy = {
  skipToMain: "Vai al contenuto principale",
  breadcrumbAria: "Percorso di navigazione",
  breadcrumbHome: "Home",
  breadcrumbCurrent: "Contatto",
  h1: "Parliamo del tuo progetto immobiliare privato",
  intro:
    "Raccontaci cosa stai cercando a Marrakech. Il nostro team analizzerà la tua richiesta e ti guiderà verso opportunità selezionate in linea con i tuoi criteri.",
  formColumnAria: "Questionario di contatto",
  infoBrand: "OFF MARKET",
  infoCity: "Marrakech",
  infoText:
    "Risposta riservata in base al tuo progetto, budget e obiettivo.",
  trustChips: ["Selezione privata", "Su piano", "Villa e appartamento"],
  stepLabel: (step) => `Fase ${step} di 3`,
  questions: {
    propertyType: "Che tipo di immobile stai cercando?",
    budget: "Quale budget vuoi esplorare?",
    objective: "Qual è il tuo obiettivo principale?",
  },
  propertyTypes: [
    "Villa",
    "Appartamento",
    "Progetto su piano",
    "Terreno",
    "Riad",
    "Non lo so ancora",
  ],
  budgets: [
    "120 000 € – 250 000 €",
    "250 000 € – 350 000 €",
    "350 000 € – 500 000 €",
    "+ 500 000 €",
    "Vorrei un consiglio",
  ],
  objectives: [
    "Investire",
    "Abitare",
    "Seconda casa",
    "Affittare",
    "Rivendere in seguito",
    "Sto ancora valutando",
  ],
  back: "Indietro",
  continue: "Avanti",
};

const COPY: Record<SiteLocale, ContactCopy> = {
  fr: FR,
  en: EN,
  it: IT,
  nl: FR,
};

export function getContactCopy(locale?: SiteLocale): ContactCopy {
  return COPY[locale ?? "fr"];
}
