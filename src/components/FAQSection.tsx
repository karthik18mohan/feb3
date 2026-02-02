"use client";

import Image from "next/image";
import { forwardRef, useState } from "react";

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
            src="/images/faq/0.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-[rgba(6,10,20,0.65)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(6,10,20,0.75)] via-[rgba(6,10,20,0.6)] to-[rgba(6,10,20,0.8)]" />

        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1180px] flex-col px-6 pb-20 pt-28 sm:pt-32">
          <div className="text-center text-paper">
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
          </div>

          <div className="mx-auto mt-12 w-full max-w-3xl space-y-5">
            {(faqs as FAQItem[]).map((faq, index) => {
              const isExpanded = expandedIndex === index;
              return (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-[color:var(--rule)] bg-paper/85 p-6 shadow-[0_20px_45px_rgba(11,27,59,0.18)] backdrop-blur"
                >
                  <button
                    type="button"
                    onClick={() => handleToggle(index)}
                    className="flex w-full items-center justify-between gap-6 text-left text-lg font-semibold text-ink transition hover:text-ink/80"
                    aria-expanded={isExpanded}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span>{faq.question}</span>
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--rule)] text-xl"
                      aria-hidden
                    >
                      {isExpanded ? "−" : "+"}
                    </span>
                  </button>
                  <div
                    id={`faq-answer-${index}`}
                    className={`grid transition-all duration-300 ease-out ${
                      isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                    aria-hidden={!isExpanded}
                  >
                    <div className="overflow-hidden">
                      <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
);

FAQSection.displayName = "FAQSection";
