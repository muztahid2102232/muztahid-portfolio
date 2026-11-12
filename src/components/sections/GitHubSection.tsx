import { Container } from "@/components/shared/container";
import { githubSectionContent } from "@/data/github";
import { getGitHubData } from "@/lib/github";

import { ContributionGraph } from "./github/contribution-graph";
import { GitHubErrorCard } from "./github/github-error-card";
import { GitHubProfileCard } from "./github/github-profile-card";
import { GitHubReveal } from "./github/github-reveal";
import { GitHubSetupCard } from "./github/github-setup-card";
import { GitHubStats } from "./github/github-stats";

export async function GitHubSection() {
  const data = await getGitHubData();

  return (
    <section
      id="github"
      aria-labelledby="github-title"
      className="relative isolate scroll-mt-16 overflow-hidden border-t border-border/60 section-y"
    >
      {/* Ambient background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div
          className="absolute top-1/4 -right-48 size-[32rem] rounded-full opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, color-mix(in oklab, var(--primary) 10%, transparent), transparent 68%)",
          }}
        />
        <div
          className="absolute -left-48 bottom-1/4 size-[30rem] rounded-full opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, color-mix(in oklab, var(--accent-foreground) 10%, transparent), transparent 70%)",
          }}
        />
      </div>

      <Container>
        {/* Section Header */}
        <div className="max-w-2xl">
          <GitHubReveal>
            <p className="inline-flex items-center gap-3 text-caption font-semibold tracking-[0.22em] text-primary uppercase">
              <span aria-hidden="true" className="h-px w-8 bg-primary/50" />
              {githubSectionContent.eyebrow}
            </p>
          </GitHubReveal>

          <GitHubReveal delay={0.05}>
            <h2 id="github-title" className="mt-4 text-heading-1">
              {githubSectionContent.heading}
            </h2>
          </GitHubReveal>

          <GitHubReveal delay={0.1}>
            <p className="mt-5 text-body-lg text-muted-foreground">
              {githubSectionContent.introduction}
            </p>
          </GitHubReveal>
        </div>

        {/* Section Body */}
        <div className="mt-12 sm:mt-16 space-y-8">
          {!data.isConfigured ? (
            <GitHubReveal delay={0.15}>
              <GitHubSetupCard />
            </GitHubReveal>
          ) : data.error && !data.profile ? (
            <GitHubReveal delay={0.15}>
              <GitHubErrorCard message={data.error} />
            </GitHubReveal>
          ) : data.profile ? (
            <>
              <GitHubReveal delay={0.15}>
                <GitHubProfileCard profile={data.profile} />
              </GitHubReveal>

              <GitHubReveal delay={0.2}>
                <GitHubStats
                  profile={data.profile}
                  totalContributions={data.calendar?.totalContributions}
                />
              </GitHubReveal>

              {data.calendar ? (
                <GitHubReveal delay={0.25}>
                  <ContributionGraph calendar={data.calendar} />
                </GitHubReveal>
              ) : (
                <GitHubReveal delay={0.25}>
                  <GitHubErrorCard message="Contribution calendar data is currently refreshing. Profile statistics remain live." />
                </GitHubReveal>
              )}
            </>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

