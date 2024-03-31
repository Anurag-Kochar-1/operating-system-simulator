"use client";
import React from "react";
import {
  ContextMenuContent,
  ContextMenuItem,
} from "@/components/ui/context-menu";
import { useTheme } from "next-themes";
import { Image, Moon, RefreshCcw, Sun } from "lucide-react";
import { useApp } from "@/hooks/use-app";
export const ContextMenuContentOptions = () => {
  const { addWindow } = useApp();
  const { theme, setTheme } = useTheme();
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
          addWindow({ id: "wallpapers", title: "Wallpapers", type: "APP" })
        }
        className="gap-2"
      >
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image size={15} />
        Change wallpaper
      </ContextMenuItem>
      <ContextMenuItem className="gap-2">
        <RefreshCcw size={15} />
        Refresh
      </ContextMenuItem>
    </ContextMenuContent>
  );
};
