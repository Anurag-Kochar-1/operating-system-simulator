"use client";
import React, { useEffect } from "react";
import { useApp } from "@/hooks/use-app";
import { Folder } from "lucide-react";

export const AppsIcon = () => {
  const { apps, windows, addWindow, setFocusedWindow } = useApp();

  useEffect(() => {
    const recentlyAddedWindow = windows[windows?.length - 1];
    setFocusedWindow(recentlyAddedWindow);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windows]);

  useEffect(() => {
    const timer = setTimeout(() => {
      addWindow({ id: "0x", title: "About me", type: "APP" });
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex h-[75vh] flex-col flex-wrap items-start justify-start gap-10 p-4 lg:h-[93vh]">
      {apps?.map((app) => {
        return (
          <div
            key={app.id}
            className="w-min flex flex-col items-start justify-start gap-1 text-left hover:cursor-pointer"
            onClick={() => {
              addWindow({
                id: app.id,
                title: app.title,
                type: "APP",
              });
            }}
          >
            <Folder size={50} />
            <span className="text-sm"> {app.title} </span>
          </div>
        );
      })}
    </div>
  );
};
