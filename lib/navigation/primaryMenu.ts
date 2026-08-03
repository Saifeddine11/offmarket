import type { SiteLocale } from "@/lib/i18n/types";

export type PrimaryMenuChild = {
  label: string;
  href: string;
  children?: PrimaryMenuChild[];
};

export type PrimaryMenuItem = {
  id: string;
  label: string;
  href: string;
  children?: PrimaryMenuChild[];
};

const MENU_FR: PrimaryMenuItem[] = [
  { id: "home", label: "Accueil", href: "/" },
  { id: "histoire", label: "Notre Histoire", href: "/about/" },
  { id: "localisations", label: "Quartiers", href: "/quartiers/" },
  {
    id: "projets",
    label: "Nos Projets",
    href: "/nos-projets/",
    children: [
      { label: "Tous les projets", href: "/nos-projets/" },
      { label: "Off-market", href: "/off-market/" },
    ],
  },
  { id: "simulateur", label: "Simulateur", href: "/simulateur/" },
  { id: "contact", label: "Contact", href: "/contact/" },
];

const MENU_EN: PrimaryMenuItem[] = [
  { id: "home", label: "Home", href: "/en/" },
  { id: "histoire", label: "Our Story", href: "/en/about/" },
  { id: "localisations", label: "Neighbourhoods", href: "/en/neighbourhoods/" },
  {
    id: "projets",
    label: "Our Projects",
    href: "/en/projects/",
    children: [
      { label: "All Projects", href: "/en/projects/" },
      { label: "Off-market", href: "/en/off-market/" },
    ],
  },
  { id: "simulateur", label: "Simulator", href: "/en/simulator/" },
  { id: "contact", label: "Contact", href: "/en/contact/" },
];

const MENU_ES: PrimaryMenuItem[] = [
  { id: "home", label: "Inicio", href: "/es/" },
  { id: "histoire", label: "Nuestra historia", href: "/es/sobre-nosotros/" },
  { id: "localisations", label: "Barrios", href: "/es/barrios/" },
  {
    id: "projets",
    label: "Proyectos",
    href: "/es/proyectos/",
    children: [
      { label: "Todos los proyectos", href: "/es/proyectos/" },
      { label: "Off-market", href: "/es/off-market/" },
    ],
  },
  { id: "simulateur", label: "Simulador", href: "/es/simulador/" },
  { id: "contact", label: "Contacto", href: "/es/contacto/" },
];

const MENU_IT: PrimaryMenuItem[] = [
  { id: "home", label: "Home", href: "/it/" },
  { id: "histoire", label: "La nostra storia", href: "/it/chi-siamo/" },
  { id: "localisations", label: "Quartieri", href: "/it/quartieri/" },
  {
    id: "projets",
    label: "Progetti",
    href: "/it/progetti/",
    children: [
      { label: "Tutti i progetti", href: "/it/progetti/" },
      { label: "Off-market", href: "/it/off-market/" },
    ],
  },
  { id: "simulateur", label: "Simulatore", href: "/it/simulatore/" },
  { id: "contact", label: "Contatto", href: "/it/contatto/" },
];

const MENU_NL: PrimaryMenuItem[] = [
  { id: "home", label: "Home", href: "/nl/" },
  { id: "histoire", label: "Ons verhaal", href: "/nl/over-ons/" },
  { id: "localisations", label: "Wijken", href: "/nl/wijken/" },
  {
    id: "projets",
    label: "Onze projecten",
    href: "/nl/projecten/",
    children: [
      { label: "Alle projecten", href: "/nl/projecten/" },
      { label: "Off-market", href: "/nl/off-market/" },
    ],
  },
  { id: "simulateur", label: "Simulator", href: "/nl/simulator/" },
  { id: "contact", label: "Contact", href: "/nl/contact/" },
];

const MENU_NO: PrimaryMenuItem[] = [
  { id: "home", label: "Hjem", href: "/no/" },
  { id: "histoire", label: "Vår historie", href: "/no/om-oss/" },
  { id: "localisations", label: "Områder", href: "/no/omrader/" },
  {
    id: "projets",
    label: "Prosjekter",
    href: "/no/prosjekter/",
    children: [
      { label: "Alle prosjekter", href: "/no/prosjekter/" },
      { label: "Off-market", href: "/no/off-market/" },
    ],
  },
  { id: "simulateur", label: "Kalkulator", href: "/no/kalkulator/" },
  { id: "contact", label: "Kontakt", href: "/no/kontakt/" },
];

const MENUS: Record<SiteLocale, PrimaryMenuItem[]> = {
  fr: MENU_FR,
  en: MENU_EN,
  es: MENU_ES,
  it: MENU_IT,
  nl: MENU_NL,
  no: MENU_NO,
};

