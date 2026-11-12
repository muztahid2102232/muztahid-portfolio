import { ArrowUpRight, Terminal } from "lucide-react";

import { SocialIcon } from "@/components/icons/social-icons";

export function GitHubSetupCard() {
  return (
    <div className="relative overflow-hidden rounded-panel border border-border bg-card/60 p-6 sm:p-8 shadow-card">
      {/* Decorative top accent line */}
      <div
        aria-hidden="true"
        className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
      />

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <span
            aria-hidden="true"
            className="flex size-12 shrink-0 items-center justify-center rounded-control border border-primary/20 bg-primary/10 text-primary sm:size-14"
          >
            <SocialIcon name="github" className="size-6 sm:size-7" />
          </span>

          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 rounded-pill border border-border bg-secondary/70 px-2.5 py-0.5 text-caption font-medium text-muted-foreground">
              <span className="size-1.5 rounded-full bg-amber-400" aria-hidden="true" />
              Configuration Pending
            </div>
            <h3 className="text-heading-2 font-semibold text-foreground">
              Connect Your GitHub Account
            </h3>
            <p className="max-w-xl text-body text-muted-foreground">
              Live statistics and your real contribution calendar will activate
              automatically once your GitHub profile username is provided.
            </p>
          </div>
        </div>

        {/* Configuration instructions block */}
        <div className="rounded-card border border-border/80 bg-background/80 p-4 font-mono text-[0.75rem] shadow-sm backdrop-blur">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Terminal className="size-3.5 text-primary" aria-hidden="true" />
            <span>Quick Setup:</span>
          </div>
          <div className="mt-2 space-y-1 text-muted-foreground">
            <p>
              1. Open <code className="text-foreground font-semibold">src/data/social-links.ts</code>
            </p>
            <p>
              2. Replace <code className="text-primary font-semibold">&quot;YOUR_GITHUB_USERNAME&quot;</code> with your username
            </p>
            <p className="text-[0.6875rem] text-muted-foreground/80">
              (or add <code className="text-foreground">GITHUB_USERNAME=your-username</code> in .env.local)
            </p>
          </div>
        </div>
      </div>

      {/* Disabled CTA with informative tooltip */}
      <div className="mt-8 flex flex-col gap-3 border-t border-border/60 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-caption text-muted-foreground">
          No external API calls are made while in placeholder mode to preserve rate limits and performance.
        </p>

        <button
          type="button"
          disabled
          aria-disabled="true"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-control border border-dashed border-border bg-card/40 px-5 text-label font-medium text-muted-foreground cursor-not-allowed select-none"
        >
          <span>View My GitHub Profile</span>
          <ArrowUpRight className="size-4 opacity-50" aria-hidden="true" />
          <span className="rounded-pill bg-secondary px-1.5 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wider text-muted-foreground">
            Pending
          </span>
        </button>
      </div>
    </div>
  );
}

