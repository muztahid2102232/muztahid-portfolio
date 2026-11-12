"use client";

import { ArrowUpRight, Eye } from "lucide-react";
import Link from "next/link";

import type { Project } from "@/types/project";

import { ProjectImage } from "./project-image";

interface ProjectCardProps {
  project: Project;
  hasImage: boolean;
  onQuickView: (project: Project) => void;
}

export function ProjectCard({
  project,
  hasImage,
  onQuickView,
}: ProjectCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-card border border-border bg-card/70 shadow-card transition-[transform,border-color,box-shadow,background-color] duration-300 hover:border-primary/40 hover:bg-card hover:shadow-glow motion-safe:hover:-translate-y-1">
      {/* Clickable Image Container triggering Quick View */}
      <button
        type="button"
        onClick={() => onQuickView(project)}
        aria-label={`Quick view ${project.title}`}
        className="relative block w-full cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <ProjectImage
          src={project.image}
          alt={`${project.title} screenshot`}
          title={project.title}
          slug={project.slug}
          hasImage={hasImage}
        />

        {/* Hover overlay hint */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center bg-background/50 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100"
        >
          <span className="inline-flex items-center gap-2 rounded-pill border border-border bg-card/90 px-3.5 py-1.5 text-label font-medium text-foreground shadow-sm">
            <Eye className="size-4 text-primary" />
            Quick View
          </span>
        </div>
      </button>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center rounded-pill border border-border/80 bg-secondary/70 px-2.5 py-0.5 text-caption font-medium text-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="mt-4 text-heading-3 text-foreground transition-colors group-hover:text-primary">
          {project.title}
        </h3>

        {/* Description */}
        <p className="mt-2.5 line-clamp-2 text-body text-muted-foreground flex-1">
          {project.description}
        </p>

        {/* Card Footer Actions */}
        <div className="mt-6 flex items-center justify-between gap-3 border-t border-border/60 pt-4">
          <button
            type="button"
            onClick={() => onQuickView(project)}
            aria-label={`Quick view ${project.title}`}
            className="inline-flex items-center gap-1.5 rounded-control border border-border bg-card/80 px-3 py-1.5 text-label font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-secondary hover:text-foreground"
          >
            <Eye className="size-3.5 text-primary" aria-hidden="true" />
            Quick View
          </button>

          <Link
            href={`/projects/${project.slug}`}
            className="group/link inline-flex items-center gap-1.5 text-label font-semibold text-primary transition-colors hover:text-accent-foreground"
            aria-label={`View details for ${project.title}`}
          >
            <span>Details</span>
            <ArrowUpRight
              className="size-4 transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}

