"use client";

import { ArrowUp } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { useState } from "react";

export function BackToTop() {
  const reduceMotion = useReducedMotion() ?? false;
  const { scrollY, scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsVisible(latest > 280);
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8, y: 8 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.25, ease: [0.16, 1, 0.3, 1] }
          }
          className="fixed bottom-6 right-6 z-40 sm:bottom-8 sm:right-8"
        >
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            title="Back to top"
            className="group relative flex size-12 items-center justify-center rounded-full border border-border bg-card/85 text-foreground shadow-card backdrop-blur-md transition-[border-color,background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-card hover:shadow-glow active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            {/* SVG Circular Progress Ring */}
            <svg
              className="pointer-events-none absolute inset-0 size-full -rotate-90"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              {/* Background ring */}
              <circle
                cx="24"
                cy="24"
                r="21"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="text-border opacity-50"
              />
              {/* Animated Progress ring */}
              <motion.circle
                cx="24"
                cy="24"
                r="21"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="text-primary"
                style={{
                  pathLength: scrollYProgress,
                }}
              />
            </svg>

            {/* Arrow Icon */}
            <ArrowUp
              className="size-5 transition-transform duration-200 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

