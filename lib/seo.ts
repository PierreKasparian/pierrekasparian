export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://pierrekasparian.com";

/**
 * Build `alternates.languages` for Next.js generateMetadata.
 * @param path — path WITHOUT locale prefix, e.g. "/projects" or "/projects/my-slug"
 */
export function buildAlternates(path: string) {
  return {
    fr: `${SITE_URL}/fr${path}`,
    en: `${SITE_URL}/en${path}`,
    "x-default": `${SITE_URL}/fr${path}`,
  };
}
