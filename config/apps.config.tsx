import { AboutMe } from "@/components/apps/about-me";
import { Contact } from "@/components/apps/contact";
import { Games } from "@/components/apps/games";
import { Projects } from "@/components/apps/projects";
import { Skills } from "@/components/apps/skills";
import { StudyMaterial } from "@/components/apps/study-material";
import { App } from "@/types";

export const APPS: App[] = [
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
  {
    id: "3x",
    title: "Contact",
    icon: "📪",
    content: <Contact />,
  },
  {
    id: "0x",
    title: "About",
    icon: "😎",
    content: <AboutMe />,
  },
  {
    id: "4x",
    title: "Games",
    icon: "🎮",
    content: <Games />,
  },
  {
    id: "5x",
    title: "Homework",
    icon: "🌝",
    content: <StudyMaterial />,
  },
];
