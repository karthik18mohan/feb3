"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { caFirmFlows } from "../../data/chatbot/caFirmFlows";
import { ChatMessage, ChatbotNode, ChatbotOption } from "../../types/chatbot";

const BOT_TYPING_DELAY_MS = 650;

type CallbackFormState = {
  name: string;
  contact: string;
  userMessage: string;
  company: string;
};

type PendingContact = {
  value: string;
  contactType: "email" | "phone";
};

const TERMINAL_SERVICE_LABELS: Record<string, string> = {
  "service-terminal-audit": "Audit & Assurance",
  "service-terminal-tax": "Taxation & Compliance",
  "service-terminal-corporate": "Corporate & Allied Laws",
  "service-terminal-accounting": "Accounting & Bookkeeping",
  "service-terminal-fpna": "FP&A",
  "service-terminal-virtual-cfo": "Virtual CFO",
  "service-terminal-erp": "ERP and Process Readiness",
  "service-terminal-esg": "ESG & Crypto Consultancy",
  "service-terminal-other": "Other Areas",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^(?:\+91[-\s]?)?[6-9]\d{9}$/;


const FORMSUBMIT_ACTION = "https://formsubmit.co/karthikmohan133@gmail.com";

const submitLeadWithFormSubmit = async (payload: {
  name: string;
  contact: string;
  contactType: "email" | "phone";
  serviceKey: string;
  serviceLabel: string;
  userMessage?: string;
  transcript: Array<{ role: "bot" | "user"; text: string; ts: number }>;
}) => {
  const transcriptText = payload.transcript
    .map((entry) => `[${new Date(entry.ts).toISOString()}] ${entry.role.toUpperCase()}: ${entry.text}`)
    .join("\n");

  const message = [
    `Service: ${payload.serviceLabel} (${payload.serviceKey})`,
    payload.userMessage ? `User Message: ${payload.userMessage}` : "User Message: N/A",
    "",
    "Transcript:",
    transcriptText,
  ].join("\n");

  const formBody = new URLSearchParams({
    _subject: `[Chatbot Lead] ${payload.serviceLabel} - ${payload.name}`,
    _template: "table",
    _captcha: "true",
    name: payload.name,
    email: payload.contactType === "email" ? payload.contact : "",
    phone: payload.contactType === "phone" ? payload.contact : "",
    category: "services",
    source: "chatbot",
    service: payload.serviceLabel,
    message,
  });

  await fetch(FORMSUBMIT_ACTION, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: formBody.toString(),
  });
};
const createId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const nowTs = () => Date.now();

const initialNode = caFirmFlows.nodes[caFirmFlows.startNodeId];
const initialForm: CallbackFormState = { name: "", contact: "", userMessage: "", company: "" };

const detectContactCandidate = (value: string): PendingContact | null => {
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (EMAIL_REGEX.test(trimmed)) return { value: trimmed, contactType: "email" };

  const digits = trimmed.replace(/[^\d+]/g, "");
  if (PHONE_REGEX.test(digits)) {
    return { value: digits.startsWith("+91") ? digits : digits.slice(-10), contactType: "phone" };
  }
  return null;
};

