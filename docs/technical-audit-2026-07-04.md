# OFF MARKET Next.js Technical Audit - 2026-07-04

Scope: current Next.js OFF MARKET website, not the old static site.

Constraints followed: no redesign, no dependency install, no commit, no push, safe fixes only.

## A. Executive Summary

Overall health: the site is partially productionized in Next.js, with good route coverage, self-referencing canonicals, useful page metadata, and a working migration path through structured JSON content plus legacy assets. It is not fully production-ready because the local production build is currently unstable.

Critical issues:

- `next build` fails after compilation while collecting page data. With bundled Node `v24.14.0`, the generated `.next/server/webpack-runtime.js` tries to require `./611.js`, while the generated file exists at `.next/server/chunks/611.js`. The build exits with `MODULE_NOT_FOUND`.
- `.next/BUILD_ID` is missing after the failed build, so `next start` cannot be trusted from the current artifact.
- Runtime browser re-verification after the final FAQ boot change could not be completed because localhost server startup requires escalation and the approval gate was blocked by account usage limits.

High priority fixes:

- Stabilize the production build in a clean environment and pin a supported Node runtime for CI/deploy. The current shell Node is `v25.2.1`; bundled Node is `v24.14.0`; neither is the safest target for this Next version.
- Resolve legacy empty links and placeholder CTA links, especially in navigation, project CTAs, simulator CTAs, and migrated home/location markup.
- Fix `/location/` links to non-production routes: `/gallery/`, `/flats/`, `/agreement/`; `/infrastructure/` redirects to `/sur-plan/` but should still be normalized in content.
- Restore or intentionally remove SVG sprite references to `/assets/images/icons.svg?v=1765268659`; the dev server previously logged this asset as missing.

Medium priority fixes:

- Reduce legacy JavaScript/CSS loaded by page. Several pages still load static-era bundles and DOM scripts that are not page-specific.
- Add Article JSON-LD to blog article pages if content policy supports it.
- Audit the EN/IT/NL content: localized routes exist but much metadata/content is still French, creating multilingual duplicate-language risk.
- Convert clearly stable legacy sections from static HTML/script rendering to server-rendered React gradually, starting with navigation CTAs and repeated card/modal patterns.

Low priority cleanup:

- Remove `.DS_Store` files and generated/transient artifacts only after confirming repository policy.
- Review archive folders and old migration documents for retention needs.
- Consolidate duplicate-looking chrome/motion components after import graph confirmation.

Safe fixes applied during audit:

- Added missing sitemap coverage for live localized routes.
- Added a server-rendered accessible H1 to `/blog/`.
- Reworked the homepage FAQ from a hydrated client accordion into server-rendered markup with a tiny client boot script, reducing hydration risk and keeping FAQ content available to crawlers.

## B. Route Audit Table

Notes:

- Status codes are from the saved local production route fetch before the final build blocker reappeared.
- `/blog/` H1 reflects the post-fix `blog-after.html` snapshot and source code.
- Console/hydration checks are incomplete after the final FAQ boot change because no local server could be started after the build failure and escalation block.

