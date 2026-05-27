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
 * JSON-LD schema for Pierre Kasparian as a Person.
 */
export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Pierre Kasparian",
  url: SITE_URL,
  jobTitle: "AI Integration Freelancer",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Université de Technologie de Troyes",
    url: "https://www.utt.fr",
  },
  sameAs: [
    "https://www.linkedin.com/in/pierre-kasparian-486101259/",
    "https://github.com/PierreKasparian/",
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
