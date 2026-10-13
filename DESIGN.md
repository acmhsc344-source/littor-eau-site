---
version: 1.0
name: Littoreau-design
description: Système visuel de littor-eau.fr, le site d'Alexis Camand, ingénieur hydraulicien indépendant à Montpellier (risques littoraux, inondation, feux de forêt). Un bleu océan profond pour le fond et l'encre, une seule couleur d'action terre cuite issue de la marque, une typographie unique (Archivo, axe de largeur variable), des photos de terrain réelles. Le ton est celui d'un ingénieur qui rassure et explique, jamais d'un site qui fait peur.

colors:
  ocean: "#0b2c4a"        # titres sur fond clair, surfaces sombres secondaires
  deep: "#081f36"         # fonds sombres (héros, clients, galerie, contact, pied de page)
  ink: "#0d1e28"          # texte très foncé
  body-text: "#3a4e58"    # texte courant sur fond clair
  mist: "#5a7590"         # texte secondaire, métadonnées
  brand-terracotta: "#c85a3c" # terre cuite de la marque (accents, icônes, liens sur fond sombre)
  action: "#b9502f"       # fond des boutons, texte blanc : contraste 4,9:1 (AA)
  action-hover: "#a8492f"
  action-deep: "#a8492f"  # liens sur fond clair, survol
  action-light: "#dd7d5f" # accent sur fond sombre
  off: "#f5f3ef"          # fond clair alterné
  sand: "#e8dcc4"         # bande « boîte à outils »
  white: "#ffffff"
  risk-submersion: ["#0d3f5c", "#2a8fae", "#06182a", "#9fe0e8"]
  risk-inondation: ["#34503d", "#7d7350", "#0b1a22", "#d9c99a"]
  risk-incendie:   ["#6e2414", "#b04a22", "#1e0a06", "#ffb070"]

typography:
  family: "'Archivo', system-ui, sans-serif"   # variable : wdth 62–125, wght 300–800
  display:
    fontSize: "clamp(44px, 4.4vw, 68px)"
    fontWeight: 620
    fontStretch: 112%
    lineHeight: 1.02
    letterSpacing: -0.025em
  h2:
    fontSize: "clamp(28px, 2.9vw, 40px)"   # 21–30 pt
    fontWeight: 620
    fontStretch: 112%
    letterSpacing: -0.02em
  h3: { fontSize: 19px, fontWeight: 620, lineHeight: 1.25 }
  lead: { fontSize: 18px, lineHeight: 1.6, maxWidth: 60ch }
  body: { fontSize: 16px, lineHeight: 1.65, maxWidth: 68ch }
  small: { fontSize: 13.5px }    # plancher absolu : 13 px

rounded:
  card: 16px
  dark-card: 14px
  tag: 999px
  button: 4px

spacing:
  section-y: "70–90px desktop, 60px mobile"
  gutter: "8vw desktop, 6vw mobile"
  card-padding: 24px
  grid-gap: 22px
---

## Vue d'ensemble

Le site doit donner à un gérant de camping, un élu ou un propriétaire l'impression d'avoir trouvé
quelqu'un de sérieux, de terrain, et d'accessible. Trois risques structurent tout : **littoral
(érosion, submersion), inondation, feux de forêt**. Le héros les présente via un sélecteur ; chaque
risque a sa palette (voir `risk-*`) et sa page dédiée.

Règles de ton, décidées avec Alexis :
- Pas de phrase anxiogène (« la mer monte », « disparaîtront sous 10 ans »). On parle de préparation,
  de saison sereine, de décision éclairée.
- Pas de chiffres gonflés (« 15+ », « 40+ rencontres »), pas de compteurs, pas d'emoji.
- Aucune référence inventée. Le client de Villeneuve-Loubet n'est jamais nommé.

## Couleurs

Fond sombre `deep` pour les moments forts (héros, clients, galerie, Marche, contact), fond clair
`white` / `off` pour la lecture. Les sections alternent pour créer le rythme ; deux sections
voisines n'ont jamais le même fond. La couleur `action` est réservée aux boutons et liens d'action.

## Typographie

Une seule famille : Archivo. Les titres utilisent l'axe de largeur (`font-stretch: 112%`) et un
interlettrage serré ; le texte courant reste à largeur normale. Le titre d'accueil tient sur deux
lignes en écran large. Rien de lisible sous 13 px ; texte courant à 16 px minimum.

## Composants

- **Cartes claires** (`.exp-card`, `.terrain-card`, `.ref-card`) : fond blanc, bordure 1 px très
  légère, rayon 16 px, halo qui suit le curseur. Icône Lucide (trait 1,6) dans une tuile de 40 px.
- **Cartes sombres** (`.cible-card`, `.mcard`) : fond translucide sur `deep`. En mobile, format
  liste : icône à gauche, texte à droite.
- **Étiquettes** (`.exp-tag`) : contour fin, casse normale, 13 px.
- **Boutons** : aplat `action` (#b9502f) avec texte blanc, rayon 4 px ; bouton secondaire en contour clair sur fond sombre. Jamais de texte foncé sur la terre cuite (contraste insuffisant).
- **Sélecteur de risque** : verre liquide (filtre SVG `#liquid-glass`), curseur à ressort anime.js.
- **FAQ** : `<details>` ; en écran large, titre à gauche, questions à droite.

## À faire / à éviter

À faire : photos de terrain réelles (Ghisonaccia, Marche, lycée), texte en casse normale, une
action principale par écran, focus clavier visible, images avec `width`/`height`.

À éviter : petites étiquettes en capitales au-dessus des titres, numérotation décorative 01/02/03,
filets de séparation, emoji, texte gris pâle, dégradés décoratifs hors du héros.

## Écarts assumés par rapport à taste-skill

L'inspecteur taste-skill signale encore ces points. Ce sont des choix d'Alexis : ne pas les
« corriger » sans lui demander.
- Fond animé du héros (ShaderGradient) et voile en dégradé : demandés explicitement.
- Verre liquide du sélecteur de risque : demandé explicitement.
- Cartes avec icône et ombre légère (style Kokonut/Bklit) : à améliorer, pas à supprimer.
- Terre cuite `#c85a3c` sur fond crème `#f5f3ef` : couleurs de la marque.

## Accessibilité et conformité

- Contrastes WCAG AA vérifiés avec axe-core sur toutes les pages (0 erreur au 13/10/2026).
- Chaque page a un `<main>`, une hiérarchie de titres sans saut, des textes alternatifs descriptifs.
- Police hébergée sur le site (`fonts/`), aucune requête vers Google Fonts.
- Google Analytics uniquement après consentement ; choix gardé 6 mois ; « Gérer les cookies » en pied de page.
- Pages : `confidentialite.html`, `cookies.html`, `conditions-utilisation.html`. Mentions légales : à ajouter par Alexis.

## Responsive

Points de rupture : 1000 px (le logo animé du héros disparaît), 900 px (menu mobile, grilles en
une colonne), 600 px (cartes en liste, galerie en mosaïque 2 colonnes, pied de page empilé).
Aucun débordement horizontal toléré à 390 px.

## Outils de contrôle

- `node .claude/skills/design-taste-frontend/scripts/lint.mjs index.html styles.css`
- `CHROME_PATH=… node .claude/skills/design-taste-frontend/scripts/inspect.mjs index.html`
- Revue « web-design-guidelines » (règles dans `.claude/skills/web-design-guidelines/rules.md`)
- Captures et clics : `playwright-cli` (skill `.claude/skills/playwright-cli`)