| Route | Status | Title | Meta | Canonical | Schema | H1 | Broken Links/Images | Console Errors | Notes |
|---|---:|---|---|---|---:|---:|---|---|---|
| `/` | 200 | OFF MARKET - Immobilier prive de prestige a Marrakech | Yes | `/` | 2 | 1 | Empty/hash legacy links remain | Previously had FAQ hydration issue; fixed in source, final runtime retest blocked | FAQ inserted before blog; FAQPage JSON-LD present |
| `/about/` | 200 | Notre Histoire - OFF MARKET Marrakech | Yes | `/about/` | 0 | 1 | Empty links in shared chrome | No errors observed in earlier desktop check | Good metadata structure |
| `/quartiers/` | 200 | Ou investir a Marrakech - Quartiers et projets immobiliers | Yes | `/quartiers/` | 0 | 1 | Empty links in shared chrome | Not fully retested after build blocker | Heavy client motion/scripts |
| `/nos-projets/` | 200 | Nos projets immobiliers a Marrakech - Villas, appartements et off-market | Yes | `/nos-projets/` | 0 | 1 | Empty CTA links in project cards/modal | Not fully retested after build blocker | Project modal needs runtime QA |
| `/sur-plan/` | 200 | OFF MARKET - Sur plan \| Opportunites selectionnees a Marrakech | Yes | `/sur-plan/` | 0 | 1 | No route-level broken images in saved fetch | Not fully retested after build blocker | Very heavy HTML/images: about 535 KB, 88 images |
| `/simulateur/` | 200 | Simulateur investissement immobilier Marrakech \| OFF MARKET | Yes | `/simulateur/` | 0 | 1 | Empty CTA links in simulator actions | Not fully retested after build blocker | Formula source matches requested gross-yield test |
| `/contact/` | 200 | Contact OFF MARKET - Projet immobilier a Marrakech | Yes | `/contact/` | 0 | 1 | Empty links in shared chrome | Not fully retested after build blocker | Form runtime should be manually tested |
| `/blog/` | 200 | Blog immobilier Marrakech - OFF MARKET | Yes | `/blog/` | 2 | 1 | None found in saved snapshot | Not fully retested after build blocker | H1 was missing; fixed |
| `/off-market/` | 200 | Acces OFF MARKET Marrakech - Selection privee de biens | Yes | `/off-market/` | 0 | 1 | Not route-broken in saved fetch | Not fully retested after build blocker | In sitemap |
| `/location/` | 200 | OFF MARKET - Adresses \| Territoires d'investissement a Marrakech | Yes | `/location/` | 0 | 1 | Links to `/gallery/`, `/flats/`, `/agreement/`, `/infrastructure/` | Not fully retested after build blocker | Heaviest page: about 731 KB, 62 images |
| `/privacy-policy/` | 200 | Mentions legales \| OFF MARKET | Yes | `/privacy-policy/` | 0 | 1 | Empty links in shared chrome | Not fully retested after build blocker | Low-priority route |
| `/fr/` | 200 | OFF MARKET - Immobilier prive de prestige a Marrakech | Yes | `/fr/` | 0 | 1 | Empty/hash legacy links remain | Not fully retested after build blocker | In sitemap after fix |
| `/fr/about/` | 200 | Notre Histoire - OFF MARKET Marrakech | Yes | `/fr/about/` | 0 | 1 | Empty links in shared chrome | Not fully retested after build blocker | In sitemap |
| `/fr/sur-plan/` | 200 | OFF MARKET - Sur plan \| Opportunites selectionnees a Marrakech | Yes | `/fr/sur-plan/` | 0 | 1 | No route-level broken images in saved fetch | Not fully retested after build blocker | In sitemap |
| `/fr/contact/` | 200 | Contact \| OFF MARKET Marrakech | Yes | `/fr/contact/` | 0 | 1 | Empty links in shared chrome | Not fully retested after build blocker | In sitemap |
| `/en/` | 200 | OFF MARKET - Immobilier prive de prestige a Marrakech | Yes | `/en/` | 0 | 1 | Empty/hash legacy links remain | Not fully retested after build blocker | French metadata/content risk |
| `/en/off-plan/` | 200 | OFF MARKET - Sur plan \| Opportunites selectionnees a Marrakech | Yes | `/en/off-plan/` | 0 | 1 | No route-level broken images in saved fetch | Not fully retested after build blocker | French metadata/content risk |
| `/en/contact/` | 200 | Contact \| OFF MARKET Marrakech | Yes | `/en/contact/` | 0 | 1 | Empty links in shared chrome | Not fully retested after build blocker | In sitemap after fix |
| `/it/` | 200 | OFF MARKET - Immobilier prive de prestige a Marrakech | Yes | `/it/` | 0 | 1 | Empty/hash legacy links remain | Not fully retested after build blocker | French metadata/content risk |
| `/it/progetti-su-piano/` | 200 | OFF MARKET - Sur plan \| Opportunites selectionnees a Marrakech | Yes | `/it/progetti-su-piano/` | 0 | 1 | No route-level broken images in saved fetch | Not fully retested after build blocker | French metadata/content risk |
| `/it/contatto/` | 200 | Contact \| OFF MARKET Marrakech | Yes | `/it/contatto/` | 0 | 1 | Empty links in shared chrome | Not fully retested after build blocker | In sitemap after fix |
| `/nl/` | 200 | OFF MARKET - Immobilier prive de prestige a Marrakech | Yes | `/nl/` | 0 | 1 | Empty/hash legacy links remain | Not fully retested after build blocker | French metadata/content risk |
| `/nl/nieuwbouw/` | 200 | OFF MARKET - Sur plan \| Opportunites selectionnees a Marrakech | Yes | `/nl/nieuwbouw/` | 0 | 1 | No route-level broken images in saved fetch | Not fully retested after build blocker | French metadata/content risk |
| `/nl/contact/` | 200 | Contact \| OFF MARKET Marrakech | Yes | `/nl/contact/` | 0 | 1 | Empty links in shared chrome | Not fully retested after build blocker | In sitemap after fix |
| `/blog/acheter-villa-sur-plan-marrakech/` | 200 | Acheter une villa sur plan a Marrakech - OFF MARKET | Yes | Self | 0 | 1 | None found in saved snapshot | Not fully retested after build blocker | Consider Article schema |
| `/blog/investir-immobilier-luxe-marrakech/` | 200 | Investir dans l'immobilier de prestige a Marrakech - OFF MARKET | Yes | Self | 0 | 1 | None found in saved snapshot | Not fully retested after build blocker | Consider Article schema |
| `/blog/adresses-immobilier-marrakech/` | 200 | Gueliz, Hivernage, Amelkis : adresses a Marrakech - OFF MARKET | Yes | Self | 0 | 1 | None found in saved snapshot | Not fully retested after build blocker | Consider Article schema |
| `/blog/off-market-marrakech-biens-confidentiels/` | 200 | Pourquoi certains biens a Marrakech ne sont jamais publies - OFF MARKET | Yes | Self | 0 | 1 | None found in saved snapshot | Not fully retested after build blocker | Consider Article schema |
| `/blog/appartement-hypercentre-gueliz-marrakech/` | 200 | Appartement en hypercentre a Marrakech - OFF MARKET | Yes | Self | 0 | 1 | None found in saved snapshot | Not fully retested after build blocker | Consider Article schema |

