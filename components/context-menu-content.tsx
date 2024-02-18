"use client";
import React from "react";

import {
  ContextMenuContent,
  ContextMenuItem,
} from "@/components/ui/context-menu";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
export const ContextMenuContentOptions = () => {
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
        {theme === "light" ? <Moon  size={15}/> : <Sun size={15} />}
        Use {theme === "light" ? "dark" : "light"} mode
      </ContextMenuItem>
    </ContextMenuContent>
  );
};
