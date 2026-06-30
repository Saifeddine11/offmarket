/**
 * OFF MARKET — Primary navigation (desktop dropdowns + mobile panel)
 */
(function () {
  'use strict';

  var MENU = [
    { id: 'home', label: 'Accueil', href: '/' },
    { id: 'histoire', label: 'Notre Histoire', href: '/#qui-sommes-nous' },
    {
      id: 'localisations',
      label: 'Localisations',
      href: '/#territories',
      children: [
        { label: 'Guéliz hyper-centre', href: '/#territories' },
        { label: 'Triangle d\u2019Or', href: '/#territories' },
        { label: 'Médina', href: '/#territories' },
      ],
    },
    {
      id: 'projets',
      label: 'Nos Projets',
      href: '/#featured-projects',
      children: [
        { label: 'OFF MARKET', href: '/contact/?intent=off-market' },
        {
          label: 'Sur Plan',
          href: '/sur-plan/',
          children: [
            { label: 'Villas', href: '/sur-plan/#villas' },
            { label: 'Appartements', href: '/sur-plan/#appartements' },
          ],
        },
        { label: 'Biens Existants', href: '/contact/?intent=biens-existants' },
      ],
    },
    { id: 'contact', label: 'Contact', href: '/contact/' },
  ];

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

    if (item.id === 'home') {
      return current === '/' && !window.location.hash;
    }

    if (item.id === 'contact') {
      return current === '/contact';
    }

    if (item.id === 'histoire') {
      return current === '/' && window.location.hash === '#qui-sommes-nous';
    }

    if (item.id === 'localisations') {
      return current === '/' && window.location.hash === '#territories';
    }

    if (item.id === 'projets') {
      return (
        current === '/sur-plan' ||
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
        '<button type="button" class="om-nav-dropdown__trigger" aria-haspopup="true" aria-expanded="false">' +
          escapeHtml(item.label) +
          '<span class="om-nav-dropdown__chevron" aria-hidden="true">▾</span>' +
        '</button>' +
        '<div class="om-nav-dropdown__menu" role="menu">' +
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
                '<button type="button" class="mv-chrome__expand-btn mv-chrome__expand-btn--nested" aria-expanded="false" aria-label="Afficher ' +
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
          '<button type="button" class="mv-chrome__expand-btn" aria-expanded="false" aria-label="Afficher ' +
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
    nav.innerHTML = MENU.map(renderDesktopItem).join('');
  }

  function renderMobileNav(list) {
    list.innerHTML = MENU.map(renderMobileItem).join('');
  }

  function closeDesktopDropdowns(except) {
    document.querySelectorAll('[data-om-nav-dropdown].is-open').forEach(function (dropdown) {
      if (except && dropdown === except) return;
      dropdown.classList.remove('is-open');
      var trigger = dropdown.querySelector('.om-nav-dropdown__trigger');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    });
  }

  function initDesktopDropdowns() {
    document.querySelectorAll('[data-om-nav-dropdown]').forEach(function (dropdown) {
      if (dropdown.getAttribute('data-om-nav-init') === 'true') return;
      dropdown.setAttribute('data-om-nav-init', 'true');

      var trigger = dropdown.querySelector('.om-nav-dropdown__trigger');
      if (!trigger) return;

      function open() {
        closeDesktopDropdowns(dropdown);
        dropdown.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }

      function close() {
        dropdown.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      }

      trigger.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (dropdown.classList.contains('is-open')) {
          close();
        } else {
          open();
        }
      });

      dropdown.addEventListener('mouseenter', function () {
        if (window.matchMedia('(min-width: 768px)').matches) open();
      });

      dropdown.addEventListener('mouseleave', function () {
        if (window.matchMedia('(min-width: 768px)').matches) close();
      });

      trigger.addEventListener('keydown', function (event) {
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
    document.querySelectorAll('.om-header__access-btn').forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href || href === '' || href === '#') {
        link.setAttribute('href', '/contact/');
      }
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderNav);
  } else {
    renderNav();
  }
})();
