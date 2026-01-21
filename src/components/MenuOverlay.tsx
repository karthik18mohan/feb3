"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";

type MenuOverlayProps = {
  open: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
};

const MENU_ITEMS = [
  { label: "Home", id: "#top" },
  { label: "WHO WE ARE", id: "#who-we-are" },
  { label: "History", id: "#history" }
];

export function MenuOverlay({ open, onClose, onNavigate }: MenuOverlayProps) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const firstButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    firstButtonRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusable = overlayRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (!focusable || focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 text-white backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative flex w-full max-w-5xl flex-col gap-10 px-6 py-16"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close menu"
              className="absolute right-6 top-6 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/30 text-white transition hover:bg-white/10"
              onClick={onClose}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6l-12 12" />
                <path d="M6 6l12 12" />
              </svg>
            </button>
            <div className="space-y-2 text-sm uppercase tracking-[0.4em] text-white/70">
              <p className="text-white">Nathan &amp; Co.</p>
              <p className="text-xs text-white/60">Excellence through integrity.</p>
            </div>
            <nav className="flex flex-col gap-6 text-3xl font-medium tracking-[0.12em]">
              {MENU_ITEMS.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  ref={index === 0 ? firstButtonRef : undefined}
                  onClick={() => onNavigate(item.id)}
                  className="text-left text-white transition hover:text-white/70"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
