import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import { getAllArticles } from "@/lib/mdx";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buildAlternates } from "@/lib/seo";

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
  const dict = await getDictionary(lang as Locale);
  const articles = getAllArticles(lang);

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
                  href={`/${lang}/blog/${article.slug}`}
                  className="group"
                >
                  <Card className="transition-shadow group-hover:shadow-md">
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
                            }
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
