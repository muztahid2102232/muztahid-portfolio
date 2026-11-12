"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface ProjectRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  scale?: number;
}

/**
 * Lightweight scroll reveal used throughout the Featured Projects section.
 *
 * Keeps server and client initial markup identical; reduced-motion visitors
 * get an immediate zero-duration transition plus the CSS safety net.
 */
export function ProjectReveal({
  children,
  className,
  delay = 0,
  y = 18,
  scale = 1,
}: ProjectRevealProps) {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <motion.div
      initial={{ opacity: 0, y, scale }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -48px 0px" }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.55, delay, ease: EASE_OUT }
      }
      data-projects-reveal
      className={className}
    >
      {children}
    </motion.div>
  );
}

