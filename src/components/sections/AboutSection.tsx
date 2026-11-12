import { BookOpen, Puzzle, Quote, Target } from "lucide-react";

import { AboutReveal } from "@/components/sections/about-reveal";
import { AboutVisual } from "@/components/sections/about-visual";
import { Container } from "@/components/shared/container";
import { aboutContent } from "@/data/about";

const principleIcons = {
  learning: BookOpen,
  "problem-solving": Puzzle,
  purpose: Target,
} as const;

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative isolate scroll-mt-16 overflow-hidden border-t border-border/60 section-y"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div
          className="absolute top-8 -left-48 size-[32rem] rounded-full opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, color-mix(in oklab, var(--primary) 10%, transparent), transparent 68%)",
          }}
        />
        <div
          className="absolute -right-48 bottom-0 size-[30rem] rounded-full opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, color-mix(in oklab, var(--accent-foreground) 10%, transparent), transparent 70%)",
          }}
        />
      </div>

      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-center lg:gap-16 xl:gap-20">
          <div className="max-w-2xl">
            <AboutReveal>
              <p className="inline-flex items-center gap-3 text-caption font-semibold tracking-[0.22em] text-primary uppercase">
                <span
                  aria-hidden="true"
                  className="h-px w-8 bg-primary/50"
                />
                {aboutContent.eyebrow}
              </p>
            </AboutReveal>

            <AboutReveal delay={0.05}>
              <h2 id="about-title" className="mt-4 text-heading-1">
                {aboutContent.heading}
              </h2>
            </AboutReveal>

            <AboutReveal delay={0.1}>
              <p className="mt-5 text-body-lg text-foreground">
                {aboutContent.introduction}
              </p>
            </AboutReveal>

            <div className="mt-6 space-y-4">
              {aboutContent.paragraphs.map((paragraph, index) => (
                <AboutReveal
                  key={paragraph}
                  delay={0.14 + index * 0.04}
                >
                  <p className="text-body text-muted-foreground">
                    {paragraph}
                  </p>
                </AboutReveal>
              ))}
            </div>

            <AboutReveal delay={0.28}>
              <blockquote className="relative mt-8 overflow-hidden rounded-card border border-primary/20 bg-gradient-to-br from-primary/[0.08] via-card/60 to-accent-foreground/[0.06] p-5 sm:p-6">
                <span
                  aria-hidden="true"
                  className="flex size-9 items-center justify-center rounded-control bg-primary/10 text-primary"
                >
                  <Quote className="size-4" />
                </span>
                <p className="mt-4 text-heading-3 text-foreground">
                  {aboutContent.philosophy}
                </p>
              </blockquote>
            </AboutReveal>
          </div>

          <AboutReveal delay={0.15} y={24} scale={0.98}>
            <AboutVisual />
          </AboutReveal>
        </div>

        <div className="mt-16 sm:mt-20">
          <AboutReveal>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-caption font-semibold tracking-[0.22em] text-primary uppercase">
                  {aboutContent.principles.eyebrow}
                </p>
                <h3
                  id="about-principles-title"
                  className="mt-2 text-heading-2"
                >
                  {aboutContent.principles.heading}
                </h3>
              </div>
              <p className="max-w-sm text-label text-muted-foreground sm:text-right">
                {aboutContent.principles.description}
              </p>
            </div>
          </AboutReveal>

          <ul
            aria-labelledby="about-principles-title"
            className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {aboutContent.principles.items.map((principle, index) => {
              const Icon = principleIcons[principle.icon];

              return (
                <li key={principle.title} className="h-full">
                  <AboutReveal delay={index * 0.07} className="h-full">
                    <article className="group flex h-full flex-col rounded-card border border-border bg-card/70 p-6 shadow-sm transition-[transform,border-color,box-shadow,background-color] duration-300 hover:border-primary/30 hover:bg-card hover:shadow-glow motion-safe:hover:-translate-y-1">
                      <div className="flex items-center justify-between gap-4">
                        <span
                          aria-hidden="true"
                          className="flex size-11 items-center justify-center rounded-control border border-primary/15 bg-gradient-to-br from-primary/15 to-accent-foreground/10 text-primary"
                        >
                          <Icon className="size-5" />
                        </span>
                        <span
                          aria-hidden="true"
                          className="font-mono text-caption text-muted-foreground/50"
                        >
                          0{index + 1}
                        </span>
                      </div>
                      <h4 className="mt-5 text-heading-3">
                        {principle.title}
                      </h4>
                      <p className="mt-2 text-body text-muted-foreground">
                        {principle.description}
                      </p>
                    </article>
                  </AboutReveal>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
