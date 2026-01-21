"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { siteTitle, whoWeAreHeading, whoWeAreBody, whoWeAreHeroImage } from "@/content/copy";

export default function WhoWeArePage() {
  return (
    <main className="min-h-screen">
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
        <Image
          src={whoWeAreHeroImage}
          alt={siteTitle}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 mx-auto max-w-5xl px-6 text-center"
        >
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            {siteTitle}
          </h1>
        </motion.div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          {whoWeAreHeading}
        </h2>
        <p className="mt-6 text-base leading-relaxed text-neutral-700">
          {whoWeAreBody}
        </p>
      </section>
    </main>
  );
}
