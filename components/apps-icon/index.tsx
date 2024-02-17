"use client";
import React from "react";
import { useApp } from "@/hooks/store";
import { Button } from "../ui/button";

export const AppsIcon = () => {
  const { apps, addWindow } = useApp();
  const appState = useApp();
  return (
    <div className="flex h-full w-min flex-col items-start justify-start gap-10 p-5">
      {apps?.map((app) => {
        return (
          <Button
            key={app.id}
            onClick={() => {
              addWindow({
                id: app.id,
                title: app.title,
                type: "APP",
              });
            }}
          >
            {app.title}
          </Button>
        );
      })}

      <span onClick={() => console.log(appState)}>LOG STATE</span>
    </div>
  );
};
