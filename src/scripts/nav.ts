// Mobile menu toggle and the nav rule that appears once the page scrolls.
const toggle = document.querySelector<HTMLButtonElement>('.nav-toggle');
toggle?.addEventListener('click', () => {
  const isOpen = document.querySelector('.nav-links')!.classList.toggle('open');
  // The contact page's button has no label span and no aria-expanded, as before.
  const label = toggle.querySelector('.nav-toggle-label');
  if (label) {
    label.textContent = isOpen ? 'Close' : 'Menu';
    toggle.setAttribute('aria-expanded', String(isOpen));
  }
});

const nav = document.querySelector('.nav');
const setNavRule = () => nav?.classList.toggle('is-scrolled', window.scrollY > 4);
setNavRule();
window.addEventListener('scroll', setNavRule, { passive: true });
