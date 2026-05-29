import { ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { RagCostCalculator } from "@/components/tools/RagCostCalculator";
import {
  buildAlternates,
  buildBreadcrumbSchema,
  buildOpenGraph,
  buildTwitterCard,
  personSchema,
  SITE_URL,
} from "@/lib/seo";

import {
  getDictionary,
  hasLocale,
  locales,
  type Locale,
} from "../../dictionaries";

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const t = dict.tools.ragCost;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { languages: buildAlternates("/tools/rag-cost-calculator") },
    openGraph: buildOpenGraph(t.metaTitle, t.metaDescription, lang),
    twitter: buildTwitterCard(t.metaTitle, t.metaDescription),
  };
}

export default async function RagCostCalculatorPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const t = dict.tools.ragCost;

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: lang === "fr" ? "Accueil" : "Home", url: `${SITE_URL}/${lang}` },
    { name: dict.tools.heading, url: `${SITE_URL}/${lang}/tools` },
    { name: t.heading },
  ]);

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: t.heading,
    description: t.metaDescription,
    url: `${SITE_URL}/${lang}/tools/rag-cost-calculator`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    inLanguage: lang === "fr" ? "fr-FR" : "en-US",
    author: {
      "@type": "Person",
      name: personSchema.name,
      url: personSchema.url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      {/* HEADER */}
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-[10%] size-[340px] -translate-y-1/2 rounded-full bg-[var(--primary)] opacity-[0.06] blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-[5%] size-[240px] rounded-full bg-[var(--accent-strong)] opacity-[0.07] blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <p className="mb-4 flex items-center gap-1 text-sm text-[var(--muted-foreground)]">
            <Link
              href={`/${lang}/tools`}
              className="transition-colors hover:text-[var(--foreground)]"
            >
              {dict.tools.heading}
            </Link>
            <ChevronRight className="size-3.5" />
            <span>{t.heading}</span>
          </p>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/5 px-3 py-1 text-xs font-medium text-[var(--primary)]">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            {t.badge}
          </div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {t.heading}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--muted-foreground)]">
            {t.description}
          </p>
        </div>
      </section>

      {/* CALCULATOR */}
      <section>
        <div className="mx-auto max-w-4xl px-6 py-16">
          <RagCostCalculator lang={lang} />
        </div>
      </section>

      {/* SEO CONTENT */}
      <section className="border-t border-[var(--border)] bg-[var(--secondary)]/30">
        <div className="mx-auto max-w-4xl space-y-10 px-6 py-16">
          <article className="prose prose-sm max-w-none text-[var(--muted-foreground)]">
            <h2 className="not-prose mb-4 text-2xl font-semibold tracking-tight text-[var(--foreground)]">
              {lang === "fr"
                ? "Comprendre les coûts d'un projet RAG en production"
                : "Understanding RAG project costs in production"}
            </h2>
            <p>
              {lang === "fr"
                ? "Un système RAG (Retrieval-Augmented Generation) combine une base de données vectorielle avec un modèle de langage pour interroger vos documents internes. Le coût total dépend de trois postes : l'indexing initial des documents (embeddings), les tokens input consommés à chaque requête (question + contexte récupéré), et les tokens output générés par le LLM (réponse). Ce calculateur estime ces trois composantes en temps réel selon les tarifs officiels GPT-4o, GPT-5.5, Claude Sonnet 4.6, Claude Opus 4.6 et Mistral."
                : "A RAG (Retrieval-Augmented Generation) system combines a vector database with a language model to query your internal documents. Total cost breaks down into three components: initial document indexing (embeddings), input tokens consumed per query (question + retrieved context), and output tokens generated by the LLM (response). This calculator estimates all three in real time using official GPT-4o, GPT-5.5, Claude Sonnet 4.6, Claude Opus 4.6 and Mistral pricing."}
            </p>

            <h3 className="not-prose mt-8 mb-3 text-xl font-semibold tracking-tight text-[var(--foreground)]">
              {lang === "fr"
                ? "Quel modèle LLM choisir pour un RAG conforme RGPD ?"
                : "Which LLM to choose for a GDPR-compliant RAG?"}
            </h3>
            <p>
              {lang === "fr"
                ? "Pour les entreprises françaises et européennes soumises au RGPD, le choix du modèle LLM va au-delà du simple coût par token. Mistral AI, société française, propose des modèles open source déployables en hébergement souverain (OVHcloud, Scaleway) : les données ne quittent pas l'UE. Mistral Large 3 à 0,50 $/1M tokens input est aujourd'hui l'option la plus économique pour un RAG à fort volume avec hébergement EU. Claude Sonnet 4.6 et GPT-4o restent pertinents pour des cas d'usage complexes via API, mais impliquent un transfert de données vers des serveurs américains — à encadrer contractuellement (DPA, clauses SCCs)."
                : "For French and European companies subject to GDPR, choosing an LLM goes beyond cost per token. Mistral AI, a French company, offers open-source models that can be self-hosted on sovereign infrastructure (OVHcloud, Scaleway): data never leaves the EU. Mistral Large 3 at $0.50/1M input tokens is currently the most cost-effective option for high-volume RAG with EU hosting. Claude Sonnet 4.6 and GPT-4o remain relevant for complex use cases via API, but involve data transfer to US servers — which must be contractually framed (DPA, SCC clauses)."}
            </p>

            <h3 className="not-prose mt-8 mb-3 text-xl font-semibold tracking-tight text-[var(--foreground)]">
              {lang === "fr"
                ? "Comment réduire les coûts tokens d'un RAG en entreprise ?"
                : "How to reduce LLM token costs for an enterprise RAG?"}
            </h3>
            <p>
              {lang === "fr"
                ? "Plusieurs techniques permettent de diviser la facture LLM par 3 à 10 : le chunking adaptatif (chunks de 256 à 512 tokens selon la densité du document), le filtrage par seuil de similarité cosinus pour n'injecter que les passages réellement pertinents, la compression du contexte via un modèle léger avant appel au LLM principal (RAG-Fusion), et le routing intelligent qui oriente les requêtes simples vers Mistral Large 3 et les requêtes complexes vers Claude Opus 4.6. Un audit d'architecture RAG permet généralement d'identifier 50 à 80 % d'économies sans dégrader la qualité des réponses."
                : "Several techniques can cut your LLM bill by 3x to 10x: adaptive chunking (256 to 512 tokens per chunk depending on document density), cosine similarity threshold filtering to inject only truly relevant passages, context compression via a lightweight model before the main LLM call (RAG-Fusion pipeline), and intelligent routing that sends simple queries to Mistral Large 3 and complex ones to Claude Opus 4.6. A RAG architecture audit typically uncovers 50 to 80% savings without degrading answer quality."}
            </p>

            <h3 className="not-prose mt-8 mb-3 text-xl font-semibold tracking-tight text-[var(--foreground)]">
              {lang === "fr"
                ? "Coût d'un chatbot RAG sur documents internes : ordre de grandeur"
                : "Cost of a RAG chatbot on internal documents: ballpark figures"}
            </h3>
            <p>
              {lang === "fr"
                ? "Pour une PME de 50 utilisateurs posant 5 questions par jour (soit environ 7 500 requêtes/mois), le coût mensuel d'un RAG avec Claude Sonnet 4.6 est de l'ordre de 100 $ avec les hypothèses par défaut de ce calculateur. Avec Mistral Large 3 en hébergement souverain, ce coût tombe autour de 14 $ pour les tokens API, auxquels s'ajoutent les frais d'infrastructure GPU (~30 €/mois sur OVHcloud). Le coût d'indexing initial (embeddings) reste inférieur à 1 centime pour un corpus de 500 pages et ne se paie qu'une fois."
                : "For a 50-user SMB sending 5 questions per day (roughly 7,500 queries/month), monthly RAG cost with Claude Sonnet 4.6 is around $100 using this calculator's default assumptions. With Mistral Large 3 on sovereign hosting, token API cost drops to about $14 per month, plus GPU infrastructure fees (~€30/month on OVHcloud). Initial indexing cost (embeddings) stays under one cent for a 500-page corpus and is a one-time expense."}
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
