import Link from "next/link";

const SAFE_FAQ = [
  {
    question: "Qu’est-ce que la certification S.A.F.E. ?",
    answer:
      "S.A.F.E. n’est pas une certification officielle. C’est le cadre propriétaire d’examen de projets d’OFF MARKET, conçu pour structurer les informations disponibles avant de présenter une opportunité à un acheteur.",
  },
  {
    question: "Que signifie Secure Approved For Estate ?",
    answer:
      "Secure Approved For Estate est le nom anglais du cadre. S renvoie à Security, A à Approval, F à Framework et E à Estate : sécurité et vigilance, examen interne, méthode structurée et lecture du bien immobilier dans son contexte.",
  },
  {
    question: "S.A.F.E. est-elle une certification officielle au Maroc ?",
    answer:
      "Non. S.A.F.E. n’est ni une certification gouvernementale, ni une autorisation administrative, ni une preuve de conformité juridique au Maroc. La transaction reste encadrée par le droit marocain, les documents officiels et les contrats signés.",
  },
  {
    question: "Quels éléments sont examinés ?",
    answer:
      "Selon le projet et les documents disponibles, l’examen peut porter sur le promoteur, le terrain, les autorisations, les contrats, les paiements, les plans, les spécifications techniques, les matériaux, la livraison, le prix, l’usage de l’acheteur et les hypothèses d’investissement.",
  },
  {
    question: "S.A.F.E. garantit-elle la livraison du projet ?",
    answer:
      "Non. Un cadre de revue peut faire ressortir les échéances annoncées et les points de vigilance, mais il ne garantit ni l’exécution, ni la date de livraison, ni l’absence de retard ou de modification.",
  },
  {
    question: "S.A.F.E. garantit-elle la rentabilité ?",
    answer:
      "Non. Une analyse immobilière ne garantit ni rendement locatif, ni plus-value, ni revente. Les résultats dépendent notamment de l’emplacement, de la demande, des coûts, du financement, de l’exploitation et du marché.",
  },
  {
    question: "Qui doit vérifier les documents juridiques ?",
    answer:
      "L’acquéreur doit faire examiner les documents par un notaire et, selon le dossier, par un avocat ou d’autres conseils qualifiés. S.A.F.E. ne remplace pas cette vérification indépendante.",
  },
  {
    question: "Une évaluation S.A.F.E. peut-elle évoluer ?",
    answer:
      "Oui. Les informations, autorisations, contrats, travaux et conditions d’un projet peuvent changer. Toute évaluation doit être rattachée à une date, à un périmètre et aux documents disponibles à cette date.",
  },
  {
    question: "Que signifie “points de vigilance” ?",
    answer:
      "Cette expression désigne une information manquante, une incertitude, une clause à relire ou un risque à approfondir. Elle ne constitue ni une condamnation du projet, ni une garantie de résolution.",
  },
  {
    question: "Dois-je quand même consulter un notaire ?",
    answer:
      "Oui. Avant une réservation ou une acquisition au Maroc, l’acheteur doit obtenir un avis professionnel adapté à sa situation. S.A.F.E. aide à organiser les questions, mais ne donne pas de conseil juridique ou fiscal.",
  },
] as const;

const SAFE_FAQ_JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: SAFE_FAQ.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
});

function SafeBlock({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="about-verified__safe about-verified__reveal mav-reveal-item">
      <p className="about-verified__eyebrow">{eyebrow}</p>
      <h3 className="about-verified__safe-title">{title}</h3>
      <div className="about-verified__safe-text">{children}</div>
    </article>
  );
}

