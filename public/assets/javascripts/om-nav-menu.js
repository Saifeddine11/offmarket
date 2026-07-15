/**
 * OFF MARKET — Primary navigation (desktop dropdowns + mobile panel)
 */
(function () {
  'use strict';

  var MENU_FR = [
    { id: 'home', label: 'Accueil', href: '/' },
    { id: 'histoire', label: 'Notre Histoire', href: '/about/' },
    { id: 'localisations', label: 'Quartiers', href: '/quartiers/' },
    {
      id: 'projets',
      label: 'Nos Projets',
      href: '/nos-projets/',
      children: [
        { label: 'Tous les projets', href: '/nos-projets/' },
        { label: 'Off-market', href: '/off-market/' },
      ],
    },
    { id: 'simulateur', label: 'Simulateur', href: '/simulateur/' },
    { id: 'contact', label: 'Contact', href: '/contact/' },
  ];

  var MENU_EN = [
    { id: 'home', label: 'Home', href: '/en/' },
    { id: 'histoire', label: 'Our Story', href: '/en/about/' },
    { id: 'localisations', label: 'Neighbourhoods', href: '/en/neighbourhoods/' },
    {
      id: 'projets',
      label: 'Our Projects',
      href: '/en/projects/',
      children: [
        { label: 'All Projects', href: '/en/projects/' },
        { label: 'Off-market', href: '/en/off-market/' },
      ],
    },
    { id: 'simulateur', label: 'Simulator', href: '/en/simulator/' },
    { id: 'contact', label: 'Contact', href: '/en/contact/' },
  ];

  var MENU_IT = [
    { id: 'home', label: 'Home', href: '/it/' },
    { id: 'histoire', label: 'La nostra storia', href: '/about/' },
    { id: 'localisations', label: 'Quartieri', href: '/quartiers/' },
    {
      id: 'projets',
      label: 'Progetti',
      href: '/nos-projets/',
      children: [
        { label: 'Tutti i progetti', href: '/nos-projets/' },
        { label: 'Off-market', href: '/it/off-market/' },
      ],
    },
    { id: 'simulateur', label: 'Simulatore', href: '/simulateur/' },
    { id: 'contact', label: 'Contatto', href: '/it/contatto/' },
  ];

  var MENU_NL = [
    { id: 'home', label: 'Home', href: '/nl/' },
    { id: 'histoire', label: 'Ons verhaal', href: '/nl/over-ons/' },
    { id: 'localisations', label: 'Wijken', href: '/nl/wijken/' },
    {
      id: 'projets',
      label: 'Onze projecten',
      href: '/nl/projecten/',
      children: [
        { label: 'Alle projecten', href: '/nl/projecten/' },
        { label: 'Off-market', href: '/nl/off-market/' },
      ],
    },
    { id: 'simulateur', label: 'Simulator', href: '/nl/simulator/' },
    { id: 'contact', label: 'Contact', href: '/nl/contact/' },
  ];

  function detectMenuLocale() {
    var path = window.location.pathname || '/';
    if (path.indexOf('/en') === 0) return 'en';
    if (path.indexOf('/it') === 0) return 'it';
    if (path.indexOf('/nl') === 0) return 'nl';
    return 'fr';
  }

  function getMenu() {
    var locale = detectMenuLocale();
    if (locale === 'en') return MENU_EN;
    if (locale === 'it') return MENU_IT;
    if (locale === 'nl') return MENU_NL;
    return MENU_FR;
  }

  function getUiLabels() {
    var locale = detectMenuLocale();
    if (locale === 'en') return { openMenu: 'Open menu ', show: 'Show ' };
    if (locale === 'it') return { openMenu: 'Apri menu ', show: 'Mostra ' };
    if (locale === 'nl') return { openMenu: 'Menu openen ', show: 'Toon ' };
    return { openMenu: 'Ouvrir le menu ', show: 'Afficher ' };
  }

  var MENU = MENU_FR;

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function normalizePath(pathname) {
    var path = pathname || '/';
    if (path.length > 1 && path.charAt(path.length - 1) === '/') {
      path = path.slice(0, -1);
    }
    return path || '/';
  }

  function hrefPath(href) {
    return normalizePath((href || '/').split('#')[0] || '/');
  }

  function isItemActive(item) {
    var current = normalizePath(window.location.pathname);
    var target = hrefPath(item.href);
    var locale = detectMenuLocale();

    if (item.id === 'home') {
      if (locale === 'en') {
        return current === '/en' && !window.location.hash;
      }
      if (locale === 'it') {
        return current === '/it' && !window.location.hash;
      }
      if (locale === 'nl') {
        return current === '/nl' && !window.location.hash;
      }
      return current === '/' && !window.location.hash;
    }

    if (item.id === 'contact') {
      if (locale === 'nl') return current === '/nl/contact';
      if (locale === 'it') return current === '/it/contatto';
      return locale === 'en' ? current === '/en/contact' : current === '/contact';
    }

    if (item.id === 'histoire') {
      if (locale === 'en') return current === '/en/about';
      if (locale === 'nl') return current === '/nl/over-ons';
      return current === '/about' || current === '/fr/about';
    }

    if (item.id === 'localisations') {
      if (locale === 'en') return current === '/en/neighbourhoods';
      if (locale === 'nl') return current === '/nl/wijken';
      return current === '/quartiers';
    }

    if (item.id === 'projets') {
      if (locale === 'en') {
        return (
          current === '/en/projects' ||
          current === '/en/off-plan' ||
          current === '/en/off-plan/villa-jaz' ||
          current === '/en/off-market' ||
          (current === '/en' && window.location.hash === '#featured-projects')
        );
      }
      if (locale === 'it') {
        return (
          current === '/it/progetti-su-piano' ||
          current === '/it/off-market' ||
          current === '/nos-projets' ||
          current === '/sur-plan' ||
          current === '/sur-plan/villa-jaz' ||
          current === '/off-market'
        );
      }
      if (locale === 'nl') {
        return (
          current === '/nl/projecten' ||
          current === '/nl/nieuwbouw' ||
          current === '/nl/nieuwbouw/villa-jaz' ||
          current === '/nl/off-market'
        );
      }
      return (
        current === '/nos-projets' ||
        current === '/sur-plan' ||
        current === '/sur-plan/villa-jaz' ||
        current === '/off-market' ||
        (current === '/' && window.location.hash === '#featured-projects')
      );
    }

    if (target !== '/' && current === target) {
      return true;
    }

    return false;
  }

  function activeAttrs(item) {
    return isItemActive(item) ? ' class="is-active" aria-current="page"' : '';
  }

  function renderDesktopChild(child, nested) {
    if (child.children && child.children.length) {
      return (
        '<div class="om-nav-dropdown__item om-nav-dropdown__item--has-children">' +
          '<a class="om-nav-dropdown__link" href="' + escapeHtml(child.href) + '">' + escapeHtml(child.label) + '</a>' +
          '<div class="om-nav-dropdown__submenu" role="menu">' +
            child.children
              .map(function (grand) {
                return (
                  '<a class="om-nav-dropdown__sublink" role="menuitem" href="' +
                  escapeHtml(grand.href) +
                  '">' +
                  escapeHtml(grand.label) +
                  '</a>'
                );
              })
              .join('') +
          '</div>' +
        '</div>'
      );
    }

    return (
      '<a class="om-nav-dropdown__link' +
      (nested ? ' om-nav-dropdown__link--nested' : '') +
      '" role="menuitem" href="' +
      escapeHtml(child.href) +
      '">' +
      escapeHtml(child.label) +
      '</a>'
    );
  }

  function renderDesktopItem(item) {
    var ui = getUiLabels();
    if (!item.children || !item.children.length) {
      return (
        '<a href="' +
        escapeHtml(item.href) +
        '"' +
        activeAttrs(item) +
        '>' +
        escapeHtml(item.label) +
        '</a>'
      );
    }

    return (
      '<div class="om-nav-dropdown' +
      (isItemActive(item) ? ' is-active' : '') +
      '" data-om-nav-dropdown>' +
        '<div class="om-nav-dropdown__trigger" role="presentation">' +
          '<a href="' +
          escapeHtml(item.href) +
          '" class="om-nav-dropdown__label-link"' +
          (isItemActive(item) ? ' aria-current="page"' : '') +
          '>' +
          escapeHtml(item.label) +
          '</a>' +
          '<button type="button" class="om-nav-dropdown__toggle" aria-haspopup="true" aria-expanded="false" aria-label="' +
          ui.openMenu +
          escapeHtml(item.label) +
          '">' +
          '<span class="om-nav-dropdown__chevron" aria-hidden="true">▾</span>' +
          '</button>' +
        '</div>' +
        '<div class="om-nav-dropdown__menu om-nav-dropdown__menu--flat" role="menu">' +
          item.children.map(function (child) {
            return renderDesktopChild(child, false);
          }).join('') +
        '</div>' +
      '</div>'
    );
  }

  function renderMobileExpandIcon() {
    return (
      '<span class="mv-chrome__expand-icon" aria-hidden="true"><span></span><span></span></span>'
    );
  }

  function renderMobileChildren(children, nested) {
    var ui = getUiLabels();
    return children
      .map(function (child) {
        if (child.children && child.children.length) {
          return (
            '<li class="mv-chrome__menu-subitem mv-chrome__menu-subitem--expandable">' +
              '<div class="mv-chrome__menu-subitem-row">' +
                '<a href="' +
                escapeHtml(child.href) +
                '" class="cinematic-menu-sublink">' +
                escapeHtml(child.label) +
                '</a>' +
                '<button type="button" class="mv-chrome__expand-btn mv-chrome__expand-btn--nested" aria-expanded="false" aria-label="' + ui.show +
                escapeHtml(child.label) +
                '">' +
                renderMobileExpandIcon() +
                '</button>' +
              '</div>' +
              '<div class="mv-chrome__submenu mv-chrome__submenu--nested" hidden>' +
                '<ul>' +
                  child.children
                    .map(function (grand) {
                      return (
                        '<li><a href="' +
                        escapeHtml(grand.href) +
                        '" class="cinematic-menu-sublink cinematic-menu-sublink--nested">' +
                        escapeHtml(grand.label) +
                        '</a></li>'
                      );
                    })
                    .join('') +
                '</ul>' +
              '</div>' +
            '</li>'
          );
        }

        return (
          '<li><a href="' +
          escapeHtml(child.href) +
          '" class="cinematic-menu-sublink' +
          (nested ? ' cinematic-menu-sublink--nested' : '') +
          '">' +
          escapeHtml(child.label) +
          '</a></li>'
        );
      })
      .join('');
  }

  function renderMobileItem(item) {
    var ui = getUiLabels();
    if (!item.children || !item.children.length) {
      return (
        '<li class="cinematic-menu-item mv-chrome__menu-item">' +
          '<a href="' +
          escapeHtml(item.href) +
          '" class="cinematic-menu-link">' +
          escapeHtml(item.label) +
          '</a>' +
        '</li>'
      );
    }

    return (
      '<li class="cinematic-menu-item mv-chrome__menu-item mv-chrome__menu-item--expandable">' +
        '<div class="mv-chrome__menu-item-row">' +
          '<a href="' +
          escapeHtml(item.href) +
          '" class="cinematic-menu-link">' +
          escapeHtml(item.label) +
          '</a>' +
          '<button type="button" class="mv-chrome__expand-btn" aria-expanded="false" aria-label="' + ui.show +
          escapeHtml(item.label) +
          '">' +
          renderMobileExpandIcon() +
          '</button>' +
        '</div>' +
        '<div class="mv-chrome__submenu" hidden>' +
          '<ul>' +
            renderMobileChildren(item.children, false) +
          '</ul>' +
        '</div>' +
      '</li>'
    );
  }

  function renderDesktopNav(nav) {
    MENU = getMenu();
    nav.innerHTML = MENU.map(renderDesktopItem).join('');
  }

  function renderMobileNav(list) {
    MENU = getMenu();
    list.innerHTML = MENU.map(renderMobileItem).join('');
  }

  function closeDesktopDropdowns(except) {
    document.querySelectorAll('[data-om-nav-dropdown].is-open').forEach(function (dropdown) {
      if (except && dropdown === except) return;
      dropdown.classList.remove('is-open');
      var toggle = dropdown.querySelector('.om-nav-dropdown__toggle');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
  }

  function getDropdownToggle(dropdown) {
    return dropdown.querySelector('.om-nav-dropdown__toggle') || dropdown.querySelector('.om-nav-dropdown__trigger');
  }

  function initDesktopDropdowns() {
    var closeTimers = new WeakMap();
    var CLOSE_DELAY = 220;
    var desktopHoverMq = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 768px)');

    document.querySelectorAll('[data-om-nav-dropdown]').forEach(function (dropdown) {
      if (dropdown.getAttribute('data-om-nav-init') === 'true') return;
      dropdown.setAttribute('data-om-nav-init', 'true');

      var toggle = getDropdownToggle(dropdown);
      var menu = dropdown.querySelector('.om-nav-dropdown__menu');
      if (!toggle) return;

      function open() {
        clearTimeout(closeTimers.get(dropdown));
        closeDesktopDropdowns(dropdown);
        dropdown.classList.add('is-open');
        toggle.setAttribute('aria-expanded', 'true');
      }

      function close() {
        clearTimeout(closeTimers.get(dropdown));
        dropdown.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }

      function scheduleClose() {
        clearTimeout(closeTimers.get(dropdown));
        closeTimers.set(
          dropdown,
          window.setTimeout(function () {
            close();
          }, CLOSE_DELAY)
        );
      }

      function cancelClose() {
        clearTimeout(closeTimers.get(dropdown));
      }

      toggle.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (dropdown.classList.contains('is-open')) {
          close();
        } else {
          open();
        }
      });

      function bindDesktopHover(target) {
        if (!target) return;
        target.addEventListener('mouseenter', function () {
          if (!desktopHoverMq.matches) return;
          cancelClose();
          open();
        });
        target.addEventListener('mouseleave', function () {
          if (!desktopHoverMq.matches) return;
          scheduleClose();
        });
      }

      bindDesktopHover(dropdown);
      bindDesktopHover(menu);

      toggle.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') close();
      });
    });

    document.addEventListener('click', function (event) {
      if (!event.target.closest('[data-om-nav-dropdown]')) {
        closeDesktopDropdowns();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeDesktopDropdowns();
    });

    window.addEventListener(
      'scroll',
      function () {
        closeDesktopDropdowns();
      },
      { passive: true, capture: true }
    );
  }

  function animateSubmenu(sub, expanded) {
    if (typeof gsap !== 'undefined') {
      gsap.to(sub, {
        height: expanded ? 'auto' : 0,
        opacity: expanded ? 1 : 0,
        duration: 0.45,
        ease: 'power2.inOut',
      });
      return;
    }

    sub.style.height = expanded ? 'auto' : '0';
    sub.style.opacity = expanded ? '1' : '0';
  }

  function bindMobileExpandButtons(root) {
    root.querySelectorAll('.mv-chrome__expand-btn').forEach(function (btn) {
      if (btn.getAttribute('data-om-expand-init') === 'true') return;
      btn.setAttribute('data-om-expand-init', 'true');

      btn.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();

        var item = btn.closest('.mv-chrome__menu-item, .mv-chrome__menu-subitem');
        var sub = item && item.querySelector(':scope > .mv-chrome__submenu');
        if (!sub) return;

        var expanded = item.classList.toggle('is-expanded');
        btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        sub.hidden = false;
        animateSubmenu(sub, expanded);
      });
    });
  }

  function fixAccessLinks() {
    var locale = detectMenuLocale();
    var accessHref =
      locale === 'en'
        ? '/en/contact/'
        : locale === 'it'
          ? '/it/contatto/'
          : locale === 'nl'
            ? '/nl/contact/'
            : '/contact/';
    var selectors = [
      '.om-header__access-btn',
      '.mav-hero__button--primary',
      '.om-private-access-popup__button',
      '.om-featured-projects__intro-action .om-button--dark',
    ];

    selectors.forEach(function (selector) {
      document.querySelectorAll(selector).forEach(function (link) {
        var href = link.getAttribute('href');
        if (!href || href === '' || href === '#' || href === '#callback-modal') {
          link.setAttribute('href', accessHref);
        }
      });
    });
  }

  function renderNav() {
    var chrome = document.querySelector('[data-mv-chrome]');
    if (!chrome) return;

    var desktopNavs = chrome.querySelectorAll('.om-header__nav');
    var mobileLists = chrome.querySelectorAll('[data-mv-menu-items]');

    desktopNavs.forEach(renderDesktopNav);
    mobileLists.forEach(renderMobileNav);

    initDesktopDropdowns();
    bindMobileExpandButtons(chrome);
    fixAccessLinks();

    document.dispatchEvent(new CustomEvent('om-nav-rendered'));
  }

  window.__omNavMenuRender = renderNav;

  function bootNav() {
    renderNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootNav);
  } else {
    bootNav();
  }

  document.addEventListener('om-nav-boot', bootNav);
})();
