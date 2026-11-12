import { cacheLife } from "next/cache";

import { Container } from "@/components/shared/container";
import { SocialIcon } from "@/components/icons/social-icons";
import { socialLinks } from "@/data/social-links";
import { siteConfig } from "@/lib/constants";

import { Logo } from "./logo";

const description =
  "I'm an aspiring Full-Stack Developer passionate about building modern, responsive, and user-friendly web applications.";

async function getCopyrightYear() {
  "use cache";
  cacheLife("days");

  return new Date().getFullYear();
}

export async function Footer() {
  const year = await getCopyrightYear();

  return (
    <footer className="border-t border-border bg-card/30">
      <Container className="py-12 sm:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <Logo />
            <p className="mt-5 text-heading-3">{siteConfig.name}</p>
            <p className="mt-1 text-label text-primary">{siteConfig.role}</p>
            <p className="mt-4 text-body text-muted-foreground">{description}</p>
          </div>

          <div className="md:text-right">
            <p className="text-label text-foreground">Connect</p>
            <ul className="mt-3 flex items-center gap-2 md:justify-end">
              {socialLinks.map((link) => {
                const isExternal = link.href.startsWith("http");

                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noreferrer noopener" : undefined}
                      aria-label={
                        link.label === "Email"
                          ? "Email Md. Muztahid Hossain"
                          : link.label
                      }
                      title={link.label}
                      className="inline-flex size-10 items-center justify-center rounded-control border border-border bg-background text-muted-foreground transition-[color,background-color,border-color,transform] hover:-translate-y-0.5 hover:border-primary/40 hover:bg-secondary hover:text-foreground"
                    >
                      <SocialIcon name={link.icon} className="size-4" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-caption text-muted-foreground">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
