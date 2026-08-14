const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');

const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 24);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.setAttribute('aria-label', open ? 'Abrir menu' : 'Fechar menu');
  navLinks.classList.toggle('open', !open);
});

navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  navLinks.classList.remove('open');
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
document.querySelector('#year').textContent = new Date().getFullYear();

const tickerTrack = document.querySelector('.ticker-track');
const tickerGroup = tickerTrack?.querySelector('.ticker-group');

if (tickerTrack && tickerGroup) {
  const originalItems = [...tickerGroup.children].map((item) => item.cloneNode(true));

  while (tickerGroup.scrollWidth < window.innerWidth + 80) {
    originalItems.forEach((item) => {
      const clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      tickerGroup.appendChild(clone);
    });
  }

  const duplicateGroup = tickerGroup.cloneNode(true);
  duplicateGroup.setAttribute('aria-hidden', 'true');
  tickerTrack.appendChild(duplicateGroup);
}
