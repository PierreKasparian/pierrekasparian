import {
  ArrowRight,
  Bot,
  Brain,
  Database,
  Rocket,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { prestations } from "@/data/prestations";
import { projects } from "@/data/projects";
import { buildAlternates, SITE_URL } from "@/lib/seo";

import { getDictionary, hasLocale, locales, type Locale } from "../dictionaries";

const ICON_MAP: Record<string, LucideIcon> = {
  Bot,
  Brain,
  Database,
  Rocket,
  Sparkles,
  Zap,
};

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/services">): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return {
    title: dict.prestations.metaTitle,
    description: dict.prestations.metaDescription,
    alternates: { languages: buildAlternates("/services") },
  };
}

export default async function PrestationsPage({
  params,
}: PageProps<"/[lang]/services">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.prestations.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
    url: `${SITE_URL}/${lang}/services`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* HEADER */}
      <section className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {dict.prestations.heading}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--muted-foreground)]">
            {dict.prestations.subtitle}
          </p>
        </div>
      </section>

      {/* LIST */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-6 md:grid-cols-2">
            {prestations.map((p) => {
              const Icon = ICON_MAP[p.icon] ?? Sparkles;
              const relatedProjects = (p.relatedProjectSlugs ?? [])
                .map((slug) => projects.find((proj) => proj.slug === slug))
                .filter(Boolean) as (typeof projects)[number][];
              return (
                <Card key={p.id} className="flex h-full flex-col">
                  <CardHeader>
                    <div className="mb-3 inline-flex size-10 items-center justify-center rounded-md bg-[var(--accent)] text-[var(--accent-foreground)]">
                      <Icon className="size-5" />
                    </div>
                    <CardTitle>{p.title[lang]}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col">
                    <ul className="space-y-1.5">
                      {p.bullets[lang].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--primary)]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2 pt-4">
                      {p.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    {relatedProjects.length > 0 && (
                      <div className="mt-4 border-t border-[var(--border)] pt-4">
                        <p className="mb-2 text-xs font-medium tracking-wide text-[var(--muted-foreground)] uppercase">
                          {dict.prestations.relatedProjects}
                        </p>
                        <ul className="space-y-1">
                          {relatedProjects.map((proj) => (
                            <li key={proj.slug}>
                              <Link
                                href={`/${lang}/projects/${proj.slug}`}
                                className="group inline-flex items-center gap-1 text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
                              >
                                <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                                {proj.title[lang]}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Link
                      href={`/${lang}/services/${p.id}`}
                      className="group inline-flex items-center gap-1 text-sm font-medium text-[var(--primary)] hover:underline"
                    >
                      {dict.serviceDetail.learnMore}
                      <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </CardFooter>
                </Card>
              );
            })}
          </div>

          {/* FAQ */}
          <div className="mt-20">
            <h2 className="text-2xl font-semibold tracking-tight">
              {dict.prestations.faqHeading}
            </h2>
            <dl className="mt-6 divide-y divide-[var(--border)]">
              {dict.prestations.faq.map((item, i) => (
                <details key={i} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                    <dt className="leading-snug font-medium">{item.q}</dt>
                    <span className="mt-0.5 shrink-0 text-[var(--muted-foreground)] transition-transform group-open:rotate-180">
                      ▾
                    </span>
                  </summary>
                  <dd className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground)]">
                    {item.a}
                  </dd>
                </details>
              ))}
            </dl>
          </div>

          {/* CTA CONTACT */}
          <div className="mt-16 rounded-xl border border-[var(--border)] bg-[var(--secondary)]/30 p-8 text-center">
            <p className="text-lg font-medium">{dict.prestations.contactCta}</p>
            <Link
              href={`/${lang}/contact`}
              className={`mt-4 inline-flex ${buttonVariants({ size: "lg" })}`}
            >
              {dict.home.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
