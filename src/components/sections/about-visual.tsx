import { Blocks, Code2, TrendingUp } from "lucide-react";

import { aboutContent } from "@/data/about";
import { siteConfig } from "@/lib/constants";

const highlightIcons = {
  focus: Code2,
  learning: Blocks,
  goal: TrendingUp,
} as const;

const codeLineNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

/**
 * Developer-themed visual for the About section.
 *
 * The editor is decorative (and hidden from assistive technology because it
 * repeats the copy). The highlight list underneath is real content.
 */
export function AboutVisual() {
  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -z-10 h-[112%] w-[112%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, color-mix(in oklab, var(--primary) 14%, transparent), transparent 68%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -inset-2 -z-10 rotate-1 rounded-[1.9rem] border border-primary/10 bg-primary/[0.02] sm:-inset-3"
      />

      <div
        aria-hidden="true"
        className="relative overflow-hidden rounded-panel border border-border bg-card shadow-card"
      >
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

        <div className="flex items-center gap-1.5 border-b border-border/70 bg-muted/40 px-4 py-3">
          <span className="size-2.5 rounded-full bg-rose-400/80" />
          <span className="size-2.5 rounded-full bg-amber-400/80" />
          <span className="size-2.5 rounded-full bg-emerald-400/80" />
          <span className="ml-2 font-mono text-[0.6875rem] text-muted-foreground">
            about.ts
          </span>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-pill border border-border/70 bg-background/60 px-2 py-0.5 font-mono text-[0.625rem] text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary" />
            TypeScript
          </span>
        </div>

        <div className="flex">
          <div className="hidden shrink-0 border-r border-border/60 px-4 py-5 text-right font-mono text-[0.6875rem] leading-6 text-muted-foreground/45 select-none sm:block sm:leading-7">
            {codeLineNumbers.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </div>

          <pre className="min-w-0 flex-1 overflow-x-auto px-4 py-5 font-mono text-[0.6875rem] leading-6 sm:px-5 sm:text-xs sm:leading-7">
            <code>
              <span className="block">
                <span className="text-accent-foreground">const</span>{" "}
                <span className="text-foreground">developer</span>{" "}
                <span className="text-muted-foreground">= {"{"}</span>
              </span>
              <span className="block pl-4">
                <span className="text-primary">name</span>
                <span className="text-muted-foreground">:</span>{" "}
                <span className="text-emerald-700 dark:text-emerald-400">
                  &quot;{siteConfig.name}&quot;
                </span>
                <span className="text-muted-foreground">,</span>
              </span>
              <span className="block pl-4">
                <span className="text-primary">role</span>
                <span className="text-muted-foreground">:</span>{" "}
                <span className="text-emerald-700 dark:text-emerald-400">
                  &quot;{siteConfig.role}&quot;
                </span>
                <span className="text-muted-foreground">,</span>
              </span>
              <span className="block pl-4">
                <span className="text-primary">interests</span>
                <span className="text-muted-foreground">: [</span>
              </span>
              <span className="block pl-8">
                <span className="text-emerald-700 dark:text-emerald-400">
                  &quot;Web Development&quot;
                </span>
                <span className="text-muted-foreground">,</span>
              </span>
              <span className="block pl-8">
                <span className="text-emerald-700 dark:text-emerald-400">
                  &quot;Problem Solving&quot;
                </span>
                <span className="text-muted-foreground">,</span>
              </span>
              <span className="block pl-4">
                <span className="text-muted-foreground">],</span>
              </span>
              <span className="block pl-4">
                <span className="text-primary">approach</span>
                <span className="text-muted-foreground">:</span>{" "}
                <span className="text-emerald-700 dark:text-emerald-400">
                  &quot;Learn → Build → Improve&quot;
                </span>
                <span className="text-muted-foreground">,</span>
              </span>
              <span className="block pl-4">
                <span className="text-primary">mindset</span>
                <span className="text-muted-foreground">:</span>{" "}
                <span className="text-emerald-700 dark:text-emerald-400">
                  &quot;Always learning&quot;
                </span>
                <span className="text-muted-foreground">,</span>
              </span>
              <span className="block">
                <span className="text-muted-foreground">{"};"}</span>
              </span>
            </code>
          </pre>
        </div>
      </div>

      <div className="relative mt-4 rounded-card border border-border bg-card/80 p-2 shadow-sm backdrop-blur">
        <dl className="divide-y divide-border/60">
          {aboutContent.highlights.map((highlight) => {
            const Icon = highlightIcons[highlight.icon];

            return (
              <div
                key={highlight.label}
                className="flex items-center gap-3 px-3 py-3"
              >
                <span
                  aria-hidden="true"
                  className="flex size-8 shrink-0 items-center justify-center rounded-control bg-gradient-to-br from-primary/15 to-accent-foreground/10 text-primary"
                >
                  <Icon className="size-4" />
                </span>
                <div className="min-w-0">
                  <dt className="text-caption font-medium tracking-[0.14em] text-muted-foreground uppercase">
                    {highlight.label}
                  </dt>
                  <dd className="mt-0.5 text-label font-medium text-foreground">
                    {highlight.value}
                  </dd>
                </div>
              </div>
            );
          })}
        </dl>
      </div>
    </div>
  );
}
