export type HomeFaqItem = {
  question: string;
  answer: string;
};

import type { SiteLocale } from "@/lib/i18n/types";

export const HOME_FAQ_SECTION_ID = "faq";
export const HOME_FAQ_TITLE_ID = "home-faq-title";

const HOME_FAQ_COPY = {
  fr: [
    ["Acheter sur plan à Marrakech est-il vraiment sécurisé ?", "Acheter sur plan peut être intéressant, mais seulement si le projet est bien vérifié. Avant de réserver, il faut analyser le promoteur, les autorisations, les plans, le calendrier de livraison, les modalités de paiement, les matériaux annoncés et les garanties disponibles. Le risque ne vient pas du sur plan en lui-même, mais d’un projet mal étudié ou mal documenté."],
    ["Que signifie S.A.F.E avant la présentation d’un projet ?", "S.A.F.E. — Security, Analysis, Fidelity & Expert Guidance est une méthode indépendante d’analyse, de présélection et de sécurisation immobilière destinée à renforcer la protection et la compréhension des acheteurs et des investisseurs. OFF MARKET n’est pas propriétaire de S.A.F.E. et n’en revendique pas la création. OFF MARKET respecte et applique les principes S.A.F.E. dans son processus d’étude et de présentation des opportunités immobilières. S.A.F.E. constitue un cadre indépendant d’analyse et de sécurisation immobilière. Son application ne remplace pas les vérifications juridiques, notariales, techniques, fiscales ou financières nécessaires avant toute acquisition et ne garantit pas l’absence totale de risque."],
    ["Villa sur plan ou appartement neuf à Marrakech : que choisir ?", "Une villa sur plan convient mieux aux acheteurs qui recherchent de l’espace, un jardin, une piscine, plus d’intimité et une logique patrimoniale. Un appartement neuf à Marrakech convient davantage à un usage central, locatif ou pied-à-terre, surtout dans des zones comme Guéliz ou l’Hivernage. Le bon choix dépend du budget, de l’usage prévu et du quartier."],
    ["Quels documents vérifier avant de réserver un projet immobilier sur plan ?", "Avant de réserver, il faut demander les plans, les autorisations, le titre ou les éléments juridiques du terrain, le descriptif des prestations, les modalités de paiement, le calendrier de livraison, les conditions de réservation et les garanties prévues. Un projet sérieux doit pouvoir présenter un dossier clair avant toute décision."],
    ["Pourquoi OFF MARKET ne présente pas tous les projets disponibles ?", "OFF MARKET ne présente pas un projet simplement parce qu’il est disponible ou attractif visuellement. Chaque opportunité doit être étudiée selon son emplacement, son promoteur, son dossier, ses prestations, son prix et sa cohérence avec le marché. L’objectif est de présenter moins de projets, mais des projets mieux filtrés."],
    ["C’est quoi l’immobilier off-market à Marrakech ?", "L’immobilier off-market désigne des biens ou projets qui ne sont pas toujours publiés largement en ligne. À Marrakech, cela peut concerner des villas, appartements, terrains, riads, commerces ou projets sur plan accessibles sur demande. L’intérêt est d’accéder à une sélection plus confidentielle, souvent avant une diffusion plus large."],
  ],
  en: [
    ["Is buying off-plan in Marrakech really secure?", "Buying off-plan can be worthwhile, but only when the project is properly reviewed. Before reserving, assess the developer, authorisations, plans, delivery schedule, payment terms, stated materials and available guarantees. The risk does not come from off-plan buying itself, but from a project that has been poorly studied or documented."],
    ["What does S.A.F.E. mean before a project is presented?", "S.A.F.E. — Security, Analysis, Fidelity & Expert Guidance is an independent real-estate analysis, pre-selection and security framework designed to strengthen the protection and understanding of buyers and investors. OFF MARKET does not own S.A.F.E. and does not claim to have created it. OFF MARKET follows and applies S.A.F.E. principles when reviewing and presenting real-estate opportunities. S.A.F.E. is independent and is not an official government certification. Its application does not replace the legal, notarial, technical, tax or financial checks required before an acquisition and does not guarantee the complete absence of risk."],
    ["Off-plan villa or new apartment in Marrakech: which should you choose?", "An off-plan villa is better suited to buyers seeking space, a garden, a pool, greater privacy and a long-term asset logic. A new apartment in Marrakech may be better for central living, rental use or a pied-à-terre, especially in areas such as Guéliz or Hivernage. The right choice depends on budget, intended use and neighbourhood."],
    ["Which documents should you check before reserving an off-plan project?", "Before reserving, request the plans, authorisations, title or legal elements relating to the land, specifications, payment terms, delivery schedule, reservation conditions and stated guarantees. A serious project should be able to provide a clear file before any decision is made."],
    ["Why does OFF MARKET not present every available project?", "OFF MARKET does not present a project simply because it is available or visually attractive. Each opportunity is reviewed according to its location, developer, file, specifications, price and consistency with the market. The aim is to present fewer projects, but projects that have been filtered more carefully."],
    ["What is off-market real estate in Marrakech?", "Off-market real estate refers to properties or projects that are not always broadly published online. In Marrakech, this can include villas, apartments, land, riads, commercial properties or off-plan projects available on request. The benefit is access to a more confidential selection, often before wider distribution."],
  ],
  it: [
    ["L'acquisto di un immobile su progetto a Marrakech è davvero sicuro?", "L'acquisto su progetto può essere interessante, ma solo se il progetto viene verificato con metodo. Prima di prenotare, occorre analizzare il promotore, le autorizzazioni, i piani, il calendario di consegna, le modalità di pagamento, i materiali indicati e le garanzie disponibili. Il rischio non deriva dall'acquisto su progetto in sé, ma da un progetto studiato o documentato in modo insufficiente."],
    ["Che cosa significa S.A.F.E. prima della presentazione di un progetto?", "S.A.F.E. — Security, Analysis, Fidelity & Expert Guidance è un metodo indipendente di analisi, preselezione e tutela immobiliare. OFF MARKET segue e applica i suoi principi nella valutazione e nella presentazione delle opportunità. OFF MARKET non possiede S.A.F.E. e non ne rivendica la creazione. S.A.F.E. non è una certificazione ufficiale del governo. La sua applicazione non sostituisce le verifiche legali, notarili, tecniche, fiscali o finanziarie necessarie prima di un acquisto e non garantisce l'assenza totale di rischi."],
    ["Villa su progetto o appartamento nuovo a Marrakech: cosa scegliere?", "Una villa su progetto è più adatta a chi cerca spazio, giardino, piscina, maggiore privacy e una logica patrimoniale di lungo periodo. Un appartamento nuovo a Marrakech può essere più indicato per un uso centrale, locativo o come pied-à-terre, soprattutto in zone come Guéliz o Hivernage. La scelta dipende dal budget, dall'uso previsto e dal quartiere."],
    ["Quali documenti verificare prima di prenotare un progetto immobiliare?", "Prima di prenotare, è opportuno richiedere i piani, le autorizzazioni, il titolo o gli elementi giuridici del terreno, il capitolato, le modalità di pagamento, il calendario di consegna, le condizioni di prenotazione e le garanzie previste. Un progetto serio deve poter presentare un dossier chiaro prima di qualsiasi decisione."],
    ["Perché OFF MARKET non presenta tutti i progetti disponibili?", "OFF MARKET non presenta un progetto solo perché è disponibile o visivamente attraente. Ogni opportunità viene valutata secondo posizione, promotore, dossier, dotazioni, prezzo e coerenza con il mercato. L'obiettivo è presentare meno progetti, ma progetti filtrati con maggiore attenzione."],
    ["Che cos'è il settore immobiliare off-market a Marrakech?", "L'immobiliare off-market comprende beni o progetti che non vengono sempre pubblicati ampiamente online. A Marrakech può riguardare ville, appartamenti, terreni, riad, attività commerciali o progetti su progetto accessibili su richiesta. Il vantaggio è accedere a una selezione più riservata, spesso prima di una diffusione più ampia."],
  ],
  nl: [
    ["Is kopen in nieuwbouw in Marrakech echt veilig?", "Kopen in nieuwbouw kan interessant zijn, maar alleen wanneer het project zorgvuldig wordt gecontroleerd. Beoordeel vóór u reserveert de ontwikkelaar, vergunningen, plannen, opleverplanning, betalingsvoorwaarden, aangekondigde materialen en beschikbare garanties. Het risico zit niet in nieuwbouw zelf, maar in een project dat onvoldoende is onderzocht of gedocumenteerd."],
    ["Wat betekent S.A.F.E. voordat een project wordt gepresenteerd?", "S.A.F.E. — Security, Analysis, Fidelity & Expert Guidance is een onafhankelijke methode voor vastgoedanalyse, voorselectie en risicobeheersing. OFF MARKET volgt en past de principes toe bij de beoordeling en presentatie van vastgoedkansen. OFF MARKET is geen eigenaar van S.A.F.E. en beweert niet de methode te hebben ontwikkeld. S.A.F.E. is geen officiële overheidscertificering. De toepassing ervan vervangt niet de juridische, notariële, technische, fiscale of financiële controles die vóór aankoop nodig zijn en garandeert niet dat elk risico is uitgesloten."],
    ["Nieuwbouwvilla of nieuw appartement in Marrakech: wat kiest u?", "Een nieuwbouwvilla past beter bij kopers die ruimte, een tuin, een zwembad, meer privacy en een patrimoniale logica zoeken. Een nieuw appartement in Marrakech is geschikter voor centraal wonen, verhuur of een pied-à-terre, vooral in zones zoals Guéliz of Hivernage. De juiste keuze hangt af van budget, gebruik en wijk."],
    ["Welke documenten controleert u vóór u een nieuwbouwproject reserveert?", "Vraag vóór de reservering de plannen, vergunningen, titel of juridische elementen van de grond, het technisch bestek, betalingsvoorwaarden, opleverplanning, reserveringsvoorwaarden en voorziene garanties op. Een ernstig project moet vóór elke beslissing een duidelijk dossier kunnen voorleggen."],
    ["Waarom presenteert OFF MARKET niet elk beschikbaar project?", "OFF MARKET presenteert een project niet alleen omdat het beschikbaar of visueel aantrekkelijk is. Elke kans wordt beoordeeld volgens ligging, ontwikkelaar, dossier, voorzieningen, prijs en samenhang met de markt. Het doel is minder projecten te presenteren, maar projecten die zorgvuldiger zijn gefilterd."],
    ["Wat is off-market vastgoed in Marrakech?", "Off-market vastgoed verwijst naar panden of projecten die niet altijd breed online worden gepubliceerd. In Marrakech kan het gaan om villa's, appartementen, grond, riads, commerciële panden of nieuwbouwprojecten die op aanvraag beschikbaar zijn. Het voordeel is toegang tot een meer vertrouwelijke selectie, vaak vóór een bredere verspreiding."],
  ],
} satisfies Record<SiteLocale, [string, string][]>;