## C. Performance Findings

JavaScript:

- Root/home saved snapshot: 32 script tags before the FAQ architecture fix.
- `/sur-plan/`: 37 script tags.
- `/location/`: 40 script tags.
- `/about/`, `/quartiers/`, `/nos-projets/`: 47 script tags each.
- Legacy DOM scripts are still a major weight source: `shared.js`, `landing.js`, GSAP/ScrollTrigger, navigation scripts, property modal scripts, blog scripts, simulator scripts, and page-specific motion scripts.
- Framer Motion exists as an installed dependency and is used in motion components. The FAQ no longer uses Framer Motion, which avoids adding animation client weight to that SEO section.
- Several interactive behaviors are initialized from DOM scripts against static HTML. This is migration-friendly but increases hydration/rendering risk when mixed with React components.

CSS:

- Root/home saved snapshot: 26 stylesheet links.
- `/about/` and `/quartiers/`: 17 stylesheet links.
- `/nos-projets/`: 16 stylesheet links.
- `/sur-plan/` and `/location/`: 12 stylesheet links each.
- Legacy CSS is still active and should not be removed blindly: content JSON and `lib/assets.ts` style/script registries reference it heavily.
- Preloader/page-transition classes still exist in migrated markup. The app has cleanup helpers, but these styles remain a rendering-risk area if initialization order changes.

Images:

- `/sur-plan/`: about 535 KB HTML and 88 images in saved snapshot.
- `/location/`: about 731 KB HTML and 62 images in saved snapshot.
- Root/home: about 225 KB HTML and 7 server-visible images in saved snapshot; many dynamic sections are script-rendered.
- Most route-visible images have concrete paths. The known missing asset risk is the SVG sprite `/assets/images/icons.svg?v=1765268659`.
- Many legacy image tags use plain `<img>` rather than `next/image`. This is not automatically wrong for migrated static content, but it means optimization relies on source dimensions, loading attributes, and asset format discipline.

