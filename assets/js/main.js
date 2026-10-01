/* Trauma At Work — minimal progressive enhancement. No dependencies. */
(function () {
  var root = document.documentElement;
  root.classList.add('js');

  // Mobile navigation
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = root.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        root.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.querySelectorAll('.has-sub.is-open').forEach(function (li) {
          li.classList.remove('is-open');
          li.querySelector('.nav-btn').setAttribute('aria-expanded', 'false');
        });
      }
    });
  }

  // Dropdown sub-menus (click / keyboard; hover handled in CSS on desktop)
  document.querySelectorAll('.has-sub > .nav-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var li = btn.parentElement;
      var open = li.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  // Gentle fade-in on scroll
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Prototype forms: in Wix these become Wix Forms (Wix Forms app / Wix Forms submissions).
  document.querySelectorAll('form[data-wix-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var note = form.querySelector('.form-note');
      if (note) { note.classList.add('is-visible'); note.focus(); }
    });
  });
})();
