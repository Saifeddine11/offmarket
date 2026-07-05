# SEO cleanup readiness report

Date: 2026-07-04

## 1. Files Modified

- `content/pages/home-root.json`
- `content/pages/home-fr.json`
- `content/pages/home-en.json`
- `content/pages/home-it.json`
- `content/pages/home-nl.json`
- `content/pages/sur-plan.json`
- `content/pages/sur-plan-fr.json`
- `content/pages/off-plan-en.json`
- `content/pages/progetti-it.json`
- `content/pages/nieuwbouw-nl.json`
- `docs/seo-cleanup-readiness-report-2026-07-04.md`

## 2. Files Inspected But Not Modified

- `app/page.tsx`
- `app/en/page.tsx`
- `app/en/off-plan/page.tsx`
- `app/en/contact/page.tsx`
- `app/it/page.tsx`
- `app/it/progetti-su-piano/page.tsx`
- `app/it/contatto/page.tsx`
- `app/nl/page.tsx`
- `app/nl/nieuwbouw/page.tsx`
- `app/nl/contact/page.tsx`
- `app/blog/[slug]/page.tsx`
- `components/pages/PageContentShell.tsx`
- `components/business/BusinessRouteContent.tsx`
- `components/sections/ContactPageContent.tsx`
- `components/contact/ContactLeadQuestionnaire.tsx`
- `components/blog/BlogArticleContent.tsx`
- `lib/content/pages.ts`
- `lib/homepage/homepagePages.ts`
- `lib/contact/LocaleContactPage.tsx`
- `lib/blog/articles.ts`
- `lib/seo/blogMetadata.ts`

## 3. Remaining Empty Hrefs

The remaining empty hrefs are legacy script-owned controls, not clear navigation or SEO links.

| Source files | Remaining count | Classification | Reason left unchanged |
|---|---:|---|---|
| `content/pages/home-*.json` | 4 each | Legacy menu and favorite controls | These are migrated static controls used by legacy menu/favorite scripts. Converting to buttons safely requires checking the script selectors and visual behavior across desktop/mobile. |
| `content/pages/sur-plan.json`, `content/pages/sur-plan-fr.json`, `content/pages/off-plan-en.json`, `content/pages/progetti-it.json`, `content/pages/nieuwbouw-nl.json` | 7 each | Legacy menu, favorite, intro-next, and more-block controls | These are script/scroll controls. Replacing with routes would be incorrect, and button conversion needs a focused legacy interaction pass. |

Remaining groups:

| Group | Routes/files | Count per file |
|---|---|---:|
| `btn btn--text-small btn--link btn--icon-spacing-large btn-container is-hidden--sm-down` / `Menu` | Home-like and sur-plan-like JSON | 1 |
| `btn btn--text-small btn--link is-hidden--md-up` / aria-label `Menu` | Home-like and sur-plan-like JSON | 1 |
| `btn btn btn--text-small btn--link btn--square btn--sm` | Home-like and sur-plan-like JSON | 1 |
| `btn btn--sm btn--text-small` | Home-like and sur-plan-like JSON | 1 |
| `btn i-intro__next btn--outline btn--square btn--sm is-hidden--md-down` | Sur-plan-like JSON only | 1 |
| `btn i-intro__next btn--outline btn--square btn--sm is-hidden--lg-up` | Sur-plan-like JSON only | 1 |
| `btn more-block__button btn--outline btn--square btn--lg` | Sur-plan-like JSON only | 1 |

## 4. Empty Hrefs Fixed

Safe user-facing empty hrefs were replaced with real production routes.

| Pattern | Replacement |
|---|---|
| Desktop/mobile `Accueil` nav | Locale home route, for example `/en/`, `/it/`, `/nl/` |
| Desktop/mobile `Sur plan` nav | Locale off-plan route, for example `/en/off-plan/`, `/it/progetti-su-piano/`, `/nl/nieuwbouw/` |
| `Simulateur` nav | `/simulateur/` |
| `Contact` nav | Locale contact route where available |
| Header and menu `Demander l'accès` | `/off-market/` |
| `Biens privés` | `/off-market/` |
| `Nous contacter` | Locale contact route where available |
| Hero `Demander l'accès` | `/off-market/` |
| Hero `Voir la sélection` | `/nos-projets/` |
| `Découvrir notre approche` | `/about/` or `/fr/about/` where applicable |
| Modal `Rappel` | Locale contact route where available |
| Modal `Recevoir le dossier` | `/off-market/` |
| `politique de confidentialité` | `/privacy-policy/` |
| Placeholder phone icon link | Locale contact route where available |

