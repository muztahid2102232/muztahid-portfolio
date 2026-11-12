import {
  siBootstrap,
  siCss,
  siExpress,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siReact,
  siShadcnui,
  siTailwindcss,
  siTypescript,
} from "simple-icons";

import { SkillReveal } from "@/components/sections/skills/skill-reveal";
import { SkillsMarqueeBoard } from "@/components/sections/skills/skills-marquee-board";
import { Container } from "@/components/shared/container";
import { getSkillsForRow, skillRows, skillsContent } from "@/data/skills";
import type {
  SkillIconName,
  SkillMarqueeRowData,
} from "@/types/skill";

/**
 * Official Simple Icons path data, resolved on the server. Only path strings
 * travel to the client, keeping `simple-icons` out of the browser bundle.
 *
 * Visual Studio Code is no longer included in simple-icons v16, so its official
 * Simple Icons v11 path (CC0 1.0) is kept locally instead of substituting an
 * unrelated icon.
 */
const visualStudioCodePath =
  "M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z";

const iconPaths: Record<SkillIconName, string> = {
  html: siHtml5.path,
  css: siCss.path,
  javascript: siJavascript.path,
  react: siReact.path,
  nextjs: siNextdotjs.path,
  tailwind: siTailwindcss.path,
  bootstrap: siBootstrap.path,
  shadcn: siShadcnui.path,
  node: siNodedotjs.path,
  express: siExpress.path,
  mongodb: siMongodb.path,
  typescript: siTypescript.path,
  git: siGit.path,
  github: siGithub.path,
  vscode: visualStudioCodePath,
};

const marqueeRows: SkillMarqueeRowData[] = skillRows.map((row) => ({
  id: row.id,
  label: row.label,
  direction: row.direction,
  durationSeconds: row.durationSeconds,
  items: getSkillsForRow(row).map((skill) => ({
    name: skill.name,
    path: iconPaths[skill.icon],
    accentClassName: skill.accentClassName,
  })),
}));

export function SkillsSection() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="relative isolate scroll-mt-16 overflow-hidden border-t border-border/60 section-y"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div
          className="absolute top-0 -right-40 size-[30rem] rounded-full opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, color-mix(in oklab, var(--primary) 10%, transparent), transparent 68%)",
          }}
        />
        <div
          className="absolute -bottom-24 -left-40 size-[28rem] rounded-full opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, color-mix(in oklab, var(--accent-foreground) 10%, transparent), transparent 70%)",
          }}
        />
      </div>

      <Container>
        <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-end md:gap-10">
          <SkillReveal>
            <div>
              <p className="inline-flex items-center gap-3 text-caption font-semibold tracking-[0.22em] text-primary uppercase">
                <span
                  aria-hidden="true"
                  className="h-px w-8 bg-primary/50"
                />
                {skillsContent.eyebrow}
              </p>
              <h2 id="skills-title" className="mt-4 text-heading-1">
                {skillsContent.heading}
              </h2>
            </div>
          </SkillReveal>

          <SkillReveal delay={0.08}>
            <p className="max-w-xl text-body text-muted-foreground md:justify-self-end md:text-right">
              {skillsContent.introduction}
            </p>
          </SkillReveal>
        </div>

        <div className="mt-10 sm:mt-12">
          <SkillsMarqueeBoard
            rows={marqueeRows}
            pauseHint={skillsContent.pauseHint}
          />
        </div>
      </Container>
    </section>
  );
}
