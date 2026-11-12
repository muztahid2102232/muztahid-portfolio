/**
 * Project data model for the portfolio.
 *
 * Supports concise summary fields for featured grid cards, optional extended
 * fields (overview, features, screenshots, links) for detail views, and
 * metadata generators.
 */
export interface Project {
  slug: string;
  title: string;
  description: string;
  summary?: string;
  overview?: string;
  technologies: readonly string[];
  image?: string;
  coverImage?: string;
  imageWidth?: number;
  imageHeight?: number;
  screenshots?: readonly string[];
  gallery?: readonly string[];
  githubUrl?: string;
  liveUrl?: string;
  repositoryUrl?: string;
  status?: string;
  featured?: boolean;
  features?: readonly string[];
  details?: readonly string[];
}
