"use client";

import { ArrowRight, ExternalLink, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";

import { SocialIcon } from "@/components/icons/social-icons";
import type { Project } from "@/types/project";

import { ProjectImage } from "./project-image";

interface ProjectModalProps {
  project: Project | null;
  hasImage: boolean;
  onClose: () => void;
}

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function ProjectModal({ project, hasImage, onClose }: ProjectModalProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Close when pressing Escape
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!project) return;

    window.addEventListener("keydown", handleKeyDown);

    // Prevent background scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Set initial focus to close button
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      clearTimeout(timer);
    };
  }, [project, handleKeyDown]);

  return (
    <AnimatePresence>
      {project && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="quickview-title"
          aria-describedby="quickview-description"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
          />

          {/* Dialog Container */}
          <motion.div
            ref={modalRef}
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.95, y: 16 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.96, y: 12 }
            }
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.25, ease: EASE_OUT }
            }
            className="relative z-10 flex max-h-[90dvh] w-full max-w-2xl flex-col overflow-hidden rounded-panel border border-border bg-card shadow-card"
          >
            {/* Header with title & close button */}
            <div className="flex items-center justify-between border-b border-border/70 px-5 py-4 sm:px-6">
              <div className="flex items-center gap-2">
                <span className="text-caption font-semibold tracking-wider text-primary uppercase">
                  Quick View
                </span>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="inline-flex size-9 items-center justify-center rounded-control border border-border bg-card/60 text-muted-foreground transition-colors hover:border-primary/40 hover:bg-secondary hover:text-foreground"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="overflow-y-auto p-5 sm:p-6">
              {/* Thumbnail / Placeholder */}
              <div className="overflow-hidden rounded-card border border-border/70">
                <ProjectImage
                  src={project.image}
                  alt={`${project.title} preview`}
                  title={project.title}
                  slug={project.slug}
                  hasImage={hasImage}
                  priority
                />
              </div>

              {/* Title & Description */}
              <div className="mt-5">
                <h3 id="quickview-title" className="text-heading-2">
                  {project.title}
                </h3>
                <p
                  id="quickview-description"
                  className="mt-3 text-body text-muted-foreground"
                >
                  {project.description}
                </p>
              </div>

              {/* Technologies */}
              <div className="mt-5">
                <p className="text-caption font-medium tracking-wide text-muted-foreground uppercase">
                  Technologies
                </p>
                <ul className="mt-2.5 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="inline-flex items-center rounded-pill border border-border bg-secondary/70 px-3 py-1 text-label font-medium text-foreground"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Optional Links (only rendered if confirmed and present) */}
              {(project.liveUrl || project.githubUrl) && (
                <div className="mt-5 flex flex-wrap gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-control border border-border bg-card px-4 py-2 text-label font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-secondary"
                    >
                      <ExternalLink className="size-4" aria-hidden="true" />
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-control border border-border bg-card px-4 py-2 text-label font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-secondary"
                    >
                      <SocialIcon name="github" className="size-4" />
                      Repository
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Footer with primary View Details action */}
            <div className="flex flex-col-reverse gap-3 border-t border-border/70 bg-muted/20 px-5 py-4 sm:flex-row sm:items-center sm:justify-end sm:px-6">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex min-h-10 items-center justify-center rounded-control border border-border bg-card px-4 py-2 text-label font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                Close
              </button>
              <Link
                href={`/projects/${project.slug}`}
                onClick={onClose}
                className="group inline-flex min-h-10 items-center justify-center gap-2 rounded-control bg-primary px-5 py-2 text-label font-semibold text-primary-foreground shadow-glow transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-primary/90"
              >
                View Details
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
