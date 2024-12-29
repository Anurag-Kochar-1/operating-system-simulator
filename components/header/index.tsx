"use client";
import { memo, use } from "react";
import { Citrus } from "lucide-react";
import { UserInfo } from "./user-info";
import { useAuth } from "@/stores/use-auth";
import { GettingStarted } from "../getting-started";
import { Skeleton } from "../ui/skeleton";

export const Header = memo(() => {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const isAuthLoading = useAuth((state) => state.isLoading);
  return (
    <header className="z-20 flex h-10 items-center justify-between border-b bg-background px-4">
      <Citrus size={20} />

      <div className="flex items-center justify-center gap-2">
        {isAuthLoading ? (
          <Skeleton className="h-7 w-28 rounded-md" />
        ) : isAuthenticated ? (
          <UserInfo />
        ) : (
          <GettingStarted />
        )}
      </div>
    </header>
  );
});

Header.displayName = "Header";
