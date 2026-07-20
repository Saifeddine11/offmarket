import {
  BLOG_ARTICLES,
  BLOG_ARTICLES_EN,
  BLOG_ARTICLES_NL,
  type BlogArticleSlug,
} from "@/lib/blog/articles";
import {
  blogHubArticleHref,
  blogHubHomeHref,
  getBlogHubArticles,
  getBlogHubCategoryLabel,
  getBlogHubLocale,
  type BlogHubArticle,
} from "@/lib/blog/blogHubData";
import type { ParsedBlogArticle, ParsedBlogArticleFaq } from "@/lib/blog/parseBlogArticleHtml";
import type { PageContent } from "@/lib/content/types";
import type { PageId } from "@/lib/content/pages";
import type { SiteLocale } from "@/lib/i18n/types";
import { SITE_URL } from "@/lib/legacy/routes";

export type BlogArticleTocItem = {
  id: string;
  label: string;
};

export type BlogArticleBreadcrumb = {
  label: string;
  href?: string;
};

export type BlogArticleCta = {
  eyebrow: string;
  title: string;
  text: string;
  href: string;
  label: string;
};

export type BlogArticleRelated = {
  href: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
};

export type BlogArticleViewModel = {
  locale: SiteLocale;
  categorySlug: string;
  categoryLabel: string;
  title: string;
  standfirst: string;
  publishedLabel: string | null;
  updatedLabel: string | null;
  readingTimeLabel: string | null;
  editorialLabel: string | null;
  image: ParsedBlogArticle["image"];
  bodyHtml: string;
  toc: BlogArticleTocItem[];
  takeaways: string[];
  showTrust: boolean;
  trustTitle: string;
  trustText: string;
  contextualCta: BlogArticleCta;
  faq: ParsedBlogArticleFaq[];
  related: BlogArticleRelated[];
  breadcrumbs: BlogArticleBreadcrumb[];
  footer: {
    categoryLabel: string;
    publishedLabel: string | null;
    editorialLabel: string | null;
    backHref: string;
    backLabel: string;
  };
  labels: {
    toc: string;
    takeaways: string;
    related: string;
    readingTime: (minutes: number) => string;
    published: string;
    updated: string;
    breadcrumbNav: string;
  };
  jsonLd: Record<string, unknown>[];
};

const PAGE_ID_TO_FR_SLUG = Object.fromEntries(
  Object.entries(BLOG_ARTICLES).map(([slug, pageId]) => [pageId, slug]),
) as Record<string, BlogArticleSlug>;

const WORDS_PER_MINUTE = 200;
const MIN_TOC_SECTIONS = 2;

function slugifyHeading(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "section";
}

function countWords(html: string): number {
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!text) return 0;
  return text.split(" ").filter(Boolean).length;
}

function enhanceBodyWithHeadingIds(bodyHtml: string): {
  bodyHtml: string;
  toc: BlogArticleTocItem[];
} {
  const used = new Set<string>();
  const toc: BlogArticleTocItem[] = [];

  const nextHtml = bodyHtml.replace(
    /<h2(\s[^>]*)?>([\s\S]*?)<\/h2>/gi,
    (_full, attrs = "", inner) => {
      const label = inner.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      if (!label) return `<h2${attrs}>${inner}</h2>`;

      const existingId = typeof attrs === "string"
        ? attrs.match(/\sid=["']([^"']+)["']/i)?.[1]
        : null;
      let id = existingId || slugifyHeading(label);
      let suffix = 2;
      while (used.has(id)) {
        id = `${slugifyHeading(label)}-${suffix}`;
        suffix += 1;
      }
      used.add(id);
      toc.push({ id, label });

      if (existingId) {
        return `<h2${attrs}>${inner}</h2>`;
      }
      const cleanAttrs = typeof attrs === "string" ? attrs : "";
      return `<h2${cleanAttrs} id="${id}">${inner}</h2>`;
    },
  );

  return {
    bodyHtml: nextHtml,
    toc: toc.length >= MIN_TOC_SECTIONS ? toc : [],
  };
}

function resolveHubArticle(
  locale: SiteLocale,
  pageId: PageId | null,
  parsedTitle: string,
): BlogHubArticle | null {
  const articles = getBlogHubArticles(locale);
  if (pageId) {
    const frSlug = PAGE_ID_TO_FR_SLUG[pageId];
    if (frSlug) {
      const index = Object.keys(BLOG_ARTICLES).indexOf(frSlug);
      if (index >= 0 && articles[index]) return articles[index];
    }
  }
  return articles.find((article) => article.title === parsedTitle) ?? null;
}

