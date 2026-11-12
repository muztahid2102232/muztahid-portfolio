"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

const emptySubscribe = () => () => {};

/**
 * Premium, minimal theme toggle switching between dark and light themes.
 *
 * Built on `next-themes` with smooth micro-interactions, full keyboard
 * accessibility, and zero-hydration-mismatch safety using `useSyncExternalStore`.
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const isDark = mounted ? resolvedTheme === "dark" : true;
  const targetTheme = isDark ? "light" : "dark";
  const ariaLabel = `Switch to ${targetTheme} theme`;

  return (
    <button
      type="button"
      onClick={() => setTheme(targetTheme)}
      aria-label={ariaLabel}
      title={ariaLabel}
      className={cn(
        "group relative inline-flex size-10 items-center justify-center rounded-control border border-border bg-card/60 text-foreground shadow-sm transition-[border-color,background-color,transform] duration-200",
        "hover:border-primary/40 hover:bg-secondary hover:text-foreground active:scale-95",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        className,
      )}
    >
      <span className="relative flex size-4.5 items-center justify-center">
        {/* Sun Icon (shown in dark mode to switch to light) */}
        <Sun
          className={cn(
            "size-4.5 transition-all duration-300 motion-reduce:transition-none",
            isDark
              ? "rotate-0 scale-100 opacity-100 text-amber-400"
              : "-rotate-90 scale-0 opacity-0 text-muted-foreground",
          )}
          aria-hidden="true"
        />

        {/* Moon Icon (shown in light mode to switch to dark) */}
        <Moon
          className={cn(
            "absolute inset-0 size-4.5 transition-all duration-300 motion-reduce:transition-none",
            isDark
              ? "rotate-90 scale-0 opacity-0 text-muted-foreground"
              : "rotate-0 scale-100 opacity-100 text-primary",
          )}
          aria-hidden="true"
        />
      </span>

      <span className="sr-only">{ariaLabel}</span>
    </button>
  );
}
