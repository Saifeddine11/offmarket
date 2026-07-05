# OffMarket Brand Audit — Documentation Index

**Created:** June 2026  
**Purpose:** Baseline audit of the current main OffMarket website before applying the Mavericks color system.  
**Status:** Baseline audit (June 2026). Subsequent steps applied Mavericks colors and **OffMarket** brand naming to the main static site. Historical references to the previous template name (**Springs**) are preserved in audit notes where relevant.

---

## Repository layout (two distinct sites)

| Site | Path | Role in this audit |
|------|------|-------------------|
| **Main website (current)** | `/offmarket-website/` (repo root) | Audited as the site to rebrand |
| **Mavericks (color source)** | `/offmarket-website/mavericks/` | Audited as palette / visual reference only |

---

## Files in this folder

| File | Contents |
|------|----------|
| [01-site-overview.md](./01-site-overview.md) | What the site is, positioning, pages, visual direction |
| [02-brand-identity.md](./02-brand-identity.md) | Brand name, Spring/Springs identity, typography, mood, strengths/weaknesses |
| [03-color-system-current.md](./03-color-system-current.md) | Full extraction of current site colors and where they are used |
| [04-mavericks-color-source.md](./04-mavericks-color-source.md) | Mavericks palette, tokens, backgrounds, overlays (source of truth for future migration) |
| [05-color-migration-plan.md](./05-color-migration-plan.md) | Mapping table: current → Mavericks, risks, affected files |
| [06-sales-strategy.md](./06-sales-strategy.md) | Sales logic, CTAs, trust, lead generation audit |
| [07-content-map.md](./07-content-map.md) | Visible copy, menu labels, section titles, footer |
| [08-logo-assets-imagery.md](./08-logo-assets-imagery.md) | Logos, favicons, image folders, Springs-specific assets |
| [09-animation-system.md](./09-animation-system.md) | Scroll, preloader, menu, WebGL — what must not break |
| [10-technical-structure.md](./10-technical-structure.md) | Framework, folders, CSS/JS architecture, centralization targets |

---

## How to use this audit

1. Read **01** and **02** for brand context.
2. Use **03** as the current-state color reference.
3. Use **04** as the target palette reference.
4. Use **05** when implementing the color migration (completed after audit).
5. Use **06–09** to avoid breaking sales flow, copy, assets, or motion.
6. Use **10** for file-level implementation planning.

---

## Important notes

- **At audit time**, the main website presented as **Springs Estate** (`springs.estate`). It has since been renamed to **OffMarket** in copy and metadata (`offmarket.ma` canonical URLs).
- **“Spring 7”** was not found anywhere in the repository. Previous template identity: **Springs** (wellness residences).
- The `mavericks/` folder is a separate **React + Vite** application (OffMarket Marrakech / Mavericks brand) and is documented in **04** and **10** as the color source and future product direction.