function resolveCurrentSlug(locale: SiteLocale, pageId: PageId | null, hub: BlogHubArticle | null): string | null {
  if (hub) return hub.slug;
  if (!pageId) return null;
  if (locale === "en") {
    const entry = Object.entries(BLOG_ARTICLES_EN).find(([, id]) => id === pageId);
    return entry?.[0] ?? null;
  }
  if (locale === "nl") {
    const entry = Object.entries(BLOG_ARTICLES_NL).find(([, id]) => id === pageId);
    return entry?.[0] ?? null;
  }
  return PAGE_ID_TO_FR_SLUG[pageId] ?? null;
}

function blogIndexHref(locale: SiteLocale): string {
  if (locale === "en") return "/en/blog/";
  if (locale === "nl") return "/nl/blog/";
  return "/blog/";
}

function aboutHref(locale: SiteLocale): string {
  if (locale === "en") return "/en/about/";
  if (locale === "nl") return "/nl/over-ons/";
  return "/about/";
}

function getCopy(locale: SiteLocale) {
  if (locale === "en") {
    return {
      home: "Home",
      blog: "Blog",
      toc: "In this article",
      takeaways: "Key takeaways",
      related: "Read next",
      published: "Published",
      updated: "Updated",
      breadcrumbNav: "Breadcrumb",
      editorial: "OFF MARKET editorial",
      backLabel: "Back to blog",
      readingTime: (minutes: number) =>
        minutes <= 1 ? "1 min read" : `${minutes} min read`,
      trustTitle: "Informational note",
      trustText:
        "This article is for general information only. It does not replace qualified legal, notarial, technical, tax or financial advice for your specific project.",
      cta: {
        surPlan: {
          eyebrow: "Off-plan",
          title: "Review selected off-plan projects",
          text: "Compare programmes with a clear reading of location, schedule and practical use.",
          href: "/en/off-plan/",
          label: "View off-plan projects",
        },
        investissement: {
          eyebrow: "Investment",
          title: "Model your acquisition scenario",
          text: "Use the simulator to frame budget, use case and next questions before a private discussion.",
          href: "/en/simulator/",
          label: "Open the simulator",
        },
        marrakech: {
          eyebrow: "Neighbourhoods",
          title: "Explore Marrakech neighbourhoods",
          text: "Read the areas that shape demand, lifestyle and long-term desirability.",
          href: "/en/neighbourhoods/",
          label: "Discover neighbourhoods",
        },
        offMarket: {
          eyebrow: "Off-market",
          title: "Request private access",
          text: "Access confidential opportunities with a discreet, qualification-led process.",
          href: "/en/off-market/",
          label: "Request private access",
        },
        contact: {
          eyebrow: "Contact",
          title: "Speak with an advisor",
          text: "Tell us what you are looking for. We respond with a focused private selection.",
          href: "/en/contact/",
          label: "Contact an advisor",
        },
      },
    };
  }

  if (locale === "nl") {
    return {
      home: "Home",
      blog: "Blog",
      toc: "In dit artikel",
      takeaways: "Kernpunten",
      related: "Ook lezen",
      published: "Gepubliceerd",
      updated: "Bijgewerkt",
      breadcrumbNav: "Broodkruimelpad",
      editorial: "Redactie OFF MARKET",
      backLabel: "Terug naar de blog",
      readingTime: (minutes: number) =>
        minutes <= 1 ? "1 min lezen" : `${minutes} min lezen`,
      trustTitle: "Informatieve noot",
      trustText:
        "Dit artikel is uitsluitend bedoeld als algemene informatie. Het vervangt geen gekwalificeerd juridisch, notarieel, technisch, fiscaal of financieel advies voor uw specifieke project.",
      cta: {
        surPlan: {
          eyebrow: "Nieuwbouw",
          title: "Bekijk geselecteerde nieuwbouwprojecten",
          text: "Vergelijk programma’s met een heldere lezing van ligging, planning en praktisch gebruik.",
          href: "/nl/nieuwbouw/",
          label: "Nieuwbouwprojecten bekijken",
        },
        investissement: {
          eyebrow: "Investering",
          title: "Bereken uw aankoopscenario",
          text: "Gebruik de simulator om budget, gebruik en volgende vragen te kaderen vóór een privégesprek.",
          href: "/nl/simulator/",
          label: "Simulator openen",
        },
        marrakech: {
          eyebrow: "Wijken",
          title: "Ontdek de wijken van Marrakech",
          text: "Lees de zones die vraag, levensstijl en langetermijnwenselijkheid vormgeven.",
          href: "/nl/wijken/",
          label: "Wijken ontdekken",
        },
        offMarket: {
          eyebrow: "Off-market",
          title: "Vraag private toegang aan",
          text: "Krijg toegang tot vertrouwelijke kansen via een discreet, kwalificatiegericht traject.",
          href: "/nl/off-market/",
          label: "Private toegang aanvragen",
        },
        contact: {
          eyebrow: "Contact",
          title: "Spreek met een adviseur",
          text: "Vertel wat u zoekt. Wij antwoorden met een gerichte private selectie.",
          href: "/nl/contact/",
          label: "Contacteer een adviseur",
        },
      },
    };
  }

  return {
    home: "Accueil",
    blog: "Blog",
    toc: "Dans cet article",
    takeaways: "À retenir",
    related: "À lire aussi",
    published: "Publication",
    updated: "Mise à jour",
    breadcrumbNav: "Fil d’Ariane",
    editorial: "Rédaction OFF MARKET",
    backLabel: "Retour au blog",
    readingTime: (minutes: number) =>
      minutes <= 1 ? "1 min de lecture" : `${minutes} min de lecture`,
    trustTitle: "Note d’information",
    trustText:
      "Cet article a une vocation informative. Il ne remplace pas un conseil juridique, notarial, technique, fiscal ou financier qualifié pour votre projet.",
    cta: {
      surPlan: {
        eyebrow: "Sur plan",
        title: "Consulter les projets sur plan",
        text: "Comparez des programmes avec une lecture claire de l’adresse, du calendrier et de l’usage.",
        href: "/sur-plan/",
        label: "Voir les projets sur plan",
      },
      investissement: {
        eyebrow: "Investissement",
        title: "Cadrez votre scénario d’acquisition",
        text: "Utilisez le simulateur pour structurer budget, usage et prochaines questions avant un échange privé.",
        href: "/simulateur/",
        label: "Ouvrir le simulateur",
      },
      marrakech: {
        eyebrow: "Quartiers",
        title: "Découvrir les quartiers de Marrakech",
        text: "Lisez les secteurs qui structurent la demande, le cadre de vie et la désirabilité dans le temps.",
        href: "/quartiers/",
        label: "Explorer les quartiers",
      },
      offMarket: {
        eyebrow: "Off-market",
        title: "Demander un accès privé",
        text: "Accédez à des opportunités confidentielles via un parcours discret et qualifié.",
        href: "/off-market/",
        label: "Demander un accès privé",
      },
      contact: {
        eyebrow: "Contact",
        title: "Parler à un conseiller",
        text: "Indiquez ce que vous recherchez. Nous répondons avec une sélection privée ciblée.",
        href: "/contact/",
        label: "Contacter un conseiller",
      },
    },
  };
}

