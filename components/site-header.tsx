import Link from "next/link";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";
import { buttonVariants } from "@/components/ui/button";

type Props = { lang: Locale; dict: Dictionary };

export function SiteHeader({ lang, dict }: Props) {
  const otherLang: Locale = lang === "fr" ? "en" : "fr";
  const nav = [
    { href: `/${lang}`, label: dict.nav.home },
    { href: `/${lang}/prestations`, label: dict.nav.prestations },
    { href: `/${lang}/projects`, label: dict.nav.projects },
    { href: `/${lang}/blog`, label: dict.nav.blog },
    { href: `/${lang}/tools`, label: dict.nav.tools },
    { href: `/${lang}/about`, label: dict.nav.about },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href={`/${lang}`} className="font-semibold tracking-tight">
          Pierre Kasparian
        </Link>
        <nav className="hidden gap-6 text-sm text-[var(--muted-foreground)] md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-[var(--foreground)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href={`/${otherLang}`}
            className="rounded-md border border-[var(--border)] px-2 py-1 text-xs uppercase text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            aria-label={`Switch to ${otherLang}`}
          >
            {otherLang}
          </Link>
          <Link
            href={`/${lang}/contact`}
            className={`${buttonVariants({ size: "sm" })} hidden sm:inline-flex`}
          >
            {dict.nav.contact}
          </Link>
        </div>
      </div>
    </header>
  );
}
