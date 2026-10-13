import { animate, spring, stagger, splitText } from 'animejs';

// Point d'entrée léger : anime.js pour l'interface, three.js / React chargés à part
// seulement si l'appareil gère le WebGL et que l'utilisateur accepte les animations.
const hero = document.getElementById('hero');
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const PAGES = {
  submersion: 'erosion-cotiere.html',
  inondation: 'inondations.html',
  incendie: 'prevention-incendie.html',
};
const RISKS = Object.keys(PAGES);

function webglOK() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch (e) {
    return false;
  }
}

if (hero) {
  const lenses = [...hero.querySelectorAll('.risk-lens')];
  const thumb = hero.querySelector('.risk-thumb');
  const copies = [...hero.querySelectorAll('.risk-copy')];
  const more = hero.querySelector('.risk-more');
  const thumbSpring = spring({ stiffness: 220, damping: 22 });
  let current = hero.dataset.risk || 'submersion';
  let userPicked = false;

  // Curseur en verre sous l'option active
  function placeThumb(instant) {
    const btn = lenses.find((l) => l.dataset.risk === current);
    if (!btn || !thumb) return;
    const to = { x: btn.offsetLeft - 6, width: btn.offsetWidth };
    if (instant || reduce) {
      thumb.style.transform = `translateX(${to.x}px)`;
      thumb.style.width = `${to.width}px`;
    } else {
      animate(thumb, { x: to.x, width: to.width, ease: thumbSpring });
    }
  }

  function setRisk(risk, fromUser) {
    if (!RISKS.includes(risk) || risk === current) {
      if (fromUser) userPicked = true;
      return;
    }
    current = risk;
    if (fromUser) userPicked = true;
    hero.dataset.risk = risk;
    lenses.forEach((l) => l.setAttribute('aria-pressed', String(l.dataset.risk === risk)));
    if (more) more.href = PAGES[risk];
    copies.forEach((c) => {
      const on = c.dataset.risk === risk;
      c.hidden = !on;
      if (on && !reduce) animate(c, { opacity: [0, 1], y: [6, 0], duration: 500, ease: 'outQuad' });
    });
    placeThumb(false);
    window.dispatchEvent(new CustomEvent('littoreau:risk', { detail: risk }));
  }

  lenses.forEach((lens) => lens.addEventListener('click', () => setRisk(lens.dataset.risk, true)));
  // Flèches gauche/droite dans le sélecteur
  hero.querySelector('.risk-switch')?.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const i = RISKS.indexOf(current) + (e.key === 'ArrowRight' ? 1 : -1);
    const next = RISKS[(i + RISKS.length) % RISKS.length];
    setRisk(next, true);
    lenses.find((l) => l.dataset.risk === next)?.focus();
  });

  placeThumb(true);
  window.addEventListener('resize', () => placeThumb(true));
  document.fonts?.ready.then(() => placeThumb(true));

  // Un seul moment animé à l'arrivée : le titre se compose mot par mot.
  const title = hero.querySelector('.hero-title');
  if (title && !reduce) {
    const { words } = splitText(title, { words: { wrap: 'clip', class: 'word' } });
    animate(words, { y: ['110%', '0%'], duration: 900, delay: stagger(70, { start: 150 }), ease: 'outExpo' });
    animate(hero.querySelectorAll('.hero-sub, .risk-switch, .risk-detail, .hero-btns'), {
      opacity: [0, 1],
      y: [14, 0],
      duration: 700,
      delay: stagger(90, { start: 650 }),
      ease: 'outQuad',
    });
  }

  // Défilement lent des trois risques tant que le visiteur n'a rien choisi
  if (!reduce) {
    setInterval(() => {
      if (userPicked || document.hidden) return;
      setRisk(RISKS[(RISKS.indexOf(current) + 1) % RISKS.length], false);
    }, 7000);
  }

  // Effets WebGL, chargés après le premier affichage
  if (!reduce && webglOK()) {
    const start = () => import('./fx.jsx').then((m) => m.mount(current));
    if ('requestIdleCallback' in window) requestIdleCallback(start, { timeout: 1500 });
    else setTimeout(start, 400);
  }
}
