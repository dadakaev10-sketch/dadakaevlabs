// ===========================
// DADAKAEV LABS – script.js
// ===========================

/* === Navbar scroll === */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* === Hamburger === */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

hamburger.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
});

mobileNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

/* === Scroll Reveal === */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* === Contact Form === */
const form       = document.getElementById('contact-form');
const submitBtn  = document.getElementById('submit-btn');
const btnLabel   = document.getElementById('btn-label');
const successMsg = document.getElementById('form-success');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    btnLabel.textContent = 'Wird gesendet...';
    submitBtn.disabled = true;

    // Simulate send – replace with real backend/API call
    setTimeout(() => {
      form.reset();
      successMsg.classList.add('show');
      btnLabel.textContent = 'Kostenlos anfragen →';
      submitBtn.disabled = false;
      setTimeout(() => successMsg.classList.remove('show'), 7000);
    }, 1200);
  });
}