function pickContextualCta(
  locale: SiteLocale,
  categorySlug: string,
): BlogArticleCta {
  const copy = getCopy(locale);
  if (categorySlug === "sur-plan") return copy.cta.surPlan;
  if (categorySlug === "investissement") return copy.cta.investissement;
  if (categorySlug === "marrakech") return copy.cta.marrakech;
  if (categorySlug === "off-market") return copy.cta.offMarket;
  return copy.cta.contact;
}

function shouldShowTrust(categorySlug: string, bodyHtml: string): boolean {
  if (
    categorySlug === "sur-plan" ||
    categorySlug === "investissement" ||
    categorySlug === "off-market"
  ) {
    return true;
  }
  return /notaire|juridique|fiscal|impôt|due diligence|s\.a\.f\.e|sur plan|investissement/i.test(
    bodyHtml,
  );
}

function relatedArticles(
  locale: SiteLocale,
  currentSlug: string | null,
  categorySlug: string,
): BlogArticleRelated[] {
  const articles = getBlogHubArticles(locale).filter(
    (article) => article.slug !== currentSlug,
  );
  const sameCategory = articles.filter((article) => article.category === categorySlug);
  const others = articles.filter((article) => article.category !== categorySlug);
  const ordered = [...sameCategory, ...others].slice(0, 3);

  return ordered.map((article) => ({
    href: blogHubArticleHref(locale, article.slug),
    category: getBlogHubCategoryLabel(locale, article.category),
    title: article.title,
    excerpt: article.excerpt,
    image: article.image,
    imageAlt: article.imageAlt,
  }));
}

function absoluteUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith("http")) return pathOrUrl;
  return `${SITE_URL}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
}

export function buildBlogArticleViewModel(options: {
  content: PageContent;
  parsed: ParsedBlogArticle;
  pageId?: PageId | null;
}): BlogArticleViewModel {
  const locale = getBlogHubLocale(options.content.htmlLang);
  const copy = getCopy(locale);
  const hub = resolveHubArticle(locale, options.pageId ?? null, options.parsed.title);
  const categorySlug = hub?.category ?? "marrakech";
  const categoryLabel =
    getBlogHubCategoryLabel(locale, categorySlug) || options.parsed.categoryLabel;
  const currentSlug = resolveCurrentSlug(locale, options.pageId ?? null, hub);
  const title = hub?.title || options.parsed.title;
  const standfirst =
    options.content.description?.replace(/\s+/g, " ").trim() ||
    options.content.ogDescription?.replace(/\s+/g, " ").trim() ||
    "";
  const publishedLabel = hub?.date || options.parsed.publishedLabel;
  const { bodyHtml, toc } = enhanceBodyWithHeadingIds(options.parsed.bodyHtml);
  const wordCount = countWords(bodyHtml);
  const readingMinutes = wordCount > 0 ? Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE)) : null;
  const image = options.parsed.image
    ? options.parsed.image
    : hub
      ? { src: hub.image, alt: hub.imageAlt }
      : null;

  const breadcrumbs: BlogArticleBreadcrumb[] = [
    { label: copy.home, href: blogHubHomeHref(locale) },
    { label: copy.blog, href: blogIndexHref(locale) },
    { label: categoryLabel, href: blogIndexHref(locale) },
    { label: title },
  ];

  const canonical = absoluteUrl(options.content.canonical || blogIndexHref(locale));
  const jsonLd: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.label,
        ...(crumb.href ? { item: absoluteUrl(crumb.href) } : { item: canonical }),
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description: standfirst || options.content.description,
      image: image ? [absoluteUrl(image.src)] : undefined,
      datePublished: publishedLabel || undefined,
      mainEntityOfPage: canonical,
      inLanguage:
        locale === "en" ? "en-US" : locale === "nl" ? "nl-NL" : "fr-FR",
      publisher: {
        "@type": "Organization",
        name: "OFF MARKET",
        url: SITE_URL,
      },
    },
  ];

  if (options.parsed.faq.length > 0) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: options.parsed.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answerHtml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
        },
      })),
    });
  }

  return {
    locale,
    categorySlug,
    categoryLabel,
    title,
    standfirst,
    publishedLabel,
    updatedLabel: null,
    readingTimeLabel:
      readingMinutes !== null ? copy.readingTime(readingMinutes) : null,
    editorialLabel: copy.editorial,
    image,
    bodyHtml,
    toc,
    takeaways: [],
    showTrust: shouldShowTrust(categorySlug, bodyHtml),
    trustTitle: copy.trustTitle,
    trustText: copy.trustText,
    contextualCta: pickContextualCta(locale, categorySlug),
    faq: options.parsed.faq,
    related: relatedArticles(locale, currentSlug, categorySlug),
    breadcrumbs,
    footer: {
      categoryLabel,
      publishedLabel,
      editorialLabel: copy.editorial,
      backHref: blogIndexHref(locale),
      backLabel: copy.backLabel,
    },
    labels: {
      toc: copy.toc,
      takeaways: copy.takeaways,
      related: copy.related,
      readingTime: copy.readingTime,
      published: copy.published,
      updated: copy.updated,
      breadcrumbNav: copy.breadcrumbNav,
    },
    jsonLd,
  };
}

/** Kept for template consumers that may later deep-link to About / S.A.F.E. mentions. */
export function blogArticleAboutHref(locale: SiteLocale): string {
  return aboutHref(locale);
}
