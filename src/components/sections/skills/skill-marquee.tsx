import type { CSSProperties } from "react";

import { TechIcon } from "@/components/icons/tech-icons";
import { cn } from "@/lib/utils";
import type { SkillMarqueeItem } from "@/types/skill";

interface SkillMarqueeProps {
  label: string;
  items: SkillMarqueeItem[];
  direction: "left" | "right";
  durationSeconds: number;
}

interface SkillItemProps {
  item: SkillMarqueeItem;
}

function SkillItem({ item }: SkillItemProps) {
  return (
    <div className="flex items-center gap-2.5 rounded-pill border border-border bg-background/70 py-2 pr-4 pl-2.5 shadow-sm transition-[transform,border-color,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card hover:shadow-glow motion-reduce:hover:transform-none">
      <span
        aria-hidden="true"
        className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted/70 ring-1 ring-border/60 ring-inset transition-colors duration-300 group-hover/skill:bg-primary/10"
      >
        <TechIcon path={item.path} className={cn("size-4", item.accentClassName)} />
      </span>
      <span className="text-label font-medium whitespace-nowrap text-foreground">
        {item.name}
      </span>
    </div>
  );
}

/**
 * One seamless horizontal marquee strip.
 *
 * The item sequence is rendered several times and the track slides by exactly
 * one copy. Because every copy is identical, the loop point is invisible. All
 * copies after the first are hidden from assistive technology, so screen
 * readers hear each technology once.
 */
export function SkillMarquee({
  label,
  items,
  direction,
  durationSeconds,
}: SkillMarqueeProps) {
  // Short rows need more copies to keep the strip wider than the viewport.
  const copies = items.length <= 3 ? 4 : 3;
  const shift = -(100 / copies);

  const style = {
    "--marquee-duration": `${durationSeconds}s`,
    "--marquee-shift": `${shift}%`,
    "--marquee-direction": direction === "right" ? "reverse" : "normal",
  } as CSSProperties;

  return (
    <div
      role="group"
      aria-label={`${label} technologies`}
      className="skill-marquee py-1.5"
    >
      <div className="skill-marquee-track flex w-max" style={style}>
        {Array.from({ length: copies }, (_, copyIndex) => {
          const isClone = copyIndex > 0;

          return (
            <ul
              key={copyIndex}
              data-clone={isClone ? "true" : undefined}
              aria-hidden={isClone || undefined}
              className="skill-marquee-group flex shrink-0 items-center gap-3 pr-3"
            >
              {items.map((item) => (
                <li key={item.name} className="group/skill">
                  <SkillItem item={item} />
                </li>
              ))}
            </ul>
          );
        })}
      </div>
    </div>
  );
}
