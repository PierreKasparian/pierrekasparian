@AGENTS.md
@SEO_KEYWORDS.md

# Pierre Kasparian — Portfolio & Site Consulting IA

## Objectif du projet

Site double usage :

1. **Portfolio personnel** présentant mes projets (dev, IA, data science).
2. **Site de consulting freelance** pour des prestations d'intégration IA (LLM, RAG, agents, fine-tuning, automatisations, conformité rgpd).

Différenciateur clé à mettre en avant partout où c'est pertinent : **conformité RGPD** (hébergement EU, anonymisation, gouvernance des données, pas de fuite vers des modèles US par défaut).

## Profil

- Étudiant ingénieur à l'**UTT (Université de Technologie de Troyes)**, en **4e année**.
- Plusieurs prestations d'intégration IA déjà réalisées (à mettre en avant comme preuve sociale).
- LinkedIn : https://www.linkedin.com/in/pierre-kasparian-486101259/
- GitHub : https://github.com/PierreKasparian/

## Stack technique

- **Next.js 16** (App Router) — ⚠️ breaking changes par rapport à Next 13/14/15. **Toujours lire `node_modules/next/dist/docs/` avant d'écrire du code Next-specific** (proxy.js a remplacé middleware.ts, `params` est async, etc.).
- **React 19**
- **Tailwind CSS v4** (nouveau format `@theme inline` dans `globals.css`, pas de `tailwind.config.js`).
- **TypeScript** strict.
- **shadcn/ui** pour la bibliothèque de composants (à initialiser dans `components/ui/`).
- **i18n** : routing par sous-chemin `/fr/...` et `/en/...` via segment dynamique `app/[lang]/...` + dictionnaires JSON (`dictionaries/fr.json`, `dictionaries/en.json`). Pattern officiel Next.js, **pas** de lib externe sauf si vraiment justifié.
- **Langue par défaut : français** (`fr`).

## Structure de routes prévue

Toutes les routes vivent sous `app/[lang]/` :

- `/` (`app/[lang]/page.tsx`) — landing : hero + pitch IA + preuves sociales + projets phares.
- `/about` — présentation perso, parcours UTT, valeurs (RGPD, pédagogie, autonomie client).
- `/prestations` — liste des offres de consulting (audit IA, intégration LLM, RAG sur mesure, formation, etc.).
- `/prestations/[id]` — détail d'une prestation (slug stable, contenu depuis JSON ou MDX).
- `/projects` (ou `/portfolio`) — liste des projets du portfolio.
- `/projects/[slug]` — détail d'un projet (utilise le champ `project_url` comme slug).
- `/blog` — liste d'articles (SEO oriented).
- `/blog/[slug]` — article (MDX recommandé).
- `/tools` — collection d'outils en ligne (mini-apps utiles, lead magnets SEO).
- `/contact` — formulaire de contact / prise de RDV.

## Données

- `data/projects.ts` (ou `.json`) : liste des projets du portfolio, dérivée du legacy site. Champs : `title`, `description`, `description_longue`, `image_principale_url`, `images`, `project_url` (slug), `date`, `link`. Pour i18n, prévoir `title` / `description` / `description_longue` comme objets `{ fr, en }` ou stocker les contenus dans les dictionnaires.
- `data/prestations.ts` : à créer, structure similaire.
- Articles `/blog` : stockés en MDX dans `content/blog/{lang}/*.mdx` (à mettre en place quand on aborde le blog).

## Conventions

- **Server Components par défaut**. `"use client"` uniquement quand interactivité réelle (form, state, listeners).
- **Pas de `next/image` avec des sources distantes** sans configurer `images.remotePatterns` dans `next.config.ts`.
- **`params` est async** en Next 16 : `const { lang } = await params`. Utiliser les helpers globaux `PageProps<'/[lang]'>` et `LayoutProps<'/[lang]'>`.
- **Pas de contenu textuel à peaufiner pour l'instant** : on met des placeholders propres et on itère la copie plus tard. La priorité c'est la structure, le routing, le design system.
- **Accessibilité et SEO** : balises sémantiques, `<h1>` unique par page, metadata par route (`generateMetadata`), `alt` sur les images, `hreflang` pour i18n.
- Do not use "—" it is to obvious that it is AI generated
- Toutes les modifs faites dans une langue doivent etre traduits dans l'autre langue (fr.json et en.json)

After a code edit, check if lint is alright
