import { Icon } from "@/components/ui/icon";
import { Camera, File, Folder, Globe, PaintBucket } from "lucide-react";

export const getIcon = (icon: "folder" | "file") => {
  switch (icon) {
    case "folder":
      return <Folder size={50} />;
    case "file":
      return <File size={50} />;
    default:
      return <Folder size={50} />;
  }
};
