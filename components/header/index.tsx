"use client";
import { memo } from "react";
import { Banana } from "lucide-react";
import { UserInfo } from "./user-info";
import { useAuth } from "@/store/use-auth";
import { GettingStarted } from "../getting-started";

export const Header = memo(() => {
  const { isAuthenticated } = useAuth();
  return (
    <header className="flex h-10 items-center justify-between border-b bg-background px-4">
      <Banana size={20} />
      {/* <DateTime /> */}

      {isAuthenticated ? <UserInfo /> : <GettingStarted />}
    </header>
  );
});

Header.displayName = "Header";
