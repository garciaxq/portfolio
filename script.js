const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');
const mobileViewport = window.matchMedia('(max-width: 720px)');

document.documentElement.classList.add('js');
menuButton.hidden = false;

function closeMenu(returnFocus = false) {
  menuButton.setAttribute('aria-expanded', 'false');
  navLinks.classList.remove('open');
  if (returnFocus) menuButton.focus();
}

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navLinks.classList.toggle('open', !isOpen);
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => closeMenu());
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu(true);
  }
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.nav')) closeMenu();
});

mobileViewport.addEventListener('change', () => closeMenu());
document.querySelector('#year').textContent = new Date().getFullYear();

if ('IntersectionObserver' in window) {
  const links = [...navLinks.querySelectorAll('a')];
  const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting);
    if (!visible.length) return;
    const currentId = visible[0].target.id;
    links.forEach((link) => {
      if (link.hash === '#' + currentId) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-15% 0px -60% 0px', threshold: 0 });
  document.querySelectorAll('main > section[id]').forEach((section) => observer.observe(section));
  window.addEventListener('scroll', () => {
    if (window.scrollY < 150) links.forEach((link) => link.removeAttribute('aria-current'));
  }, { passive: true });
}
