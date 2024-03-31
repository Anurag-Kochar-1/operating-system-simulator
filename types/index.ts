import { ReactNode } from "react";

export interface Window {
  id: string;
  title: string;
  type: "APP" | "PROJECT" | "GAME";
}

export interface App {
  id: string;
  title: string;
  icon: ReactNode;
  content: JSX.Element;
  isOnDesktop?: boolean;
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