export function getHomeFaqItems(locale: SiteLocale = "fr"): HomeFaqItem[] {
  return HOME_FAQ_COPY[locale].map(([question, answer]) => ({ question, answer }));
}

export const HOME_FAQ_ITEMS = getHomeFaqItems("fr");

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildHomeFaqHtml(locale: SiteLocale = "fr"): string {
  const items = getHomeFaqItems(locale);
  const copy = {
    fr: ["Acheter sur plan à Marrakech", "Les questions essentielles avant d’étudier une villa, un appartement neuf ou un projet immobilier présenté par OFF MARKET."],
    en: ["Buying real estate in Marrakech", "The essential questions before studying a villa, new apartment or real-estate project presented by OFF MARKET."],
    it: ["Acquistare a Marrakech", "Le domande essenziali prima di studiare una villa, un appartamento nuovo o un progetto immobiliare presentato da OFF MARKET."],
    nl: ["Vastgoed kopen in Marrakech", "De essentiële vragen voordat u een villa, nieuw appartement of vastgoedproject van OFF MARKET bestudeert."],
  }[locale];
  const itemsHtml = items.map((item, index) => {
    const buttonId = `home-faq-button-${index}`;
    const panelId = `home-faq-panel-${index}`;

    return `
      <div class="om-home-faq__item" data-open="false">
        <h3 class="om-home-faq__heading">
          <button
            id="${buttonId}"
            type="button"
            class="om-home-faq__trigger"
            aria-expanded="false"
            aria-controls="${panelId}"
            data-home-faq-trigger
          >
            <span class="om-home-faq__question">${escapeHtml(item.question)}</span>
            <span class="om-home-faq__toggle" aria-hidden="true">+</span>
          </button>
        </h3>

        <div
          id="${panelId}"
          role="region"
          aria-labelledby="${buttonId}"
          aria-hidden="true"
          class="om-home-faq__panel"
          style="height:0;opacity:0;overflow:hidden"
        >
          <div class="om-home-faq__panel-inner">
            <p>${escapeHtml(item.answer)}</p>
          </div>
        </div>
      </div>`;
  }).join("");

  return `
<section
  class="om-home-faq"
  id="${HOME_FAQ_SECTION_ID}"
  aria-labelledby="${HOME_FAQ_TITLE_ID}"
  data-scroll-section
>
  <div class="om-home-faq__inner">
    <header class="om-home-faq__header">
      <span class="om-home-faq__eyebrow">FAQ</span>
      <h2 id="${HOME_FAQ_TITLE_ID}" class="om-home-faq__title">${escapeHtml(copy[0])}</h2>
      <p class="om-home-faq__subtitle">${escapeHtml(copy[1])}</p>
    </header>

    <div class="om-home-faq__list">
      ${itemsHtml}
    </div>
  </div>
</section>`;
}