Fonts:

- Pages preconnect to Google Fonts and `fonts.gstatic.com`.
- Typography tokens are present, but legacy CSS and page-specific styles can override one another.
- Font rendering should be tested in production after build stabilization for layout shift.

Rendering:

- The homepage FAQ previously produced a React hydration mismatch when implemented as a client Framer accordion inside the static HTML bridge. The FAQ is now server-rendered with deterministic IDs and a tiny client boot.
- Inline raw scripts inside React-rendered static content did not execute reliably, so the FAQ was moved to a real client boot component.
- Scroll/preloader hiding remains a risk because the app depends on initialization scripts to remove `not-ready` and related classes.

Build output:

- `./node_modules/.bin/tsc --noEmit`: passed.
- `next build` with bundled Node `v24.14.0`: failed after compile during page-data collection.
- Error: `Cannot find module './611.js'`, required by `.next/server/webpack-runtime.js`.
- The generated chunk exists at `.next/server/chunks/611.js`; runtime expects `.next/server/611.js`.
- `.next/BUILD_ID`: absent after the failed build.
- A clean `.next` rebuild attempt could not be performed because removal of generated `.next` required escalation and the approval gate was blocked by account usage limits.

## D. Dead Code Findings

| File / Component | Status | Reason | Action |
|---|---|---|---|
| `app/**` | KEEP - ACTIVE | Current Next.js app routes are here. | Keep. |
| `components/home/HomeFaqSection.tsx` | KEEP - ACTIVE | Imported by homepage content and renders FAQ. | Keep. |
| `components/home/HomeFaqBoot.tsx` | KEEP - ACTIVE | Tiny client behavior layer for FAQ accordion. | Keep. |
| `components/home/homeFaqContent.ts` | KEEP - ACTIVE | FAQ content, styles, and FAQPage schema. | Keep. |
| `components/blog/BlogIndexContent.tsx` | KEEP - ACTIVE | Blog route content shell and fixed H1. | Keep. |
| `components/layout/SiteChrome.tsx` | KEEP - ACTIVE | Imported by about/contact/quartiers/nos-projets/simulateur/privacy pages. | Keep; fix placeholder hrefs deliberately. |
| `components/chrome/SiteChrome.tsx` | NEEDS CONFIRMATION | No imports found from `app`, `components`, or `lib`; appears duplicate/older chrome path. | Confirm no dynamic import/story usage, then remove or consolidate. |
| `components/motion/*` | KEEP - ACTIVE | Motion components are imported by active pages and templates. | Keep; page-split or defer where possible. |
| `components/sections/FeaturedProjectsSection.tsx` | KEEP - ACTIVE | Imported by `NosProjetsPageContent`. | Keep; fix placeholder CTAs. |
| `components/sections/SimulatorSection.tsx` | KEEP - ACTIVE | Imported by `/simulateur/`. | Keep; fix placeholder CTAs. |
| `content/pages/*.json` | KEEP - ACTIVE | Source for migrated page HTML, metadata, styles, scripts. | Keep. |
| `assets/stylesheets/**` | RISKY TO REMOVE | Many files are referenced by content JSON and runtime assets registry. | Do not delete until per-route coverage map exists. |
| `assets/javascripts/**` | RISKY TO REMOVE | Legacy scripts initialize active sections, forms, menu, modals, simulator, blog. | Do not delete blindly; remove page-by-page only after React replacement. |
| `assets/images/icons.svg` reference | RISKY / BROKEN REFERENCE | Markup references the sprite, but the asset was missing in dev server logs. | Restore intended sprite or remove references with replacement icons. |
| `_backup_static_before_next_migration/` | NEEDS CONFIRMATION | Migration archive, not a live app route. | Keep until owner confirms archival policy. |
| `_legacy_static_archived_after_full_next_migration/` | NEEDS CONFIRMATION | Migration archive and parsing reference noted in route registry comments. | Keep until owner confirms no longer needed. |
| `archive/`, `media/cache/`, `Scrapping `, `sections-propmts/` | NEEDS CONFIRMATION | Large migration/support assets; not proven live by imports in this audit. | Recommended deletion list only after asset-reference scan and owner approval. |
| `.DS_Store` files | SAFE TO REMOVE | OS metadata, not required by app runtime. | Safe cleanup, not applied. |
| `.next/` | SAFE TO REMOVE | Generated build output. | Safe cleanup when approval permits; not applied due blocked escalation. |

