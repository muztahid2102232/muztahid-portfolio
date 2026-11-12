"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface SkillRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

/**
 * Scroll reveal for the Technical Skills section.
 *
 * Initial values are identical on the server and client. Reduced-motion
 * visitors get a zero-duration transition plus the CSS safety net in
 * globals.css, so the content is never hidden or delayed.
 */
export function SkillReveal({
  children,
  className,
  delay = 0,
  y = 18,
}: SkillRevealProps) {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -64px 0px" }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.55, delay, ease: EASE_OUT }
      }
      data-skills-reveal
      className={className}
    >
      {children}
    </motion.div>
  );
}
