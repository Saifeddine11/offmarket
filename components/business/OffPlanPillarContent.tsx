import Link from "next/link";

const FAQ_ITEMS = [
  {
    question: "Qu’est-ce qu’un achat immobilier sur plan ?",
    answer:
      "Il s’agit d’acheter un bien avant son achèvement, à partir de plans, d’un descriptif technique et de documents contractuels. Le projet se réalise ensuite selon un calendrier de construction et un échéancier prévus par le dossier et le contrat.",
  },
  {
    question: "Est-il possible pour un étranger d’acheter sur plan au Maroc ?",
    answer:
      "Un acquéreur étranger peut envisager un achat immobilier au Maroc, mais les conditions dépendent du bien, du projet, de la structure juridique et de sa situation. Il est recommandé de faire examiner le dossier par un notaire et des conseils marocains qualifiés avant toute réservation.",
  },
  {
    question: "Quels documents faut-il vérifier avant de réserver ?",
    answer:
      "Selon le projet, il faut notamment examiner les documents du terrain, les autorisations, les plans, le descriptif technique, l’accord de réservation, le contrat de vente, le calendrier de paiement, les conditions de livraison et les clauses relatives aux retards ou à l’annulation.",
  },
  {
    question: "Quel est le rôle du notaire ?",
    answer:
      "Le notaire intervient dans la sécurisation juridique de la transaction et dans la préparation ou la formalisation des actes selon le montage retenu. Son rôle exact dépend du dossier. Une revue indépendante par un notaire et, si nécessaire, par un avocat est importante avant de signer.",
  },
  {
    question: "Comment fonctionne le calendrier de paiement ?",
    answer:
      "Le calendrier prévoit généralement une réservation, un dépôt éventuel, puis des paiements liés à certaines étapes du projet avant le solde et la livraison. Les montants, dates et conditions varient : ils doivent être lus dans le contrat, et non déduits d’un modèle général.",
  },
  {
    question: "Que se passe-t-il en cas de retard de livraison ?",
    answer:
      "Il faut comparer la date annoncée avec la date contractuelle, relire les clauses de retard et demander une communication écrite sur l’avancement. Les droits et recours possibles dépendent du contrat, des circonstances et du droit applicable ; un professionnel doit examiner la situation.",
  },
  {
    question: "Comment vérifier la qualité des matériaux ?",
    answer:
      "La qualité doit être appréciée à partir du descriptif technique, des marques ou niveaux de gamme annoncés, des échantillons, des règles de substitution et de l’état livré. Une inspection et une liste de réserves au moment de la remise des clés permettent aussi de documenter les écarts éventuels.",
  },
  {
    question: "Quels frais faut-il prévoir en plus du prix d’achat ?",
    answer:
      "Selon le projet, il peut exister des frais de notaire et d’enregistrement, des taxes, des honoraires d’agence ou de conseil, des coûts de financement, d’ameublement, d’assurance, de gestion, d’entretien et de charges communes. Le budget doit être confirmé avec des professionnels.",
  },
  {
    question: "S.A.F.E est-elle une certification officielle ?",
    answer:
      "Non. S.A.F.E. — Security, Analysis, Fidelity & Expert Guidance est une méthode indépendante d’analyse, de présélection et de sécurisation immobilière destinée à renforcer la protection et la compréhension des acheteurs et des investisseurs. OFF MARKET n’est pas propriétaire de S.A.F.E. et n’en revendique pas la création. OFF MARKET respecte et applique les principes S.A.F.E. dans son processus d’étude et de présentation des opportunités immobilières. S.A.F.E. constitue un cadre indépendant d’analyse et de sécurisation immobilière. Son application ne remplace pas les vérifications juridiques, notariales, techniques, fiscales ou financières nécessaires avant toute acquisition et ne garantit pas l’absence totale de risque.",
  },
  {
    question: "Un achat sur plan garantit-il une rentabilité ?",
    answer:
      "Non. Une acquisition sur plan ne garantit ni rendement locatif, ni plus-value, ni liquidité. L’analyse doit tenir compte de l’emplacement, de la demande, du calendrier de livraison, des coûts d’exploitation, du scénario locatif et des conditions de revente.",
  },
] as const;

