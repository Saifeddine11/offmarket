export type HomepageLocale = "root" | "fr" | "en" | "it" | "nl" | "es" | "no";
export type HomepagePageId =
  | "home-root"
  | "home-fr"
  | "home-en"
  | "home-it"
  | "home-nl";

/** Section / UI scripts — boot before the heavy webpack vendor bundle. */
const HOME_CRITICAL_SCRIPT_URLS = [
  "/assets/javascripts/browser-message/browser-message.js?v=1765268659",
  "/assets/javascripts/om-hero-blur-text.js?v=1765408100",
  "/assets/javascripts/om-lazy-videos.js?v=1765308800",
  "/assets/javascripts/om-editorial-text-reveal.js?v=1765301200",
  "/assets/javascripts/om-home-private-access-reveal.js?v=1765356300",
  "/assets/javascripts/scrolltrigger.min.js?v=1765268700",
  "/assets/javascripts/om-cinematic-video.js?v=1765341000",
  "/assets/javascripts/om-text-reveal.js?v=1765317800",
  "/assets/javascripts/om-simulator.js?v=1765405800",
  "/assets/javascripts/om-featured-projects.js?v=1769202007",
  "/assets/javascripts/om-private-access-popup.js?v=1765340000",
  "/assets/javascripts/om-territories.js?v=1784800800",
  "/assets/javascripts/om-who-reveal.js?v=1765310300",
  "/assets/javascripts/om-testimonials.js?v=1765295700",
  "/assets/javascripts/om-private-access-form.js?v=1765600400",
  "/assets/javascripts/om-blog-data.js?v=1765335000",
  "/assets/javascripts/om-blog.js?v=1765404501",
  "/assets/javascripts/om-mobile-reveal.js?v=1765307200",
  "/assets/javascripts/om-property-modal.js?v=1769202006",
  "/assets/javascripts/om-language-switcher.js?v=1769200000",
] as const;

/** ~1.4MB Three/jQuery vendor + page chunk — load after first interactive paint. */
const HOME_DEFERRED_SCRIPT_URLS = [
  "/assets/javascripts/shared.js?v=1765402000",
  "/assets/javascripts/landing.js?v=1765268659",
] as const;

const HOME_LEGACY_SCRIPT_URLS = [
  ...HOME_CRITICAL_SCRIPT_URLS,
  ...HOME_DEFERRED_SCRIPT_URLS,
] as const;

export const HOMEPAGE_SCRIPT_URLS_BY_PAGE_ID: Record<
  HomepagePageId,
  readonly string[]
> = {
  "home-root": HOME_LEGACY_SCRIPT_URLS,
  "home-fr": HOME_LEGACY_SCRIPT_URLS,
  "home-en": HOME_LEGACY_SCRIPT_URLS,
  "home-it": HOME_LEGACY_SCRIPT_URLS,
  "home-nl": HOME_LEGACY_SCRIPT_URLS,
};

export const HOMEPAGE_PAGE_ID_BY_LOCALE: Record<HomepageLocale, HomepagePageId> = {
  root: "home-root",
  fr: "home-fr",
  en: "home-en",
  it: "home-it",
  nl: "home-nl",
  es: "home-root",
  no: "home-root",
};

export function getHomeLegacyScriptUrls(
  pageId: HomepagePageId = "home-root",
): string[] {
  return [...HOMEPAGE_SCRIPT_URLS_BY_PAGE_ID[pageId]];
}

export function getHomeCriticalScriptUrls(
  pageId: HomepagePageId = "home-root",
): string[] {
  void pageId;
  return [...HOME_CRITICAL_SCRIPT_URLS];
}

export function getHomeDeferredScriptUrls(
  pageId: HomepagePageId = "home-root",
): string[] {
  void pageId;
  return [...HOME_DEFERRED_SCRIPT_URLS];
}
