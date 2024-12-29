import { CalculatorAppContent } from "@/components/apps/calculator";
import { GameAppContent } from "@/components/apps/game";
import { PaintAppContent } from "@/components/apps/paint";
import { PortfolioAppContent } from "@/components/apps/portfolio";
import { App } from "@/types";
import { StickyNotesAppContent } from "@/components/apps/sticky-note";
import { BrowserAppContent } from "@/components/apps/browser";
import { TaskManagerAppContent } from "@/components/apps/task-manager";
import { SettingsAppContent } from "@/components/apps/settings";

export const APPS: App[] = [
  {
    id: "portfolio",
    title: "Portfolio",
    content: <PortfolioAppContent />,
    icon: "briefcase",
  },
  {
    id: "browser",
    title: "Browser",
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
  // {
  //   id: "task-manager",
  //   title: "Task Manager",
  //   content: <TaskManagerAppContent />,
  //   icon: "file",
  //   isOnDesktop: false,
  // },
  {
    id: "settings",
    title: "Settings",
    content: <SettingsAppContent />,
    icon: "gear",
  },
];
