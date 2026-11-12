import type { SocialLink } from "@/types/social-link";

/**
 * Centralized GitHub configuration.
 *
 * The username falls back to the portfolio owner's account. Set
 * `GITHUB_USERNAME` in `.env.local` to override it. While set to
 * "YOUR_GITHUB_USERNAME", the portfolio treats it as pending configuration
 * and will never make live API calls.
 */
export const githubConfig = {
  username: process.env.GITHUB_USERNAME ?? "muztahid2102232",
  get profileUrl(): string {
    return `https://github.com/${this.username}`;
  },
  get isConfigured(): boolean {
    const val = this.username?.trim();
    return (
      Boolean(val) &&
      val !== "YOUR_GITHUB_USERNAME" &&
      val !== "#" &&
      !val.includes("YOUR_")
    );
  },
} as const;

/**
 * Global social links.
 * Used by Header, Footer, and Hero sections.
 */
export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: githubConfig.isConfigured ? githubConfig.profileUrl : "#",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/md-muztahid-hossain",
    icon: "linkedin",
  },
  {
    label: "Email",
    href: "mailto:muztahid.2102232@bau.edu.bd",
    icon: "mail",
  },
];
