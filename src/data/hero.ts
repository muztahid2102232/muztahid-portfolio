/**
 * Hero content and asset configuration.
 *
 * Asset paths are relative to the `public` directory. The hero checks for them
 * on the server, so a missing file never produces a broken image request or a
 * broken download link.
 */
export const heroContent = {
  greeting: "Hi, I'm",
  introduction:
    "I'm an aspiring Full-Stack Developer passionate about building modern, responsive, and user-friendly web applications. I'm continuously developing my skills in frontend and backend technologies while gaining practical experience through hands-on projects.",
  tagline:
    "Building meaningful digital experiences, one line of code at a time.",
  primaryCta: {
    label: "Explore My Projects",
    sectionId: "projects",
  },
  cv: {
    label: "Download Resume",
    href: "/cv.pdf",
  },
  profileImage: {
    src: "/images/profile/Muztahid_image.jpg",
    alt: "Portrait of Md. Muztahid Hossain",
  },
} as const;
