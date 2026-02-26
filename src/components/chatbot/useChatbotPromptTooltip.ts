"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type UseChatbotPromptTooltipOptions = {
  isChatOpen: boolean;
};

const CHATBOT_PROMPT_SHOWN_KEY = "chatbotPromptShown";
const CHATBOT_PROMPT_DISMISSED_KEY = "chatbotPromptDismissed";
const PROMPT_DISPLAY_MS = 4000;
const MIN_IDLE_DELAY_MS = 10000;
const MAX_IDLE_DELAY_MS = 12000;

export function useChatbotPromptTooltip({ isChatOpen }: UseChatbotPromptTooltipOptions) {
  const [isPromptVisible, setIsPromptVisible] = useState(false);
  const idleTimeoutRef = useRef<number | null>(null);
  const hideTimeoutRef = useRef<number | null>(null);

  // Clears all active timers to avoid duplicate scheduling and memory leaks.
  const clearTimers = useCallback(() => {
    if (idleTimeoutRef.current !== null) {
      window.clearTimeout(idleTimeoutRef.current);
      idleTimeoutRef.current = null;
    }

    if (hideTimeoutRef.current !== null) {
      window.clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  }, []);

  const hasSessionFlag = useCallback((key: string) => {
    if (typeof window === "undefined") return false;
    return window.sessionStorage.getItem(key) === "1";
  }, []);

  const setSessionFlag = useCallback((key: string) => {
    if (typeof window === "undefined") return;
    window.sessionStorage.setItem(key, "1");
  }, []);

  // Called when the user clicks the chatbot icon; this permanently suppresses the prompt for the current session.
  const markPromptDismissed = useCallback(() => {
    setSessionFlag(CHATBOT_PROMPT_DISMISSED_KEY);
    setIsPromptVisible(false);
    clearTimers();
  }, [clearTimers, setSessionFlag]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isDismissed = hasSessionFlag(CHATBOT_PROMPT_DISMISSED_KEY);
    const hasShown = hasSessionFlag(CHATBOT_PROMPT_SHOWN_KEY);

    if (isChatOpen || isDismissed || hasShown) {
      setIsPromptVisible(false);
      clearTimers();
      return;
    }

    const activityEvents: Array<keyof WindowEventMap> = ["scroll", "click", "keydown"];

    // Schedules a one-time idle prompt between 10 and 12 seconds of inactivity.
    const schedulePrompt = () => {
      if (isChatOpen || hasSessionFlag(CHATBOT_PROMPT_DISMISSED_KEY) || hasSessionFlag(CHATBOT_PROMPT_SHOWN_KEY)) {
        return;
      }

      const idleDelay = Math.floor(Math.random() * (MAX_IDLE_DELAY_MS - MIN_IDLE_DELAY_MS + 1)) + MIN_IDLE_DELAY_MS;

      idleTimeoutRef.current = window.setTimeout(() => {
        if (isChatOpen || hasSessionFlag(CHATBOT_PROMPT_DISMISSED_KEY) || hasSessionFlag(CHATBOT_PROMPT_SHOWN_KEY)) {
          return;
        }

        setSessionFlag(CHATBOT_PROMPT_SHOWN_KEY);
        setIsPromptVisible(true);

        hideTimeoutRef.current = window.setTimeout(() => {
          setIsPromptVisible(false);
        }, PROMPT_DISPLAY_MS);
      }, idleDelay);
    };

    // User activity restarts the idle window until prompt has shown or been dismissed.
    const resetPromptTimer = () => {
      if (hasSessionFlag(CHATBOT_PROMPT_DISMISSED_KEY) || hasSessionFlag(CHATBOT_PROMPT_SHOWN_KEY)) {
        return;
      }

      if (idleTimeoutRef.current !== null) {
        window.clearTimeout(idleTimeoutRef.current);
        idleTimeoutRef.current = null;
      }

      schedulePrompt();
    };

    schedulePrompt();

    activityEvents.forEach((eventName) => {
      window.addEventListener(eventName, resetPromptTimer, { passive: true });
    });

    return () => {
      activityEvents.forEach((eventName) => {
        window.removeEventListener(eventName, resetPromptTimer);
      });
      clearTimers();
    };
  }, [clearTimers, hasSessionFlag, isChatOpen, setSessionFlag]);

  return {
    isPromptVisible,
    markPromptDismissed
  };
}
