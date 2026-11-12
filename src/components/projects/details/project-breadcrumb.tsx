import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface ProjectBreadcrumbProps {
  title: string;
}

export function ProjectBreadcrumb({ title }: ProjectBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8">
      <ol className="flex flex-wrap items-center gap-2 text-label text-muted-foreground">
        <li>
          <Link
            href="/"
            className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Home
          </Link>
        </li>
        <li aria-hidden="true" className="text-muted-foreground/40">
          <ChevronRight className="size-3.5" />
        </li>
        <li>
          <Link
            href="/#projects"
            className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Projects
          </Link>
        </li>
        <li aria-hidden="true" className="text-muted-foreground/40">
          <ChevronRight className="size-3.5" />
        </li>
        <li
          aria-current="page"
          className="font-medium text-foreground truncate max-w-[200px] sm:max-w-none"
        >
          {title}
        </li>
      </ol>
    </nav>
  );
}

