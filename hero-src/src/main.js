// Point d'entrée léger : ne charge three.js / React que si l'appareil peut
// afficher du WebGL et que l'utilisateur n'a pas demandé moins d'animations.
const hero = document.getElementById('hero');
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function webglOK() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch (e) {
    return false;
  }
}

// --- Sélection du risque (fonctionne même sans WebGL) ---
const RISKS = ['submersion', 'inondation', 'incendie'];
const lenses = hero ? hero.querySelectorAll('.risk-lens') : [];
let current = hero ? hero.dataset.risk || 'submersion' : 'submersion';
let userPicked = false;

function setRisk(risk, fromUser) {
  if (!hero || !RISKS.includes(risk)) return;
  current = risk;
  if (fromUser) userPicked = true;
  hero.dataset.risk = risk;
  lenses.forEach((l) => l.setAttribute('aria-pressed', String(l.dataset.risk === risk)));
  window.dispatchEvent(new CustomEvent('littoreau:risk', { detail: risk }));
}

lenses.forEach((lens) => {
  const pick = () => setRisk(lens.dataset.risk, true);
  lens.addEventListener('mouseenter', pick);
  lens.addEventListener('focusin', pick);
  lens.addEventListener('click', pick);
});

// Défilement automatique lent tant que le visiteur n'a rien choisi.
if (hero && !reduce) {
  const timer = setInterval(() => {
    if (userPicked || document.hidden) return;
    const i = RISKS.indexOf(current);
    setRisk(RISKS[(i + 1) % RISKS.length], false);
  }, 6500);
  hero.addEventListener('pointerdown', () => clearInterval(timer), { once: true });
}

// --- Effets WebGL, chargés après le premier affichage ---
if (hero && !reduce && webglOK()) {
  const start = () => import('./fx.jsx').then((m) => m.mount(current));
  if ('requestIdleCallback' in window) requestIdleCallback(start, { timeout: 1500 });
  else setTimeout(start, 400);
}
