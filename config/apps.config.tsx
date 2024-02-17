import { AboutMe } from "@/components/apps/about-me";
import { Projects } from "@/components/apps/projects";
import { Skills } from "@/components/apps/skills";
import { App } from "@/types";

export const APPS: App[] = [
  {
    id: "0x",
    title: "About me",
    icon: "xAx",
    content: <AboutMe />,
  },
  {
    id: "1x",
    title: "Skills",
    icon: "xSx",
    content: <Skills />,
  },
  {
    id: "2x",
    title: "Projects",
    icon: "xPx",
    content: <Projects />,
  },
];
