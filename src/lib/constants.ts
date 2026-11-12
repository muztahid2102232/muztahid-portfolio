const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/+$/, "");

export const siteConfig = {
  name: "Md. Muztahid Hossain",
  role: "Aspiring Full-Stack Developer",
  description:
    "Explore the portfolio of Md. Muztahid Hossain, an aspiring Full-Stack Developer passionate about building modern, responsive, and user-friendly web applications.",
  url: siteUrl,
} as const;

