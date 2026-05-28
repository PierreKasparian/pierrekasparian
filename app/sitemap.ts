import type { MetadataRoute } from "next";

import { educations } from "@/data/education";
import { projects } from "@/data/projects";
import { getAllArticles } from "@/lib/mdx";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://pierrekasparian.com";

const locales = ["fr", "en"] as const;
type Locale = (typeof locales)[number];

const staticRoutes: {
  path: string;
  priority: number;
  changeFreq: MetadataRoute.Sitemap[number]["changeFrequency"];
  lastmod: string;
}[] = [
  { path: "", priority: 1.0, changeFreq: "weekly", lastmod: "2026-05-27" },
  {
    path: "/about",
    priority: 0.8,
    changeFreq: "monthly",
    lastmod: "2025-06-01",
  },
  {
    path: "/services",
    priority: 0.9,
    changeFreq: "monthly",
    lastmod: "2026-05-27",
  },
  {
    path: "/projects",
    priority: 0.8,
    changeFreq: "monthly",
    lastmod: "2026-05-27",
  },
  { path: "/blog", priority: 0.7, changeFreq: "weekly", lastmod: "2026-05-27" },
  {
    path: "/contact",
    priority: 0.7,
    changeFreq: "yearly",
    lastmod: "2025-06-01",
  },
  // /tools excluded until content is ready
];

function langAlternates(path: string): Record<Locale, string> {
  return Object.fromEntries(
    locales.map((l) => [l, `${BASE_URL}/${l}${path}`]),
  ) as Record<Locale, string>;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Static routes (canonical = /fr, alternates fr + en)
  for (const route of staticRoutes) {
    entries.push({
      url: `${BASE_URL}/fr${route.path}`,
      lastModified: new Date(route.lastmod),
      changeFrequency: route.changeFreq,
      priority: route.priority,
      alternates: { languages: langAlternates(route.path) },
    });
  }

  // /projects/[slug] - same slug for both locales
  for (const project of projects) {
    const routePath = `/projects/${project.slug}`;
    entries.push({
      url: `${BASE_URL}/fr${routePath}`,
      lastModified: new Date("2026-05-27"),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: langAlternates(routePath) },
    });
  }

  // /education - listing page
  entries.push({
    url: `${BASE_URL}/fr/education`,
    lastModified: new Date("2025-06-01"),
    changeFrequency: "monthly",
    priority: 0.5,
    alternates: { languages: langAlternates("/education") },
  });

  // /education/[slug] - same slug for both locales
  for (const education of educations) {
    const routePath = `/education/${education.slug}`;
    entries.push({
      url: `${BASE_URL}/fr${routePath}`,
      lastModified: new Date("2025-06-01"),
      changeFrequency: "monthly",
      priority: 0.5,
      alternates: { languages: langAlternates(routePath) },
    });
  }

  // /blog/[category]/[slug] - slugs differ per locale, no cross-linking
  for (const locale of locales) {
    for (const article of getAllArticles(locale)) {
      entries.push({
        url: `${BASE_URL}/${locale}/blog/${article.category}/${article.slug}`,
        lastModified: article.date ? new Date(article.date) : new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
