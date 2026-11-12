import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ProjectBreadcrumb } from "@/components/projects/details/project-breadcrumb";
import { ProjectDetailsHeader } from "@/components/projects/details/project-details-header";
import { ProjectFeatures } from "@/components/projects/details/project-features";
import { ProjectGallery } from "@/components/projects/details/project-gallery";
import { ProjectNavigation } from "@/components/projects/details/project-navigation";
import { ProjectOverview } from "@/components/projects/details/project-overview";
import { ProjectPreview } from "@/components/projects/details/project-preview";
import { ProjectTechnologies } from "@/components/projects/details/project-technologies";
import { Container } from "@/components/shared/container";
import {
  getAdjacentProjects,
  getProjectBySlug,
  projects,
} from "@/data/projects";
import { siteConfig } from "@/lib/constants";
import { publicAssetExists } from "@/lib/public-assets";

/**
 * Pre-renders all project slugs at build time.
 */
export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

/**
 * Generates dynamic SEO metadata for each project.
 */
export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  const title = `${project.title} | ${siteConfig.name}`;
  const description = project.description;
  const canonicalUrl = `${siteConfig.url}/projects/${project.slug}`;
  const hasProjectImage = project.image ? publicAssetExists(project.image) : false;

  return {
    title: project.title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      title,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      ...(hasProjectImage && project.image
        ? {
            images: [
              {
                url: project.image,
                alt: `${project.title} - Project Preview`,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(hasProjectImage && project.image
        ? {
            images: [project.image],
          }
        : {}),
    },
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { previous, next } = getAdjacentProjects(slug);
  const hasImage = project.image ? publicAssetExists(project.image) : false;
  const canonicalUrl = `${siteConfig.url}/projects/${project.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Projects",
            item: `${siteConfig.url}/#projects`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: project.title,
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "SoftwareApplication",
        name: project.title,
        description: project.description,
        applicationCategory: "WebApplication",
        operatingSystem: "Web",
        url: project.liveUrl ?? canonicalUrl,
        ...(project.githubUrl ? { codeRepository: project.githubUrl } : {}),
        author: {
          "@type": "Person",
          name: siteConfig.name,
          url: siteConfig.url,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="relative isolate min-h-dvh overflow-hidden py-10 sm:py-16">
        {/* Ambient background glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div
            className="absolute top-12 -right-48 size-[34rem] rounded-full opacity-60"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, color-mix(in oklab, var(--primary) 12%, transparent), transparent 68%)",
            }}
          />
          <div
            className="absolute top-1/2 -left-48 size-[32rem] rounded-full opacity-50"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, color-mix(in oklab, var(--accent-foreground) 10%, transparent), transparent 70%)",
            }}
          />
        </div>

        <Container className="max-w-4xl space-y-12 sm:space-y-16">
          <ProjectBreadcrumb title={project.title} />
          <ProjectDetailsHeader project={project} />
          <ProjectPreview project={project} hasImage={hasImage} />
          <ProjectOverview project={project} />
          <ProjectFeatures project={project} />
          <ProjectTechnologies project={project} />
          <ProjectGallery project={project} />
          <ProjectNavigation previous={previous} next={next} />
        </Container>
      </main>
      <Footer />
    </>
  );
}