Before and after source counts:

| File group | Before | After |
|---|---:|---:|
| Home-like JSON files | 29 each | 4 each |
| Sur-plan-like JSON files | 23 each | 7 each |

## 5. Multilingual Route Readiness

No localized route is ready for `hreflang` yet.

| Route | Classification | Reason |
|---|---|---|
| `/en/` | NEEDS_FULL_TRANSLATION | French title, description, H1, hero copy, section headings, CTAs, forms/private-access copy, and footer/nav labels. |
| `/en/off-plan/` | NEEDS_FULL_TRANSLATION | French metadata, H1, body copy, CTA labels, and legacy static content. |
| `/en/contact/` | NEEDS_FULL_TRANSLATION | Metadata canonical is localized, but visible React contact page copy and form labels are French. |
| `/it/` | NEEDS_FULL_TRANSLATION | French title, description, H1, hero copy, section headings, CTAs, forms/private-access copy, and footer/nav labels. |
| `/it/progetti-su-piano/` | NEEDS_FULL_TRANSLATION | French metadata, H1, body copy, CTA labels, and legacy static content. |
| `/it/contatto/` | NEEDS_FULL_TRANSLATION | Metadata canonical is localized, but visible React contact page copy and form labels are French. |
| `/nl/` | NEEDS_FULL_TRANSLATION | French title, description, H1, hero copy, section headings, CTAs, forms/private-access copy, and footer/nav labels. |
| `/nl/nieuwbouw/` | NEEDS_FULL_TRANSLATION | French metadata, H1, body copy, CTA labels, and legacy static content. |
| `/nl/contact/` | NEEDS_FULL_TRANSLATION | Metadata canonical is localized, but visible React contact page copy and form labels are French. |

## 6. Exact Translation Source Files

| Route | Source files/data |
|---|---|
| `/en/` | `content/pages/home-en.json`, `components/home/homeFaqContent.ts` if FAQ is later enabled on localized homepages, shared homepage legacy sections embedded in JSON |
| `/en/off-plan/` | `content/pages/off-plan-en.json` |
| `/en/contact/` | `content/pages/contact-en.json`, `components/sections/ContactPageContent.tsx`, `components/contact/ContactLeadQuestionnaire.tsx`, `components/forms/HomePrivateAccessSection.tsx`, `components/forms/PrivateAccessForm.tsx`, `components/layout/MavericksChrome.tsx`, `components/layout/SiteFooter.tsx` |
| `/it/` | `content/pages/home-it.json`, shared homepage legacy sections embedded in JSON |
| `/it/progetti-su-piano/` | `content/pages/progetti-it.json` |
| `/it/contatto/` | `content/pages/contact-it.json`, `components/sections/ContactPageContent.tsx`, `components/contact/ContactLeadQuestionnaire.tsx`, `components/forms/HomePrivateAccessSection.tsx`, `components/forms/PrivateAccessForm.tsx`, `components/layout/MavericksChrome.tsx`, `components/layout/SiteFooter.tsx` |
| `/nl/` | `content/pages/home-nl.json`, shared homepage legacy sections embedded in JSON |
| `/nl/nieuwbouw/` | `content/pages/nieuwbouw-nl.json` |
| `/nl/contact/` | `content/pages/contact-nl.json`, `components/sections/ContactPageContent.tsx`, `components/contact/ContactLeadQuestionnaire.tsx`, `components/forms/HomePrivateAccessSection.tsx`, `components/forms/PrivateAccessForm.tsx`, `components/layout/MavericksChrome.tsx`, `components/layout/SiteFooter.tsx` |

## 7. Hreflang Readiness Status

Status: NOT_READY.

Reasons:

- EN/IT/NL pages expose localized URLs but mostly French content.
- Adding `hreflang` now would create duplicate-language SEO signals.
- Shared React contact components need locale-aware copy before contact routes can be considered localized.
- Home/off-plan JSON files are split by locale name, but their content is still French and must be translated in place or regenerated from locale-specific source content.

Implementation order:

1. English content and metadata first.
2. Italian content and metadata second.
3. Dutch content and metadata third.
4. Run route-by-route metadata, visible text, schema, and console verification.
5. Add `hreflang` only after all three locales are complete and verified.

