import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, ShieldCheck, Sparkles, Zap } from "lucide-react";
import {
  getDictionary,
  hasLocale,
  type Locale,
} from "./dictionaries";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { projects } from "@/data/projects";

const TRUST_ICONS = [ShieldCheck, Sparkles, Zap];

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--accent),_transparent_60%)]"
        />
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-24 sm:py-32 md:grid-cols-2">
          {/* Texte */}
          <div className="flex flex-col items-start gap-6">
            <Badge variant="outline" className="gap-2">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              {dict.home.badge}
            </Badge>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
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
            <div className="relative w-72 overflow-hidden rounded-2xl shadow-xl ring-1 ring-[var(--border)] sm:w-80 lg:w-96">
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
                  <div className="aspect-[16/10] w-full overflow-hidden bg-[var(--muted)]">
                    {/* placeholder: images réelles à recopier dans /public */}
                    <div className="flex h-full items-center justify-center text-xs text-[var(--muted-foreground)]">
                      {project.imagePrincipale}
                    </div>
                  </div>
                  <CardContent className="pt-6">
                    <CardTitle className="mb-2 text-base">
                      {project.title[lang as Locale]}
                    </CardTitle>
                    <CardDescription>
                      {project.description[lang as Locale]}
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
