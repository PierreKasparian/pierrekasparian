import "server-only";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

export type ArticleMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: number;
  lang: string;
};

function getArticlesDir(lang: string) {
  return path.join(CONTENT_DIR, lang);
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
      return {
        slug,
        title: (data.title as string) ?? slug,
        description: (data.description as string) ?? "",
        date: (data.date as string) ?? "",
        tags: (data.tags as string[]) ?? [],
        readingTime: (data.readingTime as number) ?? 5,
        lang,
      } satisfies ArticleMeta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Returns a single article's metadata + raw MDX content string. */
export function getArticle(
  lang: string,
  slug: string
): { meta: ArticleMeta; content: string } | null {
  const filePath = path.join(getArticlesDir(lang), `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    meta: {
      slug,
      title: (data.title as string) ?? slug,
      description: (data.description as string) ?? "",
      date: (data.date as string) ?? "",
      tags: (data.tags as string[]) ?? [],
      readingTime: (data.readingTime as number) ?? 5,
      lang,
    },
    content,
  };
}
