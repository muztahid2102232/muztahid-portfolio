type ClassValue = string | number | false | null | undefined;

/**
 * Joins conditional class names without pulling in an extra dependency.
 */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
