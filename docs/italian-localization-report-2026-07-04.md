# Italian Localization Report — 2026-07-04

Italian SEO localization pass only. No hreflang. Dutch untouched. No commit, no push, no new dependencies.

---

## 1. Files modified

### i18n layer
- `lib/i18n/contactCopy.ts` — full `IT` contact questionnaire copy
- `lib/i18n/formCopy.ts` — Italian private-access form labels
- `lib/i18n/chromeCopy.ts` — Italian nav, access CTA, Italian routes
- `lib/i18n/footerCopy.ts` — Italian footer labels and hrefs

### Italian content JSON
- `content/pages/home-it.json` — metadata, body HTML, internal links
- `content/pages/progetti-it.json` — metadata, body HTML, internal links
- `content/pages/contact-it.json` — Italian metadata

### Localization tooling
- `scripts/apply-it-localization.mjs` — 199 FR→IT pairs + finalization pass, href rewrites, metadata

### Legacy JS (locale-aware on `/it/*`)
- `assets/javascripts/om-nav-menu.js` — `MENU_IT`, Italian UI labels, `/it/off-market/` access links
- `assets/javascripts/om-private-access-form.js` — `COPY_IT`, locale detection, `OM_OFF_MARKET_ACCESS_HREF`
- `assets/javascripts/om-simulator.js` — `LOCALE_COPY.it` (results, metrics, note text)
- `assets/javascripts/om-featured-projects.js` — `propertyCardsIt`, Italian UI prefix
- `assets/javascripts/om-territories.js` — `ITEMS_HOME_IT` subtitles/tags

### Routing
- `lib/routes.ts` — `LANG_LINKS.offMarket.it` → `/it/off-market/`
- `lib/legacy/routes.ts` — `/it/off-market` in `PRODUCTION_URLS` and sitemap

### New route
- `app/it/off-market/layout.tsx`
- `app/it/off-market/page.tsx` — Italian metadata, H1, `PrivateAccessForm locale="it"`

---

## 2. Files inspected but not modified

- `app/it/page.tsx`, `app/it/progetti-su-piano/page.tsx`, `app/it/contatto/page.tsx` — already wired to IT content
- `lib/contact/LocaleContactPage.tsx` — already passes `locale="it"` for `/it/contatto/`
- `components/forms/PrivateAccessForm.tsx`, `ContactPageContent.tsx`, `ContactLeadQuestionnaire.tsx` — locale via i18n dictionaries
- English and French JSON/routes — preserved
- Dutch (`nl`) — still French fallback in i18n
- `assets/javascripts/om-language-switcher.js` — already had Italian off-plan/contact routes
- `assets/javascripts/om-property-modal.js` — property detail data not locale-aware
- Homepage blog section content — French article titles (same as EN pass)

---

## 3. Italian routes translated

| Route | Status |
|-------|--------|
| `/it/` | Italian metadata + `home-it.json` body |
| `/it/progetti-su-piano/` | Italian metadata + `progetti-it.json` body |
| `/it/contatto/` | Italian metadata + React contact flow via `contactCopy` / `formCopy` |
| `/it/off-market/` | **Created** — Italian metadata, hero, form |

---

## 4. Italian metadata applied

| Route | Title |
|-------|-------|
| `/it/` | OFF MARKET Marrakech \| Immobili di lusso riservati |
| `/it/progetti-su-piano/` | Immobili su piano a Marrakech \| OFF MARKET |
| `/it/contatto/` | Contattare OFF MARKET Marrakech \| Accesso immobiliare privato |
| `/it/off-market/` | Accesso privato \| OFF MARKET Marrakech |

Each route: Italian description, self-referencing canonical (`https://offmarket.ma/it/...`), `htmlLang: it`, `ogLocale: it_IT`.

---

## 5. Components made locale-aware or extended

| Component / module | Change |
|--------------------|--------|
| `getContactCopy('it')` | Full Italian questionnaire (Fase 1–3, Avanti/Indietro) |
| `getFormCopy('it')` | Italian form labels, submit, privacy |
| `getChromeCopy('it')` | Italian nav placeholders, Richiedi accesso, `/it/*` hrefs |
| `getFooterCopy('it')` | Italian footer + localized routes |
| `PrivateAccessForm` | `locale="it"` on `/it/off-market/` and contact step 4 |
| `MavericksChrome` / `SiteFooter` | Consume Italian copy when `locale="it"` |

