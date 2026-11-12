import type { Project } from "@/types/project";

export const projectsContent = {
  eyebrow: "My work",
  heading: "Featured Projects",
  introduction:
    "A selection of full-stack applications I've built while learning modern web development. Each project includes a live demo, source code, and a closer look at the features I implemented.",
} as const;

/**
 * Central project registry.
 * Add new projects here; cards, modals, and dynamic detail pages read from this module.
 */
export const projects: readonly Project[] = [
  {
    slug: "fit-log",
    title: "FitLog",
    description:
      "A responsive workout library and planning app for exploring exercises, building a daily routine, and saving workouts for later.",
    summary:
      "A responsive workout library and planning app built with Next.js.",
    overview:
      "FitLog is a responsive workout library and planning application. Users can explore different workouts, view detailed information including equipment, difficulty, sets, reps, duration, calories, and ratings, then add exercises to their daily plan or save them for later.",
    details: [
      "The application provides a clean, dark-themed gym experience where users can browse a workout library, view detailed exercise information, add exercises to today's plan, and manage their saved workouts.",
      "The interface is designed to work smoothly across mobile, tablet, and desktop devices.",
    ],
    technologies: [
      "Next.js",
      "React.js",
      "JavaScript",
      "Tailwind CSS",
      "React Icons",
      "Git & GitHub",
    ],
    image: "/images/projects/fitlog-full-image.png",
    coverImage: "/images/projects/fitlog-full-image.png",
    screenshots: ["/images/projects/fitlog-full-image.png"],
    imageWidth: 1367,
    imageHeight: 3141,
    githubUrl: "https://github.com/muztahid2102232/b14-a6-Fit-Log",
    liveUrl: "https://b14-a6-filog-project.vercel.app/",
    status: "Live",
    featured: true,
    features: [
      "Workout library covering major muscle groups with images, category tags, equipment, duration, calories, and ratings.",
      "Today's Plan supports up to five lifts with exercise count, total workout minutes, and total calories.",
      "Mark workouts as done or remove them, with the navbar Plan counter updating automatically.",
      "Save workouts for later and access them from the My Plan page, with a live Saved counter in the navbar.",
      "Dedicated detail pages show descriptions, difficulty, sets, reps, duration, calories, ratings, and step-by-step instructions.",
      "Add a workout to today's plan or save it directly from its detail page.",
      "Real-time workout metrics show planned exercises, total minutes, and total calories on the My Plan page.",
      "Responsive, dark-themed experience optimized for mobile, tablet, and desktop.",
    ],
  },
  {
    slug: "bazar-dor",
    title: "BazarDor",
    description:
      "A responsive market-price tracking app for comparing everyday essentials in Bangladesh, with daily price movement and secure authentication.",
    summary:
      "A responsive market-price tracking app built with Next.js.",
    overview:
      "BazarDor is a responsive market-price tracking web application focused on everyday essentials in Bangladesh. It helps users compare today's prices with the previous day's prices, identify products whose prices have increased or decreased, and explore prices across different markets.",
    details: [
      "The catalogue covers everyday essentials such as rice, lentils, fish, vegetables, eggs, butter, ginger, and garlic.",
      "Product pages bring together summaries, categories, units, minimum, maximum, and average prices, and market-wise pricing.",
    ],
    technologies: [
      "Next.js",
      "Next.js App Router",
      "TypeScript",
      "Tailwind CSS",
      "Better Auth",
      "react-hot-toast",
    ],
    image: "/images/projects/bazador-full-image.png",
    coverImage: "/images/projects/bazador-full-image.png",
    screenshots: ["/images/projects/bazador-full-image.png"],
    imageWidth: 1367,
    imageHeight: 4214,
    githubUrl: "https://github.com/muztahid2102232/b14-a7-bazar-dor",
    liveUrl: "https://a7-bazar-dor-psi.vercel.app",
    status: "Live",
    featured: true,
    features: [
      "Daily price movement sections highlight products that increased or decreased compared with the previous day.",
      "Browse a catalogue of everyday essentials including rice, lentils, fish, vegetables, eggs, butter, ginger, and garlic.",
      "Product detail pages show summaries, categories, units, minimum, maximum, and average prices, plus market-wise prices.",
      "Browse products by category and sort by default order, lowest price, or highest price.",
      "Email/password authentication plus Google and GitHub social sign-in through Better Auth.",
      "Product details are protected behind login, and signed-in users can update their profile name.",
      "A continuously scrolling price ticker shows product names, prices, and daily changes.",
      "Responsive layouts with loading skeletons, toast feedback, and a friendly 404 page.",
    ],
  },
  {
    slug: "dev-stack",
    title: "Dev Stack",
    description:
      "A responsive single-page app for exploring popular development technologies and assembling a personalized tech stack.",
    summary:
      "A responsive single-page app for exploring technologies and building a custom dev stack.",
    overview:
      "Dev Stack is a modern and responsive web application that helps developers explore popular technologies and build their ideal development stack. Users can browse technologies by category, compare their features, and add selected technologies to a personalized stack.",
    details: [
      "Technologies are organized by category so developers can quickly compare frontend, backend, database, programming language, styling, and DevOps options.",
      "Selected technologies are collected in a personal stack that developers can shape for their own projects.",
    ],
    technologies: [
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "DaisyUI",
      "React-Toastify",
      "Vite",
    ],
    image: "/images/projects/devstack-full-image.png",
    coverImage: "/images/projects/devstack-full-image.png",
    screenshots: ["/images/projects/devstack-full-image.png"],
    imageWidth: 1367,
    imageHeight: 5761,
    githubUrl: "https://github.com/muztahid2102232/b14-a5-DevStack",
    liveUrl: "https://dev-stack-123.netlify.app/",
    status: "Live",
    featured: true,
    features: [
      "Explore technologies across frontend, backend, database, programming language, styling, and DevOps categories, with descriptions, difficulty levels, and ratings.",
      "Build your own stack by selecting technologies and adding them to a personalized collection for your projects.",
      "A clean, responsive interface with technology cards, navigation, and a structured footer that adapts to mobile, tablet, and desktop screens.",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured ?? true);
}

export function getAdjacentProjects(slug: string): {
  previous?: Project;
  next?: Project;
} {
  const currentIndex = projects.findIndex((project) => project.slug === slug);
  if (currentIndex === -1) {
    return {};
  }

  const previous = currentIndex > 0 ? projects[currentIndex - 1] : undefined;
  const next =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : undefined;

  return { previous, next };
}
