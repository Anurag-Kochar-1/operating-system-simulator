"use client";
import { memo } from "react";
import { Citrus, Search } from "lucide-react";
import { UserInfo } from "./user-info";
import { useAuth } from "@/stores/use-auth";
import { GettingStarted } from "../getting-started";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { useApp } from "@/stores/use-app";
import { cn } from "@/lib/utils";

export const Header = memo(() => {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  const isAuthLoading = useAuth((state) => state.isLoading);
  const setIsSearchCommandOpen = useApp(
    (state) => state.setIsSearchCommandOpen,
  );
  return (
    <header className="z-20 flex h-10 items-center justify-between border-b bg-background px-4">
      <Citrus size={20} />

      <div className="flex items-center justify-center gap-2">
        {isAuthLoading ? (
          <Skeleton className="h-7 w-28 rounded-md" />
        ) : isAuthenticated ? (
          <>
            <Button
              variant={"outline"}
              size={"icon"}
              className="h-7 w-7 md:hidden"
              onClick={() => setIsSearchCommandOpen(true)}
            >
              <Search size={15} />
            </Button>
            <Button
              variant="outline"
              className={cn(
                "relative hidden h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:flex md:w-40 lg:w-56 xl:w-64",
              )}
              onClick={() => setIsSearchCommandOpen(true)}
            >
              <span className="inline-flex ">Search...</span>
              <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                <span className="text-xs">⌘</span>J
              </kbd>
            </Button>

            <UserInfo />
          </>
        ) : (
          <GettingStarted />
        )}
      </div>
    </header>
  );
});

Header.displayName = "Header";
