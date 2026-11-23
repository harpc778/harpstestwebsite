/* Mobile menu toggle for the shared site nav. */
(function () {
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobile-menu');
  if (!hamburger || !mobileMenu) return;

  function setOpen(open) {
    hamburger.classList.toggle('open', open);
    mobileMenu.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  hamburger.addEventListener('click', function () {
    setOpen(!mobileMenu.classList.contains('open'));
  });
  mobileMenu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { setOpen(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      setOpen(false);
      hamburger.focus();
    }
  });
})();

/* Services dropdown: hover/focus open it with CSS; the chevron button
   opens it for touch and keyboard users. */
(function () {
  var dds = document.querySelectorAll('nav#nav .nav-dd');
  if (!dds.length) return;
  function close(dd) {
    dd.classList.remove('open');
    var b = dd.querySelector('.nav-dd-toggle');
    if (b) b.setAttribute('aria-expanded', 'false');
  }
  dds.forEach(function (dd) {
    var btn = dd.querySelector('.nav-dd-toggle');
    if (!btn) return;
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = !dd.classList.contains('open');
      dds.forEach(close);
      dd.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    dd.addEventListener('focusout', function (e) {
      if (!dd.contains(e.relatedTarget)) close(dd);
    });
  });
  document.addEventListener('click', function (e) {
    dds.forEach(function (dd) { if (!dd.contains(e.target)) close(dd); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    dds.forEach(function (dd) {
      if (dd.classList.contains('open') || dd.contains(document.activeElement)) {
        close(dd);
        var b = dd.querySelector('.nav-dd-toggle'); if (b) b.focus();
      }
    });
  });
})();

/* Logo ticker: repeat the logo set until it fills the widest screen,
   then slide by exactly one set so the loop never shows a gap. */
(function () {
  var tracks = document.querySelectorAll('.scroller-track');
  if (!tracks.length) return;

  function setup(track) {
    var items = Array.prototype.slice.call(track.children);
    var set = items;
    var half = items.length / 2;
    if (items.length % 2 === 0 && half > 0) {
      var same = true;
      for (var i = 0; i < half; i++) {
        if (items[i].outerHTML !== items[i + half].outerHTML) { same = false; break; }
      }
      if (same) set = items.slice(0, half);
    }
    var originals = set.map(function (n) { return n.cloneNode(true); });
    var lastWidth = 0;

    function append(hidden) {
      originals.forEach(function (n) {
        var c = n.cloneNode(true);
        if (hidden) {
          c.setAttribute('aria-hidden', 'true');
          Array.prototype.forEach.call(c.querySelectorAll('img'), function (img) { img.alt = ''; });
        }
        track.appendChild(c);
      });
    }

    function build() {
      var vw = window.innerWidth;
      if (vw === lastWidth) return;
      lastWidth = vw;
      track.classList.remove('ticker-js');
      while (track.firstChild) track.removeChild(track.firstChild);
      append(false);
      append(true);
      var setW = track.children[originals.length].offsetLeft - track.children[0].offsetLeft;
      if (setW <= 0) return;
      var copies = Math.max(2, Math.ceil(vw / setW) + 1);
      for (var k = 2; k < copies; k++) append(true);
      track.style.setProperty('--ticker-shift', (-setW) + 'px');
      track.style.setProperty('--ticker-duration', Math.round(setW / 37.5) + 's');
      track.classList.add('ticker-js');
    }

    build();
    var t;
    window.addEventListener('resize', function () { clearTimeout(t); t = setTimeout(build, 200); });
    // Re-measure once logos finish loading (widths can change)
    Array.prototype.forEach.call(track.querySelectorAll('img'), function (img) {
      if (!img.complete) img.addEventListener('load', function () { lastWidth = 0; clearTimeout(t); t = setTimeout(build, 100); }, { once: true });
    });
  }

  function start() { Array.prototype.forEach.call(tracks, setup); }
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start);
})();
