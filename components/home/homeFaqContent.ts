export type HomeFaqItem = {
  question: string;
  answer: string;
};

export const HOME_FAQ_SECTION_ID = "faq";
export const HOME_FAQ_TITLE_ID = "home-faq-title";

export const HOME_FAQ_ITEMS: HomeFaqItem[] = [
  {
    question: "Acheter sur plan à Marrakech est-il vraiment sécurisé ?",
    answer:
      "Acheter sur plan peut être intéressant, mais seulement si le projet est bien vérifié. Avant de réserver, il faut analyser le promoteur, les autorisations, les plans, le calendrier de livraison, les modalités de paiement, les matériaux annoncés et les garanties disponibles. Le risque ne vient pas du sur plan en lui-même, mais d’un projet mal étudié ou mal documenté.",
  },
  {
    question: "Que signifie S.A.F.E. avant la présentation d’un projet ?",
    answer:
      "S.A.F.E. — Security, Analysis, Fidelity & Expert Guidance est une méthode indépendante d’analyse, de présélection et de sécurisation immobilière destinée à renforcer la protection et la compréhension des acheteurs et des investisseurs. OFF MARKET n’est pas propriétaire de S.A.F.E. et n’en revendique pas la création. OFF MARKET respecte et applique les principes S.A.F.E. dans son processus d’étude et de présentation des opportunités immobilières. S.A.F.E. constitue un cadre indépendant d’analyse et de sécurisation immobilière. Son application ne remplace pas les vérifications juridiques, notariales, techniques, fiscales ou financières nécessaires avant toute acquisition et ne garantit pas l’absence totale de risque.",
  },
  {
    question: "Villa sur plan ou appartement neuf à Marrakech : que choisir ?",
    answer:
      "Une villa sur plan convient mieux aux acheteurs qui recherchent de l’espace, un jardin, une piscine, plus d’intimité et une logique patrimoniale. Un appartement neuf à Marrakech convient davantage à un usage central, locatif ou pied-à-terre, surtout dans des zones comme Guéliz ou l’Hivernage. Le bon choix dépend du budget, de l’usage prévu et du quartier.",
  },
  {
    question: "Quels documents vérifier avant de réserver un projet immobilier sur plan ?",
    answer:
      "Avant de réserver, il faut demander les plans, les autorisations, le titre ou les éléments juridiques du terrain, le descriptif des prestations, les modalités de paiement, le calendrier de livraison, les conditions de réservation et les garanties prévues. Un projet sérieux doit pouvoir présenter un dossier clair avant toute décision.",
  },
  {
    question: "Pourquoi OFF MARKET ne présente pas tous les projets disponibles ?",
    answer:
      "OFF MARKET ne présente pas un projet simplement parce qu’il est disponible ou attractif visuellement. Chaque opportunité doit être étudiée selon son emplacement, son promoteur, son dossier, ses prestations, son prix et sa cohérence avec le marché. L’objectif est de présenter moins de projets, mais des projets mieux filtrés.",
  },
  {
    question: "C’est quoi l’immobilier off-market à Marrakech ?",
    answer:
      "L’immobilier off-market désigne des biens ou projets qui ne sont pas toujours publiés largement en ligne. À Marrakech, cela peut concerner des villas, appartements, terrains, riads, commerces ou projets sur plan accessibles sur demande. L’intérêt est d’accéder à une sélection plus confidentielle, souvent avant une diffusion plus large.",
  },
];

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildHomeFaqHtml(): string {
  const itemsHtml = HOME_FAQ_ITEMS.map((item, index) => {
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
      <h2 id="${HOME_FAQ_TITLE_ID}" class="om-home-faq__title">Acheter sur plan à Marrakech</h2>
      <p class="om-home-faq__subtitle">Les questions essentielles avant d’étudier une villa, un appartement neuf ou un projet immobilier présenté par OFF MARKET.</p>
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

export function buildHomeFaqJsonLd(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOME_FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  });
}
