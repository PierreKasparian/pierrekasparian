import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mail, MapPin, Clock } from "lucide-react";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import { ContactForm } from "@/components/contact-form";
import { buildAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return {
    title: dict.contact.metaTitle,
    description: dict.contact.metaDescription,
    alternates: { languages: buildAlternates("/contact") },
  };
}

export default async function ContactPage({
  params,
}: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      {/* HEADER */}
      <section className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {dict.contact.heading}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--muted-foreground)]">
            {dict.contact.subtitle}
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
            {/* LEFT — infos */}
            <aside className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-md bg-[var(--accent)] text-[var(--accent-foreground)]">
                  <Mail className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <a
                    href="mailto:kasparianpierre@gmail.com"
                    className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                  >
                    kasparianpierre@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-md bg-[var(--accent)] text-[var(--accent-foreground)]">
                  <MapPin className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {lang === "fr" ? "Localisation" : "Location"}
                  </p>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    France — {lang === "fr" ? "remote possible" : "remote available"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-md bg-[var(--accent)] text-[var(--accent-foreground)]">
                  <Clock className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {lang === "fr" ? "Délai de réponse" : "Response time"}
                  </p>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    {lang === "fr" ? "Sous 48h" : "Within 48h"}
                  </p>
                </div>
              </div>
            </aside>

            {/* RIGHT — form */}
            <ContactForm dict={dict.contact} />
          </div>
        </div>
      </section>
    </>
  );
}
