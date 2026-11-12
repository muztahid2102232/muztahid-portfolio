"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";

import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { Container } from "@/components/shared/container";
import { navigation } from "@/data/navigation";
import { cn } from "@/lib/utils";

import { Logo } from "./logo";
import { MobileNavigation } from "./mobile-navigation";

function getInitialActiveSection(): string | null {
  if (typeof window === "undefined") return null;
  const initialSection = window.location.hash.slice(1);
  return navigation.some(({ sectionId }) => sectionId === initialSection)
    ? initialSection
    : null;
}

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [activeSection, setActiveSection] = useState<string | null>(getInitialActiveSection);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Reset mobile drawer state upon navigation without triggering cascading renders in effects
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsMobileOpen(false);
  }

  const closeMobile = useCallback(() => setIsMobileOpen(false), []);

  useEffect(() => {
    if (!isHome) return;

    const sections = navigation
      .map(({ sectionId }) => document.getElementById(sectionId))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  const handleNavigate = useCallback(
    (event: ReactMouseEvent<HTMLAnchorElement>, sectionId: string) => {
      setIsMobileOpen(false);

      if (!isHome) return;

      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = document.getElementById(sectionId);
      if (!target) return;

      event.preventDefault();

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
      window.history.pushState(null, "", `/#${sectionId}`);
      setActiveSection(sectionId);
    },
    [isHome],
  );

  const currentActiveSection = isHome ? activeSection : null;

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between gap-4 sm:gap-6">
          <Logo />

          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-1 lg:flex"
          >
            {navigation.map((item) => {
              const isActive = currentActiveSection === item.sectionId;

              return (
                <Link
                  key={item.sectionId}
                  href={item.href}
                  onClick={(event) => handleNavigate(event, item.sectionId)}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-pill px-3 py-2 text-label transition-colors",
                    isActive
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "size-1.5 rounded-pill bg-primary transition-opacity",
                      isActive ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <button
              type="button"
              onClick={() => setIsMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isMobileOpen}
              aria-controls="mobile-navigation"
              aria-haspopup="dialog"
              className="inline-flex size-10 items-center justify-center rounded-control border border-border bg-card/60 text-foreground transition-colors hover:border-ring/40 hover:bg-secondary lg:hidden"
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          </div>
        </Container>
      </header>

      <MobileNavigation
        open={isMobileOpen}
        activeSection={currentActiveSection}
        onClose={closeMobile}
        onNavigate={handleNavigate}
      />
    </>
  );
}
