export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string; // Honeypot field
}

export interface ValidationErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  general?: string;
}

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export function validateContactForm(
  data: Partial<ContactFormValues>,
): {
  isValid: boolean;
  errors: ValidationErrors;
  sanitized: {
    name: string;
    email: string;
    subject: string;
    message: string;
  };
} {
  const errors: ValidationErrors = {};

  const name = (data.name ?? "").trim();
  const email = (data.email ?? "").trim();
  const subject = (data.subject ?? "").trim();
  const message = (data.message ?? "").trim();

  // 1. Name validation
  if (!name) {
    errors.name = "Please enter your name.";
  } else if (name.length < 2) {
    errors.name = "Name must be at least 2 characters.";
  } else if (name.length > 100) {
    errors.name = "Name must be 100 characters or less.";
  }

  // 2. Email validation
  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (email.length > 254) {
    errors.email = "Email must be 254 characters or less.";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  // 3. Subject validation
  if (!subject) {
    errors.subject = "Please enter a subject.";
  } else if (subject.length < 2) {
    errors.subject = "Subject must be at least 2 characters.";
  } else if (subject.length > 150) {
    errors.subject = "Subject must be 150 characters or less.";
  }

  // 4. Message validation
  if (!message) {
    errors.message = "Please enter your message.";
  } else if (message.length < 10) {
    errors.message = "Message must be at least 10 characters.";
  } else if (message.length > 3000) {
    errors.message = "Message must be 3000 characters or less.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitized: {
      name,
      email,
      subject,
      message,
    },
  };
}

