import { BlogsAppContent } from "@/components/apps/blogs";
import { CalculatorAppContent } from "@/components/apps/calculator";
import { GameAppContent } from "@/components/apps/game";
import { PaintAppContent } from "@/components/apps/paint";
import { ProjectsAppContent } from "@/components/apps/projects";
import { ResumeAppContent } from "@/components/apps/resume";
import { SkillsAppContent } from "@/components/apps/skills";
import { WallpapersAppContent } from "@/components/apps/wallpapers";
import { App } from "@/types";
import { Folder, Gamepad2, PaintBucket, Globe, Calculator } from "lucide-react";

export const APPS: App[] = [
  // {
  //   id: "about",
  //   title: "About",
  //   icon: <Folder size={50} />,
  //   content: <AboutMeAppContent />,
  // },
  {
    id: "skills",
    title: "Skills",
    content: <SkillsAppContent />,
    icon: "folder",
  },
  {
    id: "projects",
    title: "Projects",
    content: <ProjectsAppContent />,
    icon: "folder",
  },
  {
    id: "resume",
    title: "Resume",
    content: <ResumeAppContent />,
    icon: "file",
  },
  // {
  //   id: "games",
  //   title: "Games",
  //   icon: <Folder size={50} />,
  //   content: <GamesAppContent />,
  // },
  {
    id: "blogs",
    title: "Blogs",
    content: <BlogsAppContent />,
    icon: "folder",
  },
  // {
  //   id: "camera",
  //   title: "Camera",
  //   icon: <Camera size={50} />,
  //   content: <CameraAppContent />,
  // },
  {
    id: "browser",
    title: "Browser",
    // content: <Browser />
    content: (
      <iframe
        src={"https://www.google.com/webhp?igu=1"}
        className="h-full w-full"
        id="chrome-screen"
        title="chrome-url"
      ></iframe>
    ),
    icon: "folder",
  },
  {
    id: "paint",
    title: "Paint",
    content: <PaintAppContent />,
    icon: "folder",
  },
  {
    id: "car-game",
    title: "Game",
    content: <GameAppContent />,
    icon: "folder",
  },
  // {
  //   id: "studyMateral",
  //   title: "Study Materal",
  //   icon: <Folder size={50} />,
  //   content: <StudyMaterialAppContent />,
  // },
  {
    id: "wallpapers",
    title: "Wallpapers",
    content: <WallpapersAppContent />,
    icon: "folder",
    isOnDesktop: false,
  },
  {
    id: "calculator",
    title: "Calculator",
    content: <CalculatorAppContent />,
    icon: "calculator",
  },
];
