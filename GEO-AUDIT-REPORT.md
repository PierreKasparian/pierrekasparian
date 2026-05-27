# GEO Audit Report: Pierre Kasparian

**Audit Date:** 2026-05-27
**URL:** https://pierrekasparian.com
**Business Type:** Agency/Services — AI freelance consultant (French-primary, GDPR niche)
**Pages Analyzed:** 33 (from sitemap) + robots.txt, llms.txt, key page deep-dives

---

## Executive Summary

**Overall GEO Score: 36/100 — Critical**

pierrekasparian.com has a technically solid foundation (Next.js SSR, clean robots.txt, correct hreflang implementation) but is largely invisible to AI systems. The site suffers from three structural deficiencies: absent brand presence outside the site itself (no Wikipedia, no Reddit, no third-party coverage), content that is too thin and sparse to be cited by AI engines (1 blog post, 520 words, no external citations), and critical errors that actively harm crawl trust (5 service pages return 404 but are listed in the sitemap at the highest content priority). The single most damaging blind spot for a consultant whose brand promise is GDPR compliance: **the site collects contact data with no privacy policy page**, a direct legal obligation under French law that contradicts the core value proposition. Fixing the top 5 issues in this report would realistically move the score from 36 to ~55 within 30 days, and to 70+ within 90 days.

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 32/100 | 25% | 8.0 |
| Brand Authority | 18/100 | 20% | 3.6 |
| Content E-E-A-T | 41/100 | 20% | 8.2 |
| Technical GEO | 73/100 | 15% | 10.95 |
| Schema & Structured Data | 28/100 | 10% | 2.8 |
| Platform Optimization | 29/100 | 10% | 2.9 |
| **Overall GEO Score** | | | **36/100** |

---

## Critical Issues (Fix Immediately)

### C1 — No privacy policy or legal notice (mentions légales)
**Pages:** All — especially `/fr/contact`
**Impact:** Legal obligation under French law (Code de la consommation) + GDPR Article 13. The contact form collects name, email, subject, message — all personal data — with zero notice to the data subject. For a consultant whose entire brand promise is "RGPD conforme", this is a fatal credibility contradiction. Any prospect doing due diligence before contracting will notice immediately.
**Fix:** Create `/fr/legal/politique-de-confidentialite` and `/fr/legal/mentions-legales`. Link both in the footer. Add a cookie consent banner. Estimated effort: 2-4 hours with a template.

### C2 — Five service detail pages return 404 but are in the sitemap at priority 0.9
**Pages:**
- `/fr/services/agents-ia` — 404
- `/fr/services/automatisation-ia` — 404
- `/fr/services/data-engineering` — 404
- `/fr/services/saas-ai` — 404
- `/fr/services/machine-learning` — 404

**Impact:** These are your most commercially valuable pages, listed at the highest content priority in the sitemap. Every AI crawler and search engine bot that follows the sitemap hits 5 dead ends. This signals an unreliable sitemap, wastes crawl budget, and eliminates any possibility of ranking or being cited for specific service queries. **Either build these pages or remove them from the sitemap immediately.**
**Fix (immediate):** Remove the five URLs from `sitemap.xml` (1 hour). Fix (preferred): Build the actual service detail pages as described in the 30-day plan.

### C3 — No llms.txt file
**Page:** `https://pierrekasparian.com/llms.txt` returns 404
**Impact:** `llms.txt` is the emerging standard for guiding AI crawlers to priority content. For a freelance AI integration consultant, its absence is a visible credibility gap — it signals you do not implement the practices you sell. ChatGPT Browse, Perplexity, and Claude's web access mode actively check for this file.
**Fix:** See template in the Quick Wins section below. Effort: 20 minutes.

---

## High Priority Issues

### H1 — English hreflang links point to non-existent pages
**Impact:** Every French page declares an English alternate URL (e.g., `hreflang="en"` pointing to `/en/services/agents-ia`) but only 1 English page actually exists (`/en/blog/integrate-llm-gdpr`). When Googlebot finds hreflang links that return 404, it disqualifies the entire hreflang implementation as unreliable. This undermines international SEO and reduces AI crawler trust in the sitemap.
**Fix:** For all French pages that have no English equivalent, remove the `hreflang="en"` alternate tag. Only declare hreflang alternates that actually resolve.

