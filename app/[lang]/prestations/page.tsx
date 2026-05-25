import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ShieldCheck,
  Cpu,
  Database,
  Brain,
  GraduationCap,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import { prestations } from "@/data/prestations";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { buildAlternates } from "@/lib/seo";

const ICON_MAP: Record<string, LucideIcon> = {
  ShieldCheck,
  Cpu,
  Database,
  Brain,
  GraduationCap,
  Sparkles,
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
  const dict = await getDictionary(lang as Locale);

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
                <Link
                  key={p.id}
                  href={`/${lang}/prestations/${p.id}`}
                  className="group"
                >
                  <Card className="h-full transition-shadow group-hover:shadow-md">
                    <CardHeader>
                      <div className="mb-3 inline-flex size-10 items-center justify-center rounded-md bg-[var(--accent)] text-[var(--accent-foreground)]">
                        <Icon className="size-5" />
                      </div>
                      <CardTitle>{p.title[lang as Locale]}</CardTitle>
                      <CardDescription>
                        {p.tagline[lang as Locale]}
                      </CardDescription>
                      <div className="flex flex-wrap gap-2 pt-2">
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
                    </CardHeader>
                  </Card>
                </Link>
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
