"use client";

import Image from "next/image";
import type { ChangeEvent, FormEvent } from "react";
import { forwardRef, useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, fadeUpFast, staggerContainer, viewportConfig, stagger } from "@/lib/motion";

import contact from "../../data/contact.json";

type EnquirySectionProps = {
  id?: string;
  className?: string;
};

type FormState = {
  name: string;
  email: string;
  category: string;
  message: string;
};

const initialFormState: FormState = {
  name: "",
  email: "",
  category: "",
  message: ""
};

export const EnquirySection = forwardRef<HTMLElement, EnquirySectionProps>(
  ({ id, className }, ref) => {
    const [formData, setFormData] = useState<FormState>(initialFormState);

    const handleChange = (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      const { name, value } = event.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log({ ...formData });
    };

    return (
      <section
        ref={ref}
        id={id}
        className={className ?? "relative isolate min-h-screen overflow-hidden"}
      >
        <div className="absolute inset-0">
          <Image
            src="/images/enquiry/1.jpg"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-[rgba(6,10,20,0.72)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(176,141,87,0.2),transparent_45%)]" />
        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1180px] items-center px-6 pb-16 overflow-y-auto overscroll-contain section-shell">
          <div className="w-full rounded-2xl border border-[color:var(--rule)] bg-paper/85 p-8 shadow-[0_24px_60px_rgba(11,27,59,0.25)] backdrop-blur sm:p-12">
            <div className="grid gap-10 md:grid-cols-2 md:gap-12">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.42em] text-muted">
                  <span
                    className="inline-block h-px w-8 bg-[color:var(--gold)]"
                    aria-hidden
                  />
                  Contact
                </div>
                <div className="space-y-4">
                  <h2 className="text-3xl font-semibold text-ink sm:text-4xl">
                    Start an enquiry
                  </h2>
                  <p className="text-base leading-relaxed text-muted">
                    Share your requirements and we will respond with thoughtful guidance.
                  </p>
                </div>
                <div className="space-y-5 text-sm text-muted">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-ink">
                      Address
                    </p>
                    <div className="mt-2 space-y-1">
                      {contact.addressLines.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-ink">
                      Email
                    </p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="mt-2 block text-muted transition hover:text-ink"
                    >
                      {contact.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-ink">
                      Phone
                    </p>
                    <a
                      href={`tel:${contact.phone}`}
                      className="mt-2 block text-muted transition hover:text-ink"
                    >
                      {contact.phone}
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.form
                variants={staggerContainer(stagger.normal)}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="space-y-4"
                onSubmit={handleSubmit}
              >
                <motion.div variants={fadeUpFast} className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-[0.28em] text-ink">
                    Name
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full rounded-lg border border-[color:var(--rule)] bg-white/90 px-4 py-3 text-sm text-ink placeholder:text-muted shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)] focus:shadow-[0_0_0_3px_rgba(176,141,87,0.1)]"
                  />
                </motion.div>
                <motion.div variants={fadeUpFast} className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-[0.28em] text-ink">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-[color:var(--rule)] bg-white/90 px-4 py-3 text-sm text-ink placeholder:text-muted shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)] focus:shadow-[0_0_0_3px_rgba(176,141,87,0.1)]"
                  />
                </motion.div>
                <motion.div variants={fadeUpFast} className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-[0.28em] text-ink">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-[color:var(--rule)] bg-white/90 px-4 py-3 text-sm text-ink shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)] focus:shadow-[0_0_0_3px_rgba(176,141,87,0.1)]"
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="general">General Inquiry</option>
                    <option value="services">Services Inquiry</option>
                    <option value="feedback">Feedback</option>
                    <option value="careers">Careers</option>
                  </select>
                </motion.div>
                <motion.div variants={fadeUpFast} className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-[0.28em] text-ink">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell us about your enquiry..."
                    className="w-full resize-none rounded-lg border border-[color:var(--rule)] bg-white/90 px-4 py-3 text-sm text-ink placeholder:text-muted shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)] focus:shadow-[0_0_0_3px_rgba(176,141,87,0.1)]"
                  />
                </motion.div>
                <motion.button
                  variants={fadeUpFast}
                  type="submit"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-ink bg-ink px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-paper shadow-[0_18px_40px_rgba(11,27,59,0.2)] transition-shadow hover:shadow-[0_22px_45px_rgba(11,27,59,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                >
                  Send
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                </motion.button>
              </motion.form>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

EnquirySection.displayName = "EnquirySection";