export const HOME_FAQ_STYLES = `
.om-home-faq {
  position: relative;
  padding: clamp(88px, 10vw, 144px) 0;
  background: var(--om-white);
  color: #11120d;
  overflow: hidden;
}

.om-home-faq__inner {
  width: min(calc(100vw - 48px), 1360px);
  margin: 0 auto;
}

.om-home-faq__header {
  max-width: 56rem;
  margin: 0 0 clamp(28px, 4vw, 48px);
}

.om-home-faq__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  font-family: var(--om-font-body);
  font-size: 13px;
  line-height: 1;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(17, 18, 13, 0.68);
}

.om-home-faq__eyebrow::before {
  content: "";
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: #565449;
  flex: 0 0 auto;
}

.om-home-faq__title {
  margin: 12px 0 0;
  font-family: var(--om-font-heading);
  font-size: clamp(44px, 5.4vw, 86px);
  line-height: 0.94;
  font-weight: 500;
  letter-spacing: -0.075em;
  color: #11120d;
  text-wrap: balance;
}

.om-home-faq__subtitle {
  max-width: 58ch;
  margin: 1rem 0 0;
  font-family: var(--om-font-body);
  font-size: clamp(17px, 1.45vw, 22px);
  line-height: 1.55;
  color: rgba(17, 18, 13, 0.62);
  text-wrap: balance;
}

.om-home-faq__list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.om-home-faq__item {
  border: 0;
  border-radius: 999px;
  background: #f4f4f3;
  overflow: hidden;
  transition:
    border-radius 260ms cubic-bezier(0.22, 1, 0.36, 1),
    background 220ms ease;
}

.om-home-faq__item[data-open="true"] {
  border-radius: 28px;
}

.om-home-faq__heading {
  margin: 0;
}

.om-home-faq__trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 18px clamp(20px, 2.2vw, 28px);
  border: 0;
  background: transparent;
  color: inherit;
  text-align: left;
  font: inherit;
  cursor: pointer;
}

.om-home-faq__trigger:focus-visible {
  outline: 2px solid #565449;
  outline-offset: 4px;
  border-radius: 999px;
}

.om-home-faq__question {
  flex: 1 1 auto;
  margin: 0;
  font-family: var(--om-font-body);
  font-size: clamp(16px, 1.2vw, 20px);
  line-height: 1.35;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: #11120d;
}

.om-home-faq__toggle {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  font-family: var(--om-font-body);
  font-size: 20px;
  line-height: 1;
  font-weight: 400;
  color: rgba(17, 18, 13, 0.72);
  transition: transform 220ms ease, color 220ms ease;
}

.om-home-faq__item[data-open="true"] .om-home-faq__toggle {
  transform: rotate(45deg);
  color: #11120d;
}

.om-home-faq__panel {
  overflow: hidden;
  transition: height 260ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 220ms ease;
}

.om-home-faq__panel-inner {
  max-width: 80ch;
  padding: 0 clamp(20px, 2.2vw, 28px) 20px;
  color: rgba(17, 18, 13, 0.72);
  font-family: var(--om-font-body);
  font-size: clamp(15px, 1.05vw, 17px);
  line-height: 1.7;
  letter-spacing: -0.012em;
}

.om-home-faq__panel-inner p {
  margin: 0;
}

@media (max-width: 767px) {
  .om-home-faq__inner {
    width: min(calc(100vw - 32px), 1360px);
  }

  .om-home-faq__header {
    margin-bottom: 24px;
  }

  .om-home-faq__trigger {
    padding: 16px 18px;
    gap: 16px;
  }

  .om-home-faq__item[data-open="true"] {
    border-radius: 22px;
  }

  .om-home-faq__toggle {
    width: 24px;
    height: 24px;
    font-size: 18px;
  }

  .om-home-faq__panel-inner {
    padding: 0 18px 16px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .om-home-faq__panel,
  .om-home-faq__toggle {
    transition: none;
  }
}
`;

export function buildHomeFaqJsonLd(locale: SiteLocale = "fr"): string {
  const items = getHomeFaqItems(locale);
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  });
}
