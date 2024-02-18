export interface Window {
  id: string;
  title: string;
  type: "APP" | "PROJECT" | "GAME";
}

export interface App {
  id: string;
  title: string;
  icon: string;
  content: JSX.Element;
}

export interface Project {
  title: string;
  id: string;
  content: JSX.Element;
}
export interface Skill {
  title: string;
  id: string;
  icon: string;
}
