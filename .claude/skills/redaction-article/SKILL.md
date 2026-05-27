---
name: redaction-article
description: Rédige ou révise un article de blog MDX optimisé SEO + GEO (visibilité moteurs IA) pour pierrekasparian.fr. À utiliser quand on demande d'écrire, traduire ou améliorer un article de blog, ou d'en optimiser le référencement.
version: 1.0.0
author: pierrekasparian
tags: [seo, geo, blog, mdx, content, rgpd, i18n]
allowed-tools: Read, Grep, Glob, Write, Edit, Bash
---

# Rédaction d'article SEO + GEO

Skill de rédaction de contenu pour le blog. Objectif double : **SEO Google** ET **GEO** (Generative Engine Optimization — être cité par ChatGPT, Perplexity, Gemini, Google AI Overviews, Claude).

Avant de rédiger, lire `SEO_KEYWORDS.md` (mots clés cibles) et au moins un article existant pour caler le ton.

## 0. Contraintes projet (non négociables)

- **Emplacement** : `content/blog/{lang}/{category}/{slug}.mdx`
  - `lang` ∈ `fr` | `en` — **langue par défaut : fr**
  - `category` ∈ `article` | `guide` | `case-study` (cf. `lib/mdx.ts`, `BLOG_CATEGORIES`)
  - `slug` = nom de fichier, stable, en kebab-case, descriptif et keyword-rich
- **Bilingue obligatoire** : tout article rédigé en `fr` doit avoir sa version `en` (même slug ou slug traduit cohérent), et inversement. Ne jamais livrer une seule langue.
- **Pas de tiret cadratin `—`** dans le texte : trop marqueur d'IA. Utiliser `:`, `(...)`, ou couper la phrase.
- Après écriture, vérifier le lint : `npm run lint` (cf. CLAUDE.md).

## 1. Frontmatter (schéma exact)

Le frontmatter alimente directement `generateMetadata`, l'OpenGraph, le Twitter card et le JSON-LD `BlogPosting` (cf. `app/[lang]/blog/[category]/[slug]/page.tsx`). Champs lus par `lib/mdx.ts` :

```yaml
---
title: "..." # H1 + <title> + headline schema. ≤ 60 caractères. Mot clé principal en tête.
description: "..." # meta description + og:description. 120-155 caractères. Inclut le mot clé + bénéfice.
date: "AAAA-MM-JJ" # ISO. Sert datePublished. Trie les articles (récent d'abord).
tags: ["...", "..."] # 3-5 tags. Servent keywords schema + badges. Reprendre des termes de SEO_KEYWORDS.md.
readingTime: 6 # entier (minutes). Estimer ~200 mots/min.
---
```

Règles :

- `title` et `description` doivent **différer** (pas de doublon) et contenir le mot clé principal naturellement.
- `description` = promesse claire + audience (ex. "pour les PME françaises"). C'est elle qui s'affiche dans Google et dans les réponses IA.
- `tags` cohérents entre fr/en (versions traduites des mêmes concepts).

## 2. Stratégie de mots clés

- Source unique : `SEO_KEYWORDS.md`.
- **Niche prioritaire** : jonction `IA` + `RGPD conforme` + `hébergement EU`. C'est le différenciateur, l'occuper dès que pertinent.
- 1 mot clé principal par article + 2-3 secondaires (longue traîne). Pas de bourrage.
- Placement du mot clé principal : `title`, `description`, H1, premier paragraphe, un H2, conclusion.
- Éviter les mots clés listés en `❌` de `SEO_KEYWORDS.md` (trop concurrentiels).

## 3. Structure GEO (être cité par les IA)

Les moteurs IA extraient des **passages auto-suffisants** et privilégient les contenus structurés, factuels, attribuables. Appliquer :

