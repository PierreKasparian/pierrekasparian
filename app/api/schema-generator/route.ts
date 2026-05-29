import { type NextRequest, NextResponse } from "next/server";

import {
  JSON_SYSTEM_PROMPT,
  PYDANTIC_SYSTEM_PROMPT,
} from "@/lib/schema-generator-prompts";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const payload = body as Record<string, unknown>;

  if (typeof payload.description !== "string" || !payload.description.trim()) {
    return NextResponse.json(
      { error: "Description is required." },
      { status: 400 },
    );
  }

  const description = payload.description.trim().slice(0, 1000);
  const format = payload.format === "json" ? "json" : "pydantic";

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Service unavailable." },
      { status: 503 },
    );
  }

  const systemPrompt =
    format === "pydantic" ? PYDANTIC_SYSTEM_PROMPT : JSON_SYSTEM_PROMPT;

  let groqRes: Response;
  try {
    groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: description },
        ],
        max_tokens: 2048,
        temperature: 0.1,
      }),
    });
  } catch {
    return NextResponse.json({ error: "Network error." }, { status: 502 });
  }

  if (!groqRes.ok) {
    const errText = await groqRes.text().catch(() => "");
    console.error("Groq API error:", groqRes.status, errText);
    return NextResponse.json({ error: "AI service error." }, { status: 502 });
  }

  const data = (await groqRes.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  let schema = data.choices?.[0]?.message?.content ?? "";

  // Strip markdown fences if the model added them despite instructions
  schema = schema
    .replace(/^```(?:python|json)?\n?/m, "")
    .replace(/\n?```$/m, "")
    .trim();

  return NextResponse.json({ schema });
}