export function SafeAuthorityContent() {
  return (
    <div id="safe-cadre" aria-label="Cadre S.A.F.E. d’OFF MARKET">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: SAFE_FAQ_JSON_LD }}
      />

      <SafeBlock eyebrow="DÉFINITION" title="Secure Approved For Estate">
        <p>
          S.A.F.E. est le cadre propriétaire de revue de projets d’OFF MARKET. Il a été créé pour
          rendre plus lisibles les informations disponibles sur une opportunité immobilière à
          Marrakech ou au Maroc avant sa présentation à un acheteur.
        </p>
        <p>
          Il s’adresse aux acquéreurs qui souhaitent comprendre un projet sur plan ou dans
          l’existant, les parties prenantes, les documents disponibles, les conditions de livraison
          et les risques à approfondir. Il organise les questions ; il ne remplace pas la due
          diligence indépendante.
        </p>
      </SafeBlock>

      <SafeBlock eyebrow="LES QUATRE LETTRES" title="Une lecture en quatre angles">
        <p>
          <strong>S — Security</strong> : sensibiliser aux risques juridiques, documentaires et
          transactionnels, sans affirmer qu’un risque est supprimé.
        </p>
        <p>
          <strong>A — Approval</strong> : désigner l’examen interne et la décision de présenter ou
          non une opportunité avec un niveau d’information jugé suffisamment clair pour cet usage.
        </p>
        <p>
          <strong>F — Framework</strong> : appliquer une méthode structurée aux dimensions du projet,
          du promoteur, du juridique, du financier et du technique.
        </p>
        <p>
          <strong>E — Estate</strong> : replacer le bien, sa livraison, son usage par l’acheteur et
          son contexte d’investissement dans une lecture immobilière concrète.
        </p>
      </SafeBlock>

      <SafeBlock eyebrow="PÉRIMÈTRE" title="Ce que le cadre peut examiner">
        <ul>
          <li>Promoteur, parties prenantes et responsabilités annoncées ;</li>
          <li>Situation juridique et foncière, selon les pièces accessibles ;</li>
          <li>Autorisations, plans, contrats et documentation disponible ;</li>
          <li>Réservation, calendrier et sécurité des paiements ;</li>
          <li>Programme, spécifications techniques, matériaux et finitions ;</li>
          <li>Avancement, conditions de livraison et réserves à prévoir ;</li>
          <li>Positionnement du prix et adéquation avec le projet étudié ;</li>
          <li>Usage de l’acheteur, hypothèses d’investissement et transparence documentaire.</li>
        </ul>
        <p>
          Le périmètre varie selon le projet. Toute conclusion doit rester limitée aux informations
          reçues, accessibles ou confirmées au moment de la revue.
        </p>
      </SafeBlock>

      <SafeBlock eyebrow="ÉLÉMENTS DE PREUVE" title="Une revue fondée sur des documents datés">
        <p>
          La méthode peut s’appuyer sur les documents fournis par les parties prenantes du projet,
          les registres publics ou documents officiels accessibles, les contrats et pièces
          techniques, les confirmations écrites et les informations de projet datées.
        </p>
        <p>
          Lorsqu’une question dépasse le périmètre d’OFF MARKET, une revue par un notaire, un
          avocat, un conseil fiscal, un architecte ou un expert technique doit être sollicitée. Nous
          ne revendiquons pas un accès automatique à des bases officielles et ne présentons pas une
          information comme vérifiée lorsqu’elle ne l’est pas.
        </p>
      </SafeBlock>

      <SafeBlock eyebrow="LECTURE TRANSPARENTE" title="Des statuts descriptifs, pas une note">
        <p>
          Selon l’état du dossier, une présentation peut utiliser des statuts descriptifs tels que
          <strong> Informations suffisantes</strong>, <strong>Informations partielles</strong>,
          <strong> Vérification en cours</strong>, <strong>Points de vigilance</strong> ou
          <strong> Non évalué</strong>.
        </p>
        <p>
          Ces termes ne sont ni une certification, ni un score, ni une approbation officielle. Ils
          servent à distinguer ce qui est documenté, ce qui reste à obtenir et ce qui doit être
          approfondi avant une décision.
        </p>
      </SafeBlock>

      <SafeBlock eyebrow="CADRE ET LIMITES" title="Ce que S.A.F.E. ne promet pas">
        <p>
          S.A.F.E. dépend des informations disponibles à la date de revue. Un projet peut évoluer,
          un document peut être remplacé ou expirer, et l’exécution de la construction reste soumise
          à des risques opérationnels, contractuels et de livraison.
        </p>
        <p>
          S.A.F.E. n’est pas une certification officielle au Maroc, une garantie juridique, une
          garantie de livraison, de rentabilité, de revente ou d’absence de risque. L’acheteur doit
          mener sa propre vérification avant de signer.
        </p>
      </SafeBlock>

      <SafeBlock eyebrow="DROIT MAROCAIN" title="Un cadre complémentaire, jamais substitutif">
        <p>
          La transaction reste régie par le droit marocain, les autorisations applicables et les
          contrats signés. Le notaire et les professionnels juridiques qualifiés restent centraux
          pour vérifier la situation du bien et formaliser l’opération selon sa structure.
        </p>
        <p>
          Les exigences peuvent varier selon le projet et le statut du bien. S.A.F.E. ne remplace ni
          une autorisation officielle, ni une vérification du titre foncier, ni un conseil juridique
          ou fiscal.
        </p>
      </SafeBlock>

      <SafeBlock eyebrow="PARCOURS ACHETEUR" title="À quel moment intervient S.A.F.E. ?">
        <ol>
          <li>Une opportunité est identifiée.</li>
          <li>Les premières informations et pièces disponibles sont collectées.</li>
          <li>Le projet est examiné selon le cadre S.A.F.E.</li>
          <li>Les informations manquantes et points de vigilance sont signalés.</li>
          <li>L’acheteur reçoit une présentation plus lisible du projet.</li>
          <li>Les revues juridique, fiscale et technique indépendantes sont réalisées.</li>
          <li>La décision de réserver ou d’acquérir est prise par l’acheteur.</li>
        </ol>
      </SafeBlock>

      <SafeBlock eyebrow="DATE ET PÉRIMÈTRE" title="Une évaluation doit rester située">
        <p>
          Toute mention de S.A.F.E. doit préciser la date d’évaluation, la date de mise à jour des
          informations, le périmètre du projet examiné et les points non résolus. Le responsable ou
          le relecteur ne doit être nommé que si son identité et son rôle sont vérifiables.
        </p>
        <p>
          Aucune évaluation de projet, aucun statut et aucune date de revue spécifique ne sont
          inventés sur cette page. Ils doivent être renseignés dans le dossier concerné lorsqu’ils
          existent.
        </p>
      </SafeBlock>

      <SafeBlock eyebrow="APPLICATION" title="Sur plan, Villa Jaz et autres opportunités">
        <p>
          Pour un achat <Link href="/sur-plan/">sur plan</Link>, S.A.F.E. peut aider à organiser les
          questions sur le promoteur, le terrain, les paiements, les plans, les matériaux et la
          livraison. Il ne remplace pas les contrôles propres au projet.
        </p>
        <p>
          <Link href="/sur-plan/villa-jaz/">Villa Jaz</Link> est un exemple de projet sur plan à
          Marrakech où ce type de grille peut être utile. Cette page ne prétend pas que Villa Jaz a
          reçu une certification, une approbation ou un statut S.A.F.E. spécifique.
        </p>
        <p>
          Pour comprendre l’approche d’OFF MARKET, consultez aussi la sélection
          <Link href="/off-market/"> off-market</Link>, la page <Link href="/about/">À propos</Link>
          ou la page <Link href="/contact/">contact</Link>.
        </p>
      </SafeBlock>

      <section className="about-verified__safe about-verified__reveal mav-reveal-item" aria-labelledby="safe-faq-title">
        <p className="about-verified__eyebrow">FAQ</p>
        <h3 id="safe-faq-title" className="about-verified__safe-title">
          Comprendre S.A.F.E.
        </h3>
        <div className="about-verified__safe-text">
          {SAFE_FAQ.map((item) => (
            <article key={item.question}>
              <h4>{item.question}</h4>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
