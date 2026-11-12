import type { Skill, SkillRow } from "@/types/skill";

export const skillsContent = {
  eyebrow: "What I work with",
  heading: "Technical Skills",
  introduction:
    "Here are the technologies and tools I'm learning and using to build modern web applications. I'm continuously expanding my knowledge and improving my development skills through hands-on practice.",
  pauseHint: "Hover a row to pause, or use the pause button above.",
} as const;

/**
 * Central technology registry.
 *
 * Each technology is declared once. JavaScript lists two categories so it can
 * appear in both the frontend and programming-language rows without duplicating
 * the record.
 */
export const skills: readonly Skill[] = [
  {
    name: "HTML",
    categories: ["frontend"],
    icon: "html",
    accentClassName: "text-[#c2410c] dark:text-[#f97316]",
  },
  {
    name: "CSS",
    categories: ["frontend"],
    icon: "css",
    accentClassName: "text-[#0369a1] dark:text-[#38bdf8]",
  },
  {
    name: "JavaScript",
    categories: ["frontend", "language"],
    icon: "javascript",
    accentClassName: "text-[#a88900] dark:text-[#f7df1e]",
  },
  {
    name: "React.js",
    categories: ["frontend"],
    icon: "react",
    accentClassName: "text-[#087ea4] dark:text-[#61dafb]",
  },
  {
    name: "Next.js",
    categories: ["frontend"],
    icon: "nextjs",
    accentClassName: "text-foreground",
  },
  {
    name: "Tailwind CSS",
    categories: ["styling"],
    icon: "tailwind",
    accentClassName: "text-[#0e7490] dark:text-[#22d3ee]",
  },
  {
    name: "Bootstrap",
    categories: ["styling"],
    icon: "bootstrap",
    accentClassName: "text-[#6d28d9] dark:text-[#a78bfa]",
  },
  {
    name: "shadcn/ui",
    categories: ["styling"],
    icon: "shadcn",
    accentClassName: "text-foreground",
  },
  {
    name: "Node.js",
    categories: ["backend"],
    icon: "node",
    accentClassName: "text-[#3f8b3b] dark:text-[#5fa04e]",
  },
  {
    name: "Express.js",
    categories: ["backend"],
    icon: "express",
    accentClassName: "text-foreground",
  },
  {
    name: "MongoDB",
    categories: ["database"],
    icon: "mongodb",
    accentClassName: "text-[#3f7d20] dark:text-[#4ade80]",
  },
  {
    name: "TypeScript",
    categories: ["language"],
    icon: "typescript",
    accentClassName: "text-[#3178c6] dark:text-[#6aa9e9]",
  },
  {
    name: "Git",
    categories: ["tools"],
    icon: "git",
    accentClassName: "text-[#c2410c] dark:text-[#fb923c]",
  },
  {
    name: "GitHub",
    categories: ["tools"],
    icon: "github",
    accentClassName: "text-foreground",
  },
  {
    name: "Visual Studio Code",
    categories: ["tools"],
    icon: "vscode",
    accentClassName: "text-[#0369a1] dark:text-[#38bdf8]",
  },
];

/**
 * Marquee rows. Categories are combined where a dedicated row would only
 * contain one or two items, keeping the strips visually balanced.
 */
export const skillRows: readonly SkillRow[] = [
  {
    id: "frontend",
    label: "Frontend Development",
    categories: ["frontend"],
    direction: "left",
    durationSeconds: 34,
  },
  {
    id: "styling",
    label: "Styling & UI",
    categories: ["styling"],
    direction: "right",
    durationSeconds: 30,
  },
  {
    id: "backend",
    label: "Backend & Database",
    categories: ["backend", "database"],
    direction: "left",
    durationSeconds: 38,
  },
  {
    id: "tools",
    label: "Languages & Tools",
    categories: ["language", "tools"],
    direction: "right",
    durationSeconds: 32,
  },
];

/** Returns the technologies belonging to a row, in registry order. */
export function getSkillsForRow(row: SkillRow): Skill[] {
  return skills.filter((skill) =>
    row.categories.some((category) => skill.categories.includes(category)),
  );
}
