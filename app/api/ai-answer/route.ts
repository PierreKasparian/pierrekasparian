import { type NextRequest, NextResponse } from "next/server";

const TONE_PROMPTS: Record<string, string> = {
  professional:
    "Respond in a formal, precise, and structured manner. Use professional vocabulary and clear organisation.",
  concise:
    "Respond as briefly and directly as possible. No preamble, no filler. Get straight to the point.",
  pedagogical:
    "Respond in a detailed, educational manner. Explain concepts step by step, with examples where useful.",
  casual:
    "Respond in a friendly, accessible, conversational tone. Keep it natural and approachable.",
};

const LANGUAGE_NAMES: Record<string, string> = {
  fr: "French",
  en: "English",
  es: "Spanish",
  de: "German",
  it: "Italian",
};

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const payload = body as Record<string, unknown>;

  if (typeof payload.question !== "string" || !payload.question.trim()) {
    return NextResponse.json(
      { error: "Question is required." },
      { status: 400 },
    );
  }

  const question = payload.question.trim().slice(0, 500);
  const tone =
    typeof payload.tone === "string" && payload.tone in TONE_PROMPTS
      ? payload.tone
      : "professional";
  const language =
    typeof payload.language === "string" && payload.language in LANGUAGE_NAMES
      ? payload.language
      : "fr";

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Service unavailable." },
      { status: 503 },
    );
  }

  const tonePrompt = TONE_PROMPTS[tone] ?? "";
  const languageName = LANGUAGE_NAMES[language] ?? "French";
  const systemPrompt = `You are a helpful assistant. ${tonePrompt} Always respond in ${languageName}, regardless of the language of the question.`;

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
          { role: "user", content: question },
        ],
        max_tokens: 1024,
        temperature: 0.7,
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
  const answer = data.choices?.[0]?.message?.content ?? "";

  return NextResponse.json({ answer });
}
