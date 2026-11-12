import {
  siJavascript,
  siNextdotjs,
  siNodedotjs,
  siReact,
  siTypescript,
} from "simple-icons";

import { HeroContent } from "@/components/sections/hero-content";
import { heroContent } from "@/data/hero";
import { publicAssetExists } from "@/lib/public-assets";
import type { HeroTechnology } from "@/types/hero";

/**
 * Official Simple Icons path data. The icons are resolved on the server so the
 * client bundle only receives a handful of path strings.
 */
const technologies: HeroTechnology[] = [
  {
    name: "React.js",
    path: siReact.path,
    iconClassName: "text-[#087ea4] dark:text-[#61dafb]",
  },
  {
    name: "Next.js",
    path: siNextdotjs.path,
    iconClassName: "text-foreground",
  },
  {
    name: "JavaScript",
    path: siJavascript.path,
    iconClassName: "text-[#a88900] dark:text-[#f7df1e]",
  },
  {
    name: "TypeScript",
    path: siTypescript.path,
    iconClassName: "text-[#3178c6] dark:text-[#6aa9e9]",
  },
  {
    name: "Node.js",
    path: siNodedotjs.path,
    iconClassName: "text-[#3f8b3b] dark:text-[#5fa04e]",
  },
];

export function HeroSection() {
  const hasProfileImage = publicAssetExists(heroContent.profileImage.src);
  const hasCv = publicAssetExists(heroContent.cv.href);

  return (
    <HeroContent
      hasCv={hasCv}
      hasProfileImage={hasProfileImage}
      technologies={technologies}
    />
  );
}
