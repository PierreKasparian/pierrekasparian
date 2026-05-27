import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
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
            {[...projects]
              .sort((a, b) => b.date.localeCompare(a.date))
              .map((project, idx) => (
                <Link
                  key={project.slug}
                  href={`/${lang}/projects/${project.slug}`}
                  className="group"
                >
                  <Card className="h-full overflow-hidden transition-shadow group-hover:shadow-md">
                    {project.imagePrincipale && (
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--muted)]">
                        <Image
                          src={project.imagePrincipale}
                          alt={project.title[lang]}
                          fill
                          priority={idx < 3}
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <CardContent
                      className={project.imagePrincipale ? "pt-6" : "pt-8"}
                    >
                      <CardTitle className="mb-2 text-base">
                        {project.title[lang]}
                      </CardTitle>
                      <CardDescription>
                        {project.description[lang]}
                      </CardDescription>
                      {project.tags && project.tags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {project.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
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
