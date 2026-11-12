# Md. Muztahid Hossain — Full-Stack Developer Portfolio

A modern, high-performance personal developer portfolio built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

Designed with a developer-focused aesthetic, smooth micro-interactions, responsive design across mobile, tablet, and desktop viewports, comprehensive accessibility (including full `prefers-reduced-motion` compliance), and dark/light theming.

---

## Features

- **Hero Section (`#home`)**: High-impact developer greeting, role subtitle, terminal-styled quick-intro card, primary/secondary call-to-actions, and animated floating technology icons with graceful asset fallbacks.
- **About Me Section (`#about`)**: Professional narrative, learning philosophy, core development principles grid, and interactive-styled code editor visual.
- **Technical Skills Section (`#skills`)**: 4-row bidirectional infinite marquee showcasing Frontend, Styling & UI, Backend & Database, and Languages & Tools with hover/focus pause and global pause button controls.
- **Featured Projects Section (`#projects`)**: Centralized project catalog featuring **FitLog**, **BazarDor**, and **Dev Stack**, complete with technology stack badges, repository/live links, full-page screenshots, and quick-view modals with focus trapping and keyboard navigation.
- **Dynamic Project Details Pages (`/projects/[slug]`)**: Dedicated detail routes (`/projects/fit-log`, `/projects/bazar-dor`, `/projects/dev-stack`) pre-rendered statically with breadcrumb navigation, project overview, key features, technology badges, gallery previews, and adjacent project pagination.
- **GitHub Activity Section (`#github`)**: Live GitHub profile statistics, contribution graph, and repository star metrics with server-side caching (`revalidate: 3600`) and safe fallback states when credentials or usernames are unconfigured.
- **Fully Functional Contact Section (`#contact`)**: Accessible contact form backed by a Next.js App Router API route and **Resend** integration, featuring client-side validation, server-side payload validation, anti-spam honeypot filtering, and HTML sanitization.
- **Dark / Light Theme Switcher**: Instant theme toggle powered by `next-themes` and `useSyncExternalStore` for zero hydration mismatches, preserving visitor preference in `localStorage`.
- **Interactive Enhancements**:
  - **Custom Cursor**: Smooth spring-animated pointer active only on fine-pointer devices and disabled when `prefers-reduced-motion` is active.
  - **Scroll-Triggered Animations**: Lightweight Motion reveals that respect reduced motion.
  - **Back-to-Top Button**: Circular SVG progress ring indicating page scroll depth with smooth scroll-to-top action.
  - **Branded Loading Screen**: Polished emblem and loading bar displayed during route transitions.
  - **Custom 404 Page**: Developer-themed not-found view with quick navigation actions and search indexing prevention.
- **SEO & Social Sharing**:
  - Full Open Graph and Twitter/X card metadata.
  - Dynamic XML sitemap (`/sitemap.xml`) via `src/app/sitemap.ts`.
  - Crawler directives (`/robots.txt`) via `src/app/robots.ts`.
  - Canonical URL alternates and Schema.org JSON-LD structured data (`WebSite`, `Person`, `BreadcrumbList`, and `SoftwareApplication`).

---

## Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router, Turbopack, Partial Prerendering) |
| **Language** | TypeScript 5 (Strict Mode) |
| **UI Library** | React 19 (Server & Client Components) |
| **Styling** | Tailwind CSS v4 (`@tailwindcss/turbopack`) |
| **Theming** | `next-themes` (Dark / Light / System) |
| **Animations** | Motion v14 (`motion/react`) |
| **Icons** | Lucide React, Simple Icons |
| **Email Service** | Resend API |
| **Code Quality** | ESLint 9 (`eslint-config-next`) |

---

## Project Structure

