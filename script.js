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
    galerieToggle.textContent = show ? 'Voir moins de photos ↑' : 'Voir 5 photos supplémentaires →';
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
document.querySelectorAll('.exp-card,.cible-card,.stat-card,.outil-pill,.mstat,.mcard,.terrain-card,.galerie-item,.reseau-panel,.faq-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// Formspree handler
async function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = document.getElementById('submitBtn');
  btn.textContent = 'Envoi en cours...';
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
      btn.textContent = '✉ Envoyer le message';
      btn.disabled = false;
      alert('Une erreur est survenue. Contactez-moi directement : alexis.camand@littor-eau.fr');
    }
  } catch (error) {
    btn.textContent = '✉ Envoyer le message';
    btn.disabled = false;
    alert('Une erreur est survenue. Contactez-moi directement : alexis.camand@littor-eau.fr');
  }
}

// Consentement cookies : Google Analytics ne se charge qu'après acceptation
const GA_MEASUREMENT_ID = 'G-VJ692FHVEL';

function loadGoogleAnalytics() {
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
  document.head.appendChild(script);
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID);
}

const cookieBanner = document.getElementById('cookieBanner');
const cookieAccept = document.getElementById('cookieAccept');
const cookieRefuse = document.getElementById('cookieRefuse');
let cookieChoice = null;
try { cookieChoice = localStorage.getItem('cookieConsent'); } catch (e) {}

if (cookieChoice === 'accepted') {
  loadGoogleAnalytics();
} else if (cookieChoice !== 'refused' && cookieBanner) {
  cookieBanner.style.display = 'flex';
}

if (cookieAccept) {
  cookieAccept.addEventListener('click', () => {
    try { localStorage.setItem('cookieConsent', 'accepted'); } catch (e) {}
    loadGoogleAnalytics();
    cookieBanner.style.display = 'none';
  });
}
if (cookieRefuse) {
  cookieRefuse.addEventListener('click', () => {
    try { localStorage.setItem('cookieConsent', 'refused'); } catch (e) {}
    cookieBanner.style.display = 'none';
  });
}
