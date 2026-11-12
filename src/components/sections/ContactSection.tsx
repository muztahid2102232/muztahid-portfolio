import { Container } from "@/components/shared/container";
import { contactContent } from "@/data/contact";

import { ContactInfo } from "./contact/contact-info";
import { ContactReveal } from "./contact/contact-reveal";
import { ContactForm } from "./contact/ContactForm";

export function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative isolate scroll-mt-16 overflow-hidden border-t border-border/60 section-y"
    >
      {/* Ambient background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div
          className="absolute top-1/4 -right-48 size-[34rem] rounded-full opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, color-mix(in oklab, var(--primary) 12%, transparent), transparent 68%)",
          }}
        />
        <div
          className="absolute -left-48 bottom-1/4 size-[32rem] rounded-full opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, color-mix(in oklab, var(--accent-foreground) 10%, transparent), transparent 70%)",
          }}
        />
      </div>

      <Container>
        {/* Section Header */}
        <div className="max-w-2xl">
          <ContactReveal>
            <p className="inline-flex items-center gap-3 text-caption font-semibold tracking-[0.22em] text-primary uppercase">
              <span aria-hidden="true" className="h-px w-8 bg-primary/50" />
              {contactContent.eyebrow}
            </p>
          </ContactReveal>

          <ContactReveal delay={0.05}>
            <h2 id="contact-title" className="mt-4 text-heading-1">
              {contactContent.heading}
            </h2>
          </ContactReveal>

          <ContactReveal delay={0.1}>
            <p className="mt-5 text-body-lg text-muted-foreground">
              {contactContent.introduction}
            </p>
          </ContactReveal>
        </div>

        {/* Two-Column Grid: Contact Information & Form */}
        <div className="mt-12 sm:mt-16 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-14 xl:gap-20">
          <ContactReveal delay={0.15}>
            <ContactInfo />
          </ContactReveal>

          <ContactReveal delay={0.2}>
            <ContactForm />
          </ContactReveal>
        </div>
      </Container>
    </section>
  );
}

