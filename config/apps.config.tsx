import { AboutMe } from "@/components/apps/about-me";
import { Projects } from "@/components/apps/projects";
import { Skills } from "@/components/apps/skills";
import { App } from "@/types";

export const APPS: App[] = [
  {
    id: "0x",
    title: "About",
    icon: "😎",
    content: <AboutMe />,
  },
  {
    id: "1x",
    title: "Skills",
    icon: "🍔",
    content: <Skills />,
  },
  {
    id: "2x",
    title: "Projects",
    icon: "🏭",
    content: <Projects />,
  },
];
