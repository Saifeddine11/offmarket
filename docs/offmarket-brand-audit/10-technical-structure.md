# 10 — Technical Structure

## Two applications in one repository

| App | Path | Framework |
|-----|------|-----------|
| **Main website (audited)** | `/offmarket-website/` | Static HTML + webpack-compiled JS/CSS |
| **Mavericks** | `/offmarket-website/mavericks/` | React 18 + Vite + Tailwind |

---

## Main website structure

```
offmarket-website/
├── index.html                 # Homepage (~10k lines)
├── about/index.html
├── gallery/index.html
├── location/index.html
├── infrastructure/index.html
├── assets/
│   ├── stylesheets/
│   │   ├── global.css         # Core tokens + all base components
│   │   ├── landing.css        # Homepage-specific
│   │   ├── about.css
│   │   ├── gallery.css
│   │   ├── location.css
│   │   └── infrastructure.css
│   ├── javascripts/
│   │   ├── shared.js          # Webpack runtime + vendors
│   │   ├── landing.js         # Homepage plugins
│   │   └── webgl-*.js
│   ├── fonts/
│   ├── images/
│   └── manifest/
├── media/cache/               # Image variants
├── favicon.ico
├── DEPLOYMENT.md
└── docs/offmarket-brand-audit/  # This documentation
```

**No `package.json` at repo root** — static deploy only.

---

## Routing

- File-based: `/about/` → `about/index.html`
- Internal anchors: `#top`, `#l-intro`, `#menu`, `#callback-modal`
- External product path: `/flats` (catalog — may need backend)
- Barba.js handles SPA-like transitions when navigating between sections/pages

---

## Global CSS architecture (main site)

1. **`global.css`** — normalize + design system:
   - `--c-*` color primitives
   - `.ui-dark` / `.ui-light` → `--t-*` semantics
   - Button, modal, header, footer, typography, grid
2. **Page CSS** — layout sections (e.g. `landing.css` for `.l-gallery`, `.l-wellness`)
3. **Inline critical CSS** — FOUC guard in each HTML `<head>`

**Centralization target for color migration:** Edit `--c-*` and `--t-*` blocks at top of `global.css` first.

---

## Mavericks structure (color source)

```
mavericks/
├── src/
│   ├── config/brand.js          # Canonical colors
│   ├── styles/colors.css        # CSS variables
│   ├── styles/tokens.css        # Imports colors
│   ├── index.css                # Tailwind + global + menu glass
│   ├── App.jsx                  # Layout shell
│   ├── routes/Home.jsx          # Homepage sections
│   ├── components/
│   │   ├── cinematic/           # Chrome, sections, GSAP
│   │   ├── layout/              # Header, Footer
│   │   └── obsidian/
│   └── i18n/locales/            # FR/EN/IT/NL
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## Where brand values are defined

### Main site (current)

| Concern | Location |
|---------|----------|
| Colors | `assets/stylesheets/global.css` (`--c-*`, `--t-*`) |
| Typography | `global.css` font-face + type classes |
| Logos | `assets/images/icons.svg` |
| Theme meta | Each `index.html` `<meta name="theme-color">` |

### Mavericks (target palette)

| Concern | Location |
|---------|----------|
| Colors | `src/config/brand.js` → `tailwind.config.js` + `styles/colors.css` |
| Typography | `brand.js` → Tailwind `fontFamily` |
| Motion | `src/styles/tokens.js`, `src/lib/gsap.js` |
| Copy | `src/i18n/locales/*.json` |

---

## Component structure comparison

| Main site | Mavericks |
|-----------|-----------|
| HTML sections with BEM (`l-gallery`, `header`) | React section components |
| jQuery plugins (`data-plugin`) | Hooks + GSAP contexts |
| `ui-dark` class theming | Tailwind + CSS variables |
| Monolithic CSS bundles | Modular CSS + Tailwind utilities |

---

## Build & verification

### Main site

```bash
python3 -m http.server 8767
# No lint/build/typecheck at root
```

### Mavericks

```bash
cd mavericks
npm run dev      # http://localhost:3000
npm run lint
npm run build
# No typecheck script in package.json
```

---

## Recommended centralization (future color work on main site)

1. Add `assets/stylesheets/offmarket-tokens.css` with Mavericks `--c-*` equivalents **or** remap existing `--c-dark-green` → dark red in place.
2. Import tokens before component rules in `global.css`.
3. Update `theme-color` + manifest in one pass across all HTML pages.
4. Keep `landing.css` gradient hex updates separate (section-specific).
5. Do **not** introduce Tailwind to static site unless scope expands.

---

## Backend / Supabase

- **Main site:** Forms POST to production API (see `DEPLOYMENT.md`); no Supabase in static tree.
- **Mavericks:** No Supabase integration audited in frontend `src/`.

---

## Duplicate / ignore paths

| Path | Action |
|------|--------|
| `mavericks/library design/` | Duplicate Springs export — do not use as source of truth |
| `mavericks/dist/` | Build output |
| `mavericks/node_modules/` | Dependencies |
