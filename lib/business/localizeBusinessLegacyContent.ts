import type { PageContent } from "@/lib/content/types";
import type { BodySegment } from "@/lib/static-html/parsePage";
import type { SiteLocale } from "@/lib/i18n/types";

type Replacement = readonly [from: string, to: string];

const COMMON_OFF_PLAN_REPLACEMENTS: readonly Replacement[] = [
  ["Villas privéescious", "Private villas"],
  ["Private villascious", "Private villas"],
  ["Villas privéescious<br>\nSwimming Pool", "Private villas<br>\nSwimming pool"],
  ["Private villascious<br>\nSwimming Pool", "Private villas<br>\nSwimming pool"],
  ["of beautiful reality", "that fits your project"],
  ["of&nbsp;beautiful reality", "that fits your project"],
  ["Parc-like Parcing", "Park-like parking"],
  ["Parc-like&nbsp;Parcing", "Park-like parking"],
  ["Investirissement", "Investment"],
];

const EN_OFF_PLAN_REPLACEMENTS: readonly Replacement[] = [
  ["<span>Sur plan</span>", "<span>Off-plan</span>"],
  ["Aller au contenu principal", "Skip to main content"],
  ["Accueil", "Home"],
  ["Navigation principale", "Main navigation"],
  ["Choisir la langue", "Choose language"],
  ["Demander l'accès", "Request access"],
  ["Nous contacter", "Contact us"],
  ["Immobilier privé à Marrakech", "Private real estate in Marrakech"],
  ["Marrakech, Maroc", "Marrakech, Morocco"],
  ["Accès privé sur demande", "Private access on request"],
  ["Tous droits réservés", "All rights reserved"],
  ["Confidentialité", "Privacy policy"],
  ["Mentions légales", "Legal notice"],
  ["Recevoir les opportunités privées", "Receive private opportunities"],
  ["Soyez informé des nouveaux projets sélectionnés à Marrakech.", "Stay informed about newly selected projects in Marrakech."],
  ["S'inscrire", "Subscribe"],
  ["Sur plan", "Off-plan"],
  ["Simulateur", "Simulator"],
  ["Contact", "Contact"],
  ["Une méthode devient signature", "A method becomes a signature"],
  ["Des programmes sur plan sélectionnés pour leur architecture, leur emplacement et leur potentiel patrimonial à Marrakech.", "Off-plan programmes selected for their architecture, location and long-term potential in Marrakech."],
  ["Négocier", "Negotiate"],
  ["Acquérir", "Acquire"],
  ["Comprendre votre projet", "Understand your project"],
  ["Cadrer votre recherche et votre horizon", "Define your search and time horizon"],
  ["Sélectionner les biens cohérents", "Select suitable properties"],
  ["Négocier avec discrétion", "Negotiate discreetly"],
  ["Stone Hammam", "Stone hammam"],
  ["Beauty hammam", "Elegant hammam"],
  ["Center à grandes ouvertures", "Central location with generous openings"],
  ["Appartements premium", "Premium apartments"],
  ["Adresses", "Addresses"],
  ["Intérieur", "Interior"],
  ["Rappel", "Callback"],
  ["Envoyer une demande", "Send a request"],
  ["Envoyer", "Send"],
  ["Nom", "Name"],
  ["Téléphone", "Phone"],
  ["Envoyer la demande", "Send request"],
  ["politique de confidentialité", "privacy policy"],
  ["Maison OFF MARKET", "OFF MARKET"],
  ["OFF MARKET — page d&amp;rsquo;accueil", "OFF MARKET — home"],
];

