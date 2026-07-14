/**
 * OFF MARKET — Investment simulator (internal calculation model)
 * Supports one or more [data-simulator] roots per page.
 */
(function () {
  'use strict';

  var global = typeof window !== 'undefined' ? window : {};

  var EUR_RATE = 10.8;

  function detectLocale() {
    var path = window.location.pathname || '/';
    if (path.indexOf('/en') === 0) return 'en';
    if (path.indexOf('/it') === 0) return 'it';
    if (path.indexOf('/nl') === 0) return 'nl';
    return 'fr';
  }

  var LOCALE_COPY = {
    fr: {
      noteText:
        'Estimation indicative. OFF MARKET affine cette simulation avec l\u2019adresse exacte, les charges réelles et les biens disponibles.',
      modes: {
        short: {
          resultSection: 'RÉSULTAT',
          resultLabel: 'RENDEMENT BRUT ANNUEL',
          resultCaption: 'avant charges, fiscalité et frais réels',
          mainIsPercent: true,
        },
        long: {
          resultSection: 'RÉSULTAT',
          resultLabel: 'RENDEMENT BRUT ANNUEL',
          resultCaption: 'avant charges, fiscalité et frais réels',
          mainIsPercent: true,
        },
        resale: {
          resultSection: 'RÉSULTAT',
          resultLabel: 'PLUS-VALUE BRUTE ESTIMÉE',
          resultCaption: '',
          mainIsPercent: false,
        },
      },
      longTermVacancy: '~1 mois / an',
      longTermManagement: 'Oui',
      annualisedAppreciation: 'Valorisation annualisée ',
      yearsSuffix: ' ans',
      weeksSuffix: ' sem.',
      perYearSuffix: ' / an',
      metricIcons: {
        'Revenu brut / an': 'wallet',
        'Nuitées louées': 'calendar',
        'Taux d\u2019occupation choisi': 'gauge',
        'Loyer brut / an': 'wallet',
        'Vacance locative estimée': 'calendar',
        'Gestion OFF MARKET incluse': 'check',
        'Valeur estimée à la sortie': 'trend',
        'Plus-value brute': 'trend',
        Horizon: 'clock',
      },
      metrics: {
        short: {
          grossRevenue: 'Revenu brut / an',
          nightsRented: 'Nuitées louées',
          occupancy: 'Taux d\u2019occupation choisi',
        },
        long: {
          grossRent: 'Loyer brut / an',
          vacancy: 'Vacance locative estimée',
          management: 'Gestion OFF MARKET incluse',
        },
        resale: {
          exitValue: 'Valeur estimée à la sortie',
          capitalGain: 'Plus-value brute',
          horizon: 'Horizon',
        },
      },
    },
    en: {
      noteText:
        'Indicative estimate. OFF MARKET refines this simulation with the exact address, actual charges and available properties.',
      modes: {
        short: {
          resultSection: 'RESULT',
          resultLabel: 'GROSS ANNUAL YIELD',
          resultCaption: 'before charges, taxes and real operating costs',
          mainIsPercent: true,
        },
        long: {
          resultSection: 'RESULT',
          resultLabel: 'GROSS ANNUAL YIELD',
          resultCaption: 'before charges, taxes and real operating costs',
          mainIsPercent: true,
        },
        resale: {
          resultSection: 'RESULT',
          resultLabel: 'ESTIMATED GROSS CAPITAL GAIN',
          resultCaption: '',
          mainIsPercent: false,
        },
      },
      longTermVacancy: '~1 month / year',
      longTermManagement: 'Yes',
      annualisedAppreciation: 'Annualised appreciation ',
      yearsSuffix: ' yrs',
      weeksSuffix: ' wks',
      perYearSuffix: ' / yr',
      metricIcons: {
        'Annual gross revenue': 'wallet',
        'Nights rented per year': 'calendar',
        'Selected occupancy rate': 'gauge',
        'Gross annual rent': 'wallet',
        'Estimated rental vacancy': 'calendar',
        'OFF MARKET management included': 'check',
        'Estimated exit value': 'trend',
        'Gross capital gain': 'trend',
        Horizon: 'clock',
      },
      metrics: {
        short: {
          grossRevenue: 'Annual gross revenue',
          nightsRented: 'Nights rented per year',
          occupancy: 'Selected occupancy rate',
        },
        long: {
          grossRent: 'Gross annual rent',
          vacancy: 'Estimated rental vacancy',
          management: 'OFF MARKET management included',
        },
        resale: {
          exitValue: 'Estimated exit value',
          capitalGain: 'Gross capital gain',
          horizon: 'Horizon',
        },
      },
    },
    it: {
      noteText:
        'Stima indicativa. OFF MARKET affina questa simulazione con l\u2019indirizzo esatto, i costi reali e gli immobili disponibili.',
      modes: {
        short: {
          resultSection: 'RISULTATO',
          resultLabel: 'RENDIMENTO LORDO ANNUO',
          resultCaption: 'prima di spese, fiscalità e costi operativi reali',
          mainIsPercent: true,
        },
        long: {
          resultSection: 'RISULTATO',
          resultLabel: 'RENDIMENTO LORDO ANNUO',
          resultCaption: 'prima di spese, fiscalità e costi operativi reali',
          mainIsPercent: true,
        },
        resale: {
          resultSection: 'RISULTATO',
          resultLabel: 'PLUSVALENZA LORDA STIMATA',
          resultCaption: '',
          mainIsPercent: false,
        },
      },
      longTermVacancy: '~1 mese / anno',
      longTermManagement: 'Sì',
      annualisedAppreciation: 'Plusvalenza annualizzata ',
      yearsSuffix: ' anni',
      weeksSuffix: ' sett.',
      perYearSuffix: ' / anno',
      metricIcons: {
        'Ricavo lordo annuo': 'wallet',
        'Notti affittate all\u2019anno': 'calendar',
        'Tasso di occupazione scelto': 'gauge',
        'Affitto lordo annuo': 'wallet',
        'Vacanza locativa stimata': 'calendar',
        'Gestione OFF MARKET inclusa': 'check',
        'Valore stimato in uscita': 'trend',
        'Plusvalenza lorda': 'trend',
        Orizzonte: 'clock',
      },
      metrics: {
        short: {
          grossRevenue: 'Ricavo lordo annuo',
          nightsRented: 'Notti affittate all\u2019anno',
          occupancy: 'Tasso di occupazione scelto',
        },
        long: {
          grossRent: 'Affitto lordo annuo',
          vacancy: 'Vacanza locativa stimata',
          management: 'Gestione OFF MARKET inclusa',
        },
        resale: {
          exitValue: 'Valore stimato in uscita',
          capitalGain: 'Plusvalenza lorda',
          horizon: 'Orizzonte',
        },
      },
    },
    nl: {
      noteText:
        'Indicatieve schatting. OFF MARKET verfijnt deze simulatie met het exacte adres, de werkelijke kosten en beschikbare woningen.',
      modes: {
        short: {
          resultSection: 'RESULTAAT',
          resultLabel: 'BRUTO HUURRENDEMENT',
          resultCaption: 'vóór kosten, fiscaliteit en werkelijke lasten',
          mainIsPercent: true,
        },
        long: {
          resultSection: 'RESULTAAT',
          resultLabel: 'BRUTO HUURRENDEMENT',
          resultCaption: 'vóór kosten, fiscaliteit en werkelijke lasten',
          mainIsPercent: true,
        },
        resale: {
          resultSection: 'RESULTAAT',
          resultLabel: 'GESCHATTE BRUTO MEERWAARDE',
          resultCaption: '',
          mainIsPercent: false,
        },
      },
      longTermVacancy: '~1 maand / jaar',
      longTermManagement: 'Ja',
      annualisedAppreciation: 'Geannualiseerde waardestijging ',
      yearsSuffix: ' jaar',
      weeksSuffix: ' weken',
      perYearSuffix: ' / jaar',
      metricIcons: {
        'Jaarlijkse huurinkomsten': 'wallet',
        'Verhuurde nachten per jaar': 'calendar',
        'Gekozen bezettingsgraad': 'gauge',
        'Jaarlijkse huurinkomsten': 'wallet',
        'Geschatte huurderving': 'calendar',
        'OFF MARKET beheer inbegrepen': 'check',
        'Geschatte uitstapwaarde': 'trend',
        'Bruto meerwaarde': 'trend',
        Horizon: 'clock',
      },
      metrics: {
        short: {
          grossRevenue: 'Jaarlijkse huurinkomsten',
          nightsRented: 'Verhuurde nachten per jaar',
          occupancy: 'Gekozen bezettingsgraad',
        },
        long: {
          grossRent: 'Jaarlijkse huurinkomsten',
          vacancy: 'Geschatte huurderving',
          management: 'OFF MARKET beheer inbegrepen',
        },
        resale: {
          exitValue: 'Geschatte uitstapwaarde',
          capitalGain: 'Bruto meerwaarde',
          horizon: 'Horizon',
        },
      },
    },
  };

  function getCopy() {
    return LOCALE_COPY[detectLocale()] || LOCALE_COPY.fr;
  }

  var NOTE_TEXT = LOCALE_COPY.fr.noteText;

  var MODES = LOCALE_COPY.fr.modes;

  var DEFAULTS = {
    short: {
      budget: 1500000,
      nightlyRate: 1200,
      personalWeeks: 0,
      occupancy: 70,
    },
    long: {
      budget: 1500000,
      monthlyRent: 18000,
    },
    resale: {
      budget: 1500000,
      resaleHorizonYears: 8,
      annualAppreciationRate: 10,
    },
  };

  var callbackModalBound = false;

  var LONG_TERM_VACANCY_LABEL = LOCALE_COPY.fr.longTermVacancy;
  var LONG_TERM_MANAGEMENT_INCLUDED = LOCALE_COPY.fr.longTermManagement;

  var HOME_METRIC_ICONS = LOCALE_COPY.fr.metricIcons;

  var HOME_ICON_SVG = {
    wallet:
      '<svg viewBox="0 0 24 24" fill="none"><path d="M3 7h15a3 3 0 0 1 3 3v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7Z M17 12h4" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    check:
      '<svg viewBox="0 0 24 24" fill="none"><path d="m5 12.5 4 4 10-9" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    calendar:
      '<svg viewBox="0 0 24 24" fill="none"><path d="M8 2v4M16 2v4M3 9h18M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    gauge:
      '<svg viewBox="0 0 24 24" fill="none"><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z M12 4v2M4.9 7.1l1.4 1.4M4 14h2M19 14h2M17.7 8.5l1.4-1.4" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/></svg>',
    trend:
      '<svg viewBox="0 0 24 24" fill="none"><path d="M4 17 10 11l4 4 6-8M14 7h6v6" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    receipt:
      '<svg viewBox="0 0 24 24" fill="none"><path d="M6 2h12v20l-2-1.5L14 22l-2-1.5L10 22l-2-1.5L6 22V2Z M9 7h6M9 11h6M9 15h4" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/></svg>',
    clock:
      '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.75"/><path d="M12 7v5l3 2" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/></svg>',
  };

  function isHomeSimulator(root) {
    return !!(root && root.closest('.om-simulator--home'));
  }

  function createHomeIcon(className, iconKey) {
    var icon = document.createElement('span');
    icon.className = className;
    icon.setAttribute('aria-hidden', 'true');
    icon.innerHTML = HOME_ICON_SVG[iconKey] || '';
    return icon;
  }

  function formatNumber(value) {
    return Math.round(value)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  function formatDH(value) {
    return formatNumber(value) + ' DH';
  }

  function formatEUR(mad) {
    return '\u2248 ' + formatNumber(mad / EUR_RATE) + ' \u20ac';
  }

  function formatPct(value, decimals) {
    var d = typeof decimals === 'number' ? decimals : 1;
    var sep = detectLocale() === 'en' ? '.' : ',';
    return value.toFixed(d).replace('.', sep) + ' %';
  }

  function formatApproxPct(value, decimals) {
    return '~' + formatPct(value, decimals);
  }

  function toNumber(value) {
    var numeric = Number(value);
    return Number.isFinite(numeric) ? numeric : 0;
  }

  function calcShort(data) {
    var budget = toNumber(data.budget);
    var nightlyRate = toNumber(data.nightlyRate);
    var personalWeeks = toNumber(data.personalWeeks);
    var occupancy = toNumber(data.occupancy);
    var availableDays = Math.max(0, 365 - personalWeeks * 7);
    var nightsRented = Math.floor(availableDays * occupancy / 100);
    var grossAnnualRevenue = Math.round(nightsRented * nightlyRate);
    var grossYield = budget > 0 ? (grossAnnualRevenue / budget) * 100 : 0;

    return {
      nightsRented: nightsRented,
      grossAnnualRevenue: grossAnnualRevenue,
      grossYield: grossYield,
      effectiveOccupancy: occupancy,
    };
  }

  function calcLong(data) {
    var budget = toNumber(data.budget);
    var monthlyRent = toNumber(data.monthlyRent);
    var grossAnnualRent = Math.round(monthlyRent * 12);
    var grossYield = budget > 0 ? (grossAnnualRent / budget) * 100 : 0;

    return {
      grossAnnualRent: grossAnnualRent,
      grossYield: grossYield,
    };
  }

  function calcResale(data) {
    var budget = toNumber(data.budget);
    var holdingYears = Math.max(1, toNumber(data.resaleHorizonYears));
    var appreciationRate = toNumber(data.annualAppreciationRate);
    var exitValue = Math.round(
      budget * Math.pow(1 + appreciationRate / 100, holdingYears)
    );
    var grossCapitalGain = Math.round(exitValue - budget);
    var annualizedReturn = appreciationRate;

    return {
      exitValue: exitValue,
      grossCapitalGain: grossCapitalGain,
      annualizedReturn: annualizedReturn,
      horizonYears: holdingYears,
    };
  }

  function getFieldOptions(fieldEl) {
    return {
      isPercent: fieldEl.getAttribute('data-field-percent') === 'true',
      isYears: fieldEl.getAttribute('data-field-years') === 'true',
      isWeeks: fieldEl.getAttribute('data-field-weeks') === 'true',
      decimals: fieldEl.getAttribute('data-field-decimals')
        ? Number(fieldEl.getAttribute('data-field-decimals'))
        : 0,
    };
  }

  function updateValueDisplay(fieldEl, value, options) {
    var valueEl = fieldEl.querySelector('[data-field-value]');
    var eurEl = fieldEl.querySelector('[data-field-eur]');
    if (!valueEl) return;
    var copy = getCopy();

    if (options && options.isPercent) {
      valueEl.textContent = formatPct(value, options.decimals || 0);
    } else if (options && options.isYears) {
      valueEl.textContent = value + copy.yearsSuffix;
    } else if (options && options.isWeeks) {
      valueEl.textContent = value + copy.weeksSuffix;
    } else {
      valueEl.textContent = formatDH(value);
      if (eurEl) eurEl.textContent = formatEUR(value);
    }
  }

  function appendMetric(container, label, value, opts) {
    opts = opts || {};
    var card = document.createElement('div');
    card.className = 'om-simulator__metric';

    var labelEl = document.createElement('span');
    labelEl.className = 'om-simulator__metric-label';

    var simRoot = container.closest('[data-simulator]');
    var metricIcons = getCopy().metricIcons;
    if (isHomeSimulator(simRoot) && metricIcons[label]) {
      labelEl.classList.add('om-simulator__metric-label--with-icon');
      labelEl.appendChild(createHomeIcon('om-simulator__metric-icon', metricIcons[label]));
      var labelText = document.createElement('span');
      labelText.textContent = label;
      labelEl.appendChild(labelText);
    } else {
      labelEl.textContent = label;
    }

    var valueEl = document.createElement('span');
    valueEl.className =
      'om-simulator__metric-value' + (opts.positive ? ' is-positive' : '');

    if (typeof value === 'string') {
      valueEl.textContent = value;
    } else if (opts.isMoney) {
      valueEl.textContent = formatDH(value);
      var sub = document.createElement('span');
      sub.className = 'om-simulator__metric-sub';
      sub.textContent = formatEUR(value);
      card.appendChild(labelEl);
      card.appendChild(valueEl);
      if (opts.showEur) card.appendChild(sub);
      container.appendChild(card);
      return;
    } else {
      valueEl.textContent = String(value);
    }

    card.appendChild(labelEl);
    card.appendChild(valueEl);
    container.appendChild(card);
  }

  function updateRangeProgress(input) {
    var min = Number(input.min || 0);
    var max = Number(input.max || 100);
    var value = Number(input.value || 0);
    var progress = max === min ? 0 : ((value - min) / (max - min)) * 100;
    input.style.setProperty('--om-range-progress', progress + '%');
  }

  function initSimulator(root) {
    if (!root || root.getAttribute('data-simulator-init') === 'true') return;
    root.setAttribute('data-simulator-init', 'true');

    var state = {
      mode: 'short',
      short: Object.assign({}, DEFAULTS.short),
      long: Object.assign({}, DEFAULTS.long),
      resale: Object.assign({}, DEFAULTS.resale),
    };

    function getActiveState() {
      return state[state.mode];
    }

    function computeResults() {
      var data = getActiveState();
      if (state.mode === 'short') return calcShort(data);
      if (state.mode === 'long') return calcLong(data);
      return calcResale(data);
    }

    function syncPanelFields(mode) {
      var panel = root.querySelector('[data-simulator-panel="' + mode + '"]');
      if (!panel) return;

      panel.querySelectorAll('[data-field]').forEach(function (fieldEl) {
        var key = fieldEl.getAttribute('data-field-key');
        var type = fieldEl.getAttribute('data-field-type');
        var value = state[mode][key];

        if (type === 'range') {
          var input = fieldEl.querySelector('input[type="range"]');
          if (input && value !== undefined) {
            input.value = value;
            updateRangeProgress(input);
            updateValueDisplay(fieldEl, Number(value), getFieldOptions(fieldEl));
          }
        }
      });
    }

    function syncBudget(fromMode) {
      if (fromMode === 'short') {
        state.long.budget = state.short.budget;
        state.resale.budget = state.short.budget;
      } else if (fromMode === 'long') {
        state.short.budget = state.long.budget;
        state.resale.budget = state.long.budget;
      } else {
        state.short.budget = state.resale.budget;
        state.long.budget = state.resale.budget;
      }
      syncPanelFields('short');
      syncPanelFields('long');
      syncPanelFields('resale');
    }

    function renderResults() {
      var results = computeResults();
      var copy = getCopy();
      var modeConfig = copy.modes[state.mode];
      var metrics = copy.metrics;
      var resultsRoot = root.querySelector('[data-simulator-results]');
      if (!resultsRoot) return;

      var sectionEl = resultsRoot.querySelector('[data-result-section-label]');
      var sectionText = resultsRoot.querySelector('[data-result-section-text]');
      var labelEl = resultsRoot.querySelector('[data-result-label]');
      var labelText = resultsRoot.querySelector('[data-result-label-text]');
      var mainEl = resultsRoot.querySelector('[data-result-main]');
      var captionEl = resultsRoot.querySelector('[data-result-caption]');
      var subEl = resultsRoot.querySelector('[data-result-sub]');
      var metricsEl = resultsRoot.querySelector('[data-result-metrics]');

      if (sectionText) sectionText.textContent = modeConfig.resultSection;
      else if (sectionEl) sectionEl.textContent = modeConfig.resultSection;

      if (labelText) labelText.textContent = modeConfig.resultLabel;
      else if (labelEl) labelEl.textContent = modeConfig.resultLabel;

      if (state.mode === 'resale') {
        if (mainEl) {
          mainEl.textContent = formatDH(results.grossCapitalGain);
          mainEl.classList.add('is-money');
        }
        if (subEl) {
          subEl.hidden = false;
          subEl.textContent =
            formatEUR(results.grossCapitalGain) +
            '\n' +
            copy.annualisedAppreciation +
            formatApproxPct(results.annualizedReturn, 1);
        }
        if (captionEl) {
          captionEl.textContent = '';
          captionEl.hidden = true;
        }
      } else {
        if (mainEl) {
          mainEl.textContent = formatPct(results.grossYield, 1);
          mainEl.classList.remove('is-money');
        }
        if (subEl) subEl.hidden = true;
        if (captionEl) {
          captionEl.textContent = modeConfig.resultCaption;
          captionEl.hidden = false;
        }
      }

      if (metricsEl) {
        metricsEl.innerHTML = '';

        if (state.mode === 'short') {
          appendMetric(metricsEl, metrics.short.grossRevenue, results.grossAnnualRevenue, {
            isMoney: true,
            positive: true,
          });
          appendMetric(
            metricsEl,
            metrics.short.nightsRented,
            formatNumber(results.nightsRented) + copy.perYearSuffix,
          );
          appendMetric(
            metricsEl,
            metrics.short.occupancy,
            formatPct(results.effectiveOccupancy, 0),
          );
        } else if (state.mode === 'long') {
          appendMetric(metricsEl, metrics.long.grossRent, results.grossAnnualRent, {
            isMoney: true,
            positive: true,
          });
          appendMetric(
            metricsEl,
            metrics.long.vacancy,
            copy.longTermVacancy,
          );
          appendMetric(
            metricsEl,
            metrics.long.management,
            copy.longTermManagement,
          );
        } else {
          appendMetric(metricsEl, metrics.resale.exitValue, results.exitValue, {
            isMoney: true,
            positive: true,
          });
          appendMetric(metricsEl, metrics.resale.capitalGain, results.grossCapitalGain, {
            isMoney: true,
            positive: true,
          });
          appendMetric(
            metricsEl,
            metrics.resale.horizon,
            results.horizonYears + copy.yearsSuffix,
          );
        }
      }
    }

    function switchMode(nextMode) {
      state.mode = nextMode;

      root.querySelectorAll('[data-simulator-tab]').forEach(function (tab) {
        var active = tab.getAttribute('data-simulator-tab') === nextMode;
        tab.classList.toggle('is-active', active);
        tab.setAttribute('aria-selected', active ? 'true' : 'false');
      });

      root.querySelectorAll('[data-simulator-panel]').forEach(function (panel) {
        var active = panel.getAttribute('data-simulator-panel') === nextMode;
        panel.hidden = !active;
      });

      renderResults();
    }

    function bindRange(fieldEl, mode, key, options) {
      var input = fieldEl.querySelector('input[type="range"]');
      if (!input) return;

      input.value = state[mode][key];
      updateValueDisplay(fieldEl, Number(input.value), options);
      updateRangeProgress(input);

      input.addEventListener('input', function () {
        var value = Number(input.value);
        state[mode][key] = value;
        updateValueDisplay(fieldEl, value, options);
        updateRangeProgress(input);
        if (key === 'budget') syncBudget(mode);
        renderResults();
      });
    }

    function bindPanel(panel) {
      var mode = panel.getAttribute('data-simulator-panel');
      if (!mode || !state[mode]) return;

      panel.querySelectorAll('[data-field]').forEach(function (fieldEl) {
        var type = fieldEl.getAttribute('data-field-type');
        var key = fieldEl.getAttribute('data-field-key');

        if (type === 'range') {
          bindRange(fieldEl, mode, key, getFieldOptions(fieldEl));
        }
      });
    }

    root.querySelectorAll('[data-simulator-panel]').forEach(bindPanel);
    syncPanelFields('short');
    syncPanelFields('long');
    syncPanelFields('resale');

    root.querySelectorAll('input[type="range"]').forEach(function (input) {
      updateRangeProgress(input);
    });

    root.querySelectorAll('[data-simulator-note]').forEach(function (el) {
      el.textContent = getCopy().noteText;
    });

    root.querySelectorAll('[data-simulator-tab]').forEach(function (tab) {
      tab.addEventListener('click', function () {
        switchMode(tab.getAttribute('data-simulator-tab'));
        tab.blur();
      });
    });

    switchMode('short');
  }

  function initCallbackModal() {
    if (callbackModalBound) return;

    var modal = document.getElementById('callback-modal');
    if (!modal) return;

    callbackModalBound = true;

    function openModal(event) {
      if (event) event.preventDefault();
      modal.classList.remove('is-hidden');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.classList.add('is-hidden');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    document.querySelectorAll('a[href="#callback-modal"]').forEach(function (link) {
      if (link.getAttribute('data-simulator-callback-bound') === 'true') return;
      link.setAttribute('data-simulator-callback-bound', 'true');
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

  function init() {
    var roots = document.querySelectorAll('[data-simulator]');
    if (!roots.length) return;

    roots.forEach(initSimulator);
    initCallbackModal();
  }

  global.OM_SIMULATOR_boot = init;

  function shouldDeferBoot() {
    return (
      document.body &&
      document.body.getAttribute('data-om-defer-legacy-boot') === 'true'
    );
  }

  if (!shouldDeferBoot()) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  }
})();
