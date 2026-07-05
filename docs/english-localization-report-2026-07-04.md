# English Localization Report — 2026-07-04

## 1. Files modified

### i18n layer (new)
- `lib/i18n/types.ts`
- `lib/i18n/contactCopy.ts`
- `lib/i18n/chromeCopy.ts`
- `lib/i18n/footerCopy.ts`
- `lib/i18n/formCopy.ts`

### Locale-aware React components
- `components/sections/ContactPageContent.tsx`
- `components/contact/ContactLeadQuestionnaire.tsx`
- `components/forms/HomePrivateAccessSection.tsx`
- `components/forms/PrivateAccessForm.tsx`
- `components/layout/MavericksChrome.tsx`
- `components/layout/SiteFooter.tsx`
- `lib/contact/LocaleContactPage.tsx`

### English content
- `content/pages/home-en.json`
- `content/pages/off-plan-en.json`
- `content/pages/contact-en.json`

### Legacy JS (locale detection, no removal)
- `assets/javascripts/om-nav-menu.js`
- `assets/javascripts/om-private-access-form.js`

### Tooling
- `scripts/apply-en-localization.mjs`

## 2. Files inspected but not modified

- `app/en/page.tsx`, `app/en/off-plan/page.tsx`, `app/en/contact/page.tsx` — already wired to EN content
- `app/contact/page.tsx`, `app/fr/contact/page.tsx` — French defaults preserved
- `lib/routes.ts`, `lib/seo/metadata.ts`, `middleware.ts`
- `content/pages/home-fr.json`, `sur-plan-fr.json`, `contact-fr.json`
- `app/off-market/page.tsx` — still uses French-default `PrivateAccessForm`
- Italian / Dutch JSON pages — unchanged (still French copy)

## 3. English routes translated

| Route | Status |
|-------|--------|
| `/en/` | Metadata + visible homepage JSON body translated |
| `/en/off-plan/` | Metadata + visible off-plan JSON body translated |
| `/en/contact/` | Metadata + React contact flow fully English |

## 4. English metadata applied

| Route | Title |
|-------|-------|
| `/en/` | OFF MARKET Marrakech \| Private Luxury Real Estate |
| `/en/off-plan/` | Off-Plan Properties in Marrakech \| OFF MARKET |
| `/en/contact/` | Contact OFF MARKET Marrakech \| Private Real Estate Access |

Each route has English meta description, self-referencing canonical (`https://offmarket.ma/en/...`), `htmlLang: en`, `ogLocale: en_US`.

## 5. Components made locale-aware

| Component | Mechanism |
|-----------|-----------|
| `ContactPageContent` | `locale` prop → `getContactCopy()` |
| `ContactLeadQuestionnaire` | `locale` prop → questionnaire + step labels |
| `HomePrivateAccessSection` | `locale` prop → header copy |
| `PrivateAccessForm` | `locale` prop + `data-form-locale` for legacy JS |
| `MavericksChrome` | `locale` prop / `activeLang` → nav labels, hrefs, CTA |
| `SiteFooter` | `locale` prop → labels, hrefs, legal copy |
| `LocaleContactPage` | passes `locale: "en"` for `/en/contact/` |

French routes default to `locale: "fr"`. Italian and Dutch fall back to French copy (no breakage).

## 6. Internal links changed

### `/en/` and `/en/off-plan/` JSON bodies
- `/contact/` → `/en/contact/`
- `/sur-plan/` → `/en/off-plan/`
- `/about/`, `/nos-projets/` → `/en/` (no dedicated EN pages)
- Logo/home links in EN chrome → `/en/`

### `om-nav-menu.js` EN menu
- Home → `/en/`
- Off-plan → `/en/off-plan/`
- Contact → `/en/contact/`
- Neighbourhoods / Projects / Our story → `/en/` (safe fallback)
- OFF MARKET access → `/off-market/` (existing production route)

### React chrome/footer on `/en/contact/`
- Footer: Home `/en/`, Off-plan `/en/off-plan/`, Contact `/en/contact/`
- Simulator → `/simulateur/` (no EN route exists)

## 7. Remaining French text on English routes

| Area | Notes |
|------|-------|
| Country names in phone select | Legacy JS keeps local country names (Maroc, France…) — functional, not user-facing labels |
| Blog card titles / some territory names | Proper nouns (Guéliz, Palmeraie, Agdal) — intentionally kept |
| Simulator section labels | Partially translated; some legacy simulator strings may remain in embedded JSON |
| `/off-market/` CTA target | No `/en/off-market/` route — links to existing `/off-market/` |
| Popup / callback modal copy in homepage JSON | Some modal strings may still be French in rarely-opened legacy overlays |
| Budget select values | Euro ranges kept; format unchanged |

**Manual review recommended** for simulator micro-copy and legacy modal overlays before hreflang.

## 8. Build result

```
Node: v20.20.2
./node_modules/.bin/tsc --noEmit  → PASS
npm run build                     → PASS
.next/BUILD_ID                    → exists (IJR0HzSGBKplUMNvfV-Bn)
```

No dependencies added.

## 9. Browser verification result

Verified on `http://localhost:3001` (fresh production build):

| Route | HTTP | Title | Visible copy |
|-------|------|-------|--------------|
| `/en/` | 200 | English | Private real estate, Request access, Receive the off-market |
| `/en/off-plan/` | 200 | English | Off-plan headings translated |
| `/en/contact/` | 200 | English | H1 “Discuss a private real estate project”, EN questionnaire, EN nav/footer |
| `/fr/contact/` | 200 | French | “Parlez-nous”, “Accueil”, “Étape” preserved |
| `/` | 200 | French | Root homepage unchanged |

No console or hydration errors observed on `/en/contact/` during browser snapshot.

## 10. Remaining risks

1. **Partial JSON translation** — `scripts/apply-en-localization.mjs` uses phrase replacement; uncommon French strings in deep legacy HTML may survive.
2. **No `/en/off-market/`** — EN pages link to French-route `/off-market/` by design.
3. **Simulator / popup modals** — not fully audited phrase-by-phrase.
4. **Italian / Dutch** — still classified `NEEDS_FULL_TRANSLATION`; fall back to French in shared components.
5. **hreflang not added** — intentional per scope.

## 11. Recommended next pass

1. Manual copy review of `/en/` simulator section and legacy popup modals.
2. Add `/en/off-market/` or document permanent fallback strategy.
3. Italian (`/it/`) and Dutch (`/nl/`) full translation pass using the same i18n dictionaries.
4. Add `hreflang` once EN copy is signed off.
5. Blog Article JSON-LD when truthful dates/author/publisher fields are available.
6. Extend `LANG_LINKS` in `lib/routes.ts` with `offPlan` entry for TS/JS parity.

---

## Hreflang readiness

**English is ready for manual review, not yet ready for automatic hreflang publication.**

Core user-facing routes (`/en/`, `/en/off-plan/`, `/en/contact/`) have English metadata, H1s, navigation, footer, and contact flow. Remaining French fragments in legacy overlays, simulator micro-copy, and the `/off-market/` fallback should be reviewed before adding `hreflang` tags.
