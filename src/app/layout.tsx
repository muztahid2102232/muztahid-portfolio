import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { BackToTop } from "@/components/shared/BackToTop";
import { CustomCursor } from "@/components/shared/CustomCursor";
import { socialLinks } from "@/data/social-links";
import { siteConfig } from "@/lib/constants";
import { publicAssetExists } from "@/lib/public-assets";
import { ThemeProvider } from "@/providers/theme-provider";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const hasOgImage = publicAssetExists("/images/og/portfolio-preview.png");

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.role}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  keywords: [
    "Md. Muztahid Hossain",
    "Full-Stack Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "Web Developer Portfolio",
  ],
  alternates: {
    canonical: siteConfig.url,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.role}`,
    description: siteConfig.description,
    ...(hasOgImage
      ? {
          images: [
            {
              url: "/images/og/portfolio-preview.png",
              width: 1200,
              height: 630,
              alt: `${siteConfig.name} - ${siteConfig.role}`,
            },
          ],
        }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.role}`,
    description: siteConfig.description,
    ...(hasOgImage
      ? {
          images: ["/images/og/portfolio-preview.png"],
        }
      : {}),
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const externalSocials = socialLinks
    .filter((link) => link.href.startsWith("http") && !link.href.includes("#"))
    .map((link) => link.href);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: "en-US",
      },
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#person`,
        name: siteConfig.name,
        jobTitle: siteConfig.role,
        url: siteConfig.url,
        description: siteConfig.description,
        sameAs: externalSocials,
      },
    ],
  };

  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          enableColorScheme
          storageKey="muztahid-portfolio-theme"
        >
          {children}
          <CustomCursor />
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
