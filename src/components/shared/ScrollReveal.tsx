"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import {
  EASE_OUT,
  fadeDown,
  fadeIn,
  fadeLeft,
  fadeRight,
  fadeUp,
  scaleIn,
} from "@/lib/animations";

export type ScrollRevealVariant =
  | "fadeUp"
  | "fadeIn"
  | "fadeDown"
  | "fadeLeft"
  | "fadeRight"
  | "scaleIn";

const variantMap = {
  fadeUp,
  fadeIn,
  fadeDown,
  fadeLeft,
  fadeRight,
  scaleIn,
};

interface ScrollRevealProps {
  children: ReactNode;
  variant?: ScrollRevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
  y?: number;
}

export function ScrollReveal({
  children,
  variant = "fadeUp",
  delay = 0,
  duration = 0.55,
  className,
  once = true,
  amount = 0.15,
  y,
}: ScrollRevealProps) {
  const reduceMotion = useReducedMotion() ?? false;

  const selectedVariants = variantMap[variant];

  // If a custom y offset was specified for fadeUp/fadeDown
  const customVariants = y !== undefined && variant === "fadeUp"
    ? {
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration, delay, ease: EASE_OUT },
        },
      }
    : selectedVariants;

  return (
    <motion.div
      variants={customVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: "0px 0px -48px 0px" }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration, delay, ease: EASE_OUT }
      }
      data-scroll-reveal
      className={className}
    >
      {children}
    </motion.div>
  );
}