### H2 — No ProfessionalService or Organization schema
**Pages:** All
**Impact:** AI models cannot build a proper entity graph for the business. Without a business entity schema, ChatGPT, Gemini, and Perplexity cannot reliably answer "who is Pierre Kasparian" or "RGPD-compliant AI consultant France" with a citation to this site.
**Fix:** See JSON-LD template in the Schema section below.

### H3 — Missing og:image and twitter:image sitewide
**Pages:** All
**Impact:** `twitter:card: summary_large_image` is declared on every page but no image is provided, causing cards to render as plain text links on LinkedIn, X, WhatsApp, and Slack. Every shared link loses visual impact. AI citation panels that render source previews also see no image.
**Fix:** Create a 1200x630px OG image and add it to `generateMetadata` globally in `app/[lang]/layout.tsx`.

### H4 — All security headers missing
**Pages:** All
**Impact:** No `Strict-Transport-Security`, `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, or `Permissions-Policy` headers are present. For a consultant marketing RGPD compliance and data security to enterprise clients, technically-aware buyers who inspect headers will see a contradiction. Also reduces trustworthiness signals used by AI citation systems.
**Fix:** Add all six headers to `next.config.ts` under the `headers()` function. 20 lines of code, zero performance cost.

### H5 — Blog article labeled "6 min read" but contains ~520 words
**Page:** `/fr/blog/integrer-llm-rgpd` and `/en/blog/integrate-llm-gdpr`
**Impact:** A 6-minute read implies ~1,500 words. At 520 words, this label is a visible credibility error. More critically, the article is too thin to be cited by AI engines — it contains no external citations, no cited regulation articles, no author byline with credentials, no firsthand project data, and no quantified comparisons. AI systems will not quote this article as authoritative.
**Fix:** See Content deep dive and 30-day plan.

### H6 — Author byline with credentials missing on all blog articles
**Pages:** `/fr/blog/integrer-llm-rgpd`, `/en/blog/integrate-llm-gdpr`
**Impact:** A user landing on the RGPD article from search has no information about who Pierre Kasparian is, what qualifies him to write on data compliance, or how to verify the claims. This is the defining E-E-A-T failure for content on a regulatory topic.
**Fix:** Add an author bio component below the article headline: name, "Étudiant ingénieur UTT | Freelance IA RGPD", link to About page, LinkedIn icon. Add a `dateModified` field to all MDX frontmatter.

### H7 — No Reddit, Wikipedia, or third-party brand presence
**Impact:** Reddit is a top-5 training corpus source for major LLMs. Zero mentions means zero organic probability of appearing in AI-generated responses about GDPR-compliant AI in France. Wikipedia absence creates entity disambiguation risk with an older person named Pierre Kasparian who appears in French business registries (Infogreffe), which AI systems may conflate.
**Fix:** See Brand Authority section and quick wins.

### H8 — Root redirect is 307 Temporary instead of 308 Permanent
**Page:** `https://pierrekasparian.com/` → `/fr`
**Impact:** A 307 signals the redirect may change. A 308 communicates permanent intent, which is more appropriate for a language routing architecture that is not temporary. Googlebot handles both correctly but 308 better communicates canonical intent to crawlers.
**Fix:** One-line configuration change in the Caddy or Next.js config.

---

## Medium Priority Issues

### M1 — Only 1 blog post published after 5+ months
**Impact:** Topical authority requires content volume. A single article covers ~5% of the subtopics in the target niche. AI systems building knowledge of "GDPR-compliant AI consultants" in France have almost no indexed content from this site to cite. Publishing frequency also signals site maintenance to crawlers.

### M2 — Existing Person schema missing image, description, and knowsAbout
**Page:** All pages (schema in layout)
**Impact:** `knowsAbout` is the property AI assistants read to understand expertise. Without it, AI models have no structured signal about Pierre's domains. Without an image URL, the Person entity cannot appear in Knowledge Graph results.
**Fix:** See JSON-LD templates in the Schema section.

