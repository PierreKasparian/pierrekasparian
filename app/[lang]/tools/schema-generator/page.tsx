import { ChevronDown, Database, FileCode2, Layers, Zap } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SchemaGenerator } from "@/components/tools/SchemaGenerator";
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
  const s = dict.tools.schemaGenerator;
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    alternates: {
      canonical: buildAlternates("/tools/schema-generator")[lang as Locale],
      languages: buildAlternates("/tools/schema-generator"),
    },
    openGraph: buildOpenGraph(s.metaTitle, s.metaDescription, lang),
    twitter: buildTwitterCard(s.metaTitle, s.metaDescription),
  };
}

const GUIDE_ICONS = [FileCode2, Zap, Layers, Database];

export default async function SchemaGeneratorPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const s = dict.tools.schemaGenerator;

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: lang === "fr" ? "Accueil" : "Home", url: `${SITE_URL}/${lang}` },
    { name: dict.tools.heading, url: `${SITE_URL}/${lang}/tools` },
    { name: s.heading },
  ]);

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: s.heading,
    description: s.metaDescription,
    url: `${SITE_URL}/${lang}/tools/schema-generator`,
    applicationCategory: "DeveloperApplication",
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
    mainEntity: s.faq.map((item: { q: string; a: string }) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const instructorExample =
    lang === "fr"
      ? `import instructor
from openai import OpenAI
# Collez votre classe Pydantic ici

client = instructor.from_openai(OpenAI())

result = client.chat.completions.create(
    model="gpt-4o-mini",
    response_model=Invoice,  # votre classe générée
    messages=[{
        "role": "user",
        "content": f"Extrais les données de cette facture :\\n{texte_facture}"
    }]
)

# result est un objet Invoice typé et validé
print(result.model_dump())
# -> {"company_name": "Acme Corp", "amount_before_tax": 1200.0, ...}`
      : `import instructor
from openai import OpenAI
# Paste your Pydantic class here

client = instructor.from_openai(OpenAI())

result = client.chat.completions.create(
    model="gpt-4o-mini",
    response_model=Invoice,  # your generated class
    messages=[{
        "role": "user",
        "content": f"Extract data from this invoice:\\n{invoice_text}"
    }]
)

# result is a typed, validated Invoice object
print(result.model_dump())
# -> {"company_name": "Acme Corp", "amount_before_tax": 1200.0, ...}`;

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
            {s.heading}
          </p>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/5 px-3 py-1 text-xs font-medium text-[var(--primary)]">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            {s.badge}
          </div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {s.heading}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--muted-foreground)]">
            {s.description}
          </p>
        </div>
      </section>

      {/* GENERATOR */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-16">
          <SchemaGenerator dict={s} />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-t border-[var(--border)] bg-[var(--secondary)]/40">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="mb-10 text-2xl font-semibold tracking-tight">
            {s.howItWorksTitle}
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {s.howItWorksSteps.map((step, i) => (
              <div key={i} className="flex flex-col gap-3">
                <div className="inline-flex size-9 items-center justify-center rounded-full bg-[var(--primary)] text-sm font-bold text-[var(--primary-foreground)]">
                  {i + 1}
                </div>
                <p className="font-medium">{step.title}</p>
                <p className="text-sm text-[var(--muted-foreground)]">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GUIDE */}
      <section className="border-t border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="mb-4 text-2xl font-semibold tracking-tight">
            {s.guideTitle}
          </h2>
          <p className="mb-12 max-w-3xl text-[var(--muted-foreground)]">
            {s.guideIntro}
          </p>

          <div className="grid gap-6 sm:grid-cols-2">
            {s.guideSections.map((section, i) => {
              const Icon = GUIDE_ICONS[i % GUIDE_ICONS.length] ?? FileCode2;
              return (
                <div
                  key={i}
                  className="space-y-3 rounded-xl border border-[var(--border)] p-6"
                >
                  <div className="inline-flex size-9 items-center justify-center rounded-lg bg-[var(--primary)]/10">
                    <Icon className="size-4 text-[var(--primary)]" />
                  </div>
                  <p className="font-medium">{section.title}</p>
                  <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
                    {section.body}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Usage example with Instructor */}
          <div className="mt-10 space-y-4">
            <h3 className="text-lg font-semibold">
              {lang === "fr"
                ? "Utilisation avec Instructor (Python)"
                : "Usage with Instructor (Python)"}
            </h3>
            <p className="text-sm text-[var(--muted-foreground)]">
              {lang === "fr"
                ? "Une fois le schéma Pydantic généré, branchez-le directement dans Instructor pour une extraction structurée sans parsing manuel :"
                : "Once you have your Pydantic schema, plug it directly into Instructor for structured extraction with zero manual parsing:"}
            </p>
            <div className="overflow-hidden rounded-lg bg-[#1e1e1e]">
              <pre className="overflow-x-auto px-5 py-5 font-mono text-sm leading-relaxed whitespace-pre text-[#d4d4d4]">
                {instructorExample}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-[var(--border)] bg-[var(--secondary)]/40">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <h2 className="mb-8 text-2xl font-semibold tracking-tight">
            {s.faqTitle}
          </h2>
          <div className="divide-y divide-[var(--border)]">
            {s.faq.map((item, i) => (
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
        <div className="mx-auto max-w-6xl px-6 py-16 text-center">
          <p className="text-lg font-medium">
            {lang === "fr"
              ? "Vos pipelines de données ont besoin de plus que de simples schémas ?"
              : "Your data pipelines need more than just schemas?"}
          </p>
          <p className="mx-auto mt-2 max-w-xl text-sm text-[var(--muted-foreground)]">
            {lang === "fr"
              ? "Je configure vos agents et pipelines ETL connectés aux LLM, du prototype à la production."
              : "I set up your LLM-connected agents and ETL pipelines, from prototype to production."}
          </p>
          <Link
            href={`/${lang}/contact`}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-[var(--primary-foreground)] transition-opacity hover:opacity-80"
          >
            {lang === "fr" ? "Prendre contact" : "Get in touch"}
          </Link>
        </div>
      </section>
    </>
  );
}
