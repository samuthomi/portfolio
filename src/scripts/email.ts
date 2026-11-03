// Reveal the obfuscated email address.
const el = document.querySelector<HTMLAnchorElement>('.contact-email[data-user]');
if (el) {
  const addr = el.getAttribute('data-user') + '@' + el.getAttribute('data-domain');
  el.href = 'mailto:' + addr;
  el.textContent = addr;
}
