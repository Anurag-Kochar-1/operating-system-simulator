import { APP_TYPES } from "@/constants/app-types.enum";
import { ReactNode } from "react";

export type Folder = {
  content: (Folder | TextDocument)[];
  name: string
  createdAt?: Date
  updatedAt?: Date
}

export type TextDocument = {
  content: string
  name: string
  createdAt?: Date
  updatedAt?: Date
}

const nestedFolder: Folder = {
  name: "RootFolder",
  content: [
    {
      name: "Folder1",
      content: [
        {
          name: "Document1.txt",
          content: "This is the content of Document1.",
        } as TextDocument,
        {
          name: "Document2.txt",
          content: "This is the content of Document2.",
        } as TextDocument,
        {
          name: "SubFolder1",
          content: [
            {
              name: "Document3.txt",
              content: "This is the content of Document3 inside SubFolder1.",
            } as TextDocument,
          ],
        } as Folder,
      ],
    } as Folder,
    {
      name: "Folder2",
      content: [
        {
          name: "Document4.txt",
          content: "This is the content of Document4.",
        } as TextDocument,
      ],
    } as Folder,
    {
      name: "Document5.txt",
      content: "This is the content of Document5 in RootFolder.",
    } as TextDocument,
  ],
};


export interface Window {
  id: string;
  title: string;
  type: APP_TYPES;
}

export type IconType = "folder" | "file" | "calculator" | "paint" | "game" | "briefcase" | "sticky-notes" | "browser" | "gear";

export interface App {
  id: string;
  title: string;
  content: JSX.Element | (Folder | File)[];
  isOnDesktop?: boolean;
  icon: IconType
}

export interface ProcessData extends Window {
  status: string;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  networkUsage: number;
  gpuUsage: number;
  gpuEngine: string;
  powerUsage: string;
  powerUsageTrend: 'up' | 'down' | 'stable';
}

export interface Social {
  id: string;
  title: string;
  userName: string;
  url: string;
  icon: string;
}
export interface ProjectGroup {
  id: string;
  title: string;
  projects: Project[];
}

export interface Project {
  title: string;
  tagline: string;
  thumbnail: string;
  images: {
    src: string;
    title: string;
    description?: string;
  }[];
  id: string;
  content: JSX.Element;
  techStack: { title: string }[];
  liveSiteUrl: string;
  sourceCodeUrl: string;
  features: string[];
}
export interface Skill {
  title: string;
  id: string;
  icon: string;
}

export type Song = {
  id?: string;
  title?: string;
  songBy?: string;
  audioSrc?: string;
  thumbnail?: string;
  progress?: number;
  length?: number;
};
export type Blog = {
  id: string;
  title: string;
  thumbnail?: string;
  url: string;
  publishedOn: string;
};

export type Draw = {
  ctx: CanvasRenderingContext2D;
  currentPoint: Point;
  prevPoint: Point | null;
};

export type Point = { x: number; y: number };

export type Wallpaper = {
  name: string;
  url: ReactNode;
  thumbnail: string
  compatibleTheme: "light" | "dark";
};



export type StickyNoteTheme = {
  id: string;
  textColor: string;
  backgroundColor: string;
}