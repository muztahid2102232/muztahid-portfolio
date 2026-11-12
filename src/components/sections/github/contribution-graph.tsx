"use client";

import { useMemo, useState } from "react";

import type {
  ContributionLevel,
  GitHubContributionCalendar,
} from "@/types/github";

interface ContributionGraphProps {
  calendar: GitHubContributionCalendar;
}

const levelClasses: Record<ContributionLevel, string> = {
  0: "bg-muted/70 dark:bg-muted/30 border border-border/40",
  1: "bg-primary/30 border border-primary/35",
  2: "bg-primary/55 border border-primary/60",
  3: "bg-primary/80 border border-primary/85",
  4: "bg-primary border border-primary",
};

const dayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];

/**
 * Parses a `YYYY-MM-DD` calendar date as a local date. Passing the raw string
 * to `new Date()` treats it as UTC, which can shift the day (and month label)
 * for visitors in negative UTC offsets.
 */
function parseCalendarDate(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function ContributionGraph({ calendar }: ContributionGraphProps) {
  const [activeDay, setActiveDay] = useState<{
    date: string;
    count: number;
  } | null>(null);

  // Derive month positions across the weeks
  const monthLabels = useMemo(() => {
    const labels: Array<{ weekIndex: number; label: string }> = [];
    let lastMonth = "";

    calendar.weeks.forEach((week, weekIndex) => {
      const firstDay = week.days[0];
      if (firstDay) {
        const month = parseCalendarDate(firstDay.date).toLocaleString("en-US", {
          month: "short",
        });
        if (month !== lastMonth) {
          labels.push({ weekIndex, label: month });
          lastMonth = month;
        }
      }
    });

    return labels;
  }, [calendar.weeks]);

  return (
    <div className="rounded-panel border border-border bg-card/60 p-5 sm:p-6 shadow-card">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-4">
        <div>
          <h3 className="text-heading-3 font-semibold text-foreground">
            Contribution Activity
          </h3>
          <p className="text-caption text-muted-foreground">
            Coding contributions over the past year
          </p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-pill border border-border bg-secondary/80 px-3 py-1 font-mono text-caption text-foreground">
          <span className="font-semibold text-primary">
            {calendar.totalContributions.toLocaleString()}
          </span>
          <span>contributions in the last year</span>
        </div>
      </div>

      {/* Graph Area with horizontal scroll for mobile safety */}
      <div className="mt-5 overflow-x-auto pb-3">
        <div className="min-w-[720px] select-none">
          {/* Months header row */}
          <div className="relative mb-2 flex h-5 text-caption font-medium text-muted-foreground/80 pl-8">
            {monthLabels.map(({ weekIndex, label }) => (
              <span
                key={`${weekIndex}-${label}`}
                className="absolute"
                style={{ left: `calc(2rem + ${weekIndex * 13.5}px)` }}
              >
                {label}
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            {/* Days of week column */}
            <div className="flex flex-col justify-between py-0.5 text-[0.625rem] font-medium text-muted-foreground/60 w-6 shrink-0">
              {dayLabels.map((label, idx) => (
                <span key={idx} className="h-2.5 leading-[10px]">
                  {label}
                </span>
              ))}
            </div>

            {/* Weeks columns */}
            <div className="flex gap-[3.5px]">
              {calendar.weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-[3.5px]">
                  {week.days.map((day) => {
                    const formattedDate = parseCalendarDate(
                      day.date,
                    ).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });

                    const tooltipText = `${day.count} contribution${
                      day.count === 1 ? "" : "s"
                    } on ${formattedDate}`;

                    return (
                      <button
                        key={day.date}
                        type="button"
                        aria-label={tooltipText}
                        title={tooltipText}
                        onMouseEnter={() =>
                          setActiveDay({
                            date: formattedDate,
                            count: day.count,
                          })
                        }
                        onFocus={() =>
                          setActiveDay({
                            date: formattedDate,
                            count: day.count,
                          })
                        }
                        className={`size-2.5 rounded-[2px] transition-[transform,opacity] duration-150 hover:scale-125 hover:z-10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary ${
                          levelClasses[day.level]
                        }`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer / Legend / Active Day display */}
      <div className="mt-4 flex flex-col gap-3 border-t border-border/60 pt-4 sm:flex-row sm:items-center sm:justify-between text-caption text-muted-foreground">
        <div>
          {activeDay ? (
            <span className="font-medium text-foreground">
              <strong className="text-primary">{activeDay.count}</strong> contribution
              {activeDay.count === 1 ? "" : "s"} on {activeDay.date}
            </span>
          ) : (
            <span>Hover or focus a square to see daily details</span>
          )}
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span>Less</span>
          <div className="flex gap-1" aria-hidden="true">
            {([0, 1, 2, 3, 4] as ContributionLevel[]).map((level) => (
              <span
                key={level}
                className={`size-2.5 rounded-[2px] ${levelClasses[level]}`}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

