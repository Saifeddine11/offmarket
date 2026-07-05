#!/usr/bin/env node
/**
 * Applies English copy + internal link fixes to home-en.json and off-plan-en.json.
 * Run: node scripts/apply-en-localization.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");

const HOME_META = {
  title: "OFF MARKET Marrakech | Private Luxury Real Estate",
  description:
    "Access selected private real estate opportunities in Marrakech: luxury villas, off-market properties, off-plan projects and confidential investment opportunities.",
  ogTitle: "OFF MARKET Marrakech | Private Luxury Real Estate",
  ogDescription:
    "Access selected private real estate opportunities in Marrakech: luxury villas, off-market properties, off-plan projects and confidential investment opportunities.",
  twitterTitle: "OFF MARKET Marrakech | Private Luxury Real Estate",
  twitterDescription:
    "Access selected private real estate opportunities in Marrakech: luxury villas, off-market properties, off-plan projects and confidential investment opportunities.",
};

const OFFPLAN_META = {
  title: "Off-Plan Properties in Marrakech | OFF MARKET",
  description:
    "Discover selected off-plan real estate opportunities in Marrakech, from premium apartments to private villas, with guidance before reservation and purchase.",
  ogTitle: "Off-Plan Properties in Marrakech | OFF MARKET",
  ogDescription:
    "Discover selected off-plan real estate opportunities in Marrakech, from premium apartments to private villas, with guidance before reservation and purchase.",
  twitterTitle: "Off-Plan Properties in Marrakech | OFF MARKET",
  twitterDescription:
    "Discover selected off-plan real estate opportunities in Marrakech, from premium apartments to private villas, with guidance before reservation and purchase.",
};

/** Longest-first text replacements for visible French copy in EN JSON bodies. */
const TEXT_REPLACEMENTS = [
  [
    "OFF MARKET accompagne les acheteurs, investisseurs et propriétaires avec une sélection ciblée, une analyse claire et un accès discret aux opportunités pertinentes.",
    "OFF MARKET supports buyers, investors and owners with a targeted selection, clear analysis and discreet access to relevant opportunities.",
  ],
  [
    "Accédez à une sélection confidentielle de villas, appartements et opportunités sur plan, choisie pour son emplacement, sa rareté et sa cohérence d'investissement.",
    "Access a confidential selection of villas, apartments and off-plan opportunities, chosen for their location, rarity and investment coherence.",
  ],
  [
    "Remplissez le formulaire pour accéder aux projets confidentiels et recevoir une sélection privée adaptée à votre budget.",
    "Complete the form to access confidential projects and receive a private selection aligned with your budget.",
  ],
  [
    "Des biens sélectionnés en dehors des circuits classiques, avec des informations essentielles visibles et un dossier complet transmis sur demande.",
    "Properties selected outside conventional channels, with essential information visible and a full dossier shared on request.",
  ],
  [
    "Nous cherchions une opportunité claire, pas une liste de biens. OFF MARKET nous a aidés à comprendre l'adresse, la demande et le potentiel avant même la première visite.",
    "We were looking for a clear opportunity, not a property list. OFF MARKET helped us understand the address, demand and potential before the first visit.",
  ],
  [
    "Estimation indicative. OFF MARKET affine cette simulation avec l'adresse exacte, les charges réelles et les biens disponibles.",
    "Indicative estimate. OFF MARKET refines this simulation with the exact address, actual charges and available properties.",
  ],
  [
    "Estimez le potentiel d'un bien à Marrakech selon votre usage, puis affinez les chiffres avec",
    "Estimate the potential of a property in Marrakech according to your use, then refine the figures with",
  ],
  [
    "Terrains, maisons, hôtels et restaurants vous attendent en off-market.",
    "Land, homes, hotels and restaurants await you off-market.",
  ],
  [
    "Inscrivez-vous pour avoir accès à la sélection privée.",
    "Register to access the private selection.",
  ],
  [
    "Une maison privée pour lire le marché immobilier de Marrakech avec exigence.",
    "A private house to read the Marrakech property market with rigour.",
  ],
  [
    "Des biens rares, des adresses confidentielles et une lecture claire avant chaque décision.",
    "Rare properties, confidential addresses and a clear reading before every decision.",
  ],
  [
    "Une sélection privée, révélée avec discrétion.",
    "A private selection, revealed with discretion.",
  ],
  [
    "Les zones où se construisent les meilleures opportunités",
    "The districts where the finest opportunities take shape",
  ],
  [
    "Les zones où se construisent",
    "The districts where",
  ],
  [
    "En cliquant sur le bouton, vous acceptez que OFF MARKET vous contacte au sujet de votre demande.",
    "By clicking the button, you agree that OFF MARKET may contact you about your request.",
  ],
  [
    "Merci pour votre demande. Nous avons bien reçu votre message et vous recontacterons prochainement.",
    "Thank you for your request. We have received your message and will contact you shortly.",
  ],
  [
    "Sélection privée d'opportunités immobilières à Marrakech.",
    "A private selection of real estate opportunities in Marrakech.",
  ],
  [
    "Dites-nous ce que vous recherchez.",
    "Tell us what you are looking for.",
  ],
  [
    "vous répond avec une sélection ciblée, une analyse claire et un accompagnement discret.",
    "will respond with a targeted selection, clear analysis and discreet guidance.",
  ],
  [
    "Votre projet mérite une lecture privée.",
    "Your project deserves a private reading.",
  ],
  [
    "Votre message, votre projet ou vos critères spécifiques",
    "Your message, project details or specific criteria",
  ],
  [
    "OFF MARKET. Tous droits réservés.",
    "OFF MARKET. All rights reserved.",
  ],
  [
    "15+ projets privés suivis à Marrakech",
    "15+ private projects tracked in Marrakech",
  ],
  [
    "À partir de 351 000 €",
    "From €351,000",
  ],
  [
    "Ajustez vos hypothèses. Le résultat se recalcule en direct.",
    "Adjust your assumptions. The result recalculates in real time.",
  ],
  [
    "Afficher les hypothèses avancées",
    "Show advanced assumptions",
  ],
  [
    "after charges, commission and tax",
    "before charges, taxes and real operating costs",
  ],
  [
    "RENDEMENT NET ANNUEL",
    "GROSS ANNUAL YIELD",
  ],
  [
    "RENDEMENT BRUT ANNUEL",
    "GROSS ANNUAL YIELD",
  ],
  [
    "PLUS-VALUE BRUTE ESTIMÉE",
    "ESTIMATED GROSS CAPITAL GAIN",
  ],
  [
    "avant charges, fiscalité et frais réels",
    "before charges, taxes and real operating costs",
  ],
  [
    "les meilleures opportunités",
    "the finest opportunities take shape",
  ],
  [
    "Send<br>\n                    une demande",
    "Send<br>\n                    a request",
  ],
  [
    "Send<br> une demande",
    "Send<br>a request",
  ],
  [
    'aria-label="Fermer"',
    'aria-label="Close"',
  ],
  [
    'aria-label="Fermer la fiche"',
    'aria-label="Close property details"',
  ],
  [
    'aria-label="Paramètres de simulation"',
    'aria-label="Simulation settings"',
  ],
  [
    'aria-label="Modes de simulation"',
    'aria-label="Simulation modes"',
  ],
  [
    'aria-label="Territoires d\'investissement in Marrakech"',
    'aria-label="Investment districts in Marrakech"',
  ],
  [
    'aria-label="Afficher le témoignage suivant"',
    'aria-label="Show next testimonial"',
  ],
  [
    'aria-label="Navigation fiche bien"',
    'aria-label="Property details navigation"',
  ],
  [
    'aria-label="Retour en haut de page"',
    'aria-label="Back to top"',
  ],
  [
    'aria-label="Expérience OFF MARKET"',
    'aria-label="OFF MARKET experience"',
  ],
  [
    'aria-label="Slide précédente"',
    'aria-label="Previous slide"',
  ],
  [
    'aria-label="Navigation principale"',
    'aria-label="Main navigation"',
  ],
  [
    "Budget d'acquisition",
    "Acquisition budget",
  ],
  [
    "Ce que nos clients viennent chercher",
    "What our clients are looking for",
  ],
  [
    "clients qualifiés accompagnés",
    "qualified clients supported",
  ],
  [
    "Découvrir notre approche",
    "Discover our approach",
  ],
  [
    "Demander un accès privé",
    "Request private access",
  ],
  [
    "Demander l&rsquo;accès",
    "Request access",
  ],
  [
    "Demander l'accès",
    "Request access",
  ],
  [
    "Débloquer l&rsquo;accès",
    "Unlock access",
  ],
  [
    "Détails sur demande",
    "Details on request",
  ],
  [
    "Envoyer la demande",
    "Send request",
  ],
  [
    "Hypothèse de valorisation annuelle",
    "Annual appreciation assumption",
  ],
  [
    "Horizon de revente",
    "Resale horizon",
  ],
  [
    "Loyer mensuel estimé",
    "Estimated monthly rent",
  ],
  [
    "L'immobilier privé",
    "Private real estate",
  ],
  [
    "Immobilier privé à Marrakech",
    "Private real estate in Marrakech",
  ],
  [
    "Location courte durée",
    "Short-term rental",
  ],
  [
    "Location longue durée",
    "Long-term rental",
  ],
  [
    "Marrakech, Maroc",
    "Marrakech, Morocco",
  ],
  [
    "Nom complet",
    "Full name",
  ],
  [
    "Numéro de téléphone",
    "Phone number",
  ],
  [
    "Opportunités investisseur",
    "Investor opportunities",
  ],
  [
    "Opportunités rares à Marrakech",
    "Rare opportunities in Marrakech",
  ],
  [
    "Parler à un conseiller",
    "Speak to an adviser",
  ],
  [
    "Plans transmis sur demande",
    "Plans shared on request",
  ],
  [
    "Plans & configuration",
    "Plans & layout",
  ],
  [
    "Prix estimé du bien, hors frais.",
    "Estimated property price, excluding fees.",
  ],
  [
    "Prix nuitée moyen",
    "Average nightly rate",
  ],
  [
    "Projet sur plan",
    "Off-plan property",
  ],
  [
    "Recevoir la sélection off-market",
    "Receive the off-market selection",
  ],
  [
    "Recevoir une analyse privée",
    "Receive a private analysis",
  ],
  [
    "Recevoir le dossier",
    "Receive the dossier",
  ],
  [
    "Résidence secondaire · Marrakech",
    "Second home · Marrakech",
  ],
  [
    "Riads de caractère",
    "Character riads",
  ],
  [
    "Sélection actualisée régulièrement.",
    "Selection updated regularly.",
  ],
  [
    "Sélectionnez votre budget",
    "Select your budget",
  ],
  [
    "Semaines d'usage personnel",
    "Weeks of personal use",
  ],
  [
    "Simuler avant d'investir",
    "Simulate before investing",
  ],
  [
    "Taux d'imposition",
    "Tax rate",
  ],
  [
    "Taux d'occupation",
    "Occupancy rate",
  ],
  [
    "Choisir la langue",
    "Choose language",
  ],
  [
    "Biens accessibles sur dossier",
    "Properties available on request",
  ],
  [
    "Typologies suivies",
    "Property types tracked",
  ],
  [
    "Veuillez pivoter votre appareil",
    "Please rotate your device",
  ],
  [
    "Villa sur plan",
    "Off-plan villa",
  ],
  [
    "Villas privées",
    "Private villas",
  ],
  [
    "Voir la sélection",
    "View the selection",
  ],
  [
    "Voir les biens compatibles",
    "View compatible properties",
  ],
  [
    "Votre nom complet",
    "Your full name",
  ],
  [
    "votre@email.com",
    "your@email.com",
  ],
  [
    "ADRESSES CONFIDENTIELLES",
    "CONFIDENTIAL ADDRESSES",
  ],
  [
    "ACCÈS PRIVÉ",
    "PRIVATE ACCESS",
  ],
  [
    "Accompagnement discret",
    "Discreet guidance",
  ],
  [
    "Acheteur privé",
    "Private buyer",
  ],
  [
    "Analyse claire",
    "Clear analysis",
  ],
  [
    "Appartements Guéliz",
    "Guéliz apartments",
  ],
  [
    "Biens privés",
    "Private properties",
  ],
  [
    "Biens sur plan",
    "Off-plan properties",
  ],
  [
    "Confidentialité",
    "Privacy policy",
  ],
  [
    "Indicatif pays",
    "Country code",
  ],
  [
    "Lectures privées",
    "PRIVATE READINGS",
  ],
  [
    "Lectures privées",
    "Private readings",
  ],
  [
    "LECTURES PRIVÉES",
    "PRIVATE READINGS",
  ],
  [
    "Mentions légales",
    "Legal notice",
  ],
  [
    "Notre Histoire",
    "Our story",
  ],
  [
    "Nous contacter",
    "Contact us",
  ],
  [
    "PARLONS-EN",
    "LET'S TALK",
  ],
  [
    "PARAMÈTRES",
    "SETTINGS",
  ],
  [
    "QUARTIERS",
    "NEIGHBOURHOODS",
  ],
  [
    "QUI SOMMES-NOUS",
    "WHO WE ARE",
  ],
  [
    "Quartiers",
    "Neighbourhoods",
  ],
  [
    "Rappel",
    "Reminder",
  ],
  [
    "RÉSULTAT",
    "RESULT",
  ],
  [
    "Rez-de-chaussée",
    "Ground floor",
  ],
  [
    "SIMULATEUR PRIVÉ",
    "PRIVATE SIMULATOR",
  ],
  [
    "Sélection ciblée",
    "Targeted selection",
  ],
  [
    "Sélection :",
    "Selection:",
  ],
  [
    "Sur plan",
    "Off-plan",
  ],
  [
    "À propos",
    "About",
  ],
  [
    "Accueil",
    "Home",
  ],
  [
    "Achat-revente",
    "Buy-to-sell",
  ],
  [
    "Caractéristiques",
    "Features",
  ],
  [
    "Contact",
    "Contact",
  ],
  [
    "Demande",
    "Request",
  ],
  [
    "Email",
    "Email",
  ],
  [
    "Envoyer",
    "Send",
  ],
  [
    "Extérieur",
    "Exterior",
  ],
  [
    "Galerie",
    "Gallery",
  ],
  [
    "Général",
    "General",
  ],
  [
    "Intérieur",
    "Interior",
  ],
  [
    "Message",
    "Message",
  ],
  [
    "Navigation",
    "Navigation",
  ],
  [
    "Nom",
    "Name",
  ],
  [
    "Numéro",
    "Number",
  ],
  [
    "Plans",
    "Plans",
  ],
  [
    "Prix",
    "Price",
  ],
  [
    "Projet",
    "Project",
  ],
  [
    "Salles d'eau",
    "Bathrooms",
  ],
  [
    "Simulateur",
    "Simulator",
  ],
  [
    "Suites",
    "Suites",
  ],
  [
    "Suivant",
    "Next",
  ],
  [
    "Surface",
    "Area",
  ],
  [
    "Téléphone",
    "Phone",
  ],
  [
    "Voir",
    "View",
  ],
  [
    "à Marrakech",
    "in Marrakech",
  ],
  [
    "(optionnel)",
    "(optional)",
  ],
  [
    "politique de confidentialité",
    "privacy policy",
  ],
  [
    "En cliquant, vous acceptez notre",
    "By clicking, you agree to our",
  ],
  [
    "à notre",
    "to our",
  ],
  // Off-plan page specific
  [
    "La sélection à portée de main",
    "The selection within reach",
  ],
  [
    "OFF MARKET sécurise chaque parcours jusqu&rsquo;à la décision finale, avec un accompagnement clair et discret.",
    "OFF MARKET secures each journey through to the final decision, with clear and discreet guidance.",
  ],
  [
    "OFF MARKET sécurise chaque parcours jusqu&amp;rsquo;à la décision finale, avec un accompagnement clair et discret.",
    "OFF MARKET secures each journey through to the final decision, with clear and discreet guidance.",
  ],
  [
    "Marrakech se révèle autrement selon l&rsquo;adresse : prestige central, rendement urbain, villas privées ou horizon patrimonial.",
    "Marrakech reveals itself differently by address: central prestige, urban yield, private villas or long-term patrimonial horizon.",
  ],
  [
    "Marrakech se révèle autrement selon l&amp;rsquo;adresse : prestige central, rendement urbain, villas privées ou horizon patrimonial sur l&amp;rsquo;Atlas.",
    "Marrakech reveals itself differently by address: central prestige, urban yield, private villas or long-term patrimonial horizon over the Atlas.",
  ],
  [
    "Une méthode devient signature",
    "A method becomes a signature",
  ],
  [
    "Une méthode",
    "A method",
  ],
  [
    "devient signature",
    "becomes a signature",
  ],
  [
    "Des programmes sur plan sélectionnés pour leur architecture, leur emplacement et leur potentiel patrimonial à Marrakech.",
    "Selected off-plan programmes chosen for their architecture, location and patrimonial potential in Marrakech.",
  ],
  [
    "Des programmes sur plan sélectionnés pour leur architecture, leur emplacement et leur potentiel patrimonial in Marrakech.",
    "Selected off-plan programmes chosen for their architecture, location and patrimonial potential in Marrakech.",
  ],
  [
    "Nous cadrons votre recherche, votre horizon, votre budget et votre logique d&rsquo;achat avec méthode et discrétion.",
    "We frame your search, horizon, budget and buying logic with method and discretion.",
  ],
  [
    "Nous cadrons votre recherche, votre horizon, votre budget et votre logique d&amp;rsquo;achat avec méthode et discrétion.",
    "We frame your search, horizon, budget and buying logic with method and discretion.",
  ],
  [
    "Nous filtrons les biens selon leur adresse, leur potentiel, leur cohérence et leur niveau de confidentialité.",
    "We filter properties by address, potential, coherence and level of confidentiality.",
  ],
  [
    "Nous accompagnons les échanges, les vérifications et la lecture stratégique de l&rsquo;opportunité.",
    "We support exchanges, due diligence and the strategic reading of each opportunity.",
  ],
  [
    "Nous accompagnons les échanges, les vérifications et la lecture stratégique de l&amp;rsquo;opportunité.",
    "We support exchanges, due diligence and the strategic reading of each opportunity.",
  ],
  [
    "Des adresses singulières dans les quartiers historiques, sélectionnées pour leur charme, leur potentiel et leur rareté.",
    "Singular addresses in historic districts, selected for their charm, potential and rarity.",
  ],
  [
    "Nous sécurisons le parcours jusqu&rsquo;à la décision finale, avec un accompagnement clair et discret.",
    "We secure the journey through to the final decision, with clear and discreet guidance.",
  ],
  [
    "Nous sécurisons le parcours jusqu&amp;rsquo;à la décision finale, avec un accompagnement clair et discret.",
    "We secure the journey through to the final decision, with clear and discreet guidance.",
  ],
  [
    "Comprendre votre projet",
    "Understand your project",
  ],
  [
    "Une méthode d&rsquo;acquisition en quatre étapes : comprendre, sélectionner, négocier, acquérir.",
    "A four-step acquisition method: understand, select, negotiate, acquire.",
  ],
  [
    "A method d&amp;rsquo;acquisition en quatre étapes : comprendre, sélectionner, négocier, acquérir.",
    "A four-step acquisition method: understand, select, negotiate, acquire.",
  ],
  [
    "Cadrer votre recherche et votre horizon",
    "Frame your search and horizon",
  ],
  [
    "Sélectionner les biens cohérents",
    "Select coherent properties",
  ],
  [
    "Négocier avec discrétion",
    "Negotiate with discretion",
  ],
  [
    "OFF MARKET compose une sélection",
    "OFF MARKET curates a selection",
  ],
  [
    "Route de l&rsquo;Ourika — villas, Atlas et horizon long terme. À quelques minutes des adresses patrimoniales.",
    "Route de l'Ourika — villas, Atlas views and long-term horizon. Minutes from patrimonial addresses.",
  ],
  [
    "Route de l&amp;rsquo;Ourika — villas, Atlas et horizon long terme. À quelques minutes des adresses patrimoniales.",
    "Route de l'Ourika — villas, Atlas views and long-term horizon. Minutes from patrimonial addresses.",
  ],
  [
    "Des terrasses de vue où la lumière, la pierre et le jardin composent un cadre de vie discret et mémorable.",
    "View terraces where light, stone and garden compose a discreet and memorable living setting.",
  ],
  [
    "Lumière maîtrisée",
    "Controlled light",
  ],
  [
    "Chaque détail est pensé avec exigence : volumes, matières et lumière au service d&rsquo;une acquisition patrimoniale cohérente.",
    "Every detail is considered with rigour: volumes, materials and light in service of a coherent patrimonial acquisition.",
  ],
  [
    "Chaque détail est pensé avec exigence : volumes, matières et lumière au service d&amp;rsquo;une acquisition patrimoniale cohérente.",
    "Every detail is considered with rigour: volumes, materials and light in service of a coherent patrimonial acquisition.",
  ],
  [
    "Oasis confidentielle au cœur de Marrakech",
    "Confidential oasis in the heart of Marrakech",
  ],
  [
    "Agdal — adresses résidentielles modernes, jardins royaux à proximité et lecture patrimoniale claire.",
    "Agdal — modern residential addresses, nearby royal gardens and a clear patrimonial reading.",
  ],
  [
    "Villas privéescious",
    "Private villas",
  ],
  [
    "Appartements premium Center",
    "Premium centre apartments",
  ],
  [
    "à grandes ouvertures",
    "with generous openings",
  ],
  [
    "Négocier",
    "Negotiate",
  ],
  [
    "Acquérir",
    "Acquire",
  ],
  [
    "Ombres et perspectives",
    "Shadows and perspectives",
  ],
  [
    "Cour intérieure",
    "Inner courtyard",
  ],
  [
    "Jardins structurants",
    "Structured gardens",
  ],
  [
    "Palette sobre",
    "Understated palette",
  ],
  [
    "Singulier",
    "Singular",
  ],
  [
    "Panoramique",
    "Panoramic",
  ],
  [
    "Terraces",
    "Terraces",
  ],
  [
    "discrète",
    "discreet",
  ],
];

