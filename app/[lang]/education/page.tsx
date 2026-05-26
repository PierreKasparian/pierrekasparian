import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { educations } from "@/data/education";
import { buildAlternates } from "@/lib/seo";

import { getDictionary, hasLocale, type Locale } from "../dictionaries";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/education">): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return {
    title: dict.education.metaTitle,
    description: dict.education.metaDescription,
    alternates: { languages: buildAlternates("/education") },
  };
}

export default async function EducationPage({
  params,
}: PageProps<"/[lang]/education">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      {/* HEADER */}
      <section className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {dict.education.heading}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--muted-foreground)]">
            {dict.education.subtitle}
          </p>
        </div>
      </section>

      {/* GRID */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-6 md:grid-cols-2">
            {educations.map((course) => (
              <Link
                key={course.slug}
                href={`/${lang}/education/${course.slug}`}
                className="group"
              >
                <Card className="h-full overflow-hidden transition-shadow group-hover:shadow-md">
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--muted)]">
                    <Image
                      src={course.imagePrincipale}
                      alt={course.title[lang]}
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-105 p-4"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <CardContent className="pt-6">
                    <CardTitle className="mb-2 text-base">
                      {course.title[lang]}
                    </CardTitle>
                    <CardDescription>
                      {course.description[lang]}
                    </CardDescription>
                    {course.date && (
                      <p className="mt-3 text-xs text-[var(--muted-foreground)]">
                        {new Date(course.date).getFullYear()}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
