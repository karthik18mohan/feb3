import { useEffect, useState } from "react";
import { Variants } from "framer-motion";

export const PREMIUM_EASE = [0.22, 1, 0.36, 1] as const;

export const durations = {
  entry: 0.7,
  entryFast: 0.5,
  entrySlow: 0.9,
  hover: 0.25,
  page: 0.35,
  accordion: 0.3,
} as const;

export const stagger = {
  tight: 0.08,
  normal: 0.1,
  relaxed: 0.12,
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.entry,
      ease: PREMIUM_EASE,
    }
  },
};

export const fadeUpFast: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.entryFast,
      ease: PREMIUM_EASE,
    }
  },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: durations.entry,
      ease: PREMIUM_EASE,
    }
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: durations.entry,
      ease: PREMIUM_EASE,
    }
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: durations.entry,
      ease: PREMIUM_EASE,
    }
  },
};

export const scaleXReveal: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: durations.entry,
      ease: PREMIUM_EASE,
    }
  },
};

export const scaleYReveal: Variants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: {
      duration: durations.entry,
      ease: PREMIUM_EASE,
    }
  },
};

export const staggerContainer = (staggerDelay: number = stagger.normal): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
    },
  },
});

export const navItemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.entryFast,
      ease: PREMIUM_EASE,
      delay: i * stagger.tight,
    },
  }),
};

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}

export const reducedMotionVariants = {
  fadeUp: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 }
    },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 }
    },
  },
};

export const viewportConfig = {
  once: true,
  amount: 0.6 as const,
};

export const viewportConfigPartial = {
  once: true,
  amount: 0.35 as const,
};
