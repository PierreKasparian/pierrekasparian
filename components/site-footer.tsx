import { FileText } from "lucide-react";
import Link from "next/link";

import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

export function SiteFooter({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <footer className="border-t border-[var(--border)] py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 text-sm text-[var(--muted-foreground)] sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Pierre Kasparian</p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="https://github.com/PierreKasparian/"
            className="hover:text-[var(--foreground)]"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </Link>
          <Link
            href="https://www.linkedin.com/in/pierre-kasparian-486101259/"
            className="hover:text-[var(--foreground)]"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </Link>
          <Link
            href={`/${lang}/contact`}
            className="hover:text-[var(--foreground)]"
          >
            {dict.nav.contact}
          </Link>
          <a
            href="/cv%20pierre%20kasparian.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-[var(--foreground)]"
          >
            <FileText className="size-3.5" />
            {dict.home.ctaCV}
          </a>
          <Link
            href={`/${lang}/legal/mentions-legales`}
            className="hover:text-[var(--foreground)]"
          >
            {dict.footer.legalNotice}
          </Link>
          <Link
            href={`/${lang}/legal/politique-de-confidentialite`}
            className="hover:text-[var(--foreground)]"
          >
            {dict.footer.privacyPolicy}
          </Link>
        </div>
      </div>
    </footer>
  );
}
