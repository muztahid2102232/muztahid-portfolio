/**
 * Skill category identifiers used by both the data file and presentation.
 *
 * These mirror the groups requested for the Technical Skills section. A single
 * technology can belong to more than one category (JavaScript is both a
 * frontend technology and a programming language), so the field is an array.
 */
export type SkillCategory =
  | "frontend"
  | "styling"
  | "backend"
  | "database"
  | "language"
  | "tools";

/** Brand icons resolved from `simple-icons` on the server. */
export type SkillIconName =
  | "html"
  | "css"
  | "javascript"
  | "react"
  | "nextjs"
  | "tailwind"
  | "bootstrap"
  | "shadcn"
  | "node"
  | "express"
  | "mongodb"
  | "typescript"
  | "git"
  | "github"
  | "vscode";

export interface Skill {
  name: string;
  categories: readonly SkillCategory[];
  icon: SkillIconName;
  /** Brand tint for the icon, tuned separately for light and dark themes. */
  accentClassName: string;
}

export type SkillRowId = "frontend" | "styling" | "backend" | "tools";

export interface SkillRow {
  id: SkillRowId;
  label: string;
  categories: readonly SkillCategory[];
  direction: "left" | "right";
  /** Seconds for one full copy of the item sequence to pass by. */
  durationSeconds: number;
}

/**
 * A skill paired with resolved icon path data. This is the only shape that
 * crosses into the marquee components, so `simple-icons` never reaches the
 * browser bundle.
 */
export interface SkillMarqueeItem {
  name: string;
  path: string;
  accentClassName: string;
}

/** A fully resolved marquee row passed from the server section to the client board. */
export interface SkillMarqueeRowData {
  id: SkillRowId;
  label: string;
  direction: "left" | "right";
  durationSeconds: number;
  items: SkillMarqueeItem[];
}
