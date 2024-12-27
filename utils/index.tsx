import { Icon } from "@/components/ui/icon";
import {
  Calculator,
  Camera,
  File,
  Folder,
  Globe,
  PaintBucket,
} from "lucide-react";

export const getIcon = (icon: "folder" | "file" | "calculator") => {
  switch (icon) {
    case "folder":
      return <Folder size={50} />;
    case "file":
      return <File size={50} />;
    case "calculator":
      return <Calculator size={50} />;
    default:
      return <Folder size={50} />;
  }
};
