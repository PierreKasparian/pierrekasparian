"use client";

import { Check, ChevronDown, Code2, Copy, Loader2 } from "lucide-react";
import { useState } from "react";

import {
  JSON_SYSTEM_PROMPT,
  PYDANTIC_SYSTEM_PROMPT,
} from "@/lib/schema-generator-prompts";

type Format = "pydantic" | "json";

const SYSTEM_PROMPTS: Record<Format, string> = {
  pydantic: PYDANTIC_SYSTEM_PROMPT,
  json: JSON_SYSTEM_PROMPT,
};

interface SchemaGeneratorDict {
  descriptionLabel: string;
  descriptionPlaceholder: string;
  formatLabel: string;
  formats: Record<Format, string>;
  submit: string;
  loading: string;
  resultLabel: string;
  copy: string;
  copied: string;
  errorEmpty: string;
  errorApi: string;
  placeholderTitle: string;
  placeholderBody: string;
  promptTitle: string;
  promptIntro: string;
  promptWhyTitle: string;
  promptWhy: string;
}

interface Props {
  dict: SchemaGeneratorDict;
}

export function SchemaGenerator({ dict }: Props) {
  const [description, setDescription] = useState("");
  const [format, setFormat] = useState<Format>("pydantic");
  const [schema, setSchema] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!description.trim()) {
      setError(dict.errorEmpty);
      return;
    }
    setError("");
    setSchema("");
    setLoading(true);

    try {
      const res = await fetch("/api/schema-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, format }),
      });

      const data = (await res.json()) as { schema?: string; error?: string };

      if (!res.ok || data.error) {
        setError(dict.errorApi);
      } else {
        setSchema(data.schema ?? "");
      }
    } catch {
      setError(dict.errorApi);
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(schema);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      // clipboard unavailable
    }
  }

  return (
    <div className="space-y-10">
      {/* Two-column generator */}
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">
        {/* LEFT: Inputs */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              {dict.descriptionLabel}
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              placeholder={dict.descriptionPlaceholder}
              rows={7}
              maxLength={1000}
              className="w-full resize-none rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 focus:outline-none"
            />
            <p className="text-right text-xs text-[var(--muted-foreground)]">
              {description.length}/1000
            </p>
          </div>

          {/* Format selector */}
          <div className="space-y-2">
            <p className="text-sm font-medium">{dict.formatLabel}</p>
            <div className="flex gap-3">
              {(["pydantic", "json"] as Format[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => {
                    setFormat(f);
                  }}
                  className={`flex-1 cursor-pointer rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                    format === f
                      ? "border-[var(--primary)] bg-[var(--primary)]/5 text-[var(--primary)]"
                      : "border-[var(--border)] text-[var(--muted-foreground)] hover:border-[var(--primary)]/30 hover:text-[var(--foreground)]"
                  }`}
                >
                  {dict.formats[f]}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-6 py-3 text-sm font-medium text-[var(--primary-foreground)] transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading && <Loader2 className="size-4 animate-spin" />}
            {loading ? dict.loading : dict.submit}
          </button>
        </form>

        {/* RIGHT: Output */}
        <div className="flex min-h-[280px] flex-col">
          {schema ? (
            <div className="flex flex-1 flex-col gap-3">
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
              <div className="relative flex-1 overflow-hidden rounded-lg bg-[#1e1e1e]">
                <pre className="overflow-x-auto px-5 py-5 font-mono text-sm leading-relaxed whitespace-pre text-[#d4d4d4]">
                  {schema}
                </pre>
              </div>
            </div>
          ) : (
            <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-[var(--border)] bg-[var(--secondary)]/30 p-10 text-center">
              <div className="space-y-3">
                <Code2 className="mx-auto size-9 text-[var(--muted-foreground)]/40" />
                <p className="font-medium text-[var(--muted-foreground)]">
                  {dict.placeholderTitle}
                </p>
                <p className="text-sm text-[var(--muted-foreground)]/70">
                  {dict.placeholderBody}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Transparency: system prompt */}
      <details className="group rounded-xl border border-[var(--border)] bg-[var(--secondary)]/20">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4">
          <span className="flex items-center gap-2 text-sm font-medium">
            <span className="size-2 shrink-0 rounded-full bg-amber-400" />
            {dict.promptTitle}
          </span>
          <ChevronDown className="size-4 shrink-0 text-[var(--muted-foreground)] transition-transform group-open:rotate-180" />
        </summary>
        <div className="space-y-4 border-t border-[var(--border)] px-6 py-5">
          <p className="text-sm text-[var(--muted-foreground)]">
            {dict.promptIntro}
          </p>
          <div className="overflow-hidden rounded-lg bg-[#1e1e1e]">
            <pre className="overflow-x-auto px-5 py-4 font-mono text-xs leading-relaxed whitespace-pre text-[#d4d4d4]">
              {SYSTEM_PROMPTS[format]}
            </pre>
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-800/40 dark:bg-amber-900/10">
            <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
              {dict.promptWhyTitle}
            </p>
            <p className="mt-1 text-sm text-amber-700 dark:text-amber-400">
              {dict.promptWhy}
            </p>
          </div>
        </div>
      </details>
    </div>
  );
}
