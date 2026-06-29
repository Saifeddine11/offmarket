/**
 * Mavericks — defer non-hero autoplay videos until near viewport
 */
(function () {
  'use strict';

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
