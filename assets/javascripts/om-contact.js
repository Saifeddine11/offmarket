/* LEGACY: retained for archived contact markup; active routes use the React contact form. */
(function () {
  'use strict';

  var page = document.querySelector('.om-contact-page');
  if (!page) return;

  var tabs = Array.prototype.slice.call(page.querySelectorAll('[data-contact-tab]'));
  var standardForm = page.querySelector('[data-contact-form="standard"]');
  var privateForm = page.querySelector('[data-private-access-form]');
  var standardStatus = page.querySelector('[data-contact-status="standard"]');
  var standardSubmit = page.querySelector('[data-contact-submit="standard"]');
  var message = page.querySelector('[data-contact-message]');
  var yearEl = document.querySelector('[data-mv-year]');
  var visualTitle = page.querySelector('[data-contact-visual-title]');
  var standardShell = page.querySelector('[data-contact-shell="standard"]');
  var privateShell = page.querySelector('[data-contact-shell="private"]');

  var standardCopy = {
    request: {
      button: 'Envoyer la demande',
      placeholder: 'Votre recherche, quartier, budget, calendrier...',
      messageRequired: true,
    },
    callback: {
      button: 'Demander un rappel',
      placeholder: 'Créneau préféré, disponibilité ou précision utile...',
      messageRequired: false,
    },
  };

  function getUrlIntent() {
    return new URLSearchParams(window.location.search).get('intent') || '';
  }

  function isPrivateIntent(intent) {
    return intent === 'off-market' || intent === 'biens-existants';
  }

  function setStatus(el, text, isError) {
    if (!el) return;
    el.textContent = text || '';
    el.classList.toggle('is-error', Boolean(isError));
    el.setAttribute('role', text ? 'alert' : 'status');
  }

  function getActiveType() {
    var active = page.querySelector('[data-contact-tab].is-active');
    return active ? active.getAttribute('data-contact-tab') : 'request';
  }

  function setStandardType(type) {
    var next = standardCopy[type] ? type : 'request';

    tabs.forEach(function (tab) {
      var active = tab.getAttribute('data-contact-tab') === next;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    if (standardSubmit) {
      var label = standardSubmit.querySelector('span:last-child');
      if (label) label.textContent = standardCopy[next].button;
    }

    if (message) {
      message.required = standardCopy[next].messageRequired;
      message.placeholder = standardCopy[next].placeholder;
    }

    setStatus(standardStatus, '', false);
  }

  function setPrivateMode(intent) {
    var privateMode = isPrivateIntent(intent);
    page.classList.toggle('is-private-access', privateMode);

    if (standardShell) standardShell.hidden = privateMode;
    if (privateShell) privateShell.hidden = !privateMode;

    if (privateForm) {
      var intentValue =
        intent === 'biens-existants' ? 'biens-existants' : 'contact-off-market';
      privateForm.setAttribute('data-form-intent', 'from-url');
      var intentInput = privateForm.querySelector('[data-private-intent]');
      if (intentInput) intentInput.value = intentValue;
      if (window.OMPrivateAccessForm) {
        window.OMPrivateAccessForm.populateSelects(privateForm);
      }
    }

    if (visualTitle) {
      visualTitle.innerHTML = privateMode
        ? 'Accès<br>off-market'
        : 'Demander<br>l\'accès';
    }

    if (privateMode) {
      var anchor = document.getElementById('off-market-access');
      if (anchor) {
        requestAnimationFrame(function () {
          anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }
    }
  }

  function submitStandardForm(event) {
    event.preventDefault();

    if (!standardForm.checkValidity()) {
      standardForm.reportValidity();
      return;
    }

    setStatus(
      standardStatus,
      'Merci. Votre demande a bien été prise en compte. OFF MARKET vous contactera rapidement.',
      false
    );
    standardForm.reset();
    setStandardType(getActiveType());
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      setStandardType(tab.getAttribute('data-contact-tab'));
      tab.blur();
    });
  });

  if (standardForm) {
    standardForm.addEventListener('submit', submitStandardForm);
  }

  setPrivateMode(getUrlIntent());
  setStandardType(getActiveType());

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
})();
