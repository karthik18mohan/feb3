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
};

export const EnquirySection = forwardRef<HTMLElement, EnquirySectionProps>(
  ({ id, className, sectionLabel }, ref) => {
    const sectionReveal = useInViewReplay({ amount: 0.6 });

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
        className={className ?? "relative isolate min-h-screen w-screen"}
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
        <div className="relative z-10 mx-auto flex w-full max-w-[1180px] min-h-[calc(100vh-var(--nav-h))] items-center px-6 section-shell">
          <div className="w-full rounded-2xl border border-[color:var(--rule)] bg-paper/85 p-[clamp(0.9rem,2.2vw,1.75rem)] shadow-[0_24px_60px_rgba(11,27,59,0.25)] backdrop-blur">
            <motion.div
              variants={fadeUp}
              {...sectionReveal}
              className="mb-[clamp(0.8rem,1.8vh,1.4rem)] space-y-[clamp(0.4rem,1.1vh,0.75rem)]"
            >
              <div className="flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.42em] text-muted">
                <span className="inline-block h-px w-8 bg-[color:var(--gold)]" aria-hidden />
                Contact
              </div>
              <div className="space-y-[clamp(0.4rem,1.1vh,0.75rem)]">
                <h2 className="text-[clamp(1.6rem,2.8vw,2.4rem)] font-semibold text-ink">
                  Start an enquiry
                </h2>
                <p className="text-[clamp(0.9rem,1.1vw,1rem)] leading-relaxed text-muted">
                  Share your requirements and we will respond with thoughtful guidance.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={staggerContainer(stagger.normal)}
              {...sectionReveal}
              className="grid gap-[clamp(0.85rem,2vw,1.5rem)] lg:grid-cols-12"
            >
              <div className="lg:col-span-3">
                <LocationsList
                  locations={LOCATIONS}
                  selectedId={selectedLocationId ?? ""}
                  onSelect={handleSelectLocation}
                />
              </div>
              <div className="lg:col-span-5">
                <MapPanel location={selectedLocation} />
              </div>
              <div className="lg:col-span-4">
                <EnquiryForm selectedLocation={selectedLocation} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }
);

EnquirySection.displayName = "EnquirySection";
