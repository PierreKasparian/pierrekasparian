"use client";

import { Check, Copy, Loader2 } from "lucide-react";
import { useState } from "react";

type Tone = "professional" | "concise" | "pedagogical" | "casual";
type Language = "fr" | "en" | "es" | "de" | "it";

const TONE_STYLES: Record<Tone, { dot: string; base: string; active: string }> =
  {
    professional: {
      dot: "bg-indigo-500",
      base: "border-[var(--border)] text-[var(--muted-foreground)] hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 dark:hover:bg-indigo-950 dark:hover:text-indigo-300",
      active:
        "border-indigo-400 bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-700",
    },
    concise: {
      dot: "bg-teal-500",
      base: "border-[var(--border)] text-[var(--muted-foreground)] hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700 dark:hover:bg-teal-950 dark:hover:text-teal-300",
      active:
        "border-teal-400 bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300 dark:border-teal-700",
    },
    pedagogical: {
      dot: "bg-amber-500",
      base: "border-[var(--border)] text-[var(--muted-foreground)] hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700 dark:hover:bg-amber-950 dark:hover:text-amber-300",
      active:
        "border-amber-400 bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-700",
    },
    casual: {
      dot: "bg-emerald-500",
      base: "border-[var(--border)] text-[var(--muted-foreground)] hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-950 dark:hover:text-emerald-300",
      active:
        "border-emerald-400 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-700",
    },
  };

interface AiAnswerDict {
  questionLabel: string;
  questionPlaceholder: string;
  toneLabel: string;
  languageLabel: string;
  tones: Record<Tone, string>;
  languages: Record<Language, string>;
  submit: string;
  loading: string;
  resultLabel: string;
  copy: string;
  copied: string;
  disclaimer: string;
  errorEmpty: string;
  errorApi: string;
}

interface Props {
  dict: AiAnswerDict;
  defaultLang?: string;
}

export function AiAnswerGenerator({ dict, defaultLang = "fr" }: Props) {
  const [question, setQuestion] = useState("");
  const [tone, setTone] = useState<Tone>("professional");
  const [language, setLanguage] = useState<Language>(
    (defaultLang as Language) in dict.languages
      ? (defaultLang as Language)
      : "fr",
  );
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!question.trim()) {
      setError(dict.errorEmpty);
      return;
    }
    setError("");
    setAnswer("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, tone, language }),
      });

      const data = (await res.json()) as { answer?: string; error?: string };

      if (!res.ok || data.error) {
        setError(dict.errorApi);
      } else {
        setAnswer(data.answer ?? "");
      }
    } catch {
      setError(dict.errorApi);
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(answer);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      // clipboard unavailable
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Question */}
        <div className="space-y-2">
          <label htmlFor="question" className="text-sm font-medium">
            {dict.questionLabel}
          </label>
          <textarea
            id="question"
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value);
            }}
            placeholder={dict.questionPlaceholder}
            rows={4}
            maxLength={500}
            className="w-full resize-none rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 focus:outline-none"
          />
          <p className="text-right text-xs text-[var(--muted-foreground)]">
            {question.length}/500
          </p>
        </div>

        {/* Tone pills */}
        <div className="space-y-2">
          <p className="text-sm font-medium">{dict.toneLabel}</p>
          <div className="flex flex-wrap gap-2">
            {(Object.entries(dict.tones) as [Tone, string][]).map(
              ([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setTone(key);
                  }}
                  className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-1.5 text-sm transition-colors ${
                    tone === key
                      ? TONE_STYLES[key].active
                      : TONE_STYLES[key].base
                  }`}
                >
                  <span
                    className={`size-2 shrink-0 rounded-full ${TONE_STYLES[key].dot}`}
                  />
                  {label}
                </button>
              ),
            )}
          </div>
        </div>

        {/* Language */}
        <div className="space-y-2">
          <label htmlFor="language" className="text-sm font-medium">
            {dict.languageLabel}
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value as Language);
            }}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm focus:border-[var(--primary)] focus:outline-none sm:w-64"
          >
            {(Object.entries(dict.languages) as [Language, string][]).map(
              ([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ),
            )}
          </select>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[var(--primary)] px-6 py-2.5 text-sm font-medium text-[var(--primary-foreground)] transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading && <Loader2 className="size-4 animate-spin" />}
          {loading ? dict.loading : dict.submit}
        </button>
      </form>

      {/* Result */}
      {answer && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{dict.resultLabel}</p>
            <button
              onClick={handleCopy}
              className="inline-flex cursor-pointer items-center gap-1.5 text-xs text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
            >
              {copied ? (
                <Check className="size-3.5" />
              ) : (
                <Copy className="size-3.5" />
              )}
              {copied ? dict.copied : dict.copy}
            </button>
          </div>
          <div className="rounded-lg border border-l-[3px] border-[var(--border)] border-l-[var(--accent-strong)] bg-[var(--accent)]/30 px-6 py-5">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {answer}
            </p>
          </div>
          <p className="text-xs text-[var(--muted-foreground)]">
            {dict.disclaimer}
          </p>
        </div>
      )}
    </div>
  );
}
