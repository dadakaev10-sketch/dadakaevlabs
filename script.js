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
  const isOpen = mobileNav.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

mobileNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

/* === Code Typing Animation === */
const CODE_LINES = [
  '<span class="ck">const</span> <span class="cv">developer</span> <span class="cp">= {</span>',
  '  <span class="cv">name</span><span class="cp">:</span>      <span class="cs">"Dadakaev LABS"</span><span class="cp">,</span>',
  '  <span class="cv">stack</span><span class="cp">:</span>     <span class="cp">[</span><span class="cs">"React"</span><span class="cp">,</span> <span class="cs">"Node"</span><span class="cp">,</span> <span class="cs">"TS"</span><span class="cp">],</span>',
  '  <span class="cv">available</span><span class="cp">:</span> <span class="ck">true</span><span class="cp">,</span>',
  '  <span class="cv">passion</span><span class="cp">:</span>   <span class="cs">"∞"</span><span class="cp">,</span>',
  '',
  '  <span class="cv">launch</span><span class="cp">(</span><span class="cv">idea</span><span class="cp">) {</span>',
  '    <span class="cc">// Idee → digitales Produkt</span>',
  '    <span class="ck">return</span> <span class="cv">idea</span>',
  '      <span class="cp">.</span><span class="cv">design</span><span class="cp">()</span>',
  '      <span class="cp">.</span><span class="cv">develop</span><span class="cp">()</span>',
  '      <span class="cp">.</span><span class="cv">deploy</span><span class="cp">();</span>',
  '  <span class="cp">}</span>',
  '<span class="cp">};</span>',
];

function runTypeAnimation() {
  const output = document.getElementById('code-output');
  if (!output) return;

  let lineIndex = 0;

  // Append a blinking caret after the pre
  const caretEl = document.createElement('span');
  caretEl.className = 'caret';
  output.parentNode.appendChild(caretEl);

  function addLine() {
    if (lineIndex >= CODE_LINES.length) {
      caretEl.remove(); // done, hide caret
      return;
    }
    const div = document.createElement('div');
    div.innerHTML = CODE_LINES[lineIndex];
    output.appendChild(div);
    lineIndex++;
    setTimeout(addLine, lineIndex === 1 ? 400 : 110);
  }

  setTimeout(addLine, 600);
}

runTypeAnimation();

/* === Counter Animation === */
function animateCount(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1400;
  const startTime = performance.now();

  function tick(now) {
    const elapsed = now - startTime;
    const t = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3); // ease-out-cubic
    el.textContent = Math.round(eased * target);
    if (t < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.count').forEach(animateCount);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsRow = document.querySelector('.stats-row');
if (statsRow) statsObserver.observe(statsRow);

/* === Scroll Reveal === */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* === Contact Form === */
const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const successMsg = document.getElementById('form-success');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const label = submitBtn.querySelector('.btn-label');
    label.textContent = 'Wird gesendet...';
    submitBtn.disabled = true;

    // Simulate send (replace with real fetch to your backend)
    setTimeout(() => {
      form.reset();
      successMsg.classList.add('show');
      label.textContent = 'Anfrage senden';
      submitBtn.disabled = false;
      setTimeout(() => successMsg.classList.remove('show'), 6000);
    }, 1200);
  });
}
