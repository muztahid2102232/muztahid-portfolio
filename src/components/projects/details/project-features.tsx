import { CheckCircle2 } from "lucide-react";

import type { Project } from "@/types/project";

interface ProjectFeaturesProps {
  project: Project;
}

export function ProjectFeatures({ project }: ProjectFeaturesProps) {
  // Hide the entire section when no confirmed features exist
  if (!project.features || project.features.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="project-features-title" className="space-y-6">
      <div>
        <h2
          id="project-features-title"
          className="text-heading-2 font-semibold text-foreground"
        >
          Key Features
        </h2>
        <p className="mt-2 text-body text-muted-foreground">
          Core capabilities and key highlights of this application.
        </p>
      </div>

      <ul className="grid gap-3.5 sm:grid-cols-2">
        {project.features.map((feature, index) => (
          <li
            key={index}
            className="flex items-start gap-3 rounded-card border border-border bg-card/60 p-4 shadow-sm"
          >
            <span
              aria-hidden="true"
              className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
            >
              <CheckCircle2 className="size-3.5" />
            </span>
            <span className="text-body text-foreground">{feature}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

