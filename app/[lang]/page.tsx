import { ArrowRight, ShieldCheck, Sparkles, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { projects } from "@/data/projects";

import { getDictionary, hasLocale } from "./dictionaries";

const TRUST_ICONS = [ShieldCheck, Sparkles, Zap];

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="border-b border-[var(--border)]">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-24 sm:py-32 md:grid-cols-2">
          {/* Texte */}
          <div className="flex flex-col items-start gap-6">
            <Badge variant="outline" className="gap-2">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              {dict.home.badge}
            </Badge>
            <h1 className="text-4xl leading-tight font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              {dict.home.title}
            </h1>
            <p className="text-lg text-[var(--muted-foreground)] sm:text-xl">
              {dict.home.subtitle}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${lang}/prestations`}
                className={buttonVariants({ size: "lg" })}
              >
                {dict.home.ctaPrimary}
                <ArrowRight />
              </Link>
              <Link
                href={`/${lang}/contact`}
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                {dict.home.ctaSecondary}
              </Link>
            </div>
          </div>

          {/* Portrait */}
          <div className="flex justify-center md:justify-end">
            <div className="relative w-72 overflow-hidden rounded-2xl shadow-xl ring-2 ring-[var(--primary)] sm:w-80 lg:w-96">
              <Image
                src="/IMG_4704.jpg"
                alt="Pierre Kasparian — Ingénieur IA & consulting"
                width={600}
                height={800}
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="border-b border-[var(--border)] bg-[var(--secondary)]/30">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="mb-10 text-2xl font-semibold tracking-tight sm:text-3xl">
            {dict.home.trustTitle}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {dict.home.trustItems.map((item, i) => {
              const Icon = TRUST_ICONS[i] ?? Sparkles;
              return (
                <Card key={item.title} className="bg-[var(--background)]">
                  <CardHeader>
                    <div className="mb-2 inline-flex size-10 items-center justify-center rounded-md bg-[var(--accent)] text-[var(--accent-foreground)]">
                      <Icon className="size-5" />
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.body}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {dict.home.projectsTitle}
            </h2>
            <Link
              href={`/${lang}/projects`}
              className="text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            >
              {dict.home.projectsCta} →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featured.map((project) => (
              <Link
                key={project.slug}
                href={`/${lang}/projects/${project.slug}`}
                className="group"
              >
                <Card className="h-full overflow-hidden transition-shadow group-hover:shadow-md">
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--muted)]">
                    <Image
                      src={project.imagePrincipale}
                      alt={project.title[lang]}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <CardContent className="pt-6">
                    <CardTitle className="mb-2 text-base">
                      {project.title[lang]}
                    </CardTitle>
                    <CardDescription>
                      {project.description[lang]}
                    </CardDescription>
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
