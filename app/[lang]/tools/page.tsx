import {
  ArrowRight,
  Bot,
  Braces,
  Calculator,
  Cpu,
  Sparkles,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getAllArticles, type BlogCategory } from "@/lib/mdx";
import { buildAlternates } from "@/lib/seo";

import {
  getDictionary,
  hasLocale,
  locales,
  type Locale,
} from "../dictionaries";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/tools">): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return {
    title: dict.tools.metaTitle,
    description: dict.tools.metaDescription,
    alternates: { languages: buildAlternates("/tools") },
  };
}

const CATEGORY_COLORS: Record<BlogCategory, string> = {
  article: "bg-indigo-500",
  guide: "bg-teal-500",
  "case-study": "bg-amber-500",
};

export default async function ToolsPage({
  params,
}: PageProps<"/[lang]/tools">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const recentArticles = getAllArticles(lang).slice(0, 4);

  return (
    <>
      {/* HEADER */}
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-[5%] size-[320px] -translate-y-1/2 rounded-full bg-[var(--accent-strong)] opacity-[0.07] blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/5 px-3 py-1 text-xs font-medium text-[var(--primary)]">
            <Sparkles className="size-3" />
            {lang === "fr" ? "Mini-apps IA gratuites" : "Free AI mini-apps"}
          </div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {dict.tools.heading}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--muted-foreground)]">
            {dict.tools.subtitle}
          </p>
        </div>
      </section>

      {/* TOOLS GRID */}
      <section className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="mb-8 text-sm font-medium tracking-wider text-[var(--muted-foreground)] uppercase">
            {dict.tools.toolsGrid}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href={`/${lang}/tools/ai-answer-generator`}
              className="group relative flex flex-col gap-4 overflow-hidden rounded-xl border border-[var(--border)] p-6 transition-all hover:border-[var(--primary)]/30 hover:shadow-[var(--primary)]/5 hover:shadow-lg"
            >
              {/* gradient top strip */}
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[var(--primary)] to-[var(--accent-strong)] opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="inline-flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--accent-strong)]">
                <Bot className="size-5 text-white" />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <p className="leading-snug font-medium">
                    {dict.tools.aiAnswer.heading}
                  </p>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                    {lang === "fr" ? "Gratuit" : "Free"}
                  </span>
                </div>
                <p className="text-sm text-[var(--muted-foreground)]">
                  {dict.tools.aiAnswer.description}
                </p>
              </div>

              <div className="transition-gap mt-auto flex items-center gap-1 text-sm font-medium text-[var(--primary)] group-hover:gap-2">
                <span>
                  {lang === "fr" ? "Essayer l'outil" : "Try the tool"}
                </span>
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>

            {/* RAG Cost Calculator */}
            <Link
              href={`/${lang}/tools/rag-cost-calculator`}
              className="group relative flex flex-col gap-4 overflow-hidden rounded-xl border border-[var(--border)] p-6 transition-all hover:border-[var(--primary)]/30 hover:shadow-[var(--primary)]/5 hover:shadow-lg"
            >
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[var(--primary)] to-[var(--accent-strong)] opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="inline-flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--accent-strong)]">
                <Calculator className="size-5 text-white" />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <p className="leading-snug font-medium">
                    {dict.tools.ragCost.heading}
                  </p>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                    {lang === "fr" ? "Gratuit" : "Free"}
                  </span>
                </div>
                <p className="text-sm text-[var(--muted-foreground)]">
                  {dict.tools.ragCost.description}
                </p>
              </div>

              <div className="transition-gap mt-auto flex items-center gap-1 text-sm font-medium text-[var(--primary)] group-hover:gap-2">
                <span>
                  {lang === "fr" ? "Essayer l'outil" : "Try the tool"}
                </span>
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>

            {/* VRAM Simulator */}
            <Link
              href={`/${lang}/tools/vram-simulator`}
              className="group relative flex flex-col gap-4 overflow-hidden rounded-xl border border-[var(--border)] p-6 transition-all hover:border-[var(--primary)]/30 hover:shadow-[var(--primary)]/5 hover:shadow-lg"
            >
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[var(--primary)] to-[var(--accent-strong)] opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="inline-flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--accent-strong)]">
                <Cpu className="size-5 text-white" />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <p className="leading-snug font-medium">
                    {dict.tools.vramSimulator.heading}
                  </p>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                    {lang === "fr" ? "Gratuit" : "Free"}
                  </span>
                </div>
                <p className="text-sm text-[var(--muted-foreground)]">
                  {dict.tools.vramSimulator.description}
                </p>
              </div>

              <div className="transition-gap mt-auto flex items-center gap-1 text-sm font-medium text-[var(--primary)] group-hover:gap-2">
                <span>
                  {lang === "fr" ? "Essayer l'outil" : "Try the tool"}
                </span>
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>

            {/* Schema Generator */}
            <Link
              href={`/${lang}/tools/schema-generator`}
              className="group relative flex flex-col gap-4 overflow-hidden rounded-xl border border-[var(--border)] p-6 transition-all hover:border-[var(--primary)]/30 hover:shadow-[var(--primary)]/5 hover:shadow-lg"
            >
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[var(--primary)] to-[var(--accent-strong)] opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="inline-flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--accent-strong)]">
                <Braces className="size-5 text-white" />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <p className="leading-snug font-medium">
                    {dict.tools.schemaGenerator.heading}
                  </p>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                    {lang === "fr" ? "Gratuit" : "Free"}
                  </span>
                </div>
                <p className="text-sm text-[var(--muted-foreground)]">
                  {dict.tools.schemaGenerator.description}
                </p>
              </div>

              <div className="transition-gap mt-auto flex items-center gap-1 text-sm font-medium text-[var(--primary)] group-hover:gap-2">
                <span>
                  {lang === "fr" ? "Essayer l'outil" : "Try the tool"}
                </span>
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* BLOG LINKS */}
      {recentArticles.length > 0 && (
        <section>
          <div className="mx-auto max-w-6xl px-6 py-16">
            <h2 className="mb-8 text-sm font-medium tracking-wider text-[var(--muted-foreground)] uppercase">
              {dict.tools.blogSection}
            </h2>
            <ul className="divide-y divide-[var(--border)]">
              {recentArticles.map((article) => (
                <li key={`${article.category}/${article.slug}`}>
                  <Link
                    href={`/${lang}/blog/${article.category}/${article.slug}`}
                    className="group flex items-start justify-between gap-4 py-5"
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`mt-1.5 size-2 shrink-0 rounded-full ${CATEGORY_COLORS[article.category]}`}
                      />
                      <div className="space-y-0.5">
                        <p className="leading-snug font-medium transition-colors group-hover:text-[var(--primary)]">
                          {article.title}
                        </p>
                        <p className="line-clamp-1 text-sm text-[var(--muted-foreground)]">
                          {article.description}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="mt-0.5 size-4 shrink-0 text-[var(--muted-foreground)] transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
