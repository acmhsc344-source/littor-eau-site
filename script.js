// Quick-select "objet" chips
const objetSelect = document.getElementById('objetSelect');
const objetChips = document.querySelectorAll('.objet-chip');
objetChips.forEach(chip => {
  chip.addEventListener('click', () => {
    objetChips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    if (objetSelect) objetSelect.value = chip.dataset.value;
  });
});

const nav = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
  if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 800);
  if (scrollProgress) {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
    scrollProgress.style.width = pct + '%';
  }
});
if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Menu mobile : ouverture/fermeture du hamburger
const navToggle = document.getElementById('navToggle');
const navLinksMobile = document.getElementById('navLinksMobile');
if (navToggle && navLinksMobile) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinksMobile.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
    navToggle.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
  });
  navLinksMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinksMobile.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Ouvrir le menu');
    });
  });
}

// Galerie : afficher/masquer les 5 photos supplémentaires
const galerieToggle = document.getElementById('galerieToggle');
const galerieMore = document.getElementById('galerieMore');
if (galerieToggle && galerieMore) {
  galerieToggle.addEventListener('click', () => {
    const show = galerieMore.style.display !== 'grid';
    galerieMore.style.display = show ? 'grid' : 'none';
    galerieToggle.textContent = show ? 'Voir moins de photos' : 'Voir 5 photos supplémentaires';
    galerieToggle.setAttribute('aria-expanded', String(show));
    if (show) {
      galerieMore.querySelectorAll('.galerie-item').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    }
  });
}

// Scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, {threshold: 0.08});
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion) document.querySelectorAll('.exp-card,.cible-card,.stat-card,.outil-pill,.mstat,.mcard,.terrain-card,.galerie-item,.reseau-panel,.faq-item,.ref-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// Message d'erreur affiché sous le bouton, lu par les lecteurs d'écran
function showFormError(btn) {
  btn.textContent = 'Envoyer le message';
  btn.disabled = false;
  const err = document.getElementById('formError');
  if (err) err.textContent = "Le message n'est pas parti. Réessayez, ou écrivez directement à alexis.camand@littor-eau.fr.";
}

// Formspree handler
async function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = document.getElementById('submitBtn');
  btn.textContent = 'Envoi en cours…';
  const err = document.getElementById('formError');
  if (err) err.textContent = '';
  btn.disabled = true;

  const data = new FormData(form);

  try {
    const response = await fetch('https://formspree.io/f/mbdpkerl', {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      form.style.display = 'none';
      document.getElementById('formSuccess').style.display = 'block';
    } else {
      showFormError(btn);
    }
  } catch (error) {
    showFormError(btn);
  }
}

// Consentement cookies (recommandations CNIL) :
// - Google Analytics ne se charge qu'après « Accepter » ;
// - refuser est aussi simple qu'accepter ;
// - le choix est gardé 6 mois, puis redemandé ;
// - « Gérer les cookies » (pied de page) permet de changer d'avis à tout moment.
const GA_MEASUREMENT_ID = 'G-VJ692FHVEL';
const CONSENT_KEY = 'cookieConsent';
const CONSENT_MAX_AGE = 182 * 24 * 60 * 60 * 1000; // environ 6 mois

function loadGoogleAnalytics() {
  if (window.__gaLoaded) return;
  window.__gaLoaded = true;
  window['ga-disable-' + GA_MEASUREMENT_ID] = false;
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
  document.head.appendChild(script);
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  // Mesure d'audience seulement : pas de signaux publicitaires ni de personnalisation
  gtag('config', GA_MEASUREMENT_ID, { allow_google_signals: false, allow_ad_personalization_signals: false, cookie_expires: 33696000 }); // 13 mois au plus (CNIL)
}

function stopGoogleAnalytics() {
  window['ga-disable-' + GA_MEASUREMENT_ID] = true;
  // Supprime les cookies _ga déjà déposés, sur le domaine courant et le domaine parent
  const host = location.hostname.replace(/^www\./, '');
  document.cookie.split(';').map(c => c.trim().split('=')[0]).filter(n => /^_ga/.test(n)).forEach(name => {
    [location.hostname, '.' + host, host].forEach(d => {
      document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=' + d;
    });
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  });
}

function readConsent() {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const v = JSON.parse(raw);
    if (!v || !v.choice || Date.now() - v.at > CONSENT_MAX_AGE) return null;
    return v.choice;
  } catch (e) { return null; }
}
function saveConsent(choice) {
  try { localStorage.setItem(CONSENT_KEY, JSON.stringify({ choice, at: Date.now() })); } catch (e) {}
}

const cookieBanner = document.getElementById('cookieBanner');
const cookieAccept = document.getElementById('cookieAccept');
const cookieRefuse = document.getElementById('cookieRefuse');
function showBanner() { if (cookieBanner) { cookieBanner.style.display = 'flex'; (cookieRefuse || cookieAccept)?.focus({ preventScroll: true }); } }
function hideBanner() { if (cookieBanner) cookieBanner.style.display = 'none'; }

const cookieChoice = readConsent();
if (cookieChoice === 'accepted') loadGoogleAnalytics();
else if (cookieChoice !== 'refused' && cookieBanner) cookieBanner.style.display = 'flex';

cookieAccept?.addEventListener('click', () => { saveConsent('accepted'); loadGoogleAnalytics(); hideBanner(); });
cookieRefuse?.addEventListener('click', () => { saveConsent('refused'); stopGoogleAnalytics(); hideBanner(); });
document.querySelectorAll('[data-cookie-manage]').forEach(b => b.addEventListener('click', showBanner));

// Halo qui suit le curseur sur les cartes de l'accueil (effet « spotlight » façon React Bits)
document.querySelectorAll('.refined .terrain-card, .refined .exp-card, .refined .cible-card, .refined .mcard, .ref-card').forEach(card => {
  card.addEventListener('pointermove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    card.style.setProperty('--my', (e.clientY - r.top) + 'px');
  });
});
