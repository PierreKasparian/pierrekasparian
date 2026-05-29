import { ChevronDown } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { VramSimulator } from "@/components/tools/VramSimulator";
import {
  buildAlternates,
  buildBreadcrumbSchema,
  buildOpenGraph,
  buildTwitterCard,
  personSchema,
  SITE_URL,
} from "@/lib/seo";

import {
  getDictionary,
  hasLocale,
  locales,
  type Locale,
} from "../../dictionaries";

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const v = dict.tools.vramSimulator;
  return {
    title: v.metaTitle,
    description: v.metaDescription,
    alternates: { languages: buildAlternates("/tools/vram-simulator") },
    openGraph: buildOpenGraph(v.metaTitle, v.metaDescription, lang),
    twitter: buildTwitterCard(v.metaTitle, v.metaDescription),
  };
}

export default async function VramSimulatorPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const v = dict.tools.vramSimulator;

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: lang === "fr" ? "Accueil" : "Home", url: `${SITE_URL}/${lang}` },
    { name: dict.tools.heading, url: `${SITE_URL}/${lang}/tools` },
    { name: v.heading },
  ]);

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: v.heading,
    description: v.metaDescription,
    url: `${SITE_URL}/${lang}/tools/vram-simulator`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    inLanguage: lang === "fr" ? "fr-FR" : "en-US",
    author: {
      "@type": "Person",
      name: personSchema.name,
      url: personSchema.url,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: v.faq.map((item: { q: string; a: string }) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* HEADER */}
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-[10%] size-[340px] -translate-y-1/2 rounded-full bg-[var(--primary)] opacity-[0.06] blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-[5%] size-[240px] rounded-full bg-[var(--accent-strong)] opacity-[0.07] blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <p className="mb-4 text-sm text-[var(--muted-foreground)]">
            <Link
              href={`/${lang}/tools`}
              className="transition-colors hover:text-[var(--foreground)]"
            >
              {dict.tools.heading}
            </Link>
            {" / "}
            {v.heading}
          </p>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/5 px-3 py-1 text-xs font-medium text-[var(--primary)]">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            {v.badge}
          </div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {v.heading}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--muted-foreground)]">
            {v.description}
          </p>
        </div>
      </section>

      {/* INTRO + SIMULATOR */}
      <section>
        <div className="mx-auto max-w-4xl space-y-8 px-6 py-16">
          <p className="leading-relaxed text-[var(--muted-foreground)]">
            {v.intro}
          </p>
          <VramSimulator
            dict={{
              modelLabel: v.modelLabel,
              quantLabel: v.quantLabel,
              contextLabel: v.contextLabel,
              quantLabels: v.quantLabels,
              resultTitle: v.resultTitle,
              baseVramLabel: v.baseVramLabel,
              kvCacheLabel: v.kvCacheLabel,
              hardwareTitle: v.hardwareTitle,
              noHardware: v.noHardware,
              hwTypes: v.hwTypes,
              noteNvlink: v.noteNvlink,
              noteApple: v.noteApple,
              methodTitle: v.methodTitle,
              methodBody: v.methodBody,
              methodFormula: v.methodFormula,
            }}
          />
        </div>
      </section>

      {/* SEO CONTENT SECTIONS */}
      <section className="border-t border-[var(--border)] bg-[var(--secondary)]/40">
        <div className="mx-auto max-w-4xl space-y-12 px-6 py-16">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              {v.section1Title}
            </h2>
            <p className="leading-relaxed text-[var(--muted-foreground)]">
              {v.section1Body}
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              {v.section2Title}
            </h2>
            <p className="leading-relaxed text-[var(--muted-foreground)]">
              {v.section2Body}
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              {v.section3Title}
            </h2>
            <p className="leading-relaxed text-[var(--muted-foreground)]">
              {v.section3Body}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-[var(--border)]">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <h2 className="mb-8 text-2xl font-semibold tracking-tight">
            {v.faqTitle}
          </h2>
          <div className="divide-y divide-[var(--border)]">
            {v.faq.map((item: { q: string; a: string }, i: number) => (
              <details key={i} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                  {item.q}
                  <ChevronDown className="size-4 shrink-0 text-[var(--muted-foreground)] transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground)]">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[var(--border)] bg-gradient-to-br from-[var(--primary)]/5 via-transparent to-[var(--accent-strong)]/5">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <div className="space-y-4 rounded-xl border border-[var(--primary)]/20 bg-[var(--primary)]/5 px-8 py-10">
            <p className="max-w-xl text-lg leading-snug font-semibold">
              {v.ctaTitle}
            </p>
            <p className="max-w-xl text-sm text-[var(--muted-foreground)]">
              {v.ctaBody}
            </p>
            <Link
              href={`/${lang}/contact`}
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-[var(--primary-foreground)] transition-opacity hover:opacity-80"
            >
              {v.ctaButton}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
