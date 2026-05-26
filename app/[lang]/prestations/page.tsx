import {
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
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { prestations } from "@/data/prestations";
import { buildAlternates } from "@/lib/seo";

import { getDictionary, hasLocale, type Locale } from "../dictionaries";

const ICON_MAP: Record<string, LucideIcon> = {
  Bot,
  Brain,
  Database,
  Rocket,
  Sparkles,
  Zap,
};

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/prestations">): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return {
    title: dict.prestations.metaTitle,
    description: dict.prestations.metaDescription,
    alternates: { languages: buildAlternates("/prestations") },
  };
}

export default async function PrestationsPage({
  params,
}: PageProps<"/[lang]/prestations">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
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
              return (
                <Card key={p.id} className="h-full">
                  <CardHeader>
                    <div className="mb-3 inline-flex size-10 items-center justify-center rounded-md bg-[var(--accent)] text-[var(--accent-foreground)]">
                      <Icon className="size-5" />
                    </div>
                    <CardTitle>{p.title[lang]}</CardTitle>
                  </CardHeader>
                  <CardContent>
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
                  </CardContent>
                </Card>
              );
            })}
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
