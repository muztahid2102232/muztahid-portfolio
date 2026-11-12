"use client";

import { ImagePlus } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

import { heroContent } from "@/data/hero";
import type { HeroTechnology } from "@/types/hero";

import { FloatingTechIcons } from "./floating-tech-icons";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface HeroVisualProps {
  hasProfileImage: boolean;
  technologies: HeroTechnology[];
}

export function HeroVisual({
  hasProfileImage,
  technologies,
}: HeroVisualProps) {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <motion.div
      initial={{ opacity: 0, y: 22, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.65, delay: 0.1, ease: EASE_OUT }
      }
      data-hero-reveal
      data-hero-visual
      className="relative mx-auto w-full max-w-[24rem] sm:max-w-[27rem] lg:max-w-[28rem]"
    >
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -z-10 h-[108%] w-[108%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-80"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, color-mix(in oklab, var(--primary) 18%, transparent), transparent 68%)",
        }}
      />

      <div
        aria-hidden="true"
        className="absolute -inset-3 -z-10 rotate-3 rounded-[2rem] border border-primary/10 bg-primary/[0.03] sm:-inset-4"
      />

      <div className="relative rounded-panel bg-gradient-to-br from-primary/40 via-border/70 to-accent-foreground/30 p-px shadow-card">
        <div className="rounded-[calc(var(--radius-panel)-1px)] bg-card p-2.5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(var(--radius-panel)-0.5rem)] bg-muted" data-hero-photo>
            {hasProfileImage ? (
              <Image
                src={heroContent.profileImage.src}
                alt={heroContent.profileImage.alt}
                fill
                preload
                sizes="(min-width: 1024px) 28rem, (min-width: 640px) 27rem, 80vw"
                className="object-cover"
              />
            ) : (
              <ProfileFallback />
            )}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 to-transparent dark:from-black/55"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-black/5 ring-inset dark:ring-white/10"
            />
          </div>
        </div>
      </div>

      <FloatingTechIcons technologies={technologies} />
      <TerminalPanel />

      <span
        aria-hidden="true"
        className="absolute -top-3 left-[22%] size-1.5 rounded-full bg-primary shadow-[0_0_14px_var(--primary)]"
      />
      <span
        aria-hidden="true"
        className="absolute top-[36%] right-[8%] size-1 rounded-full bg-cyan-400/80 shadow-[0_0_12px_rgb(34_211_238_/_0.65)]"
      />
    </motion.div>
  );
}

function ProfileFallback() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center" data-hero-fallback>
      <div
        aria-hidden="true"
        className="relative flex size-28 items-center justify-center rounded-full border border-primary/20 bg-background/50"
      >
        <span className="absolute inset-2 rounded-full border border-dashed border-primary/30" />
        <span
          className="bg-clip-text font-mono text-4xl font-semibold tracking-tight text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(135deg, var(--primary), var(--accent-foreground))",
          }}
        >
          MH
        </span>
      </div>

      <div>
        <p className="inline-flex items-center gap-2 text-label font-medium text-foreground">
          <ImagePlus
            aria-hidden="true"
            className="size-4 text-primary"
          />
          Your photo here
        </p>
        <p className="mt-2 font-mono text-[0.6875rem] leading-relaxed break-all text-muted-foreground">
          {heroContent.profileImage.src}
        </p>
      </div>
    </div>
  );
}

function TerminalPanel() {
  return (
    <div
      aria-hidden="true"
      className="absolute -bottom-6 -left-2 z-20 hidden w-56 overflow-hidden rounded-card border border-border/80 bg-card/95 shadow-card backdrop-blur sm:-left-6 sm:block"
    >
      <div className="flex items-center gap-1.5 border-b border-border/70 px-3 py-2">
        <span className="size-2 rounded-full bg-rose-400/80" />
        <span className="size-2 rounded-full bg-amber-400/80" />
        <span className="size-2 rounded-full bg-emerald-400/80" />
        <span className="ml-2 font-mono text-[0.625rem] text-muted-foreground">
          portfolio
        </span>
      </div>
      <div className="px-3 py-2.5 font-mono text-[0.625rem] leading-relaxed">
        <p>
          <span className="text-emerald-600 dark:text-emerald-400">
            $
          </span>{" "}
          <span className="text-foreground">npm run dev</span>
        </p>
        <p className="mt-0.5 text-muted-foreground">
          ready on localhost:3000
        </p>
      </div>
    </div>
  );
}