## E. SEO Findings

Indexing:

- `robots.txt` allows all crawlers and points to `https://offmarketofficial.com/sitemap.xml`.
- No route-level accidental `noindex` was found in saved snapshots.
- Sitemap after fix contains 29 URLs.

Sitemap:

- Fixed missing sitemap entries for localized live routes:
  `/en/`, `/it/`, `/nl/`, `/en/off-plan/`, `/it/progetti-su-piano/`, `/nl/nieuwbouw/`, `/location/`, `/en/contact/`, `/it/contatto/`, `/nl/contact/`.
- Sitemap now covers all discovered app production routes from this audit.

Robots:

- Clean and simple: `User-Agent: *`, `Allow: /`, sitemap URL.

Canonicals:

- Saved route snapshots show self-referencing canonicals with trailing slash consistency.
- The app uses `trailingSlash: true`, and sitemap URLs include trailing slashes.

Metadata:

- All audited routes have titles and meta descriptions.
- Main routes have OG/Twitter metadata in the saved snapshots.
- Localized EN/IT/NL pages still show French titles/descriptions in several places; this is a multilingual SEO quality risk.

Schema:

- Homepage has JSON-LD and now includes FAQPage schema for the six FAQ questions.
- `/blog/` has CollectionPage-like JSON-LD in saved snapshots.
- Blog articles have no Article JSON-LD in saved snapshots. This is not a breaking error, but it is an SEO opportunity.
- JSON-LD present in saved snapshots parses successfully.

Internal linking:

- Static scan found 278 empty `href=""` links and 69 hash links in saved route HTML. Many come from migrated static markup and placeholder CTAs.
- Static scan found unknown internal routes referenced from `/location/`: `/gallery/`, `/flats/`, `/agreement/`, `/infrastructure/`.
- `/infrastructure/` is redirected in `next.config.ts`; the other three should be fixed or intentionally routed.

Content intent:

- Homepage: clear private/off-market real estate intent; FAQ now strengthens sur-plan/off-market search intent.
- About: clear brand/story intent.
- Quartiers: clear local-investment intent.
- Nos projets: clear property/project selection intent.
- Sur-plan: clear off-plan/property project intent.
- Simulateur: clear investment calculator intent; formula label correctly says gross yield.
- Contact: clear lead/contact intent.
- Blog: clear editorial hub intent after H1 fix.

Multilingual / hreflang:

- EN/IT/NL routes exist and are in the sitemap after fix.
- Content/metadata appears partially duplicated/French across localized routes.
- Do not add hreflang until translations are complete and each locale has correct language-specific metadata.

## F. Accessibility Findings

Positive:

- FAQ uses real `<button>` triggers.
- FAQ buttons include `aria-expanded` and `aria-controls`.
- FAQ panels use `role="region"` and `aria-labelledby`.
- FAQ supports keyboard operation through native button semantics.
- FAQ focus state is visible and reduced-motion CSS is present.
- Forms in the homepage private access section use labels, fieldsets, and live status regions in the migrated markup.
- Major modal shells include `role="dialog"` and `aria-modal`.

Issues / risks:

- Empty `href=""` links are keyboard-focusable but semantically unclear and can navigate unexpectedly.
- Some hash-only links are placeholders or modal triggers; they need confirmation that focus management and scroll behavior are correct.
- Project modal/video/modal Escape and focus-trap behavior were not fully retested after build instability.
- Several decorative images have empty alt attributes; that is acceptable only when intentionally decorative.
- Color contrast was not programmatically audited due no additional tooling/dependencies allowed.
- Body scroll restoration depends on legacy scripts and cleanup helpers; needs runtime regression testing once build is stable.

Critical accessibility issues:

