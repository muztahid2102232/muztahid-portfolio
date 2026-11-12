import { ArrowUpRight, CloudOff } from "lucide-react";

import { githubConfig } from "@/data/social-links";

interface GitHubErrorCardProps {
  message?: string;
}

export function GitHubErrorCard({
  message = "Live GitHub metrics are momentarily unavailable.",
}: GitHubErrorCardProps) {
  return (
    <div className="rounded-panel border border-border bg-card/60 p-6 sm:p-8 shadow-card text-center sm:text-left">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <span
            aria-hidden="true"
            className="flex size-12 shrink-0 items-center justify-center rounded-control border border-border bg-muted/60 text-muted-foreground"
          >
            <CloudOff className="size-6" />
          </span>

          <div className="space-y-1">
            <h3 className="text-heading-3 font-semibold text-foreground">
              Activity Status
            </h3>
            <p className="max-w-xl text-body text-muted-foreground">{message}</p>
          </div>
        </div>

        <a
          href={githubConfig.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-control border border-border bg-card px-5 text-label font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-secondary"
        >
          <span>View Directly on GitHub</span>
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

