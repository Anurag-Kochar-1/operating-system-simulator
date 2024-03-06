import { AboutMe } from "@/components/apps/about-me";
import { Contact } from "@/components/apps/contact";
import { Games } from "@/components/apps/games";
import { Projects } from "@/components/apps/projects";
import { Resume } from "@/components/apps/resume";
import { Skills } from "@/components/apps/skills";
import { StudyMaterial } from "@/components/apps/study-material";
import { App } from "@/types";

export const APPS: App[] = [
  {
    id: "skills",
    title: "Skills",
    icon: "🍔",
    content: <Skills />,
  },
  {
    id: "projects",
    title: "Projects",
    icon: "🏭",
    content: <Projects />,
  },
  {
    id: "contact",
    title: "Contact",
    icon: "📪",
    content: <Contact />,
  },
  {
    id: "about",
    title: "About",
    icon: "😎",
    content: <AboutMe />,
  },
  {
    id: "resume",
    title: "Resume",
    icon: "📃",
    content: <Resume />,
  },
  {
    id: "games",
    title: "Games",
    icon: "🎮",
    content: <Games />,
  },
  {
    id: "studyMateral",
    title: "Study Materal",
    icon: "🌝",
    content: <StudyMaterial />,
  },
];
