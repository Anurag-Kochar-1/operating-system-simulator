"use client";
import { memo } from "react";
import { Citrus } from "lucide-react";
import { UserInfo } from "./user-info";
import { useAuth } from "@/store/use-auth";
import { GettingStarted } from "../getting-started";
import { useApp } from "@/store/use-app";

export const Header = memo(() => {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const isWindowDragging = useApp((state) => state.isWindowDragging);
  return (
    <header className="z-20 flex h-10 items-center justify-between border-b bg-background px-4">
      <Citrus size={20} />
      {isWindowDragging ? "Dragging" : "Not dragging"}

      <div className="flex items-center justify-center gap-2">
        {isAuthenticated ? <UserInfo /> : <GettingStarted />}
      </div>
    </header>
  );
});

Header.displayName = "Header";
