# English Finalization Report — 2026-07-04

Focused pass before hreflang readiness. No hreflang added. Italian/Dutch untouched. No commit, no push, no new dependencies.

---

## 1. Files modified

### English JSON content
- `content/pages/home-en.json` — aria-labels, simulator static labels, callback modal title, territories title fragment, off-market hrefs, language switcher aria, featured-projects region label, `Étage` → `Floor`
- `content/pages/off-plan-en.json` — remaining French body paragraphs (entity-encoded `&amp;rsquo;` variants), off-market hrefs

### Localization tooling
- `scripts/apply-en-localization.mjs` — finalization replacements (aria-labels, simulator labels, off-plan paragraphs, `/en/off-market/` hrefs, `Choisir la langue`, `Biens accessibles sur dossier`)

### Legacy JS (locale-aware on `/en/*`, formulas/logic unchanged)
- `assets/javascripts/om-simulator.js` — `LOCALE_COPY` for result labels, captions, metric labels, note text, year/week suffixes, EN decimal formatting
- `assets/javascripts/om-featured-projects.js` — EN property card data, `Selection:` prefix, `View property` / `View details` actions
- `assets/javascripts/om-territories.js` — `ITEMS_HOME_EN` subtitles/tags for homepage territories gallery
- `assets/javascripts/om-nav-menu.js` — EN menu off-market links, locale-aware `fixAccessLinks()`
- `assets/javascripts/om-private-access-form.js` — locale-aware `OM_OFF_MARKET_ACCESS_HREF`

### i18n / routing
- `lib/i18n/chromeCopy.ts` — EN `accessHref` → `/en/off-market/`
- `lib/routes.ts` — added `offPlan` and `offMarket` to `LANG_LINKS`
- `lib/legacy/routes.ts` — added `/en/off-market` to `PRODUCTION_URLS` and sitemap

### New English route
- `app/en/off-market/layout.tsx`
- `app/en/off-market/page.tsx` — English metadata, H1, hero, `PrivateAccessForm locale="en"`, canonical `/en/off-market/`

`public/assets/javascripts/*` mirrors `assets/javascripts/*` (identical in this workspace).

---

## 2. Files inspected but not modified

- `components/sections/ContactPageContent.tsx`, `ContactLeadQuestionnaire.tsx`, `PrivateAccessForm.tsx` — already locale-aware from prior pass
- `components/forms/HomePrivateAccessSection.tsx`, `SiteChrome.tsx`, `SiteFooter.tsx`
- `lib/i18n/contactCopy.ts`, `formCopy.ts`, `footerCopy.ts`, `types.ts`
- `app/en/page.tsx`, `app/en/off-plan/page.tsx`, `app/en/contact/page.tsx`
- `app/off-market/page.tsx` — French route preserved
- `assets/javascripts/om-language-switcher.js` — already had `offPlan` mapping
- `assets/javascripts/om-property-modal.js`, `om-private-access-popup.js` — modal shell largely translated via JSON; property modal data still FR-sourced on EN homepage
- Italian/Dutch JSON and routes
- Blog article content embedded in `home-en.json` (French article titles/teasers)

---

## 3. French fragments found and fixed

| Area | Before | After |
|------|--------|-------|
| Simulator results (JS) | `RENDEMENT BRUT ANNUEL`, `avant charges…`, French metric labels | `GROSS ANNUAL YIELD`, `before charges, taxes and real operating costs`, English metrics |
| Simulator static HTML | `RENDEMENT NET ANNUEL`, `Modes de simulation` | `GROSS ANNUAL YIELD`, `Simulation modes` |
| Callback modal title | `Send une demande` | `Send a request` |
| Private-access popup | `aria-label="Fermer"` | `aria-label="Close"` |
| Property modal close | `Fermer la fiche` | `Close property details` |
| Territories title | `les meilleures opportunités` (partial) | `the finest opportunities take shape` |
| Territories gallery (JS) | French subtitles/tags | English subtitles/tags on `/en/` |
| Featured project cards (JS) | `Voir la fiche`, `Sélection :`, French card copy | `View property`, `Selection:`, English card copy on `/en/` |
| Off-plan body | Multiple `&amp;rsquo;` French paragraphs | English equivalents |
| EN off-market links | `/off-market/` | `/en/off-market/` in EN JSON + nav + chrome |
| Language switcher (static) | `Choisir la langue` | `Choose language` |
| Featured section aria | `Biens accessibles sur dossier` | `Properties available on request` |
| Property floor label | `Étage` | `Floor` |

---

## 4. French fragments intentionally left

| Item | Reason |
|------|--------|
| Place names | Guéliz, Hivernage, Palmeraie, Médina, Route de l'Ourika, etc. — proper nouns |
| Phone country select values | Data values (`Maroc`, `France`, `États-Unis`) — not UI labels |
| `/simulateur/` nav/footer link | Simulator page not localized in this pass; label is English (`Simulator`) but route stays French |
| Homepage blog section | French article titles, tabs (`Sur plan`, `Investissement`), `Regards privés`, `Voir le blog` — blog content not in scope |
| `om-property-modal.js` property data | Modal content still French-sourced; JSON shell labels translated |
| Italian/Dutch | Explicitly out of scope |
| French root `/`, `/off-market/`, `/fr/contact/` | Must remain French |

