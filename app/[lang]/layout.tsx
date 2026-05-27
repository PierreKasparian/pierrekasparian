import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";

import "../globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  buildOpenGraph,
  buildTwitterCard,
  personSchema,
  SITE_URL,
  websiteSchema,
} from "@/lib/seo";

import { getDictionary, hasLocale, locales } from "./dictionaries";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const dict = hasLocale(lang) ? await getDictionary(lang) : null;

  const title =
    dict?.home.metaTitle ?? "Pierre Kasparian · Intégration IA freelance";
  const description =
    dict?.home.metaDescription ??
    "Étudiant ingénieur UTT et freelance. Intégration IA sur mesure, conforme RGPD.";
  const locale = hasLocale(lang) ? lang : "fr";

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: "%s · Pierre Kasparian",
    },
    description,
    openGraph: buildOpenGraph(title, description, locale),
    twitter: buildTwitterCard(title, description),
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        fr: `${SITE_URL}/fr`,
        en: `${SITE_URL}/en`,
        "x-default": `${SITE_URL}/fr`,
      },
    },
  };
}

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <SiteHeader lang={lang} dict={dict} />
        <main className="flex-1">{children}</main>
        <SiteFooter lang={lang} dict={dict} />
      </body>
    </html>
  );
}
