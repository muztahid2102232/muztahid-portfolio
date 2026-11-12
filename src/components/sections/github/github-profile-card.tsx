import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

import { SocialIcon } from "@/components/icons/social-icons";
import type { GitHubProfile } from "@/types/github";

interface GitHubProfileCardProps {
  profile: GitHubProfile;
}

export function GitHubProfileCard({ profile }: GitHubProfileCardProps) {
  return (
    <div className="flex flex-col gap-5 rounded-card border border-border bg-card/70 p-5 shadow-card sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div className="flex items-center gap-4">
        {/* Real avatar or fallback icon */}
        <div className="relative size-14 shrink-0 overflow-hidden rounded-full border border-border bg-muted ring-2 ring-primary/20 sm:size-16">
          {profile.avatarUrl ? (
            <Image
              src={profile.avatarUrl}
              alt={`${profile.name ?? profile.login}'s GitHub avatar`}
              fill
              sizes="64px"
              className="object-cover"
            />
          ) : (
            <div className="flex size-full items-center justify-center bg-secondary text-primary">
              <SocialIcon name="github" className="size-7" />
            </div>
          )}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-heading-3 font-semibold text-foreground truncate">
              {profile.name ?? profile.login}
            </h3>
            <span className="font-mono text-caption text-primary">
              @{profile.login}
            </span>
          </div>

          {profile.bio && (
            <p className="mt-1 line-clamp-2 text-body text-muted-foreground">
              {profile.bio}
            </p>
          )}
        </div>
      </div>

      <a
        href={profile.htmlUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-control bg-primary px-5 text-label font-semibold text-primary-foreground shadow-glow transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-primary/90 shrink-0"
      >
        <span>View My GitHub Profile</span>
        <ArrowUpRight
          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      </a>
    </div>
  );
}

