"use client";

import Image from "next/image";
import { forwardRef, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, stagger, useInViewReplay } from "@/lib/motion";
import { LOCATIONS } from "config/locations";
import { LocationsList } from "@/components/contact/LocationsList";
import { MapPanel } from "@/components/contact/MapPanel";
import { EnquiryForm } from "@/components/contact/EnquiryForm";



type EnquirySectionProps = {
  id?: string;
  className?: string;
  sectionLabel?: string;
  showThankYou?: boolean;
  onCloseThankYou?: () => void;
};

export const EnquirySection = forwardRef<HTMLElement, EnquirySectionProps>(
  ({ id, className, sectionLabel, showThankYou = false, onCloseThankYou }, ref) => {
    const sectionReveal = useInViewReplay({ amount: 0.6 });
    const NAV_H = 72;

    const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);

    const selectedLocation = useMemo(() => {
      if (!selectedLocationId) {
        return null;
      }
      return LOCATIONS.find((location) => location.id === selectedLocationId) ?? null;
    }, [selectedLocationId]);

    const handleSelectLocation = (id: string) => {
      setSelectedLocationId((current) => (current === id ? null : id));
    };

    return (
      <section
        ref={ref}
        id={id}
        aria-label={sectionLabel}
        style={{ paddingTop: NAV_H }}
        className={className ?? "relative isolate w-screen"}
      >
        {sectionLabel ? <span className="sr-only">{sectionLabel}</span> : null}
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
        <div
          style={{ height: `calc(100vh - ${NAV_H}px)` }}
          className="relative z-10 mx-auto flex h-[calc(100vh-72px)] w-full max-w-[1180px] items-center justify-center px-4 py-2 md:px-6 md:py-3 section-shell overflow-hidden"
        >
          <div
            className="flex h-full w-full max-w-[1180px] flex-col rounded-2xl border border-[color:var(--rule)] bg-paper/85 p-[clamp(0.7rem,1.4vw,1.1rem)] shadow-[0_24px_60px_rgba(11,27,59,0.25)] backdrop-blur overflow-hidden"
          >
            <motion.div
              variants={fadeUp}
              {...sectionReveal}
              className="mb-[clamp(0.45rem,1vh,0.7rem)]"
            >
              <h2 className="text-[clamp(1.55rem,2.6vw,2.2rem)] font-semibold text-ink">Start an enquiry</h2>
            </motion.div>

            <motion.div
              variants={staggerContainer(stagger.normal)}
              {...sectionReveal}
              className="grid h-full min-h-0 flex-1 grid-cols-1 gap-[clamp(0.65rem,1.2vw,0.95rem)] overflow-y-auto scroll-smooth pr-1 lg:grid-cols-12 lg:overflow-hidden lg:pr-0"
            >
              <div className="h-[26rem] min-h-0 overflow-hidden lg:col-span-3 lg:h-auto">
                <LocationsList
                  locations={LOCATIONS}
                  selectedId={selectedLocationId ?? ""}
                  onSelect={handleSelectLocation}
                />
              </div>
              <div className="h-[20rem] min-h-0 overflow-hidden lg:col-span-5 lg:h-auto">
                <MapPanel location={selectedLocation} />
              </div>
              <div className="relative h-[27rem] min-h-0 overflow-hidden lg:col-span-4 lg:h-auto">
                <EnquiryForm selectedLocation={selectedLocation} />
                {showThankYou ? (
                  <div
                    className="absolute inset-0 flex items-center justify-center rounded-2xl bg-[rgba(6,10,20,0.72)] p-6"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Enquiry submitted"
                  >
                    <div className="w-full max-w-sm space-y-4 rounded-2xl border border-[color:var(--rule)] bg-paper/95 p-6 text-center shadow-[0_24px_60px_rgba(11,27,59,0.25)]">
                      <h3 className="text-lg font-semibold text-ink">Thank you!</h3>
                      <p className="text-sm text-muted">
                        Your enquiry has been sent. We will get back to you shortly.
                      </p>
                      <button
                        type="button"
                        onClick={onCloseThankYou}
                        className="inline-flex items-center justify-center rounded-full border border-ink bg-ink px-5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-paper transition hover:shadow-[0_12px_30px_rgba(11,27,59,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }
);

EnquirySection.displayName = "EnquirySection";
