import { ArrowUpRight, Mail, Sparkles } from "lucide-react";

import { SocialIcon } from "@/components/icons/social-icons";
import { contactContent } from "@/data/contact";
import { socialLinks } from "@/data/social-links";
import { siteConfig } from "@/lib/constants";

export function ContactInfo() {
  // Find email link from socialLinks
  const emailLink = socialLinks.find((link) => link.icon === "mail");
  const isPlaceholderEmail =
    !emailLink || emailLink.href.includes("example.com");

  // Filter available social links (skip placeholders like "#")
  const activeSocialLinks = socialLinks.filter(
    (link) => link.href && link.href !== "#" && !link.href.includes("example.com"),
  );

  return (
    <div className="flex flex-col justify-between space-y-8 lg:max-w-md">
      <div className="space-y-6">
        <h3 className="text-heading-2 font-semibold text-foreground">
          {contactContent.connect.heading}
        </h3>

        <p className="text-body-lg text-muted-foreground leading-relaxed">
          {contactContent.connect.description}
        </p>

        {/* Quick Contact Badges */}
        <div className="space-y-4 pt-2">
          {/* Direct Email Card */}
          <div className="flex items-start gap-4 rounded-card border border-border bg-card/60 p-4 shadow-sm transition-[border-color,background-color] hover:border-primary/40 hover:bg-card">
            <span
              aria-hidden="true"
              className="flex size-11 shrink-0 items-center justify-center rounded-control border border-primary/20 bg-primary/10 text-primary"
            >
              <Mail className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="text-caption font-medium uppercase tracking-wider text-muted-foreground">
                Email
              </p>
              {isPlaceholderEmail ? (
                <p className="mt-1 font-mono text-label text-muted-foreground">
                  Available upon request / direct form
                </p>
              ) : (
                <a
                  href={emailLink.href}
                  className="mt-1 block font-mono text-label text-foreground hover:text-primary transition-colors truncate"
                >
                  {emailLink.href.replace(/^mailto:/, "")}
                </a>
              )}
            </div>
          </div>

          {/* Availability Status Badge */}
          <div className="flex items-start gap-4 rounded-card border border-border bg-card/60 p-4 shadow-sm">
            <span
              aria-hidden="true"
              className="flex size-11 shrink-0 items-center justify-center rounded-control border border-cyan-500/20 bg-cyan-500/10 text-cyan-500"
            >
              <Sparkles className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="text-caption font-medium uppercase tracking-wider text-muted-foreground">
                Availability
              </p>
              <p className="mt-1 text-label font-medium text-foreground">
                Open to full-time roles, internships & projects
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Profiles area */}
      <div className="border-t border-border/70 pt-6">
        <p className="text-caption font-medium uppercase tracking-wider text-muted-foreground">
          Online Presence
        </p>

        {activeSocialLinks.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-3">
            {activeSocialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-pill border border-border bg-card/80 px-4 py-2 text-label font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-secondary"
              >
                <SocialIcon name={link.icon} className="size-4" />
                <span>{link.label}</span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-3.5 opacity-60 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            ))}
          </div>
        ) : (
          <p className="mt-2 text-label text-muted-foreground">
            Social profiles configured in {siteConfig.name}&apos;s profile will
            appear here.
          </p>
        )}
      </div>
    </div>
  );
}