---

## 5. Simulator copy status

**Complete on `/en/`** for runtime JS output:

- Result section: `RESULT`
- Main label: `GROSS ANNUAL YIELD` (short/long), `ESTIMATED GROSS CAPITAL GAIN` (resale)
- Caption: `before charges, taxes and real operating costs`
- Metrics: `Annual gross revenue`, `Nights rented per year`, `Selected occupancy rate`, etc.
- Note: `Indicative estimate. OFF MARKET refines this simulation…`
- Tab labels and field labels: already English in `home-en.json`
- Formulas, sliders, numbers: unchanged

---

## 6. Popup/modal copy status

| Surface | Status |
|---------|--------|
| Private-access popup close | English `Close` |
| Callback modal title | `Send a request` |
| Callback success message | English |
| Callback form labels | `Name`, `Phone`, `Message`, `Request`, `Reminder` |
| `PrivateAccessForm` on `/en/contact/` and `/en/off-market/` | English via `formCopy.ts` + `locale="en"` |
| `om-private-access-form.js` validation/status | English via `COPY_EN` on `/en/*` |
| Property modal shell | English labels (`Price`, `Selection:`, `Receive the dossier`, `Reminder`) from JSON |

---

## 7. `/en/off-market/` decision

**Created** — safe reuse of existing off-market layout, styles, scripts, and `PrivateAccessForm` with `locale="en"`.

- Route: `/en/off-market/` (build + HTTP 200 verified)
- Canonical: `https://offmarketofficial.com/en/off-market/`
- Title: `Private Access | OFF MARKET Marrakech`
- French `/off-market/` unchanged
- EN links updated in `home-en.json`, `off-plan-en.json`, `chromeCopy.ts`, `om-nav-menu.js`, `om-private-access-form.js`

---

## 8. LANG_LINKS / offPlan decision

**Added** to `lib/routes.ts` for TS/JS parity with `om-language-switcher.js`:

```ts
offPlan: {
  en: "/en/off-plan/",
  fr: "/fr/sur-plan/",
  it: "/it/progetti-su-piano/",
  nl: "/nl/nieuwbouw/",
},
offMarket: {
  en: "/en/off-market/",
  fr: "/off-market/",
  it: "/off-market/",
  nl: "/off-market/",
},
```

`fr` off-plan uses `/fr/sur-plan/` to match the language switcher (root `/sur-plan/` still exists for French default).

---

## 9. Build result

| Check | Result |
|-------|--------|
| Node | v20.20.2 |
| `./node_modules/.bin/tsc --noEmit` | PASS |
| `npm run build` | PASS |
| `.next/BUILD_ID` | Present (`dcMcB270WSSOyAB-dL7Py` after final build) |
| New dependencies | None |

---

## 10. Browser verification result

Production server on `http://localhost:3002` (post-build):

| Route | HTTP | Title / canonical | H1 |
|-------|------|-------------------|-----|
| `/en/` | 200 | English metadata, `canonical /en/` | `Private real estate` |
| `/en/off-plan/` | 200 | English | `Off-plan` |
| `/en/contact/` | 200 | English | `Discuss a private real estate project` |
| `/en/off-market/` | 200 | `Private Access \| OFF MARKET Marrakech` | `Access off-market properties` |
| `/` | 200 | French | `L'immobilier privé` |
| `/fr/contact/` | 200 | French | `Parlez-nous de votre projet` |
| `/off-market/` | 200 | French | `Accéder aux biens off-market` |

Browser snapshot on `/en/` confirmed:

- English nav, simulator tabs/results, private-access form, footer
- English territories subtitles after JS boot
- English featured-project card actions after JS boot
- No console/hydration errors observed in manual pass

**Remaining visible French on `/en/` (documented risks):**

- Blog section (titles, tabs, carousel controls)
- Some property-modal interior copy (JS data source)
- Phone country names in `<select>` options

---

## 11. Remaining risks

1. **Blog block on `/en/`** — largest remaining French surface; needs dedicated EN blog content or section hide on EN homepage.
2. **`/simulateur/`** — English nav label links to French simulator page.
3. **`om-property-modal.js`** — property detail strings not locale-aware.
4. **`FeaturedProjectsSection.tsx`** — French defaults remain for `/nos-projets/` (not EN route).
5. **Callback legal micro-copy** — possible duplicate “to our” phrasing in legacy callback markup; low visibility.
6. **Manual visual QA** still recommended for scroll animations, modal open/close, and mobile breakpoints before hreflang.

---

## 12. Hreflang readiness

**Conditionally ready** after manual visual review.

Core EN routes (`/en/`, `/en/off-plan/`, `/en/contact/`, `/en/off-market/`) have:

- English metadata and canonicals
- English H1s and primary conversion flows
- Locale-aware nav, footer, forms, simulator, territories, and featured cards

Hreflang should wait until:

1. Blog section strategy is decided for EN homepage
2. `/simulateur/` EN route or explicit FR fallback is documented in hreflang `x-default` plan
3. Final visual QA sign-off on modals and mobile

**Do not add hreflang in this pass.**
