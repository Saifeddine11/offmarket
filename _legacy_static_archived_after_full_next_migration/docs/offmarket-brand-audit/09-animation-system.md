# 09 — Animation System (Current Main Website)

**Critical:** Color migration must **not** modify animation logic, `data-*` attributes, or JS bundles.

---

## Stack overview

| Layer | Technology |
|-------|------------|
| Page transitions | **Barba.js** (`data-barba="wrapper"`, `data-barba="container"`) |
| Smooth scroll | Custom scroller plugin (`body.scroller`) |
| Scroll pinning | `data-scroll`, `data-scroll-sticky`, `data-scroll-target`, `data-scroll-section` |
| Reveal on scroll | `data-plugin="reveal"`, `data-reveal="title|text|gallery"` |
| Parallax | `data-plugin="parallax"`, `data-parallax-*` JSON attrs |
| WebGL | `webglWellness`, `webglNature` jQuery plugins |
| Modals | `data-plugin="modal"`, `modalMenu`, `modalHeaderTheme` |
| Gallery hero | `data-plugin="gallery"` — timed horizontal collage |
| Preloader | `preloader`, `preloaderLanding` |
| Content animation | `data-plugin="contentAnimation"` (menu image crossfade) |

**No GSAP or Framer Motion** on the main static site.

---

## Preloader sequence

1. `preloaderLanding` — logo animation, gradient layers (~4.8s + 4s scroll unlock)
2. `is-preloader-active` on `<html>` disables scroll
3. Cookie `introSeen` skips on return visits
4. Header reveal tied to `data-reveal="preloader"`

**Files:** `assets/javascripts/landing.js` (webpack bundle), HTML preloader blocks.

---

## Hero gallery animation

- `data-plugin="gallery"` on `.l-gallery`
- `requestAnimationFrame` ticker moves `.js-gallery-item` cards horizontally
- Duration ~30s loop; transform `translateX` in vw units
- Layered depth: 3 rows on desktop, 2 on mobile

**Do not break:** `.js-gallery-item`, `.js-gallery-container`, transform CSS.

---

## Sticky / pin sections

Pattern used across homepage:

```html
<div class="sticky sticky--full-height" id="section-id"
     data-scroll data-scroll-sticky data-scroll-target="#section-id">
  <div class="sticky__layer sticky__layer--sticky">...</div>
</div>
```

Sections using this: gallery, intro, wellness, nature, map, design, residences, interiors.

**Risk:** Changing `background-color` on sticky parents is safe; changing `height`, `position`, or `overflow` is not.

---

## Reveal animations

- `data-reveal="title"` / `text` / `gallery` with `data-reveal-delay`
- `data-reveal-enable-mq` for breakpoint gating
- Opacity/transform transitions on scroll intersection

---

## Parallax

- JSON configs on elements: `data-parallax-100-0='{"transform": "translateY(-70%)"}'`
- Footer, intro opening, WebGL containers use parallax plugins
- `parallax-image-move` on menu preview images

---

## Mobile menu animation

| Piece | Behavior |
|-------|----------|
| `#menu` modal | `modal--split-animate--reverse` — split panel entrance |
| `modalMenu` plugin | Full-screen overlay |
| `contentAnimation` | Hover nav item → crossfade preview image |
| Close | `js-modal-close`, icon rotate |

**Colors safe to change:** `modal__background`, `ui-dark` tokens, link colors.  
**Do not change:** `modal--split-animate--reverse`, `content-animation` structure, image clip animations.

---

## WebGL sections

- **Wellness:** `data-plugin="webglWellness parallax"` — lazy-loaded chunk
- **Nature:** `data-plugin="webglNature"` — lazy on viewport enter

Loaded from `webgl-wellness.js` / `webgl-nature.js` via webpack code splitting.

---

## Hover / micro-interactions

- `btn--clone` duplicate text layers for link hover
- `data-plugin="button"` on CTAs
- `has-hover` class on `<html>` enables hover states
- `favouriteCounter` plugin

---

## Shared dependencies

| File | Role |
|------|------|
| `assets/javascripts/shared.js` | Large webpack runtime + Three.js chunks |
| `assets/javascripts/landing.js` | Homepage-specific plugins |
| `assets/javascripts/1.js`, `31.js` | Additional chunks |

---

## Mavericks animation system (reference — separate app)

Located in `mavericks/` only:

| Tech | Usage |
|------|-------|
| GSAP + ScrollTrigger | Section pins, architecture words, hero scrub |
| Framer Motion | Page transitions, component motion |
| Lenis | Smooth scroll (desktop) |
| Custom CSS | Cinematic menu GSAP tweens in `CinematicChrome.jsx` |

**Not applicable** to main static site migration — do not merge stacks in color-only phase.

---

## Migration guardrails

| Safe | Unsafe |
|------|--------|
| Change CSS `color`, `background`, `border-color` | Edit `data-plugin` values |
| Update CSS variables consumed by existing rules | Rename animation classes |
| Modal overlay `background` rgba | Change modal HTML structure |
| `transition-colors` additions | Modify webpack JS bundles |

---

## Testing checklist (post color migration)

- [ ] Preloader completes, scroll unlocks
- [ ] Hero gallery cards animate horizontally
- [ ] Each sticky section pins/unpins without white gaps
- [ ] Menu open/close + image crossfade on hover
- [ ] WebGL wellness/nature loads on scroll into view
- [ ] Barba page transition to subpages (if enabled)
- [ ] Modal forms open (submission optional)
