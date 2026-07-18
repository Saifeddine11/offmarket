# OFF MARKET — Complete SEO Content Audit

Audit date: 15 July 2026  
Domain: https://offmarketofficial.com  
Scope: repository audit of the 52 URLs listed in `SITEMAP_URLS`, plus active public locale routes and the legacy `/location/` route. No production crawl was possible from the configured environment, so findings are based on source, rendered-content data, metadata, route registry, and a current competitor benchmark.

## A. Executive summary

OFF MARKET has a clear premium positioning, a coherent visual/content concept, strong Marrakech relevance, and a useful set of commercial page types: off-market access, off-plan projects, neighbourhoods, project detail, simulator, contact, and blog. The site is not suffering from obvious keyword stuffing. Its largest SEO weakness is not lack of keywords; it is that important search intent is often expressed through short brand language, client-side content, or incomplete/incorrect translations instead of crawlable, specific, locally useful copy.

The highest-impact findings are:

1. **Critical: international page integrity is unreliable.** The Dutch homepage still exposes French H1/H2 content in the source data. The French `/sur-plan/` and Dutch `/nl/nieuwbouw/` pages contain mixed-language and malformed fragments such as `Villas privéescious Swimming Pool`, `of beautiful reality`, and `Parc-like Parcing`. This is a trust and index-quality problem, not just a translation polish issue.
2. **High: blog depth is thin.** The five French source articles contain approximately 149–164 words each and only one H1; the English and Dutch variants inherit the same shallow article bodies. They cannot fully satisfy guides such as buying off-plan, investing in Marrakech, or understanding off-market property.
3. **High: core commercial pages do not fully answer commercial questions.** Off-plan lacks visible due diligence, payment, legal-document, warranty, delivery, and risk sections. Off-market lacks a visible definition, qualification process, seller-side explanation, limits, and legal role. Neighbourhood coverage is limited to three grouped cards rather than the requested wider local map.
4. **High: metadata and international signals need rationalisation.** Blog article metadata is built without a `description` field; `/` and `/fr/` duplicate the French homepage; `/about/` and `/fr/about/` duplicate one another; the global layout server-renders `lang="fr"` for every locale and corrects it only with client-side JavaScript; several language-switcher and content links point to the wrong locale.
5. **Medium: internal linking is directionally good but shallow.** The commercial spine exists, but blog articles generally link only back to the blog hub. Contextual links from educational content to the relevant commercial pages are missing, and several static pages contain inconsistent trailing-slash or locale paths.
6. **Medium: trust is asserted more than demonstrated.** The site communicates “selection”, “analysis”, “confidentiality”, and “SAFE” concepts, but does not yet explain who reviews a project, what SAFE verifies, what it does not guarantee, how conflicts are handled, or the legal role of OFF MARKET.

The site should be improved in place. A redesign, route expansion, or mass blog production is not warranted before the existing content, locale system, metadata, rendered HTML, and internal links are repaired.

## B. Overall SEO content score

**54/100 — promising positioning, incomplete information architecture and inconsistent indexable content.**

| Dimension | Score | Assessment |
|---|---:|---|
| Intent match | 57 | Commercial themes are present, but answers are often too short or generic. |
| Topical depth | 38 | Core buying, legal, investment, SAFE, and risk subtopics are mostly absent. |
| Semantic coverage | 51 | Marrakech, villas, apartments, off-market, off-plan, neighbourhoods are present; supporting entities and questions are incomplete. |
| Trust / E-E-A-T | 48 | Local positioning and contact identity exist; methodology, authorship, verification limits, and legal transparency are weak. |
| Internal linking | 61 | Main commercial spine is present; contextual blog-to-money-page links and locale correctness need work. |
| Conversion readiness | 67 | CTAs are visible and generally aligned, but some routes, forms, and next steps are generic or inconsistent. |
| Metadata / technical content SEO | 52 | Titles are mostly unique; article descriptions, duplicate locales, server language, and schema/hreflang need correction. |

## C. Page-by-page scores and action plan

Scores are in the order: intent match / depth / semantic coverage / trust / links / conversion / metadata / overall.

