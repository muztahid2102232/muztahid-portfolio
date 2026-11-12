"use client";

import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";

import { validateContactForm, type ValidationErrors } from "@/lib/contact-validation";
import { cn } from "@/lib/utils";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string; // Honeypot field
}

const initialFormState: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
  website: "",
};

export function ContactForm() {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleChange = (
    field: keyof FormState,
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field-specific error as user types
    if (errors[field as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (apiError) {
      setApiError(null);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 1. Client-side validation
    const { isValid, errors: validationErrors, sanitized } = validateContactForm(formData);

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setApiError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...sanitized,
          website: formData.website, // Send honeypot
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.details) {
          setErrors(data.details);
        }
        setApiError(
          data.error ||
            "Sorry, your message couldn't be sent. Please try again later.",
        );
        return;
      }

      // Success
      setIsSuccess(true);
      setFormData(initialFormState);
    } catch {
      setApiError(
        "Sorry, your message couldn't be sent. Please check your connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center justify-center rounded-panel border border-primary/30 bg-card/90 p-8 sm:p-12 text-center shadow-card"
      >
        <span
          aria-hidden="true"
          className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary ring-8 ring-primary/5 sm:size-16"
        >
          <CheckCircle2 className="size-8 sm:size-9" />
        </span>

        <h3 className="mt-5 text-heading-2 font-semibold text-foreground">
          Message Received!
        </h3>

        <p className="mt-3 max-w-md text-body text-muted-foreground leading-relaxed">
          Thank you! Your message has been accepted. I&apos;ll get back to you as
          soon as possible.
        </p>

        <button
          type="button"
          onClick={() => {
            setIsSuccess(false);
            setApiError(null);
          }}
          className="mt-7 inline-flex min-h-11 items-center justify-center rounded-control border border-border bg-card px-6 text-label font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="relative flex flex-col gap-5 rounded-panel border border-border bg-card/70 p-6 sm:p-8 shadow-card"
    >
      {/* Decorative top accent glow line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
      />

      {/* Global API error notification */}
      {apiError && (
        <div
          role="alert"
          aria-live="assertive"
          className="flex items-start gap-3 rounded-card border border-destructive/30 bg-destructive/10 p-4 text-destructive"
        >
          <AlertCircle className="size-5 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-label leading-relaxed">{apiError}</p>
        </div>
      )}

      {/* Honeypot field (hidden from sighted visitors) */}
      <div
        aria-hidden="true"
        style={{ display: "none" }}
        className="hidden"
      >
        <label htmlFor="contact-website">Website (Leave empty)</label>
        <input
          id="contact-website"
          type="text"
          name="website"
          value={formData.website}
          onChange={(e) => handleChange("website", e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Name and Email row */}
      <div className="grid gap-5 sm:grid-cols-2">
        {/* Name */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="contact-name"
            className="text-label font-medium text-foreground"
          >
            Name <span className="text-primary" aria-hidden="true">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            required
            autoComplete="name"
            disabled={isSubmitting}
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Your name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={cn(
              "min-h-12 w-full rounded-control border bg-background/80 px-4 py-2.5 text-body text-foreground transition-[border-color,background-color,box-shadow]",
              "placeholder:text-muted-foreground/60 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/40",
              errors.name
                ? "border-destructive/80 focus:border-destructive"
                : "border-border hover:border-border/90 focus:border-primary",
            )}
          />
          {errors.name && (
            <p id="name-error" className="text-caption text-destructive">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="contact-email"
            className="text-label font-medium text-foreground"
          >
            Email <span className="text-primary" aria-hidden="true">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            required
            autoComplete="email"
            disabled={isSubmitting}
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={cn(
              "min-h-12 w-full rounded-control border bg-background/80 px-4 py-2.5 text-body text-foreground transition-[border-color,background-color,box-shadow]",
              "placeholder:text-muted-foreground/60 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/40",
              errors.email
                ? "border-destructive/80 focus:border-destructive"
                : "border-border hover:border-border/90 focus:border-primary",
            )}
          />
          {errors.email && (
            <p id="email-error" className="text-caption text-destructive">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Subject */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-subject"
          className="text-label font-medium text-foreground"
        >
          Subject <span className="text-primary" aria-hidden="true">*</span>
        </label>
        <input
          id="contact-subject"
          type="text"
          required
          disabled={isSubmitting}
          value={formData.subject}
          onChange={(e) => handleChange("subject", e.target.value)}
          placeholder="What would you like to discuss?"
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          className={cn(
            "min-h-12 w-full rounded-control border bg-background/80 px-4 py-2.5 text-body text-foreground transition-[border-color,background-color,box-shadow]",
            "placeholder:text-muted-foreground/60 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/40",
            errors.subject
              ? "border-destructive/80 focus:border-destructive"
              : "border-border hover:border-border/90 focus:border-primary",
          )}
        />
        {errors.subject && (
          <p id="subject-error" className="text-caption text-destructive">
            {errors.subject}
          </p>
        )}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-message"
          className="text-label font-medium text-foreground"
        >
          Message <span className="text-primary" aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          required
          rows={5}
          disabled={isSubmitting}
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
          placeholder="Tell me about your project, idea, or questions..."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(
            "w-full resize-y rounded-control border bg-background/80 px-4 py-3 text-body text-foreground transition-[border-color,background-color,box-shadow]",
            "placeholder:text-muted-foreground/60 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/40",
            errors.message
              ? "border-destructive/80 focus:border-destructive"
              : "border-border hover:border-border/90 focus:border-primary",
          )}
        />
        {errors.message && (
          <p id="message-error" className="text-caption text-destructive">
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-control bg-primary px-6 text-label font-semibold text-primary-foreground shadow-glow transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-primary/90 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <span>Send Message</span>
              <Send
                aria-hidden="true"
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