```text
muztahid-portfolio/
├── public/
│   ├── cv.pdf                # Downloadable CV (generated from cv/cv.html)
│   ├── icons/                # Favicon and manifest icons
│   └── images/
│       ├── og/               # Social share preview image (portfolio-preview.png)
│       ├── profile/          # Profile photographs
│       └── projects/         # Project screenshots (fitlog-full-image.png, bazador-full-image.png, devstack-full-image.png)
│
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/      # Contact form submission API route (Resend)
│   │   ├── projects/
│   │   │   └── [slug]/       # Dynamic project detail routes (static pre-rendered)
│   │   ├── globals.css       # Tailwind v4 configuration, design tokens, keyframes
│   │   ├── layout.tsx        # Root layout, fonts, SEO metadata, JSON-LD schema
│   │   ├── loading.tsx       # Branded loading screen
│   │   ├── not-found.tsx     # Custom 404 page
│   │   ├── page.tsx          # Main single-page portfolio layout
│   │   ├── robots.ts         # Dynamic crawler directives (robots.txt)
│   │   └── sitemap.ts        # Dynamic sitemap generation (sitemap.xml)
│   │
│   ├── components/
│   │   ├── icons/            # Brand and social SVG icons
│   │   ├── layout/           # Navbar, Logo, Mobile Navigation, Footer
│   │   ├── projects/         # Project details components (header, preview, breadcrumbs)
│   │   ├── sections/         # Hero, About, Skills, Projects, GitHub, Contact sections
│   │   ├── shared/           # Container, ThemeToggle, CustomCursor, BackToTop, ScrollReveal
│   │   └── ui/               # Reusable presentational components
│   │
│   ├── data/                 # Centralized content and registries
│   │   ├── about.ts          # About section bio, philosophy, and principles
│   │   ├── contact.ts        # Contact section text and options
│   │   ├── github.ts         # GitHub section copy
│   │   ├── hero.ts           # Hero section text, CTAs, and profile fallback
│   │   ├── navigation.ts     # Navigation links and section IDs
│   │   ├── projects.ts       # Central projects registry and lookup helpers
│   │   ├── skills.ts         # Central skills categorization and marquee rows
│   │   └── social-links.ts   # Social links and GitHub username configuration
│   │
│   ├── lib/                  # Shared business logic and utilities
│   │   ├── animations.ts     # Motion animation variants and ease curves
│   │   ├── constants.ts      # Site configuration and base URL normalization
│   │   ├── contact-validation.ts # Client and server contact form validator
│   │   ├── github.ts         # GitHub REST and GraphQL data fetching with caching
│   │   ├── public-assets.ts  # Build-time asset existence checker
│   │   └── utils.ts          # Class name merging utility (cn)
│   │
│   ├── providers/            # React context providers (ThemeProvider)
│   └── types/                # TypeScript interface declarations
│
├── cv/
│   └── cv.html               # CV source (edit this, then run `npm run cv:build`)
├── scripts/
│   └── build-cv.mjs          # Generates public/cv.pdf with headless Chrome or Edge
├── .env.example              # Environment variables template
├── .gitignore                # Git exclusions
├── next.config.ts            # Next.js 16 configuration
├── package.json              # Package manifest and dependencies
├── README.md                 # Project documentation
└── tsconfig.json             # TypeScript configuration
```

---

## Getting Started

### Prerequisites

- **Node.js**: `20.9.0` or higher
- **npm**: `10.0.0` or higher

### Installation

1. Clone or download the repository to your local machine.
2. Navigate to the project directory:
   ```bash
   cd muztahid-portfolio
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Local Environment Setup

Copy `.env.example` to create your local `.env.local` file:

```bash
cp .env.example .env.local
```

*(On Windows PowerShell, use `Copy-Item .env.example .env.local`)*

Edit `.env.local` to configure your values:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
GITHUB_USERNAME=muztahid2102232
GITHUB_TOKEN=
RESEND_API_KEY=re_your_api_key_here
CONTACT_EMAIL=your-email@example.com
RESEND_FROM_EMAIL=Portfolio Contact <onboarding@resend.dev>
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Command | Purpose |
| :--- | :--- |
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Create an optimized production build |
| `npm run start` | Serve the production build locally |
| `npm run cv:build` | Regenerate `public/cv.pdf` from `cv/cv.html` |
| `npm run lint` | Run ESLint check |
| `npm run typecheck` | Run Next.js route typegen and TypeScript compiler checks |

---

## Updating the CV

The "Download CV" button serves `public/cv.pdf`. That file is generated from [`cv/cv.html`](cv/cv.html), which contains the resume layout and content (including the contact placeholders). After editing the HTML, regenerate the PDF with:

```bash
npm run cv:build
```

The script uses an installed Chrome or Edge browser. If neither is detected, set `CHROME_PATH` to the browser executable before running the command.

---

## Environment Variables

| Variable | Required? | Purpose | Where to Configure |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | **Yes (Prod)** | Canonical domain URL for metadata, Open Graph, and sitemap generation. Defaults to `http://localhost:3000` locally. | Vercel & `.env.local` |
| `GITHUB_USERNAME` | Optional | GitHub handle for pulling live profile stats and activity. Defaults to `muztahid2102232` when unset. | Vercel & `.env.local` |
| `GITHUB_TOKEN` | Optional | Personal access token to increase GitHub API rate limits from 60 to 5,000 req/hr. | Vercel & `.env.local` |
| `RESEND_API_KEY` | **Yes (Email)** | API key for authenticating with Resend to dispatch contact form submissions. | Vercel & `.env.local` |
| `CONTACT_EMAIL` | **Yes (Email)** | Destination inbox where visitor contact messages will be delivered. | Vercel & `.env.local` |
| `RESEND_FROM_EMAIL` | Optional | Verified sender address in Resend. Defaults to `Portfolio Contact <onboarding@resend.dev>`. | Vercel & `.env.local` |