### M3 — BlogPosting schema missing image, dateModified, and publisher
**Page:** `/fr/blog/integrer-llm-rgpd`
**Impact:** Fails Google Article rich result eligibility. Without a featured image in schema, the article cannot generate a visual snippet in Google Discover or AI Overview cards.

### M4 — Tools page is a "coming soon" placeholder indexed in sitemap
**Page:** `/fr/tools`
**Impact:** Indexing a placeholder wastes crawl budget and creates a poor first impression for any user landing from search. Remove from sitemap until content is ready.

### M5 — Sitemap lastmod dates are identical build-time timestamps
**Impact:** All 33 URLs share the exact timestamp `2026-05-27T10:14:18.858Z`. Search engines ignore uniform lastmod values as inaccurate. Real per-page modification dates help crawlers prioritize content refreshes.
**Fix:** Track actual content modification dates per page and inject them into the sitemap generator.

### M6 — Blog articles contain zero external citations
**Pages:** Both blog articles
**Impact:** Citing GDPR article numbers, CNIL guidelines, or published benchmarks is the fastest way to move the Authoritativeness score. External citations are a primary signal used by AI systems when evaluating sources to quote.

### M7 — No FAQ sections on service pages
**Impact:** FAQ schema on service pages is a direct path to Google AI Overviews and featured snippets for long-tail queries matching the SEO_KEYWORDS.md targets.

### M8 — "4+ years experience" stat is arithmetically inconsistent
**Page:** Homepage, About
**Impact:** The documented experience trail starts in 2023 (Junior Conseil UTT). 4 years from 2026 is 2022, when no experience is documented. An easily disprovable claim undermines the credibility of all other quantified stats on the page.
**Fix:** Change to "3+ years" or annotate to include earlier personal projects.

---

## Low Priority Issues

### L1 — `/fr/education/LLM-course` uses uppercase slug
The server serves this URL but the lowercase version `/fr/education/llm-course` returns 404. Convention requires lowercase URLs. Fix the slug and add a 308 redirect from the uppercase version.

### L2 — No crawl-delay or explicit AI crawler allow rules in robots.txt
Currently relies on the implicit `User-agent: *` Allow. Adding explicit `User-agent: GPTBot` / `ClaudeBot` / `PerplexityBot` with `Allow: /` rules signals intentional AI optimization, which is especially relevant for an AI integration consultant's site.

### L3 — No Bing Webmaster Tools verification
No `msvalidate.01` meta tag found. Setting up Bing Webmaster Tools and submitting the sitemap directly provides faster Bing indexing and directly improves Copilot sourcing. 30-minute task.

### L4 — No `<link rel="preconnect">` hints for external resources
Minor Core Web Vitals improvement opportunity for connection setup time on mobile.

### L5 — `Host:` directive in robots.txt is Yandex-specific
The `Host: https://pierrekasparian.com` line in robots.txt is a Yandex extension ignored by all other crawlers. Safe to remove to reduce noise.

---

## Category Deep Dives

### AI Citability (32/100)

The site's strongest citability asset is its niche claim — "intégration IA conforme RGPD" — which names a specific, verifiable differentiation that AI systems can extract and repeat. The testimonials block with named clients (Charles Reizine/Pretto, Laurent Janolin/LiveSession, Baptiste Morel/mc2i) provides entity anchors that help AI systems build relationship graphs.

The critical failure is content depth. The one published blog article contains 520 words with zero cited sources, no regulation references (no CNIL, no GDPR article numbers), no firsthand project data, and no author attribution. AI systems extract authoritative content. At 520 words with no citations, this article cannot be quoted as authoritative on a legal compliance topic.

**Best current passage for AI citation (score: 48/100):**
> "Un assistant capable de répondre en s'appuyant sur vos propres documents — avec hébergement européen ou sur site disponible."

This is self-contained, specific, and cites a differentiating capability. It could be cited. Most content on the site cannot.