| Page or equivalent locale group | Current purpose and target | Scores | Main strengths | Main weaknesses | Recommended action |
|---|---|---:|---|---|---|
| `/`, `/fr/` | French luxury/private real estate hub; “immobilier privé Marrakech” | 74/62/65/54/72/75/72/**67** | Strong H1, 700+ words in source, commercial spine, FAQ on root | Duplicate home; French copy on locale variants; investment/legal depth limited | **Keep `/`; consolidate or noindex `/fr/` after redirect/canonical decision; improve** |
| `/en/` | English private luxury real estate hub | 68/57/60/51/61/72/75/**63** | Good English metadata and commercial terms | Mixed links to `/simulateur/`, `/about/acteurs-verifies`, sparse proof | **Improve** |
| `/nl/` | Dutch luxury real estate hub | 22/29/28/34/45/57/68/**36** | Dutch metadata and footer exist | Source headings/body are French; translation integrity fails | **Critical improve before promotion/indexing** |
| `/about/`, `/fr/about/` | Brand story, methodology, SAFE | 60/54/49/58/63/55/74/**59** | Local/private positioning, verified-actors section | Duplicate French routes; authorship, legal role, SAFE scope and limits unclear | **Consolidate; expand trust content** |
| `/en/about/` | English brand/methodology page | 58/50/46/55/61/55/75/**57** | English metadata | Trust claims need evidence and process detail | **Improve** |
| `/nl/over-ons/` | Dutch brand/methodology page | 44/43/39/47/55/53/74/**51** | Correct route and title | Needs language QA and local terminology review | **Improve after translation repair** |
| `/quartiers/`, `/en/neighbourhoods/`, `/nl/wijken/` | Neighbourhood comparison and investment orientation | 72/59/61/58/76/70/76/**66** | Clear H1, strong Gueliz/Hivernage/Medina cards, links to projects/off-market/simulator | Only three grouped areas; Amelkis, Palmeraie, Agdal, Route de l’Ourika and Route de Tahanaout are not sufficiently covered; no prices/rental logic/evidence | **Expand** |
| `/nos-projets/`, `/en/projects/`, `/nl/projecten/` | Commercial project selection | 64/48/49/48/70/74/78/**59** | Strong money-page role, clear villa/apartment/off-market positioning | Project facts and inventory are thin/client-side; no robust filters or property-level crawlable copy | **Improve; add unique project summaries** |
| `/sur-plan/`, `/fr/sur-plan/`, `/en/off-plan/`, `/nl/nieuwbouw/`, `/it/progetti-su-piano/` | Off-plan/new-build pillar | 35/30/31/28/62/65/75/**42** | Clear topic and four-step acquisition concept | Static content is malformed/mixed-language; no due diligence, legal, payment plan, warranties, delivery, monitoring, materials, risks, or SAFE explanation | **Critical repair and expand; consolidate duplicate French route** |
| `/sur-plan/villa-jaz/`, `/en/off-plan/villa-jaz/`, `/nl/nieuwbouw/villa-jaz/` | Villa Jaz project detail / lead capture | 58/39/35/35/67/78/80/**56** | Project name, price anchor, anchors, galleries, plans CTA | Much data is injected by JS; empty `alt` attributes; limited location/status/target buyer/legal/payment/investment detail; “limited availability” needs proof | **Expand and make key facts crawlable** |
| `/off-market/`, `/en/off-market/`, `/nl/off-market/`, `/it/off-market/` | Qualified private-access conversion page | 70/43/40/48/65/80/76/**60** | Intent-aligned form and access CTA | Definition, benefits, risks, buyer qualification, seller benefits, selection process, confidentiality limits and legal role are underexplained | **Expand** |
| `/simulateur/`, `/en/simulator/`, `/nl/simulator/` | Transactional investment calculation tool | 62/41/42/38/63/77/78/**55** | Clear tool intent and CTA | Assumptions, limitations, currency, operating costs, tax/notary treatment, yield methodology and disclaimer need visible text | **Improve** |
| `/contact/`, `/fr/contact/`, `/en/contact/`, `/nl/contact/`, `/it/contatto/` | Contact and qualification | 82/38/36/48/69/86/74/**62** | Strong next action, email, local identity | French title/description is generic; legal/business details and expected response/process are limited | **Improve metadata and trust copy** |
| `/blog/`, `/en/blog/`, `/nl/blog/` | Editorial hub | 61/34/42/34/58/48/76/**50** | Five topical articles and category vocabulary | Hub is mostly JS-rendered; no visible article summaries in the static JSON; little author/date/editorial policy | **Improve** |
| Five French blog articles | Informational support for off-plan, investment, neighbourhoods, off-market, Guéliz | 50–66 overall | Good titles and local topic choices; no stuffing | 149–164 words; one H1; usually only `/blog/` link; no sources, FAQ, author, CTA, or commercial bridge | **Expand selectively, not mass-produce** |
| Five English blog articles | English informational support | 47–62 overall | Localised metadata/titles | Body content is inherited from French; metadata builder omits description; no local sources/links | **Rewrite/localise after French source is expanded** |
| Five Dutch blog articles | Dutch informational support | 31–52 overall | Localised titles/metadata | Body content is inherited or too literal; insufficient Dutch search vocabulary and trust | **Repair or temporarily noindex until quality passes** |
| Privacy/legal routes | Compliance | 77/31/30/70/58/20/72/**51** | Present in all primary locales, email identity | Privacy pages are in sitemap and apparently indexable; not useful search landing pages; “terms” link may be empty in footer | **Keep for compliance; consider `noindex,follow` if not intended as search content** |
| `/location/` | Legacy address/territory page | 24/37/30/25/36/31/58/**32** | Has local terms and a location concept | French/English fragments, weak semantics, noindex logic exists only in metadata helper, route is not in sitemap | **Noindex or redirect to `/quartiers/`; do not invest before core fixes** |

## D. Search intent map

| Page | Primary intent | Secondary intent | Audience | Current match | Gap / next action |
|---|---|---|---|---|---|
| Home | Navigational + commercial: luxury/private real estate Marrakech | Off-market, off-plan, investment | International buyers, investors, owners | Partial-good | Add concise proof, process, legal caveat, and explicit property types/locations. |
| Off-market | Commercial/transactional: how to access off-market property Marrakech | Privacy, qualification, seller mandate | Qualified buyers and discreet sellers | Partial | Explain definition, qualification, what is screened, what is not guaranteed, and form outcome. |
| Off-plan | Commercial/informational: off-plan property in Marrakech | Due diligence and acquisition process | Buyers/investors | Weak | Add a full buyer framework and link to Villa Jaz. |
| Villa Jaz | Transactional: buy/inquire about a named off-plan villa | Location, plans, price, status | Qualified project buyer | Partial | Make facts, location, completion/status, payment, legal docs, fees, risks, and CTA crawlable. |
| Neighbourhoods | Informational/commercial: best neighbourhoods for buying/investing | Lifestyle, property type, rental logic | Buyers and investors | Partial-good | Cover all priority areas and distinguish “best” by buyer objective. |
| Projects | Commercial investigation: projects/villas/apartments Marrakech | Off-market access | Active buyers | Partial | Add unique inventory summaries and clear availability/status. |
| Simulator | Transactional tool: estimate investment outcome | Yield, cash flow, scenarios | Investors | Partial | State formula, assumptions, exclusions, and advisory next step. |
| About | Navigational/trust | Methodology and SAFE | All prospects | Partial | Who, how, legal role, review policy, conflicts, and evidence. |
| Blog hub/articles | Informational | Commercial investigation | Early/mid-funnel buyers | Weak | Increase article depth and add relevant commercial links/FAQs. |
| Contact | Transactional | Private search / project review | High-intent prospects | Good | Add what happens after submission and qualifying expectations. |

## E. Keyword map

| Page | Primary keyword | Secondary / semantic terms | Long-tail and questions | Entity/local terms | Missing or overused |
|---|---|---|---|---|---|
| Home | immobilier privé Marrakech / luxury real estate Marrakech | villas, riads, apartments, off-market, off-plan, investment | “private real estate agency Marrakech”, “buy luxury property Marrakech” | Guéliz, Hivernage, Medina, Palmeraie, Marrakech, Morocco | Add “buy”, “for sale”, buyer profiles, process. No rigid density target needed. |
| Off-market | off-market property Marrakech | confidential property, private access, qualified buyers, discreet sale | “What is off-market real estate in Marrakech?”, “how to access off-market villas” | Marrakech, seller, buyer, confidentiality | Definition/process/risks missing; “private/confidential” repeats without operational proof. |
| Off-plan | off-plan property Marrakech / immobilier sur plan Marrakech | new build, developer, reservation, payment plan, delivery, warranties | “Is buying off-plan property in Morocco safe?”, “documents before reserving” | Morocco, notary, land title, developer, SAFE | Legal and due-diligence vocabulary missing; malformed legacy phrases. |
| Villa Jaz | Villa Jaz Marrakech | off-plan villa, project, plans, surface, suites, pool, location | “Villa Jaz price”, “Villa Jaz payment plan”, “Villa Jaz completion date” | Marrakech, Triangle d’Or/actual location only if verified | Current price/status claims need source/date; many facts JS-only. |
| Neighbourhoods | best neighbourhoods in Marrakech / où investir à Marrakech | Guéliz, Hivernage, Medina, Palmeraie, Amelkis, Agdal, Ourika, Tahanaout | “best area to buy apartment in Marrakech”, “where to invest in Marrakech” | districts, rental demand, lifestyle, access, Atlas | Palmeraie/Amelkis/Agdal/roads undercovered; “top 3” risks oversimplifying search intent. |
| Projects | villas for sale Marrakech / apartments for sale Marrakech | selected projects, new apartments, private villas, off-market | “buy villa in Marrakech”, “luxury apartment Guéliz” | property type, status, budget, surface, title | Add crawlable project facts, not just brand-level selection language. |
| Investment | property investment Marrakech | rental yield, occupancy, short/long term, resale, costs, tax | “rental yield Marrakech”, “buy to rent Marrakech”, “property investment Morocco” | MAD, notary, tax, management, tourism | Current article mentions liquidity/demand but lacks numbers, methodology, risks, costs. |
| Blog | Marrakech real estate blog | investment, off-plan, neighbourhoods, off-market | question-led titles and FAQs | local sources, author, review date | Five articles are a good seed, but too thin to establish authority. |

### Cannibalization map

| Keyword/topic | Competing pages | Risk | Recommended owner | Supporting pages |
|---|---|---|---|---|
| immobilier privé Marrakech / private real estate Marrakech | `/`, `/fr/`, `/en/`, `/nl/`, `/about/`, `/off-market/` | High | Locale homepages for generic term; `/off-market/` for access intent | About, projects, blog |
| off-market property Marrakech | `/off-market/`, home, `/nos-projets/`, off-market article | High | `/off-market/` | Home, projects, article |
| off-plan property Marrakech / sur plan | `/sur-plan/`, `/fr/sur-plan/`, `/en/off-plan/`, `/nl/nieuwbouw/`, `/it/progetti-su-piano/`, Villa Jaz, article | High | Locale off-plan pillar | Villa Jaz and buying guide |
| luxury real estate investment Marrakech | home, `/simulateur/`, `/quartiers/`, investment article | Medium | Investment guide/article or a dedicated investment pillar if approved | Simulator, neighbourhoods, projects |
| best neighbourhoods / où investir Marrakech | `/quartiers/`, `/en/neighbourhoods/`, `/nl/wijken/`, addresses article, investment article | Medium | Locale neighbourhood pages | Both articles, projects, simulator |
| villa for sale / luxury villa Marrakech | home, projects, Villa Jaz, buying article | Medium | Projects or inventory page | Villa Jaz, off-plan pillar, blog |
| apartment Guéliz Marrakech | projects, neighbourhoods, apartment article | Medium | Neighbourhood/project page depending inventory | Guéliz article, simulator |

Recommendation: assign one owner per locale/topic, then use exact-match anchors sparingly. Do not create more near-duplicate landing pages until the existing owners are complete.

## F. Semantic coverage gaps

| Cluster | Covered | Missing or weak | Priority |
|---|---|---|---:|
| Luxury real estate Marrakech | Villas, apartments, riads, selected opportunities, some neighbourhoods | Market context, pricing ranges, buyer profiles, legal process, resale, rental yield methodology, ownership costs | High |
| Off-market Marrakech | Discretion, unpublished properties, qualified access | Definition, seller benefits, buyer qualification, confidentiality process, risks, limits, how OFF MARKET works, conflict handling | Critical |
| Off-plan Marrakech | Four-step acquisition concept, Villa Jaz, payment/calendar mention in article | Developer due diligence, title/land checks, reservation contract, payment plan, construction monitoring, delivery, warranties, materials, resale, risks, SAFE | Critical |
| Villa Jaz | Name, generic features, galleries, plans, price anchor, CTA | Verified location, surfaces, amenities, status/date, buyer fit, investment logic, legal/payment details, documents, availability proof | High |
| Neighbourhoods | Guéliz/Hivernage, Triangle d’Or, Medina; some blog references | Palmeraie, Amelkis, Agdal, Route de l’Ourika, Route de Tahanaout, buyer profile, property types, price position, rental demand | High |
| Investment | Simulator, demand/liquidity language, one article | Short/long-term rental, occupancy, yield calculation, tax, notary, legal checks, operating costs, management, risk management | Critical |
| SAFE | Naming and “verified actors” positioning | Definition, inputs, pass/fail/unknown criteria, evidence, exclusions, update date, disclaimer, reviewer | Critical |

## G. Internal linking audit

The intended graph is sound: home → neighbourhoods/projects/off-market/off-plan/simulator/contact; neighbourhoods → projects/off-market/simulator/blog; off-plan → Villa Jaz/contact; blog → commercial pages. The implementation is uneven.

| Source | Current anchor/destination | Relevance | Problem | Recommendation |
|---|---|---|---|---|
| Home | “Sur plan”, “Simulateur”, “Accès privé”, “Contact” | High | Some locale links resolve to French/root routes | Make every locale link locale-safe and use descriptive anchors. |
| Neighbourhoods | “Nos projets”, “Accéder au Off Market”, simulator, blog | High | Good spine; only three area cards | Add area-specific anchors to project/off-market pages and buyer guides. |
| Off-plan | Four-step/CTA links | High | Static legacy links and malformed content; Villa Jaz is not consistently prominent in crawlable HTML | Add contextual “View Villa Jaz” and buying-guide links in every locale. |
| Villa Jaz | Contact and off-market dossier CTA | High | Detail sections mostly use JS-populated content; no breadcrumb to off-plan pillar | Add breadcrumb and persistent contextual links to off-plan, neighbourhood, contact. |
| Off-market | Home and form anchors | High | Primarily conversion-focused; educational links missing | Link to the off-market article, methodology/SAFE, contact, and privacy. |
| Blog articles | Mostly only “Retour au blog” | Low-medium | Articles are dead ends for commercial SEO | Add 2–4 contextual links: pillar, project, neighbourhood, simulator/contact. |
| Blog hub | Home, sur-plan, simulator, contact | Medium | Article cards are JS-rendered | Ensure article links and summaries are in server HTML. |
| Footer | Strong descriptive anchors in FR/EN/NL | High | Italian links point to French pages; terms may be empty | Fix locale mapping; remove empty legal link; use consistent trailing slashes. |
| Breadcrumbs | Present on modern inner pages | Medium-high | Not universal; static pages may lack BreadcrumbList | Add visible breadcrumbs where useful and matching `BreadcrumbList` only when visible. |

Click-depth is generally acceptable for sitemap routes, but content relevance is the bigger issue. The five articles have one obvious outgoing internal link in their static body, so they do not currently pass authority to money pages.

## H. Content clusters

| Cluster | Pillar | Existing support | Status | Missing |
|---|---|---|---|---|
| Luxury real estate Marrakech | Home or Projects | Home, projects, neighbourhoods, investment article | Partial | Market/pricing/buyer guide, property-type pages only if inventory supports them |
| Off-market | `/off-market/` | Home, off-market article, projects | Weak | Definition, access process, seller page/section, qualification, risks, SAFE |
| Off-plan | `/sur-plan/` / `/en/off-plan/` | Villa Jaz, buying article, simulator | Weak | Due-diligence guide, legal/payment/warranty FAQ, developer checks |
| Villa/apartment investment | Projects + simulator | Apartment Guéliz article, investment article | Partial | Yield/cost methodology, property-type comparison, management/resale |
| Marrakech neighbourhoods | `/quartiers/` | Two blog articles, three cards | Partial | Eight priority locations and objective-based comparisons |
| Buying in Morocco | None | Legal copy and article fragments | Missing | Buyer guide for foreigners, title/notary, taxes/fees, process and caution |
| SAFE assessment | About/verified section | Brand-level claims | Missing as a usable content cluster | Public methodology page/section, criteria, evidence, limitations |
| Rental investment | Simulator + investment article | Demand/liquidity language | Weak | Yield, occupancy, short/long term, operating cost, tax, risk guide |

## I. Duplicate and thin content

| Page | Issue | Severity | Recommendation |
|---|---|---:|---|
| `/` and `/fr/` | Same French homepage content with different canonical targets | High | Choose one French owner. Redirect `/fr/` or make it materially distinct and include it in hreflang. |
| `/about/` and `/fr/about/` | Same French story page | High | Consolidate; current hreflang group does not include `/fr/about/`. |
| `/sur-plan/` and `/fr/sur-plan/` | Same title/body/canonical family | High | Consolidate; retain one French off-plan owner. |
| Blog articles | 149–164 words and a single H1 | High | Expand only articles with commercial value; add evidence, FAQs, author/reviewer, internal links. |
| English/Dutch blog bodies | Localised metadata but source body is not independently localised | High | Create genuinely localised bodies or noindex until complete. |
| Business legacy pages | Duplicated sections, malformed fragments, repeated headings | Critical | Repair source/static transformation; do not patch keyword-by-keyword. |
| Villa Jaz | Shared markup with empty runtime content and empty alts | High | Render key facts and useful alt text in HTML; keep interaction as enhancement. |
| Privacy pages | Legal pages are indexable and in sitemap | Low-medium | Keep if deliberate; otherwise `noindex,follow` and remove from SEO priority. |
| `/location/` | Legacy content and overlap with neighbourhoods | Medium | Redirect/noindex; do not keep as a competing territory page. |

## J. Translation SEO audit

### English

Metadata is generally natural and uses the right commercial vocabulary: “luxury real estate”, “off-plan”, “private access”, “neighbourhoods”, and “investment”. The main issue is the body layer: migrated business content is French-first and the English off-plan page contains English fragments beside malformed translated labels. The English blog metadata is localised, but the short article bodies do not provide an independent English editorial asset. Several English pages link to `/simulateur/` rather than `/en/simulator/`, and some shared data points to French `/about/` or `/privacy-policy/`.

### Dutch

Dutch titles and descriptions are promising: “luxe vastgoed”, “nieuwbouw”, “vastgoed kopen”, and “investeren”. However, the Dutch homepage source headings are still French, and `/nl/nieuwbouw/` contains mixed French/English fragments despite a replacement layer. Literal/awkward wording remains in places, including `standing`, `patrimoniaal`, `nieuwbouwvillaproject`, and malformed labels. Dutch content should be reviewed by a native real-estate speaker after the source page is corrected; mechanical replacement is not enough.

### Italian (additional risk)

Italian routes are public and indexable in the route registry even though the requested priority scope was FR/EN/NL. Their navigation and CTA mappings frequently point to French routes, and the Italian off-plan page is visibly mixed-language. Either complete Italian as a supported locale or keep it out of the indexable language set until it meets the same quality bar.

## K. E-E-A-T and trust audit

Strengths: clear company name, Marrakech location, contact email, a stated private selection model, a verified-actors/SAFE concept, and cautious language in some investment copy.

Missing trust signals:

- named author and reviewer for articles;
- editorial update/review dates rather than only “2026”;
- who performs the project review;
- what S.A.F.E stands for and what evidence is checked;
- what SAFE does not verify or guarantee;
- OFF MARKET’s legal role: agency, introducer, advisor, mandate holder, or other;
- how developer, seller, and partner conflicts are disclosed;
- buyer process from qualification to notary;
- legal and tax disclaimer with referral to qualified Moroccan professionals;
- project status and availability dates;
- company registration/business details where legally appropriate;
- realistic, sourced treatment of rental yield, demand, value growth, and “limited availability”.

Do not add credentials, performance figures, “verified” claims, or legal guarantees until documentary evidence exists.

## L. Metadata audit

### Good

- Most primary pages have unique, readable titles.
- Marrakech is used naturally in titles and descriptions.
- Open Graph and Twitter fields exist on most modern pages.
- Canonicals are present.

### Problems

- `buildBlogArticleMetadata()` returns `title`, canonical, and Open Graph data but no `description`, so article meta descriptions are at risk of being absent in the generated head.
- Root layout sets `lang="fr"` server-side for every page and changes it with a browser script. The server-rendered HTML should carry the correct locale from the route.
- Hreflang groups include `/` but not `/fr/`, and include `/about/` but not `/fr/about/`; the duplicate French routes are therefore not consistently represented.
- Privacy/legal pages are in the sitemap and indexable without clear SEO value.
- `/location/` has a temporary noindex helper, but the route is still present in the production registry and should be resolved deliberately.
- Some titles are brand-led rather than query-led, for example the generic French off-plan title `OFF MARKET — Sur plan | Opportunités sélectionnées à Marrakech`. The page should own a clear “immobilier sur plan à Marrakech” intent.
- Description copy uses repeated “selected/private/confidential” language without enough concrete differentiators.

### Recommended metadata examples

| Page | Current title | Recommended title | Reason |
|---|---|---|---|
| `/sur-plan/` | OFF MARKET — Sur plan \| Opportunités sélectionnées à Marrakech | Immobilier sur plan à Marrakech — Projets sélectionnés \| OFF MARKET | Aligns with the actual query while preserving brand. |
| `/en/off-plan/` | Off-Plan Properties in Marrakech \| OFF MARKET | Off-Plan Property in Marrakech — Selected Projects \| OFF MARKET | Singular topic owner and clearer intent. |
| `/nl/nieuwbouw/` | Nieuwbouw in Marrakech \| OFF MARKET | Nieuwbouw in Marrakech — Geselecteerde vastgoedprojecten \| OFF MARKET | More specific and natural Dutch commercial intent. |
| `/off-market/` | Accès OFF MARKET Marrakech — Sélection privée de biens | Biens immobiliers off-market à Marrakech — Accès privé \| OFF MARKET | Captures both topic and conversion intent. |
| `/quartiers/` | Où investir à Marrakech — Quartiers et projets immobiliers | Meilleurs quartiers où investir à Marrakech — Guide immobilier \| OFF MARKET | Better matches comparison intent; qualify “best” by criteria in body. |
| Blog article | Current titles are good but descriptions are not wired by blog metadata builder | Keep titles; wire unique descriptions, OG descriptions, dates, author/reviewer | Fixes a technical metadata omission without rewriting titles. |

Descriptions should be written per page, around one clear promise plus local/topic terms; avoid repeated formulas.

## M. Heading audit

Modern React inner pages generally have one H1 and sensible H2 sections. Problems are concentrated in migrated/static content:

- blog articles have a single H1 and no H2s despite guide intent;
- off-plan static pages contain duplicate H3s and malformed labels;
- Dutch/new-build and Italian pages expose French or mixed-language headings;
- Villa Jaz’s important project facts are often injected into empty containers, so the crawlable heading/text hierarchy is weaker than the visual experience;
- `InnerPageHero` uses a French breadcrumb `aria-label` on English and Dutch routes;
- headings such as “Top 3” are potentially too narrow for the requested neighbourhood coverage.

Heading fixes should follow actual information architecture: one H1, H2s for user questions, H3s for subsections. Do not add headings just to place keywords.

## N. FAQ and People Also Ask opportunities

Add visible Q&A blocks only where the business can answer accurately. Suggested high-value questions:

**Off-market**

- What is off-market real estate in Marrakech?
- How does private access work?
- Who can request access?
- How are buyers qualified?
- What does OFF MARKET verify?
- Are off-market properties always better priced?

**Off-plan**

- Is buying off-plan property in Morocco safe?
- Which documents should be checked before reservation?
- How are payment milestones structured?
- What happens if delivery is delayed?
- How is the developer reviewed?
- What should a buyer budget for beyond the purchase price?

**Buying in Morocco**

- Can foreign buyers purchase property in Morocco?
- What does the notary verify?
- What are the registration and notary costs?
- How are title and land documents checked?
- Which professional should provide legal or tax advice?

**Investment**

- What rental yield can be expected in Marrakech?
- How do short-term and long-term rental strategies differ?
- Which costs affect net yield?
- How should occupancy assumptions be tested?
- What makes a property easier to resell?

**Neighbourhoods**

- Which area is best for an apartment investment?
- Which areas suit a private villa?
- How do Guéliz, Hivernage, Medina, Palmeraie and Amelkis differ?

Do not add FAQ schema until the exact questions and answers are visibly rendered on the page.

## O. Prioritised content gap roadmap

| Priority | Topic | Target keyword | Page type | Link from | Supports | Estimated value |
|---|---|---|---|---|---|---|
| 1 | Off-market explained and process | off-market property Marrakech | Expand `/off-market/` | Home, blog article | Off-market access form | Very high |
| 1 | Off-plan buyer due diligence | off-plan property Marrakech / buying off-plan Morocco | Expand `/sur-plan/` | Home, simulator, blog | Villa Jaz and contact | Very high |
| 1 | SAFE methodology | SAFE certification real estate / project review Morocco | Expand About or dedicated section | Off-market, off-plan, Villa Jaz | Trust and conversion | Very high |
| 1 | Buying property in Morocco | buy property in Morocco / foreign buyer Marrakech | Guide | Blog, contact, off-plan | All commercial pages | Very high |
| 1 | Locale repair | luxe vastgoed Marrakech / off-plan property Marrakech | Existing page repair | All locale navigation | All locale pages | Very high |
| 2 | Marrakech neighbourhood guide | best neighbourhoods Marrakech real estate | Expand `/quartiers/` | Home, blog | Projects, simulator | High |
| 2 | Rental investment methodology | rental yield Marrakech | Guide or simulator explainer | Simulator, investment article | Projects and contact | High |
| 2 | Villa Jaz facts | Villa Jaz Marrakech | Expand detail page | Off-plan and neighbourhoods | Contact/private dossier | High |
| 2 | Guéliz apartment guide | apartment for sale Guéliz | Article/section | Projects, neighbourhoods | Apartment enquiries | Medium-high |
| 3 | Seller off-market page/section | sell property privately Marrakech | Only if seller service is real | Off-market, About | Seller leads | Medium |
| 3 | Area-specific pages | property Palmeraie/Amelkis/Agdal Marrakech | Only with distinct inventory/evidence | Neighbourhoods | Projects | Medium |

Avoid creating low-value pages for every keyword. Expand the current owners first.

## P. Competitive content benchmark

The benchmark indicates that strong Marrakech real-estate sites typically make their service concrete with property types, buyer/seller use cases, transaction process, local coverage, contact details, experience or business identity, and legal/notarial support. Examples reviewed include [JM Homes](https://www.jmhomes.ma/en), which describes sales, rentals, management and support through administrative/notarial partners; [MRI Immo](https://www.mri-immo.com/en), which exposes property counts, locations, services, valuation and management; [Marrakech Realty](https://www.marrakechrealty.com/), which makes experience, team, legal support and business identifiers visible; [Capital Properties](https://www.capital-properties.ma/en/), which combines sales, new developments, investment and process/trust language; and [RealKhalid](https://www.realkhalid.com/en), which makes off-market access, experience, property types, contact information and legal/notarial support explicit.

Compared with that benchmark, OFF MARKET’s differentiation is strong in concept—private curation, a visual editorial identity, off-market positioning, and the SAFE idea—but weak in proof and informational detail. The opportunity is to own “how to read and qualify a private/off-plan Marrakech opportunity”, not to become another generic property listing directory.

Do not copy competitor claims such as years of experience, property counts, yield, or legal guarantees. Use the benchmark to identify the content expectations users bring to the category.

## Q. SEO risk audit

| Risk | Severity | Evidence / impact | Treatment |
|---|---:|---|---|
| Locale pages with wrong-language or malformed body copy | Critical | Dutch homepage and off-plan static pages expose French/mixed-language fragments | Repair source transformation; re-review every locale; keep low-quality locale out of index until fixed. |
| Duplicate French routes | High | `/` vs `/fr/`, `/about/` vs `/fr/about/`, `/sur-plan/` vs `/fr/sur-plan/` | Select canonical route and redirect/noindex duplicates; align hreflang/sitemap. |
| Blog descriptions absent from metadata builder | High | `buildBlogArticleMetadata()` omits `description` | Add descriptions in a later implementation pass. |
| Important content JS-only | High | Blog cards, project facts, Villa Jaz details populate after load | Render meaningful summaries/facts in server HTML. |
| Thin articles | High | 149–164 words, one H1, no evidence/FAQ/links | Expand only strategic articles. |
| Unsupported “verified”, “secure”, “limited availability”, “potential” language | High | Trust/investment claims lack visible methodology or evidence | Qualify claims and disclose limits/source dates. |
| Investment calculations without visible assumptions | High | Simulator presents a result but methodology/disclaimer is not prominent | Explain inputs, formula, costs, tax, occupancy, and non-guarantee. |
| Empty image alt on property detail | Medium | JS-populated images have `alt=""` | Add descriptive alt for informative images; keep decorative images empty. |
| Mixed locale internal links | Medium | English/Dutch/Italian content points to French/root routes | Fix route mapping and test all nav/footer/CTA links. |
| Legal pages indexable without SEO purpose | Low-medium | Privacy pages are in sitemap | Keep only if intentional; otherwise noindex/follow. |
| Legacy `/location/` overlap | Medium | Noindex helper exists, but content remains public | Redirect to neighbourhood pillar or keep noindex consistently. |
| No evidence of keyword stuffing | Low | Copy repeats brand concepts, not exact-match terms at high density | Do not pursue density changes; improve specificity instead. |

## R. Quick wins that can be implemented safely later

1. Wire unique meta descriptions into blog article metadata.
2. Fix server-rendered `html lang` per route.
3. Choose and enforce one French owner for duplicate routes; align sitemap and hreflang.
4. Repair locale route mappings in nav/footer/CTA data.
5. Remove or rewrite malformed static labels in off-plan pages.
6. Add 2–4 contextual links from every article to its pillar, project, neighbourhood, simulator, or contact page.
7. Add visible methodology/disclaimer copy for SAFE and the simulator.
8. Make Villa Jaz facts, location, price date, status, surfaces, amenities, and CTA crawlable without JavaScript.
9. Add descriptive alt text to informative project images.
10. Add visible author/reviewer/update information to strategic articles.

## S. Pages/content that should not be changed in the first pass

- Do not redesign the visual system, typography, spacing, animation, or components.
- Do not rewrite every page to increase word count.
- Do not add neighbourhood landing pages without distinct local evidence or inventory.
- Do not add FAQ schema before visible Q&A exists.
- Do not add investment returns, legal assurances, credentials, or project facts without evidence.
- Do not create a large generic blog calendar; strengthen the five existing strategic articles first.
- Do not keep duplicate French routes merely because they are already in the sitemap.

## T. Prioritized action plan

### Critical

- Repair French/English/Dutch/Italian static content generation and remove malformed/mixed-language fragments.
- Decide the supported locale set; complete or noindex weak Italian and Dutch content.
- Consolidate duplicate French routes and correct hreflang/canonical/sitemap relationships.
- Make off-plan, off-market, SAFE, and Villa Jaz core facts visible and accurate.

### High

- Add blog meta descriptions and expand the five articles with useful depth, evidence, FAQs, author/reviewer and commercial links.
- Expand neighbourhood and investment coverage with explicit buyer intent, costs, risks, and strategy distinctions.
- Explain simulator assumptions and add legal/investment caveats.
- Fix mixed-locale internal links and add contextual links from blog to commercial pages.

### Medium

- Improve contact trust/process copy, project summaries, breadcrumbs, image alts, and editorial dates.
- Resolve `/location/` as a redirect/noindex legacy route.
- Consider noindexing privacy pages if they are not intended as search landing pages.

### Low

- Refine title wording where brand-first titles obscure the query.
- Improve anchor variation and remove remaining generic labels.
- Add category/topic navigation only after server-rendered article links are stable.

## U. Audit confirmation

- Audit only: **yes**
- Redesign: **no**
- Content rewriting implemented: **no**
- New pages added: **no**
- Route changes implemented: **no**
- Commit: **no**
- Push: **no**

This report is the only file added by this audit. Existing user changes in the worktree were preserved.
