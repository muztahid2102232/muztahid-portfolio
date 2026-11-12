"use client";

import { useState } from "react";

import type { Project } from "@/types/project";

import { ProjectCard } from "./project-card";
import { ProjectModal } from "./project-modal";
import { ProjectReveal } from "./project-reveal";

export interface ProjectWithAsset {
  project: Project;
  hasImage: boolean;
}

interface ProjectsGridProps {
  items: ProjectWithAsset[];
}

export function ProjectsGrid({ items }: ProjectsGridProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const selectedItem = items.find(
    (item) => item.project.slug === selectedProject?.slug,
  );

  return (
    <>
      <div className="grid gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">
        {items.map(({ project, hasImage }, index) => (
          <ProjectReveal key={project.slug} delay={index * 0.1} className="h-full">
            <ProjectCard
              project={project}
              hasImage={hasImage}
              onQuickView={(p) => setSelectedProject(p)}
            />
          </ProjectReveal>
        ))}
      </div>

      <ProjectModal
        project={selectedProject}
        hasImage={selectedItem?.hasImage ?? false}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}

