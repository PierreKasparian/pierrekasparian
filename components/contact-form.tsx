"use client";

import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FormState = "idle" | "loading" | "success" | "error";

type ContactDict = {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  subjectLabel: string;
  subjectPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  send: string;
  sending: string;
  success: string;
  error: string;
};

const inputClass =
  "w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-offset-[var(--background)] transition-colors placeholder:text-[var(--muted-foreground)] focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2";

export function ContactForm({ dict }: { dict: ContactDict }) {
  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  function update(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setState("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="rounded-xl border border-[var(--border)] bg-[var(--secondary)]/30 p-8 text-center">
        <p className="text-lg font-medium text-emerald-600 dark:text-emerald-400">
          {dict.success}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* NAME */}
      <div className="space-y-1.5">
        <label htmlFor="name" className="text-sm font-medium">
          {dict.nameLabel}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={update}
          placeholder={dict.namePlaceholder}
          className={inputClass}
          autoComplete="name"
        />
      </div>

      {/* EMAIL */}
      <div className="space-y-1.5">
        <label htmlFor="email" className="text-sm font-medium">
          {dict.emailLabel} <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={update}
          placeholder={dict.emailPlaceholder}
          className={inputClass}
          autoComplete="email"
        />
      </div>

      {/* SUBJECT */}
      <div className="space-y-1.5">
        <label htmlFor="subject" className="text-sm font-medium">
          {dict.subjectLabel} <span className="text-red-500">*</span>
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          value={form.subject}
          onChange={update}
          placeholder={dict.subjectPlaceholder}
          className={inputClass}
        />
      </div>

      {/* MESSAGE */}
      <div className="space-y-1.5">
        <label htmlFor="message" className="text-sm font-medium">
          {dict.messageLabel} <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={form.message}
          onChange={update}
          placeholder={dict.messagePlaceholder}
          className={cn(inputClass, "resize-y")}
        />
      </div>

      {/* ERROR */}
      {state === "error" && (
        <p className="text-sm text-red-600 dark:text-red-400">{dict.error}</p>
      )}

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={state === "loading"}
        className={cn(
          buttonVariants({ size: "lg" }),
          "w-full sm:w-auto",
          state === "loading" && "opacity-70 cursor-not-allowed"
        )}
      >
        {state === "loading" ? dict.sending : dict.send}
      </button>
    </form>
  );
}
