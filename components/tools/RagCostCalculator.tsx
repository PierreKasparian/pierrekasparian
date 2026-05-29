"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

type Lang = "fr" | "en";
type ModelId =
  | "gpt-4o"
  | "gpt-4-5"
  | "claude-sonnet-4-6"
  | "claude-opus-4-6"
  | "mistral-medium-3-5"
  | "mistral-large-3"
  | "custom";
type VolumeUnit = "pages" | "mb";

interface Model {
  id: ModelId;
  name: string;
  provider: "openai" | "anthropic" | "mistral" | "custom";
  inputPricePerM: number;
  outputPricePerM: number;
}

const MODELS: Model[] = [
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "openai",
    inputPricePerM: 3.5,
    outputPricePerM: 15,
  },
  {
    id: "gpt-4-5",
    name: "GPT-4.5",
    provider: "openai",
    inputPricePerM: 5,
    outputPricePerM: 30,
  },
  {
    id: "claude-sonnet-4-6",
    name: "Claude Sonnet 4.6",
    provider: "anthropic",
    inputPricePerM: 3,
    outputPricePerM: 15,
  },
  {
    id: "claude-opus-4-6",
    name: "Claude Opus 4.6",
    provider: "anthropic",
    inputPricePerM: 5,
    outputPricePerM: 25,
  },
  {
    id: "mistral-medium-3-5",
    name: "Mistral Medium 3.5",
    provider: "mistral",
    inputPricePerM: 1.5,
    outputPricePerM: 7.5,
  },
  {
    id: "mistral-large-3",
    name: "Mistral Large 3",
    provider: "mistral",
    inputPricePerM: 0.5,
    outputPricePerM: 1.5,
  },
];

const H = {
  tokensPerPage: 500,
  questionTokens: 150,
  responseTokens: 500,
  ragContextTokens: 2000,
  embeddingPricePerM: 0.02,
  daysPerMonth: 30,
  mbToPages: 500,
} as const;

const INPUT_TOKENS_PER_QUERY = H.questionTokens + H.ragContextTokens;