---

## 6. Legacy JS made locale-aware

| Script | Italian output on `/it/*` |
|--------|---------------------------|
| `om-nav-menu.js` | `MENU_IT`, Apri menu / Mostra, `/it/off-market/` links |
| `om-private-access-form.js` | Italian validation/success/mail subject |
| `om-simulator.js` | RISULTATO, RENDIMENTO LORDO ANNUO, Italian metrics |
| `om-featured-projects.js` | Italian property cards, Selezione:, Vedi scheda |
| `om-territories.js` | Italian gallery subtitles/tags |

French (`/`, `/fr/*`) and English (`/en/*`) behavior unchanged.

---

## 7. Internal links changed

On `/it/` and `/it/progetti-su-piano/` (via `apply-it-localization.mjs`):

| From | To |
|------|-----|
| `/contact/` | `/it/contatto/` |
| `/sur-plan/` | `/it/progetti-su-piano/` |
| `/off-market/` | `/it/off-market/` |
| `/about/`, `/nos-projets/` | `/it/` |
| Logo home href | `/it/` |

Simulator nav/footer still link to `/simulateur/` (no Italian simulator page — label localized, route French).

---

## 8. Remaining French/English on Italian routes

| Item | Location | Notes |
|------|----------|-------|
| Blog section | `/it/` homepage | French article titles/tabs (out of scope) |
| Phone country names | Form `<select>` | Data values (Maroc, France, etc.) |
| `om-property-modal.js` | Property modal body | JS data source still French |
| `/simulateur/` | Nav/footer link | Italian label, French page |
| Place names | Throughout | Guéliz, Médina, Hivernage, etc. — intentional |

No visible English marketing copy on primary Italian conversion paths after JS boot.

---

## 9. `/it/off-market/` decision

**Created** — same pattern as `/en/off-market/`:

- Reuses off-market layout, styles, `PrivateAccessForm` with `locale="it"`
- Canonical: `https://offmarket.ma/it/off-market/`
- Italian links in `home-it.json`, `progetti-it.json`, `chromeCopy.ts`, `om-nav-menu.js`
- French `/off-market/` and English `/en/off-market/` unchanged

---

## 10. Build result

| Check | Result |
|-------|--------|
| `./node_modules/.bin/tsc --noEmit` | PASS |
| `npm run build` | PASS |
| `.next/BUILD_ID` | Present (`jQ3NdbqE6d8jHdk0j0JEa`) |
| New dependencies | None |

---

## 11. Browser verification

Production server `http://localhost:3003` (post-build):

| Route | HTTP | H1 (sample) |
|-------|------|-------------|
| `/it/` | 200 | L'immobiliare privato |
| `/it/progetti-su-piano/` | 200 | Su piano |
| `/it/contatto/` | 200 | Parliamo del tuo progetto immobiliare privato |
| `/it/off-market/` | 200 | Accedi alle proprietà off-market |
| `/en/` | 200 | Private real estate (English preserved) |
| `/en/off-market/` | 200 | Access off-market properties |
| `/` | 200 | L'immobilier privé (French preserved) |
| `/fr/contact/` | 200 | Parlez-nous de votre projet |

Canonical and title tags verified for all Italian routes.

---

## 12. Remaining risks

1. **Blog block** on `/it/` — largest residual French surface; needs dedicated IT blog content or section strategy.
2. **Property modal** (`om-property-modal.js`) — interior copy not locale-aware.
3. **`/simulateur/`** — Italian label links to French simulator page.
4. **Manual visual QA** — modal open/close, scroll animations, mobile breakpoints, long Italian strings in CTAs.
5. **Re-run `apply-it-localization.mjs`** after editing `home-fr.json` / `sur-plan-fr.json` sources (script can reset IT pages from French if markers detected).

---

## 13. Hreflang readiness

**Conditionally ready** for manual hreflang review after visual QA.

Core Italian routes have Italian metadata, canonicals, H1s, locale-aware nav/footer/forms, simulator, territories, and featured cards.

Defer hreflang until blog/simulator strategy is documented and visual sign-off is complete.

**Do not add hreflang in this pass.**
