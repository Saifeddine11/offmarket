/**
 * OffMarket — Cinematic scroll-motion video (GSAP ScrollTrigger)
 * GPU transform scroll — scale/opacity/y only, linear scrub mapping.
 */
(function () {
  'use strict';

  var EXPAND_PROGRESS = 0.15;
  var TIMELINE_DURATION = 1;
  var MOBILE_BREAKPOINT = 767;
  var SCRUB_SMOOTHING = 0.7;

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function getContainedFrameMetrics() {
    var vw = window.innerWidth;
    var vh = window.innerHeight;
    var cardW;
    var cardH;

    if (vw <= MOBILE_BREAKPOINT) {
      cardW = vw - 28;
      cardH = vh * 0.72;
    } else {
      cardW = Math.min(vw * 0.86, 1180);
      cardH = Math.min(vh * 0.68, 680);
    }

    return {
      scaleX: cardW / vw,
      scaleY: cardH / vh,
    };
  }

  function setFrameRestState(frame) {
    var metrics = getContainedFrameMetrics();

    gsap.set(frame, {
      width: '100vw',
      height: '100vh',
      scaleX: metrics.scaleX,
      scaleY: metrics.scaleY,
      y: 14,
      transformOrigin: 'center center',
      force3D: true,
    });
  }

  function initCinematicVideo() {
    var section = document.querySelector('.om-cinematic-video');
    if (!section) return;

    var caption = section.querySelector('.om-cinematic-video__caption');
    if (!caption) return;

    if (prefersReducedMotion()) {
      section.classList.add('is-reduced-motion');
      caption.classList.add('is-visible');
      return;
    }

    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      caption.classList.add('is-visible');
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    var frame = section.querySelector('.om-cinematic-video__frame');
    var media = section.querySelector('.om-cinematic-video__media');

    if (!frame || !media) return;

    setFrameRestState(frame);

    gsap.set(media, {
      scale: 1,
      transformOrigin: 'center center',
      force3D: true,
    });

    var holdDuration = TIMELINE_DURATION - EXPAND_PROGRESS;

    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: SCRUB_SMOOTHING,
        pin: false,
        invalidateOnRefresh: true,
        fastScrollEnd: true,
        anticipatePin: 1,
        onRefresh: function () {
          setFrameRestState(frame);
          gsap.set(media, { scale: 1, force3D: true });
        },
        onUpdate: function (self) {
          var expanded = self.progress >= EXPAND_PROGRESS;
          section.classList.toggle('is-expanded', expanded);

          if (expanded) {
            caption.classList.add('is-visible');
          }
        },
      },
    });

    tl.to(
      frame,
      {
        scaleX: 1,
        scaleY: 1,
        y: 0,
        ease: 'none',
        duration: EXPAND_PROGRESS,
        force3D: true,
      },
      0
    );

    tl.to(
      media,
      {
        scale: 1.08,
        ease: 'none',
        duration: EXPAND_PROGRESS,
        force3D: true,
      },
      0
    );

    tl.to(
      media,
      {
        scale: 1.12,
        ease: 'none',
        duration: holdDuration,
        force3D: true,
      },
      EXPAND_PROGRESS
    );

    window.addEventListener(
      'resize',
      function () {
        ScrollTrigger.refresh();
      },
      { passive: true }
    );
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCinematicVideo);
  } else {
    initCinematicVideo();
  }
})();
