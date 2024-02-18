"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { PROJECTS } from "@/config/projects.config";
import { useApp } from "@/hooks/store";

export const Projects = () => {
  const { addWindow } = useApp();
  return (
    <div className="flex w-full flex-wrap items-start justify-start gap-10 overflow-y-auto">
      {PROJECTS?.map((project) => (
        <Button
          key={project.title}
          onClick={() => {
            addWindow({
              id: project.id,
              title: project.title,
              type: "PROJECT",
            });
          }}
        >
          {" "}
          {project.title}{" "}
        </Button>
      ))}
    </div>
  );
};