const T = {
  fr: {
    paramsTitle: "Paramètres de votre projet",
    volumeLabel: "Volume de documents",
    volumePages: "Pages",
    volumeMb: "Mo",
    usersLabel: "Utilisateurs actifs / mois",
    questionsLabel: "Questions / jour / utilisateur",
    modelTitle: "Modèle LLM",
    openai: "OpenAI",
    anthropic: "Anthropic",
    mistral: "Mistral AI",
    resultsTitle: "Estimation des coûts mensuels",
    resultsSubtitle:
      "Calcul en temps réel basé sur vos paramètres et les tarifs officiels.",
    mainCostLabel: "Coût LLM mensuel estimé",
    perQueryLabel: "par requête",
    inputCostLabel: "Tokens input (question + contexte RAG)",
    outputCostLabel: "Tokens output (réponses générées)",
    indexingCostLabel: "Coût d'indexing des documents (unique)",
    indexingNote: "Calcul via text-embedding-3-small d'OpenAI ($0,02/1M tokens)",
    statsQueriesLabel: "Requêtes / mois",
    statsInputTokLabel: "Tokens input / requête",
    statsOutputTokLabel: "Tokens output / requête",
    customLabel: "Personnalisé",
    customProvider: "Modèle personnalisé",
    customInputLabel: "Prix input ($ / 1M tokens)",
    customOutputLabel: "Prix output ($ / 1M tokens)",
    disclaimer:
      "Estimation indicative. Les tarifs peuvent évoluer. Vérifiez les grilles tarifaires officielles avant de budgétiser.",
    transparencyTitle: "Comment le calcul est effectué",
    formulas: [
      {
        label: "Tokens input / requête",
        formula: "Question (150 tokens) + Contexte RAG injecté (2 000 tokens) = 2 150 tokens",
      },
      {
        label: "Tokens output / requête",
        formula: "Réponse moyenne générée = 500 tokens",
      },
      {
        label: "Requêtes totales / mois",
        formula: "Utilisateurs actifs × Questions/jour × 30 jours",
      },
      {
        label: "Coût mensuel LLM",
        formula:
          "(Requêtes/mois × tokens_input × prix_input + Requêtes/mois × tokens_output × prix_output) ÷ 1 000 000",
      },
      {
        label: "Volume documents en tokens",
        formula:
          "1 page = 500 tokens · 1 Mo ≈ 500 pages ≈ 250 000 tokens",
      },
      {
        label: "Coût d'indexing (embedding)",
        formula:
          "Tokens_documents × 0,02 $ / 1M tokens (text-embedding-3-small)",
      },
    ],
    faqTitle: "FAQ : optimiser les coûts tokens en entreprise",
    faq: [
      {
        q: "Comment réduire les coûts de tokens pour un projet RAG ?",
        a: "Plusieurs leviers : optimiser le chunking (chunks plus petits = moins de contexte injecté), filtrer les chunks peu pertinents avec un seuil de similarité élevé, compresser le contexte via un LLM léger avant de passer au modèle principal (RAG-Fusion), et router les requêtes simples vers un modèle moins cher.",
      },
      {
        q: "GPT-4o ou Claude Sonnet 4.6 : lequel est plus rentable pour un RAG ?",
        a: "Pour des requêtes simples et à fort volume, Mistral Large 3 ou Claude Sonnet 4.6 offrent le meilleur ratio qualité/coût. GPT-4o et Claude Opus 4.6 conviennent aux tâches complexes (analyse de documents longs, raisonnement multi-étapes). Un routing intelligent peut diviser la facture par 3 à 5.",
      },
      {
        q: "Quel est le coût d'une base de données vectorielle ?",
        a: "Pinecone Serverless facture à l'usage (~$0,096/million de vecteurs/mois). Qdrant ou Weaviate auto-hébergés sur OVHcloud ou Scaleway coûtent ~10 à 30 €/mois d'infra. Pour un projet RGPD conforme, l'auto-hébergement EU est fortement recommandé.",
      },
      {
        q: "Faut-il recalculer les embeddings à chaque mise à jour du corpus ?",
        a: "Non. Seuls les documents nouveaux ou modifiés nécessitent un recalcul. La plupart des architectures RAG implémentent un delta-indexing : seuls les chunks ajoutés ou changés sont re-embedés, ce qui réduit drastiquement les coûts d'indexing récurrents.",
      },
      {
        q: "L'hébergement on-premise est-il vraiment moins cher que les API cloud ?",
        a: "À partir de ~100 000 requêtes/mois, un LLM open source auto-hébergé (Mistral, Llama 3) sur GPU OVHcloud ou Scaleway devient moins cher qu'une API cloud. Avantage double : réduction des coûts marginaux et conformité RGPD (données hors US). Le seuil de rentabilité dépend du modèle et de l'infrastructure choisis.",
      },
    ],
    ctaTitle:
      "Besoin d'optimiser vos coûts d'infrastructure IA ou de passer sur du On-Premise gratuit ?",
    ctaBody:
      "Ces estimations sont un point de départ. Un audit de votre architecture peut révéler des économies de 50 à 80%.",
    ctaButton: "Parlons-en",
  },
  en: {
    paramsTitle: "Project parameters",
    volumeLabel: "Document volume",
    volumePages: "Pages",
    volumeMb: "MB",
    usersLabel: "Active users / month",
    questionsLabel: "Questions / day / user",
    modelTitle: "LLM model",
    openai: "OpenAI",
    anthropic: "Anthropic",
    mistral: "Mistral AI",
    resultsTitle: "Monthly cost estimate",
    resultsSubtitle:
      "Real-time calculation based on your parameters and official pricing.",
    mainCostLabel: "Estimated monthly LLM cost",
    perQueryLabel: "per query",
    inputCostLabel: "Input tokens (question + RAG context)",
    outputCostLabel: "Output tokens (generated responses)",
    indexingCostLabel: "Document indexing cost (one-time)",
    indexingNote:
      "Computed via OpenAI text-embedding-3-small ($0.02/1M tokens)",
    statsQueriesLabel: "Queries / month",
    statsInputTokLabel: "Input tokens / query",
    statsOutputTokLabel: "Output tokens / query",
    customLabel: "Custom",
    customProvider: "Custom model",
    customInputLabel: "Input price ($ / 1M tokens)",
    customOutputLabel: "Output price ($ / 1M tokens)",
    disclaimer:
      "Indicative estimate. Prices may change. Check official pricing grids before budgeting.",
    transparencyTitle: "How the calculation works",
    formulas: [
      {
        label: "Input tokens / query",
        formula:
          "Question (150 tokens) + RAG context injected (2,000 tokens) = 2,150 tokens",
      },
      {
        label: "Output tokens / query",
        formula: "Average generated response = 500 tokens",
      },
      {
        label: "Total queries / month",
        formula: "Active users × Questions/day × 30 days",
      },
      {
        label: "Monthly LLM cost",
        formula:
          "(Queries/month × input_tokens × input_price + Queries/month × output_tokens × output_price) ÷ 1,000,000",
      },
      {
        label: "Document volume in tokens",
        formula: "1 page = 500 tokens · 1 MB ≈ 500 pages ≈ 250,000 tokens",
      },
      {
        label: "Indexing cost (embedding)",
        formula:
          "Document_tokens × $0.02 / 1M tokens (text-embedding-3-small)",
      },
    ],
    faqTitle: "FAQ: optimising LLM token costs for enterprises",
    faq: [
      {
        q: "How can I reduce token costs for a RAG project?",
        a: "Several levers: optimise chunking (smaller chunks = less injected context), filter low-relevance chunks with a high similarity threshold, compress context via a lightweight LLM before the main model (RAG-Fusion pipeline), and route simple queries to a cheaper model.",
      },
      {
        q: "GPT-4o or Claude Sonnet 4.6: which is more cost-effective for RAG?",
        a: "For simple, high-volume queries, Mistral Large 3 or Claude Sonnet 4.6 offer the best quality-to-cost ratio. GPT-4o and Claude Opus 4.6 suit complex tasks (long document analysis, multi-step reasoning). A smart routing strategy can cut your bill by 3 to 5x.",
      },
      {
        q: "What does a vector database cost?",
        a: "Pinecone Serverless charges on usage (~$0.096/million vectors/month). Self-hosted Qdrant or Weaviate on OVHcloud or Scaleway cost ~€10-30/month in infrastructure. For GDPR-compliant projects, EU self-hosting is strongly recommended.",
      },
      {
        q: "Do embeddings need to be recomputed on every corpus update?",
        a: "No. Only new or modified documents require recomputation. Most RAG architectures implement delta-indexing: only added or changed chunks are re-embedded, drastically reducing recurring indexing costs.",
      },
      {
        q: "Is on-premise hosting really cheaper than cloud APIs?",
        a: "Above ~100,000 queries/month, a self-hosted open-source LLM (Mistral, Llama 3) on OVHcloud or Scaleway GPU becomes cheaper than a cloud API. Dual benefit: lower marginal costs and GDPR compliance (data stays outside the US). The break-even point depends on the model and infrastructure chosen.",
      },
    ],
    ctaTitle:
      "Need to optimise your AI infrastructure costs or switch to free On-Premise?",
    ctaBody:
      "These estimates are a starting point. An architecture audit can uncover 50 to 80% savings.",
    ctaButton: "Let's talk",
  },
} as const;

