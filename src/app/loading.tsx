import { siteConfig } from "@/lib/constants";

export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading page content"
      className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-background px-4 text-center select-none"
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div
          className="absolute top-1/2 left-1/2 size-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, color-mix(in oklab, var(--primary) 14%, transparent), transparent 70%)",
          }}
        />
      </div>

      <div className="relative flex flex-col items-center max-w-sm">
        {/* Branded Logo Emblem */}
        <div className="relative flex size-20 items-center justify-center rounded-panel border border-primary/25 bg-card/80 shadow-glow backdrop-blur-md sm:size-24">
          <div className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="font-mono text-xl font-bold tracking-tight text-primary sm:text-2xl"
            >
              {"</>"}
            </span>
            <span className="font-mono text-xl font-bold tracking-[0.14em] text-foreground sm:text-2xl">
              MH
            </span>
          </div>

          {/* Gentle pulse ring */}
          <span
            aria-hidden="true"
            className="absolute -inset-1 rounded-[1.4rem] border border-primary/30 animate-pulse [animation-duration:2.5s] motion-reduce:animate-none"
          />
        </div>

        {/* Identity */}
        <div className="mt-6 space-y-1">
          <h2 className="text-heading-3 font-semibold text-foreground">
            {siteConfig.name}
          </h2>
          <p className="text-label font-medium text-primary">
            {siteConfig.role}
          </p>
        </div>

        {/* Branded Indeterminate Progress Bar */}
        <div
          aria-hidden="true"
          className="relative mt-8 h-1 w-48 overflow-hidden rounded-pill border border-border/80 bg-secondary/80"
        >
          <div className="loading-bar-indeterminate h-full w-full rounded-pill bg-gradient-to-r from-primary via-cyan-400 to-primary" />
        </div>

        {/* Welcoming Message */}
        <p className="mt-4 font-mono text-caption text-muted-foreground">
          Building something meaningful...
        </p>
      </div>
    </div>
  );
}

