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
import { getAllArticles, BLOG_CATEGORIES, type BlogCategory } from "@/lib/mdx";
import { buildAlternates } from "@/lib/seo";

import { getDictionary, hasLocale, type Locale } from "../dictionaries";

const CATEGORY_COLORS: Record<BlogCategory, string> = {
  article: "oklch(0.60 0.16 264)",
  guide: "oklch(0.68 0.13 180)",
  "case-study": "oklch(0.72 0.13 60)",
};

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/blog">): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return {
    title: dict.blog.metaTitle,
    description: dict.blog.metaDescription,
    alternates: { languages: buildAlternates("/blog") },
  };
}

export default async function BlogPage({ params }: PageProps<"/[lang]/blog">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const articles = getAllArticles(lang);

  // Group articles by category, keeping only categories that have articles
  const byCategory = BLOG_CATEGORIES.reduce<
    Record<BlogCategory, typeof articles>
  >(
    (acc, cat) => {
      acc[cat] = articles.filter((a) => a.category === cat);
      return acc;
    },
    { article: [], guide: [], "case-study": [] },
  );

  const activeCategories = BLOG_CATEGORIES.filter(
    (cat) => byCategory[cat].length > 0,
  );

  return (
    <>
      {/* HEADER */}
      <section className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {dict.blog.heading}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--muted-foreground)]">
            {dict.blog.subtitle}
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section>
        <div className="mx-auto max-w-4xl px-6 py-16">
          {articles.length === 0 ? (
            <p className="text-[var(--muted-foreground)]">{dict.blog.empty}</p>
          ) : (
            <div className="flex flex-col gap-16">
              {activeCategories.map((category) => (
                <div key={category}>
                  {/* Category heading */}
                  <div className="mb-6 flex items-baseline justify-between">
                    <h2 className="flex items-center gap-2 text-2xl font-semibold">
                      <span
                        className="inline-block size-2 rounded-full"
                        style={{ backgroundColor: CATEGORY_COLORS[category] }}
                      />
                      {dict.blog.categories[category]}
                    </h2>
                    <Link
                      href={`/${lang}/blog/${category}`}
                      className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                    >
                      {dict.blog.allArticles} →
                    </Link>
                  </div>

                  {/* Articles in this category */}
                  <div className="flex flex-col gap-6">
                    {byCategory[category].map((article) => (
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
                            <CardDescription>
                              {article.description}
                            </CardDescription>
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
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
