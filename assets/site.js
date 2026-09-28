/* Shared mobile menu behaviour for every page (touch, mouse and keyboard). */
(function () {
  var hamburger = document.getElementById('hamburger');
  var menu = document.getElementById('mobile-menu');
  if (!hamburger || !menu) return;

  function setOpen(open) {
    hamburger.classList.toggle('open', open);
    menu.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  hamburger.addEventListener('click', function () {
    var open = !menu.classList.contains('open');
    setOpen(open);
    if (open) {
      var first = menu.querySelector('a');
      if (first) first.focus();
    }
  });

  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { setOpen(false); });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      setOpen(false);
      hamburger.focus();
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 960 && menu.classList.contains('open')) setOpen(false);
  });
})();
