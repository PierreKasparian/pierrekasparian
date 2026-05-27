import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import { projects } from "@/data/projects";
import { buildAlternates } from "@/lib/seo";

import {
  getDictionary,
  hasLocale,
  locales,
  type Locale,
} from "../../dictionaries";

export async function generateStaticParams() {
  return locales.flatMap((lang) =>
    projects.map((p) => ({ lang, slug: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/projects/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title[lang as Locale],
    description: project.description[lang as Locale],
    alternates: { languages: buildAlternates(`/projects/${slug}`) },
  };
}

export default async function ProjectDetailPage({
  params,
}: PageProps<"/[lang]/projects/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  const dict = await getDictionary(lang);

  return (
    <article className="mx-auto max-w-4xl px-6 py-16">
      {/* BACK */}
      <Link
        href={`/${lang}/projects`}
        className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
      >
        {dict.projects.back}
      </Link>

      {/* HERO IMAGE */}
      {project.imagePrincipale && (
        <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-xl bg-[var(--muted)]">
          <Image
            src={project.imagePrincipale}
            alt={project.title[lang]}
            fill
            sizes="(max-width: 768px) 100vw, 896px"
            priority
            className="object-contain"
          />
        </div>
      )}

      {/* TITLE */}
      <div className="mt-8">
        {project.date && (
          <p className="mb-2 text-sm text-[var(--muted-foreground)]">
            {new Date(project.date).getFullYear()}
          </p>
        )}
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {project.title[lang]}
        </h1>
        <p className="mt-3 text-xl text-[var(--muted-foreground)]">
          {project.description[lang]}
        </p>
      </div>

      {/* BODY */}
      <p className="mt-8 leading-relaxed whitespace-pre-line">
        {project.descriptionLong[lang]}
      </p>

      {/* EXTRA IMAGES */}
      {project.images && project.images.length > 0 && (
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {project.images.map((img) => (
            <div
              key={img}
              className="overflow-hidden rounded-lg bg-[var(--muted)]"
            >
              <Image
                src={img}
                alt=""
                width={0}
                height={0}
                sizes="(max-width: 640px) 100vw, 50vw"
                className="h-auto w-full"
              />
            </div>
          ))}
        </div>
      )}

      {/* LINKS */}
      <div className="mt-10 flex flex-wrap gap-3">
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "default" })}
          >
            {dict.projects.viewProject}
            <ExternalLink className="ml-2 size-4" />
          </a>
        )}
        {project.awardLink && (
          <a
            href={project.awardLink}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "outline" })}
          >
            {dict.projects.viewAward}
            <ExternalLink className="ml-2 size-4" />
          </a>
        )}
        {project.mrrLink && (
          <a
            href={project.mrrLink}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "outline" })}
          >
            {dict.projects.viewMrr}
            <ExternalLink className="ml-2 size-4" />
          </a>
        )}
      </div>
    </article>
  );
}
