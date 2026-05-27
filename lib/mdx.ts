import "server-only";
import fs from "fs";
import path from "path";

import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

export const BLOG_CATEGORIES = ["article", "guide", "case-study"] as const;
export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export function isBlogCategory(value: string): value is BlogCategory {
  return (BLOG_CATEGORIES as readonly string[]).includes(value);
}

export interface ArticleMeta {
  slug: string;
  category: BlogCategory;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: number;
  lang: string;
}

function getLangDir(lang: string) {
  return path.join(CONTENT_DIR, lang);
}

function asString(value: unknown, fallback: string): string {
  return typeof value === "string" ? value : fallback;
}

function asNumber(value: unknown, fallback: number): number {
  return typeof value === "number" ? value : fallback;
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) && value.every((v) => typeof v === "string")
    ? value
    : [];
}

function buildMeta(
  data: Record<string, unknown>,
  slug: string,
  category: BlogCategory,
  lang: string,
): ArticleMeta {
  return {
    slug,
    category,
    title: asString(data.title, slug),
    description: asString(data.description, ""),
    date: asString(data.date, ""),
    tags: asStringArray(data.tags),
    readingTime: asNumber(data.readingTime, 5),
    lang,
  };
}

/** Returns all articles for a given locale across all categories, sorted newest first. */
export function getAllArticles(lang: string): ArticleMeta[] {
  const langDir = getLangDir(lang);
  if (!fs.existsSync(langDir)) return [];

  const articles: ArticleMeta[] = [];

  for (const category of BLOG_CATEGORIES) {
    const categoryDir = path.join(langDir, category);
    if (!fs.existsSync(categoryDir)) continue;

    const files = fs.readdirSync(categoryDir).filter((f) => f.endsWith(".mdx"));
    for (const filename of files) {
      const slug = filename.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(categoryDir, filename), "utf-8");
      const { data } = matter(raw);
      articles.push(buildMeta(data, slug, category, lang));
    }
  }

  return articles.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Returns all articles for a given locale and category, sorted newest first. */
export function getArticlesByCategory(
  lang: string,
  category: BlogCategory,
): ArticleMeta[] {
  const categoryDir = path.join(getLangDir(lang), category);
  if (!fs.existsSync(categoryDir)) return [];

  const files = fs.readdirSync(categoryDir).filter((f) => f.endsWith(".mdx"));

  return files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(categoryDir, filename), "utf-8");
      const { data } = matter(raw);
      return buildMeta(data, slug, category, lang);
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Returns categories that have at least one article for a given locale. */
export function getAvailableCategories(lang: string): BlogCategory[] {
  return BLOG_CATEGORIES.filter((cat) => {
    const dir = path.join(getLangDir(lang), cat);
    if (!fs.existsSync(dir)) return false;
    return fs.readdirSync(dir).some((f) => f.endsWith(".mdx"));
  });
}

/** Returns a single article's metadata + raw MDX content. */
export function getArticle(
  lang: string,
  category: BlogCategory,
  slug: string,
): { meta: ArticleMeta; content: string } | null {
  const filePath = path.join(getLangDir(lang), category, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    meta: buildMeta(data, slug, category, lang),
    content,
  };
}
