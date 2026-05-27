import fs from "fs";
import path from "path";

import type { MetadataRoute } from "next";

import { prestations } from "@/data/prestations";
import { projects } from "@/data/projects";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://pierrekasparian.com";

const locales = ["fr", "en"] as const;
type Locale = (typeof locales)[number];

const staticRoutes: {
  path: string;
  priority: number;
  changeFreq: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [
  { path: "", priority: 1.0, changeFreq: "weekly" },
  { path: "/about", priority: 0.8, changeFreq: "monthly" },
  { path: "/services", priority: 0.9, changeFreq: "monthly" },
  { path: "/projects", priority: 0.8, changeFreq: "monthly" },
  { path: "/blog", priority: 0.7, changeFreq: "weekly" },
  { path: "/tools", priority: 0.6, changeFreq: "monthly" },
  { path: "/contact", priority: 0.7, changeFreq: "yearly" },
];

function langAlternates(path: string): Record<Locale, string> {
  return Object.fromEntries(
    locales.map((l) => [l, `${BASE_URL}/${l}${path}`]),
  ) as Record<Locale, string>;
}

function getBlogSlugs(locale: Locale): string[] {
  const dir = path.join(process.cwd(), "content", "blog", locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.slice(0, -4));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Static routes (canonical = /fr, alternates fr + en)
  for (const route of staticRoutes) {
    entries.push({
      url: `${BASE_URL}/fr${route.path}`,
      lastModified: new Date(),
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
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: langAlternates(routePath) },
    });
  }

  // /services/[id] - same id for both locales
  for (const prestation of prestations) {
    const routePath = `/services/${prestation.id}`;
    entries.push({
      url: `${BASE_URL}/fr${routePath}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: { languages: langAlternates(routePath) },
    });
  }

  // /blog/[slug] - slugs differ per locale, no cross-linking
  for (const locale of locales) {
    for (const slug of getBlogSlugs(locale)) {
      entries.push({
        url: `${BASE_URL}/${locale}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
