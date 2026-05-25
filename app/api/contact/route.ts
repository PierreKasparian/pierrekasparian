import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactPayload {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

function isContactPayload(value: unknown): value is ContactPayload {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    (v.name === undefined || typeof v.name === "string") &&
    (v.email === undefined || typeof v.email === "string") &&
    (v.subject === undefined || typeof v.subject === "string") &&
    (v.message === undefined || typeof v.message === "string")
  );
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    if (!isContactPayload(body)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }
    const { name, email, subject, message } = body;

    if (!email || !subject || !message) {
      return NextResponse.json(
        { error: "Email, subject and message are required" },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.CONTACT_EMAIL_FROM,
        pass: process.env.CONTACT_EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.CONTACT_EMAIL_FROM,
      to: process.env.CONTACT_EMAIL_TO,
      subject: `[Portfolio Contact] ${subject}`,
      text: `De : ${name ? `${name} ` : ""}<${email}>\n\n${message}`,
      html: `
        <p><strong>De :</strong> ${name ? `${name} ` : ""}&lt;${email}&gt;</p>
        <p><strong>Sujet :</strong> ${subject}</p>
        <hr />
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 },
    );
  }
}
