import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import {
  getDictionary,
  hasLocale,
  locales,
  type Locale,
} from "../../dictionaries";
import { projects } from "@/data/projects";
import { buttonVariants } from "@/components/ui/button";
import { buildAlternates } from "@/lib/seo";

export async function generateStaticParams() {
  return locales.flatMap((lang) =>
    projects.map((p) => ({ lang, slug: p.slug }))
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
  const dict = await getDictionary(lang as Locale);

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
      <div className="mt-8 aspect-[16/8] w-full overflow-hidden rounded-xl bg-[var(--muted)]">
        <div className="flex h-full items-center justify-center text-sm text-[var(--muted-foreground)]">
          {project.imagePrincipale}
        </div>
      </div>

      {/* TITLE */}
      <div className="mt-8">
        {project.date && (
          <p className="mb-2 text-sm text-[var(--muted-foreground)]">
            {new Date(project.date).getFullYear()}
          </p>
        )}
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {project.title[lang as Locale]}
        </h1>
        <p className="mt-3 text-xl text-[var(--muted-foreground)]">
          {project.description[lang as Locale]}
        </p>
      </div>

      {/* BODY */}
      <p className="mt-8 leading-relaxed">
        {project.descriptionLong[lang as Locale]}
      </p>

      {/* EXTRA IMAGES */}
      {project.images.length > 0 && (
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {project.images.map((img) => (
            <div
              key={img}
              className="aspect-[4/3] overflow-hidden rounded-lg bg-[var(--muted)]"
            >
              <div className="flex h-full items-center justify-center text-xs text-[var(--muted-foreground)]">
                {img}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* LINK */}
      {project.link && (
        <div className="mt-10">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "default" })}
          >
            {dict.projects.viewProject}
            <ExternalLink className="ml-2 size-4" />
          </a>
        </div>
      )}
    </article>
  );
}