const NL_OFF_PLAN_REPLACEMENTS: readonly Replacement[] = [
  ["<span>Sur plan</span>", "<span>Nieuwbouw</span>"],
  ["Private villas", "Private villa's"],
  ["that fits your project", "die bij uw project past"],
  ["Park-like parking", "Parkachtige parking"],
  ["Investment", "Investering"],
  ["Skip to main content", "Naar hoofdinhoud"],
  ["Accueil", "Home"],
  ["Navigation principale", "Hoofdnavigatie"],
  ["Choisir la langue", "Taal kiezen"],
  ["Demander l'accès", "Toegang aanvragen"],
  ["Immobilier privé à Marrakech", "Privé vastgoed in Marrakech"],
  ["Nous contacter", "Contact opnemen"],
  ["Biens privés", "Private panden"],
  ["OFF MARKET — page d&amp;rsquo;accueil", "OFF MARKET — startpagina"],
  ["Marrakech, Maroc", "Marrakech, Marokko"],
  ["Accès privé sur demande", "Private toegang op aanvraag"],
  ["Tous droits réservés", "Alle rechten voorbehouden"],
  ["Confidentialité", "Privacy"],
  ["Mentions légales", "Juridische vermeldingen"],
  ["Recevoir les opportunités privées", "Private opportuniteiten ontvangen"],
  [
    "Soyez informé des nouveaux projets sélectionnés à Marrakech.",
    "Blijf op de hoogte van nieuwe geselecteerde projecten in Marrakech.",
  ],
  ["S'inscrire", "Inschrijven"],
  ["Sur plan", "Nieuwbouw"],
  ["Simulateur", "Simulator"],
  ["Contact", "Contact"],
  ["LA SÉLECTION À PORTÉE DE MAIN", "DE SELECTIE BINNEN HANDBEREIK"],
  [
    "OFF MARKET sécurise chaque parcours jusqu'à la décision finale, avec un accompagnement clair et discret.",
    "OFF MARKET begeleidt elk traject tot aan de eindbeslissing, met heldere en discrete ondersteuning.",
  ],
  [
    "OFF MARKET sécurise chaque parcours jusqu&rsquo;à la décision finale, avec un accompagnement clair et discret.",
    "OFF MARKET begeleidt elk traject tot aan de eindbeslissing, met heldere en discrete ondersteuning.",
  ],
  [
    "OFF MARKET sécurise chaque parcours jusqu&amp;rsquo;à la décision finale, avec un accompagnement clair et discret.",
    "OFF MARKET begeleidt elk traject tot aan de eindbeslissing, met heldere en discrete ondersteuning.",
  ],
  [
    "Nous sécurisons le parcours jusqu à la décision finale, avec un accompagnement clair et discret.",
    "Wij begeleiden het traject tot aan de eindbeslissing, met heldere en discrete ondersteuning.",
  ],
  [
    "Nous sécurisons le parcours jusqu&amp;rsquo;à la décision finale, avec un accompagnement clair et discret.",
    "Wij begeleiden het traject tot aan de eindbeslissing, met heldere en discrete ondersteuning.",
  ],
  [
    "Nous accompagnons les échanges, les vérifications et la lecture stratégique de l&rsquo;opportunité.",
    "Wij begeleiden de gesprekken, controles en strategische beoordeling van de opportuniteit.",
  ],
  [
    "Nous accompagnons les échanges, les vérifications et la lecture stratégique de l&amp;rsquo;opportunité.",
    "Wij begeleiden de gesprekken, controles en strategische beoordeling van de opportuniteit.",
  ],
  [
    "Nous accompagnons les échanges, les vérifications et la lecture stratégique de l opportunité.",
    "Wij begeleiden de gesprekken, controles en strategische beoordeling van de opportuniteit.",
  ],
  [
    "Marrakech se révèle autrement selon l&rsquo;adresse : prestige central, rendement urbain, villas privées ou horizon patrimonial sur l&rsquo;Atlas.",
    "Marrakech toont zich anders naargelang het adres: centrale prestige, stedelijk rendement, private villa's of patrimoniaal perspectief richting de Atlas.",
  ],
  [
    "Marrakech se révèle autrement selon l&amp;rsquo;adresse : prestige central, rendement urbain, villas privées ou horizon patrimonial sur l&amp;rsquo;Atlas.",
    "Marrakech toont zich anders naargelang het adres: centrale prestige, stedelijk rendement, private villa's of patrimoniaal perspectief richting de Atlas.",
  ],
  ["Une méthode devient signature", "Een methode wordt een signatuur"],
  ["Une méthode<br>\ndevient signature", "Een methode<br>\nwordt een signatuur"],
  [
    "Des programmes sur plan sélectionnés pour leur architecture, leur emplacement et leur potentiel patrimonial à Marrakech.",
    "Nieuwbouwprogramma's geselecteerd op architectuur, ligging en patrimoniaal potentieel in Marrakech.",
  ],
  [
    "Des programmes nieuwbouw geselecteerd op architectuur, ligging en patrimoniaal potentieel in Marrakech.",
    "Nieuwbouwprogramma's geselecteerd op architectuur, ligging en patrimoniaal potentieel in Marrakech.",
  ],
  [
    "Nous cadrons votre recherche, votre horizon, votre budget et votre logique d&rsquo;achat avec méthode et discrétion.",
    "Wij kaderen uw zoektocht, horizon, budget en aankooplogica met methode en discretie.",
  ],
  [
    "Nous cadrons votre recherche, votre horizon, votre budget et votre logique d&amp;rsquo;achat avec méthode et discrétion.",
    "Wij kaderen uw zoektocht, horizon, budget en aankooplogica met methode en discretie.",
  ],
  ["Villas privéescious Swimming Pool", "Private villa's Zwembad"],
  ["Villas privéescious<br>\nSwimming Pool", "Private villa's<br>\nZwembad"],
  [
    "Nous filtrons les biens selon leur adresse, leur potentiel, leur cohérence et leur niveau de confidentialité.",
    "Wij filteren vastgoed volgens adres, potentieel, samenhang en vertrouwelijkheidsniveau.",
  ],
  ["Comprendre votre projet", "Uw project begrijpen"],
  [
    "Comprendre votre projet et votre horizon patrimonial",
    "Uw project en patrimoniale horizon begrijpen",
  ],
  ["Négocier", "Onderhandelen"],
  [
    "Des adresses singulières dans les quartiers historiques, sélectionnées pour leur charme, leur potentiel et leur rareté.",
    "Bijzondere adressen in historische wijken, geselecteerd op charme, potentieel en zeldzaamheid.",
  ],
  ["Acquérir", "Verwerven"],
  ["Stone Hammam", "Stenen hammam"],
  ["Appartements premium", "Premium appartementen"],
  ["Beauty hammam", "Elegante hammam"],
  ["Center à grandes ouvertures", "Centrum met grote openingen"],
  ["Center<br>\nà grandes ouvertures", "Centrum<br>\nmet grote openingen"],
  ["Beauty</span>", "Elegante</span>"],
  [
    "Winding paths, paved with gray granite, resemble creeks and riverbeds that flow gently around OFF MARKET. White froth of hydrangeas and slender torsos of shadberries, suspended above invisible water, become a picturesque backdrop for a riverside walk.",
    "Slingerpaadjes in grijs graniet begeleiden de wandeling rond het project. Beplanting, schaduw en minerale lijnen vormen een rustig decor voor een discreet woonritme.",
  ],
  [
    "Winding paths, paved with&nbsp;gray granite, resemble creeks and riverbeds that flow gently around&nbsp;OFF MARKET. White froth of&nbsp;hydrangeas and slender torsos of&nbsp;shadberries, suspended above&nbsp;invisible water, become a&nbsp;picturesque backdrop for&nbsp;a&nbsp;riverside walk.",
    "Slingerpaadjes in grijs graniet begeleiden de wandeling rond het project. Beplanting, schaduw en minerale lijnen vormen een rustig decor voor een discreet woonritme.",
  ],
  ["OMBRES ET PERSPECTIVES", "SCHADUW EN PERSPECTIEF"],
  ["Ombres et perspectives", "Schaduw en perspectief"],
  ["COUR INTÉRIEURE", "BINNENPATIO"],
  ["Cour intérieure", "Binnenpatio"],
  ["JARDINS STRUCTURANTS", "STRUCTURERENDE TUINEN"],
  ["Jardins structurants", "Structurerende tuinen"],
  [
    "Une méthode d'acquisition en quatre étapes : comprendre, sélectionner, négocier, acquérir.",
    "Een aankoopmethode in vier stappen: begrijpen, selecteren, onderhandelen, verwerven.",
  ],
  [
    "Une méthode d&rsquo;acquisition en quatre étapes : comprendre, sélectionner, négocier, acquérir.",
    "Een aankoopmethode in vier stappen: begrijpen, selecteren, onderhandelen, verwerven.",
  ],
  [
    "Une méthode d&amp;rsquo;acquisition en quatre étapes : comprendre, sélectionner, négocier, acquérir.",
    "Een aankoopmethode in vier stappen: begrijpen, selecteren, onderhandelen, verwerven.",
  ],
  [
    "Une méthode d acquisition en quatre étapes : comprendre, sélectionner, négocier, acquérir.",
    "Een aankoopmethode in vier stappen: begrijpen, selecteren, onderhandelen, verwerven.",
  ],
  [
    "Une methode d acquisition en quatre étapes : comprendre, sélectionner, négocier, acquérir.",
    "Een aankoopmethode in vier stappen: begrijpen, selecteren, onderhandelen, verwerven.",
  ],
  ["Cadrer votre recherche et votre horizon", "Uw zoektocht en horizon kaderen"],
  ["Sélectionner les biens cohérents", "Samenhangende panden selecteren"],
  ["Négocier avec discrétion", "Discreet onderhandelen"],
  [
    "OFF MARKET compose une sélection of beautiful reality.",
    "OFF MARKET stelt een selectie samen die aansluit bij uw aankooplogica.",
  ],
  [
    "OFF MARKET compose une sélection<br>\nof&nbsp;beautiful reality.",
    "OFF MARKET stelt een selectie samen<br>\ndie aansluit bij uw aankooplogica.",
  ],
  [
    "OFF MARKET compose une sélection of beautiful reality.",
    "OFF MARKET stelt een selectie samen die aansluit bij uw aankooplogica.",
  ],
  ["PERMANENT OUTDOOR RECREATION SPACES", "PERMANENTE BUITENRUIMTES"],
  ["VIDEO-MONITORED PLAYGROUNDS", "BEVEILIGDE SPEELZONES"],
  ["PORTABLE OUTDOOR FURNITURE", "FLEXIBEL BUITENMEUBILAIR"],
  [
    "Route de l&rsquo;Ourika — villas, Atlas et horizon long terme.",
    "Route de l'Ourika — villa's, Atlas en langetermijnperspectief.",
  ],
  ["À quelques minutes des adresses patrimoniales.", "Op enkele minuten van patrimoniale adressen."],
  ["discrète Palmeraie", "Discrete Palmeraie"],
  ["PALETTE SOBRE OF BLOSSOMS", "INGETOGEN GROENPALET"],
  [
    "Agdal — adresses résidentielles modernes, jardins royaux à proximité et lecture patrimoniale claire.",
    "Agdal — moderne residentiële adressen, koninklijke tuinen vlakbij en een heldere patrimoniale lezing.",
  ],
  ["Panoramique Terraces", "Panoramische terrassen"],
  [
    "Des terrasses de vue où la lumière, la pierre et le jardin composent un cadre de vie discret et mémorable.",
    "Uitzichtterrassen waar licht, steen en tuin samen een discreet en memorabel leefkader vormen.",
  ],
  ["VOLUMES PATRIMONIAUX", "PATRIMONIALE VOLUMES"],
  ["Volumes patrimoniaux", "Patrimoniale volumes"],
  ["TRANSPARENT PANORAMIC RAILING", "TRANSPARANTE PANORAMISCHE BALUSTRADE"],
  ["Transparent panoramic railing", "Transparante panoramische balustrade"],
  ["LUMIÈRE MAÎTRISÉE", "BEHEERST LICHT"],
  ["Lumière maîtrisée", "Beheerst licht"],
  ["Parc-like Parcing", "Parkachtige parking"],
  [
    "Chaque détail est pensé avec exigence : volumes, matières et lumière au service d'une acquisition patrimoniale cohérente.",
    "Elk detail is zorgvuldig doordacht: volumes, materialen en licht in dienst van een coherente patrimoniale aankoop.",
  ],
  [
    "Chaque détail est pensé avec exigence : volumes, matières et lumière au service d&rsquo;une acquisition patrimoniale cohérente.",
    "Elk detail is zorgvuldig doordacht: volumes, materialen en licht in dienst van een coherente patrimoniale aankoop.",
  ],
  [
    "Chaque détail est pensé avec exigence : volumes, matières et lumière au service d&amp;rsquo;une acquisition patrimoniale cohérente.",
    "Elk detail is zorgvuldig doordacht: volumes, materialen en licht in dienst van een coherente patrimoniale aankoop.",
  ],
  ["Intérieurs d&rsquo;exception", "Uitzonderlijke interieurs"],
  ["Intérieurs d&amp;rsquo;exception", "Uitzonderlijke interieurs"],
  ["Interieurs d exception", "Uitzonderlijke interieurs"],
  ["Two levels", "Twee niveaus"],
  ["Investirissement", "Investering"],
  ["OASIS CONFIDENTIELLE AU CŒUR DE MARRAKECH", "VERTROUWELIJKE OASE IN HET HART VAN MARRAKECH"],
  ["OASIS CONFIDENTIELLE AU C&amp;OElig;UR DE MARRAKECH", "VERTROUWELIJKE OASE IN HET HART VAN MARRAKECH"],
  ["Adresses", "Adressen"],
  ["Intérieur", "Interieur"],
  ["Envoyer<br>\n                    une demande", "Een aanvraag<br>\n                    verzenden"],
  ["Envoyer une demande", "Een aanvraag verzenden"],
  [
    "Merci pour votre demande. Nous avons bien reçu votre message et vous recontacterons prochainement.",
    "Bedankt voor uw aanvraag. Wij hebben uw bericht goed ontvangen en nemen binnenkort contact met u op.",
  ],
  ["Demande", "Aanvraag"],
  ["Rappel", "Terugbelverzoek"],
  ["Nom", "Naam"],
  ["Téléphone", "Telefoon"],
  ["Envoyer la demande", "Aanvraag verzenden"],
  ["En cliquant, vous acceptez notre", "Door te klikken accepteert u onze"],
  ["à notre", "onze"],
  ["politique de confidentialité", "privacyverklaring"],
  ["call time", "Tijdstip gesprek"],
  ["Permanent outdoor recreation spaces", "Permanente buitenruimtes"],
  ["Video-monitored playgrounds", "Beveiligde speelzones"],
  ["Portable outdoor furniture", "Flexibel buitenmeubilair"],
  ["Maison OFF MARKET", "OFF MARKET"],
  ["Sélection privée d'opportunités immobilières à Marrakech.", "Private selectie van vastgoedkansen in Marrakech."],
  ["Veuillez pivoter votre appareil<br>to&nbsp;portrait mode", "Draai uw apparaat<br>naar portretmodus"],
  ["Veuillez pivoter votre appareil<br>to&nbsp;landscape mode", "Draai uw apparaat<br>naar landschapsmodus"],
  ["Veuillez pivoter votre appareil<br>to portrait mode", "Draai uw apparaat<br>naar portretmodus"],
  ["Veuillez pivoter votre appareil<br>to landscape mode", "Draai uw apparaat<br>naar landschapsmodus"],
];

