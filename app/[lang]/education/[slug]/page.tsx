import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import { educations } from "@/data/education";
import { buildAlternates } from "@/lib/seo";

import {
  getDictionary,
  hasLocale,
  locales,
  type Locale,
} from "../../dictionaries";

export async function generateStaticParams() {
  return locales.flatMap((lang) =>
    educations.map((e) => ({ lang, slug: e.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/education/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const course = educations.find((e) => e.slug === slug);
  if (!course) return {};
  return {
    title: course.title[lang as Locale],
    description: course.description[lang as Locale],
    alternates: { languages: buildAlternates(`/education/${slug}`) },
  };
}

export default async function EducationDetailPage({
  params,
}: PageProps<"/[lang]/education/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const course = educations.find((e) => e.slug === slug);
  if (!course) notFound();
  const dict = await getDictionary(lang);

  return (
    <article className="mx-auto max-w-4xl px-6 py-16">
      {/* BACK */}
      <Link
        href={`/${lang}/education`}
        className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
      >
        {dict.education.back}
      </Link>

      {/* CERTIFICATE IMAGE */}
      <div className="mt-8 flex w-full items-center justify-center overflow-hidden rounded-xl bg-[var(--muted)] p-8">
        <Image
          src={course.imagePrincipale}
          alt={course.title[lang]}
          width={700}
          height={500}
          priority
          className="h-auto w-full max-w-xl object-contain"
        />
      </div>

      {/* TITLE */}
      <div className="mt-8">
        {course.date && (
          <p className="mb-2 text-sm text-[var(--muted-foreground)]">
            {new Date(course.date).getFullYear()}
          </p>
        )}
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {course.title[lang]}
        </h1>
        <p className="mt-3 text-xl text-[var(--muted-foreground)]">
          {course.description[lang]}
        </p>
      </div>

      {/* BODY */}
      <p className="mt-8 leading-relaxed">{course.descriptionLong[lang]}</p>

      {/* LINK */}
      <div className="mt-10">
        <a
          href={course.link}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: "default" })}
        >
          {dict.education.viewCourse}
          <ExternalLink className="ml-2 size-4" />
        </a>
      </div>
    </article>
  );
}
