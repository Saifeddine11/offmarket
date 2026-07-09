/**
 * OFF MARKET — Mobile legacy editorial guard
 * Suppresses heavy #legacy-editorial plugin init below 980px (DOM preserved for desktop).
 */
(function () {
  'use strict';

  var MQ = '(max-width: 979px)';
  var LEGACY_ROOT_ID = 'legacy-editorial';
  var STRIP_ATTRS = [
    'data-plugin',
    'data-scroll',
    'data-scroll-sticky',
    'data-scroll-target',
    'data-scroll-snap-point',
    'data-scroll-section',
    'data-reveal',
    'data-parallax-clamp',
    'data-parallax-enable-mq',
    'data-parallax-measure-selector',
    'data-mouse-animation-use-css-variable',
    'data-mouse-animation-target-selector',
    'data-mouse-animation-multiplier',
  ];

  function isMobileLegacyDisabled() {
    return window.matchMedia(MQ).matches;
  }

  function isInsideLegacyEditorial(node) {
    var root = document.getElementById(LEGACY_ROOT_ID);
    return !!(root && root.contains(node));
  }

  function backupAndStripAttr(node, attr) {
    if (!node.hasAttribute(attr)) return;
    var backupKey = 'data-om-backup-' + attr.slice(5);
    if (!node.hasAttribute(backupKey)) {
      node.setAttribute(backupKey, node.getAttribute(attr));
    }
    node.removeAttribute(attr);
  }

  function stripLegacyEditorialHooks() {
    var root = document.getElementById(LEGACY_ROOT_ID);
    if (!root || root.getAttribute('data-om-legacy-guard') === 'true') return;

    root.setAttribute('data-om-legacy-guard', 'true');
    root.setAttribute('data-om-disabled', 'true');
    root.setAttribute('aria-hidden', 'true');

    STRIP_ATTRS.forEach(function (attr) {
      backupAndStripAttr(root, attr);
    });

    root.querySelectorAll('*').forEach(function (node) {
      STRIP_ATTRS.forEach(function (attr) {
        backupAndStripAttr(node, attr);
      });

      Array.from(node.attributes).forEach(function (attr) {
        if (attr.name.indexOf('data-parallax') === 0) {
          backupAndStripAttr(node, attr.name);
        }
      });
    });
  }

  function setMobileLegacyFlag() {
    document.documentElement.classList.add('om-mobile-legacy-disabled');
    window.__OM_MOBILE_LEGACY_DISABLED__ = true;
  }

  function patchJQueryApp() {
    if (!window.__OM_MOBILE_LEGACY_DISABLED__) return;

    var $ = window.jQuery;
    if (!$ || !$.fn || !$.fn.app || $.fn.app.__omLegacyGuardPatched) return;

    var originalApp = $.fn.app;

    $.fn.app = function appWithLegacyGuard() {
      var $nodes = this;

      if ($nodes && $nodes.length) {
        $nodes = $nodes.filter(function () {
          return !isInsideLegacyEditorial(this);
        });
      }

      if (!$nodes || !$nodes.length) {
        return this;
      }

      return originalApp.apply($nodes, arguments);
    };

    $.fn.app.__omLegacyGuardPatched = true;
    Object.keys(originalApp).forEach(function (key) {
      $.fn.app[key] = originalApp[key];
    });
  }

  function bootstrap() {
    if (!isMobileLegacyDisabled()) {
      window.__OM_MOBILE_LEGACY_DISABLED__ = false;
      return;
    }

    setMobileLegacyFlag();
    stripLegacyEditorialHooks();
  }

  window.omMobileLegacyGuard = {
    bootstrap: bootstrap,
    patchJQueryApp: patchJQueryApp,
    isMobileLegacyDisabled: isMobileLegacyDisabled,
    isInsideLegacyEditorial: isInsideLegacyEditorial,
  };

  bootstrap();
})();
