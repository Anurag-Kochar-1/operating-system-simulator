"use client";
import { memo } from "react";
import { Citrus } from "lucide-react";
import { UserInfo } from "./user-info";
import { useAuth } from "@/store/use-auth";
import { GettingStarted } from "../getting-started";

export const Header = memo(() => {
  const { isAuthenticated } = useAuth();
  return (
    <header className="z-20 flex h-10 items-center justify-between border-b bg-background px-4">
      <Citrus size={20} />

      <div className="flex items-center justify-center gap-2">
        {isAuthenticated ? <UserInfo /> : <GettingStarted />}
      </div>
    </header>
  );
});

Header.displayName = "Header";