const HREF_REPLACEMENTS = [
  ['href="/contact/"', 'href="/en/contact/"'],
  ['href="/sur-plan/"', 'href="/en/off-plan/"'],
  ['href="/sur-plan"', 'href="/en/off-plan/"'],
  ['href="/off-market/"', 'href="/en/off-market/"'],
  ['href="/about/"', 'href="/en/"'],
  ['href="/nos-projets/"', 'href="/en/"'],
  ['class="mv-chrome__logo-link om-header__logo" aria-label="OFF MARKET">\n        <img', 'class="mv-chrome__logo-link om-header__logo" aria-label="OFF MARKET">\n        <img'],
];

function applyReplacements(text, pairs) {
  let out = text;
  for (const [from, to] of pairs) {
    out = out.split(from).join(to);
  }
  return out;
}

function fixEnHomeLogoHref(html) {
  return html
    .replace(/href="\/" class="mv-chrome__logo-link/g, 'href="/en/" class="mv-chrome__logo-link')
    .replace(/href="\/" class="header__logo/g, 'href="/en/" class="header__logo');
}

function translatePage(filePath, meta) {
  const page = JSON.parse(fs.readFileSync(filePath, "utf8"));
  Object.assign(page, meta);

  for (const segment of page.bodySegments) {
    if (segment.kind !== "html") continue;
    let html = segment.html;
    html = applyReplacements(html, TEXT_REPLACEMENTS);
    html = applyReplacements(html, HREF_REPLACEMENTS);
    if (filePath.includes("home-en")) {
      html = fixEnHomeLogoHref(html);
    }
    segment.html = html;
  }

  fs.writeFileSync(filePath, JSON.stringify(page));
  console.log("Updated", path.relative(ROOT, filePath));
}

translatePage(path.join(ROOT, "content/pages/home-en.json"), HOME_META);
translatePage(path.join(ROOT, "content/pages/off-plan-en.json"), OFFPLAN_META);
