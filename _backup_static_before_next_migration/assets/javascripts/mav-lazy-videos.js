/**
 * Mavericks — defer non-hero autoplay videos until near viewport
 * + hero inline autoplay fallback for mobile Safari
 */
(function () {
  'use strict';

  var BLOCKED_CLASS = 'hero-video-autoplay-blocked';

  function initHeroVideo() {
    var video = document.querySelector('.mav-hero__video, [data-hero-video]');
    if (!video || video.dataset.heroVideoBound === 'true') return;

    video.dataset.heroVideoBound = 'true';
    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.removeAttribute('controls');
    if (!video.getAttribute('preload') || video.getAttribute('preload') === 'auto') {
      video.preload = 'metadata';
    }

    function markAutoplayBlocked() {
      document.documentElement.classList.add(BLOCKED_CLASS);
    }

    function markAutoplayPlaying() {
      document.documentElement.classList.remove(BLOCKED_CLASS);
    }

    function tryPlay() {
      var promise = video.play();
      if (promise && typeof promise.then === 'function') {
        promise
          .then(function () {
            markAutoplayPlaying();
          })
          .catch(function () {
            markAutoplayBlocked();
          });
        return;
      }

      if (video.paused) {
        markAutoplayBlocked();
      } else {
        markAutoplayPlaying();
      }
    }

    function retryOnGesture() {
      if (!video.paused) return;
      tryPlay();
    }

    document.addEventListener('touchstart', retryOnGesture, { once: true, passive: true, capture: true });
    document.addEventListener('scroll', retryOnGesture, { once: true, passive: true, capture: true });

    video.addEventListener('loadeddata', tryPlay, { once: true });
    video.addEventListener('canplay', tryPlay, { once: true });

    tryPlay();

    document.addEventListener(
      'visibilitychange',
      function () {
        if (!document.hidden && video.paused) {
          tryPlay();
        }
      },
      { passive: true }
    );
  }

  function initLazyVideos() {
    var videos = document.querySelectorAll('video:not(.mav-hero__video)');

    if (!videos.length) return;

    videos.forEach(function (video) {
      if (video.dataset.lazyVideoBound === 'true') return;

      video.dataset.lazyVideoBound = 'true';
      video.preload = 'none';

      if (!video.paused) {
        video.pause();
      }
    });

    if (!('IntersectionObserver' in window)) {
      videos.forEach(function (video) {
        video.play().catch(function () {});
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var video = entry.target;

          if (entry.isIntersecting) {
            if (video.readyState < 1) {
              video.load();
            }

            video.play().catch(function () {});
            return;
          }

          video.pause();
        });
      },
      {
        rootMargin: '240px 0px',
        threshold: 0.12
      }
    );

    videos.forEach(function (video) {
      observer.observe(video);
    });
  }

  function boot() {
    initHeroVideo();
    initLazyVideos();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  if (typeof barba !== 'undefined' && barba.hooks && typeof barba.hooks.afterEnter === 'function') {
    barba.hooks.afterEnter(function () {
      initLazyVideos();
    });
  }
})();