- Placeholder empty links in active navigation/CTA components should be treated as high priority because they affect keyboard and screen-reader navigation.

## G. Functional Bug Findings

Navigation:

- Saved route fetches confirm direct hard-load access for all listed routes before build instability.
- Browser navigation/back-forward regression could not be completed after the final build blocker.
- Shared chrome has multiple empty `href=""` links in `components/layout/SiteChrome.tsx`.

Header:

- Active nav state appears to be partly hardcoded in migrated/static markup.
- Language routes exist, but language labels/content are not fully translated.
- Sticky/hide/show behavior depends on DOM scripts and needs production runtime retest.

Modals:

- Project modal markup includes dialog semantics and close buttons.
- Runtime close-on-Escape/backdrop/focus restoration could not be fully retested after build instability.
- Empty CTA links inside modal/project sections remain.

Forms:

- Contact/home access form markup has labels and required fields.
- No fake API endpoint creation was done.
- Submission behavior and success/error states need runtime retest after build stabilization.

Simulator:

- Source formula matches requested gross test:
  `availableDays = 365`
  `nightsRented = 255`
  `grossAnnualRevenue = 306000 DH`
  `grossYield = 20.4%`
- The UI labels the result as gross annual yield before charges/tax/real fees.
- Runtime slider/tab behavior could not be retested after localhost startup was blocked.

Security / privacy:

- Narrow source scan found no obvious exposed API keys or private tokens.
- No service worker registration/unregistration was found in `app`, `components`, `lib`, or `scripts`; older inline unregister snippets exist in migrated content snapshots and should be cleaned when those pages are converted.
- External font connections are intentional.

## H. Fixes Applied

| File Modified | Problem | Fix | Why Safe |
|---|---|---|---|
| `lib/legacy/routes.ts` | Sitemap omitted several live localized routes. | Added localized home/off-plan/contact/location sitemap entries. | Routes already exist in `app/**`; sitemap now matches production route surface. |
| `components/blog/BlogIndexContent.tsx` | `/blog/` had no server-rendered H1 in saved snapshot. | Added visually hidden server-rendered H1: `Blog immobilier Marrakech`. | Does not redesign page; improves semantic SEO/accessibility while preserving visual blog section. |
| `components/home/HomeFaqSection.tsx` | FAQ client accordion caused hydration risk inside static HTML bridge. | Server-rendered the FAQ markup with deterministic IDs and accessible button/panel attributes. | Keeps content crawlable, avoids full client hydration for FAQ content. |
| `components/home/HomeFaqBoot.tsx` | Raw inline FAQ script did not execute reliably in React/Next rendering. | Added a tiny client `useEffect` boot to handle click/open/close behavior. | Localized behavior only; no dependency; no global animation changes. |
| `components/home/homeFaqContent.ts` | FAQ needed subtle accordion transitions and reduced-motion handling. | Added panel height/opacity transitions and reduced-motion fallback. | Section-scoped CSS only; no global animation change. |
| `components/home/HomePageContent.tsx` | FAQ needed to appear before the blog and add FAQPage schema/styles only on root homepage. | Existing insertion logic confirmed and used for root `includeFaqSection`. | Does not alter blog markup; inserts before blog marker. |

Files created:

- `components/home/HomeFaqBoot.tsx`
- `docs/technical-audit-2026-07-04.md`

## I. Recommended Next Fixes Not Applied

Not applied because they need product/design confirmation or a stable production build:

- Clean rebuild from a removed `.next` directory. Safe in principle, but escalation was blocked by account usage limits.
- Replace all `href=""` values. Some placeholders are likely legacy script hooks or pending CTAs; changing all at once could break modals/forms/navigation.
- Delete archive folders. They are not live app routes, but may be needed for migration history or asset recovery.
- Remove legacy CSS/JS bundles. Many are still active through JSON content and route asset registries.
- Add hreflang. Localized pages appear incomplete/duplicated, so hreflang could amplify duplicate-language problems.
- Add richer real-estate/project schema. Avoided because schema should not claim facts beyond verified content.
- Restore `/assets/images/icons.svg`. The expected sprite contents were not confirmed, so creating a guessed sprite would be risky.
- Full desktop/mobile browser regression after final FAQ boot change. Blocked by build failure and localhost escalation denial.

