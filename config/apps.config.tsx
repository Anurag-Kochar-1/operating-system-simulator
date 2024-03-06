import { AboutMe } from "@/components/apps/about-me";
import { Contact } from "@/components/apps/contact";
import { Games } from "@/components/apps/games";
import { Projects } from "@/components/apps/projects";
import { Resume } from "@/components/apps/resume";
import { Skills } from "@/components/apps/skills";
import { StudyMaterial } from "@/components/apps/study-material";
import { App } from "@/types";
import { Folder } from "lucide-react";

export const APPS: App[] = [
  {
    id: "skills",
    title: "Skills",
    icon: <Folder size={50} />,
    content: <Skills />,
  },
  {
    id: "projects",
    title: "Projects",
    icon: <Folder size={50} />,
    content: <Projects />,
  },
  {
    id: "contact",
    title: "Contact",
    icon: <Folder size={50} />,
    content: <Contact />,
  },
  {
    id: "about",
    title: "About",
    icon: <Folder size={50} />,
    content: <AboutMe />,
  },
  {
    id: "resume",
    title: "Resume",
    icon: <Folder size={50} />,
    content: <Resume />,
  },
  {
    id: "games",
    title: "Games",
    icon: <Folder size={50} />,
    content: <Games />,
  },
  {
    id: "studyMateral",
    title: "Study Materal",
    icon: <Folder size={50} />,
    content: <StudyMaterial />,
  },
];
