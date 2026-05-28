import { ChevronDown } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AiAnswerGenerator } from "@/components/tools/AiAnswerGenerator";
import { buildAlternates } from "@/lib/seo";

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
  return {
    title: dict.tools.aiAnswer.metaTitle,
    description: dict.tools.aiAnswer.metaDescription,
    alternates: { languages: buildAlternates("/tools/ai-answer-generator") },
  };
}

export default async function AiAnswerGeneratorPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const a = dict.tools.aiAnswer;

  return (
    <>
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
            {a.heading}
          </p>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/5 px-3 py-1 text-xs font-medium text-[var(--primary)]">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            {a.badge}
          </div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {a.heading}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--muted-foreground)]">
            {a.description}
          </p>
        </div>
      </section>

      {/* GENERATOR */}
      <section>
        <div className="mx-auto max-w-3xl px-6 py-16">
          <AiAnswerGenerator dict={a} defaultLang={lang} />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-t border-[var(--border)] bg-[var(--secondary)]/40">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="mb-10 text-2xl font-semibold tracking-tight">
            {a.howItWorksTitle}
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {a.howItWorksSteps.map((step, i) => (
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

      {/* FAQ */}
      <section className="border-t border-[var(--border)]">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <h2 className="mb-8 text-2xl font-semibold tracking-tight">
            {a.faqTitle}
          </h2>
          <div className="divide-y divide-[var(--border)]">
            {a.faq.map((item, i) => (
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
              ? "Besoin d'une intégration IA sur mesure ?"
              : "Need a custom AI integration?"}
          </p>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            {lang === "fr"
              ? "Cet outil est une démo. Je construis des solutions IA complètes pour les entreprises."
              : "This tool is a demo. I build full AI solutions for businesses."}
          </p>
          <Link
            href={`/${lang}/contact`}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-[var(--primary-foreground)] transition-opacity hover:opacity-80"
          >
            {lang === "fr" ? "Discutons de votre projet" : "Let's talk"}
          </Link>
        </div>
      </section>
    </>
  );
}
