"use client";

import { ChevronDown, Info, Server } from "lucide-react";
import { useState } from "react";

type ModelSize = "7B" | "8B" | "13B" | "34B" | "70B";
type Quantization = "FP16" | "INT8" | "Q4_K_M";
type ContextSize = "8k" | "32k" | "128k";

const MODEL_PARAMS: Record<ModelSize, number> = {
  "7B": 7,
  "8B": 8,
  "13B": 13,
  "34B": 34,
  "70B": 70,
};

const QUANT_BITS: Record<Quantization, number> = {
  FP16: 16,
  INT8: 8,
  Q4_K_M: 4,
};

const MODEL_SPECS: Record<
  ModelSize,
  { layers: number; kvHeads: number; headDim: number }
> = {
  "7B": { layers: 32, kvHeads: 8, headDim: 128 },
  "8B": { layers: 32, kvHeads: 8, headDim: 128 },
  "13B": { layers: 40, kvHeads: 8, headDim: 128 },
  "34B": { layers: 48, kvHeads: 8, headDim: 128 },
  "70B": { layers: 80, kvHeads: 8, headDim: 128 },
};

const CONTEXT_TOKENS: Record<ContextSize, number> = {
  "8k": 8_192,
  "32k": 32_768,
  "128k": 131_072,
};

interface HardwareOption {
  name: string;
  vram: number;
  type: "consumer" | "pro" | "datacenter" | "apple";
  noteKey?: "noteNvlink" | "noteApple";
}

const HARDWARE_DB: HardwareOption[] = [
  { name: "RTX 4080 Super", vram: 16, type: "consumer" },
  { name: "RTX 3090 / RTX 4090", vram: 24, type: "consumer" },
  { name: "RTX A5000", vram: 24, type: "pro" },
  { name: "RTX A6000 / L40S", vram: 48, type: "pro" },
  {
    name: "2x RTX 4090 (PCIe)",
    vram: 48,
    type: "consumer",
    noteKey: "noteNvlink",
  },
  { name: "A100 SXM 80GB", vram: 80, type: "datacenter" },
  { name: "H100 SXM 80GB", vram: 80, type: "datacenter" },
  { name: "2x A100 80GB (NVLink)", vram: 160, type: "datacenter" },
  {
    name: "Mac Studio M3 Ultra",
    vram: 192,
    type: "apple",
    noteKey: "noteApple",
  },
];

const TYPE_STYLES: Record<
  HardwareOption["type"],
  { dot: string; badge: string }
> = {
  consumer: {
    dot: "bg-blue-500",
    badge: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  },
  pro: {
    dot: "bg-violet-500",
    badge:
      "bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
  },
  datacenter: {
    dot: "bg-orange-500",
    badge:
      "bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
  },
  apple: {
    dot: "bg-slate-400",
    badge: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  },
};

function calcVram(model: ModelSize, quant: Quantization, ctx: ContextSize) {
  const bits = QUANT_BITS[quant];
  const params = MODEL_PARAMS[model];
  const baseVram = params * (bits / 8) * 1.2;

  const { layers, kvHeads, headDim } = MODEL_SPECS[model];
  const ctxTokens = CONTEXT_TOKENS[ctx];
  const kvCacheBytes = 2 * layers * kvHeads * headDim * ctxTokens * 2;
  const kvCacheGb = kvCacheBytes / 1_073_741_824;

  return {
    baseVram: Math.round(baseVram * 10) / 10,
    kvCache: Math.round(kvCacheGb * 10) / 10,
    total: Math.round((baseVram + kvCacheGb) * 10) / 10,
  };
}

export interface VramSimulatorDict {
  modelLabel: string;
  quantLabel: string;
  contextLabel: string;
  quantLabels: Record<Quantization, string>;
  resultTitle: string;
  baseVramLabel: string;
  kvCacheLabel: string;
  hardwareTitle: string;
  noHardware: string;
  hwTypes: Record<HardwareOption["type"], string>;
  noteNvlink: string;
  noteApple: string;
  methodTitle: string;
  methodBody: string;
  methodFormula: string;
}

