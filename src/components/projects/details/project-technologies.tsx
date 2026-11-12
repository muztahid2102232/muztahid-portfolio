import { Code2 } from "lucide-react";
import {
  siDaisyui,
  siExpress,
  siGithub,
  siJavascript,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siReact,
  siTailwindcss,
  siTypescript,
  siVite,
} from "simple-icons";

import { TechIcon } from "@/components/icons/tech-icons";
import type { Project } from "@/types/project";

const knownTechIcons: Record<string, string> = {
  "Next.js": siNextdotjs.path,
  "Next.js App Router": siNextdotjs.path,
  React: siReact.path,
  "React.js": siReact.path,
  "Tailwind CSS": siTailwindcss.path,
  TypeScript: siTypescript.path,
  JavaScript: siJavascript.path,
  "Node.js": siNodedotjs.path,
  "Express.js": siExpress.path,
  MongoDB: siMongodb.path,
  "Git & GitHub": siGithub.path,
  DaisyUI: siDaisyui.path,
  Vite: siVite.path,
};

interface ProjectTechnologiesProps {
  project: Project;
}

export function ProjectTechnologies({ project }: ProjectTechnologiesProps) {
  return (
    <section aria-labelledby="project-technologies-title" className="space-y-6">
      <div>
        <h2
          id="project-technologies-title"
          className="text-heading-2 font-semibold text-foreground"
        >
          Technologies & Tools
        </h2>
        <p className="mt-2 text-body text-muted-foreground">
          Core tech stack and libraries utilized in this project.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {project.technologies.map((tech) => {
          const iconPath = knownTechIcons[tech];

          return (
            <div
              key={tech}
              className="flex items-center gap-2.5 rounded-pill border border-border bg-card/80 py-2 pr-4 pl-3 shadow-sm transition-[border-color,background-color] hover:border-primary/40 hover:bg-secondary"
            >
              <span
                aria-hidden="true"
                className="flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary text-primary"
              >
                {iconPath ? (
                  <TechIcon path={iconPath} className="size-3.5" />
                ) : (
                  <Code2 className="size-3.5" />
                )}
              </span>
              <span className="text-label font-medium text-foreground">
                {tech}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

