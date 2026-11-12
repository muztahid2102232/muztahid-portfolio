import type { Metadata } from "next";
import { ArrowUpRight, Compass, Home } from "lucide-react";
import Link from "next/link";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Container } from "@/components/shared/container";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist or has moved.",
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="relative isolate flex min-h-[calc(100dvh-4rem)] items-center justify-center overflow-hidden py-16 sm:py-24">
        {/* Ambient background glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div
            className="absolute top-1/3 left-1/2 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, color-mix(in oklab, var(--primary) 14%, transparent), transparent 70%)",
            }}
          />
          <div
            className="absolute -bottom-32 -right-32 size-[28rem] rounded-full opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, color-mix(in oklab, var(--accent-foreground) 12%, transparent), transparent 70%)",
            }}
          />
        </div>

        <Container className="relative flex max-w-2xl flex-col items-center text-center">
          {/* Creative Developer Window & 404 Monogram */}
          <div className="relative w-full max-w-md overflow-hidden rounded-panel border border-border bg-card/80 shadow-card backdrop-blur-md">
            {/* Window title bar */}
            <div className="flex items-center gap-1.5 border-b border-border/70 bg-muted/40 px-4 py-2.5">
              <span className="size-2.5 rounded-full bg-rose-400/80" />
              <span className="size-2.5 rounded-full bg-amber-400/80" />
              <span className="size-2.5 rounded-full bg-emerald-400/80" />
              <span className="ml-2 font-mono text-[0.6875rem] text-muted-foreground truncate">
                error_404.ts
              </span>
              <span className="ml-auto inline-flex items-center gap-1 rounded-pill border border-border/60 bg-background/60 px-2 py-0.5 font-mono text-[0.625rem] text-muted-foreground">
                <Compass className="size-3 text-primary" />
                off_grid
              </span>
            </div>

            {/* Code / Visual content */}
            <div className="p-6 sm:p-8">
              <div className="inline-block">
                <span
                  aria-hidden="true"
                  className="bg-clip-text font-mono text-7xl font-extrabold tracking-tight text-transparent sm:text-8xl select-none"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, var(--primary), var(--accent-foreground))",
                  }}
                >
                  404
                </span>
              </div>

              <div className="mt-4 rounded-card border border-border/70 bg-background/70 p-3 font-mono text-[0.75rem] text-muted-foreground">
                <p>
                  <span className="text-primary">const</span>{" "}
                  <span className="text-foreground">routeStatus</span> = &#123;
                </p>
                <p className="pl-4">
                  <span className="text-muted-foreground">code:</span>{" "}
                  <span className="text-emerald-600 dark:text-emerald-400">404</span>,
                </p>
                <p className="pl-4">
                  <span className="text-muted-foreground">status:</span>{" "}
                  <span className="text-emerald-600 dark:text-emerald-400">&quot;not_found&quot;</span>,
                </p>
                <p className="pl-4">
                  <span className="text-muted-foreground">message:</span>{" "}
                  <span className="text-emerald-600 dark:text-emerald-400">&quot;Page went off the grid&quot;</span>
                </p>
                <p>&#125;;</p>
              </div>
            </div>
          </div>

          {/* Heading and Description */}
          <h1 className="mt-8 text-heading-1 font-semibold text-foreground">
            Oops! Looks like this page went off the grid.
          </h1>

          <p className="mt-4 max-w-lg text-body text-muted-foreground leading-relaxed">
            The page you&apos;re looking for may have moved, been removed, or never
            existed. Let&apos;s get you back on track.
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-control bg-primary px-6 text-label font-semibold text-primary-foreground shadow-glow transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <Home className="size-4" aria-hidden="true" />
              <span>Back to Home</span>
            </Link>

            <Link
              href="/#projects"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-control border border-border bg-card/80 px-6 text-label font-semibold text-foreground shadow-sm transition-[transform,background-color,border-color] duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <span>Explore My Projects</span>
              <ArrowUpRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
