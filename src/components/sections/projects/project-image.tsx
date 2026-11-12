"use client";

import { Code2, ImagePlus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

interface ProjectImageProps {
  src?: string;
  alt: string;
  title: string;
  slug: string;
  hasImage: boolean;
  priority?: boolean;
  className?: string;
}

/**
 * Derives a 2-letter uppercase monogram from the project title.
 * e.g. "Fit Log" -> "FL", "Bazar Dor" -> "BD".
 */
function getProjectMonogram(title: string): string {
  const words = title.trim().split(/\s+/);
  if (words.length >= 2) {
    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  }
  return title.slice(0, 2).toUpperCase();
}

/**
 * Project thumbnail container with automatic fallback.
 *
 * When the image exists in `public/images/projects/`, Next.js `Image` is rendered.
 * If the image is not yet available, a clean developer-themed placeholder is shown
 * that clearly indicates the asset path for future replacement without producing 404s.
 */
export function ProjectImage({
  src,
  alt,
  title,
  hasImage,
  priority = false,
  className,
}: ProjectImageProps) {
  const [loadFailed, setLoadFailed] = useState(false);
  const monogram = getProjectMonogram(title);
  const shouldRenderImage = Boolean(hasImage && src && !loadFailed);

  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden bg-muted/40",
        className,
      )}
    >
      {shouldRenderImage ? (
        <Image
          src={src!}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 36rem, (min-width: 768px) 50vw, 100vw"
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
          onError={() => setLoadFailed(true)}
        />
      ) : (
        <ProjectPlaceholder
          title={title}
          monogram={monogram}
          assetPath={src ?? `/images/projects/${title.toLowerCase().replace(/\s+/g, "-")}.png`}
        />
      )}

      {/* Subtle border glow & top accent line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 ring-1 ring-border/50 ring-inset"
      />
    </div>
  );
}

function ProjectPlaceholder({
  title,
  monogram,
  assetPath,
}: {
  title: string;
  monogram: string;
  assetPath: string;
}) {
  return (
    <div
      role="img"
      aria-label={`${title} preview placeholder`}
      className="relative flex size-full flex-col items-center justify-center p-6 text-center select-none"
    >
      {/* Subtle background grid pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent)",
        }}
      />

      {/* Center monogram badge */}
      <div
        aria-hidden="true"
        className="relative flex size-14 items-center justify-center rounded-control border border-primary/25 bg-card/90 shadow-sm backdrop-blur transition-transform duration-300 group-hover:scale-105 sm:size-16"
      >
        <span
          className="bg-clip-text font-mono text-xl font-bold tracking-tight text-transparent sm:text-2xl"
          style={{
            backgroundImage:
              "linear-gradient(135deg, var(--primary), var(--accent-foreground))",
          }}
        >
          {monogram}
        </span>
        <span
          aria-hidden="true"
          className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full border border-border bg-secondary text-primary"
        >
          <Code2 className="size-2.5" />
        </span>
      </div>

      <div className="relative mt-3.5 max-w-xs">
        <p className="inline-flex items-center gap-1.5 text-caption font-medium text-foreground">
          <ImagePlus aria-hidden="true" className="size-3.5 text-primary" />
          Preview coming soon
        </p>
        <p className="mt-1 font-mono text-[0.625rem] text-muted-foreground/75 truncate">
          {assetPath}
        </p>
      </div>
    </div>
  );
}