const IT_OFF_PLAN_REPLACEMENTS: readonly Replacement[] = [
  ["Skip to main content", "Vai al contenuto principale"],
  ["Private properties", "Immobili privati"],
  ["Contact us", "Contattaci"],
  ["Request access", "Richiedi l'accesso"],
  ["Off-plan", "Su piano"],
  ["Simulator", "Simulatore"],
  ["Private real estate in Marrakech", "Immobiliare privato a Marrakech"],
  ["Marrakech, Morocco", "Marrakech, Marocco"],
  ["Marrakech, Maroc", "Marrakech, Marocco"],
  ["Marrakech, Maroccoco", "Marrakech, Marocco"],
  ["Marrakech, Maroccocococo", "Marrakech, Marocco"],
  ["Marrakech, Maroccoco", "Marrakech, Marocco"],
  ["All rights reserved", "Tutti i diritti riservati"],
  ["Legal notice", "Note legali"],
  ["Privacy policy", "Informativa sulla privacy"],
  ["Villas privéescious Swimming Pool", "Ville private Piscina"],
  ["Villas privéescious<br>\nSwimming Pool", "Ville private<br>\nPiscina"],
  ["Ville privatecious Swimming Pool", "Ville private Piscina"],
  ["Ville privatecious<br>\nSwimming Pool", "Ville private<br>\nPiscina"],
  ["Private villascious", "Ville private"],
  ["Private villas", "Ville private"],
  ["Appartements premium", "Appartamenti premium"],
  ["Beauty hammam", "Hammam elegante"],
  ["Center à grandes ouvertures", "Centro con ampie aperture"],
  ["Center<br>\nà grandes ouvertures", "Centro<br>\ncon ampie aperture"],
  ["Beauty</span>", "Elegante</span>"],
  ["Stone Hammam", "Hammam in pietra"],
  ["Winding paths, paved with gray granite, resemble creeks and riverbeds that flow gently around OFF MARKET. White froth of hydrangeas and slender torsos of shadberries, suspended above invisible water, become a picturesque backdrop for a riverside walk.", "Sentieri sinuosi in granito grigio accompagnano la passeggiata intorno a OFF MARKET. Vegetazione, ombra e linee minerali creano uno scenario sereno per un ritmo abitativo discreto."],
  ["Winding paths, paved with&nbsp;gray granite, resemble creeks and riverbeds that flow gently around&nbsp;OFF MARKET. White froth of&nbsp;hydrangeas and slender torsos of&nbsp;shadberries, suspended above&nbsp;invisible water, become a&nbsp;picturesque backdrop for&nbsp;a&nbsp;riverside walk.", "Sentieri sinuosi in granito grigio accompagnano la passeggiata intorno a OFF MARKET. Vegetazione, ombra e linee minerali creano uno scenario sereno per un ritmo abitativo discreto."],
  ["Permanent outdoor recreation spaces", "Spazi ricreativi esterni permanenti"],
  ["Video-monitored playgrounds", "Aree gioco videosorvegliate"],
  ["Portable outdoor furniture", "Arredi esterni flessibili"],
  ["of beautiful reality", "coerente con il tuo progetto"],
  ["of&nbsp;beautiful reality", "coerente con il tuo progetto"],
  ["Internis d rsquo;exception", "Interni d'eccezione"],
  ["Internis d&amp;rsquo;exception", "Interni d'eccezione"],
  ["Two levels", "Due livelli"],
  ["Volumes patrimoniaux", "Volumi patrimoniali"],
  ["Transparent panoramic railing", "Parapetto panoramico trasparente"],
  ["Park-like Parcing", "Parcheggio immerso nel verde"],
  ["Investirissement", "Investimento"],
  ["Adresses", "Indirizzi"],
  ["Maison OFF MARKET", "OFF MARKET"],
  ["Envoyer une demande", "Invia una richiesta"],
  ["Rappel", "Richiamami"],
  ["Nomeee", "Nome"],
  ["Nomeeee", "Nome"],
  ["call time", "Orario della chiamata"],
  ["to portrait mode", "alla modalità verticale"],
  ["to landscape mode", "alla modalità orizzontale"],
  ["to&nbsp;portrait mode", "alla modalità verticale"],
  ["to&nbsp;landscape mode", "alla modalità orizzontale"],
  ["to portrait mode", "alla modalità verticale"],
  ["to landscape mode", "alla modalità orizzontale"],
  ["une demande", "una richiesta"],
];

