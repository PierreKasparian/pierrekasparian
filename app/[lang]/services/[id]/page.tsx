import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { prestations } from "@/data/prestations";
import { projects } from "@/data/projects";
import {
  buildAlternates,
  buildBreadcrumbSchema,
  SITE_URL,
} from "@/lib/seo";

import {
  getDictionary,
  hasLocale,
  locales,
  type Locale,
} from "../../dictionaries";

export async function generateStaticParams() {
  return locales.flatMap((lang) =>
    prestations.map((p) => ({ lang, id: p.id })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/services/[id]">): Promise<Metadata> {
  const { lang, id } = await params;
  const p = prestations.find((x) => x.id === id);
  if (!p) return {};
  return {
    title: p.title[lang as Locale],
    description: p.tagline[lang as Locale],
    alternates: { languages: buildAlternates(`/services/${id}`) },
  };
}

export default async function ServiceDetailPage({
  params,
}: PageProps<"/[lang]/services/[id]">) {
  const { lang, id } = await params;
  if (!hasLocale(lang)) notFound();
  const p = prestations.find((x) => x.id === id);
  if (!p) notFound();
  const dict = await getDictionary(lang);

  const relatedProjects = (p.relatedProjectSlugs ?? [])
    .map((slug) => projects.find((proj) => proj.slug === slug))
    .filter(Boolean) as (typeof projects)[number][];

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: lang === "fr" ? "Accueil" : "Home", url: `${SITE_URL}/${lang}` },
    {
      name: lang === "fr" ? "Prestations" : "Services",
      url: `${SITE_URL}/${lang}/services`,
    },
    { name: p.title[lang] },
  ]);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: p.title[lang],
    description: p.whatIs[lang],
    serviceType: p.title[lang],
    provider: {
      "@type": "Person",
      name: "Pierre Kasparian",
      url: SITE_URL,
    },
    areaServed: { "@type": "Country", name: "France" },
    url: `${SITE_URL}/${lang}/services/${id}`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: p.faq.map((item) => ({
      "@type": "Question",
      name: item.q[lang],
      acceptedAnswer: { "@type": "Answer", text: item.a[lang] },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* HEADER */}
      <section className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
          <Link
            href={`/${lang}/services`}
            className="mb-6 inline-block text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          >
            {dict.serviceDetail.back}
          </Link>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            {p.title[lang]}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--muted-foreground)]">
            {p.tagline[lang]}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {p.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-16 space-y-20">
        {/* WHAT IS IT */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight">
            {dict.serviceDetail.whatIs}
          </h2>
          <p className="mt-4 leading-relaxed text-[var(--muted-foreground)]">
            {p.whatIs[lang]}
          </p>
        </section>

        {/* HOW IT WORKS */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight">
            {dict.serviceDetail.howItWorks}
          </h2>
          <ol className="mt-6 space-y-6">
            {p.steps.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-sm font-semibold text-[var(--primary-foreground)]">
                  {i + 1}
                </span>
                <div>
                  <p className="font-medium">{step.title[lang]}</p>
                  <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                    {step.body[lang]}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* USE CASES */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight">
            {dict.serviceDetail.useCases}
          </h2>
          <ul className="mt-4 space-y-2">
            {p.bullets[lang].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--primary)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* RELATED PROJECTS */}
        {relatedProjects.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold tracking-tight">
              {dict.serviceDetail.relatedProjects}
            </h2>
            <ul className="mt-4 space-y-2">
              {relatedProjects.map((proj) => (
                <li key={proj.slug}>
                  <Link
                    href={`/${lang}/projects/${proj.slug}`}
                    className="group inline-flex items-center gap-1 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                  >
                    <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                    {proj.title[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight">
            {dict.serviceDetail.faq}
          </h2>
          <dl className="mt-6 divide-y divide-[var(--border)]">
            {p.faq.map((item, i) => (
              <details key={i} className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                  <dt className="font-medium leading-snug">{item.q[lang]}</dt>
                  <span className="mt-0.5 shrink-0 text-[var(--muted-foreground)] transition-transform group-open:rotate-180">
                    ▾
                  </span>
                </summary>
                <dd className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground)]">
                  {item.a[lang]}
                </dd>
              </details>
            ))}
          </dl>
        </section>

        {/* CTA */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--secondary)]/30 p-8 text-center">
          <p className="text-lg font-medium">{dict.serviceDetail.contactCta}</p>
          <Link
            href={`/${lang}/contact`}
            className={`mt-4 inline-flex ${buttonVariants({ size: "lg" })}`}
          >
            {dict.home.ctaSecondary}
          </Link>
        </div>
      </div>
    </>
  );
}
