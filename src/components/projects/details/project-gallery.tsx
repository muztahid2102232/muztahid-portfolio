import { ExternalLink } from "lucide-react";
import Image from "next/image";

import type { Project } from "@/types/project";

interface ProjectGalleryProps {
  project: Project;
}

export function ProjectGallery({ project }: ProjectGalleryProps) {
  const screenshots = project.screenshots ?? project.gallery ?? [];
  const isSingleScreenshot = screenshots.length === 1;

  // Hide the gallery completely when no additional screenshots exist
  if (screenshots.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="project-gallery-title" className="space-y-6">
      <div>
        <h2
          id="project-gallery-title"
          className="text-heading-2 font-semibold text-foreground"
        >
          Screenshots &amp; Interface
        </h2>
        <p className="mt-2 text-body text-muted-foreground">
          Visual preview of key screens and workflows.
        </p>
      </div>

      {isSingleScreenshot ? (
        <figure className="overflow-hidden rounded-panel border border-border bg-card/60 shadow-card">
          <div
            role="region"
            aria-label={`${project.title} full-page screenshot preview`}
            tabIndex={0}
            className="max-h-[70vh] overflow-y-auto bg-muted/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
          >
            <Image
              src={screenshots[0]}
              alt={`${project.title} full-page screenshot`}
              width={project.imageWidth ?? 1600}
              height={project.imageHeight ?? 1000}
              sizes="(min-width: 1024px) 56rem, 100vw"
              className="h-auto w-full"
            />
          </div>
          <figcaption className="flex flex-col gap-2 border-t border-border/70 px-4 py-3 text-caption text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span>
              Full-page preview. Scroll inside the frame to explore every
              section.
            </span>
            <a
              href={screenshots[0]}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-primary transition-colors hover:text-accent-foreground"
            >
              Open full screenshot
              <ExternalLink className="size-3.5" aria-hidden="true" />
            </a>
          </figcaption>
        </figure>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {screenshots.map((src, index) => (
            <div
              key={src}
              className="group relative aspect-video overflow-hidden rounded-card border border-border bg-card shadow-card"
            >
              <Image
                src={src}
                alt={`${project.title} screenshot ${index + 1}`}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 ring-1 ring-border/50 ring-inset"
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
