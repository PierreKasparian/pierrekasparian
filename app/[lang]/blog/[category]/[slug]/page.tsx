import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { rehypePrettyCode } from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

import { Badge } from "@/components/ui/badge";
import {
  getAllArticles,
  getArticle,
  isBlogCategory,
  type BlogCategory,
} from "@/lib/mdx";
import {
  buildOpenGraph,
  buildTwitterCard,
  personSchema,
  SITE_URL,
} from "@/lib/seo";

import { getDictionary, hasLocale, locales } from "../../../dictionaries";

export async function generateStaticParams() {
  return locales.flatMap((lang) =>
    getAllArticles(lang).map((article) => ({
      lang,
      category: article.category,
      slug: article.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/blog/[category]/[slug]">): Promise<Metadata> {
  const { lang, category, slug } = await params;
  if (!isBlogCategory(category)) return {};

  const article = getArticle(lang, category as BlogCategory, slug);
  if (!article) return {};

  const canonical = `${SITE_URL}/${lang}/blog/${category}/${slug}`;

  return {
    title: article.meta.title,
    description: article.meta.description,
    alternates: { canonical },
    openGraph: {
      ...buildOpenGraph(
        article.meta.title,
        article.meta.description,
        lang,
        "article",
      ),
      publishedTime: article.meta.date,
      tags: article.meta.tags,
    },
    twitter: buildTwitterCard(article.meta.title, article.meta.description),
  };
}

export default async function BlogPostPage({
  params,
}: PageProps<"/[lang]/blog/[category]/[slug]">) {
  const { lang, category, slug } = await params;
  if (!hasLocale(lang)) notFound();
  if (!isBlogCategory(category)) notFound();

  const article = getArticle(lang, category as BlogCategory, slug);
  if (!article) notFound();

  const dict = await getDictionary(lang);

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.meta.title,
    description: article.meta.description,
    datePublished: article.meta.date,
    url: `${SITE_URL}/${lang}/blog/${category}/${slug}`,
    keywords: article.meta.tags.join(", "),
    author: {
      "@type": "Person",
      name: personSchema.name,
      url: personSchema.url,
    },
  };

  return (
    <article className="mx-auto max-w-4xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />

      {/* BACK */}
      <Link
        href={`/${lang}/blog/${category}`}
        className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
      >
        {dict.blog.backToCategory}
      </Link>

      {/* META */}
      <div className="mt-8">
        <div className="mb-4 flex flex-wrap gap-2">
          {article.meta.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {article.meta.title}
        </h1>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          {article.meta.date &&
            new Date(article.meta.date).toLocaleDateString(
              lang === "fr" ? "fr-FR" : "en-US",
              { year: "numeric", month: "long", day: "numeric" },
            )}
          {" · "}
          {article.meta.readingTime} {dict.blog.minuteRead}
          {" · "}
          <Link
            href={`/${lang}/blog/${category}`}
            className="hover:text-[var(--foreground)]"
          >
            {dict.blog.categories[category]}
          </Link>
        </p>
      </div>

      {/* CONTENT */}
      <div className="prose prose-neutral dark:prose-invert mt-10 max-w-none">
        <MDXRemote
          source={article.content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                [
                  rehypePrettyCode,
                  {
                    theme: {
                      dark: "github-dark-dimmed",
                      light: "github-light",
                    },
                  },
                ],
              ],
            },
          }}
        />
      </div>
    </article>
  );
}
