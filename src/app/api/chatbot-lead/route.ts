import { NextRequest, NextResponse } from "next/server";
import { chatbotLeadConfig } from "config/chatbotLead";

type TranscriptEntry = { role: "bot" | "user"; text: string; ts: number };

type LeadBody = {
  name: string;
  contact: string;
  contactType: "email" | "phone";
  serviceKey: string;
  serviceLabel: string;
  userMessage?: string;
  transcript: TranscriptEntry[];
  company?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^(?:\+91[-\s]?)?[6-9]\d{9}$/;
const rateLimitStore = new Map<string, number[]>();

const getIp = (request: NextRequest) =>
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
  request.headers.get("x-real-ip") ||
  "unknown";

const limited = (ip: string) => {
  const now = Date.now();
  const hourAgo = now - 60 * 60 * 1000;
  const current = (rateLimitStore.get(ip) ?? []).filter((ts) => ts > hourAgo);
  if (current.length >= 5) {
    rateLimitStore.set(ip, current);
    return true;
  }
  current.push(now);
  rateLimitStore.set(ip, current);
  return false;
};

const validate = (body: LeadBody) => {
  if (!body.name || body.name.trim().length < 2) return "Please provide a valid name.";
  if (!body.contact || !body.contactType) return "Please provide contact details.";
  if (body.contactType === "email" && !EMAIL_REGEX.test(body.contact.trim())) return "Please provide a valid email.";
  if (body.contactType === "phone" && !PHONE_REGEX.test(body.contact.trim())) return "Please provide a valid phone.";
  if (!Array.isArray(body.transcript) || body.transcript.length === 0) return "Transcript missing.";
  return null;
};

const sendResendEmail = async (body: LeadBody) => {
  if (!chatbotLeadConfig.enableResend) {
    throw new Error("Email integration is not configured");
  }

  const transcriptText = body.transcript
    .map((item) => `[${new Date(item.ts).toISOString()}] ${item.role.toUpperCase()}: ${item.text}`)
    .join("\n");

  const payload = {
    from: chatbotLeadConfig.resendFrom,
    to: [chatbotLeadConfig.leadToEmail],
    subject: `[Chatbot Lead] ${body.serviceLabel} - ${body.name}`,
    text: [
      `Name: ${body.name}`,
      `Contact (${body.contactType}): ${body.contact}`,
      `Service: ${body.serviceLabel} (${body.serviceKey})`,
      body.userMessage ? `Message: ${body.userMessage}` : "Message: N/A",
      "",
      "Transcript:",
      transcriptText,
    ].join("\n"),
  };

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Email send failed");
  }
};

export async function POST(request: NextRequest) {
  const body = (await request.json()) as LeadBody;

  if (body.company && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (limited(getIp(request))) {
    return NextResponse.json({ ok: false, error: "Too many requests. Please try later." }, { status: 429 });
  }

  const validationError = validate(body);
  if (validationError) {
    return NextResponse.json({ ok: false, error: validationError }, { status: 400 });
  }

  try {
    await sendResendEmail(body);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Unable to send lead right now." }, { status: 500 });
  }
}