export function VramSimulator({ dict }: { dict: VramSimulatorDict }) {
  const [model, setModel] = useState<ModelSize>("8B");
  const [quant, setQuant] = useState<Quantization>("Q4_K_M");
  const [ctx, setCtx] = useState<ContextSize>("8k");
  const [showMethod, setShowMethod] = useState(false);

  const result = calcVram(model, quant, ctx);
  const MAX_GAUGE = 250;
  const baseWidthPct = Math.min((result.baseVram / MAX_GAUGE) * 100, 100);
  const kvWidthPct = Math.min(
    (result.kvCache / MAX_GAUGE) * 100,
    100 - baseWidthPct,
  );

  const recs = HARDWARE_DB.filter((h) => h.vram >= result.total)
    .sort((a, b) => a.vram - b.vram)
    .slice(0, 4);

  const selectClass =
    "w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm font-mono font-medium focus:border-[var(--primary)] focus:outline-none";

  return (
    <div className="space-y-5">
      {/* Inputs */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-1.5">
          <label className="text-xs font-medium tracking-wider text-[var(--muted-foreground)] uppercase">
            {dict.modelLabel}
          </label>
          <select
            value={model}
            onChange={(e) => {
              setModel(e.target.value as ModelSize);
            }}
            className={selectClass}
          >
            {(Object.keys(MODEL_PARAMS) as ModelSize[]).map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium tracking-wider text-[var(--muted-foreground)] uppercase">
            {dict.quantLabel}
          </label>
          <select
            value={quant}
            onChange={(e) => {
              setQuant(e.target.value as Quantization);
            }}
            className={selectClass}
          >
            {(Object.keys(QUANT_BITS) as Quantization[]).map((q) => (
              <option key={q} value={q}>
                {dict.quantLabels[q]}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium tracking-wider text-[var(--muted-foreground)] uppercase">
            {dict.contextLabel}
          </label>
          <select
            value={ctx}
            onChange={(e) => {
              setCtx(e.target.value as ContextSize);
            }}
            className={selectClass}
          >
            {(Object.keys(CONTEXT_TOKENS) as ContextSize[]).map((c) => (
              <option key={c} value={c}>
                {c} tokens
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* VRAM result panel */}
      <div className="space-y-4 rounded-xl border border-[var(--border)] bg-[var(--secondary)]/40 p-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium tracking-wider text-[var(--muted-foreground)] uppercase">
            {dict.resultTitle}
          </p>
          <p className="text-3xl font-bold text-[var(--foreground)] tabular-nums">
            {result.total}{" "}
            <span className="text-lg font-medium text-[var(--muted-foreground)]">
              GB
            </span>
          </p>
        </div>

        <div className="space-y-2">
          <div className="relative h-3 w-full overflow-hidden rounded-full bg-[var(--border)]">
            <div
              className="absolute top-0 left-0 h-full rounded-l-full bg-[var(--primary)] transition-all duration-500"
              style={{ width: `${String(baseWidthPct)}%` }}
            />
            <div
              className="absolute top-0 h-full bg-[var(--accent-strong)]/60 transition-all duration-500"
              style={{
                left: `${String(baseWidthPct)}%`,
                width: `${String(kvWidthPct)}%`,
              }}
            />
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-[var(--muted-foreground)]">
            <span className="flex items-center gap-1.5">
              <span className="size-2 shrink-0 rounded-full bg-[var(--primary)]" />
              {dict.baseVramLabel}:{" "}
              <span className="font-semibold text-[var(--foreground)] tabular-nums">
                {result.baseVram} GB
              </span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2 shrink-0 rounded-full bg-[var(--accent-strong)]/60" />
              {dict.kvCacheLabel}:{" "}
              <span className="font-semibold text-[var(--foreground)] tabular-nums">
                {result.kvCache} GB
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Hardware recommendations */}
      <div className="space-y-3 rounded-xl border border-[var(--border)] p-5">
        <p className="flex items-center gap-2 text-xs font-medium tracking-wider text-[var(--muted-foreground)] uppercase">
          <Server className="size-3.5" />
          {dict.hardwareTitle}
        </p>

        {recs.length === 0 ? (
          <p className="text-sm text-[var(--muted-foreground)]">
            {dict.noHardware}
          </p>
        ) : (
          <ul className="divide-y divide-[var(--border)]">
            {recs.map((hw) => (
              <li
                key={hw.name}
                className="flex items-center justify-between gap-4 py-3"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`size-2 shrink-0 rounded-full ${TYPE_STYLES[hw.type].dot}`}
                  />
                  <div>
                    <p className="text-sm font-medium">{hw.name}</p>
                    {hw.noteKey && (
                      <p className="text-xs text-[var(--muted-foreground)]">
                        {dict[hw.noteKey]}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${TYPE_STYLES[hw.type].badge}`}
                  >
                    {dict.hwTypes[hw.type]}
                  </span>
                  <span className="text-sm font-bold tabular-nums">
                    {hw.vram} GB
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Methodology */}
      <div className="rounded-xl border border-[var(--border)]">
        <button
          type="button"
          onClick={() => {
            setShowMethod((v) => !v);
          }}
          className="flex w-full cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium"
        >
          <span className="flex items-center gap-2">
            <Info className="size-4 text-[var(--muted-foreground)]" />
            {dict.methodTitle}
          </span>
          <ChevronDown
            className={`size-4 text-[var(--muted-foreground)] transition-transform ${showMethod ? "rotate-180" : ""}`}
          />
        </button>

        {showMethod && (
          <div className="space-y-3 border-t border-[var(--border)] px-5 py-5">
            <p className="text-sm text-[var(--muted-foreground)]">
              {dict.methodBody}
            </p>
            <pre className="overflow-x-auto rounded-lg bg-[var(--secondary)] px-5 py-4 text-xs leading-relaxed text-[var(--foreground)]">
              <code>{dict.methodFormula}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