## 8. Blog Article Schema Readiness

Status: NOT_READY_FOR_ARTICLE_JSON_LD.

Current reliable fields:

- `title`
- `description`
- `canonical`
- `ogType: "article"`
- `ogTitle`
- `ogDescription`
- `ogImage` where present

Missing reliable fields:

- `datePublished`
- `dateModified`
- `authorName`
- `publisherName`
- `publisherLogo`

Safe minimal model:

```ts
type BlogArticleSeoData = {
  publishedAt: string;
  updatedAt?: string;
  authorName: string;
  publisherName: "OFF MARKET";
  publisherLogo: string;
};
```

Recommended place to add it:

- Add article SEO fields to each `content/pages/blog-*.json` file, or create a typed companion map in `lib/blog/articles.ts` keyed by `BlogArticleSlug`.
- Prefer the companion map if the migrated JSON should remain a faithful static-page artifact.
- Only generate Article JSON-LD in `app/blog/[slug]/page.tsx` or `BlogArticleContent` after every article has truthful, consistent data.

## 9. Performance Opportunities

No CSS or JS was removed in this pass.

| Opportunity | Route | Candidate | Risk | Required QA |
|---|---|---|---|---|
| Validate legal-page script needs | `/privacy-policy/` | `gsap.min.js`, `om-nav-scroll.js` | Low to medium | Header/menu behavior, scroll behavior, language dropdown, footer, desktop/mobile screenshots. |
| Split homepage legacy CSS by rendered sections | `/`, `/fr/`, `/en/`, `/it/`, `/nl/` | Broad homepage CSS bundle | High | Full visual regression by section, private-access form, project modal, FAQ, blog embed, mobile parity. |
| Normalize About script loading | `/about/`, `/fr/about/` | Extra animation scripts on `/fr/about/` | Medium | Compare reveal animations, testimonials, who-section, mobile reveal, console logs. |
| Audit sur-plan static controls | Sur-plan-like routes | Intro-next and more-block controls with empty hrefs | Medium | Click/keyboard behavior, scroll targets, visual state, mobile hidden/visible variants. |
| Scope contact private-access scripts | Contact routes | `om-private-access-form.js` and shared form code | Medium | Stepper flow, final private-access form submission state, validation, country/budget selects. |

## 10. Build Result

- TypeScript: passed with `./node_modules/.bin/tsc --noEmit`.
- Production build: passed with Node `v20.20.2`.
- Next.js version: `15.5.19`.
- Final `BUILD_ID`: `msycxxdekdM82hF7DWZpf`.
- `.next/BUILD_ID`: present.
- `node_modules/.cache`: not present.

## 11. Browser Verification Result

Production server/browser verification could not be completed in this pass because starting `next start` on localhost was blocked by the approval/usage gate after the build passed.

Blocked command:

```bash
/Users/namousssifeddine/.nvm/versions/node/v20.20.2/bin/npm run start -- --hostname 127.0.0.1 --port 3000
```

Static verification completed:

- Source empty-href counts were reduced and re-counted in the affected JSON files.
- TypeScript passed.
- Production build passed.
- Dependency list unchanged.

Production browser verification still needed:

- `/`
- `/sur-plan/`
- `/en/`
- `/it/`
- `/nl/`
- `/blog/`
- `/contact/`

Checks still needed once localhost server execution is available:

- HTTP status.
- Title/meta/canonical.
- One H1.
- Console errors.
- Hydration errors.
- Broken local images.
- Rendered remaining empty href count.

## 12. Remaining Risks

- Remaining empty hrefs are script-owned controls and still need a focused accessibility/legacy-script conversion pass.
- EN/IT/NL URLs are not ready for `hreflang`.
- Contact route copy is shared French React copy despite localized routes.
- Article JSON-LD should not be added until truthful date/author/publisher data exists.
- Performance cleanup still requires per-route visual QA.
- Production server/browser verification for this pass remains blocked by the local server approval/usage gate.

## 13. Recommended Next Pass

1. Run the blocked production server/browser verification when execution is available again.
2. Convert remaining menu/favorite/scroll empty-href controls to buttons only after checking legacy script selectors.
3. Translate English route content and metadata first.
4. Translate Italian route content and metadata second.
5. Translate Dutch route content and metadata third.
6. Add verified blog article SEO data.
7. Add Article JSON-LD after data verification.
8. Add `hreflang` only after all EN/IT/NL pages are fully localized and verified.
