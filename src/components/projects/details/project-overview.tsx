import type { Project } from "@/types/project";

interface ProjectOverviewProps {
  project: Project;
}

export function ProjectOverview({ project }: ProjectOverviewProps) {
  const content = project.overview ?? project.description;

  return (
    <section aria-labelledby="project-overview-title" className="space-y-4">
      <h2
        id="project-overview-title"
        className="text-heading-2 font-semibold text-foreground"
      >
        Project Overview
      </h2>

      <div className="prose prose-invert max-w-none text-body-lg text-muted-foreground leading-relaxed">
        <p>{content}</p>

        {project.details && project.details.length > 0 && (
          <div className="mt-4 space-y-4">
            {project.details.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

