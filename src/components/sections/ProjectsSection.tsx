import { Container } from "@/components/shared/container";
import { getFeaturedProjects, projectsContent } from "@/data/projects";
import { publicAssetExists } from "@/lib/public-assets";

import { ProjectReveal } from "./projects/project-reveal";
import { ProjectsGrid, type ProjectWithAsset } from "./projects/projects-grid";

export function ProjectsSection() {
  const featuredProjects = getFeaturedProjects();

  const items: ProjectWithAsset[] = featuredProjects.map((project) => ({
    project,
    hasImage: project.image ? publicAssetExists(project.image) : false,
  }));

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="relative isolate scroll-mt-16 overflow-hidden border-t border-border/60 section-y"
    >
      {/* Ambient background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div
          className="absolute top-1/4 -right-48 size-[32rem] rounded-full opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, color-mix(in oklab, var(--primary) 10%, transparent), transparent 68%)",
          }}
        />
        <div
          className="absolute -left-48 bottom-1/4 size-[30rem] rounded-full opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, color-mix(in oklab, var(--accent-foreground) 10%, transparent), transparent 70%)",
          }}
        />
      </div>

      <Container>
        {/* Section Header */}
        <div className="max-w-2xl">
          <ProjectReveal>
            <p className="inline-flex items-center gap-3 text-caption font-semibold tracking-[0.22em] text-primary uppercase">
              <span aria-hidden="true" className="h-px w-8 bg-primary/50" />
              {projectsContent.eyebrow}
            </p>
          </ProjectReveal>

          <ProjectReveal delay={0.05}>
            <h2 id="projects-title" className="mt-4 text-heading-1">
              {projectsContent.heading}
            </h2>
          </ProjectReveal>

          <ProjectReveal delay={0.1}>
            <p className="mt-5 text-body-lg text-muted-foreground">
              {projectsContent.introduction}
            </p>
          </ProjectReveal>
        </div>

        {/* Project Cards Grid */}
        <div className="mt-12 sm:mt-16">
          <ProjectsGrid items={items} />
        </div>
      </Container>
    </section>
  );
}

