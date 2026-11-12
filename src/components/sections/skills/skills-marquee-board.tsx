"use client";

import { Braces, LayoutTemplate, Palette, Pause, Play, Server } from "lucide-react";
import { useState } from "react";

import { SkillMarquee } from "@/components/sections/skills/skill-marquee";
import { SkillReveal } from "@/components/sections/skills/skill-reveal";
import type { SkillMarqueeRowData, SkillRowId } from "@/types/skill";

const rowIcons = {
  frontend: LayoutTemplate,
  styling: Palette,
  backend: Server,
  tools: Braces,
} as const satisfies Record<SkillRowId, typeof LayoutTemplate>;

interface SkillsMarqueeBoardProps {
  rows: SkillMarqueeRowData[];
  pauseHint: string;
}

/**
 * Client wrapper that owns the global pause state for the marquee rows.
 * Everything else about the marquee (including the motion itself) is CSS.
 */
export function SkillsMarqueeBoard({ rows, pauseHint }: SkillsMarqueeBoardProps) {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 motion-reduce:hidden">
        <p className="text-caption text-muted-foreground">{pauseHint}</p>
        <button
          type="button"
          onClick={() => setIsPaused((paused) => !paused)}
          aria-pressed={isPaused}
          className="inline-flex items-center gap-2 rounded-pill border border-border bg-card/60 px-3 py-1.5 text-caption font-medium text-muted-foreground transition-colors duration-200 hover:border-primary/30 hover:text-foreground"
        >
          {isPaused ? (
            <Play aria-hidden="true" className="size-3.5" />
          ) : (
            <Pause aria-hidden="true" className="size-3.5" />
          )}
          {isPaused ? "Resume motion" : "Pause motion"}
        </button>
      </div>

      <div
        data-paused={isPaused ? "true" : undefined}
        className="skill-marquee-board overflow-hidden rounded-panel border border-border bg-card/40 shadow-card backdrop-blur-sm"
      >
        <div className="divide-y divide-border/70">
          {rows.map((row, index) => {
            const Icon = rowIcons[row.id];

            return (
              <div key={row.id} className="py-5 sm:py-6">
                <SkillReveal delay={index * 0.05}>
                  <div className="flex items-center gap-3 px-5 sm:px-6">
                    <span
                      aria-hidden="true"
                      className="flex size-8 shrink-0 items-center justify-center rounded-control border border-primary/15 bg-gradient-to-br from-primary/15 to-accent-foreground/10 text-primary"
                    >
                      <Icon className="size-4" />
                    </span>
                    <h3 className="text-label font-semibold text-foreground">
                      {row.label}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="ml-auto font-mono text-caption text-muted-foreground/50"
                    >
                      0{index + 1}
                    </span>
                  </div>
                </SkillReveal>

                <div className="mt-4">
                  <SkillMarquee
                    label={row.label}
                    items={row.items}
                    direction={row.direction}
                    durationSeconds={row.durationSeconds}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