**What would move citability from 32 to 65+:**
- Expand the RGPD blog article to 1,500+ words with CNIL and GDPR article citations
- Add a "What is RAG?" definitional block on the RAG service page (40-60 words answering the question directly)
- Convert the LiveSession project into a full case study with problem statement, architecture decision, and before/after metric
- Add FAQ sections to each service page with direct question-answer pairs

### Brand Authority (18/100)

| Platform | Status |
|---|---|
| Wikipedia | Absent — entity disambiguation risk with older Pierre Kasparian in French registries |
| Wikidata | Absent |
| Reddit | Absent — zero mentions in r/MachineLearning, r/selfhosted, r/france, r/artificial |
| YouTube | Not found |
| LinkedIn | Present — profile exists, 5 recommendations claimed, but posting frequency unknown |
| GitHub | Present (PierreKasparian) — code activity unknown |
| Malt / Codeur.com | Not found |
| Clutch / G2 | Not found |
| Google for domain name | Not ranking in top results for "Pierre Kasparian" search |

The domain does not appear as a top Google result when searching the brand name. This is the clearest indicator that third-party authority is the primary bottleneck. Until an external source of authority validates the entity (LinkedIn posts with engagement, Reddit upvotes, a guest post, a directory listing), AI systems have no corroboration signal outside the site itself.

### Content E-E-A-T (41/100)

| Dimension | Score | Key Gap |
|---|---|---|
| Experience | 14/25 | Real projects but no full case studies, no firsthand failure/lesson narratives |
| Expertise | 11/25 | No author byline on articles, credentials not linked from service pages |
| Authoritativeness | 8/25 | Zero external citations in any content, no media mentions |
| Trustworthiness | 11/25 | No privacy policy, no email address, no legal notice |

**Single highest-impact content action:** Rewrite the RGPD/LLM blog article as a firsthand case study of the LiveSession deployment — "How I built a GDPR-compliant RAG chatbot for a SaaS company: architecture, model choices, and the real numbers." This leverages real experience that does not exist in the article despite the author having lived it.

**AI content risk:** The blog article shows markers of low-effort AI generation — perfect four-part structure, no firsthand examples, no author opinion, zero engagement with the author's own documented project results. The author has deployed a 95%-relevance RAG on OVH VPS with GDPR isolation and wrote an article about GDPR RAG compliance that does not mention it. This disconnect is the defining signal.

### Technical GEO (73/100)

This is the site's strongest category and represents a real competitive advantage. The Next.js App Router stack with server-side rendering means AI crawlers see the same fully-hydrated content a browser does. The raw HTML response to `/fr` contains 824 words of visible text before any JavaScript executes. The Cloudflare CDN serves content via HTTP/2 with CDN cache hits confirmed (`x-nextjs-cache: HIT`).

The score is held back by the 404 service pages in the sitemap (critical), missing security headers, and the hreflang inconsistency. The SSR foundation is solid — these are fixable configuration issues, not architectural problems.

### Schema & Structured Data (28/100)

**Correction from initial data:** Schema markup IS present in the raw HTML (confirmed by direct source inspection). Two JSON-LD blocks exist globally: `Person` and `WebSite`. Blog pages add a third: `BlogPosting`. The schemas are server-rendered and visible to AI crawlers.

**What the existing schemas are missing:**

The `Person` schema lacks `image`, `description`, `knowsAbout`, and `hasOccupation`. The `BlogPosting` schema is missing `image` (required for Google rich result), `dateModified`, and `publisher`. Most critically, there is no business entity schema (`ProfessionalService` or `Organization`) anywhere on the site — AI models cannot categorize the consulting service as an entity.

**Top 3 schema additions by impact:**
1. `ProfessionalService` with `serviceType`, `areaServed`, `makesOffer`, and embedded `Review` array (see template below)
2. Expanded `Person` with `knowsAbout` and `image`
3. Complete `BlogPosting` with `image`, `dateModified`, `publisher`, `speakable`

### Platform Optimization (29/100)

