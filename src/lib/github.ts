import { githubConfig } from "@/data/social-links";
import type {
  ContributionLevel,
  GitHubContributionCalendar,
  GitHubContributionDay,
  GitHubContributionWeek,
  GitHubData,
  GitHubProfile,
} from "@/types/github";

/**
 * Maps GraphQL contribution levels to a 0-4 numeric range.
 */
function mapGraphQLLevel(level: string): ContributionLevel {
  switch (level) {
    case "FOURTH_QUARTILE":
      return 4;
    case "THIRD_QUARTILE":
      return 3;
    case "SECOND_QUARTILE":
      return 2;
    case "FIRST_QUARTILE":
      return 1;
    default:
      return 0;
  }
}

/**
 * Fetches contribution calendar via GitHub GraphQL API (when GITHUB_TOKEN is available).
 */
async function fetchCalendarGraphQL(
  username: string,
  token: string,
): Promise<GitHubContributionCalendar | null> {
  const query = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                contributionLevel
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "muztahid-portfolio",
      },
      body: JSON.stringify({ query, variables: { login: username } }),
      next: { revalidate: 3600 },
    });

    if (!response.ok) return null;

    const data = await response.json();
    const calendar = data?.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar) return null;

    const weeks: GitHubContributionWeek[] = calendar.weeks.map(
      (w: {
        contributionDays: Array<{
          contributionCount: number;
          date: string;
          contributionLevel: string;
        }>;
      }) => ({
        days: w.contributionDays.map((d) => ({
          date: d.date,
          count: d.contributionCount,
          level: mapGraphQLLevel(d.contributionLevel),
        })),
      }),
    );

    return {
      totalContributions: calendar.totalContributions ?? 0,
      weeks,
    };
  } catch {
    return null;
  }
}

/**
 * Public proxy fallback to fetch contribution calendar when no token is present.
 */
async function fetchCalendarPublicProxy(
  username: string,
): Promise<GitHubContributionCalendar | null> {
  try {
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      {
        headers: { "User-Agent": "muztahid-portfolio" },
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) return null;

    const data: {
      total?: Record<string, number>;
      contributions?: Array<{
        date: string;
        count: number;
        level: number;
      }>;
    } = await response.json();

    if (!data.contributions || !Array.isArray(data.contributions)) return null;

    // Group days into 7-day weeks matching GitHub's calendar layout
    const weeks: GitHubContributionWeek[] = [];
    let currentWeek: GitHubContributionDay[] = [];

    for (const item of data.contributions) {
      const level = Math.min(Math.max(item.level ?? 0, 0), 4) as ContributionLevel;
      currentWeek.push({
        date: item.date,
        count: item.count ?? 0,
        level,
      });

      if (currentWeek.length === 7) {
        weeks.push({ days: currentWeek });
        currentWeek = [];
      }
    }

    if (currentWeek.length > 0) {
      weeks.push({ days: currentWeek });
    }

    const totalContributions =
      data.total?.lastYear ??
      weeks.reduce(
        (sum, week) =>
          sum + week.days.reduce((daySum, day) => daySum + day.count, 0),
        0,
      );

    return {
      totalContributions,
      weeks,
    };
  } catch {
    return null;
  }
}

/**
 * Server-side entry point for retrieving genuine GitHub data.
 *
 * Automatically guards against placeholder usernames, applies 1-hour caching,
 * and handles rate limits or missing credentials with complete safety.
 */
export async function getGitHubData(): Promise<GitHubData> {
  const username = githubConfig.username;

  // Guard: Never perform live requests when username is the placeholder or unconfigured
  if (!githubConfig.isConfigured) {
    return {
      isConfigured: false,
      username,
    };
  }

  const token = process.env.GITHUB_TOKEN;
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "muztahid-portfolio",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    // 1. Fetch user profile
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers,
      next: { revalidate: 3600 },
    });

    if (!userRes.ok) {
      return {
        isConfigured: true,
        username,
        error: `Could not load GitHub profile (status: ${userRes.status}).`,
      };
    }

    const userData = await userRes.json();

    // 2. Fetch public repos to calculate total stars received
    let totalStars = 0;
    try {
      const reposRes = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=100&type=owner`,
        {
          headers,
          next: { revalidate: 3600 },
        },
      );
      if (reposRes.ok) {
        const reposData: Array<{ stargazers_count?: number }> = await reposRes.json();
        totalStars = reposData.reduce(
          (sum, repo) => sum + (repo.stargazers_count ?? 0),
          0,
        );
      }
    } catch {
      // Star calculation failure is non-fatal
      totalStars = 0;
    }

    const profile: GitHubProfile = {
      login: userData.login,
      name: userData.name ?? null,
      avatarUrl: userData.avatar_url,
      bio: userData.bio ?? null,
      publicRepos: userData.public_repos ?? 0,
      followers: userData.followers ?? 0,
      following: userData.following ?? 0,
      totalStars,
      htmlUrl: userData.html_url ?? `https://github.com/${username}`,
    };

    // 3. Fetch contribution calendar (GraphQL with token if available, else public proxy)
    let calendar: GitHubContributionCalendar | null = null;
    if (token) {
      calendar = await fetchCalendarGraphQL(username, token);
    }
    if (!calendar) {
      calendar = await fetchCalendarPublicProxy(username);
    }

    return {
      isConfigured: true,
      username,
      profile,
      calendar: calendar ?? undefined,
    };
  } catch {
    return {
      isConfigured: true,
      username,
      error: "Unable to reach GitHub services at this time.",
    };
  }
}

