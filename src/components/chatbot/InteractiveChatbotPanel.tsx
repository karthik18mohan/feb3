"use client";

import { FormEvent, useMemo, useState } from "react";
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
  const { currentNode, messages, onSelectOption, onSubmitInput, goBack, restart, canGoBack } = state;
  const [inputValue, setInputValue] = useState("");

  const showActionButtons = useMemo(
    () => Boolean(currentNode.options?.length || currentNode.cta?.buttons?.length),
    [currentNode.cta?.buttons?.length, currentNode.options?.length]
  );

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
          <button type="button" onClick={goBack} disabled={!canGoBack} className="rounded border border-[color:var(--rule)] px-2 py-1 disabled:opacity-40">
            Back
          </button>
          <button type="button" onClick={restart} className="rounded border border-[color:var(--rule)] px-2 py-1">
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
      </div>

      <div className="space-y-2 border-t border-[color:var(--rule)] bg-paper p-3">
        {showActionButtons && (
          <div className="flex flex-wrap gap-2">
            {currentNode.options?.map((option) => (
              <button
                key={option.label}
                type="button"
                onClick={() => onSelectOption(option)}
                className="rounded-full border border-[color:var(--rule)] bg-paper/90 px-3 py-1 text-xs font-medium text-ink transition hover:bg-paper"
              >
                {option.label}
              </button>
            ))}
            {currentNode.cta?.buttons?.map((option) => (
              <button
                key={option.label}
                type="button"
                onClick={() => onSelectOption(option)}
                className="rounded-full border border-[color:var(--rule)] bg-paper/90 px-3 py-1 text-xs font-semibold text-ink transition hover:bg-paper"
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
                className="h-20 w-full rounded-lg border border-[color:var(--rule)] bg-white px-3 py-2 text-sm outline-none focus:border-ink"
              />
            ) : (
              <input
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                placeholder={currentNode.input.placeholder}
                type={currentNode.input.type === "email" ? "email" : "text"}
                className="w-full rounded-lg border border-[color:var(--rule)] bg-white px-3 py-2 text-sm outline-none focus:border-ink"
              />
            )}
            <button type="submit" className="rounded-lg border border-[color:var(--rule)] bg-paper px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink">
              {currentNode.input.submitLabel}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
