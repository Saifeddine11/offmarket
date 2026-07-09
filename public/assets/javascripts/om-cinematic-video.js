/**
 * OffMarket — Cinematic scroll-motion video (GSAP ScrollTrigger)
 * GPU transform + opacity scroll — soft Framer-like entrance and exit.
 */
(function () {
  'use strict';

  var MOBILE_BREAKPOINT = 767;
  var SCRUB_SMOOTHING = 0.9;
  var EXPAND_PROGRESS = 0.18;

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
      transformOrigin: 'center center',
      force3D: true,
    });
  }

  function setInitialState(section, frame, media, caption) {
    setFrameRestState(frame);

    gsap.set(frame, {
      opacity: 0,
      y: 42,
      force3D: true,
    });

    gsap.set(media, {
      scale: 1.04,
      opacity: 1,
      transformOrigin: 'center center',
      force3D: true,
    });

    gsap.set(caption, {
      opacity: 0,
      y: 24,
      force3D: true,
    });

    section.classList.remove('is-expanded', 'is-exiting');
  }

  function initCinematicVideo() {
    var section = document.querySelector('.om-cinematic-video');
    if (!section) return;

    var frame = section.querySelector('.om-cinematic-video__frame');
    var media = section.querySelector('.om-cinematic-video__media');
    var caption = section.querySelector('.om-cinematic-video__caption');

    if (!frame || !media || !caption) return;

    if (prefersReducedMotion()) {
      section.classList.add('is-reduced-motion');
      gsap.set([frame, media, caption], {
        opacity: 1,
        y: 0,
        scale: 1,
        scaleX: 1,
        scaleY: 1,
        clearProps: 'transform,filter',
      });
      return;
    }

    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      caption.style.opacity = '1';
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    setInitialState(section, frame, media, caption);

    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 72%',
        end: 'bottom top',
        scrub: SCRUB_SMOOTHING,
        pin: false,
        invalidateOnRefresh: true,
        fastScrollEnd: true,
        onRefresh: function () {
          setFrameRestState(frame);
        },
        onUpdate: function (self) {
          section.classList.toggle('is-expanded', self.progress >= EXPAND_PROGRESS);
          section.classList.toggle('is-exiting', self.progress >= 0.75);
        },
      },
    });

    tl.to(
      frame,
      {
        opacity: 1,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        duration: 0.22,
        ease: 'power3.out',
        force3D: true,
      },
      0
    );

    tl.to(
      media,
      {
        scale: 1.11,
        duration: 0.75,
        ease: 'none',
        force3D: true,
      },
      0.08
    );

    tl.to(
      caption,
      {
        opacity: 1,
        y: 0,
        duration: 0.22,
        ease: 'power3.out',
        force3D: true,
      },
      0.28
    );

    tl.to({}, { duration: 0.26 });

    tl.to(
      caption,
      {
        opacity: 0,
        y: -18,
        duration: 0.18,
        ease: 'power2.inOut',
        force3D: true,
      },
      0.78
    );

    tl.to(
      frame,
      {
        opacity: 0,
        y: -36,
        duration: 0.22,
        ease: 'power2.inOut',
        force3D: true,
      },
      0.82
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