const ROUTE_REPLACEMENTS: Record<"en" | "it" | "nl", readonly Replacement[]> = {
  en: [
    ['href="/"', 'href="/en/"'],
    ['href="/about/"', 'href="/en/about/"'],
    ['href="/quartiers/"', 'href="/en/neighbourhoods/"'],
    ['href="/nos-projets/"', 'href="/en/projects/"'],
    ['href="/simulateur/"', 'href="/en/simulator/"'],
    ['href="/simulateur"', 'href="/en/simulator/"'],
    ['href="/sur-plan/"', 'href="/en/off-plan/"'],
    ['href="/sur-plan"', 'href="/en/off-plan/"'],
    ['href="/contact/"', 'href="/en/contact/"'],
    ['href="/contact"', 'href="/en/contact/"'],
    ['href="/off-market/"', 'href="/en/off-market/"'],
    ['href="/off-market"', 'href="/en/off-market/"'],
    ['href="/blog/"', 'href="/en/blog/"'],
    ['href="/blog"', 'href="/en/blog/"'],
    ['href="/privacy-policy/"', 'href="/en/privacy-policy/"'],
  ],
  nl: [
    ['href="/"', 'href="/nl/"'],
    ['href="/about/"', 'href="/nl/over-ons/"'],
    ['href="/quartiers/"', 'href="/nl/wijken/"'],
    ['href="/nos-projets/"', 'href="/nl/projecten/"'],
    ['href="/simulateur/"', 'href="/nl/simulator/"'],
    ['href="/simulateur"', 'href="/nl/simulator/"'],
    ['href="/sur-plan/"', 'href="/nl/nieuwbouw/"'],
    ['href="/sur-plan"', 'href="/nl/nieuwbouw/"'],
    ['href="/contact/"', 'href="/nl/contact/"'],
    ['href="/contact"', 'href="/nl/contact/"'],
    ['href="/off-market/"', 'href="/nl/off-market/"'],
    ['href="/off-market"', 'href="/nl/off-market/"'],
    ['href="/blog/"', 'href="/nl/blog/"'],
    ['href="/blog"', 'href="/nl/blog/"'],
    ['href="/privacy-policy/"', 'href="/nl/privacybeleid/"'],
    ['href="/en/"', 'href="/nl/"'],
    ['href="/en/contact/"', 'href="/nl/contact/"'],
    ['href="/en/off-market/"', 'href="/nl/off-market/"'],
    ['href="/en/off-plan/"', 'href="/nl/nieuwbouw/"'],
  ],
  it: [
    ['href="/"', 'href="/it/"'],
    ['href="/about/"', 'href="/it/"'],
    ['href="/quartiers/"', 'href="/it/"'],
    ['href="/nos-projets/"', 'href="/it/"'],
    ['href="/simulateur/"', 'href="/it/"'],
    ['href="/simulateur"', 'href="/it/"'],
    ['href="/sur-plan/"', 'href="/it/progetti-su-piano/"'],
    ['href="/sur-plan"', 'href="/it/progetti-su-piano/"'],
    ['href="/contact/"', 'href="/it/contatto/"'],
    ['href="/contact"', 'href="/it/contatto/"'],
    ['href="/off-market/"', 'href="/it/off-market/"'],
    ['href="/off-market"', 'href="/it/off-market/"'],
    ['href="/blog/"', 'href="/it/"'],
    ['href="/blog"', 'href="/it/"'],
    ['href="/privacy-policy/"', 'href="/it/"'],
  ],
};

