import { Resend } from "resend";

import { validateContactForm } from "@/lib/contact-validation";

/**
 * Escapes characters for safe inclusion inside the HTML email body.
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  // 1. Basic request size check (max 64KB)
  const contentLength = request.headers.get("content-length");
  if (contentLength && parseInt(contentLength, 10) > 65536) {
    return Response.json(
      { error: "Request payload too large." },
      { status: 413 },
    );
  }

  // 2. Safely parse JSON body
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "Invalid JSON in request body." },
      { status: 400 },
    );
  }

  // 3. Honeypot spam check
  // If the hidden 'website' field was filled, silently drop the message without sending
  if (typeof body.website === "string" && body.website.trim().length > 0) {
    return Response.json({
      success: true,
      message: "Your message has been accepted.",
    });
  }

  // 4. Server-side validation
  const { isValid, errors, sanitized } = validateContactForm({
    name: typeof body.name === "string" ? body.name : undefined,
    email: typeof body.email === "string" ? body.email : undefined,
    subject: typeof body.subject === "string" ? body.subject : undefined,
    message: typeof body.message === "string" ? body.message : undefined,
  });

  if (!isValid) {
    return Response.json(
      {
        error: "Validation failed.",
        details: errors,
      },
      { status: 400 },
    );
  }

  // 5. Environment configuration check
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL;
  const fromEmail =
    process.env.RESEND_FROM_EMAIL ||
    "Portfolio Contact <onboarding@resend.dev>";

  if (!apiKey || apiKey === "re_your_api_key_here") {
    return Response.json(
      {
        error:
          "Email service is currently unconfigured. Please connect via direct email or social links.",
      },
      { status: 503 },
    );
  }

  const recipient =
    toEmail && toEmail !== "your-email@example.com"
      ? toEmail
      : "delivered@resend.dev";

  // 6. Send email via Resend
  try {
    const resend = new Resend(apiKey);

    const safeName = escapeHtml(sanitized.name);
    const safeEmail = escapeHtml(sanitized.email);
    const safeSubject = escapeHtml(sanitized.subject);
    const safeMessage = escapeHtml(sanitized.message);
    const formattedDate = new Date().toUTCString();

    const result = await resend.emails.send({
      from: fromEmail,
      to: recipient,
      replyTo: sanitized.email,
      subject: `Portfolio Contact: ${sanitized.subject}`,
      text: `From: ${sanitized.name} (${sanitized.email})\nSubject: ${sanitized.subject}\nDate: ${formattedDate}\n\nMessage:\n${sanitized.message}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e1e8f2; border-radius: 12px; background-color: #ffffff; color: #0b1220;">
          <h2 style="color: #2563eb; margin-top: 0; font-size: 20px;">New Message from Portfolio Contact Form</h2>
          <div style="margin: 16px 0; font-size: 14px; line-height: 1.6;">
            <p style="margin: 4px 0;"><strong>Name:</strong> ${safeName}</p>
            <p style="margin: 4px 0;"><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color: #2563eb;">${safeEmail}</a></p>
            <p style="margin: 4px 0;"><strong>Subject:</strong> ${safeSubject}</p>
            <p style="margin: 4px 0; color: #55647c;"><strong>Date:</strong> ${formattedDate}</p>
          </div>
          <hr style="border: 0; border-top: 1px solid #e1e8f2; margin: 20px 0;" />
          <div style="font-size: 15px; line-height: 1.7; white-space: pre-wrap; background-color: #f6f8fc; padding: 16px; border-radius: 8px;">${safeMessage}</div>
        </div>
      `,
    });

    if (result.error) {
      console.error("Resend API error:", result.error.message);
      return Response.json(
        {
          error: "Sorry, your message couldn't be sent. Please try again later.",
        },
        { status: 502 },
      );
    }

    return Response.json({
      success: true,
      id: result.data?.id,
      message:
        "Thank you! Your message has been accepted. I'll get back to you as soon as possible.",
    });
  } catch (err) {
    console.error("Unexpected error in contact API route:", err);
    return Response.json(
      {
        error: "Sorry, your message couldn't be sent. Please try again later.",
      },
      { status: 500 },
    );
  }
}

