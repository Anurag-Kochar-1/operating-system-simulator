"use client";
import React, { memo, useEffect, useState } from "react";
import { useApp } from "@/hooks/use-app";
import { App as AppType } from "@/types";
import { cn } from "@/lib/utils";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

export const AllApps = () => {
  const { apps, windows, addWindow, setFocusedWindow } = useApp();
  useEffect(() => {
    const recentlyAddedWindow = windows[windows?.length - 1];
    setFocusedWindow(recentlyAddedWindow);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windows]);
  return (
    // <div className="flex h-full w-[90%] flex-wrap items-start justify-start gap-10 px-8 py-6 md:h-[93vh] md:w-min md:flex-col bg-green-900">
    <div className="flex h-full w-full flex-wrap items-start justify-start gap-10 px-8 py-6 md:h-[89vh] md:w-min md:flex-col">
      {apps
        ?.filter((app) => app.isOnDesktop === undefined || false)
        ?.map((app) => {
          return <App key={app.id} app={app} />;
        })}
    </div>
  );
};

const App = memo(({ app }: { app: Omit<AppType, "content"> }) => {
  const selectedAppId = useApp((state) => state.selectedAppId);
  const setSelectedAppId = useApp((state) => state.setSelectedAppId);

  const { addWindow } = useApp();

  return (
    <ContextMenu
      onOpenChange={() => {
        setSelectedAppId(app.id);
      }}
    >
      <ContextMenuTrigger>
        {" "}
        <div
          key={app.id}
          className={cn(
            "flex w-min select-none flex-col items-start justify-start gap-1 border-2 border-transparent p-2 text-left transition-all duration-100 ease-in hover:cursor-pointer",
            {
              "rounded-sm border-2 border-blue-400 bg-blue-400 bg-opacity-50":
                selectedAppId === app.id,
            },
          )}
          onClick={() => {
            setSelectedAppId(app.id);
          }}
          onDoubleClick={() => {
            if (selectedAppId === app.id) {
              addWindow({
                id: app.id,
                title: app.title,
                type: "APP",
              });
              setSelectedAppId(null);
            }
          }}
        >
          {app.icon}
          <span className="text-sm"> {app.title} </span>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          onClick={() => {
            addWindow({
              id: app.id,
              title: app.title,
              type: "APP",
            });
            setSelectedAppId(null);
          }}
        >
          Open
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
});

App.displayName = "App";
