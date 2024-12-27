import { IconType } from "@/types";
import {
  Brush,
  Calculator, File,
  Folder,
  Gamepad2
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
      case "game" :
        return <Gamepad2 size={50} />;
    default:
      return <Folder size={50} />;
  }
};
