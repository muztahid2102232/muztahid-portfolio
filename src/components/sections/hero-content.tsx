"use client";

import { ArrowRight, Download } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { Variants } from "motion/react";
import type { MouseEvent as ReactMouseEvent } from "react";

import { HeroVisual } from "@/components/sections/hero-visual";
import { Container } from "@/components/shared/container";
import { heroContent } from "@/data/hero";
import { siteConfig } from "@/lib/constants";
import type { HeroTechnology } from "@/types/hero";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const nameParts = siteConfig.name.split(" ");
const nameLead = nameParts.slice(0, -1).join(" ");
const nameAccent = nameParts[nameParts.length - 1] ?? siteConfig.name;


interface HeroContentProps {
  hasProfileImage: boolean;
  hasCv: boolean;
  technologies: HeroTechnology[];
}

export function HeroContent({
  hasProfileImage,
  hasCv,
  technologies,
}: HeroContentProps) {
  const reduceMotion = useReducedMotion() ?? false;

  // Keep the server and client initial markup identical. Reduced-motion users
  // get a zero-duration reveal (and a CSS safety net in globals.css) instead of
  // a different initial render, which would cause a hydration mismatch.
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: reduceMotion
        ? { duration: 0 }
        : { staggerChildren: 0.065, delayChildren: 0.05 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reduceMotion
        ? { duration: 0 }
        : { duration: 0.5, ease: EASE_OUT },
    },
  };

  const handleProjectsClick = (
    event: ReactMouseEvent<HTMLAnchorElement>,
  ) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const target = document.getElementById(
      heroContent.primaryCta.sectionId,
    );

    // Before the Projects section exists, allow the default hash navigation.
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
    window.history.pushState(
      null,
      "",
      `/#${heroContent.primaryCta.sectionId}`,
    );
  };

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate scroll-mt-16 overflow-hidden"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-40 dark:opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 80% 65% at 50% 35%, black, transparent)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 65% at 50% 35%, black, transparent)",
          }}
        />
        <div
          className="absolute -top-64 right-[-18%] size-[42rem] rounded-full opacity-70"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, color-mix(in oklab, var(--primary) 20%, transparent), transparent 68%)",
          }}
        />
        <div
          className="absolute -bottom-72 left-[-20%] size-[38rem] rounded-full opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, color-mix(in oklab, var(--accent-foreground) 16%, transparent), transparent 70%)",
          }}
        />
      </div>

      <Container className="relative grid gap-14 py-14 sm:py-20 lg:min-h-[calc(100dvh-4rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-12 lg:py-20 xl:gap-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          data-hero-reveal
          className="max-w-2xl lg:max-w-none"
        >
          <motion.p
            variants={itemVariants}
            data-hero-reveal
            className="inline-flex w-fit items-center gap-2.5 rounded-pill border border-border bg-card/70 px-3.5 py-1.5 text-label text-muted-foreground shadow-sm backdrop-blur"
          >
            <span aria-hidden="true" className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/60 [animation-duration:2.4s] motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            {heroContent.greeting}
          </motion.p>

          <motion.h1
            id="hero-title"
            variants={itemVariants}
            data-hero-reveal
            className="mt-6 text-display"
          >
            <span className="block">{nameLead}</span>
            <span
              className="mt-1 block bg-clip-text text-transparent selection:text-foreground"
              style={{
                backgroundImage:
                  "linear-gradient(100deg, var(--primary), var(--accent-foreground))",
              }}
            >
              {nameAccent}
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            data-hero-reveal
            className="mt-4 flex items-center gap-3 text-heading-3 text-primary"
          >
            <span
              aria-hidden="true"
              className="hidden h-px w-8 bg-primary/40 sm:block"
            />
            {siteConfig.role}
          </motion.p>

          <motion.p
            variants={itemVariants}
            data-hero-reveal
            className="mt-6 max-w-xl text-body text-muted-foreground sm:text-body-lg"
          >
            {heroContent.introduction}
          </motion.p>

          <motion.p
            variants={itemVariants}
            data-hero-reveal
            className="mt-6 flex max-w-xl items-start gap-3 text-label text-muted-foreground"
          >
            <span
              aria-hidden="true"
              className="mt-1.5 h-4 w-px shrink-0 bg-gradient-to-b from-primary to-transparent"
            />
            <span className="font-mono leading-relaxed">
              {heroContent.tagline}
            </span>
          </motion.p>

          <motion.div
            variants={itemVariants}
            data-hero-reveal
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <a
              href={`/#${heroContent.primaryCta.sectionId}`}
              onClick={handleProjectsClick}
              className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-control bg-primary px-6 text-label font-semibold text-primary-foreground shadow-glow transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-primary/90 active:translate-y-0 sm:w-auto"
            >
              {heroContent.primaryCta.label}
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </a>

            {hasCv ? (
              <a
                href={heroContent.cv.href}
                download
                className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-control border border-border bg-card/70 px-6 text-label font-semibold text-foreground shadow-sm transition-[transform,background-color,border-color] duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-secondary sm:w-auto"
              >
                <Download
                  aria-hidden="true"
                  className="size-4 transition-transform duration-200 group-hover:translate-y-0.5"
                />
                {heroContent.cv.label}
              </a>
            ) : (
              <>
                <button
                  type="button"
                  disabled
                  aria-describedby="cv-availability"
                  title="CV will be available soon"
                  className="inline-flex min-h-12 w-full cursor-not-allowed items-center justify-center gap-2 rounded-control border border-dashed border-border bg-card/40 px-6 text-label font-medium text-muted-foreground sm:w-auto"
                >
                  <Download aria-hidden="true" className="size-4" />
                  {heroContent.cv.label}
                  <span className="rounded-pill bg-secondary px-1.5 py-0.5 text-[0.625rem] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
                    Soon
                  </span>
                </button>
                <span id="cv-availability" className="sr-only">
                  The CV download will be available soon.
                </span>
              </>
            )}
          </motion.div>


        </motion.div>

        <HeroVisual
          hasProfileImage={hasProfileImage}
          technologies={technologies}
        />
      </Container>
    </section>
  );
}
