# OFF MARKET Page Motion System

`/quartiers/` is the **approved reference** for inner-page motion. New pages must reuse this system — do not invent alternate animation patterns without a strong reason.

## Primitives (`components/motion/`)

| Component | Use for |
|-----------|---------|
| `TextMaskReveal` | Large titles (hero h1, section h2) |
| `ImageScrollReveal` | Hero images, feature visuals, large photo blocks |
| `ScrollReveal` | Eyebrows, subtitles, body copy blocks |
| `StaggerReveal` + `StaggerItem` | Card grids, action rows, point lists |
| `SectionHeaderMotion` | Standard section header (eyebrow + title + subtitle) |
| `ParallaxY` | Subtle scroll-linked depth only when safe |
| `PageEntranceMotion` | Soft page fade-up on load |
| `InnerPageHeroMotion` | Inner-page hero (breadcrumb, title, image) |
| `PageFinalCtaMotion` | Closing CTA with background reveal |

Import from `@/components/motion` or individual files.

Tokens: `lib/motion/config.ts` (`MOTION_EASE`, `MOTION_VIEWPORT`).

## New animated inner page

1. **Route** — keep navbar/footer in `app/.../page.tsx` (layout unchanged).
2. **Page shell** — `PageShell className="om-animated-page om-inner-page"`.
3. **Styles** — add `STYLES.animatedInnerPage` via `StylesheetLinks` (includes `om-page-motion.css`).
4. **Content** — use `AnimatedInnerPageTemplate` from `components/templates/AnimatedInnerPageTemplate.tsx`:

```tsx
<AnimatedInnerPageTemplate
  hero={{
    breadcrumbs: [{ label: "Accueil", href: "/" }, { label: "Page", current: true }],
    title: "Page title",
    subtitle: "Subtitle copy.",
    imageSrc: "/assets/offmarket/gallery/example.webp",
  }}
>
  <MyServerSection />
</AnimatedInnerPageTemplate>
```

5. **Sections** — wrap blocks with `ScrollReveal`, `TextMaskReveal`, `StaggerReveal`, `ImageScrollReveal` as on `/quartiers/`.

`/quartiers/` keeps its own `om-quartiers-motion.css` and `QuartiersPageContent` — do not weaken or replace that implementation.

## Rules

- **Reduced motion** — all primitives respect `prefers-reduced-motion`.
- **No scroll hijacking** — no global scroll listeners, no blocking scroll.
- **Safe properties** — prefer `transform`, `opacity`; avoid layout-property animation.
- **Images must stay visible** — never leave content at `opacity: 0` without a guaranteed reveal fallback.
- **No bounce** — use `MOTION_EASE` (`[0.16, 1, 0.3, 1]`).
- **Client boundaries** — keep page shells as server components; motion lives in small `"use client"` wrappers.

## JS-hydrated sections

If a section mounts cards via legacy JS (like territories/blog on `/quartiers/`), use a page-specific dynamic motion boot (see `QuartiersDynamicMotion`) rather than duplicating animation logic inline.

## Performance

- No heavy blur on mobile.
- Parallax only inside `ImageScrollReveal` / `ParallaxY`, disabled on mobile where appropriate.
- Do not add dependencies for motion — `framer-motion` is already the single animation library.
