"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { ChatMessage } from "../../types/chatbot";
import { useInteractiveChatbot } from "./useInteractiveChatbot";

type InteractiveChatbotPanelProps = {
  state: ReturnType<typeof useInteractiveChatbot>;
};

const bubbleClass: Record<ChatMessage["author"], string> = {
  bot: "self-start bg-white text-ink border border-[color:var(--rule)]",
  user: "self-end bg-[color:var(--rule)] text-ink border border-[color:var(--rule)]",
};

export const InteractiveChatbotPanel = ({ state }: InteractiveChatbotPanelProps) => {
  const { currentNode, messages, onSelectOption, onSubmitInput, goBack, restart, canGoBack, isTyping } = state;
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const showActionButtons = useMemo(
    () => Boolean(currentNode.options?.length || currentNode.cta?.buttons?.length),
    [currentNode.cta?.buttons?.length, currentNode.options?.length]
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isTyping]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmitInput(inputValue);
    setInputValue("");
  };

  return (
    <div className="flex h-[28rem] w-[22rem] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-[color:var(--rule)] bg-paper shadow-[0_25px_55px_rgba(11,27,59,0.28)]">
      <div className="flex items-center justify-between border-b border-[color:var(--rule)] bg-paper/80 px-4 py-3 text-ink backdrop-blur-md">
        <h3 className="text-sm font-semibold tracking-wide">Nathan & Co Help</h3>
        <div className="flex items-center gap-2 text-[0.65rem]">
          <button type="button" onClick={goBack} disabled={!canGoBack || isTyping} className="rounded border border-[color:var(--rule)] px-2 py-1 disabled:opacity-40">
            Back
          </button>
          <button type="button" onClick={restart} disabled={isTyping} className="rounded border border-[color:var(--rule)] px-2 py-1 disabled:opacity-40">
            Restart
          </button>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto bg-[#f6f3ea] p-3">
        {messages.map((message) => (
          <div key={message.id} className={`max-w-[88%] rounded-xl px-3 py-2 text-sm leading-relaxed whitespace-pre-line ${bubbleClass[message.author]}`}>
            {message.text}
          </div>
        ))}
        {isTyping ? (
          <div className="self-start inline-flex items-center gap-1 rounded-xl border border-[color:var(--rule)] bg-white px-3 py-2">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:0ms]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:120ms]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:240ms]" />
          </div>
        ) : null}
        <div ref={messagesEndRef} />
      </div>

      <div className="space-y-2 border-t border-[color:var(--rule)] bg-paper p-3">
        {showActionButtons && (
          <div className="flex flex-wrap gap-2">
            {currentNode.options?.map((option) => (
              <button
                key={option.label}
                type="button"
                onClick={() => onSelectOption(option)}
                disabled={isTyping}
                className="rounded-full border border-[color:var(--rule)] bg-paper/90 px-3 py-1 text-xs font-medium text-ink transition hover:bg-paper disabled:cursor-not-allowed disabled:opacity-50"
              >
                {option.label}
              </button>
            ))}
            {currentNode.cta?.buttons?.map((option) => (
              <button
                key={option.label}
                type="button"
                onClick={() => onSelectOption(option)}
                disabled={isTyping}
                className="rounded-full border border-[color:var(--rule)] bg-paper/90 px-3 py-1 text-xs font-semibold text-ink transition hover:bg-paper disabled:cursor-not-allowed disabled:opacity-50"
              >
                {option.label}
              </button>
            ))}
          </div>
        )}

        {currentNode.input && (
          <form onSubmit={handleSubmit} className="space-y-2">
            {currentNode.input.type === "multiline" ? (
              <textarea
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                placeholder={currentNode.input.placeholder}
                disabled={isTyping}
                className="h-20 w-full rounded-lg border border-[color:var(--rule)] bg-white px-3 py-2 text-sm outline-none focus:border-ink disabled:opacity-50"
              />
            ) : (
              <input
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                placeholder={currentNode.input.placeholder}
                type={currentNode.input.type === "email" ? "email" : "text"}
                disabled={isTyping}
                className="w-full rounded-lg border border-[color:var(--rule)] bg-white px-3 py-2 text-sm outline-none focus:border-ink disabled:opacity-50"
              />
            )}
            <button type="submit" disabled={isTyping} className="rounded-lg border border-[color:var(--rule)] bg-paper px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink disabled:opacity-50">
              {currentNode.input.submitLabel}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
