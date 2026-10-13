---
name: design-md
description: Garder littor-eau.fr cohérent avec son DESIGN.md. À lire avant toute modification visuelle du site (couleurs, typographie, composants, nouvelle page) et pour s'inspirer d'un système de design existant via la bibliothèque awesome-design-md.
---

# DESIGN.md de Littor'eau

Le fichier `DESIGN.md` à la racine du dépôt décrit le système visuel du site : couleurs, typographie,
composants, ton, écarts assumés. C'est la référence ; le code doit le suivre.

## Avant de modifier le site

1. Lire `DESIGN.md` en entier.
2. Réutiliser les tokens existants (`:root` dans `styles.css`) au lieu d'inventer de nouvelles valeurs.
3. Respecter les règles de ton (rien d'anxiogène, pas de chiffres gonflés, pas d'emoji, pas de
   référence inventée).
4. Si une décision change le système (nouvelle couleur, nouveau composant), mettre `DESIGN.md` à jour
   dans le même commit.

## S'inspirer d'un autre système

`library/` contient les DESIGN.md de la collection VoltAgent/awesome-design-md (licence MIT),
un fichier par marque (`stripe.md`, `vercel.md`, `airbnb.md`…). Pour emprunter une idée précise
(échelle typographique, rythme des sections, traitement des cartes), lire le fichier concerné et
transposer l'idée aux tokens de Littor'eau. Ne jamais copier l'identité d'une autre marque
(logo, nom, couleurs signatures).

## Contrôle

Après une modification : `lint.mjs` et `inspect.mjs` du skill `design-taste-frontend`, revue
`web-design-guidelines`, puis captures à 1440, 768 et 390 px (`playwright-cli`).
