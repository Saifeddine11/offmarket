/**
 * Mavericks chrome — menu open/close (GSAP) + expandable submenus.
 * Mirrors mavericks/src/components/cinematic/CinematicChrome.jsx behavior.
 */
(function () {
  'use strict';

  if (typeof gsap === 'undefined') return;

  var chrome = document.querySelector('[data-mv-chrome]');
  if (!chrome) return;

  var backdrop = chrome.querySelector('[data-mv-backdrop]');
  var panel = chrome.querySelector('[data-mv-menu-panel]');
  var menuItems = chrome.querySelector('[data-mv-menu-items]');
  var toggles = chrome.querySelectorAll('[data-mv-menu-toggle]');
  var menuLabel = chrome.querySelector('[data-mv-menu-label]');
  var closeLabel = chrome.querySelector('[data-mv-close-label]');
  var yearEl = document.querySelector('[data-mv-year]');

  var menuOpen = false;

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  function isMobile() {
    return window.matchMedia('(max-width: 767px)').matches;
  }

  function setMenuOpen(open) {
    menuOpen = open;
    chrome.classList.toggle('is-menu-open', open);
    document.body.classList.toggle('menu-open', open);
    document.body.style.overflow = open ? 'hidden' : '';

    if (open) {
      chrome.classList.remove('is-nav-hidden');
    }

    toggles.forEach(function (btn) {
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Close' : 'Menu');
    });

    if (menuLabel && closeLabel) {
      menuLabel.hidden = open;
      closeLabel.hidden = !open;
    }

    if (panel) {
      panel.setAttribute('aria-hidden', open ? 'false' : 'true');
    }

    animateMenu(open);
  }

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  function closeMenu() {
    if (menuOpen) setMenuOpen(false);
  }

  function animateMenu(open) {
    if (!panel || !backdrop) return;

    var items = menuItems ? menuItems.querySelectorAll('.cinematic-menu-item') : [];
    var mobile = isMobile();

    if (open) {
      gsap.set(panel, { visibility: 'visible', pointerEvents: 'auto' });
      backdrop.classList.add('is-open');

      if (mobile) {
        gsap.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power3.out' });
        gsap.fromTo(
          panel,
          { opacity: 0, scale: 0.96, y: 14 },
          { opacity: 1, scale: 1, y: 0, duration: 0.52, ease: 'power3.out' },
        );
      } else {
        gsap.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.4 });
        gsap.fromTo(panel, { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.55, ease: 'power3.out' });
      }

      if (items.length) {
        gsap.fromTo(
          items,
          { opacity: 0, y: mobile ? 14 : 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.48,
            stagger: 0.05,
            delay: mobile ? 0.12 : 0.15,
            ease: 'power2.out',
          },
        );
      }
    } else {
      backdrop.classList.remove('is-open');

      if (mobile) {
        gsap.to(panel, {
          opacity: 0,
          scale: 0.98,
          y: 10,
          duration: 0.38,
          ease: 'power2.in',
          onComplete: function () {
            gsap.set(panel, { visibility: 'hidden', pointerEvents: 'none' });
          },
        });
        gsap.to(backdrop, { opacity: 0, duration: 0.38 });
      } else {
        gsap.to(panel, {
          opacity: 0,
          x: -16,
          duration: 0.35,
          onComplete: function () {
            gsap.set(panel, { visibility: 'hidden', pointerEvents: 'none' });
          },
        });
        gsap.to(backdrop, { opacity: 0, duration: 0.35 });
      }
    }
  }

  toggles.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      toggleMenu();
    });
  });

  if (backdrop) {
    backdrop.addEventListener('click', closeMenu);
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menuOpen) closeMenu();
  });

  chrome.querySelectorAll('.cinematic-menu-link, .cinematic-menu-sublink').forEach(function (link) {
    if (link.getAttribute('data-om-nav-close-bound') === 'true') return;
    link.setAttribute('data-om-nav-close-bound', 'true');
    link.addEventListener('click', function () {
      closeMenu();
    });
  });

  document.addEventListener('om-nav-rendered', function () {
    chrome.querySelectorAll('.cinematic-menu-link, .cinematic-menu-sublink').forEach(function (link) {
      if (link.getAttribute('data-om-nav-close-bound') === 'true') return;
      link.setAttribute('data-om-nav-close-bound', 'true');
      link.addEventListener('click', function () {
        closeMenu();
      });
    });
  });

  chrome.querySelectorAll('.mv-chrome__expand-btn').forEach(function (btn) {
    if (btn.getAttribute('data-om-expand-init') === 'true') return;
    btn.addEventListener('click', function () {
      var item = btn.closest('.mv-chrome__menu-item');
      var sub = item && item.querySelector('.mv-chrome__submenu');
      if (!sub) return;

      var expanded = item.classList.toggle('is-expanded');
      btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      sub.hidden = false;

      gsap.to(sub, {
        height: expanded ? 'auto' : 0,
        opacity: expanded ? 1 : 0,
        duration: 0.45,
        ease: 'power2.inOut',
      });
    });
  });

  function mountChrome() {
    chrome.classList.add('is-mounted');
  }

  function syncHeaderTheme() {
    if (chrome.classList.contains('mv-chrome--page-light')) {
      chrome.classList.remove('mv-chrome--hero', 'mv-chrome--light');
      return;
    }

    var firstSection = document.querySelector('[data-barba="container"] .ui-dark, [data-barba="container"] .ui-light');
    var onHero = !!(firstSection && firstSection.classList.contains('ui-dark'));
    chrome.classList.toggle('mv-chrome--hero', onHero);
    chrome.classList.toggle('mv-chrome--light', onHero);
  }

  function updateHeaderScrollState() {
    var scrollY = window.scrollY || window.pageYOffset || 0;

    if (chrome.classList.contains('mv-chrome--page-light')) {
      chrome.classList.toggle('is-scrolled', scrollY > 120);
      chrome.classList.remove('is-on-light');
      return;
    }

    var onLight = false;
    var featured = document.getElementById('featured-projects');

    if (featured) {
      var rect = featured.getBoundingClientRect();
      if (rect.top < 96 && rect.bottom > 0) {
        onLight = true;
      }
    }

    chrome.classList.toggle('is-scrolled', scrollY > 120);
    chrome.classList.toggle('is-on-light', onLight);
  }

  mountChrome();
  syncHeaderTheme();
  updateHeaderScrollState();

  window.addEventListener('scroll', updateHeaderScrollState, { passive: true });
  window.addEventListener('resize', updateHeaderScrollState);
})();