function formatCost(value: number, lang: Lang): string {
  if (value < 0.01) return lang === "fr" ? "< 0,01 $" : "< $0.01";
  const fixed = value.toFixed(2);
  return lang === "fr" ? `${fixed.replace(".", ",")} $` : `$${fixed}`;
}

function formatLargeNumber(value: number, lang: Lang): string {
  if (value >= 1_000_000)
    return lang === "fr"
      ? `${(value / 1_000_000).toFixed(1).replace(".", ",")} M`
      : `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000)
    return lang === "fr"
      ? `${String(Math.round(value / 1_000))} k`
      : `${String(Math.round(value / 1_000))}K`;
  return value.toString();
}

interface Props {
  lang: Lang;
}

export function RagCostCalculator({ lang }: Props) {
  const t = T[lang];

  const [volumeValue, setVolumeValue] = useState(500);
  const [volumeUnit, setVolumeUnit] = useState<VolumeUnit>("pages");
  const [users, setUsers] = useState(50);
  const [questionsPerDay, setQuestionsPerDay] = useState(5);
  const [selectedModel, setSelectedModel] = useState<ModelId>("gpt-4o");
  const [customInputPrice, setCustomInputPrice] = useState(1.0);
  const [customOutputPrice, setCustomOutputPrice] = useState(3.0);

  const model: Model = useMemo(
    () =>
      selectedModel === "custom"
        ? {
            id: "custom",
            name: t.customLabel,
            provider: "custom",
            inputPricePerM: customInputPrice,
            outputPricePerM: customOutputPrice,
          }
        : (MODELS.find((m) => m.id === selectedModel) ?? MODELS[0]),
    [selectedModel, t.customLabel, customInputPrice, customOutputPrice],
  );

  const calc = useMemo(() => {
    const pages =
      volumeUnit === "pages" ? volumeValue : volumeValue * H.mbToPages;
    const docTokens = pages * H.tokensPerPage;

    const queriesPerMonth = users * questionsPerDay * H.daysPerMonth;
    const monthlyInputTokens = queriesPerMonth * INPUT_TOKENS_PER_QUERY;
    const monthlyOutputTokens = queriesPerMonth * H.responseTokens;

    const monthlyInputCost =
      (monthlyInputTokens * model.inputPricePerM) / 1_000_000;
    const monthlyOutputCost =
      (monthlyOutputTokens * model.outputPricePerM) / 1_000_000;
    const monthlyTotal = monthlyInputCost + monthlyOutputCost;

    const costPerQuery =
      (INPUT_TOKENS_PER_QUERY * model.inputPricePerM +
        H.responseTokens * model.outputPricePerM) /
      1_000_000;

    const indexingCost = (docTokens * H.embeddingPricePerM) / 1_000_000;

    return {
      queriesPerMonth,
      monthlyInputTokens,
      monthlyOutputTokens,
      monthlyInputCost,
      monthlyOutputCost,
      monthlyTotal,
      costPerQuery,
      indexingCost,
    };
  }, [volumeValue, volumeUnit, users, questionsPerDay, model]);

  return (
    <div className="space-y-10">
      {/* ---- INPUTS ---- */}
      <section aria-labelledby="params-heading">
        <h2
          id="params-heading"
          className="mb-6 text-lg font-semibold tracking-tight"
        >
          {t.paramsTitle}
        </h2>

        <div className="grid gap-6 sm:grid-cols-3">
          {/* Volume */}
          <div className="space-y-2">
            <label className="text-sm font-medium">{t.volumeLabel}</label>
            <div className="flex overflow-hidden rounded-lg border border-[var(--border)] focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--primary)]/20">
              <input
                type="number"
                min={1}
                max={1_000_000}
                value={volumeValue}
                onChange={(e) => {
                  setVolumeValue(Math.max(1, Number(e.target.value)));
                }}
                className="min-w-0 flex-1 bg-[var(--background)] px-4 py-2.5 text-sm focus:outline-none"
              />
              <div className="flex border-l border-[var(--border)]">
                {(["pages", "mb"] as VolumeUnit[]).map((u) => (
                  <button
                    key={u}
                    type="button"
                    onClick={() => { setVolumeUnit(u); }}
                    className={`px-3 py-2.5 text-xs font-medium transition-colors ${
                      volumeUnit === u
                        ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                        : "bg-[var(--secondary)] text-[var(--muted-foreground)] hover:bg-[var(--secondary)]/80"
                    }`}
                  >
                    {u === "pages" ? t.volumePages : t.volumeMb}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Users */}
          <div className="space-y-2">
            <label htmlFor="users" className="text-sm font-medium">
              {t.usersLabel}
            </label>
            <input
              id="users"
              type="number"
              min={1}
              max={100_000}
              value={users}
              onChange={(e) => { setUsers(Math.max(1, Number(e.target.value))); }}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 focus:outline-none"
            />
          </div>

          {/* Questions/day */}
          <div className="space-y-2">
            <label htmlFor="questions" className="text-sm font-medium">
              {t.questionsLabel}
            </label>
            <input
              id="questions"
              type="number"
              min={1}
              max={1_000}
              value={questionsPerDay}
              onChange={(e) => {
                setQuestionsPerDay(Math.max(1, Number(e.target.value)));
              }}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 focus:outline-none"
            />
          </div>
        </div>

        {/* Model selector */}
        <div className="mt-6 space-y-3">
          <p className="text-sm font-medium">{t.modelTitle}</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {(["openai", "anthropic", "mistral"] as const).map((provider) => {
              const providerModels = MODELS.filter(
                (m) => m.provider === provider,
              );
              const accentClass =
                provider === "openai"
                  ? "border-emerald-400 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-700"
                  : provider === "anthropic"
                  ? "border-violet-400 bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300 dark:border-violet-700"
                  : "border-orange-400 bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-700";
              const hoverClass =
                provider === "openai"
                  ? "hover:border-emerald-300 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/50"
                  : provider === "anthropic"
                  ? "hover:border-violet-300 hover:bg-violet-50/50 dark:hover:bg-violet-950/50"
                  : "hover:border-orange-300 hover:bg-orange-50/50 dark:hover:bg-orange-950/50";

              return (
                <div
                  key={provider}
                  className="rounded-xl border border-[var(--border)] p-3"
                >
                  <p className="mb-2 text-xs font-semibold tracking-wider text-[var(--muted-foreground)] uppercase">
                    {provider === "openai"
                      ? t.openai
                      : provider === "anthropic"
                      ? t.anthropic
                      : t.mistral}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {providerModels.map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => { setSelectedModel(m.id); }}
                        className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                          selectedModel === m.id
                            ? accentClass
                            : `border-[var(--border)] text-[var(--muted-foreground)] ${hoverClass}`
                        }`}
                      >
                        {m.name}
                      </button>
                    ))}
                  </div>
                  {(() => {
                    const active =
                      providerModels.find((m) => m.id === selectedModel) ??
                      providerModels[0];
                    if (!active) return null;
                    return (
                      <p className="mt-2 text-xs text-[var(--muted-foreground)]">
                        Input ${active.inputPricePerM.toFixed(2)}/1M · Output $
                        {active.outputPricePerM.toFixed(2)}/1M tokens
                      </p>
                    );
                  })()}
                </div>
              );
            })}

            {/* Custom pricing card */}
            <div
              className={`sm:col-span-3 rounded-xl border p-3 transition-colors ${
                selectedModel === "custom"
                  ? "border-amber-400 bg-amber-50/50 dark:bg-amber-950/30 dark:border-amber-700"
                  : "border-[var(--border)]"
              }`}
            >
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-semibold tracking-wider text-[var(--muted-foreground)] uppercase">
                  {t.customProvider}
                </p>
                <button
                  type="button"
                  onClick={() => { setSelectedModel("custom"); }}
                  className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                    selectedModel === "custom"
                      ? "border-amber-400 bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-700"
                      : "border-[var(--border)] text-[var(--muted-foreground)] hover:border-amber-300 hover:bg-amber-50/50 dark:hover:bg-amber-950/30"
                  }`}
                >
                  {t.customLabel}
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs text-[var(--muted-foreground)]">
                    {t.customInputLabel}
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={0.01}
                    value={customInputPrice}
                    onChange={(e) => {
                      setCustomInputPrice(Math.max(0, Number(e.target.value)));
                      setSelectedModel("custom");
                    }}
                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-[var(--muted-foreground)]">
                    {t.customOutputLabel}
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={0.01}
                    value={customOutputPrice}
                    onChange={(e) => {
                      setCustomOutputPrice(Math.max(0, Number(e.target.value)));
                      setSelectedModel("custom");
                    }}
                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- RESULTS ---- */}
      <section
        aria-labelledby="results-heading"
        className="rounded-2xl border border-[var(--border)] bg-[var(--secondary)]/30 p-6"
      >
        <header className="mb-6">
          <h2
            id="results-heading"
            className="text-lg font-semibold tracking-tight"
          >
            {t.resultsTitle}
          </h2>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            {t.resultsSubtitle}
          </p>
        </header>

        {/* Main cost highlight */}
        <div className="mb-6 flex flex-wrap items-end gap-4 rounded-xl border border-[var(--primary)]/20 bg-[var(--primary)]/5 p-5">
          <div>
            <p className="text-sm text-[var(--muted-foreground)]">
              {t.mainCostLabel}
            </p>
            <p className="mt-1 text-4xl font-bold tabular-nums tracking-tight">
              {formatCost(calc.monthlyTotal, lang)}
            </p>
          </div>
          <div className="text-sm text-[var(--muted-foreground)]">
            <span className="font-medium text-[var(--foreground)]">
              {formatCost(calc.costPerQuery, lang)}
            </span>{" "}
            {t.perQueryLabel}
          </div>
        </div>

        {/* Cost breakdown */}
        <div className="mb-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-4">
            <p className="text-xs text-[var(--muted-foreground)]">
              {t.inputCostLabel}
            </p>
            <p className="mt-1 text-xl font-semibold tabular-nums">
              {formatCost(calc.monthlyInputCost, lang)}
            </p>
            <p className="mt-0.5 text-xs text-[var(--muted-foreground)]">
              {formatLargeNumber(calc.monthlyInputTokens, lang)} tokens
            </p>
          </div>
          <div className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-4">
            <p className="text-xs text-[var(--muted-foreground)]">
              {t.outputCostLabel}
            </p>
            <p className="mt-1 text-xl font-semibold tabular-nums">
              {formatCost(calc.monthlyOutputCost, lang)}
            </p>
            <p className="mt-0.5 text-xs text-[var(--muted-foreground)]">
              {formatLargeNumber(calc.monthlyOutputTokens, lang)} tokens
            </p>
          </div>
        </div>

        {/* Indexing + stats */}
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-dashed border-[var(--border)] p-4">
            <p className="text-xs text-[var(--muted-foreground)]">
              {t.indexingCostLabel}
            </p>
            <p className="mt-1 text-lg font-semibold tabular-nums">
              {formatCost(calc.indexingCost, lang)}
            </p>
            <p className="mt-0.5 text-xs text-[var(--muted-foreground)]">
              {t.indexingNote}
            </p>
          </div>
          <div className="rounded-lg border border-dashed border-[var(--border)] p-4">
            <p className="text-xs text-[var(--muted-foreground)]">
              {t.statsQueriesLabel}
            </p>
            <p className="mt-1 text-lg font-semibold tabular-nums">
              {formatLargeNumber(calc.queriesPerMonth, lang)}
            </p>
          </div>
          <div className="rounded-lg border border-dashed border-[var(--border)] p-4">
            <p className="text-xs text-[var(--muted-foreground)]">
              {t.statsInputTokLabel}
            </p>
            <p className="mt-1 text-lg font-semibold tabular-nums">
              {formatLargeNumber(INPUT_TOKENS_PER_QUERY, lang)}
            </p>
            <p className="mt-0.5 text-xs text-[var(--muted-foreground)]">
              {t.statsOutputTokLabel}: {H.responseTokens}
            </p>
          </div>
        </div>

        <p className="mt-4 text-xs text-[var(--muted-foreground)]">
          {t.disclaimer}
        </p>
      </section>

      {/* ---- TRANSPARENCY ---- */}
      <aside
        aria-label={t.transparencyTitle}
        className="rounded-2xl border border-[var(--border)] p-6"
      >
        <h2 className="mb-4 text-base font-semibold">{t.transparencyTitle}</h2>
        <dl className="space-y-3">
          {t.formulas.map((item, i) => (
            <div
              key={i}
              className="grid gap-1 border-b border-[var(--border)] pb-3 last:border-0 last:pb-0 sm:grid-cols-[200px_1fr]"
            >
              <dt className="text-sm font-medium text-[var(--muted-foreground)]">
                {item.label}
              </dt>
              <dd className="rounded bg-[var(--secondary)] px-3 py-1.5 font-mono text-xs leading-relaxed">
                {item.formula}
              </dd>
            </div>
          ))}
        </dl>
      </aside>

      {/* ---- FAQ ---- */}
      <section aria-labelledby="faq-heading">
        <h2
          id="faq-heading"
          className="mb-6 text-lg font-semibold tracking-tight"
        >
          {t.faqTitle}
        </h2>
        <div className="divide-y divide-[var(--border)]">
          {t.faq.map((item, i) => (
            <details key={i} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                {item.q}
                <ChevronDown className="size-4 shrink-0 text-[var(--muted-foreground)] transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground)]">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ---- CTA ---- */}
      <aside className="rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[var(--primary)]/5 via-transparent to-[var(--accent-strong)]/5 p-8 text-center">
        <p className="text-base font-semibold">{t.ctaTitle}</p>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          {t.ctaBody}
        </p>
        <Link
          href={`/${lang}/contact`}
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[var(--primary)] px-6 py-2.5 text-sm font-medium text-[var(--primary-foreground)] transition-opacity hover:opacity-80"
        >
          {t.ctaButton}
        </Link>
      </aside>
    </div>
  );
}