const OPEN_MENU: Record<SiteLocale, string> = {
  fr: "Ouvrir le menu ",
  en: "Open menu ",
  es: "Abrir menú ",
  it: "Apri menu ",
  nl: "Menu openen ",
  no: "Åpne meny ",
};

const SHOW_LABEL: Record<SiteLocale, string> = {
  fr: "Afficher ",
  en: "Show ",
  es: "Mostrar ",
  it: "Mostra ",
  nl: "Toon ",
  no: "Vis ",
};

function escapeHtml(value: string): string {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function normalizePath(pathname: string): string {
  let path = pathname || "/";
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  return path || "/";
}

function hrefPath(href: string): string {
  return normalizePath((href || "/").split("#")[0] || "/");
}

function isItemActive(
  item: PrimaryMenuItem,
  locale: SiteLocale,
  pathname: string,
  hash = "",
): boolean {
  const current = normalizePath(pathname);
  const target = hrefPath(item.href);

  if (item.id === "home") {
    if (locale === "en") return current === "/en" && !hash;
    if (locale === "es") return current === "/es" && !hash;
    if (locale === "it") return current === "/it" && !hash;
    if (locale === "nl") return current === "/nl" && !hash;
    if (locale === "no") return current === "/no" && !hash;
    return current === "/" && !hash;
  }

  if (item.id === "contact") {
    if (locale === "es") return current === "/es/contacto";
    if (locale === "nl") return current === "/nl/contact";
    if (locale === "it") return current === "/it/contatto";
    if (locale === "no") return current === "/no/kontakt";
    return locale === "en" ? current === "/en/contact" : current === "/contact";
  }

  if (item.id === "histoire") {
    if (locale === "en") return current === "/en/about";
    if (locale === "es") return current === "/es/sobre-nosotros";
    if (locale === "nl") return current === "/nl/over-ons";
    if (locale === "it") return current === "/it/chi-siamo";
    if (locale === "no") return current === "/no/om-oss";
    return current === "/about" || current === "/fr/about";
  }

  if (item.id === "localisations") {
    if (locale === "en") return current === "/en/neighbourhoods";
    if (locale === "es") return current === "/es/barrios";
    if (locale === "nl") return current === "/nl/wijken";
    if (locale === "it") return current === "/it/quartieri";
    if (locale === "no") return current === "/no/omrader";
    return current === "/quartiers";
  }

  if (item.id === "projets") {
    if (locale === "en") {
      return (
        current === "/en/projects" ||
        current === "/en/off-plan" ||
        current === "/en/off-plan/villa-jaz" ||
        current === "/en/off-market" ||
        (current === "/en" && hash === "#featured-projects")
      );
    }
    if (locale === "it") {
      return (
        current === "/it/progetti" ||
        current === "/it/progetti-su-piano" ||
        current === "/it/off-market" ||
        current === "/it/progetti-su-piano/villa-jaz"
      );
    }
    if (locale === "es") {
      return (
        current === "/es/proyectos" ||
        current === "/es/sobre-plano" ||
        current === "/es/sobre-plano/villa-jaz" ||
        current === "/es/off-market"
      );
    }
    if (locale === "nl") {
      return (
        current === "/nl/projecten" ||
        current === "/nl/nieuwbouw" ||
        current === "/nl/nieuwbouw/villa-jaz" ||
        current === "/nl/off-market"
      );
    }
    if (locale === "no") {
      return (
        current === "/no/prosjekter" ||
        current === "/no/nybygg" ||
        current === "/no/nybygg/villa-jaz" ||
        current === "/no/off-market"
      );
    }
    return (
      current === "/nos-projets" ||
      current === "/sur-plan" ||
      current === "/sur-plan/villa-jaz" ||
      current === "/off-market" ||
      (current === "/" && hash === "#featured-projects")
    );
  }

  if (item.id === "simulateur") {
    return target !== "/" && current === target;
  }

  return target !== "/" && current === target;
}

export function getPrimaryMenu(locale: SiteLocale = "fr"): PrimaryMenuItem[] {
  return MENUS[locale] ?? MENU_FR;
}

function renderDesktopChild(child: PrimaryMenuChild): string {
  if (child.children?.length) {
    return (
      '<div class="om-nav-dropdown__item om-nav-dropdown__item--has-children">' +
      `<a class="om-nav-dropdown__link" href="${escapeHtml(child.href)}">${escapeHtml(child.label)}</a>` +
      '<div class="om-nav-dropdown__submenu" role="menu">' +
      child.children
        .map(
          (grand) =>
            `<a class="om-nav-dropdown__sublink" role="menuitem" href="${escapeHtml(grand.href)}">${escapeHtml(grand.label)}</a>`,
        )
        .join("") +
      "</div></div>"
    );
  }

  return (
    `<a class="om-nav-dropdown__link" role="menuitem" href="${escapeHtml(child.href)}">` +
    `${escapeHtml(child.label)}</a>`
  );
}

function renderDesktopItem(
  item: PrimaryMenuItem,
  locale: SiteLocale,
  pathname: string,
  hash: string,
): string {
  const active = isItemActive(item, locale, pathname, hash);
  if (!item.children?.length) {
    return (
      `<a href="${escapeHtml(item.href)}"` +
      (active ? ' class="is-active" aria-current="page"' : "") +
      `>${escapeHtml(item.label)}</a>`
    );
  }

  return (
    `<div class="om-nav-dropdown${active ? " is-active" : ""}" data-om-nav-dropdown>` +
    '<div class="om-nav-dropdown__trigger" role="presentation">' +
    `<a href="${escapeHtml(item.href)}" class="om-nav-dropdown__label-link"` +
    (active ? ' aria-current="page"' : "") +
    `>${escapeHtml(item.label)}</a>` +
    `<button type="button" class="om-nav-dropdown__toggle" aria-haspopup="true" aria-expanded="false" aria-label="${escapeHtml(OPEN_MENU[locale] + item.label)}">` +
    '<span class="om-nav-dropdown__chevron" aria-hidden="true">▾</span>' +
    "</button></div>" +
    '<div class="om-nav-dropdown__menu om-nav-dropdown__menu--flat" role="menu">' +
    item.children.map(renderDesktopChild).join("") +
    "</div></div>"
  );
}

function renderMobileExpandIcon(): string {
  return '<span class="mv-chrome__expand-icon" aria-hidden="true"><span></span><span></span></span>';
}

function renderMobileChildren(
  children: PrimaryMenuChild[],
  locale: SiteLocale,
): string {
  return children
    .map((child) => {
      if (child.children?.length) {
        return (
          '<li class="mv-chrome__menu-subitem mv-chrome__menu-subitem--expandable">' +
          '<div class="mv-chrome__menu-subitem-row">' +
          `<a href="${escapeHtml(child.href)}" class="cinematic-menu-sublink">${escapeHtml(child.label)}</a>` +
          `<button type="button" class="mv-chrome__expand-btn mv-chrome__expand-btn--nested" aria-expanded="false" aria-label="${escapeHtml(SHOW_LABEL[locale] + child.label)}">` +
          renderMobileExpandIcon() +
          "</button></div>" +
          '<div class="mv-chrome__submenu mv-chrome__submenu--nested" hidden><ul>' +
          child.children
            .map(
              (grand) =>
                `<li><a href="${escapeHtml(grand.href)}" class="cinematic-menu-sublink cinematic-menu-sublink--nested">${escapeHtml(grand.label)}</a></li>`,
            )
            .join("") +
          "</ul></div></li>"
        );
      }

      return (
        `<li><a href="${escapeHtml(child.href)}" class="cinematic-menu-sublink">${escapeHtml(child.label)}</a></li>`
      );
    })
    .join("");
}

function renderMobileItem(item: PrimaryMenuItem, locale: SiteLocale): string {
  if (!item.children?.length) {
    return (
      '<li class="cinematic-menu-item mv-chrome__menu-item">' +
      `<a href="${escapeHtml(item.href)}" class="cinematic-menu-link">${escapeHtml(item.label)}</a>` +
      "</li>"
    );
  }

  return (
    '<li class="cinematic-menu-item mv-chrome__menu-item mv-chrome__menu-item--expandable">' +
    '<div class="mv-chrome__menu-item-row">' +
    `<a href="${escapeHtml(item.href)}" class="cinematic-menu-link">${escapeHtml(item.label)}</a>` +
    `<button type="button" class="mv-chrome__expand-btn" aria-expanded="false" aria-label="${escapeHtml(SHOW_LABEL[locale] + item.label)}">` +
    renderMobileExpandIcon() +
    "</button></div>" +
    '<div class="mv-chrome__submenu" hidden><ul>' +
    renderMobileChildren(item.children, locale) +
    "</ul></div></li>"
  );
}

/** Server-rendered desktop nav HTML — matches om-nav-menu.js structure. */
export function renderPrimaryDesktopNavHtml(
  locale: SiteLocale,
  pathname = "/",
  hash = "",
): string {
  return getPrimaryMenu(locale)
    .map((item) => renderDesktopItem(item, locale, pathname, hash))
    .join("");
}

/** Server-rendered mobile panel nav HTML — matches om-nav-menu.js structure. */
export function renderPrimaryMobileNavHtml(locale: SiteLocale): string {
  return getPrimaryMenu(locale)
    .map((item) => renderMobileItem(item, locale))
    .join("");
}
