# OFF MARKET production stabilization report

Date: 2026-07-04

## Build runtime

- Shell default Node observed: `v25.2.1` (not used for production build).
- Production build Node used: `v20.20.2`.
- Project pin: `.nvmrc` = `20.20.2`, `package.json` engines = `>=20 <21`.
- Final build command: `/Users/namousssifeddine/.nvm/versions/node/v20.20.2/bin/node node_modules/next/dist/bin/next build`.
- Final `BUILD_ID`: `AKYsEW8ELJUdu-gB-8IfP`.

## Final route sweep

All requested routes returned HTTP 200. HTML routes had title, meta description, canonical, one H1, and no broken local `<img>` references in the final sweep.

Routes checked:

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

## Browser verification

- `/`: no current console warnings/errors; FAQ appears before blog; FAQ schema is present; all six accordion items open/close; no desktop or mobile horizontal overflow.
- `/about/`: no current console warnings/errors.
- `/quartiers/`: no current console warnings/errors after delaying route-local legacy scripts until post-hydration.
- `/blog/`: no current console warnings/errors.

## Link cleanup

Fixed clear user-facing navigation/CTA links in:

- `components/layout/MavericksChrome.tsx`
- `components/sections/FeaturedProjectsSection.tsx`
- `components/sections/SimulatorSection.tsx`
- `content/pages/location.json`

`/location/` no longer contains links to:

- `/gallery/`
- `/flats/`
- `/agreement/`
- `/infrastructure/`

Remaining legacy placeholders found by final sweep:

- One `href=""` remains on each homepage-like route: `/`, `/fr/`, `/en/`, `/it/`, `/nl/`.
- One `href=""` remains on each sur-plan-like route: `/sur-plan/`, `/fr/sur-plan/`, `/en/off-plan/`, `/it/progetti-su-piano/`, `/nl/nieuwbouw/`.
- No remaining non-production local page links were found in the requested route sweep.

These remaining empty hrefs are inside migrated legacy static markup and should be cleaned in a separate focused pass to avoid breaking script-owned controls.

## Missing sprite

`/assets/images/icons.svg?v=1765268659` is present and returned HTTP 200 in production. The restored sprite includes referenced symbols such as `menu`, `heart`, `menu-mobile`, arrows, `close`, `form-success`, and `form-error`.

## Blog schema decision

Article JSON-LD was not added in this pass. Blog article content currently has reliable title, description, canonical URL, and `ogType: article`, but no reliable `datePublished`, `dateModified`, author, or publisher fields in the article data.

## Multilingual SEO report

Do not add `hreflang` yet. EN/IT/NL pages are route-localized but still largely French in metadata and content.

Incomplete translation risk:

| Route | Issue |
|---|---|
| `/en/` | French title, description, H1, and body sample. |
| `/en/off-plan/` | French title, description, H1, and body sample. |
| `/en/contact/` | French title, description, H1, and form copy. |
| `/it/` | French title, description, H1, and body sample. |
| `/it/progetti-su-piano/` | French title, description, H1, and body sample. |
| `/it/contatto/` | French title, description, H1, and form copy. |
| `/nl/` | French title, description, H1, and body sample. |
| `/nl/nieuwbouw/` | French title, description, H1, and body sample. |
| `/nl/contact/` | French title, description, H1, and form copy. |

## Route asset map

Shared recommendation: do not remove legacy CSS/JS globally yet. The route bundles are still visually coupled to migrated static markup, and removal should happen only after per-route visual QA.

