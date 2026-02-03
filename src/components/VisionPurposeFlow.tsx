"use client";

import { motion } from "framer-motion";
import { fadeUp, fadeUpFast, fadeIn, staggerContainer, viewportConfig, PREMIUM_EASE, durations } from "@/lib/motion";

const DownArrow = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="shrink-0"
  >
    <path
      d="M16 22L8 14L10.4 11.6L16 17.2L21.6 11.6L24 14L16 22Z"
      fill="currentColor"
      className="text-white/40"
    />
  </svg>
);

const arrowFadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: durations.entryFast,
      ease: PREMIUM_EASE,
      delay: 0.05,
    }
  },
};

export function VisionPurposeFlow() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className="relative rounded-2xl bg-transparent"
    >
      <motion.div
        variants={staggerContainer(0.10)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="flex flex-col items-center"
      >
        <motion.div
          variants={fadeUpFast}
          className="w-full rounded-2xl border border-white/20 bg-[#8B4653] p-4 shadow-[0_8px_24px_rgba(11,27,59,0.08)]"
        >
          <p className="text-xs uppercase tracking-[0.38em] text-white/70 mb-1">
            Our Big Picture
          </p>
          <h3 className="text-lg font-semibold text-white">Vision & Purpose</h3>
        </motion.div>

        <motion.div variants={arrowFadeIn} className="-my-2 flex items-center justify-center">
          <DownArrow />
        </motion.div>

        <motion.div
          variants={fadeUpFast}
          className="w-full rounded-2xl border border-white/20 bg-[#C9A86A] p-6 shadow-[0_8px_24px_rgba(11,27,59,0.08)]"
        >
          <p className="text-base leading-relaxed text-white/90">
            To uphold our decades of legacy of trust and professional excellence, embracing the future with a steadfast commitment to integrity and quality in service.
          </p>
        </motion.div>

        <motion.div variants={arrowFadeIn} className="-my-2 flex items-center justify-center">
          <DownArrow />
        </motion.div>

        <motion.div
          variants={fadeUpFast}
          className="w-full rounded-2xl border border-white/20 bg-[#9B8B5E] p-4 shadow-[0_8px_24px_rgba(11,27,59,0.08)]"
        >
          <h3 className="text-lg font-semibold text-white">Our Purpose in Action</h3>
        </motion.div>

        <motion.div variants={arrowFadeIn} className="-my-2 flex items-center justify-center">
          <DownArrow />
        </motion.div>

        <motion.div
          variants={fadeUpFast}
          className="w-full rounded-2xl border border-white/20 bg-[#7B8B7A] p-6 shadow-[0_8px_24px_rgba(11,27,59,0.08)]"
        >
          <p className="text-base leading-relaxed text-white/90">
            To honor our legacy by upholding professional integrity and delivering ethical, insightful, and precise financial solutions that drive client success, while cultivating excellence and empowerment.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
