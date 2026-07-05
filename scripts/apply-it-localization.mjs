#!/usr/bin/env node
/**
 * Applies Italian copy + internal link fixes to home-it.json and progetti-it.json.
 * Run: node scripts/apply-it-localization.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const EN_SCRIPT_PATH = path.join(ROOT, "scripts/apply-en-localization.mjs");

const HOME_META = {
  title: "OFF MARKET Marrakech | Immobili di lusso riservati",
  description:
    "Accedi a opportunità immobiliari riservate a Marrakech: ville di lusso, proprietà off-market, progetti su piano e investimenti selezionati.",
  canonical: "https://offmarket.ma/it/",
  ogTitle: "OFF MARKET Marrakech | Immobili di lusso riservati",
  ogDescription:
    "Accedi a opportunità immobiliari riservate a Marrakech: ville di lusso, proprietà off-market, progetti su piano e investimenti selezionati.",
  ogLocale: "it_IT",
  twitterTitle: "OFF MARKET Marrakech | Immobili di lusso riservati",
  twitterDescription:
    "Accedi a opportunità immobiliari riservate a Marrakech: ville di lusso, proprietà off-market, progetti su piano e investimenti selezionati.",
  htmlLang: "it",
};

const OFFPLAN_META = {
  title: "Immobili su piano a Marrakech | OFF MARKET",
  description:
    "Scopri una selezione di progetti immobiliari su piano a Marrakech, dagli appartamenti premium alle ville private, con accompagnamento prima della prenotazione e dell'acquisto.",
  canonical: "https://offmarket.ma/it/progetti-su-piano/",
  ogTitle: "Immobili su piano a Marrakech | OFF MARKET",
  ogDescription:
    "Scopri una selezione di progetti immobiliari su piano a Marrakech, dagli appartamenti premium alle ville private, con accompagnamento prima della prenotazione e dell'acquisto.",
  ogLocale: "it_IT",
  twitterTitle: "Immobili su piano a Marrakech | OFF MARKET",
  twitterDescription:
    "Scopri una selezione di progetti immobiliari su piano a Marrakech, dagli appartamenti premium alle ville private, con accompagnamento prima della prenotazione e dell'acquisto.",
  htmlLang: "it",
};

const CONTACT_META = {
  title: "Contattare OFF MARKET Marrakech | Accesso immobiliare privato",
  description:
    "Contatta OFF MARKET Marrakech per discutere un progetto immobiliare privato, una ricerca off-market, un investimento su piano o l'acquisto di una villa di lusso.",
  canonical: "https://offmarket.ma/it/contatto/",
  ogType: "website",
  ogTitle: "Contatto OFF MARKET Marrakech | Accesso immobiliare riservato",
  ogDescription:
    "Contatta OFF MARKET Marrakech per discutere un progetto immobiliare riservato, una ricerca off-market, un investimento su piano o l'acquisto di una villa di prestigio.",
  ogLocale: "it_IT",
  twitterTitle: "Contatto OFF MARKET Marrakech | Accesso immobiliare riservato",
  twitterDescription:
    "Contatta OFF MARKET Marrakech per discutere un progetto immobiliare riservato, una ricerca off-market, un investimento su piano o l'acquisto di una villa di prestigio.",
  htmlLang: "it",
};

function extractEnTextReplacements() {
  const source = fs.readFileSync(EN_SCRIPT_PATH, "utf8");
  const match = source.match(/const TEXT_REPLACEMENTS = (\[[\s\S]*?\n\]);/);
  if (!match) {
    throw new Error("Could not extract TEXT_REPLACEMENTS from apply-en-localization.mjs");
  }
  return Function(`"use strict"; return (${match[1]});`)();
}

const IT_TEXT_REPLACEMENTS = [
  [
    "OFF MARKET accompagne les acheteurs, investisseurs et propriétaires avec une sélection ciblée, une analyse claire et un accès discret aux opportunités pertinentes.",
    "OFF MARKET accompagna acquirenti, investitori e proprietari con una selezione mirata, un'analisi chiara e un accesso discreto alle opportunita pertinenti.",
  ],
  [
    "Accédez à une sélection confidentielle de villas, appartements et opportunités sur plan, choisie pour son emplacement, sa rareté et sa cohérence d'investissement.",
    "Accedi a una selezione confidenziale di ville, appartamenti e opportunita su piano, scelta per posizione, rarita e coerenza d'investimento.",
  ],
  [
    "Remplissez le formulaire pour accéder aux projets confidentiels et recevoir une sélection privée adaptée à votre budget.",
    "Compila il modulo per accedere ai progetti confidenziali e ricevere una selezione privata in linea con il tuo budget.",
  ],
  [
    "Des biens sélectionnés en dehors des circuits classiques, avec des informations essentielles visibles et un dossier complet transmis sur demande.",
    "Immobili selezionati fuori dai circuiti tradizionali, con informazioni essenziali visibili e dossier completo su richiesta.",
  ],
  [
    "Nous cherchions une opportunité claire, pas une liste de biens. OFF MARKET nous a aidés à comprendre l'adresse, la demande et le potentiel avant même la première visite.",
    "Cercavamo un'opportunita chiara, non un elenco di immobili. OFF MARKET ci ha aiutato a comprendere indirizzo, domanda e potenziale prima ancora della prima visita.",
  ],
  [
    "Estimation indicative. OFF MARKET affine cette simulation avec l'adresse exacte, les charges réelles et les biens disponibles.",
    "Stima indicativa. OFF MARKET perfeziona questa simulazione con l'indirizzo esatto, i costi reali e gli immobili disponibili.",
  ],
  [
    "Estimez le potentiel d'un bien à Marrakech selon votre usage, puis affinez les chiffres avec",
    "Stima il potenziale di un immobile a Marrakech in base al tuo utilizzo, poi affina i dati con",
  ],
  [
    "Terrains, maisons, hôtels et restaurants vous attendent en off-market.",
    "Terreni, case, hotel e ristoranti ti aspettano in off-market.",
  ],
  [
    "Inscrivez-vous pour avoir accès à la sélection privée.",
    "Registrati per accedere alla selezione privata.",
  ],
  [
    "Une maison privée pour lire le marché immobilier de Marrakech avec exigence.",
    "Una casa privata per leggere il mercato immobiliare di Marrakech con rigore.",
  ],
  [
    "Des biens rares, des adresses confidentielles et une lecture claire avant chaque décision.",
    "Immobili rari, indirizzi confidenziali e una lettura chiara prima di ogni decisione.",
  ],
  [
    "Une sélection privée, révélée avec discrétion.",
    "Una selezione privata, rivelata con discrezione.",
  ],
  [
    "Les zones où se construisent les meilleures opportunités",
    "Le zone dove prendono forma le migliori opportunita",
  ],
  [
    "Les zones où se construisent",
    "Le zone dove",
  ],
  [
    "En cliquant sur le bouton, vous acceptez que OFF MARKET vous contacte au sujet de votre demande.",
    "Cliccando sul pulsante, accetti che OFF MARKET ti contatti in merito alla tua richiesta.",
  ],
  [
    "Merci pour votre demande. Nous avons bien reçu votre message et vous recontacterons prochainement.",
    "Grazie per la tua richiesta. Abbiamo ricevuto il tuo messaggio e ti ricontatteremo a breve.",
  ],
  [
    "Sélection privée d'opportunités immobilières à Marrakech.",
    "Selezione privata di opportunita immobiliari a Marrakech.",
  ],
  [
    "Dites-nous ce que vous recherchez.",
    "Dicci cosa stai cercando.",
  ],
  [
    "vous répond avec une sélection ciblée, une analyse claire et un accompagnement discret.",
    "ti risponde con una selezione mirata, un'analisi chiara e un accompagnamento discreto.",
  ],
  [
    "Votre projet mérite une lecture privée.",
    "Il tuo progetto merita una lettura privata.",
  ],
  [
    "Votre message, votre projet ou vos critères spécifiques",
    "Il tuo messaggio, il tuo progetto o i tuoi criteri specifici",
  ],
  [
    "OFF MARKET. Tous droits réservés.",
    "OFF MARKET. Tutti i diritti riservati.",
  ],
  [
    "15+ projets privés suivis à Marrakech",
    "15+ progetti privati seguiti a Marrakech",
  ],
  [
    "À partir de 351 000 €",
    "Da 351.000 EUR",
  ],
  [
    "Ajustez vos hypothèses. Le résultat se recalcule en direct.",
    "Regola le tue ipotesi. Il risultato si ricalcola in tempo reale.",
  ],
  [
    "Afficher les hypothèses avancées",
    "Mostra ipotesi avanzate",
  ],
  [
    "after charges, commission and tax",
    "prima di oneri, imposte e costi operativi reali",
  ],
  [
    "RENDEMENT NET ANNUEL",
    "RENDIMENTO ANNUO LORDO",
  ],
  [
    "RENDEMENT BRUT ANNUEL",
    "RENDIMENTO ANNUO LORDO",
  ],
  [
    "PLUS-VALUE BRUTE ESTIMÉE",
    "PLUSVALENZA LORDA STIMATA",
  ],
  [
    "avant charges, fiscalité et frais réels",
    "prima di oneri, imposte e costi operativi reali",
  ],
  [
    "les meilleures opportunités",
    "le migliori opportunita prendono forma",
  ],
  [
    "Send<br>\n                    une demande",
    "Invia<br>\n                    una richiesta",
  ],
  [
    "Send<br> une demande",
    "Invia<br>una richiesta",
  ],
  [
    'aria-label="Fermer"',
    'aria-label="Chiudi"',
  ],
  [
    'aria-label="Fermer la fiche"',
    'aria-label="Chiudi i dettagli immobile"',
  ],
  [
    'aria-label="Paramètres de simulation"',
    'aria-label="Impostazioni simulazione"',
  ],
  [
    'aria-label="Modes de simulation"',
    'aria-label="Modalita simulazione"',
  ],
  [
    'aria-label="Territoires d\'investissement in Marrakech"',
    'aria-label="Territori di investimento a Marrakech"',
  ],
  [
    'aria-label="Afficher le témoignage suivant"',
    'aria-label="Mostra testimonianza successiva"',
  ],
  [
    'aria-label="Navigation fiche bien"',
    'aria-label="Navigazione scheda immobile"',
  ],
  [
    'aria-label="Retour en haut de page"',
    'aria-label="Torna in cima alla pagina"',
  ],
  [
    'aria-label="Expérience OFF MARKET"',
    'aria-label="Esperienza OFF MARKET"',
  ],
  [
    'aria-label="Slide précédente"',
    'aria-label="Slide precedente"',
  ],
  [
    'aria-label="Navigation principale"',
    'aria-label="Navigazione principale"',
  ],
  [
    "Budget d'acquisition",
    "Budget di acquisizione",
  ],
  [
    "Ce que nos clients viennent chercher",
    "Cio che i nostri clienti cercano",
  ],
  [
    "clients qualifiés accompagnés",
    "clienti qualificati accompagnati",
  ],
  [
    "Découvrir notre approche",
    "Scopri il nostro approccio",
  ],
  [
    "Demander un accès privé",
    "Richiedi accesso privato",
  ],
  [
    "Demander l&rsquo;accès",
    "Richiedi l'accesso",
  ],
  [
    "Demander l'accès",
    "Richiedi l'accesso",
  ],
  [
    "Débloquer l&rsquo;accès",
    "Sblocca l'accesso",
  ],
  [
    "Détails sur demande",
    "Dettagli su richiesta",
  ],
  [
    "Envoyer la demande",
    "Invia richiesta",
  ],
  [
    "Hypothèse de valorisation annuelle",
    "Ipotesi di rivalutazione annua",
  ],
  [
    "Horizon de revente",
    "Orizzonte di rivendita",
  ],
  [
    "Loyer mensuel estimé",
    "Canone mensile stimato",
  ],
  [
    "L'immobilier privé",
    "L'immobiliare privato",
  ],
  [
    "Immobilier privé à Marrakech",
    "Immobiliare privato a Marrakech",
  ],
  [
    "Location courte durée",
    "Affitto a breve termine",
  ],
  [
    "Location longue durée",
    "Affitto a lungo termine",
  ],
  [
    "Marrakech, Maroc",
    "Marrakech, Marocco",
  ],
  [
    "Nom complet",
    "Nome completo",
  ],
  [
    "Numéro de téléphone",
    "Numero di telefono",
  ],
  [
    "Opportunités investisseur",
    "Opportunita per investitori",
  ],
  [
    "Opportunités rares à Marrakech",
    "Opportunita rare a Marrakech",
  ],
  [
    "Parler à un conseiller",
    "Parla con un consulente",
  ],
  [
    "Plans transmis sur demande",
    "Planimetrie condivise su richiesta",
  ],
  [
    "Plans & configuration",
    "Planimetrie e configurazione",
  ],
  [
    "Prix estimé du bien, hors frais.",
    "Prezzo stimato dell'immobile, al netto delle spese.",
  ],
  [
    "Prix nuitée moyen",
    "Tariffa media per notte",
  ],
  [
    "Projet sur plan",
    "Progetto su piano",
  ],
  [
    "Recevoir la sélection off-market",
    "Ricevi la selezione off-market",
  ],
  [
    "Recevoir une analyse privée",
    "Ricevi un'analisi privata",
  ],
  [
    "Recevoir le dossier",
    "Ricevi il dossier",
  ],
  [
    "Résidence secondaire · Marrakech",
    "Seconda residenza · Marrakech",
  ],
  [
    "Riads de caractère",
    "Riads di carattere",
  ],
  [
    "Sélection actualisée régulièrement.",
    "Selezione aggiornata regolarmente.",
  ],
  [
    "Sélectionnez votre budget",
    "Seleziona il tuo budget",
  ],
  [
    "Semaines d'usage personnel",
    "Settimane di utilizzo personale",
  ],
  [
    "Simuler avant d'investir",
    "Simula prima di investire",
  ],
  [
    "Taux d'imposition",
    "Aliquota fiscale",
  ],
  [
    "Taux d'occupation",
    "Tasso di occupazione",
  ],
  [
    "Choisir la langue",
    "Scegli la lingua",
  ],
  [
    "Biens accessibles sur dossier",
    "Immobili disponibili su dossier",
  ],
  [
    "Typologies suivies",
    "Tipologie monitorate",
  ],
  [
    "Veuillez pivoter votre appareil",
    "Ruota il dispositivo",
  ],
  [
    "Villa sur plan",
    "Villa su piano",
  ],
  [
    "Villas privées",
    "Ville private",
  ],
  [
    "Voir la sélection",
    "Vedi la selezione",
  ],
  [
    "Voir les biens compatibles",
    "Vedi immobili compatibili",
  ],
  [
    "Votre nom complet",
    "Il tuo nome completo",
  ],
  [
    "votre@email.com",
    "tuo@email.com",
  ],
  [
    "ADRESSES CONFIDENTIELLES",
    "INDIRIZZI CONFIDENZIALI",
  ],
  [
    "ACCÈS PRIVÉ",
    "ACCESSO PRIVATO",
  ],
  [
    "Accompagnement discret",
    "Accompagnamento discreto",
  ],
  [
    "Acheteur privé",
    "Acquirente privato",
  ],
  [
    "Analyse claire",
    "Analisi chiara",
  ],
  [
    "Appartements Guéliz",
    "Appartamenti Guéliz",
  ],
  [
    "Biens privés",
    "Immobili privati",
  ],
  [
    "Biens sur plan",
    "Immobili su piano",
  ],
  [
    "Confidentialité",
    "Privacy",
  ],
  [
    "Indicatif pays",
    "Prefisso paese",
  ],
  [
    "Lectures privées",
    "LETTURE RISERVATE",
  ],
  [
    "Lectures privées",
    "Letture riservate",
  ],
  [
    "LECTURES PRIVÉES",
    "LETTURE RISERVATE",
  ],
  [
    "Mentions légales",
    "Note legali",
  ],
  [
    "Notre Histoire",
    "La nostra storia",
  ],
  [
    "Nous contacter",
    "Contattaci",
  ],
  [
    "PARLONS-EN",
    "PARLIAMONE",
  ],
  [
    "PARAMÈTRES",
    "IMPOSTAZIONI",
  ],
  [
    "QUARTIERS",
    "QUARTIERI",
  ],
  [
    "QUI SOMMES-NOUS",
    "CHI SIAMO",
  ],
  [
    "Quartiers",
    "Quartieri",
  ],
  [
    "Rappel",
    "Promemoria",
  ],
  [
    "RÉSULTAT",
    "RISULTATO",
  ],
  [
    "Rez-de-chaussée",
    "Piano terra",
  ],
  [
    "SIMULATEUR PRIVÉ",
    "SIMULATORE PRIVATO",
  ],
  [
    "Sélection ciblée",
    "Selezione mirata",
  ],
  [
    "Sélection :",
    "Selezione:",
  ],
  [
    "Sur plan",
    "Su piano",
  ],
  [
    "À propos",
    "Chi siamo",
  ],
  [
    "Accueil",
    "Home",
  ],
  [
    "Achat-revente",
    "Acquisto-rivendita",
  ],
  [
    "Caractéristiques",
    "Caratteristiche",
  ],
  [
    "Contact",
    "Contatto",
  ],
  [
    "Demande",
    "Richiesta",
  ],
  [
    "Email",
    "Email",
  ],
  [
    "Envoyer",
    "Invia",
  ],
  [
    "Extérieur",
    "Esterno",
  ],
  [
    "Galerie",
    "Galleria",
  ],
  [
    "Général",
    "Generale",
  ],
  [
    "Intérieur",
    "Interni",
  ],
  [
    "Message",
    "Messaggio",
  ],
  [
    "Navigation",
    "Navigazione",
  ],
  [
    "Nom",
    "Nome",
  ],
  [
    "Numéro",
    "Numero",
  ],
  [
    "Plans",
    "Planimetrie",
  ],
  [
    "Prix",
    "Prezzo",
  ],
  [
    "Projet",
    "Progetto",
  ],
  [
    "Salles d'eau",
    "Bagni",
  ],
  [
    "Simulateur",
    "Simulatore",
  ],
  [
    "Suites",
    "Suite",
  ],
  [
    "Suivant",
    "Successivo",
  ],
  [
    "Surface",
    "Superficie",
  ],
  [
    "Téléphone",
    "Telefono",
  ],
  [
    "Voir",
    "Vedi",
  ],
  [
    "à Marrakech",
    "a Marrakech",
  ],
  [
    "(optionnel)",
    "(facoltativo)",
  ],
  [
    "politique de confidentialité",
    "informativa sulla privacy",
  ],
  [
    "En cliquant, vous acceptez notre",
    "Cliccando accetti la nostra",
  ],
  [
    "à notre",
    "alla nostra",
  ],
  // Off-plan page specific
  [
    "La sélection à portée de main",
    "La selezione a portata di mano",
  ],
  [
    "OFF MARKET sécurise chaque parcours jusqu&rsquo;à la décision finale, avec un accompagnement clair et discret.",
    "OFF MARKET tutela ogni percorso fino alla decisione finale, con un accompagnamento chiaro e discreto.",
  ],
  [
    "OFF MARKET sécurise chaque parcours jusqu&amp;rsquo;à la décision finale, avec un accompagnement clair et discret.",
    "OFF MARKET tutela ogni percorso fino alla decisione finale, con un accompagnamento chiaro e discreto.",
  ],
  [
    "Marrakech se révèle autrement selon l&rsquo;adresse : prestige central, rendement urbain, villas privées ou horizon patrimonial.",
    "Marrakech si rivela in modo diverso a seconda dell'indirizzo: prestigio centrale, rendimento urbano, ville private o orizzonte patrimoniale.",
  ],
  [
    "Marrakech se révèle autrement selon l&amp;rsquo;adresse : prestige central, rendement urbain, villas privées ou horizon patrimonial sur l&amp;rsquo;Atlas.",
    "Marrakech si rivela in modo diverso a seconda dell'indirizzo: prestigio centrale, rendimento urbano, ville private o orizzonte patrimoniale sull'Atlas.",
  ],
  [
    "Une méthode devient signature",
    "Un metodo diventa firma",
  ],
  [
    "Une méthode",
    "Un metodo",
  ],
  [
    "devient signature",
    "diventa firma",
  ],
  [
    "Des programmes sur plan sélectionnés pour leur architecture, leur emplacement et leur potentiel patrimonial à Marrakech.",
    "Programmi su piano selezionati per architettura, posizione e potenziale patrimoniale a Marrakech.",
  ],
  [
    "Des programmes sur plan sélectionnés pour leur architecture, leur emplacement et leur potentiel patrimonial in Marrakech.",
    "Programmi su piano selezionati per architettura, posizione e potenziale patrimoniale a Marrakech.",
  ],
  [
    "Nous cadrons votre recherche, votre horizon, votre budget et votre logique d&rsquo;achat avec méthode et discrétion.",
    "Inquadriamo la tua ricerca, il tuo orizzonte, il tuo budget e la tua logica d'acquisto con metodo e discrezione.",
  ],
  [
    "Nous cadrons votre recherche, votre horizon, votre budget et votre logique d&amp;rsquo;achat avec méthode et discrétion.",
    "Inquadriamo la tua ricerca, il tuo orizzonte, il tuo budget e la tua logica d'acquisto con metodo e discrezione.",
  ],
  [
    "Nous filtrons les biens selon leur adresse, leur potentiel, leur cohérence et leur niveau de confidentialité.",
    "Filtriamo gli immobili in base a indirizzo, potenziale, coerenza e livello di riservatezza.",
  ],
  [
    "Nous accompagnons les échanges, les vérifications et la lecture stratégique de l&rsquo;opportunité.",
    "Accompagniamo scambi, verifiche e lettura strategica dell'opportunita.",
  ],
  [
    "Nous accompagnons les échanges, les vérifications et la lecture stratégique de l&amp;rsquo;opportunité.",
    "Accompagniamo scambi, verifiche e lettura strategica dell'opportunita.",
  ],
  [
    "Des adresses singulières dans les quartiers historiques, sélectionnées pour leur charme, leur potentiel et leur rareté.",
    "Indirizzi singolari nei quartieri storici, selezionati per fascino, potenziale e rarita.",
  ],
  [
    "Nous sécurisons le parcours jusqu&rsquo;à la décision finale, avec un accompagnement clair et discret.",
    "Mettiamo in sicurezza il percorso fino alla decisione finale, con un accompagnamento chiaro e discreto.",
  ],
  [
    "Nous sécurisons le parcours jusqu&amp;rsquo;à la décision finale, avec un accompagnement clair et discret.",
    "Mettiamo in sicurezza il percorso fino alla decisione finale, con un accompagnamento chiaro e discreto.",
  ],
  [
    "Comprendre votre projet",
    "Comprendere il tuo progetto",
  ],
  [
    "Une méthode d&rsquo;acquisition en quatre étapes : comprendre, sélectionner, négocier, acquérir.",
    "Un metodo di acquisizione in quattro fasi: comprendere, selezionare, negoziare, acquisire.",
  ],
  [
    "A method d&amp;rsquo;acquisition en quatre étapes : comprendre, sélectionner, négocier, acquérir.",
    "Un metodo di acquisizione in quattro fasi: comprendere, selezionare, negoziare, acquisire.",
  ],
  [
    "Cadrer votre recherche et votre horizon",
    "Definire ricerca e orizzonte",
  ],
  [
    "Sélectionner les biens cohérents",
    "Selezionare immobili coerenti",
  ],
  [
    "Négocier avec discrétion",
    "Negoziare con discrezione",
  ],
  [
    "OFF MARKET compose une sélection",
    "OFF MARKET compone una selezione",
  ],
  [
    "Route de l&rsquo;Ourika — villas, Atlas et horizon long terme. À quelques minutes des adresses patrimoniales.",
    "Route de l'Ourika - ville, Atlas e orizzonte di lungo periodo. A pochi minuti dagli indirizzi patrimoniali.",
  ],
  [
    "Route de l&amp;rsquo;Ourika — villas, Atlas et horizon long terme. À quelques minutes des adresses patrimoniales.",
    "Route de l'Ourika - ville, Atlas e orizzonte di lungo periodo. A pochi minuti dagli indirizzi patrimoniali.",
  ],
  [
    "Des terrasses de vue où la lumière, la pierre et le jardin composent un cadre de vie discret et mémorable.",
    "Terrazze panoramiche dove luce, pietra e giardino compongono un ambiente di vita discreto e memorabile.",
  ],
  [
    "Lumière maîtrisée",
    "Luce controllata",
  ],
  [
    "Chaque détail est pensé avec exigence : volumes, matières et lumière au service d&rsquo;une acquisition patrimoniale cohérente.",
    "Ogni dettaglio e pensato con rigore: volumi, materiali e luce al servizio di un'acquisizione patrimoniale coerente.",
  ],
  [
    "Chaque détail est pensé avec exigence : volumes, matières et lumière au service d&amp;rsquo;une acquisition patrimoniale cohérente.",
    "Ogni dettaglio e pensato con rigore: volumi, materiali e luce al servizio di un'acquisizione patrimoniale coerente.",
  ],
  [
    "Oasis confidentielle au cœur de Marrakech",
    "Oasi confidenziale nel cuore di Marrakech",
  ],
  [
    "Agdal — adresses résidentielles modernes, jardins royaux à proximité et lecture patrimoniale claire.",
    "Agdal - indirizzi residenziali moderni, giardini reali vicini e lettura patrimoniale chiara.",
  ],
  [
    "Villas privéescious",
    "Ville private",
  ],
  [
    "Appartements premium Center",
    "Appartamenti premium centro",
  ],
  [
    "à grandes ouvertures",
    "con ampie aperture",
  ],
  [
    "Négocier",
    "Negoziare",
  ],
  [
    "Acquérir",
    "Acquisire",
  ],
  [
    "Ombres et perspectives",
    "Ombre e prospettive",
  ],
  [
    "Cour intérieure",
    "Corte interna",
  ],
  [
    "Jardins structurants",
    "Giardini strutturanti",
  ],
  [
    "Palette sobre",
    "Palette sobria",
  ],
  [
    "Singulier",
    "Singolare",
  ],
  [
    "Panoramique",
    "Panoramico",
  ],
  [
    "Terraces",
    "Terrazze",
  ],
  [
    "discrète",
    "discreta",
  ],
];

const IT_FINALIZATION_REPLACEMENTS = [
  [
    "après charges, commission et fiscalité",
    "prima di oneri, imposte e costi operativi reali",
  ],
  ["Étage", "Piano"],
  [
    "Un metodo d&amp;rsquo;acquisition en quatre étapes : comprendre, sélectionner, négocier, acquérir.",
    "Un metodo di acquisizione in quattro fasi: comprendere, selezionare, negoziare, acquisire.",
  ],
  [
    "Des programmes sur plan sélectionnés pour leur architecture, leur emplacement et leur potentiel patrimonial a Marrakech.",
    "Programmi su piano selezionati per architettura, posizione e potenziale patrimoniale a Marrakech.",
  ],
  ["Choisir la langue", "Scegli la lingua"],
  [
    "Biens accessibles sur dossier",
    "Immobili disponibili su richiesta",
  ],
];

const HREF_REPLACEMENTS = [
  ['href="/contact/"', 'href="/it/contatto/"'],
  ['href="/sur-plan/"', 'href="/it/progetti-su-piano/"'],
  ['href="/sur-plan"', 'href="/it/progetti-su-piano/"'],
  ['href="/off-market/"', 'href="/it/off-market/"'],
  ['href="/about/"', 'href="/it/"'],
  ['href="/nos-projets/"', 'href="/it/"'],
];

function applyReplacements(text, pairs) {
  let out = text;
  for (const [from, to] of pairs) {
    out = out.split(from).join(to);
  }
  return out;
}

function fixItHomeLogoHref(html) {
  return html
    .replace(/href="\/" class="mv-chrome__logo-link/g, 'href="/it/" class="mv-chrome__logo-link')
    .replace(/href="\/" class="header__logo/g, 'href="/it/" class="header__logo');
}

function isStillFrench(filePath, marker) {
  const raw = fs.readFileSync(filePath, "utf8");
  return raw.includes(marker);
}

function copyFrenchSourceIfNeeded() {
  const homeItPath = path.join(ROOT, "content/pages/home-it.json");
  const homeFrPath = path.join(ROOT, "content/pages/home-fr.json");
  const progettiItPath = path.join(ROOT, "content/pages/progetti-it.json");
  const surPlanFrPath = path.join(ROOT, "content/pages/sur-plan-fr.json");

  if (isStillFrench(homeItPath, "Une maison privée pour lire le marché immobilier de Marrakech avec exigence.")) {
    fs.copyFileSync(homeFrPath, homeItPath);
    console.log("Reset content/pages/home-it.json from home-fr.json");
  }

  if (isStillFrench(progettiItPath, "Une méthode devient signature")) {
    fs.copyFileSync(surPlanFrPath, progettiItPath);
    console.log("Reset content/pages/progetti-it.json from sur-plan-fr.json");
  }
}

function translatePage(filePath, meta) {
  const page = JSON.parse(fs.readFileSync(filePath, "utf8"));
  Object.assign(page, meta);

  for (const segment of page.bodySegments) {
    if (segment.kind !== "html") continue;
    let html = segment.html;
    html = applyReplacements(html, IT_TEXT_REPLACEMENTS);
    html = applyReplacements(html, IT_FINALIZATION_REPLACEMENTS);
    html = applyReplacements(html, HREF_REPLACEMENTS);
    if (filePath.includes("home-it")) {
      html = fixItHomeLogoHref(html);
    }
    segment.html = html;
  }

  fs.writeFileSync(filePath, JSON.stringify(page));
  console.log("Updated", path.relative(ROOT, filePath));
}

function updateContactItMetadata() {
  const filePath = path.join(ROOT, "content/pages/contact-it.json");
  const page = JSON.parse(fs.readFileSync(filePath, "utf8"));
  Object.assign(page, CONTACT_META);
  fs.writeFileSync(filePath, JSON.stringify(page));
  console.log("Updated", path.relative(ROOT, filePath));
}

function countFrenchLeftInBody(filePath) {
  const page = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const html = page.bodySegments
    .filter((segment) => segment.kind === "html")
    .map((segment) => segment.html)
    .join("\n");

  const probes = [
    "Une maison privée",
    "Votre projet mérite une lecture privée.",
    "Demander un accès privé",
    "Nous contacter",
    "Sur plan",
    "Sélection",
    "Immobilier privé à Marrakech",
  ];

  return probes.filter((probe) => html.includes(probe));
}

const enTextReplacements = extractEnTextReplacements();
if (!Array.isArray(enTextReplacements)) {
  throw new Error("Extracted EN replacements is not an array.");
}

if (IT_TEXT_REPLACEMENTS.length !== enTextReplacements.length) {
  throw new Error(
    `Pair count mismatch: IT=${IT_TEXT_REPLACEMENTS.length}, EN=${enTextReplacements.length}`,
  );
}

copyFrenchSourceIfNeeded();
translatePage(path.join(ROOT, "content/pages/home-it.json"), HOME_META);
translatePage(path.join(ROOT, "content/pages/progetti-it.json"), OFFPLAN_META);
updateContactItMetadata();

const remainingFrench = countFrenchLeftInBody(path.join(ROOT, "content/pages/home-it.json"));
console.log("Pair count:", IT_TEXT_REPLACEMENTS.length);
console.log(
  "French sample scan in home-it.json body:",
  remainingFrench.length ? remainingFrench.join(" | ") : "none",
);
