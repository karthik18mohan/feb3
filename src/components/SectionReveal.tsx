"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useInViewReplay } from "@/lib/motion";

export function SectionReveal({ children }: { children: ReactNode }) {
  const sectionReveal = useInViewReplay({ amount: 0.6, margin: "-100px" });

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0 }
      }}
      {...sectionReveal}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
