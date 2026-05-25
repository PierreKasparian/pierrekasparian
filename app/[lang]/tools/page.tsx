import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Wrench } from "lucide-react";
import { getDictionary, hasLocale, locales, type Locale } from "../dictionaries";
import { buttonVariants } from "@/components/ui/button";
import { buildAlternates } from "@/lib/seo";

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

export default async function ToolsPage({ params }: PageProps<"/[lang]/tools">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      {/* HEADER */}
      <section className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {dict.tools.heading}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--muted-foreground)]">
            {dict.tools.subtitle}
          </p>
        </div>
      </section>

      {/* EMPTY STATE */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="inline-flex size-16 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--secondary)]/50">
              <Wrench className="size-8 text-[var(--muted-foreground)]" />
            </div>
            <p className="max-w-md text-[var(--muted-foreground)]">
              {dict.tools.comingSoon}
            </p>
            <p className="text-sm text-[var(--muted-foreground)]">
              {dict.tools.suggest}
            </p>
            <Link
              href={`/${lang}/contact`}
              className={buttonVariants({ variant: "outline" })}
            >
              {dict.home.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
