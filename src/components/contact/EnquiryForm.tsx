"use client";

import { useEffect, useRef } from "react";
import type { Location } from "config/locations";

const formatLocation = (location?: Location | null) => {
  if (!location) {
    return "Not selected";
  }
  const parts = [location.name, location.city, location.state].filter(Boolean);
  return parts.join(", ");
};

type EnquiryFormProps = {
  selectedLocation?: Location | null;
};

export function EnquiryForm({ selectedLocation }: EnquiryFormProps) {
  const nextUrlRef = useRef<HTMLInputElement | null>(null);

  const buildNextUrl = () => {
    const origin = window.location.origin;
    return `${origin}/?enquiry=success#enquiry`;
  };

  useEffect(() => {
    if (!nextUrlRef.current) {
      return;
    }
    nextUrlRef.current.value = buildNextUrl();
  }, []);

  const handleSubmit = () => {
    if (!nextUrlRef.current) {
      return;
    }
    if (!nextUrlRef.current.value) {
      nextUrlRef.current.value = buildNextUrl();
    }
  };

  return (
    <form
      method="POST"
      action="https://formsubmit.co/karthikmohan133@gmail.com"
      onSubmit={handleSubmit}
      className="flex h-full min-h-0 flex-col"
    >
      <input type="hidden" name="_subject" value="New Website Enquiry" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="true" />
      <input ref={nextUrlRef} type="hidden" name="_next" value="" />
      <div className="space-y-2">
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-[0.28em] text-ink" htmlFor="enquiry-name">
            Name
          </label>
          <input
            id="enquiry-name"
            name="name"
            required
            placeholder="Your name"
            className="w-full rounded-lg border border-[color:var(--rule)] bg-white/90 px-4 py-2 text-[clamp(0.8rem,1vw,0.95rem)] text-ink placeholder:text-muted shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)] focus:shadow-[0_0_0_3px_rgba(176,141,87,0.1)]"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-[0.28em] text-ink" htmlFor="enquiry-email">
            Email
          </label>
          <input
            id="enquiry-email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-lg border border-[color:var(--rule)] bg-white/90 px-4 py-2 text-[clamp(0.8rem,1vw,0.95rem)] text-ink placeholder:text-muted shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)] focus:shadow-[0_0_0_3px_rgba(176,141,87,0.1)]"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-[0.28em] text-ink" htmlFor="enquiry-category">
            Category
          </label>
          <select
            id="enquiry-category"
            name="category"
            defaultValue=""
            className="w-full rounded-lg border border-[color:var(--rule)] bg-white/90 px-4 py-2 text-[clamp(0.8rem,1vw,0.95rem)] text-ink shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)] focus:shadow-[0_0_0_3px_rgba(176,141,87,0.1)]"
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="general">General Inquiry</option>
            <option value="services">Services Inquiry</option>
            <option value="feedback">Feedback</option>
            <option value="careers">Careers</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-[0.28em] text-ink" htmlFor="enquiry-message">
            Message
          </label>
          <textarea
            id="enquiry-message"
            name="message"
            rows={4}
            placeholder="Tell us about your enquiry..."
            className="h-[clamp(120px,18vh,200px)] w-full resize-none rounded-lg border border-[color:var(--rule)] bg-white/90 px-4 py-2 text-[clamp(0.8rem,1vw,0.95rem)] text-ink placeholder:text-muted shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)] focus:shadow-[0_0_0_3px_rgba(176,141,87,0.1)]"
          />
        </div>
        <input type="hidden" name="location" value={formatLocation(selectedLocation)} />
      </div>
      <div className="mt-auto pt-[clamp(0.75rem,1.5vh,1rem)]">
        <button
          type="submit"
          formAction="https://formsubmit.co/karthikmohan133@gmail.com"
          formMethod="POST"
          className="group inline-flex items-center justify-center gap-2 rounded-full border border-ink bg-ink px-6 py-[clamp(0.5rem,1.2vh,0.75rem)] text-[clamp(0.6rem,0.9vw,0.75rem)] font-semibold uppercase tracking-[0.3em] text-paper shadow-[0_18px_40px_rgba(11,27,59,0.2)] transition-shadow hover:shadow-[0_22px_45px_rgba(11,27,59,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:cursor-not-allowed disabled:opacity-70"
        >
          Send
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </button>
      </div>
    </form>
  );
}
