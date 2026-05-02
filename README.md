# Portfolio — Thomas Le Scolan

Portfolio web personnel : formation, expériences professionnelles, compétences, projets perso et centres d'intérêt — sous forme d'une chronologie verticale moderne, dark-first, avec accordéon et progression au scroll.

## Stack

- **[Next.js 16](https://nextjs.org/)** — App Router, React Server Components, TypeScript strict, Turbopack
- **[Tailwind CSS 4](https://tailwindcss.com/)** — config dans `app/globals.css`
- **[shadcn/ui](https://ui.shadcn.com/)** — composants headless basés sur `@base-ui/react`
- **[Motion](https://motion.dev/)** — `useScroll` / `useTransform` pour la barre de progression et les rings animés
- **[tw-animate-css](https://github.com/jamieoliver/tw-animate-css)** — animations CSS pures pour le Hero (`fade-in`, `slide-in-from-bottom-*`)
- **[Lucide React](https://lucide.dev/)** — icônes
- **[next-themes](https://github.com/pacocoursey/next-themes)** — thème clair / sombre
- **[next/og](https://nextjs.org/docs/app/api-reference/functions/image-response)** — image OpenGraph dynamique
- **[docx](https://docx.js.org/)** — génération du CV au format Word (3 mises en forme)
- **[Biome](https://biomejs.dev/)** — lint et format (4 espaces d'indentation)

## Démarrage local

Prérequis : Node ≥ 20, npm ≥ 10.

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

> **WSL** : si le dev server tourne dans WSL et que la page est ouverte côté Windows via l'IP virtuelle (`http://172.x.x.x:3000`), il faut ajouter cette IP à `allowedDevOrigins` dans `next.config.ts`. Sans ça, le WebSocket HMR est bloqué et React n'hydrate pas (les `onClick` ne marchent plus).

## Scripts

| Commande            | Rôle                                                                |
|---------------------|---------------------------------------------------------------------|
| `npm run dev`       | Serveur de dev (Turbopack)                                          |
| `npm run build`     | Build de production                                                 |
| `npm run start`     | Serveur de prod (après `build`)                                     |
| `npm run lint`      | Vérification Biome (lint + format)                                  |
| `npm run lint:fix`  | Auto-fix Biome                                                      |
| `npm run format`    | Formatage Biome uniquement                                          |
| `npm run typecheck` | Vérification TypeScript (`tsc --noEmit`)                            |
| `npm run cv`        | Génère 3 CV `.docx` dans `cv/` à partir des données figées du script |

## Structure

```
app/
  layout.tsx              Metadata SEO, fonts (Inter + JetBrains Mono), ThemeProvider, Header, Footer
  page.tsx                Page unique : Hero + About + Timeline + Skills + Interests + Contact
  globals.css             Tailwind 4 + variables de thème (oklch)
  opengraph-image.tsx     Image OG 1200×630 générée dynamiquement (next/og + Satori)
  sitemap.ts              /sitemap.xml
  robots.ts               /robots.txt
  _fonts/                 Inter Regular + Bold (TTF) bundlés pour Satori
components/
  sections/
    hero.tsx              Bandeau d'accueil + lueur indigo + CTAs (animations CSS)
    about.tsx             Avatar, bio, 3 stats (années d'XP live, expériences, technos)
    years-since.tsx       Composant client : recalcul des années d'XP au mount
    timeline.tsx          Container chronologie : ligne progressive (motion useScroll)
    timeline-item.tsx     Card unitaire : accordéon, lueur teintée, ring animé, alternance L/R
    timeline-period.tsx   Composant client : recalcul de la durée des items en cours
    skills.tsx            Compétences groupées (Front, Back, Tests, Outils, DevOps)
    interests.tsx         4 cards : ultimate, dessin, cinéma, jeux vidéo
    contact.tsx           Cards de liens (email, LinkedIn, GitHub, CV)
  layout/
    header.tsx            Navbar sticky + theme toggle
    footer.tsx            Footer minimal
  theme-provider.tsx      Wrapper next-themes + MotionConfig (reducedMotion: user)
  theme-toggle.tsx        Bouton bascule clair / sombre
  ui/                     Composants shadcn générés (button, card, badge, etc.)
lib/
  data/
    profile.ts            Identité : nom, titre, tagline, bio, contact, dispo, social
    experiences.ts        Formation, expériences, projets — ordre antichronologique
    skills.ts             Compétences groupées
    interests.ts          Centres d'intérêt + icônes Lucide
  format.ts               Helpers de date (formatPeriod, computeDuration, computeYearsSince)
  site-config.ts          SITE_URL canonique pour metadataBase / sitemap / robots
  utils.ts                cn() shadcn
public/
  cv-thomas-le-scolan.pdf CV PDF téléchargeable depuis la section Contact
  profile.jpg             (à ajouter) Photo de profil pour la section About
scripts/
  generate-cv.mjs         Génération de 3 .docx (classique / moderne / minimaliste)
cv/                       Sortie du script CV (gitignoré)
```

## Sections de la page

- **Hero** — Nom + titre + tagline + 2 CTAs. Lueur indigo en fond, animation d'entrée CSS pure (pas de gating JS, le contenu reste visible si JS échoue).
- **À propos** — Avatar, bio, et 3 stats : années d'expérience (recalculées côté client à partir de `2019-09` + bonus stages), nombre d'expériences pro, technologies maîtrisées.
- **Parcours** — Chronologie verticale antichronologique. Chaque card est repliée par défaut (badge, période, titre, organisation, résumé) ; le bouton « Voir le détail » déplie highlights / missions / stack en accordéon (une seule card ouverte à la fois). La barre de progression à gauche se remplit au scroll, et chaque dot s'allume d'un ring `var(--foreground)` quand la barre l'atteint. Lueur teintée derrière chaque card, alignée sur la couleur du dot (vert formation/stages, indigo CDI, ambre projets).
- **Stack** — Compétences groupées en 5 catégories (badges Tailwind).
- **Hors travail** — 4 centres d'intérêt avec icône + description courte.
- **Contact** — Liens directs vers email, LinkedIn, GitHub, et téléchargement du CV PDF.

## Personnalisation

Tout le contenu est centralisé. Pour personnaliser :

- **`lib/data/profile.ts`** — nom, titre, tagline, bio, location, dispo, email, photo, CV, social (GitHub / LinkedIn).
- **`lib/data/experiences.ts`** — items de la chronologie. Chaque item a un `type` : `"formation"` / `"experience"` / `"projet"` qui détermine son icône et sa couleur.
- **`lib/data/skills.ts`** — groupes de compétences (label + items).
- **`lib/data/interests.ts`** — centres d'intérêt (label + description + icône Lucide).
- **`lib/site-config.ts`** — `SITE_URL` à mettre à l'URL canonique du déploiement (utilisée pour `metadataBase`, `sitemap.xml`, `robots.txt`).
- **`public/profile.jpg`** — photo carrée ≥ 320×320px (placeholder = initiales).
- **`public/cv-thomas-le-scolan.pdf`** — CV téléchargeable depuis la section Contact.

## Image OpenGraph

L'image affichée quand le portfolio est partagé sur LinkedIn / Slack / Discord / etc. est générée dynamiquement par `app/opengraph-image.tsx` au format 1200×630, en cohérence avec le Hero (fond zinc-950, lueur indigo, Inter). Elle est prerendue au build et accessible à `/opengraph-image`.

Polices bundlées : Inter Regular + Bold en TTF statiques dans `app/_fonts/` — Satori (le moteur de `next/og`) ne supporte ni le woff2 ni les fonts variables.

## Génération de CV

`npm run cv` produit 3 fichiers `.docx` dans `cv/` (gitignorés), à éditer dans Word :

- **`cv-thomas-le-scolan-classique.docx`** — mise en page traditionnelle française, single column, accent bleu nuit.
- **`cv-thomas-le-scolan-moderne.docx`** — sidebar bleu nuit + colonne principale, plus contemporain.
- **`cv-thomas-le-scolan-minimaliste.docx`** — barre d'accent teal en haut, sections en mono « // titre », vibe tech.

Les données du CV sont figées dans `scripts/generate-cv.mjs` (recopiées depuis `lib/data/`). Si le portfolio évolue, mettre à jour ce script avant de régénérer.

## Déploiement

Site compatible avec n'importe quel hébergeur supportant Next.js 16 (Vercel, Netlify, etc.). Penser à :

1. Mettre à jour `lib/site-config.ts:SITE_URL` avec l'URL réelle.
2. Vérifier `app/layout.tsx` (description SEO, keywords).
3. Avoir poussé `public/profile.jpg` et `public/cv-thomas-le-scolan.pdf`.

## Licence

Code source : MIT. Contenu (textes, photo, CV) : © Thomas Le Scolan, tous droits réservés.