| Route/profile | CSS files | JS files | Recommendation |
|---|---|---|---|
| `/`, `/fr/`, `/en/`, `/it/`, `/nl/` | 26: `om-scroll-layout.css`, `global.css`, `offmarket-tokens.css`, `offmarket-overrides.css`, `offmarket-logo.css`, `mavericks-chrome.css`, `mav-hero.css`, `om-buttons.css`, `om-nav-menu.css`, `om-territories.css`, `om-footer.css`, `om-final-cta.css`, `om-testimonials.css`, `om-contact.css`, `mav-who.css`, `om-featured-projects.css`, `om-private-access-popup.css`, `om-text-reveal.css`, `om-cinematic-video.css`, `om-simulator.css`, `om-simulator-home.css`, `om-property-modal.css`, `om-blog.css`, `landing.css`, `om-mobile-desktop-parity.css`, `om-typography.css` | 8 Next chunks | Largest legacy surface. Candidate for future section-by-section pruning only after visual coverage. |
| `/about/` | 17: inner editorial CSS plus `mav-who.css`, `om-testimonials.css`, `om-text-reveal.css`, `about-who.css`, `about-verified.css`, `about-timeline.css` | 19: Next chunks plus `om-no-preloader.js`, `gsap.min.js`, `om-nav-menu.js`, `mavericks-chrome.js`, `om-language-switcher.js`, `om-inner-hero.js` | Keep. |
| `/fr/about/` | Same CSS as `/about/` | 23: `/about/` scripts plus `scrolltrigger.min.js`, `mav-who-reveal.js`, `om-testimonials.js`, `om-mobile-reveal.js` | Compare with `/about/` before removing extra animation scripts. |
| `/quartiers/` | 17: inner editorial CSS plus `om-territories.css`, `om-quartier-details.css`, `om-quartiers-motion.css`, `om-simulator.css`, `om-simulator-home.css`, `om-blog.css` | 13 Next chunks; legacy scripts are loaded post-hydration by `DeferredLegacyScripts` | Keep route-local delayed loading. Do not restore native defer scripts. |
| `/nos-projets/` | 16: inner editorial CSS plus `om-page-motion.css`, `om-featured-projects.css`, `om-private-access-popup.css`, `om-property-modal.css`, `om-nos-projets.css` | 21: Next chunks plus feature/modal/private-access legacy scripts | Keep until project modal and private access flows receive visual QA. |
| `/sur-plan/`, `/fr/sur-plan/`, `/en/off-plan/`, `/it/progetti-su-piano/`, `/nl/nieuwbouw/` | 12: `om-scroll-layout.css`, `global.css`, tokens/overrides/logo/chrome/nav/type/footer, `sur-plan.css`, `om-legacy-type.css`, `om-buttons.css` | 8 Next chunks | Keep. These routes still depend on static page CSS. |
| `/simulateur/` | 11: global/tokens/overrides/logo/chrome/nav/type/footer, `om-simulator.css`, `om-buttons.css` | 15: Next chunks plus `gsap.min.js`, nav/chrome/scroll/simulator/language scripts | Keep. |
| `/contact/`, `/fr/contact/`, `/en/contact/`, `/it/contatto/`, `/nl/contact/` | 12: tokens/overrides/logo/chrome/nav/type/buttons/footer/page-motion/contact/contact-page | 17: Next chunks plus nav/chrome/language/private-access form scripts | Keep. |
| `/blog/` | 6: `om-scroll-layout.css`, `offmarket-tokens.css`, `om-typography.css`, `om-buttons.css`, `om-footer.css`, `om-blog.css` | 8 Next chunks | Lean bundle; no removal recommended. |
| Blog article routes | 5: `om-scroll-layout.css`, `offmarket-tokens.css`, `om-typography.css`, `om-footer.css`, `om-blog.css` | 8 Next chunks | Lean bundle; no removal recommended. |
| `/off-market/` | 4: `om-scroll-layout.css`, `offmarket-tokens.css`, `om-typography.css`, `om-contact.css` | 10: Next chunks plus private-access form script | Keep. |
| `/location/` | 12: global/tokens/overrides/logo/chrome/nav/type, `location.css`, `om-legacy-type.css`, `tour.css`, `om-buttons.css` | 8 Next chunks | Keep. `location.css` and `tour.css` look route-specific; do not remove without screenshot QA. |
| `/privacy-policy/` | 11: global/tokens/overrides/logo/chrome/nav/type/legal/footer/buttons | 14: Next chunks plus `gsap.min.js`, nav/chrome/scroll/language scripts | Potential future cleanup: validate whether GSAP/nav-scroll are needed on this static legal page. |

## Remaining risks

- Default shell Node is still `v25.2.1`; contributors must use `.nvmrc`/Node 20 for build parity.
- Localized EN/IT/NL content is not production-quality multilingual SEO yet.
- Legacy empty hrefs remain in migrated static markup.
- Legacy CSS/JS remains intentionally broad on homepage-like pages.
- Article schema should wait for reliable article dates and author/publisher data.
