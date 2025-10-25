const navToggle = document.querySelector('.nav__toggle');
const navLinks = document.querySelector('.nav__links');
const galleryTrack = document.querySelector('.gallery__track');
const galleryButtons = document.querySelectorAll('.gallery__btn');
const sections = document.querySelectorAll('section');
const observerOptions = {
  threshold: 0.1,
};

let currentSlide = 0;
const totalSlides = galleryTrack ? galleryTrack.children.length : 0;

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navLinks.classList.toggle('is-open');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

if (galleryButtons.length && totalSlides) {
  galleryButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const direction = button.dataset.direction;
      if (direction === 'next') {
        currentSlide = (currentSlide + 1) % totalSlides;
      } else {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      }
      const offset = currentSlide * 100;
      galleryTrack.style.transform = `translateX(-${offset}%)`;
    });
  });
}

const handleIntersection = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
};

const observer = new IntersectionObserver(handleIntersection, observerOptions);

sections.forEach((section) => {
  section.classList.add('will-fade');
  observer.observe(section);
});

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  const floaters = document.createElement('div');
  floaters.className = 'floating-stars';
  floaters.innerHTML = `
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  `;
  document.body.appendChild(floaters);
}
