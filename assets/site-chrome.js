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
