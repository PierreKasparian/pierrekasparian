import { ArrowRight, Mail, Quote, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { projects } from "@/data/projects";
import { testimonials } from "@/data/testimonials";

import { getDictionary, hasLocale } from "./dictionaries";

const LINKEDIN_RECOMMENDATIONS_URL =
  "https://www.linkedin.com/in/pierre-kasparian-486101259/details/recommendations/";

const LINKEDIN_PROFILE_URL =
  "https://www.linkedin.com/in/pierre-kasparian-486101259/";

const CONTACT_EMAIL = "kasparianpierre@gmail.com";

const STATS_LINKS: (string | null)[] = [
  null,
  null,
  "https://www.utt.fr/actualites/defi-etudiants-entrepreneurs-prix-coup-de-coeur-pour-pierre-kasparian",
  "https://trustmrr.com/startup/podcastify",
  LINKEDIN_RECOMMENDATIONS_URL,
  LINKEDIN_RECOMMENDATIONS_URL,
  LINKEDIN_RECOMMENDATIONS_URL,
];

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
            <div className="animate-float relative w-72 overflow-hidden rounded-2xl shadow-xl ring-2 ring-[var(--primary)] sm:w-80 lg:w-96">
              <Image
                src="/IMG_4704.jpg"
                alt="Pierre Kasparian, Ingénieur IA & consulting"
                width={600}
                height={800}
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAND */}
      <section className="overflow-hidden border-b border-[var(--border)] py-6">
        <div className="animate-marquee flex w-max items-center">
          {[0, 1, 2, 3].flatMap((pass) =>
            dict.home.statsItems.map((stat, i) => {
              const href = STATS_LINKS[i] ?? null;
              const inner = (
                <>
                  <span className="text-2xl font-bold text-[var(--primary)]">
                    {stat.value}
                  </span>
                  <span className="ml-2 text-sm font-medium">{stat.label}</span>
                </>
              );
              return (
                <span
                  key={`${String(pass)}-${String(i)}`}
                  className="inline-flex items-baseline px-10"
                >
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-baseline transition-opacity hover:opacity-75"
                    >
                      {inner}
                    </a>
                  ) : (
                    inner
                  )}
                  <span
                    className="ml-10 text-[var(--muted-foreground)] select-none"
                    aria-hidden="true"
                  >
                    -
                  </span>
                </span>
              );
            }),
          )}
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {dict.home.aboutTitle}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-[var(--foreground)]">
            {dict.home.aboutBody.map((seg, i) =>
              seg.bold ? (
                <strong key={i} className="font-semibold">
                  {seg.text}
                </strong>
              ) : (
                <span key={i}>{seg.text}</span>
              ),
            )}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {dict.home.aboutSkills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
          <Link
            href={`/${lang}/about`}
            className={`${buttonVariants({ variant: "outline" })} mt-8`}
          >
            {dict.home.aboutCta}
            <ArrowRight />
          </Link>
        </div>
      </section>

      {/* EDUCATION */}
      <section className="border-b border-[var(--border)] bg-[var(--secondary)]/30">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="mb-10 text-center text-2xl font-semibold tracking-tight sm:text-3xl">
            {dict.home.educationTitle}
          </h2>

          <div className="relative">
            {/* Horizontal connector line — desktop */}
            <div
              aria-hidden="true"
              className="absolute top-[0.5625rem] right-[calc(100%/6)] left-[calc(100%/6)] hidden h-px bg-[var(--border)] md:block"
            />
            {/* Vertical connector line — mobile */}
            <div
              aria-hidden="true"
              className="absolute top-3 bottom-3 left-[0.5625rem] w-px bg-[var(--border)] md:hidden"
            />

            <ul className="grid gap-6 md:grid-cols-3">
              {dict.about.parcourItems.map((item) => (
                <li
                  key={item.title}
                  className="relative flex gap-4 md:flex-col md:gap-0"
                >
                  {/* Dot */}
                  <div className="flex shrink-0 md:justify-center">
                    <span
                      aria-hidden="true"
                      className="relative z-10 block size-[1.125rem] shrink-0 rounded-full border-2 border-[var(--primary)] bg-[var(--background)]"
                    />
                  </div>

                  {/* Card */}
                  <div className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--background)] p-5 md:mt-5">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold">{item.title}</p>
                      <span className="shrink-0 text-xs text-[var(--muted-foreground)]">
                        {item.date}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
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

      {/* TESTIMONIALS */}
      <section className="border-b border-[var(--border)] bg-[var(--secondary)]/30">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {dict.home.testimonialsTitle}
            </h2>
            <a
              href="https://www.linkedin.com/in/pierre-kasparian-486101259/details/recommendations/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            >
              {dict.home.testimonialsCta} →
            </a>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <Card
                key={t.name}
                className="flex flex-col bg-[var(--background)]"
              >
                <CardContent className="relative flex flex-grow flex-col gap-5 pt-6">
                  <div
                    className="flex gap-0.5 text-[var(--primary)]"
                    aria-label="5 / 5"
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="flex flex-grow flex-col gap-2 font-serif text-lg leading-relaxed text-[var(--foreground)] italic">
                    <Quote
                      aria-hidden="true"
                      className="size-6 rotate-180 text-[var(--primary)]/40"
                      strokeWidth={2}
                    />
                    <div className="flex flex-col gap-2 px-1">
                      {t.text[lang].split("\n").map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                    <Quote
                      aria-hidden="true"
                      className="size-6 self-end text-[var(--primary)]/40"
                      strokeWidth={2}
                    />
                  </blockquote>
                  <div className="border-t border-[var(--border)] pt-4">
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      {t.role[lang]}
                    </p>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      {t.date[lang]}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* GET IN TOUCH */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {dict.home.contactTitle}
          </h2>
          <p className="mt-3 text-[var(--muted-foreground)]">
            {dict.home.contactSubtitle}
          </p>
        </div>
        <div className="mx-auto grid max-w-2xl gap-6 sm:grid-cols-2">
          {/* LinkedIn */}
          <Card className="flex flex-col bg-[var(--background)] transition-colors hover:border-[var(--primary)]">
            <CardContent className="flex flex-grow flex-col gap-4 pt-6">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-5"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </div>
                <CardTitle className="text-base">
                  {dict.home.contactLinkedinTitle}
                </CardTitle>
              </div>
              <CardDescription className="flex-grow">
                {dict.home.contactLinkedinBody}
              </CardDescription>
              <a
                href={LINKEDIN_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                {dict.home.contactLinkedinCta}
                <ArrowRight className="ml-1.5 size-3.5" />
              </a>
            </CardContent>
          </Card>

          {/* Email */}
          <Card className="flex flex-col bg-[var(--background)] transition-colors hover:border-[var(--primary)]">
            <CardContent className="flex flex-grow flex-col gap-4 pt-6">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
                  <Mail className="size-5" />
                </div>
                <CardTitle className="text-base">
                  {dict.home.contactEmailTitle}
                </CardTitle>
              </div>
              <CardDescription className="flex-grow">
                {dict.home.contactEmailBody}
              </CardDescription>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className={buttonVariants({ variant: "default", size: "sm" })}
              >
                {dict.home.contactEmailCta}
                <ArrowRight className="ml-1.5 size-3.5" />
              </a>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
