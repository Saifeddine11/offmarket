# 06 — Sales Strategy (Current Main Website)

Audit of how the Springs site converts visitors. **No copy changes** — observation only.

---

## What the hero sells

**Headline:** “Splendor of Renewal”  
**Sub-eyebrow:** “Exclusive residence with a rich wellness infrastructure next to Nature Park”

**Value proposition in first screen:**

- Ultra-exclusive residential product (not mass market)
- Wellness infrastructure integrated into home life
- Proximity to nature / park setting
- Emotional renewal / transformation narrative

**Hero mechanics:** Auto-advancing horizontal image gallery (not a single static render) — implies scale, variety, and cinematic quality.

---

## Section persuasion sequence

| Order | Section | Persuasion goal |
|-------|---------|-----------------|
| 1 | Hero gallery | Desire + prestige |
| 2 | Intro (`about`) | Identity — “Open the doors of Springs and step into your true self” |
| 3 | Wellness | Rationalize premium via spa/wellness center |
| 4 | Nature / place | Location quality, ecology, leisure |
| 5 | Map | Connectivity, convenience, business access |
| 6 | Design | Credibility via WowHouse / design bureau |
| 7 | Residences | Product catalog, typologies, price anchors |
| 8 | Interiors | Finish quality, lifestyle visualization |
| 9 | Footer | Trust, legal, brand reinforcement |

Each section uses **scroll commitment** (pinned sticky layers) to increase time-on-page and narrative immersion.

---

## CTAs (calls to action)

| CTA | Location | Intent |
|-----|----------|--------|
| Scroll down (arrow) | Hero | Engagement / continue story |
| “Residences” / `/flats` | Header, menu | Primary conversion path — browse units |
| Callback modal | Header “Request a call” (RU/EN variants) | Lead capture |
| Application form | `#callback-modal` tab | Qualified lead |
| Favorites | Heart icon + modal | Consideration / return visit |
| Subscribe modals | Penthouse/townhouse variants | Interest registration |
| Cookie consent | Bottom | Compliance |

**Primary commercial path:** Explore residences → select unit → form/favorite.

---

## Trust elements

- WowHouse design attribution
- Vide Infra “Site by” (craft credibility)
- Detailed legal disclaimer in footer
- Privacy policy / agreement links
- Professional photography + WebGL scenes
- Price display on residence cards (transparency signal)
- “Western District” prestige framing

---

## Buyer / investor psychology targeted

| Motivation | How site addresses it |
|------------|----------------------|
| Status | Exclusive language, designer branding |
| Wellness lifestyle | Dedicated wellness section + WebGL |
| Nature escape | Parks, greenery, quiet |
| Practical access | Map, highways, business hubs |
| Investment tangibility | Flat cards with pricing |
| Emotional belonging | “True self”, renewal, splendor |

---

## Luxury positioning tactics

- Slow scroll, no aggressive popups on load (post-preloader)
- Thin typography, large display type (`h0`)
- Outline buttons vs loud solid fills
- Full-screen menu with art-directed preview images
- Minimal visible UI chrome during scroll story

---

## Lead generation strategy

1. **Soft capture:** Favorites list (email modal)
2. **Hard capture:** Callback + application forms (requires backend API + reCAPTCHA)
3. **Navigation capture:** Push to `/flats` catalog
4. **Subscribe flows:** Property-type-specific modals

**Gap:** Static deployment cannot submit forms (`DEPLOYMENT.md` notes API dependency).

---

## Comparison to Mavericks sales logic (future direction)

| Springs (current) | Mavericks (target product) |
|-------------------|---------------------------|
| Open catalog `/flats` | Private / off-market selection |
| Wellness + nature | Marrakech villas, riads, sur plan |
| English mass-luxury | FR-first, confidential tone |
| Public residence listing | Qualification CTAs (“Parler de mon projet”) |

When rebranding colors only, **preserve Springs sales flow** until a dedicated copy/IA migration phase.

---

## What could be improved later (not in scope now)

- Align language (EN body vs RU modals)
- Replace Springs narrative with OffMarket Marrakech positioning
- Reduce backend dependency for lead forms
- Sharpen single primary CTA (currently multiple parallel paths)
- Add social proof appropriate to private real estate (without catalogue tone)
