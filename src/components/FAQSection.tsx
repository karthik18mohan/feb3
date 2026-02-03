"use client";

import Image from "next/image";
import { forwardRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, fadeUpFast, viewportConfig, viewportConfigPartial, durations, stagger, PREMIUM_EASE } from "@/lib/motion";

import faqs from "../../data/faqs.json";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQSectionProps = {
  id?: string;
  className?: string;
};

export const FAQSection = forwardRef<HTMLElement, FAQSectionProps>(
  ({ id, className }, ref) => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

    const handleToggle = (index: number) => {
      setExpandedIndex((prev) => (prev === index ? null : index));
    };

    return (
      <section
        ref={ref}
        id={id}
        className={className ?? "relative isolate min-h-screen w-full overflow-hidden"}
      >
        <div className="absolute inset-0">
          <Image
            src="/images/faq/1.jpg"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1180px] flex-col px-6 pb-16 overflow-y-auto overscroll-contain section-shell">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="text-left text-paper"
          >
            <div className="mb-4 inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.42em] text-paper/75">
              <span className="inline-block h-px w-8 bg-[color:var(--gold)]" aria-hidden />
              Insights
            </div>
            <h2 className="text-4xl font-semibold sm:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-sm text-paper/75 sm:text-base">
              Clear answers to common questions about our services and process.
            </p>
          </motion.div>

          <div className="mt-12 w-full max-w-3xl space-y-5">
            {(faqs as FAQItem[]).map((faq, index) => {
              const isExpanded = expandedIndex === index;
              return (
                <motion.div
                  key={faq.question}
                  variants={fadeUpFast}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportConfigPartial}
                  transition={{
                    duration: durations.entry,
                    delay: index * stagger.normal,
                    ease: PREMIUM_EASE
                  }}
                  className="rounded-2xl border border-[color:var(--rule)] bg-paper/85 p-6 shadow-[0_20px_45px_rgba(11,27,59,0.18)] backdrop-blur"
                >
                  <button
                    type="button"
                    onClick={() => handleToggle(index)}
                    className="flex w-full items-center justify-between gap-6 text-left text-lg font-semibold text-ink transition hover:text-ink/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                    aria-expanded={isExpanded}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span>{faq.question}</span>
                    <motion.span
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: durations.accordion, ease: PREMIUM_EASE }}
                      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[color:var(--rule)] text-xl"
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
                          className="mt-4 text-sm leading-relaxed text-muted sm:text-base"
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
      </section>
    );
  }
);

FAQSection.displayName = "FAQSection";