/**
 * OFF MARKET — lightweight callback modal (all chrome pages).
 */
(function () {
  'use strict';

  function initCallbackModal() {
    var modal = document.getElementById('callback-modal');
    if (!modal || modal.getAttribute('data-om-callback-init') === 'true') return;
    modal.setAttribute('data-om-callback-init', 'true');

    function openModal(event) {
      if (event) event.preventDefault();
      modal.classList.remove('is-hidden');
      modal.setAttribute('aria-hidden', 'false');
      document.documentElement.classList.add('with-modal');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.classList.add('is-hidden');
      modal.setAttribute('aria-hidden', 'true');
      document.documentElement.classList.remove('with-modal');
      document.body.style.overflow = '';
    }

    document.querySelectorAll('a[href="#callback-modal"]').forEach(function (link) {
      link.addEventListener('click', openModal);
    });

    modal.querySelectorAll('.js-modal-close, .modal__background').forEach(function (el) {
      el.addEventListener('click', function (event) {
        event.preventDefault();
        closeModal();
      });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !modal.classList.contains('is-hidden')) {
        closeModal();
      }
    });

    if (window.location.hash === '#callback-modal') {
      openModal();
    }
  }

  function bootCallbackModal() {
    initCallbackModal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootCallbackModal);
  } else {
    bootCallbackModal();
  }
})();

/**
 * OFF MARKET — compact language dropdown (desktop navbar).
 */
(function () {
  'use strict';

  function setActiveLanguage(lang) {
    if (!lang) return;

    document.querySelectorAll('[data-language-dropdown]').forEach(function (dropdown) {
      var current = dropdown.querySelector('.om-language-dropdown__current');
      if (current) current.textContent = lang;

      dropdown.querySelectorAll('.om-language-dropdown__option').forEach(function (option) {
        var isActive = option.getAttribute('data-lang') === lang || option.textContent.trim() === lang;
        option.classList.toggle('is-active', isActive);
        option.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
    });

    document.querySelectorAll('.mv-lang-switcher__btn').forEach(function (btn) {
      var isActive = btn.textContent.trim() === lang;
      btn.classList.toggle('is-active', isActive);
      if (isActive) {
        btn.setAttribute('aria-current', 'true');
      } else {
        btn.removeAttribute('aria-current');
      }
    });
  }

  function initLanguageDropdowns() {
    document.querySelectorAll('[data-language-dropdown]').forEach(function (dropdown) {
      if (dropdown.getAttribute('data-language-init') === 'true') return;
      dropdown.setAttribute('data-language-init', 'true');

      var trigger = dropdown.querySelector('.om-language-dropdown__trigger');
      if (!trigger) return;

      function close() {
        dropdown.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      }

      function open() {
        document.querySelectorAll('[data-language-dropdown].is-open').forEach(function (other) {
          if (other !== dropdown) {
            other.classList.remove('is-open');
            var otherTrigger = other.querySelector('.om-language-dropdown__trigger');
            if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          }
        });
        dropdown.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
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

      dropdown.querySelectorAll('.om-language-dropdown__option').forEach(function (option) {
        option.addEventListener('click', function (event) {
          event.preventDefault();
          var lang = option.getAttribute('data-lang') || option.textContent.trim();
          setActiveLanguage(lang);
          close();
        });
      });

      dropdown.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') close();
      });
    });

    document.addEventListener('click', function (event) {
      if (!event.target.closest('[data-language-dropdown]')) {
        document.querySelectorAll('[data-language-dropdown].is-open').forEach(function (dropdown) {
          dropdown.classList.remove('is-open');
          var trigger = dropdown.querySelector('.om-language-dropdown__trigger');
          if (trigger) trigger.setAttribute('aria-expanded', 'false');
        });
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape') return;
      document.querySelectorAll('[data-language-dropdown].is-open').forEach(function (dropdown) {
        dropdown.classList.remove('is-open');
        var trigger = dropdown.querySelector('.om-language-dropdown__trigger');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      });
    });

    document.querySelectorAll('.mv-lang-switcher__btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setActiveLanguage(btn.textContent.trim());
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguageDropdowns);
  } else {
    initLanguageDropdowns();
  }
})();
