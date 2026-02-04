"use client";

import Image from "next/image";
import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Footer } from "@/components/Footer";
import { fadeUp, fadeUpFast, durations, stagger, PREMIUM_EASE, useInViewReplay } from "@/lib/motion";

import clients from "../../data/clients.json";

type Client = {
  id: string;
  name?: string;
};

type ClientsSectionProps = {
  id?: string;
  className?: string;
};

export const ClientsSection = forwardRef<HTMLElement, ClientsSectionProps>(
  ({ id, className }, ref) => {
    const sectionReveal = useInViewReplay({ amount: 0.6 });
    const sectionRevealPartial = useInViewReplay({ amount: 0.35 });

    return (
      <section
        ref={ref}
        id={id}
        className={className ?? "relative isolate flex min-h-screen w-screen flex-col overflow-hidden"}
        style={{
          backgroundColor: "var(--ink)",
          backgroundImage: "url('/images/clients/texture/1.jpg')",
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
          backgroundPosition: "center"
        }}
      >
        <div className="flex flex-1 flex-col section-shell">
          <div className="relative h-[clamp(160px,28vh,240px)] w-full flex-shrink-0 overflow-hidden">
            <div className="absolute inset-0 bg-ink/55" />
            <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/55 to-ink/70" />
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
              <motion.h1
                variants={fadeUp}
                {...sectionReveal}
                className="font-heading text-4xl font-semibold text-paper sm:text-5xl lg:text-6xl"
              >
                Our Clients
              </motion.h1>
            </div>
          </div>

          <div className="flex-1 bg-paper py-[clamp(1rem,2.5vh,2.5rem)]">
            <div className="mx-auto w-full max-w-[1180px] px-6">
              <div className="grid grid-cols-2 gap-[clamp(0.75rem,2vw,1.5rem)] sm:grid-cols-3 lg:grid-cols-4">
                {(clients as Client[]).map((client, index) => (
                  <motion.div
                    key={client.id}
                    variants={fadeUpFast}
                    {...sectionRevealPartial}
                    transition={{
                      duration: durations.entry,
                      delay: index * 0.05,
                      ease: PREMIUM_EASE
                    }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="flex h-[clamp(56px,10vh,96px)] w-full items-center justify-center group">
                      <Image
                        src={`/images/clients/${client.id}/1.jpg`}
                        alt={client.name ? `${client.name} logo` : "Client logo"}
                        width={200}
                        height={120}
                        className="h-[clamp(32px,5vh,64px)] w-auto object-contain transition-all duration-300 ease-out group-hover:opacity-70"
                      />
                    </div>
                    {client.name ? (
                      <p className="mt-2 text-[clamp(0.7rem,1vw,0.85rem)] font-medium text-ink/70">{client.name}</p>
                    ) : null}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer className="mt-auto" />
      </section>
    );
  }
);

ClientsSection.displayName = "ClientsSection";
