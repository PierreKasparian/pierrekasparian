import "server-only";
import fs from "fs";
import path from "path";

import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: number;
  lang: string;
}

function getArticlesDir(lang: string) {
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
  lang: string,
): ArticleMeta {
  return {
    slug,
    title: asString(data.title, slug),
    description: asString(data.description, ""),
    date: asString(data.date, ""),
    tags: asStringArray(data.tags),
    readingTime: asNumber(data.readingTime, 5),
    lang,
  };
}

/** Returns all articles for a given locale, sorted newest first. */
export function getAllArticles(lang: string): ArticleMeta[] {
  const dir = getArticlesDir(lang);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  return files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(dir, filename), "utf-8");
      const { data } = matter(raw);
      return buildMeta(data, slug, lang);
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Returns a single article's metadata + raw MDX content string. */
export function getArticle(
  lang: string,
  slug: string,
): { meta: ArticleMeta; content: string } | null {
  const filePath = path.join(getArticlesDir(lang), `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    meta: buildMeta(data, slug, lang),
    content,
  };
}
