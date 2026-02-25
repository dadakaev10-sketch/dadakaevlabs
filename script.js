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

/* === Contact Form (Formspree) ===
   Schritt 1: Kostenlos registrieren auf https://formspree.io
   Schritt 2: Neues Formular erstellen → Sie erhalten eine ID (z.B. "xpwzabcd")
   Schritt 3: Ihre ID unten eintragen, fertig!
*/
const FORMSPREE_ID = 'mqedwvbb';

const form       = document.getElementById('contact-form');
const submitBtn  = document.getElementById('submit-btn');
const btnLabel   = document.getElementById('btn-label');
const successMsg = document.getElementById('form-success');

if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();

    btnLabel.textContent = 'Wird gesendet...';
    submitBtn.disabled = true;

    // Reply-To automatisch auf Kunden-E-Mail setzen
    const emailInput = form.querySelector('input[name="email"]');
    const replyToField = document.getElementById('replyto-field');
    if (emailInput && replyToField) {
      replyToField.value = emailInput.value;
    }

    const data = new FormData(form);

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        form.reset();
        successMsg.classList.add('show');
        setTimeout(() => successMsg.classList.remove('show'), 7000);
      } else {
        const json = await res.json();
        alert('Fehler beim Senden: ' + (json?.errors?.map(e => e.message).join(', ') || 'Bitte versuchen Sie es erneut.'));
      }
    } catch {
      alert('Verbindungsfehler. Bitte prüfen Sie Ihre Internetverbindung.');
    } finally {
      btnLabel.textContent = 'Kostenlos anfragen →';
      submitBtn.disabled = false;
    }
  });
}
