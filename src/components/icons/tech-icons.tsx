interface TechIconProps {
  path: string;
  className?: string;
}

/**
 * Renders official brand path data from the `simple-icons` package.
 * Icons are always decorative here; the technology name is exposed by the
 * surrounding list item.
 */
export function TechIcon({ path, className }: TechIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d={path} />
    </svg>
  );
}