| Platform | Score | Biggest Gap |
|---|---|---|
| Google AI Overviews | 32/100 | No question-based H2 headings, no FAQPage schema, thin blog content |
| ChatGPT Web Search | 22/100 | No entity recognition signals, no Organization schema, no third-party corroboration |
| Perplexity AI | 25/100 | No Reddit presence (primary Perplexity signal), content freshness signals absent |
| Google Gemini | 30/100 | Not in Google ecosystem (no YouTube, no Google Business Profile), no Knowledge Graph entry |
| Bing Copilot | 35/100 | No Bing Webmaster Tools, no IndexNow, no msvalidate tag |

**Strongest platform currently:** Bing Copilot — LinkedIn and GitHub satisfy Microsoft ecosystem signals, and the structured title provides a usable Bing index signal. **Weakest:** ChatGPT Web Search — no entity recognition signals from any third-party source.

---

## Quick Wins (Implement This Week)

**1. Create `/llms.txt`** (20 min — highest ROI per minute)

```
# Pierre Kasparian

> Freelance AI integration consultant specializing in GDPR-compliant LLM deployment,
> RAG chatbots, data engineering, and AI automation for French and European SMBs.

## Services

- [RAG Chatbots RGPD](https://pierrekasparian.com/fr/services/saas-ai): Custom retrieval-augmented generation on internal documents, EU hosting.
- [Data Engineering](https://pierrekasparian.com/fr/services/data-engineering): ETL pipelines, dbt, Airflow, LLM data pipelines.
- [Machine Learning](https://pierrekasparian.com/fr/services/machine-learning): Classification, extraction, predictive models on client data.
- [AI Automation](https://pierrekasparian.com/fr/services/automatisation-ia): n8n, AI agents, CRM/API integrations.

## Blog

- [Comment intégrer un LLM sans violer le RGPD](https://pierrekasparian.com/fr/blog/integrer-llm-rgpd): Guide on GDPR-compliant LLM integration architectures for French companies.
- [How to integrate a LLM without violating GDPR](https://pierrekasparian.com/en/blog/integrate-llm-gdpr): English version.

## About

- [À propos](https://pierrekasparian.com/fr/about): 4th-year engineering student at UTT, AI freelance since 2024, 9+ projects delivered.

## Contact

- [Contact](https://pierrekasparian.com/fr/contact): Project inquiries and consultations.
- [LinkedIn](https://www.linkedin.com/in/pierre-kasparian-486101259/): Professional profile with client recommendations.
- [GitHub](https://github.com/PierreKasparian/): Open source projects and code.
```

**2. Remove the five 404 pages from `sitemap.xml`** (30 min)

Delete the five `<url>` blocks for `/fr/services/agents-ia`, `/fr/services/automatisation-ia`, `/fr/services/data-engineering`, `/fr/services/saas-ai`, `/fr/services/machine-learning`. This immediately restores sitemap reliability for all crawlers.

**3. Add a privacy policy and legal notice** (2-4 hours)

