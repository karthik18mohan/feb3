"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { servicesData, ServiceDetail } from "@/content/services";
import { PREMIUM_EASE, durations } from "@/lib/motion";

interface ServiceModalProps {
  isOpen: boolean;
  activeServiceId: string | null;
  onClose: () => void;
  onServiceChange: (serviceId: string) => void;
}

export function ServiceModal({
  isOpen,
  activeServiceId,
  onClose,
  onServiceChange
}: ServiceModalProps) {
  const activeService = servicesData.find(s => s.id === activeServiceId);

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEscape);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, handleEscape]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: PREMIUM_EASE }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-[8px]"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.55, ease: PREMIUM_EASE }}
            className="relative mx-4 flex h-[82vh] w-full max-w-[1100px] flex-col overflow-hidden rounded-[20px] border border-[rgba(176,141,87,0.2)] bg-paper/95 shadow-[0_24px_60px_rgba(11,27,59,0.3)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-rule/30 bg-paper/95 px-8 py-5 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold text-ink">What We Do</h2>
              <button
                onClick={onClose}
                className="text-sm font-medium uppercase tracking-[0.18em] text-muted transition-colors duration-200 hover:text-ink hover:underline"
              >
                Close
              </button>
            </div>

            <div className="flex flex-1 overflow-hidden">
              <div className="w-[32%] border-r border-rule/30 bg-paper/50 p-6 overflow-y-auto">
                <nav className="space-y-2">
                  {servicesData.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => onServiceChange(service.id)}
                      className={`w-full rounded-lg border px-4 py-3 text-left text-sm font-medium transition-all duration-300 ${
                        activeServiceId === service.id
                          ? "border-ink/30 bg-ink/5 text-ink shadow-sm"
                          : "border-rule/20 bg-transparent text-muted hover:border-ink/20 hover:bg-ink/[0.02] hover:text-ink"
                      }`}
                    >
                      <div
                        className={`border-l-2 pl-3 ${
                          activeServiceId === service.id
                            ? "border-[color:var(--gold)]"
                            : "border-transparent"
                        }`}
                      >
                        {service.title}
                      </div>
                    </button>
                  ))}
                </nav>
              </div>

              <div className="flex-1 overflow-y-auto p-8">
                <AnimatePresence mode="wait">
                  {activeService && (
                    <motion.div
                      key={activeService.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.3, ease: PREMIUM_EASE }}
                      className="space-y-6"
                    >
                      <h3 className="text-3xl font-semibold text-ink">
                        {activeService.title}
                      </h3>

                      <p className="text-lg leading-relaxed text-muted">
                        {activeService.intro}
                      </p>

                      {activeService.subsections ? (
                        <div className="space-y-6">
                          {activeService.subsections.map((subsection, idx) => (
                            <div key={idx} className="space-y-3">
                              <h4 className="text-xl font-semibold text-ink">
                                {subsection.title}
                              </h4>
                              <ul className="space-y-2">
                                {subsection.offerings.map((offering, offeringIdx) => (
                                  <li
                                    key={offeringIdx}
                                    className="flex items-start gap-3 text-base leading-relaxed text-muted"
                                  >
                                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[color:var(--gold)]" />
                                    <span>{offering}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      ) : activeService.offerings ? (
                        <div className="space-y-3">
                          <h4 className="text-xl font-semibold text-ink">Our Services Include</h4>
                          <ul className="space-y-2">
                            {activeService.offerings.map((offering, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-3 text-base leading-relaxed text-muted"
                              >
                                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[color:var(--gold)]" />
                                <span>{offering}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
