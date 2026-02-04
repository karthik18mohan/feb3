"use client";

import { forwardRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Footer } from "@/components/Footer";
import { fadeUp, fadeUpFast, durations, stagger, PREMIUM_EASE, useInViewReplay } from "@/lib/motion";

import faqs from "../../data/faqs.json";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQSectionProps = {
  id?: string;
  className?: string;
  sectionLabel?: string;
};

export const FAQSection = forwardRef<HTMLElement, FAQSectionProps>(
  ({ id, className, sectionLabel }, ref) => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
    const sectionReveal = useInViewReplay({ amount: 0.6 });
    const sectionRevealPartial = useInViewReplay({ amount: 0.35 });

    const handleToggle = (index: number) => {
      setExpandedIndex((prev) => (prev === index ? null : index));
    };

    return (
      <section
        ref={ref}
        id={id}
        aria-label={sectionLabel}
        className={className ?? "relative isolate flex min-h-screen w-screen flex-col overflow-hidden"}
        style={{
          backgroundColor: "var(--ink)",
          backgroundImage: "url('/images/faq/texture/1.jpg')",
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
          backgroundPosition: "center"
        }}
      >
        {sectionLabel ? <span className="sr-only">{sectionLabel}</span> : null}

        <div className="relative z-10 mx-auto flex w-full max-w-[1180px] flex-1 flex-col px-6 section-shell">
          <motion.div
            variants={fadeUp}
            {...sectionReveal}
            className="text-left text-paper"
          >
            <div className="mb-4 inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.42em] text-paper/75">
              <span className="inline-block h-px w-8 bg-[color:var(--gold)]" aria-hidden />
              Insights
            </div>
            <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-semibold">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-[clamp(0.85rem,1.1vw,1rem)] text-paper/75">
              Clear answers to common questions about our services and process.
            </p>
          </motion.div>

          <div className="mt-[clamp(1.25rem,3vh,2.5rem)] w-full max-w-3xl space-y-[clamp(0.75rem,2vh,1.25rem)]">
            {(faqs as FAQItem[]).map((faq, index) => {
              const isExpanded = expandedIndex === index;
              return (
                <motion.div
                  key={faq.question}
                  variants={fadeUpFast}
                  {...sectionRevealPartial}
                  transition={{
                    duration: durations.entry,
                    delay: index * stagger.normal,
                    ease: PREMIUM_EASE
                  }}
                  className="rounded-2xl border border-[color:var(--rule)] bg-paper/85 p-[clamp(0.75rem,2vw,1.25rem)] shadow-[0_20px_45px_rgba(11,27,59,0.18)] backdrop-blur"
                >
                  <button
                    type="button"
                    onClick={() => handleToggle(index)}
                    className="flex w-full items-center justify-between gap-4 text-left text-[clamp(0.95rem,1.25vw,1.1rem)] font-semibold text-ink transition hover:text-ink/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                    aria-expanded={isExpanded}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span>{faq.question}</span>
                    <motion.span
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: durations.accordion, ease: PREMIUM_EASE }}
                      className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-[color:var(--rule)] text-base"
                      aria-hidden
                    >
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        id={`faq-answer-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: durations.accordion, ease: PREMIUM_EASE }}
                        className="overflow-hidden"
                      >
                        <motion.p
                          initial={{ y: -6, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -6, opacity: 0 }}
                          transition={{ duration: durations.accordion, ease: PREMIUM_EASE }}
                          className="mt-3 text-[clamp(0.85rem,1.1vw,1rem)] leading-relaxed text-muted"
                        >
                          {faq.answer}
                        </motion.p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
        <Footer className="mt-auto" showBackToTop />
      </section>
    );
  }
);

FAQSection.displayName = "FAQSection";
