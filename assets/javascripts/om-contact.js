(function () {
  'use strict';

  var page = document.querySelector('.om-contact-page');
  if (!page) return;

  var tabs = Array.prototype.slice.call(page.querySelectorAll('[data-contact-tab]'));
  var submit = page.querySelector('.om-contact-submit');
  var form = page.querySelector('.om-contact-form');
  var status = page.querySelector('.om-contact-status');
  var message = page.querySelector('[data-contact-message]');
  var yearEl = document.querySelector('[data-mv-year]');

  var copy = {
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

  function getActiveType() {
    var active = page.querySelector('[data-contact-tab].is-active');
    return active ? active.getAttribute('data-contact-tab') : 'request';
  }

  function setStatus(text) {
    if (status) status.textContent = text || '';
  }

  function setType(type) {
    var next = copy[type] ? type : 'request';

    tabs.forEach(function (tab) {
      var active = tab.getAttribute('data-contact-tab') === next;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    if (submit) submit.textContent = copy[next].button;

    if (message) {
      message.required = copy[next].messageRequired;
      message.placeholder = copy[next].placeholder;
    }

    setStatus('');
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      setType(tab.getAttribute('data-contact-tab'));
      tab.blur();
    });
  });

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var activeType = getActiveType();
      setStatus('Merci. Votre demande a bien été prise en compte. OFF MARKET vous contactera rapidement.');
      form.reset();
      setType(activeType);

      if (status) {
        status.textContent = 'Merci. Votre demande a bien été prise en compte. OFF MARKET vous contactera rapidement.';
      }
    });
  }

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  setType(getActiveType());
})();
