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
import { projects } from "@/data/projects";
import { buildAlternates } from "@/lib/seo";

import { getDictionary, hasLocale, type Locale } from "../dictionaries";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/projects">): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return {
    title: dict.projects.metaTitle,
    description: dict.projects.metaDescription,
    alternates: { languages: buildAlternates("/projects") },
  };
}

export default async function ProjectsPage({
  params,
}: PageProps<"/[lang]/projects">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      {/* HEADER */}
      <section className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {dict.projects.heading}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--muted-foreground)]">
            {dict.projects.subtitle}
          </p>
        </div>
      </section>

      {/* GRID */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...projects].sort((a, b) => b.date.localeCompare(a.date)).map((project) => (
              <Link
                key={project.slug}
                href={`/${lang}/projects/${project.slug}`}
                className="group"
              >
                <Card className="h-full overflow-hidden transition-shadow group-hover:shadow-md">
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--muted)]">
                    {project.imagePrincipale ? (
                      <Image
                        src={project.imagePrincipale}
                        alt={project.title[lang]}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-[var(--muted-foreground)] select-none">
                        {project.title[lang].charAt(0)}
                      </div>
                    )}
                  </div>
                  <CardContent className="pt-6">
                    <CardTitle className="mb-2 text-base">
                      {project.title[lang]}
                    </CardTitle>
                    <CardDescription>
                      {project.description[lang]}
                    </CardDescription>
                    {project.date && (
                      <p className="mt-3 text-xs text-[var(--muted-foreground)]">
                        {new Date(project.date).getFullYear()}
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
