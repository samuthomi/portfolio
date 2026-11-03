import './email';

// Close mobile menu when an anchor nav link is tapped
document.querySelectorAll('.nav-links a[href*="#"]').forEach((link) => {
  link.addEventListener('click', () => {
    document.querySelector('.nav-links')!.classList.remove('open');
    const toggle = document.querySelector('.nav-toggle')!;
    toggle.querySelector('.nav-toggle-label')!.textContent = 'Menu';
    toggle.setAttribute('aria-expanded', 'false');
  });
});

// Section entrance animations
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// Scroll spy: update active nav link
const navLinks = document.querySelectorAll('.nav-links a');
const spyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const activeHref = '/#' + entry.target.id;
        navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === activeHref));
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' },
);
['about', 'work', 'contact'].forEach((id) => {
  const el = document.getElementById(id);
  if (el) spyObserver.observe(el);
});
