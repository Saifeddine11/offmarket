#!/usr/bin/env python3
"""Apply OffMarket/Mavericks French content to static HTML pages."""
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

ALT_FR = "Bien immobilier de prestige OffMarket à Marrakech"

# Ordered longest-first to avoid partial replacements
REPLACEMENTS = [
    # ── SEO homepage ──
    ("<title>OffMarket | Homepage</title>", "<title>OffMarket — Immobilier privé de prestige à Marrakech</title>"),
    ('content="Wellness-residences"', 'content="OffMarket sélectionne des villas, riads, appartements et opportunités d&amp;rsquo;investissement confidentielles à Marrakech. Une approche privée, discrète et stratégique de l&amp;rsquo;immobilier de prestige."'),
    ('content="OffMarket | Homepage"', 'content="OffMarket — Immobilier privé à Marrakech"'),
    ('content="en_US"', 'content="fr_FR"'),
    ('<html dir="ltr" lang="en"', '<html dir="ltr" lang="fr"'),
    # ── SEO subpages ──
    ("<title>OffMarket | About</title>", "<title>OffMarket — À propos | Immobilier privé à Marrakech</title>"),
    ('content="OffMarket | About"', 'content="OffMarket — À propos | Immobilier privé à Marrakech"'),
    ('content="Panoramic apartments, townhouses with&amp;nbsp;patios and two-level penthouses with&amp;nbsp;terraces near&amp;nbsp;a&amp;nbsp;park"',
     'content="OffMarket accompagne l&amp;rsquo;acquisition de biens rares à Marrakech avec discrétion, méthode et exigence patrimoniale."'),
    ("<title>OffMarket | Photos of&nbsp;the&nbsp;OffMarket residential complex</title>",
     "<title>OffMarket — Galerie | Biens privés à Marrakech</title>"),
    ('content="OffMarket | Photos of&amp;nbsp;the&amp;nbsp;OffMarket residential complex"',
     'content="OffMarket — Galerie | Biens privés à Marrakech"'),
    ('content="Designer interiors in&amp;nbsp;a&amp;nbsp;premium residential complex with&amp;nbsp;developed infrastructure and a&amp;nbsp;private courtyard garden"',
     'content="Villas, riads et intérieurs d&amp;rsquo;exception sélectionnés par OffMarket à Marrakech."'),
    ("<title>OffMarket | Location</title>", "<title>OffMarket — Adresses | Territoires d&amp;rsquo;investissement à Marrakech</title>"),
    ('content="OffMarket | Location"', 'content="OffMarket — Adresses | Territoires d&amp;rsquo;investissement à Marrakech"'),
    ('content="Luxury residences with&amp;nbsp;wellness amenities"',
     'content="Les territoires d&amp;rsquo;investissement à Marrakech : adresses patrimoniales, rendement urbain et villas privées."'),
    ("<title>OffMarket | Infrastructure and amenities</title>",
     "<title>OffMarket — Sur plan | Opportunités sélectionnées à Marrakech</title>"),
    ('content="OffMarket | Infrastructure and amenities"',
     'content="OffMarket — Sur plan | Opportunités sélectionnées à Marrakech"'),
    # ── Hero (index) ──
    ("Exclusive residence with&nbsp;a&nbsp;rich wellness infrastructure next to&nbsp;Nature Park",
     "Maison privée d&amp;rsquo;immobilier de prestige"),
    ("Splendor <br>\nof&nbsp;Renewal",
     "L&amp;rsquo;immobilier privé <br>\nà&nbsp;Marrakech"),
    ("Open the&nbsp;doors of&nbsp;OffMarket and step into&nbsp;your true self",
     "Au-delà des annonces visibles"),
    ("Enclave of&nbsp;peace and quiet, your personal happy place, where deep relaxation helps you connect to&nbsp;your thoughts and feelings. Here, you will unveil hidden possibilities that the&nbsp;future holds just for&nbsp;you.",
     "Les meilleures opportunités ne sont pas toujours publiées. OffMarket sélectionne des biens rares, analyse leur potentiel et accompagne chaque acquisition avec discrétion, méthode et exigence."),
    # ── Wellness → Selection ──
    ("OffMarket brings wellness right into&nbsp;your home. With&nbsp;a&nbsp;thoughtfully designed infrastructure for&nbsp;relaxation, it&nbsp;rejuvenates your body and mind, leaving you refreshed and perfectly balanced.",
     "Chaque bien est étudié pour son adresse, son usage, son potentiel de valorisation et sa cohérence avec le projet de l&amp;rsquo;acquéreur."),
    ("Essence of&nbsp;Self-Care", "Notre sélection"),
    ("Wellness", "Une sélection pensée, pas un catalogue"),
    ("Spa", "Villas privées"),
    ("Yoga", "Riads de caractère"),
    ("Fitness", "Appartements premium"),
    ("Café", "Investissement"),
    ("Garden-view pool, aromatic hammam, meditative yoga, and active fitness to&nbsp;keep you relaxed and rejuvenate.",
     "Des propriétés confidentielles, pensées pour la résidence, la villégiature ou la transmission patrimoniale."),
    ("OffMarket beauty lounge and its unique care programs help you end your day on&nbsp;a&nbsp;finest note.",
     "Des adresses singulières dans les quartiers historiques, sélectionnées pour leur charme, leur potentiel et leur rareté."),
    ("Our elegant Wellness-center is a&nbsp;crown jewel of&nbsp;OffMarket, possessing it keeps you youthful. Warm and inviting light of&nbsp;the&nbsp;lobby transports you to&nbsp;a&nbsp;carefree resort. Marbles steps of&nbsp;the&nbsp;pool, caressing steam of&nbsp;the&nbsp;hammam, light appetizers at&nbsp;the&nbsp;waterside cafe&nbsp;&mdash; here relaxation originates.",
     "Des biens urbains dans les secteurs les plus recherchés de Marrakech, avec une lecture claire du marché et de la liquidité."),
  # Nature section
    ("Enjoy nature&rsquo;s embrace that shields you from&nbsp;the&nbsp;world outside. Climbing rooftop plants, winding layouts of&nbsp;flowerbeds, emerald lawns. OffMarket lets you learn the&nbsp;art of&nbsp;leisure.",
     "Chaque adresse raconte un usage, une rareté et un potentiel. OffMarket distingue les quartiers de rendement, les zones patrimoniales et les territoires de prestige."),
    ("Breathe in&nbsp;the&nbsp;air and open space. Do&nbsp;you feel like&nbsp;running? Don&rsquo;t hold back. As&nbsp;you are running along&nbsp;the&nbsp;embankment, delight in&nbsp;the&nbsp;kaleidoscope of&nbsp;shifting panoramas that will leave you impressed. Set your pace and change it&nbsp;at&nbsp;your desire.",
     "Des opportunités analysées pour leur rendement, leur emplacement, leur potentiel de revente et leur cohérence patrimoniale."),
    ("Nature", "Les territoires d&amp;rsquo;investissement à Marrakech"),
    ("Essence of&nbsp;Contemplation", "Adresses patrimoniales"),
    ("Lightness of&nbsp;Breathing", "Lecture stratégique"),
    ("Easy access to&nbsp;Nature Park. Landscapes of&nbsp;watercolor tenderness that belong only to&nbsp;you.",
     "Triangle d&amp;rsquo;Or / Hivernage — prestige central, forte demande, adresse établie."),
    # Location cards (index place section if any)
    ("Historical Park", "Guéliz hyper-centre"),
    ("Business Center", "Palmeraie"),
    ("Discover shopping", "Route de l&amp;rsquo;Ourika"),
    ("Sublime Feelings", "Médina"),
    ("Restaurant on&nbsp;Water", "Agdal"),
    ("Surrounded by&nbsp;a&nbsp;necklace of&nbsp;seven parks and iconic architectural landmarks, OffMarket",
     "Au cœur des quartiers les plus recherchés de Marrakech, OffMarket"),
    # About page
    ("About", "À propos"),
    ("Open the&nbsp;doors of&nbsp;OffMarket and step into your true self",
     "Une maison privée d&amp;rsquo;immobilier à Marrakech"),
    ("25-floor standalone building that features 150 exclusive residencies: view flats, townhouses with&nbsp;patios, and penthouses with&nbsp;terraces. OffMarket is situated in&nbsp;a&nbsp;quiet, green neighborhood next to&nbsp;Nature Park.",
     "OffMarket n&amp;rsquo;est pas une agence classique. C&amp;rsquo;est un accès privé à des adresses rares, des opportunités confidentielles et des biens sélectionnés à Marrakech."),
    ("Wellness Center", "Accompagnement"),
    ("Collection of&nbsp;premium living spaces", "Sélection de biens privés"),
    ("Architecture and Nature Intertwined", "Architecture et patrimoine"),
    ("Inspired Architecture", "Adresses singulières"),
    ("Bionic Architecture", "Lecture patrimoniale"),
    ("Natural Oasis in&nbsp;the&nbsp;heart of&nbsp;the&nbsp;City", "Oasis confidentielle au cœur de Marrakech"),
    ("Designed interior", "Intérieurs d&amp;rsquo;exception"),
    ("Designer finishings", "Finitions sélectionnées"),
    ("Designer interior finishings", "Intérieurs pensés avec exigence"),
    # Location page
    ("Location", "Adresses"),
    ("The&nbsp;Center", "Le centre"),
    ("Vistas that", "Des vues"),
    ("Privilege", "privilégiées"),
    ("All the&nbsp;colors of&nbsp;the&nbsp;clear Western District sky are reflected in&nbsp;the&nbsp;glowing windows of&nbsp;OffMarket",
     "Les lumières de Marrakech se reflètent dans les façades des adresses que nous sélectionnons pour leur rareté"),
    ("Dignified", "Prestige"),
    ("City Center", "Hyper-centre"),
    ("Metro Station", "Quartiers patrimoniaux"),
    ("Highway", "Axes structurants"),
    ("Forest Land", "Palmeraie"),
    ("Natural Oasis", "Domaines privés"),
    ("Landskape", "Paysage"),
    ("Historical", "Patrimonial"),
    ("Park", "Parc"),
    # Infrastructure page
    ("Amenities", "Sur plan"),
    ("Where Change", "Une méthode"),
    ("Private", "discrète"),
    ("Panoramic", "Panoramique"),
    ("Park-like&nbsp;Parking", "Accompagnement sur mesure"),
    ("Riverside Promenade at&nbsp;Your Doorstep", "Comprendre votre projet"),
    ("Sit down&nbsp;to&nbsp;read under&nbsp;ivy-covered awning", "Cadrer votre recherche et votre horizon"),
    ("Bring the&nbsp;little ones to&nbsp;a&nbsp;landscaped playground", "Sélectionner les biens cohérents"),
    ("Meditate on&nbsp;our softest lawns", "Négocier avec discrétion"),
    ("In&nbsp;The&nbsp;Garden of&nbsp;Forking Paths, a&nbsp;short story by&nbsp;Borges, the&nbsp;author creates a&nbsp;labyrinth of&nbsp;gardens where every path leads to&nbsp;new discoveries.",
     "Une méthode d&amp;rsquo;acquisition en quatre étapes : comprendre, sélectionner, négocier, acquérir."),
    ("OffMarket is a&nbsp;rational choice that you make with&nbsp;your heart. Listen: City&rsquo;s pulse steadies and synchronizes with&nbsp;your heartbeat. You are home.",
     "OffMarket sécurise chaque parcours jusqu&amp;rsquo;à la décision finale, avec un accompagnement clair et discret."),
    ("Spacious", "Comprendre"),
    ("Fitness Center", "Sélectionner"),
    ("Beauty Lounge with&nbsp;Massage Parlour", "Négocier"),
    ("Luxurious", "Acquérir"),
    # Gallery
    ("All Shades of&nbsp;Beauty", "Toutes les nuances du prestige"),
    ("Beautifying", "Sélection"),
    ("Beauty in&nbsp;the&nbsp;Essence of&nbsp;Things", "L&amp;rsquo;exigence au cœur de chaque adresse"),
    ("Becomes Art", "devient signature"),
    ("Interiors", "Intérieurs"),
    ("Impressive", "Remarquable"),
    ("Multiple", "Singulier"),
    ("Neutral palette", "Palette sobre"),
    ("Integrated lighting", "Lumière maîtrisée"),
    ("Decorative climbing plants", "Volumes patrimoniaux"),
    ("Decorative flowerbeds", "Cour intérieure"),
    ("Green terraces", "Terrasses privées"),
    ("Botanical zones", "Jardins structurants"),
    ("Luscious trees", "Ombres et perspectives"),
    ("Ceiling height", "Hauteur sous plafond"),
    ("Available soon", "Sur dossier"),
    # Navigation / chrome (old hidden + new)
    ("Contact us", "Nous contacter"),
    ("Residences", "Biens privés"),
    ("Design", "Sur plan"),
    ("Gallery", "Galerie"),
    ("Menu", "Menu"),
    ("Private listings", "Biens privés"),
    ("Off-market", "Off-market"),
    ("Private selection", "Sélection privée"),
    ("Confidential access", "Accès confidentiel"),
    ("Off-plan apartments", "Appartements sur plan"),
    ("Off-plan villas", "Villas sur plan"),
    ("Selected programs", "Programmes sélectionnés"),
    ("Existing villas", "Villas existantes"),
    ("Riads", "Riads"),
    ("Well-located apartments", "Appartements bien placés"),
    ("Invest", "Investir"),
    ("Discuss my project", "Parler de mon projet"),
    ("Private real estate in Marrakech", "Immobilier privé à Marrakech"),
    ("Maison Mavericks", "Maison OffMarket"),
    ("Private selection of real estate opportunities in Marrakech.",
     "Sélection confidentielle d&amp;rsquo;opportunités immobilières à Marrakech."),
    ("Navigation", "Navigation"),
    ("Home", "Accueil"),
    ("Follow", "Suivre"),
    ("Language", "Langue"),
    ("Mavericks. All rights reserved.", "OffMarket. Tous droits réservés."),
    ("Legal", "Mentions légales"),
    ("Marrakech, Morocco", "Marrakech, Maroc"),
    # Forms
    ("Name", "Nom"),
    ("Phone", "Téléphone"),
    ("Message", "Message"),
    ("e-mail", "e-mail"),
    ("By clicking the button, you agree", "En cliquant, vous acceptez"),
    ("privacy policy", "politique de confidentialité"),
    ("Request a call", "Demander un appel"),
    ("Callback", "Rappel"),
    ("Favorites", "Favoris"),
    ("Here you can save your favorite residences.", "Retrouvez ici les biens que vous avez sélectionnés."),
    ("Find more matching", "Affiner la sélection"),
    ("Selection", "Sélection"),
    ("by specifications", "par critères"),
    ("Visual", "Recherche"),
    ("search", "visuelle"),
    ("You are subscribed", "Vous êtes inscrit"),
    ("Flats", "Biens"),
    ("Find", "Rechercher"),
    ("Architecture", "Architecture"),
    ("Infra&shy;structure", "Sur plan"),
    ("Site by Vide Infra", "OffMarket — Marrakech"),
    ("legal information", "mentions légales"),
    ("Visual representations of&nbsp;the&nbsp;property, layout plans, and other materials are for&nbsp;illustration purposes only.",
     "Les visuels, plans et documents présentés le sont à titre indicatif."),
    ("All information on&nbsp;this website is provided for&nbsp;general informational use and does not constitute an&nbsp;offer or any form of&nbsp;binding commitment.",
     "Les informations diffusées sur ce site ne constituent ni une offre ni un engagement contractuel."),
    ("All materials on&nbsp;this website, including design elements, are the&nbsp;intellectual property of&nbsp;the&nbsp;Organization.",
     "L&amp;rsquo;ensemble des contenus de ce site est protégé par le droit de la propriété intellectuelle."),
    ("&copy; 2026. All rights reserved.", "&copy; 2026. Tous droits réservés."),
    # CTA blocks
    ("Your next address may never be published", "Votre prochaine adresse ne sera peut-être jamais publiée"),
    ("Talk to us about your project. We will guide you toward properties that truly match your search.",
     "Parlez-nous de votre projet. Nous vous orientons vers les biens réellement cohérents avec votre recherche."),
    ("Request private access", "Demander un accès privé"),
    ("OffMarket luxury property in Marrakech", ALT_FR),
    ("OffMarket homepage", "OffMarket — page d&amp;rsquo;accueil"),
    ("Scroll to top of the page", "Retour en haut de page"),
    # Apartment stats (hero gallery numbers) - repurpose as categories
    ("138 view flats", "Villas"),
    ("5 townhouses with&nbsp;private patios", "Riads"),
    ("7 penthouses with&nbsp;exquisite terraces", "Appartements"),
    ("176 parking spaces", "Investissement"),
    ("25 floors of&nbsp;unique architecture", "Adresses rares"),
    ("Apartments, terraced townhouses, and duplex penthouses in&nbsp;a&nbsp;quiet, green neighborhood.",
     "Villas, riads, appartements premium et opportunités confidentielles à Marrakech."),
]

PAGE_FILES = [
    "index.html",
    "about/index.html",
    "gallery/index.html",
    "location/index.html",
    "infrastructure/index.html",
]

CHROME_FILES = [
    "assets/chrome/mavericks-chrome.html",
    "assets/chrome/mavericks-footer.html",
]


def apply_replacements(text: str) -> str:
    for old, new in REPLACEMENTS:
        text = text.replace(old, new)
    return text


def main():
    changed = []
    for rel in PAGE_FILES + CHROME_FILES:
        path = os.path.join(ROOT, rel)
        if not os.path.isfile(path):
            continue
        original = open(path, encoding="utf-8").read()
        updated = apply_replacements(original)
        if updated != original:
            open(path, "w", encoding="utf-8").write(updated)
            changed.append(rel)
    print("Updated:", len(changed), "files")
    for f in changed:
        print(" -", f)


if __name__ == "__main__":
    main()
