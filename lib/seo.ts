export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://pierrekasparian.com";

/**
 * Build `alternates.languages` for Next.js generateMetadata.
 * @param path - path WITHOUT locale prefix, e.g. "/projects" or "/projects/my-slug"
 */
export function buildAlternates(path: string) {
  return {
    fr: `${SITE_URL}/fr${path}`,
    en: `${SITE_URL}/en${path}`,
    "x-default": `${SITE_URL}/fr${path}`,
  };
}

/**
 * Build `alternates.languages` for pages that only exist in French.
 * @param path - path WITHOUT locale prefix
 */
export function buildAlternatesFrOnly(path: string) {
  return {
    fr: `${SITE_URL}/fr${path}`,
    "x-default": `${SITE_URL}/fr${path}`,
  };
}

/**
 * Default OG image used as fallback across all pages.
 * Replace with a proper 1200x630 branded image at /og-image.jpg when available.
 */
export const defaultOgImage = {
  url: `${SITE_URL}/IMG_4704.jpg`,
  alt: "Pierre Kasparian — Freelance IA & data",
};

/**
 * Build `openGraph` metadata for Next.js generateMetadata.
 * @param title - page title
 * @param description - page description
 * @param locale - "fr" or "en"
 * @param type - "website" (default) or "article"
 */
export function buildOpenGraph(
  title: string,
  description: string,
  locale: string,
  type: "website" | "article" = "website",
) {
  return {
    type,
    title,
    description,
    siteName: "Pierre Kasparian",
    locale: locale === "fr" ? "fr_FR" : "en_US",
    alternateLocale: [locale === "fr" ? "en_US" : "fr_FR"],
    images: [defaultOgImage],
  };
}

/**
 * Build `twitter` card metadata.
 */
export function buildTwitterCard(title: string, description: string) {
  return {
    card: "summary_large_image" as const,
    title,
    description,
  };
}

/**
 * Build a BreadcrumbList JSON-LD schema.
 * Last item should have no `url` (current page).
 */
export function buildBreadcrumbSchema(items: { name: string; url?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.url && { item: item.url }),
    })),
  };
}

/**
 * JSON-LD schema for Pierre Kasparian as a Person.
 */
export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Pierre Kasparian",
  url: SITE_URL,
  jobTitle: "Freelance en intégration IA",
  description:
    "Étudiant ingénieur à l'UTT et freelance en intégration IA. Je déploie des LLM, RAG et agents IA pour les PME françaises, avec une expertise forte en conformité RGPD et hébergement européen.",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Université de Technologie de Troyes",
    url: "https://www.utt.fr",
  },
  knowsAbout: [
    "Intégration LLM",
    "Retrieval-Augmented Generation",
    "Conformité RGPD",
    "Python",
    "LangChain",
    "Mistral AI",
    "Ingénierie des données",
    "Automatisation IA",
    "Agents IA",
    "n8n",
    "dbt",
    "Airflow",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Ingénieur IA freelance",
    occupationLocation: { "@type": "Country", name: "France" },
    skills: "LLM, RAG, RGPD, Python, LangChain, Mistral, OpenAI, dbt, Airflow",
  },
  image: `${SITE_URL}/IMG_4704.jpg`,
  sameAs: [
    "https://www.linkedin.com/in/pierre-kasparian-486101259/",
    "https://github.com/PierreKasparian/",
  ],
};

/**
 * JSON-LD schema for the ProfessionalService entity.
 */
export const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Pierre Kasparian - Intégration IA freelance",
  url: SITE_URL,
  description:
    "Freelance spécialisé en intégration IA conforme RGPD : chatbots RAG, agents IA, data engineering et automatisation pour PME et startups françaises.",
  founder: {
    "@type": "Person",
    name: "Pierre Kasparian",
    url: SITE_URL,
    sameAs: [
      "https://www.linkedin.com/in/pierre-kasparian-486101259/",
      "https://github.com/PierreKasparian/",
    ],
  },
  areaServed: { "@type": "Country", name: "France" },
  serviceType: [
    "Intégration LLM",
    "RAG sur mesure",
    "Agents IA",
    "Conformité RGPD IA",
    "Data Engineering",
    "Automatisation IA",
  ],
  sameAs: [
    "https://www.linkedin.com/in/pierre-kasparian-486101259/",
    "https://github.com/PierreKasparian/",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    ratingCount: "3",
    bestRating: "5",
  },
  review: [
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Charles Reizine" },
      reviewBody:
        "Following his internship, we continued working with Pierre as a freelancer. He is hardworking, efficient, precise and reliable.",
      datePublished: "2026-02-01",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Laurent Janolin" },
      reviewBody:
        "Pierre developed a solution that met our specifications, responding concretely and effectively to our needs. Always attentive, reliable and committed.",
      datePublished: "2026-02-01",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Baptiste Morel" },
      reviewBody:
        "Pierre completed a web application development assignment. He made steady progress and delivered clear presentations. Working with Pierre is very pleasant!",
      datePublished: "2025-08-01",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
    },
  ],
};

/**
 * JSON-LD schema for the website.
 */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Pierre Kasparian",
  url: SITE_URL,
};
