import { IconType } from "@/types";
import {
  Briefcase,
  Brush,
  Calculator,
  File,
  Folder,
  Gamepad2,
  Globe,
  StickyNote,
} from "lucide-react";

export const getIcon = (icon: IconType) => {
  switch (icon) {
    case "folder":
      return <Folder size={50} />;
    case "file":
      return <File size={50} />;
    case "calculator":
      return <Calculator size={50} />;
    case "paint":
      return <Brush size={50} />;
    case "game":
      return <Gamepad2 size={50} />;
    case "briefcase":
      return <Briefcase size={50} />;
    case "sticky-notes":
      return <StickyNote size={50} />;
    case "browser":
      return <Globe size={50} />;
    default:
      return <Folder size={50} />;
  }
};

export function truncateText(text: string, maxLength: number): string {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}
