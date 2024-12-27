"use client";
import {
  ContextMenuContent,
  ContextMenuItem,
} from "@/components/ui/context-menu";
import { useTheme } from "next-themes";
import { Copy, Image as ImageIcon, Moon, RefreshCcw, Sun } from "lucide-react";
import { useApp } from "@/store/use-app";
import { APP_TYPES } from "@/constants/app-types.enum";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
export const ContextMenuContentOptions = () => {
  const addWindow = useApp((state) => state.addWindow);
  const { theme, setTheme } = useTheme();
  const { copyToClipboard } = useCopyToClipboard();
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <ContextMenuContent>
      <ContextMenuItem onClick={toggleTheme} className="gap-2">
        {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
        Use {theme === "light" ? "dark" : "light"} mode
      </ContextMenuItem>
      <ContextMenuItem
        onClick={() =>
          addWindow({
            id: "wallpapers",
            title: "Wallpapers",
            type: APP_TYPES.APP,
          })
        }
        className="gap-2"
      >
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <ImageIcon size={15} />
        Change wallpaper
      </ContextMenuItem>
      <ContextMenuItem
        className="gap-2"
        onClick={() => window.location.reload()}
      >
        <RefreshCcw size={15} />
        Refresh
      </ContextMenuItem>
      <ContextMenuItem
        className="gap-2"
        onClick={() => copyToClipboard(window.location.href)}
      >
        <Copy size={15} />
        Share
      </ContextMenuItem>
      {/* <ContextMenuSub>
        <ContextMenuSubTrigger className="gap-2">
          <Plus size={15} />
          Add
        </ContextMenuSubTrigger>
        <ContextMenuSubContent className="w-48">
          <ContextMenuItem onClick={addFolder}>Folder</ContextMenuItem>
          <ContextMenuItem onClick={addFile}>Text Document</ContextMenuItem>
        </ContextMenuSubContent>
      </ContextMenuSub> */}
    </ContextMenuContent>
  );
};