function replaceAllLiteral(value: string, from: string, to: string): string {
  return value.split(from).join(to);
}

function localizeHtml(html: string, replacements: readonly Replacement[]): string {
  return [...replacements]
    .sort((a, b) => b[0].length - a[0].length)
    .reduce((result, [from, to]) => replaceAllLiteral(result, from, to), html);
}

function localizeSegments(
  segments: BodySegment[],
  replacements: readonly Replacement[],
): BodySegment[] {
  return segments.map((segment) =>
    segment.kind === "html"
      ? { ...segment, html: localizeHtml(segment.html, replacements) }
      : segment,
  );
}

export function localizeBusinessLegacyContent(content: PageContent): PageContent {
  const locale = content.htmlLang as SiteLocale;
  const replacements =
    locale === "en"
      ? [...ROUTE_REPLACEMENTS.en, ...COMMON_OFF_PLAN_REPLACEMENTS, ...EN_OFF_PLAN_REPLACEMENTS]
      : locale === "nl"
        ? [...ROUTE_REPLACEMENTS.nl, ...COMMON_OFF_PLAN_REPLACEMENTS, ...NL_OFF_PLAN_REPLACEMENTS]
        : locale === "it"
          ? [...ROUTE_REPLACEMENTS.it, ...IT_OFF_PLAN_REPLACEMENTS]
          : [];

  if (!replacements.length) return content;

  return {
    ...content,
    bodySegments: localizeSegments(content.bodySegments, replacements).map((segment) => {
      if (locale !== "it" || segment.kind !== "html") return segment;
      return {
        ...segment,
        html: segment.html.replace(/Marrakech,\s+Maroc\w*/g, "Marrakech, Marocco"),
      };
    }),
  };
}
