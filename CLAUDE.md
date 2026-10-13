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

## Qualité web et contenu (dossier `.claude/skills/`)

| Skill | Source | Usage |
| --- | --- | --- |
| `web-quality-audit` | addyosmani/web-quality-skills (MIT) | Audit global ; `scripts/analyze.sh <dossier>` vérifie le HTML en lecture seule (jq requis) |
| `accessibility` | addyosmani/web-quality-skills (MIT) | Audit WCAG 2.2 |
| `performance` | addyosmani/web-quality-skills (MIT) | Temps de chargement, poids des pages |
| `core-web-vitals` | addyosmani/web-quality-skills (MIT) | LCP, INP, CLS |
| `best-practices` | addyosmani/web-quality-skills (MIT) | Sécurité, compatibilité, qualité du code |
| `seo` | addyosmani/web-quality-skills (MIT) | SEO technique (balises, sitemap, données structurées) |
| `seo-audit` | coreyhaines31/marketingskills (MIT) | Audit SEO, y compris référencement local |
| `schema` | coreyhaines31/marketingskills (MIT) | Données structurées JSON-LD |
| `ai-seo` | coreyhaines31/marketingskills (MIT) | Être cité par les moteurs de réponse IA |
| `copywriting` | coreyhaines31/marketingskills (MIT) | Écrire ou réécrire les textes des pages |
| `copy-editing` | coreyhaines31/marketingskills (MIT) | Relire et resserrer un texte existant |
| `cro` | coreyhaines31/marketingskills (MIT) | Rendre les pages et le formulaire de contact plus efficaces |

Les skills marketing lisent d'abord `.claude/product-marketing.md` (offre, cibles, règles de ton).
Ils sont écrits en anglais : les textes produits pour le site restent en français.
