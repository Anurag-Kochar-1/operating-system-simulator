import { BlogsAppContent } from "@/components/apps/blogs";
import { CalculatorAppContent } from "@/components/apps/calculator";
import { GameAppContent } from "@/components/apps/game";
import { PaintAppContent } from "@/components/apps/paint";
import { ProjectsAppContent } from "@/components/apps/projects";
import { PortfolioAppContent } from "@/components/apps/portfolio";
import { SkillsAppContent } from "@/components/apps/skills";
import { WallpapersAppContent } from "@/components/apps/wallpapers";
import { App } from "@/types";
import { Folder, Gamepad2, PaintBucket, Globe, Calculator } from "lucide-react";
import { StickyNotesAppContent } from "@/components/apps/sticky-note";
import { BrowserAppContent } from "@/components/apps/browser";

export const APPS: App[] = [
  // {
  //   id: "about",
  //   title: "About",
  //   icon: <Folder size={50} />,
  //   content: <AboutMeAppContent />,
  // },
  // {
  //   id: "skills",
  //   title: "Skills",
  //   content: <SkillsAppContent />,
  //   icon: "folder",
  // },
  // {
  //   id: "projects",
  //   title: "Projects",
  //   content: <ProjectsAppContent />,
  //   icon: "folder",
  // },
  {
    id: "portfolio",
    title: "Portfolio",
    content: <PortfolioAppContent />,
    icon: "briefcase",
  },
  // {
  //   id: "games",
  //   title: "Games",
  //   icon: <Folder size={50} />,
  //   content: <GamesAppContent />,
  // },
  // {
  //   id: "blogs",
  //   title: "Blogs",
  //   content: <BlogsAppContent />,
  //   icon: "folder",
  // },
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
    content: <BrowserAppContent />,
    icon: "browser",
  },
  {
    id: "paint",
    title: "Paint",
    content: <PaintAppContent />,
    icon: "paint",
  },
  {
    id: "car-game",
    title: "Game",
    content: <GameAppContent />,
    icon: "game",
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
  {
    id: "sticky-notes",
    title: "Note",
    content: <StickyNotesAppContent />,
    icon: "sticky-notes",
  },
];
