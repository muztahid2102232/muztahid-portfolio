import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";
import Link from "next/link";

import type { Project } from "@/types/project";

interface ProjectNavigationProps {
  previous?: Project;
  next?: Project;
}

export function ProjectNavigation({ previous, next }: ProjectNavigationProps) {
  return (
    <nav
      aria-label="Project pagination"
      className="border-t border-border/70 pt-10 sm:pt-14"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:items-center">
        {/* Previous Project */}
        <div className="flex justify-start">
          {previous ? (
            <Link
              href={`/projects/${previous.slug}`}
              className="group flex flex-col items-start gap-1 rounded-card border border-border/70 bg-card/60 p-4 transition-[border-color,background-color,transform] hover:border-primary/40 hover:bg-secondary motion-safe:hover:-translate-x-0.5 sm:max-w-xs"
              aria-label={`Previous project: ${previous.title}`}
            >
              <span className="inline-flex items-center gap-1.5 text-caption font-medium text-muted-foreground group-hover:text-primary">
                <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
                Previous Project
              </span>
              <span className="text-label font-semibold text-foreground truncate max-w-[200px]">
                {previous.title}
              </span>
            </Link>
          ) : (
            <div aria-hidden="true" className="hidden sm:block" />
          )}
        </div>

        {/* Back to All Projects */}
        <div className="flex justify-center">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 rounded-pill border border-border bg-card/80 px-4 py-2 text-label font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-secondary hover:text-foreground"
          >
            <LayoutGrid className="size-4 text-primary" aria-hidden="true" />
            <span>All Projects</span>
          </Link>
        </div>

        {/* Next Project */}
        <div className="flex justify-end">
          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="group flex flex-col items-end gap-1 rounded-card border border-border/70 bg-card/60 p-4 text-right transition-[border-color,background-color,transform] hover:border-primary/40 hover:bg-secondary motion-safe:hover:translate-x-0.5 sm:max-w-xs"
              aria-label={`Next project: ${next.title}`}
            >
              <span className="inline-flex items-center gap-1.5 text-caption font-medium text-muted-foreground group-hover:text-primary">
                Next Project
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
              <span className="text-label font-semibold text-foreground truncate max-w-[200px]">
                {next.title}
              </span>
            </Link>
          ) : (
            <div aria-hidden="true" className="hidden sm:block" />
          )}
        </div>
      </div>
    </nav>
  );
}