1. **Réponse directe en tête** : dès le premier ou deuxième paragraphe, répondre à la question principale en 1-2 phrases extractibles (format "definition box"). Les IA citent volontiers ces réponses condensées.
2. **Titres = questions / intentions** : les H2/H3 formulés comme des questions réelles ("Peut-on utiliser ChatGPT en restant conforme au RGPD ?") matchent les requêtes conversationnelles.
3. **Une idée = un bloc** : chaque section répond à UNE question et se tient seule, sans dépendre du contexte précédent (l'IA extrait des morceaux isolés).
4. **Données concrètes** : chiffres, dates, noms d'outils précis (Mistral AI, OVHcloud, Llama 3, Qdrant...), comparaisons. Le factuel et le spécifique sont davantage cités que le vague.
5. **Listes et tableaux** : bullet points et tableaux comparatifs sont sur-cités par les IA. En utiliser pour énumérations, étapes, comparaisons.
6. **Phrases courtes et déclaratives** : sujet-verbe-complément. Évite les phrases à tiroirs.
7. **TL;DR ou conclusion synthétique** : résumé en fin d'article que les IA peuvent reprendre.
8. **Expertise / E-E-A-T** : montrer l'expérience réelle (prestations réalisées, choix d'architecture vécus), pas du générique. Première personne assumée quand pertinent.

## 4. Structure SEO (Google)

- **Un seul `<h1>`** = le `title`. Le rendu MDX n'ajoute PAS de H1 automatique pour le contenu (le H1 vient du frontmatter `title`), donc **commencer le corps MDX au niveau `##` (H2)**. Ne pas remettre de `#` en haut du MDX.
- Hiérarchie propre : `##` puis `###`, jamais de saut de niveau.
- Intro qui pose le problème + promet la réponse (capte le clic et réduit le rebond).
- Maillage interne : lier vers `/prestations`, `/contact`, ou d'autres articles pertinents (liens markdown relatifs `/{lang}/...`).
- Liens sortants vers sources autoritaires (doc officielle, CNIL, etc.) → renforce la confiance.
- Longueur : guide/case-study 1000-1800 mots ; article 600-1200. Privilégier la complétude sur la longueur artificielle.
- CTA discret en conclusion (contact / discuter du projet), sans être commercial agressif.

## 5. Syntaxe MDX disponible

Le rendu utilise `remark-gfm` + `rehype-pretty-code` (cf. page article). Donc :

- **GFM** : tableaux, listes de tâches, ~~barré~~, autolinks.
- **Blocs de code** avec coloration : préciser le langage (` ```python `, ` ```bash `, ` ```ts `).
- Gras `**...**` pour les termes clés (aide scan + extraction IA).
- Pas de composant React custom sauf si déjà présent dans le pipeline MDX (vérifier avant).

## 6. Workflow recommandé

1. Lire `SEO_KEYWORDS.md` + 1 article existant de la même catégorie.
2. Choix du sujet : Lire data/projects.ts pour avoir des idées éventuelles de case study. Pour les guides, cibler des articles assez niché (exemple différentes stratégies de chunking pour le rag, améliorer la précisions grâce aux rerankers cross encoders),. Pour les articles faire des choses plus TOFU style meilleurs reranker 2026, le RAG dans le domaine juridique,..
3. Choisir mot clé principal + catégorie + slug.
4. Rédiger la version **fr** (frontmatter + corps en `##`).
5. Rédiger la version **en** (traduction, slug + tags cohérents).
6. Relire : pas de `—`, mot clé bien placé, réponse directe en tête, sections auto-suffisantes.
7. `npm run lint`.

## Checklist finale

- [ ] Fichier(s) dans `content/blog/{fr,en}/{category}/{slug}.mdx`
- [ ] Versions fr ET en livrées, tags/slug cohérents
- [ ] Frontmatter complet : title (≤60c), description (120-155c, ≠ title), date ISO, 3-5 tags, readingTime
- [ ] Mot clé principal dans title, description, H1, intro, un H2, conclusion
- [ ] Corps commence en `##` (pas de `#`)
- [ ] Réponse directe extractible dès le début (GEO)
- [ ] H2 sous forme de questions, sections auto-suffisantes
- [ ] Données concrètes, listes/tableaux, phrases courtes
- [ ] Maillage interne + 1-2 liens autoritaires
- [ ] Aucun `—` dans le texte
- [ ] `npm run lint` OK
- mets à jour le sitemap.ts et llm.txt