const FAQ_JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
});

function PillarSection({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="om-home-faq__item" data-open="true">
      <header className="om-home-faq__header">
        <span className="om-home-faq__eyebrow">{eyebrow}</span>
        <h2 className="section-title">{title}</h2>
      </header>
      <div className="om-home-faq__panel-inner">{children}</div>
    </article>
  );
}

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function OffPlanPillarContent() {
  return (
    <section
      className="om-home-faq"
      id="off-plan-guide"
      aria-labelledby="off-plan-guide-title"
      data-scroll-section
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: FAQ_JSON_LD }}
      />

      <div className="om-home-faq__inner">
        <header className="om-home-faq__header">
          <span className="om-home-faq__eyebrow">GUIDE ACHETEUR</span>
          <h2 id="off-plan-guide-title" className="om-home-faq__title">
            Acheter sur plan à Marrakech
          </h2>
          <p className="om-home-faq__subtitle">
            Comprendre un projet immobilier neuf à Marrakech avant de réserver : documents,
            paiements, risques, livraison et lecture patrimoniale.
          </p>
        </header>

        <div className="om-home-faq__list">
          <PillarSection eyebrow="COMPRENDRE" title="Qu’est-ce qu’un achat sur plan ?">
            <p>
              Acheter sur plan signifie acquérir un bien avant son achèvement, à partir de plans,
              de spécifications techniques et de documents contractuels. Le bien n’est donc pas
              encore visitable dans son état final : le projet doit être compris à travers son
              dossier, son calendrier de construction et ses conditions de vente.
            </p>
            <p>
              Cette démarche se distingue d’un achat dans l’existant, où l’acquéreur peut
              généralement observer le bien livré, son état et son environnement immédiat. Pour
              une villa sur plan ou un appartement neuf à Marrakech, la qualité de la documentation
              et la clarté des engagements prennent une importance particulière.
            </p>
          </PillarSection>

          <PillarSection eyebrow="POSSIBILITÉS" title="Avantages possibles d’un projet neuf">
            <p>
              Un achat sur plan peut offrir certains choix ou souplesses, sans constituer une
              promesse de performance :
            </p>
            <BulletList
              items={[
                "choisir une unité, une orientation ou une configuration lorsqu’elles sont encore disponibles ;",
                "bénéficier de matériaux et de standards plus récents, selon le descriptif effectivement contractuel ;",
                "répartir le paiement selon les étapes prévues au contrat ;",
                "profiter éventuellement d’un positionnement de prix lié au stade d’avancement ;",
                "préparer une stratégie d’usage, de location ou de revente, sans garantie de résultat.",
              ]}
            />
          </PillarSection>

          <PillarSection eyebrow="VIGILANCE" title="Risques à examiner avec méthode">
            <p>
              Un projet peut évoluer entre la réservation et la livraison. Les principaux points
              de vigilance comprennent les retards, les écarts entre plans et résultat final, le
              risque lié au promoteur ou à l’entreprise, les spécifications imprécises, le risque
              de paiement, les questions administratives ou juridiques et l’incertitude sur la
              location ou la revente.
            </p>
            <p>
              Ces risques ne rendent pas tout achat sur plan inadapté. Ils justifient une lecture
              documentée, des échanges écrits et un avis professionnel indépendant avant tout
              engagement.
            </p>
          </PillarSection>

          <PillarSection eyebrow="PROMOTEUR" title="Vérifier le développeur et le projet">
            <p>
              Avant de réserver, l’acquéreur peut examiner l’identité du promoteur, son expérience
              documentée, les projets déjà livrés, la situation du terrain, les autorisations et la
              structure de propriété du projet. La crédibilité financière et opérationnelle, les
              contrats proposés et les professionnels qui conseillent les parties méritent aussi
              d’être clarifiés.
            </p>
            <p>
              OFF MARKET présente cette grille comme un cadre de lecture : elle ne remplace pas les
              vérifications d’un notaire, d’un avocat, d’un conseil fiscal ou de tout autre
              professionnel qualifié.
            </p>
          </PillarSection>

          <PillarSection eyebrow="DOSSIER" title="Documents à demander avant la réservation">
            <p>
              Les pièces utiles varient selon le projet et sa structure juridique. Lorsqu’elles
              s’appliquent, demandez notamment :
            </p>
            <BulletList
              items={[
                "le titre foncier ou les documents pertinents relatifs au terrain ;",
                "les autorisations d’urbanisme et de construction disponibles ;",
                "l’accord de réservation et le contrat de vente ;",
                "les plans, surfaces, parties communes et spécifications techniques ;",
                "le calendrier de paiement et les conditions de livraison ;",
                "les clauses relatives aux retards, modifications et annulation ;",
                "les documents de gestion, d’assurance et de charges communes lorsqu’ils existent.",
              ]}
            />
          </PillarSection>

          <PillarSection eyebrow="CONSEIL" title="Notaire, avocat et conseils indépendants">
            <p>
              Une revue juridique indépendante aide à comprendre la propriété du terrain, les
              autorisations, la nature de l’acte, les obligations de chaque partie et les clauses
              qui encadrent la livraison ou le paiement. Le notaire joue un rôle central dans la
              formalisation de la transaction selon le montage retenu.
            </p>
            <p>
              Les acquéreurs doivent consulter des professionnels marocains qualifiés, notamment
              pour les aspects juridiques et fiscaux. Les informations de cette page sont générales
              et ne constituent pas un conseil juridique, fiscal ou financier.
            </p>
          </PillarSection>

          <PillarSection eyebrow="PROCESSUS" title="Réservation, paiements et suivi">
            <p>
              Le parcours suit souvent une logique en plusieurs étapes : sélection initiale,
              examen du dossier, réservation, dépôt éventuel, paiements liés à l’avancement,
              suivi de la construction, remise du bien et documentation finale. Les pourcentages et
              les dates ne sont pas universels : seuls le projet et le contrat permettent de les
              confirmer.
            </p>
            <p>
              Pendant la construction, conservez les rapports d’avancement, les comptes rendus de
              visite lorsque celle-ci est autorisée, les demandes de modification et toute
              communication écrite sur les étapes, retards ou changements.
            </p>
          </PillarSection>

          <PillarSection eyebrow="LIVRAISON" title="Matériaux, finitions et retards">
            <p>
              Les matériaux doivent être comparés au descriptif technique : marques ou niveaux de
              qualité annoncés, échantillons, règles de substitution, tolérances et état attendu à
              la livraison. Une inspection de remise des clés et une liste de réserves permettent de
              documenter les éléments à corriger.
            </p>
            <p>
              La date annoncée et la date contractuelle peuvent différer. Relisez les clauses de
              retard, les cas de force majeure et les obligations d’information. Les recours
              possibles dépendent du contrat et du droit applicable ; ils doivent être évalués par
              un professionnel.
            </p>
          </PillarSection>

          <PillarSection eyebrow="BUDGET" title="Coûts à intégrer au-delà du prix">
            <p>
              Le budget global peut inclure les frais de notaire et d’enregistrement, taxes,
              honoraires d’agence ou de conseil lorsqu’ils s’appliquent, ameublement, gestion,
              entretien, charges communes, assurance et financement. Demandez un chiffrage adapté
              au projet et à votre situation plutôt que d’appliquer un pourcentage générique.
            </p>
          </PillarSection>

          <PillarSection eyebrow="INVESTISSEMENT" title="Lire le projet comme un scénario">
            <p>
              Une analyse d’investissement peut comparer le profil du locataire ou de l’acquéreur,
              l’emplacement, la liquidité, la stratégie locative, les coûts d’exploitation, le
              calendrier de livraison et les conditions de revente. Elle doit tester plusieurs
              scénarios et intégrer les périodes sans revenu, les travaux éventuels et les coûts de
              gestion.
            </p>
            <p>
              Aucun achat sur plan ne garantit une rentabilité, une plus-value ou une revente
              rapide. Un calculateur comme le <Link href="/simulateur/">simulateur</Link> peut aider
              à cadrer des hypothèses, sans remplacer l’analyse du dossier réel.
            </p>
          </PillarSection>

          <PillarSection eyebrow="S.A.F.E." title="Un cadre indépendant de lecture">
            <p>
              <strong>S.A.F.E. — Security, Analysis, Fidelity & Expert Guidance</strong> est une
              méthode indépendante d’analyse, de présélection et de sécurisation immobilière
              destinée à renforcer la protection et la compréhension des acheteurs et des
              investisseurs. OFF MARKET n’est pas propriétaire de S.A.F.E. et n’en revendique pas
              la création. OFF MARKET respecte et applique les principes S.A.F.E. dans son
              processus d’étude et de présentation des opportunités immobilières.
            </p>
            <p>
              S.A.F.E. constitue un cadre indépendant d’analyse et de sécurisation immobilière. Son
              application ne remplace pas les vérifications juridiques, notariales, techniques,
              fiscales ou financières nécessaires avant toute acquisition et ne garantit pas
              l’absence totale de risque. Consultez
              la section <Link href="/about/#acteurs-verifies">S.A.F.E. et acteurs vérifiés</Link>
              pour comprendre son périmètre présenté par OFF MARKET.
            </p>
          </PillarSection>

          <PillarSection eyebrow="EXEMPLE" title="Villa Jaz, un projet sur plan à consulter">
            <p>
              <Link href="/sur-plan/villa-jaz/">Villa Jaz</Link> est présentée sur le site comme
              un projet de villas sur plan à Marrakech. Sa page dédiée rassemble les informations
              générales, caractéristiques, extérieurs, intérieurs et plans disponibles dans le
              repository. Elle constitue un exemple contextualisé, et non une preuve que tous les
              projets sur plan présentent les mêmes conditions.
            </p>
            <p>
              Pour comparer ce type de projet avec d’autres opportunités, consultez les
              <Link href="/quartiers/"> quartiers de Marrakech</Link> et la sélection
              <Link href="/off-market/"> off-market</Link> selon votre usage et votre horizon.
            </p>
          </PillarSection>

          <PillarSection eyebrow="CHECKLIST" title="Checklist de l’acquéreur">
            <BulletList
              items={[
                "Projet : usage, emplacement, unité et configuration visés ;",
                "Promoteur : identité, historique documenté et interlocuteurs ;",
                "Juridique : terrain, autorisations, contrats et conseil indépendant ;",
                "Paiement : calendrier, conditions, sécurité et conséquences d’un retard ;",
                "Spécifications : plans, surfaces, matériaux, substitutions et réserves ;",
                "Livraison : date contractuelle, suivi, inspection et documentation finale ;",
                "Coûts : taxes, notaire, financement, ameublement, gestion, charges et assurance ;",
                "Conseil : notaire, avocat et conseil fiscal marocains qualifiés ;",
                "Investissement : hypothèses locatives, coûts, liquidité et scénarios de revente.",
              ]}
            />
          </PillarSection>

          <section className="om-home-faq__item" data-open="true" aria-labelledby="off-plan-faq-title">
            <header className="om-home-faq__header">
              <span className="om-home-faq__eyebrow">QUESTIONS</span>
              <h2 id="off-plan-faq-title" className="section-title">
                FAQ — Acheter sur plan au Maroc
              </h2>
            </header>
            <div className="om-home-faq__list">
              {FAQ_ITEMS.map((item) => (
                <article className="om-home-faq__item" data-open="true" key={item.question}>
                  <h3 className="om-home-faq__heading">
                    <span className="om-home-faq__question">{item.question}</span>
                  </h3>
                  <div className="om-home-faq__panel-inner">
                    <p>{item.answer}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <p className="section-lead">
            Pour étudier une opportunité selon votre situation, demandez un échange privé via la
            page <Link href="/contact/">contact</Link>. Les informations et documents d’un projet
            doivent être confirmés avant toute décision.
          </p>
        </div>
      </div>
    </section>
  );
}
