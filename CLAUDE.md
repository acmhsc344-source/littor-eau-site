# littor-eau.fr

Site statique (HTML/CSS/JS) de Littor'eau, publié par Netlify à chaque fusion sur `main`.
Chaque pull request a un aperçu : `https://deploy-preview-<N>--littor-eau.netlify.app`.

## Règles

- Ne rien publier sur `main` sans le « valide » d'Alexis : travailler sur une branche, ouvrir une PR,
  lui donner le lien d'aperçu.
- Le système visuel est décrit dans `DESIGN.md` : le lire avant toute modification visuelle.
- Pas de texte anxiogène, pas de chiffres gonflés, pas d'emoji, aucune référence client inventée.
  Le client de Villeneuve-Loubet n'est jamais nommé.

## Héros 3D

Sources dans `hero-src/` (Vite + React, three.js, ShaderGradient, anime.js). Après modification :
`cd hero-src && npm install && npx vite build`, puis committer `assets/hero/` (Netlify ne lance
aucune commande de build).

## Outils de design (dossier `.claude/skills/`)

| Skill | Source | Usage |
| --- | --- | --- |
| `design-taste-frontend` | Leonxlnx/taste-skill (MIT) | Direction artistique, `lint.mjs` et `inspect.mjs` (Node 22, Chrome) |
| `image-to-code` | Leonxlnx/taste-skill (MIT) | Reproduire une maquette ou une capture en code |
| `web-design-guidelines` | vercel-labs/agent-skills (MIT) | Revue accessibilité, formulaires, performance ; règles locales dans `rules.md` |
| `design-md` | VoltAgent/awesome-design-md (MIT) | Garder le site fidèle à `DESIGN.md` ; bibliothèque de DESIGN.md de référence |
| `playwright-cli` | microsoft/playwright-cli (Apache-2.0) | Ouvrir le site, cliquer, capturer (`npm i -g @playwright/cli`) |

Aperçu local : `python3 -m http.server 8765` à la racine, puis `http://localhost:8765/`.
Les captures de l'inspecteur vont dans `.taste-skill/` (ignoré par git).
