# 07 — Content Map (Current Main Website)

Visible user-facing content from `index.html` and shared chrome. **At audit time** copy used **Springs** wording; post-rebrand it uses **OffMarket**.

---

## Meta / SEO

| Field | Content |
|-------|---------|
| Title | OffMarket \| Homepage (was: Springs \| Homepage) |
| Description | Wellness-residences |
| Canonical | https://offmarket.ma/ (was: springs.estate) |
| OG title | OffMarket \| Homepage |

---

## Hero (`l-gallery-sticky`)

| Element | Text |
|---------|------|
| Eyebrow | Exclusive residence with a rich wellness infrastructure next to Nature Park |
| H1 | Splendor of Renewal |
| CTA | Scroll arrow (no label) |

---

## Intro (`about` / `l-intro`)

| Element | Text |
|---------|------|
| H2 | Open the doors of OffMarket and step into your true self (was: Springs) |
| Body | (Supporting paragraphs in section — wellness, renewal themes) |

---

## Wellness (`wellness`)

| Element | Text |
|---------|------|
| Section label | Wellness |
| Body | OffMarket brings wellness… (was: Springs brings wellness…) |

---

## Nature / place

| Element | Text |
|---------|------|
| Themes | Nature’s embrace, leisure, climbing plants, flowerbeds, emerald lawns |
| Location | OffMarket is situated… (was: Springs is situated…) |

---

## Design (`design`)

| Element | Text |
|---------|------|
| Themes | WowHouse, Borges “Garden of Forking Paths”, designer hand on utility spaces |

---

## Residences (`residences`)

| Element | Text |
|---------|------|
| Themes | Apartment cards, pricing, typologies |
| Links | `/flats`, flat type filters |

---

## Header CTAs

| Control | Label |
|---------|-------|
| Menu (desktop) | Menu icon + “Menu” area |
| Residences | Residences (also Russian “резиденции” in preloader clone) |
| Callback | Request a call (EN) / Заказать звонок (RU modal) |
| Favorites | Heart icon |
| Flats link | `/flats` |

---

## Full menu (`#menu`)

| Link | Href |
|------|------|
| Residences | `/flats` |
| Design | `/design` |
| Location | `/location` |
| Amenities | `/infrastructure` |
| Gallery | `/gallery` |
| About | `/about` |

---

## Footer

| Element | Text |
|---------|------|
| Logo | OffMarket footer SVG (artwork may still show previous Springs wordmark) |
| Legal link | legal information → `/privacy-policy` |
| Credit | Site by Vide Infra |
| Disclaimer | Visual representations… illustration purposes only… |
| Copyright | © 2026. All rights reserved. |

---

## Modals

| Modal ID | Aria label |
|----------|------------|
| `#callback-modal` | Заказать звонок / Request a call |
| `#favorites-modal` | Request a call |
| `#menu` | Меню / Menu |
| `#menu-picker` | Меню (theme picker) |
| Subscribe variants | Заказать звонок |
| `#favourites-email-modal` | send via mail |

---

## Cookie consent

- `#cookie-consent` with description paragraph

---

## Subpages (titles only)

| Page | Title |
|------|-------|
| About | OffMarket \| About (was: Springs \| About) |
| Gallery | OffMarket \| Photos of the OffMarket residential complex |
| Location | OffMarket \| Location |
| Infrastructure | OffMarket \| Infrastructure and amenities |

---

## Language labels

- Primary content: **English**
- UI fragments: **Russian** (callback, menu aria, preloader residences)
- No FR/EN/IT/NL switcher on static site (unlike Mavericks React app)

---

## Spring / Spring 7 wording (audit baseline)

- **Previous template name:** **Springs** appeared throughout body copy and titles at audit time.
- **“Spring 7”** — **not present** in audited files.
- Logo SVG may visually imply a numeral in the wordmark (`logo-right` mark) — treat as design element, not “Spring 7” copy.

---

## Mavericks content (reference only — `mavericks/`)

Not on main site. Key FR strings live in `mavericks/src/i18n/locales/fr.json` (hero, menu, footer, off-market language). Documented here for future copy migration planning only.
