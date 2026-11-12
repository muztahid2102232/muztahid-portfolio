"use client";

import Link from "next/link";
import { ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";

import { Container } from "@/components/shared/container";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { navigation } from "@/data/navigation";
import { cn } from "@/lib/utils";

import { Logo } from "./logo";

const menuTransition = {
  duration: 0.22,
  ease: [0.2, 0, 0, 1] as [number, number, number, number],
};

interface MobileNavigationProps {
  open: boolean;
  activeSection: string | null;
  onClose: () => void;
  onNavigate: (
    event: ReactMouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => void;
}

export function MobileNavigation({
  open,
  activeSection,
  onClose,
  onNavigate,
}: MobileNavigationProps) {
  const shouldReduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousActive =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const previousOverflow = document.body.style.overflow;
    const previousOverscroll = document.body.style.overscrollBehavior;

    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";

    const frame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus({ preventScroll: true });
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      const activeIsInside = dialogRef.current?.contains(active);

      if (event.shiftKey && (active === first || !activeIsInside)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !activeIsInside)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      document.body.style.overscrollBehavior = previousOverscroll;

      if (previousActive?.isConnected) {
        previousActive.focus({ preventScroll: true });
      }
    };
  }, [open, onClose]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 64rem)");
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) onClose();
    };

    desktop.addEventListener("change", handleChange);
    return () => desktop.removeEventListener("change", handleChange);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={dialogRef}
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-50 flex h-dvh flex-col overflow-hidden bg-background/95 backdrop-blur-xl lg:hidden"
          initial={shouldReduceMotion ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={shouldReduceMotion ? { duration: 0 } : menuTransition}
        >
          <div className="border-b border-border/70">
            <Container className="flex h-16 items-center justify-between">
              <Logo onClick={onClose} />
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close navigation menu"
                  className="inline-flex size-10 items-center justify-center rounded-control border border-border bg-card/60 text-foreground transition-colors hover:border-ring/40 hover:bg-secondary"
                >
                  <X className="size-5" aria-hidden="true" />
                </button>
              </div>
            </Container>
          </div>

          <Container className="flex min-h-0 flex-1 flex-col overflow-y-auto py-8">
            <nav
              aria-label="Mobile navigation"
              className="my-auto flex flex-col gap-1.5"
            >
              {navigation.map((item) => {
                const isActive = activeSection === item.sectionId;

                return (
                  <Link
                    key={item.sectionId}
                    href={item.href}
                    onClick={(event) => onNavigate(event, item.sectionId)}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "group flex min-h-14 items-center justify-between rounded-card px-4 text-body-lg font-medium transition-colors",
                      isActive
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className={cn(
                          "size-1.5 rounded-pill bg-primary transition-opacity",
                          isActive ? "opacity-100" : "opacity-0",
                        )}
                      />
                      {item.label}
                    </span>
                    <ChevronRight
                      aria-hidden="true"
                      className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                );
              })}
            </nav>
          </Container>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
