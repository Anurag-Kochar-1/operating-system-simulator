"use client";
import React from "react";
import { PROJECTS } from "@/config/projects.config";
import { useApp } from "@/hooks/store";

export const Projects = () => {
  const { addWindow } = useApp();
  return (
    <div className="grid w-full auto-rows-auto grid-cols-12 gap-6 md:gap-10 xl:gap-12">
      {PROJECTS?.map((project) => (
        <div
          key={project.title}
          className="col-span-full flex flex-col items-start justify-start gap-2 overflow-hidden rounded-lg border-2 hover:cursor-pointer lg:col-span-6 xl:col-span-4"
          onClick={() => {
            addWindow({
              id: project.id,
              title: project.title,
              type: "PROJECT",
            });
          }}
        >
          <div className="aspect-video w-full animate-pulse bg-primary"></div>{" "}
          <div className="flex flex-col items-start justify-start gap-4 p-2 lg:p-4">
            <span className="text-lg font-bold text-foreground">
              {project.title}
            </span>
            <p className="text-sm text-muted-foreground">{project.tagline}</p>
            <div className="flex flex-wrap gap-2 lg:gap-4">
              {project?.techStack?.map((item, idx: number) => {
                return (
                  <div
                    key={idx}
                    className="rounded-sm border-2 bg-secondary p-2 text-sm font-medium text-secondary-foreground lg:p-2"
                  >
                    {" "}
                    {item.title}{" "}
                  </div>
                );
              })}
            </div>{" "}
          </div>
        </div>
      ))}
    </div>
  );
};
