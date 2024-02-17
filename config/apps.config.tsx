import { AboutMe } from "@/components/apps/about-me";
import { Projects } from "@/components/apps/projects";
import { Skills } from "@/components/apps/skills";
import { App } from "@/types";

export const APPS: App[] = [
  {
    id: "0x",
    title: "Skills",
    icon: "",
    content: <Skills />,
  },
  {
    id: "1x",
    title: "About me",
    icon: "",
    content: <AboutMe />,
  },
  {
    id: "2x",
    title: "Projects",
    icon: "",
    content: <Projects />,
  },
];
