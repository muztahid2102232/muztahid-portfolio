import Link from "next/link";

import { siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  onClick?: () => void;
}

export function Logo({ className, onClick }: LogoProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label={`${siteConfig.name} — home`}
      className={cn(
        "group inline-flex shrink-0 items-center gap-2 rounded-control py-1",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="font-mono text-body font-semibold tracking-tight text-primary transition-[color,transform] group-hover:-translate-y-0.5 group-hover:text-accent-foreground"
      >
        {"</>"}
      </span>
      <span className="relative text-label font-semibold tracking-[0.14em] text-foreground sm:text-body">
        MH
        <span
          aria-hidden="true"
          className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-primary transition-transform group-hover:scale-x-100"
        />
      </span>
    </Link>
  );
}