> [!IMPORTANT]
> Never commit `.env.local` or expose `RESEND_API_KEY` and `GITHUB_TOKEN` in client bundles. Only `NEXT_PUBLIC_SITE_URL` uses the `NEXT_PUBLIC_` prefix.

---

## External Integrations Setup

### 1. GitHub Integration

1. The portfolio defaults to `GITHUB_USERNAME=muztahid2102232`. To use a different account, set `GITHUB_USERNAME=your-username` in `.env.local` (and later in Vercel).
2. *(Optional)* Create a personal access token on GitHub (**Settings > Developer settings > Personal access tokens**) with read access to public repositories, and set `GITHUB_TOKEN=ghp_your_token`. This raises API rate limits to 5,000 requests per hour.
3. If `GITHUB_USERNAME` is set to `"YOUR_GITHUB_USERNAME"`, the portfolio gracefully displays an unconfigured setup placeholder card without attempting live network requests.

### 2. Resend Contact Form Integration

1. Sign up for a free account at [resend.com](https://resend.com).
2. Generate an API Key under **API Keys** and copy the secret key starting with `re_`.
3. Set `RESEND_API_KEY=re_your_api_key_here` in `.env.local`.
4. Set `CONTACT_EMAIL=your-actual-email@example.com` to receive submissions.
5. For initial testing, you can leave `RESEND_FROM_EMAIL=Portfolio Contact <onboarding@resend.dev>`. Once you connect and verify your own custom domain in Resend, update it to `Portfolio Contact <contact@yourdomain.com>`.

---

## Vercel Deployment Guide

Deploying this portfolio to [Vercel](https://vercel.com) takes under 3 minutes:

### Step 1: Push Project to GitHub

1. Ensure all your changes are committed to your local Git branch.
2. Create a new repository on your GitHub account.
3. Push your repository:
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Import into Vercel

1. Log into your account at [vercel.com](https://vercel.com).
2. Click **Add New...** > **Project**.
3. Locate your portfolio repository in the list and click **Import**.

### Step 3: Configure Project Settings

Vercel automatically detects the Next.js framework preset:
- **Framework Preset**: `Next.js`
- **Root Directory**: `./` (leave default)
- **Build Command**: `npm run build` (or leave default)
- **Output Directory**: `.next` (leave default)
- **Install Command**: `npm install` (or leave default)

### Step 4: Add Environment Variables

In the **Environment Variables** section on the Vercel project configuration page, add:

| Name | Value |
| :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | `https://your-project.vercel.app` (or your custom domain) |
| `GITHUB_USERNAME` | `muztahid2102232` |
| `GITHUB_TOKEN` | *(optional)* `your-github-token` |
| `RESEND_API_KEY` | `re_your_resend_api_key` |
| `CONTACT_EMAIL` | `your-email@example.com` |
| `RESEND_FROM_EMAIL` | `Portfolio Contact <onboarding@resend.dev>` *(or your verified domain address)* |

### Step 5: Deploy

1. Click **Deploy**.
2. Vercel will run `npm install`, compile the application with Turbopack, generate all static pages, and assign a production URL.
3. If you configure a custom domain or update environment variables later, trigger a redeploy from **Deployments > Redeploy** for changes to take effect.

---

## Design System Tokens

Tokens are declared in [`src/app/globals.css`](file:///c:/Users/User/Desktop/PHero-B14/muztahid-portfolio/src/app/globals.css) and exposed through Tailwind CSS v4 `@theme inline`:

- **Colors**:
  - Light theme in `:root`: `--background` (`#f6f8fc`), `--foreground` (`#0b1220`), `--primary` (`#2563eb`), `--card` (`#ffffff`), `--border` (`#e1e8f2`).
  - Dark theme in `.dark`: `--background` (`#060a13`), `--foreground` (`#e9effb`), `--primary` (`#4f8cff`), `--card` (`#0c1322`), `--border` (`#1c2940`).
- **Typography**: Inter loaded via `next/font/google` (`--font-inter`).
- **Elevation**: `--card-shadow` and `--glow-shadow`.
- **Motion**: `--duration-fast` (120ms), `--duration-base` (180ms), `--duration-slow` (320ms).
- **Reduced Motion**: Full `@media (prefers-reduced-motion: reduce)` rules disable layout shifts, collapse marquee clones into a clean responsive wrap, and force immediate opacity.
