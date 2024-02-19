"use client";
import React from "react";
import { useApp } from "@/hooks/store";
import { Folder } from "lucide-react";

export const AppsIcon = () => {
  const { apps, addWindow } = useApp();
  return (
    <div className="flex h-[93vh] flex-col flex-wrap items-start justify-start gap-10 p-4">
      {apps?.map((app) => {
        return (
          <div
            key={app.id}
            className=" flex flex-col items-start justify-start gap-1 hover:cursor-pointer"
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
