"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import faqs from "../../../data/faqs.json";

type FAQItem = {
  question: string;
  answer: string;
};

type Message = {
  role: "user" | "bot";
  text: string;
};

const WELCOME_MESSAGE = "Hi! Pick a question below and I’ll show the answer.";

export function FaqChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "chat">("list");
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const panelRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const faqItems = faqs as FAQItem[];

  const filteredFaqs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return faqItems;
    return faqItems.filter((faq) => faq.question.toLowerCase().includes(query));
  }, [faqItems, searchQuery]);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      const raf = requestAnimationFrame(() => setIsPanelVisible(true));
      return () => cancelAnimationFrame(raf);
    }

    setIsPanelVisible(false);
    const timeout = window.setTimeout(() => setIsRendered(false), 200);
    return () => window.clearTimeout(timeout);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        "button, [href], input, textarea, select, [tabindex]:not([tabindex='-1'])"
      );
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (panelRef.current?.contains(target)) return;
      if (buttonRef.current?.contains(target)) return;
      setIsOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (viewMode !== "chat") return;
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, viewMode]);

  const handleSelectQuestion = (faq: FAQItem) => {
    setViewMode("chat");
    setMessages((prev) => [
      ...prev,
      { role: "user", text: faq.question },
      { role: "bot", text: faq.answer }
    ]);
  };

  const handleClearChat = () => {
    setMessages([]);
    setViewMode("list");
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col items-end gap-3 sm:bottom-5 sm:right-5">
      {isRendered ? (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Quick answers"
          className={`w-[92vw] max-w-[360px] rounded-3xl border border-ink/15 bg-paper/95 shadow-[0_24px_60px_rgba(11,27,59,0.2)] backdrop-blur transition duration-200 ease-out sm:w-[360px] ${
            isPanelVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
          style={{ maxHeight: "70vh" }}
        >
          <div className="flex items-start justify-between gap-4 border-b border-ink/10 px-5 pb-4 pt-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-ink/70">Quick Answers</p>
              <p className="mt-1 text-xs text-ink/60">Select a question</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleClearChat}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/20 text-ink/70 transition hover:border-ink/40 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                aria-label="Clear chat"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M9 3h6l1 2h4v2H4V5h4l1-2zm1 6h2v8h-2V9zm4 0h2v8h-2V9zM6 9h2v8H6V9z" />
                </svg>
              </button>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/20 text-ink/70 transition hover:border-ink/40 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                aria-label="Close quick answers"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M18.3 5.7a1 1 0 00-1.4 0L12 10.6 7.1 5.7a1 1 0 00-1.4 1.4l4.9 4.9-4.9 4.9a1 1 0 001.4 1.4l4.9-4.9 4.9 4.9a1 1 0 001.4-1.4l-4.9-4.9 4.9-4.9a1 1 0 000-1.4z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex max-h-[calc(70vh-160px)] flex-col gap-4 overflow-y-auto px-5 py-4">
            <div className="rounded-2xl border border-ink/10 bg-paper px-4 py-3 text-sm text-ink/70 shadow-sm">
              {WELCOME_MESSAGE}
            </div>

            {viewMode === "list" ? (
              <div className="space-y-4">
                <label className="block text-xs font-semibold uppercase tracking-[0.25em] text-ink/50">
                  Search
                  <input
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search questions"
                    className="mt-2 w-full rounded-xl border border-ink/10 bg-paper px-3 py-2 text-sm text-ink placeholder:text-ink/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold)]"
                  />
                </label>
                <div className="space-y-3">
                  {filteredFaqs.length === 0 ? (
                    <p className="text-sm text-ink/60">No questions match your search.</p>
                  ) : (
                    filteredFaqs.map((faq) => (
                      <button
                        key={faq.question}
                        type="button"
                        onClick={() => handleSelectQuestion(faq)}
                        className="w-full rounded-2xl border border-ink/10 bg-paper px-4 py-3 text-left text-sm font-medium text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold)]"
                      >
                        {faq.question}
                      </button>
                    ))
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {messages.length === 0 ? (
                  <p className="text-sm text-ink/60">Select a question to start the conversation.</p>
                ) : (
                  messages.map((message, index) => (
                    <div
                      key={`${message.role}-${index}`}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                          message.role === "user"
                            ? "bg-ink text-paper"
                            : "border border-ink/10 bg-paper text-ink"
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))
                )}
                <div ref={chatEndRef} />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-ink/10 px-5 py-4 text-sm">
            {viewMode === "chat" ? (
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className="font-medium text-ink/70 underline-offset-4 transition hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              >
                Back to questions
              </button>
            ) : (
              <span className="text-xs uppercase tracking-[0.25em] text-ink/40">Browse</span>
            )}
            <a
              href="#enquiry"
              className="rounded-full border border-ink/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-ink/70 transition hover:border-ink/30 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              Contact us
            </a>
          </div>
        </div>
      ) : null}

      <button
        ref={buttonRef}
        type="button"
        onClick={handleToggle}
        aria-label="Open quick answers"
        className="group flex h-12 w-12 items-center justify-center rounded-full bg-ink text-paper shadow-[0_12px_30px_rgba(11,27,59,0.35)] transition duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_16px_40px_rgba(11,27,59,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:h-14 sm:w-14"
      >
        <span className="text-lg font-semibold">?</span>
      </button>
    </div>
  );
}