Use a GDPR privacy policy generator (CNIL's template or Iubenda). Add a `mentions-legales` page with SIRET number, legal form, hosting provider details. Link both from the footer. This eliminates the most damaging brand contradiction on the site.

**4. Add `og:image` globally** (1 hour)

Design a 1200x630px OG image (Figma, Canva — match the site's dark theme). Add it to the `generateMetadata` call in `app/[lang]/layout.tsx`. This immediately improves every shared link across LinkedIn, X, Slack, and WhatsApp.

**5. Fix the `BlogPosting` schema** (1 hour)

Add `image`, `dateModified`, `publisher` (as Person with image), and `speakable` to the blog article schema in `app/[lang]/blog/[slug]/page.tsx`. Unlocks Google Article rich result eligibility. Add `dateModified` to MDX frontmatter for the existing article.

**6. Add security headers to `next.config.ts`** (30 min)

```ts
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
}
```

**7. Add an author byline component to blog articles** (1 hour)

Add below the article H1:
```
Pierre Kasparian — Étudiant ingénieur UTT | Freelance IA & RGPD
Publié le 15 janvier 2025 · 6 min de lecture
[→ À propos] [LinkedIn]
```

---

## 30-Day Action Plan

### Week 1: Fix Breaking Issues and Legal Compliance
- [ ] Create `public/llms.txt` with the template above
- [ ] Remove 5 dead service pages from sitemap (or build placeholder with "coming soon" content and correct schema)
- [ ] Create `/fr/legal/politique-de-confidentialite` and `/fr/legal/mentions-legales`
- [ ] Add privacy policy link to footer and contact form
- [ ] Add `og:image` globally (design one image, wire it into `generateMetadata`)
- [ ] Add six security headers to `next.config.ts`
- [ ] Fix English hreflang: remove `hreflang="en"` alternates on all pages except the one English blog post
- [ ] Change root redirect from 307 to 308

### Week 2: Schema and Entity Signals
- [ ] Add `ProfessionalService` JSON-LD to `lib/seo.ts` and inject via layout (see template below)
- [ ] Expand `personSchema`: add `image` (headshot URL), `description`, `knowsAbout` array, `hasOccupation`
- [ ] Fix `BlogPosting` schema: add `image`, `dateModified`, `publisher`, `mainEntityOfPage`, `speakable`
- [ ] Add `BreadcrumbList` schema to all non-homepage routes
- [ ] Add author byline component to all blog articles
- [ ] Fix the "4+ years" stat to "3+ years" or annotate with context
- [ ] Remove `/fr/tools` from sitemap (placeholder page)
- [ ] Set up Bing Webmaster Tools + submit sitemap (add `msvalidate.01` meta tag)

### Week 3: Content Depth
- [ ] Expand RGPD/LLM blog article from 520 to 1,500+ words:
  - Add CNIL guidance citation and GDPR Article 44-46 reference
  - Add LiveSession case study section (architecture, OVH VPS choice, 95% relevance result)
  - Add decision tree: "If your use case is X, use solution Y"
  - Update `dateModified` in MDX frontmatter
  - Fix the "6 min read" label to match actual word count
- [ ] Publish second blog article: "Comment j'ai construit un chatbot RAG RGPD conforme pour une PME" (1,200+ words, firsthand case study, LiveSession or Ailog project)
- [ ] Add an email address to the contact page and footer

### Week 4: Brand Presence and Service Content
- [ ] Build the 5 service detail pages (or at minimum 2 highest-priority ones: `/fr/services/agents-ia` and `/fr/services/automatisation-ia`) with:
  - H1 (service name)
  - H2 "Qu'est-ce que [service] ?" + 50-word direct answer
  - H2 "Comment ça fonctionne ?" + 4-step numbered process
  - FAQ section with 3-5 questions targeting SEO_KEYWORDS.md terms
  - Link to relevant project as case study proof
  - `Service` schema with `ServiceType`, `provider` (Person), `areaServed`
- [ ] Register on Malt.fr freelance directory (creates a third-party entity reference)
- [ ] Begin contributing to Reddit: join r/selfhosted and answer 1 question per week about GDPR-compliant self-hosted AI — link to blog article where appropriate and within subreddit rules
- [ ] Add FAQ schema (`FAQPage`) to service pages

---

## JSON-LD Templates

### ProfessionalService Schema (add to `lib/seo.ts`)

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Pierre Kasparian — Intégration IA freelance",
  "url": "https://pierrekasparian.com",
  "description": "Freelance spécialisé en intégration IA conforme RGPD : chatbots RAG, agents IA, data engineering et automatisation pour PME et startups françaises.",
  "founder": {
    "@type": "Person",
    "name": "Pierre Kasparian",
    "url": "https://pierrekasparian.com",
    "sameAs": [
      "https://www.linkedin.com/in/pierre-kasparian-486101259/",
      "https://github.com/PierreKasparian/"
    ]
  },
  "areaServed": { "@type": "Country", "name": "France" },
  "serviceType": ["Intégration LLM", "RAG sur mesure", "Agents IA", "Conformité RGPD IA", "Data Engineering", "Automatisation IA"],
  "knowsAbout": ["Large Language Models", "Retrieval-Augmented Generation", "RGPD", "Python", "LangChain", "Mistral AI"],
  "sameAs": [
    "https://www.linkedin.com/in/pierre-kasparian-486101259/",
    "https://github.com/PierreKasparian/"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "ratingCount": "3",
    "bestRating": "5"
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Charles Reizine" },
      "reviewBody": "Following his internship, we continued working with Pierre as a freelancer. He is hardworking, efficient, precise and reliable.",
      "datePublished": "2026-02-01",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Laurent Janolin" },
      "reviewBody": "Pierre developed a solution that met our specifications, responding concretely and effectively to our needs. Always attentive, reliable and committed.",
      "datePublished": "2026-02-01",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Baptiste Morel" },
      "reviewBody": "Pierre completed a web application development assignment. He made steady progress and delivered clear presentations. Working with Pierre is very pleasant!",
      "datePublished": "2025-08-01",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
    }
  ]
}
```

### Enhanced Person Schema (replace existing in `lib/seo.ts`)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Pierre Kasparian",
  "url": "https://pierrekasparian.com",
  "jobTitle": "Freelance en intégration IA",
  "description": "Étudiant ingénieur à l'UTT et freelance en intégration IA. Je déploie des LLM, RAG et agents IA pour les PME françaises, avec une expertise forte en conformité RGPD et hébergement européen.",
  "image": "https://pierrekasparian.com/[REPLACE: path-to-headshot.jpg]",
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": "Université de Technologie de Troyes",
    "url": "https://www.utt.fr"
  },
  "knowsAbout": [
    "Intégration LLM", "Retrieval-Augmented Generation", "Conformité RGPD", "Python",
    "LangChain", "Mistral AI", "Ingénierie des données", "Automatisation IA", "Agents IA", "n8n", "dbt", "Airflow"
  ],
  "hasOccupation": {
    "@type": "Occupation",
    "name": "Ingénieur IA freelance",
    "occupationLocation": { "@type": "Country", "name": "France" },
    "skills": "LLM, RAG, RGPD, Python, LangChain, Mistral, OpenAI, dbt, Airflow"
  },
  "sameAs": [
    "https://www.linkedin.com/in/pierre-kasparian-486101259/",
    "https://github.com/PierreKasparian/"
  ]
}
```

