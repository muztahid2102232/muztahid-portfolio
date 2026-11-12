"use client";

import { motion, useReducedMotion } from "motion/react";

import { TechIcon } from "@/components/icons/tech-icons";
import { cn } from "@/lib/utils";
import type { HeroTechnology } from "@/types/hero";

const positions = [
  "-left-3 top-[12%] sm:-left-8 xl:-left-9",
  "-right-3 top-[7%] sm:-right-8 xl:-right-9",
  "-left-3 top-[45%] sm:-left-9 xl:-left-10",
  "-right-3 top-[38%] sm:-right-9 xl:-right-10",
  "-right-2 bottom-[17%] sm:-right-8 xl:-right-9",
];

interface FloatingTechIconsProps {
  technologies: HeroTechnology[];
}

export function FloatingTechIcons({
  technologies,
}: FloatingTechIconsProps) {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <ul
      aria-label="Technologies I work with"
      className="pointer-events-none absolute inset-0 z-10"
    >
      {technologies.map((technology, index) => (
        <motion.li
          key={technology.name}
          className={cn(
            "pointer-events-auto absolute",
            positions[index % positions.length],
          )}
          animate={
            reduceMotion ? undefined : { y: [0, -7, 0] }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 4.2 + index * 0.45,
                  delay: index * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
          whileHover={reduceMotion ? undefined : { scale: 1.08 }}
        >
          <span
            title={technology.name}
            className="flex size-10 items-center justify-center rounded-xl border border-border/80 bg-card/90 shadow-card backdrop-blur-sm transition-colors duration-200 hover:border-primary/30 sm:size-12"
          >
            <TechIcon
              path={technology.path}
              className={cn(
                "size-5 sm:size-6",
                technology.iconClassName,
              )}
            />
            <span className="sr-only">{technology.name}</span>
          </span>
        </motion.li>
      ))}
    </ul>
  );
}
