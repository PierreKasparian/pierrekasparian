import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { Badge } from "@/components/ui/badge";
import { getAllArticles, getArticle } from "@/lib/mdx";
import {
  buildOpenGraph,
  buildTwitterCard,
  personSchema,
  SITE_URL,
} from "@/lib/seo";

import { getDictionary, hasLocale, locales } from "../../dictionaries";

export async function generateStaticParams() {
  return locales.flatMap((lang) =>
    getAllArticles(lang).map((article) => ({ lang, slug: article.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/blog/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const article = getArticle(lang, slug);
  if (!article) return {};

  const canonical = `${SITE_URL}/${lang}/blog/${slug}`;

  return {
    title: article.meta.title,
    description: article.meta.description,
    // Blog slugs differ per locale - no cross-language alternates to avoid broken hreflang
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
}: PageProps<"/[lang]/blog/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const article = getArticle(lang, slug);
  if (!article) notFound();
  const dict = await getDictionary(lang);

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.meta.title,
    description: article.meta.description,
    datePublished: article.meta.date,
    url: `${SITE_URL}/${lang}/blog/${slug}`,
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
        href={`/${lang}/blog`}
        className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
      >
        {dict.blog.back}
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
        </p>
      </div>

      {/* CONTENT */}
      <div className="prose prose-neutral dark:prose-invert mt-10 max-w-none">
        <MDXRemote source={article.content} />
      </div>
    </article>
  );
}
