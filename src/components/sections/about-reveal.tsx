"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface AboutRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  scale?: number;
}

/**
 * Lightweight scroll reveal used throughout the About section.
 *
 * The initial values are identical on the server and the client. Reduced-motion
 * visitors get a zero-duration transition plus the CSS safety net in
 * globals.css, so no content is hidden or delayed.
 */
export function AboutReveal({
  children,
  className,
  delay = 0,
  y = 16,
  scale = 1,
}: AboutRevealProps) {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <motion.div
      initial={{ opacity: 0, y, scale }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -64px 0px" }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.55, delay, ease: EASE_OUT }
      }
      data-about-reveal
      className={className}
    >
      {children}
    </motion.div>
  );
}
