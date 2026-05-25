import {
  ShieldCheck,
  Cpu,
  Database,
  Brain,
  GraduationCap,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { prestations } from "@/data/prestations";
import { buildAlternates } from "@/lib/seo";

import {
  getDictionary,
  hasLocale,
  locales,
  type Locale,
} from "../../dictionaries";

const ICON_MAP: Record<string, LucideIcon> = {
  ShieldCheck,
  Cpu,
  Database,
  Brain,
  GraduationCap,
  Sparkles,
};

export async function generateStaticParams() {
  return locales.flatMap((lang) =>
    prestations.map((p) => ({ lang, id: p.id })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/prestations/[id]">): Promise<Metadata> {
  const { lang, id } = await params;
  const prestation = prestations.find((p) => p.id === id);
  if (!prestation) return {};
  return {
    title: prestation.title[lang as Locale],
    description: prestation.tagline[lang as Locale],
    alternates: { languages: buildAlternates(`/prestations/${id}`) },
  };
}

export default async function PrestationDetailPage({
  params,
}: PageProps<"/[lang]/prestations/[id]">) {
  const { lang, id } = await params;
  if (!hasLocale(lang)) notFound();
  const prestation = prestations.find((p) => p.id === id);
  if (!prestation) notFound();
  const dict = await getDictionary(lang);
  const Icon = ICON_MAP[prestation.icon] ?? Sparkles;

  return (
    <article className="mx-auto max-w-4xl px-6 py-16">
      {/* BACK */}
      <Link
        href={`/${lang}/prestations`}
        className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
      >
        {dict.prestations.back}
      </Link>

      <div className="mt-8 flex items-center gap-4">
        <div className="inline-flex size-14 items-center justify-center rounded-xl bg-[var(--accent)] text-[var(--accent-foreground)]">
          <Icon className="size-7" />
        </div>
        <div className="flex flex-wrap gap-2">
          {prestation.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
        {prestation.title[lang]}
      </h1>
      <p className="mt-3 text-xl text-[var(--muted-foreground)]">
        {prestation.tagline[lang]}
      </p>

      <p className="mt-8 leading-relaxed">{prestation.descriptionLong[lang]}</p>

      {/* CTA */}
      <div className="mt-12 rounded-xl border border-[var(--border)] bg-[var(--secondary)]/30 p-6">
        <p className="font-medium">{dict.prestations.askFor}</p>
        <Link
          href={`/${lang}/contact`}
          className={`mt-4 inline-flex ${buttonVariants()}`}
        >
          {dict.home.ctaSecondary}
        </Link>
      </div>
    </article>
  );
}
