import { BookOpen, GitCommitHorizontal, Star, UserCheck, Users } from "lucide-react";

import type { GitHubProfile } from "@/types/github";

interface GitHubStatsProps {
  profile: GitHubProfile;
  totalContributions?: number;
}

export function GitHubStats({
  profile,
  totalContributions,
}: GitHubStatsProps) {
  const statItems = [
    {
      label: "Public Repositories",
      value: profile.publicRepos.toLocaleString(),
      icon: BookOpen,
      color: "text-blue-500",
    },
    {
      label: "Total Stars",
      value: profile.totalStars.toLocaleString(),
      icon: Star,
      color: "text-amber-500",
    },
    {
      label: "Followers",
      value: profile.followers.toLocaleString(),
      icon: Users,
      color: "text-cyan-500",
    },
    {
      label: "Following",
      value: profile.following.toLocaleString(),
      icon: UserCheck,
      color: "text-indigo-500",
    },
  ];

  if (typeof totalContributions === "number" && totalContributions > 0) {
    statItems.unshift({
      label: "Total Contributions",
      value: totalContributions.toLocaleString(),
      icon: GitCommitHorizontal,
      color: "text-emerald-500",
    });
  }

  return (
    <div
      className={`grid grid-cols-2 gap-4 sm:grid-cols-2 ${
        statItems.length > 4 ? "lg:grid-cols-5" : "lg:grid-cols-4"
      }`}
    >
      {statItems.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className="flex flex-col justify-between rounded-card border border-border bg-card/70 p-5 shadow-card transition-[border-color,background-color,transform] duration-200 hover:border-primary/40 hover:bg-card motion-safe:hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-caption font-medium tracking-wide text-muted-foreground uppercase">
                {item.label}
              </span>
              <span
                aria-hidden="true"
                className="flex size-8 items-center justify-center rounded-control bg-secondary text-primary"
              >
                <Icon className={`size-4 ${item.color}`} />
              </span>
            </div>

            <div className="mt-4">
              <span className="text-heading-1 font-bold text-foreground">
                {item.value}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