export const useInteractiveChatbot = () => {
  const [currentNodeId, setCurrentNodeId] = useState(initialNode.id);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: createId(), author: "bot", text: initialNode.message, ts: nowTs() },
  ]);
  const [nodeTrail, setNodeTrail] = useState<string[]>([initialNode.id]);
  const [isTyping, setIsTyping] = useState(false);
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [isLeadSubmitted, setIsLeadSubmitted] = useState(false);
  const [callbackForm, setCallbackForm] = useState<CallbackFormState>(initialForm);
  const [pendingContact, setPendingContact] = useState<PendingContact | null>(null);

  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentNode = caFirmFlows.nodes[currentNodeId];
  const currentServiceLabel = TERMINAL_SERVICE_LABELS[currentNodeId] ?? "General Enquiry";
  const currentServiceKey = currentNodeId.startsWith("service-terminal-")
    ? currentNodeId.replace("service-terminal-", "")
    : "general";

  const clearTypingTimeout = () => {
    if (!typingTimeoutRef.current) return;
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = null;
    setIsTyping(false);
  };

  const addMessage = (author: ChatMessage["author"], text: string) => {
    setMessages((prev) => [...prev, { id: createId(), author, text, ts: nowTs() }]);
  };

  const pushBotNode = (node: ChatbotNode) => {
    setCurrentNodeId(node.id);
    setNodeTrail((prev) => [...prev, node.id]);
    addMessage("bot", node.message);
    if (node.id.startsWith("service-terminal-")) {
      setPendingContact(null);
      setIsCallbackOpen(true);
      setIsLeadSubmitted(false);
      setCallbackForm(initialForm);
    }
  };

  const pushBotNodeWithTyping = (node: ChatbotNode) => {
    clearTypingTimeout();
    setIsTyping(true);

    typingTimeoutRef.current = setTimeout(() => {
      pushBotNode(node);
      setIsTyping(false);
      typingTimeoutRef.current = null;
    }, BOT_TYPING_DELAY_MS);
  };

  const onSelectOption = (option: ChatbotOption) => {
    if (isTyping) return;
    addMessage("user", option.label);

    if (option.action.type === "link") {
      window.open(option.action.href, "_blank", "noopener,noreferrer");
      return;
    }

    const nextNode = caFirmFlows.nodes[option.action.nextNodeId];
    if (!nextNode) return;
    pushBotNodeWithTyping(nextNode);
  };

  const askCallbackConfirmation = (candidate: PendingContact) => {
    setPendingContact(candidate);
    addMessage("user", candidate.value);
    addMessage("bot", `I detected a ${candidate.contactType}. Request callback?`);
  };

  const onSubmitInput = (value: string) => {
    if (isTyping || !currentNode.input) return;
    const trimmed = value.trim();
    if (!trimmed) return;

    const candidate = detectContactCandidate(trimmed);
    if (candidate) {
      askCallbackConfirmation(candidate);
      return;
    }

    addMessage("user", trimmed);
    const nextNode = caFirmFlows.nodes[currentNode.input.nextNodeId];
    if (!nextNode) return;
    pushBotNodeWithTyping(nextNode);
  };

  const buildTranscript = () => messages.map(({ author, text, ts }) => ({ role: author, text, ts }));

  const submitLead = async (payload: { name: string; contact: string; contactType: "email" | "phone"; userMessage?: string }) => {
    if (isSubmittingLead || isLeadSubmitted) return;
    setIsSubmittingLead(true);

    try {
      await submitLeadWithFormSubmit({
        ...payload,
        serviceKey: currentServiceKey,
        serviceLabel: currentServiceLabel,
        transcript: buildTranscript(),
      });

      setIsLeadSubmitted(true);
      setIsCallbackOpen(true);
      setPendingContact(null);
      addMessage("bot", "Thank you. Our team will contact you shortly.");
    } catch {
      addMessage("bot", "Unable to submit your callback request right now.");
    } finally {
      setIsSubmittingLead(false);
    }
  };

  const confirmDetectedContact = async () => {
    if (!pendingContact) return;
    addMessage("user", "Yes, request callback");
    await submitLead({
      name: callbackForm.name.trim() || "Website Visitor",
      contact: pendingContact.value,
      contactType: pendingContact.contactType,
      userMessage: callbackForm.userMessage.trim() || undefined,
    });
  };

  const declineDetectedContact = () => {
    addMessage("user", "No");
    addMessage("bot", "Sure — continue with your query and use Request a Callback whenever you are ready.");
    setPendingContact(null);
  };

  const submitCallbackForm = async () => {
    const contactValue = callbackForm.contact.trim();
    const contactType = EMAIL_REGEX.test(contactValue) ? "email" : PHONE_REGEX.test(contactValue) ? "phone" : null;

    if (callbackForm.name.trim().length < 2 || !contactType) {
      addMessage("bot", "Please enter your name and a valid email or phone number.");
      return;
    }

    addMessage("user", `Callback details shared by ${callbackForm.name.trim()}`);
    await submitLead({
      name: callbackForm.name.trim(),
      contact: contactValue,
      contactType,
      userMessage: callbackForm.userMessage.trim() || undefined,
    });
  };

  const goHome = () => {
    clearTypingTimeout();
    setCurrentNodeId(initialNode.id);
    setNodeTrail([initialNode.id]);
    setMessages([{ id: createId(), author: "bot", text: initialNode.message, ts: nowTs() }]);
    setIsCallbackOpen(false);
    setIsLeadSubmitted(false);
    setIsSubmittingLead(false);
    setPendingContact(null);
    setCallbackForm(initialForm);
  };

  const goBack = () => {
    if (nodeTrail.length < 2) return;
    clearTypingTimeout();

    const updatedTrail = nodeTrail.slice(0, -1);
    const prevNodeId = updatedTrail[updatedTrail.length - 1];
    const prevNode = caFirmFlows.nodes[prevNodeId];
    if (!prevNode) return;

    setNodeTrail(updatedTrail);
    setCurrentNodeId(prevNodeId);

    const lastBotIndex = [...messages]
      .map((message, index) => ({ message, index }))
      .filter((entry) => entry.message.author === "bot")
      .slice(0, -1)
      .pop()?.index;

    if (lastBotIndex === undefined) {
      setMessages([{ id: createId(), author: "bot", text: initialNode.message, ts: nowTs() }]);
      return;
    }

    setMessages(messages.slice(0, lastBotIndex + 1));
  };

  useEffect(() => () => clearTypingTimeout(), []);

  const state = useMemo(
    () => ({
      messages,
      currentNode,
      canGoBack: nodeTrail.length > 1,
      isTyping,
      pendingContact,
      isCallbackOpen,
      callbackForm,
      isSubmittingLead,
      isLeadSubmitted,
      currentServiceLabel,
      currentServiceKey,
    }),
    [messages, currentNode, nodeTrail.length, isTyping, pendingContact, isCallbackOpen, callbackForm, isSubmittingLead, isLeadSubmitted, currentServiceLabel, currentServiceKey]
  );

  return {
    ...state,
    onSelectOption,
    onSubmitInput,
    goHome,
    goBack,
    restart: goHome,
    setCallbackForm,
    submitCallbackForm,
    confirmDetectedContact,
    declineDetectedContact,
  };
};