---

## Appendix: Pages Analyzed

| URL | Status | Key GEO Issues |
|---|---|---|
| `/fr` (homepage) | 200 | No og:image, no security headers, schema present but incomplete |
| `/fr/about` | 200 | No schema, no structured credentials, no author photo in schema |
| `/fr/services` | 200 | No Service schema, no FAQ, no pricing anchor |
| `/fr/services/agents-ia` | **404** | **In sitemap at priority 0.9 — critical** |
| `/fr/services/automatisation-ia` | **404** | **In sitemap at priority 0.9 — critical** |
| `/fr/services/data-engineering` | **404** | **In sitemap at priority 0.9 — critical** |
| `/fr/services/saas-ai` | **404** | **In sitemap at priority 0.9 — critical** |
| `/fr/services/machine-learning` | **404** | **In sitemap at priority 0.9 — critical** |
| `/fr/blog` | 200 | Only 1 article listed |
| `/fr/blog/integrer-llm-rgpd` | 200 | 520 words, no citations, no author byline, BlogPosting schema incomplete |
| `/en/blog/integrate-llm-gdpr` | 200 | Same issues as French version |
| `/fr/projects/livesession-formation` | 200 | No CreativeWork schema, no quantified metrics on page |
| `/fr/projects/pretto-email-pipeline` | 200 | No CreativeWork schema, no metrics |
| `/fr/tools` | 200 | Placeholder "coming soon" — indexed but no content |
| `/fr/contact` | 200 | No privacy policy link, no displayed email address |
| `/fr/education` | 200 | Not analyzed in depth |
| `/fr/education/LLM-course` | 200 | Uppercase slug — should be `/llm-course` |
| `/robots.txt` | 200 | Missing AI crawler directives, Yandex-only `Host:` directive |
| `/llms.txt` | **404** | **Critical — file does not exist** |
| `/sitemap.xml` | 200 | 33 URLs, uniform lastmod timestamps, 5 dead URLs at priority 0.9 |
