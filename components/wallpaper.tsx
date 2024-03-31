"use client";
import { useApp } from "@/hooks/use-app";

export const Wallpaper = () => {
  const { currentWallpaper } = useApp();
  return currentWallpaper.url;
};
