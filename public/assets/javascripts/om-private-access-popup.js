/**
 * OffMarket — Private access scroll popup (Restaurant card trigger)
 */
(function () {
  'use strict';

  var initialized = false;
  var observer = null;
  var dismissed = false;
  var popup = null;
  var closeBtn = null;
  var hideTimer = null;

  function showPopup() {
    if (!popup || dismissed) return;
    clearTimeout(hideTimer);
    popup.classList.add('is-visible');
    popup.setAttribute('aria-hidden', 'false');
  }

  function hidePopup() {
    if (!popup) return;
    clearTimeout(hideTimer);
    hideTimer = setTimeout(function () {
      popup.classList.remove('is-visible');
      popup.setAttribute('aria-hidden', 'true');
    }, 120);
  }

  function init() {
    var trigger = document.querySelector('.om-project-card--restaurant');
    popup = document.querySelector('.om-private-access-popup');

    if (!trigger || !popup) return;
    if (initialized) return;

    initialized = true;
    closeBtn = popup.querySelector('.om-private-access-popup__close');

    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        dismissed = true;
        hidePopup();
      });
    }

    observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            showPopup();
          } else {
            hidePopup();
          }
        });
      },
      {
        root: null,
        threshold: 0.22,
        rootMargin: '-6% 0px -18% 0px',
      }
    );

    observer.observe(trigger);
  }

  document.addEventListener('om-property-cards-rendered', init);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
