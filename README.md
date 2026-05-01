# Portfolio — Thomas Le Scolan

Portfolio personnel statique présentant ma formation, mes expériences professionnelles et mes projets sous forme d'une chronologie verticale moderne.

## Stack

- **[Next.js 16](https://nextjs.org/)** — App Router, React Server Components, TypeScript strict
- **[Tailwind CSS 4](https://tailwindcss.com/)** — utility-first, configuration dans `app/globals.css`
- **[shadcn/ui](https://ui.shadcn.com/)** — composants Radix headless customisés
- **[Framer Motion](https://www.framer.com/motion/)** — animations au scroll
- **[Lucide React](https://lucide.dev/)** — bibliothèque d'icônes
- **[next-themes](https://github.com/pacocoursey/next-themes)** — gestion du thème dark/light
- **[Biome](https://biomejs.dev/)** — lint et format

## Démarrage local

Prérequis : Node ≥ 20, npm ≥ 10.

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Scripts

| Commande | Rôle |
|---|---|
| `npm run dev` | Serveur de développement (Turbopack) |
| `npm run build` | Build de production |
| `npm run start` | Serveur de production (après `build`) |
| `npm run lint` | Vérification Biome |
| `npm run format` | Formatage Biome |

## Structure

```
app/                Pages Next.js (App Router)
  layout.tsx        Layout racine, metadata, fonts, thème
  page.tsx          Page unique : Hero + About + Timeline + Skills + Contact
  globals.css       Tailwind + variables de thème
components/
  sections/         Sections de la page
  layout/           Header sticky + Footer
  ui/               Composants shadcn
lib/
  data/             Données du portfolio (profil, expériences, skills)
  utils.ts          Helpers (cn, format dates)
public/             Assets statiques (photo, CV PDF)
```

## Personnalisation

Les informations personnelles sont centralisées dans `lib/data/`. Les emplacements à compléter sont marqués par des commentaires `// TODO` :

- `lib/data/profile.ts` — nom, titre, tagline, bio, liens (LinkedIn, GitHub, email, CV)
- `lib/data/experiences.ts` — formation, expériences, projets
- `public/` — photo de profil et CV PDF

## Déploiement

Site statique : compatible avec n'importe quel hébergeur supportant Next.js (Vercel, Netlify, etc.).

## Licence

Code source : MIT. Contenu (textes, photos, CV) : © Thomas Le Scolan, tous droits réservés.
