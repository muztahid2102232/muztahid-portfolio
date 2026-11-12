import { ProjectImage } from "@/components/sections/projects/project-image";
import type { Project } from "@/types/project";

interface ProjectPreviewProps {
  project: Project;
  hasImage: boolean;
}

export function ProjectPreview({ project, hasImage }: ProjectPreviewProps) {
  return (
    <div className="overflow-hidden rounded-panel border border-border bg-card/60 shadow-card">
      {/* Decorative window header */}
      <div className="flex items-center gap-1.5 border-b border-border/70 bg-muted/40 px-4 py-3">
        <span className="size-2.5 rounded-full bg-rose-400/80" />
        <span className="size-2.5 rounded-full bg-amber-400/80" />
        <span className="size-2.5 rounded-full bg-emerald-400/80" />
        <span className="ml-2 font-mono text-[0.6875rem] text-muted-foreground truncate">
          {project.slug}.preview
        </span>
      </div>

      <div className="relative">
        <ProjectImage
          src={project.image}
          alt={`${project.title} main preview`}
          title={project.title}
          slug={project.slug}
          hasImage={hasImage}
          priority
          className="aspect-video w-full"
        />
      </div>
    </div>
  );
}

