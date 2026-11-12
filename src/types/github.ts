export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export interface GitHubContributionDay {
  date: string;
  count: number;
  level: ContributionLevel;
}

export interface GitHubContributionWeek {
  days: GitHubContributionDay[];
}

export interface GitHubContributionCalendar {
  totalContributions: number;
  weeks: GitHubContributionWeek[];
}

export interface GitHubProfile {
  login: string;
  name: string | null;
  avatarUrl: string;
  bio: string | null;
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  htmlUrl: string;
}

export interface GitHubData {
  isConfigured: boolean;
  username: string;
  profile?: GitHubProfile;
  calendar?: GitHubContributionCalendar;
  error?: string;
}

