"use client";
import {
  ContextMenuContent,
  ContextMenuItem,
} from "@/components/ui/context-menu";
import { Copy, Image as ImageIcon, RefreshCcw, BarChart } from "lucide-react";
import { useApp } from "@/stores/use-app";
import { APP_TYPES } from "@/constants/app-types.enum";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useSettingsStore } from "@/stores/use-settings";
export const ContextMenuContentOptions = () => {
  const addWindow = useApp((state) => state.addWindow);
  const setActiveSidebarNavTab = useSettingsStore(
    (state) => state.setActiveTab,
  );
  const { copyToClipboard } = useCopyToClipboard();

  return (
    <ContextMenuContent>
      <ContextMenuItem
        onClick={() => {
          setActiveSidebarNavTab({ id: "wallpaper", title: "Wallpaper" });
          addWindow({
            id: "settings",
            title: "Settings",
            type: APP_TYPES.APP,
          });
        }}
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
      <ContextMenuItem
        className="gap-2"
        onClick={() =>
          addWindow({
            id: "task-manager",
            title: "Task Manager",
            type: APP_TYPES.APP,
          })
        }
      >
        <BarChart size={15} />
        Task Manager
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
