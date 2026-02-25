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

const sendViaFormSubmit = async (body: LeadBody) => {
  const transcriptText = body.transcript
    .map((item) => `[${new Date(item.ts).toISOString()}] ${item.role.toUpperCase()}: ${item.text}`)
    .join("\n");

  const messageLines = [
    `Name: ${body.name}`,
    `Contact (${body.contactType}): ${body.contact}`,
    `Service: ${body.serviceLabel} (${body.serviceKey})`,
    body.userMessage ? `User Message: ${body.userMessage}` : "User Message: N/A",
    "",
    "Transcript:",
    transcriptText,
  ];

  const formBody = new URLSearchParams({
    _subject: `[Chatbot Lead] ${body.serviceLabel} - ${body.name}`,
    _template: "table",
    _captcha: "true",
    name: body.name,
    email: body.contactType === "email" ? body.contact : "",
    phone: body.contactType === "phone" ? body.contact : "",
    category: "services",
    message: messageLines.join("\n"),
    source: "chatbot",
    service: body.serviceLabel,
  });

  const endpoint = `${chatbotLeadConfig.formSubmitEndpoint}/${encodeURIComponent(chatbotLeadConfig.leadToEmail)}`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: formBody.toString(),
  });

  if (!response.ok) {
    throw new Error("FormSubmit send failed");
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
    await sendViaFormSubmit(body);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Unable to send lead right now." }, { status: 500 });
  }
}
