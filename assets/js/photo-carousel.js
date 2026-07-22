// Drives every .photo-carousel on the page: click-through prev/next controls
// plus autoplay every 10s, paused while hovered, focused, or a video slide
// is playing, and restarted after a manual navigation.
(function () {
  var AUTO_MS = 10000;
  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initCarousel(root) {
    var track = root.querySelector('.photo-carousel-track');
    var slides = Array.prototype.slice.call(root.querySelectorAll('.photo-carousel-slide'));
    var prevBtn = root.querySelector('.photo-carousel-prev');
    var nextBtn = root.querySelector('.photo-carousel-next');
    if (!track || slides.length < 2 || !prevBtn || !nextBtn) return;

    var index = 0;
    var timer = null;
    var videoPlaying = false;

    function render() {
      track.style.transform = 'translateX(-' + (index * 100) + '%)';
    }

    // A video left behind on a slide that's no longer showing must not go
    // on playing (and making noise) out of view.
    function pauseInactiveVideos() {
      slides.forEach(function (slide, i) {
        if (i === index) return;
        Array.prototype.forEach.call(slide.querySelectorAll('video'), function (video) {
          if (!video.paused) video.pause();
        });
      });
    }

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      render();
      pauseInactiveVideos();
    }

    function stopAuto() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    function startAuto() {
      stopAuto();
      if (reduceMotion || videoPlaying) return;
      timer = window.setInterval(function () { goTo(index + 1); }, AUTO_MS);
    }

    function manualNav(delta) {
      goTo(index + delta);
      startAuto();
    }

    nextBtn.addEventListener('click', function () { manualNav(1); });
    prevBtn.addEventListener('click', function () { manualNav(-1); });

    root.addEventListener('mouseenter', stopAuto);
    root.addEventListener('mouseleave', startAuto);
    root.addEventListener('focusin', stopAuto);
    root.addEventListener('focusout', function (event) {
      if (!root.contains(event.relatedTarget)) startAuto();
    });

    Array.prototype.forEach.call(root.querySelectorAll('video'), function (video) {
      video.addEventListener('play', function () {
        videoPlaying = true;
        stopAuto();
      });
      video.addEventListener('pause', function () {
        videoPlaying = false;
        startAuto();
      });
      video.addEventListener('ended', function () {
        videoPlaying = false;
        startAuto();
      });
    });

    render();
    startAuto();
  }

  document.addEventListener('DOMContentLoaded', function () {
    Array.prototype.forEach.call(document.querySelectorAll('.photo-carousel'), initCarousel);
  });
}());
