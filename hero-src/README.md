# Héros 3D de la page d'accueil

Sources du fond animé (ShaderGradient / react-three-fiber) et de la marque en métal liquide (Paper Shaders).
Le résultat compilé est dans `assets/hero/` et c'est lui qui est servi par Netlify : aucune étape de build côté Netlify.

Pour modifier puis recompiler :

    cd hero-src
    npm install
    npx vite build

Les palettes de chaque risque sont dans `src/fx.jsx` (WebGL) et dans `styles.css` (repli CSS, section « Héros d'accueil »).
