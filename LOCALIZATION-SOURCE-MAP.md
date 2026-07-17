# OFF MARKET localization source map

| Surface | Source of truth | Correction applied |
|---|---|---|
| Root document language and structured data | `app/layout.tsx`, `lib/i18n/locale.ts`, `lib/seo/structuredData.ts` | Locale is derived from the request path headers when the hosting layer exposes them; the same locale drives `html[lang]` and JSON-LD. The plain `next start` server does not expose the pathname to a root layout, so direct local requests currently retain the French root fallback for `html[lang]`. |
| Global navigation and footer | `components/layout/GlobalSiteNavbar.tsx`, `components/layout/GlobalSiteFooter.tsx` | Removed hydration-time locale state and pathname fallback flashes. |
| Home sections and legacy HTML | `lib/home/sections.ts`, `lib/homepage/localizeHomeLegacyContent.ts` | Removed cross-locale section fallback and expanded exact EN/NL terminology, labels, URLs, and malformed-fragment replacements. |
| Business/off-plan pages | `lib/business/localizeBusinessLegacyContent.ts`, `content/pages/off-plan-en.json`, `content/pages/nieuwbouw-nl.json` | Added complete EN/NL legacy-string localization and corrected malformed source fragments. |
| Blog index and articles | `lib/blog/localizedBlogContent.ts`, `components/blog/BlogIndexContent.tsx`, `lib/seo/blogMetadata.ts` | Localized article bodies, hidden heading, and description metadata for EN/NL. |
| Project cards and property modal | `components/property/PropertyModalSlides.tsx`, `components/sections/VillaJazDetailPageContent.tsx` | Added explicit Italian modal copy and removed the forced Italian-to-English modal fallback. |
| Simulator | `components/sections/HomeSimulatorCalculator.tsx` | Removed the generic French copy fallback. |

The route/page modules remain the routing layer; localized content is resolved before rendering and is not patched with a broad client-side text replacement script.
