(function () {
  var menuButton = document.querySelector('[data-menu-toggle]');
  var mobileMenu = document.querySelector('[data-mobile-menu]');
  var yearElements = document.querySelectorAll('[data-year]');

  yearElements.forEach(function (element) {
    element.textContent = new Date().getFullYear();
  });

  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('is-open');
      document.body.classList.toggle('menu-open', isOpen);
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
      menuButton.textContent = isOpen ? '×' : '☰';
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('is-open');
        document.body.classList.remove('menu-open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Open navigation menu');
        menuButton.textContent = '☰';
      });
    });
  }

  var lightbox = document.querySelector('[data-lightbox]');
  if (lightbox) {
    var lightboxImage = lightbox.querySelector('img');
    var lightboxCaption = lightbox.querySelector('[data-lightbox-caption]');
    var closeButton = lightbox.querySelector('[data-lightbox-close]');

    function closeLightbox() {
      lightbox.hidden = true;
      document.body.classList.remove('menu-open');
    }

    document.querySelectorAll('[data-gallery-image]').forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        lightboxImage.src = trigger.dataset.image;
        lightboxImage.alt = trigger.dataset.alt || '';
        lightboxCaption.textContent = trigger.dataset.label || 'Image preview';
        lightbox.hidden = false;
        document.body.classList.add('menu-open');
      });
    });

    closeButton.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (event) {
      if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !lightbox.hidden) closeLightbox();
    });
  }
}());
