import { ExternalLink } from "lucide-react";

import { SocialIcon } from "@/components/icons/social-icons";
import type { Project } from "@/types/project";

interface ProjectDetailsHeaderProps {
  project: Project;
}

export function ProjectDetailsHeader({ project }: ProjectDetailsHeaderProps) {
  const repoUrl = project.githubUrl ?? project.repositoryUrl;
  const hasLiveUrl = Boolean(project.liveUrl && project.liveUrl.startsWith("http"));
  const hasRepoUrl = Boolean(repoUrl && repoUrl.startsWith("http"));

  return (
    <header className="space-y-6">
      {/* Optional Status Pill */}
      {project.status && (
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-pill border border-primary/20 bg-primary/10 px-3 py-1 text-caption font-medium text-primary">
            <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
            {project.status}
          </span>
        </div>
      )}

      {/* Title */}
      <h1 className="text-display font-semibold tracking-tight text-foreground sm:text-heading-1">
        {project.title}
      </h1>

      {/* Description */}
      <p className="max-w-3xl text-body-lg text-muted-foreground leading-relaxed">
        {project.description}
      </p>

      {/* Technology Tags & Real Actions */}
      <div className="flex flex-col gap-5 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center rounded-pill border border-border bg-secondary/80 px-3 py-1 text-label font-medium text-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Real Action Buttons (only rendered if URLs exist) */}
        {(hasLiveUrl || hasRepoUrl) && (
          <div className="flex flex-wrap items-center gap-3">
            {hasLiveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-control bg-primary px-5 text-label font-semibold text-primary-foreground shadow-glow transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-primary/90"
              >
                <span>Live Demo</span>
                <ExternalLink
                  aria-hidden="true"
                  className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            )}

            {hasRepoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-control border border-border bg-card/80 px-5 text-label font-semibold text-foreground shadow-sm transition-[transform,background-color,border-color] duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-secondary"
              >
                <SocialIcon name="github" className="size-4" />
                <span>Source Code</span>
              </a>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

