import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  getArticlesByCategory,
  isBlogCategory,
  type BlogCategory,
  BLOG_CATEGORIES,
} from "@/lib/mdx";
import { buildAlternates } from "@/lib/seo";

import {
  getDictionary,
  hasLocale,
  locales,
  type Locale,
} from "../../dictionaries";

const CATEGORY_COLORS: Record<BlogCategory, string> = {
  article: "oklch(0.60 0.16 264)",
  guide: "oklch(0.68 0.13 180)",
  "case-study": "oklch(0.72 0.13 60)",
};

export async function generateStaticParams() {
  return locales.flatMap((lang) =>
    BLOG_CATEGORIES.map((category) => ({ lang, category })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/blog/[category]">): Promise<Metadata> {
  const { lang, category } = await params;
  const dict = await getDictionary(lang as Locale);
  if (!isBlogCategory(category)) return {};

  const categoryLabel = dict.blog.categories[category];
  return {
    title: `${categoryLabel} · ${dict.blog.metaTitle}`,
    description: dict.blog.categoryDescriptions[category],
    alternates: { languages: buildAlternates(`/blog/${category}`) },
  };
}

export default async function BlogCategoryPage({
  params,
}: PageProps<"/[lang]/blog/[category]">) {
  const { lang, category } = await params;
  if (!hasLocale(lang)) notFound();
  if (!isBlogCategory(category)) notFound();

  const dict = await getDictionary(lang);
  const articles = getArticlesByCategory(lang, category);
  const categoryLabel = dict.blog.categories[category];

  return (
    <>
      {/* HEADER */}
      <section className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <Link
            href={`/${lang}/blog`}
            className="mb-6 inline-block text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          >
            {dict.blog.back}
          </Link>
          <span
            className="mb-4 block h-1 w-10 rounded-full"
            style={{ backgroundColor: CATEGORY_COLORS[category] }}
          />
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {categoryLabel}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--muted-foreground)]">
            {dict.blog.categoryDescriptions[category]}
          </p>
        </div>
      </section>

      {/* ARTICLES */}
      <section>
        <div className="mx-auto max-w-4xl px-6 py-16">
          {articles.length === 0 ? (
            <p className="text-[var(--muted-foreground)]">{dict.blog.empty}</p>
          ) : (
            <div className="flex flex-col gap-8">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/${lang}/blog/${category}/${article.slug}`}
                  className="group"
                >
                  <Card
                    className="border-l-4 transition-shadow group-hover:shadow-md"
                    style={{ borderLeftColor: CATEGORY_COLORS[category] }}
                  >
                    <CardContent className="pt-6">
                      <div className="mb-3 flex flex-wrap gap-2">
                        {article.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <CardTitle className="mb-2 text-xl">
                        {article.title}
                      </CardTitle>
                      <CardDescription>{article.description}</CardDescription>
                      <p className="mt-3 text-xs text-[var(--muted-foreground)]">
                        {article.date &&
                          new Date(article.date).toLocaleDateString(
                            lang === "fr" ? "fr-FR" : "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )}
                        {" · "}
                        {article.readingTime} {dict.blog.minuteRead}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