## J. Final Verification

Build result:

- `./node_modules/.bin/tsc --noEmit`: passed.
- Production build command run:
  `/Users/namousssifeddine/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/next/dist/bin/next build`
- Result: failed after successful compilation.
- Error: `Cannot find module './611.js'` from `.next/server/webpack-runtime.js`.
- Artifact issue: `.next/server/chunks/611.js` exists, but runtime requires `.next/server/611.js`.
- `.next/BUILD_ID`: missing.
- `npm run build` via default shell Node `v25.2.1` was previously observed as unreliable for this app. Stabilize on a supported Node version in CI/deploy.

Routes audited:

- `/`
- `/about/`
- `/quartiers/`
- `/nos-projets/`
- `/sur-plan/`
- `/simulateur/`
- `/contact/`
- `/blog/`
- `/off-market/`
- `/location/`
- `/privacy-policy/`
- `/fr/`
- `/fr/about/`
- `/fr/sur-plan/`
- `/fr/contact/`
- `/en/`
- `/en/off-plan/`
- `/en/contact/`
- `/it/`
- `/it/progetti-su-piano/`
- `/it/contatto/`
- `/nl/`
- `/nl/nieuwbouw/`
- `/nl/contact/`
- `/blog/acheter-villa-sur-plan-marrakech/`
- `/blog/investir-immobilier-luxe-marrakech/`
- `/blog/adresses-immobilier-marrakech/`
- `/blog/off-market-marrakech-biens-confidentiels/`
- `/blog/appartement-hypercentre-gueliz-marrakech/`
- `/robots.txt`
- `/sitemap.xml`

Desktop viewports tested:

- Earlier desktop browser checks covered `/about/` and homepage states before the final build blocker.
- `/about/`: H1 rendered and no captured browser warnings/errors in that check.
- Homepage: FAQ placement before blog and FAQ schema were observed before the final FAQ boot change.
- Final desktop retest after `HomeFaqBoot` was blocked by build failure and localhost permission denial.

Mobile viewports tested:

- Final mobile runtime verification was blocked by build failure and localhost permission denial.
- Source/CSS review confirms the FAQ section has mobile breakpoints and native button controls.

Console/hydration result:

- Original homepage FAQ client implementation caused a React hydration mismatch.
- Source was changed to server-render FAQ markup and tiny client boot behavior.
- Final browser console/hydration verification after that last change could not be completed because a local server could not be started.

Homepage navigation/rendering state:

- FAQ is inserted before the blog section by `insertFaqBeforeBlog`.
- Blog section markup is not edited.
- FAQ schema is added through homepage content metadata injection.
- Empty navigation links remain in shared chrome/migrated markup and should be fixed deliberately.

SEO condition status:

- Good baseline: titles, descriptions, canonicals, sitemap, robots, and main H1s are present after fixes.
- Needs work: localized duplicate-language risk, blog Article schema opportunity, placeholder links, and legacy unknown routes.

Dead code classification:

- No broad deletion was applied.
- Active Next app/code/content/assets are classified as KEEP or RISKY TO REMOVE.
- Archive folders and duplicate-looking chrome component are classified NEEDS CONFIRMATION.
- `.DS_Store` and generated `.next` are SAFE TO REMOVE.

Performance bottlenecks found:

- Legacy scripts/styles and static-era DOM initialization.
- Heavy `/location/` and `/sur-plan/` HTML/image payloads.
- Page-independent assets loaded across multiple pages.
- Remaining preloader/transition CSS/script initialization risk.

Fixes applied:

- Sitemap localized-route coverage.
- Blog H1.
- Homepage FAQ hydration/accessibility/server-rendering adjustment.

Fixes not applied and why:

- Broad link rewrites, archive deletion, legacy bundle removal, hreflang, guessed SVG sprite, and schema expansion were not applied because they carry product, migration, or truthfulness risk.

No dependencies added:

- Confirmed. `package.json` and `package-lock.json` have no diff from this pass.

No commit/push:

- Confirmed. No staging, commit, or push was performed.
