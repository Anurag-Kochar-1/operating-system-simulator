"use client";
import { useApp } from "@/hooks/use-app";
import React from "react";
import { Project } from "@/types";

export const ProjectCard = ({ project }: { project: Project }) => {
  const { addWindow } = useApp();
  return (
    <div
      key={project.title}
      className="col-span-full flex flex-col items-start justify-start gap-2 overflow-hidden rounded-lg border-2 hover:cursor-pointer lg:col-span-6"
      onClick={() => {
        addWindow({
          id: project.id,
          title: project.title,
          type: "PROJECT",
        });
      }}
    >
      <div className="aspect-video w-full animate-pulse bg-muted"></div>{" "}
      <div className="flex flex-col items-start justify-start gap-4 p-2 lg:p-4">
        <h4 className="text-lg font-bold text-foreground">
          {project.title}
        </h4>
        <p className="text-sm text-muted-foreground">{project.tagline}</p>
        <div className="flex flex-wrap gap-2 lg:gap-4 pt-4">
          {project?.techStack?.map((item, idx: number) => {
            return (
              <div
                key={idx}
                className="rounded-sm border-2 bg-secondary p-1.5 text-xs font-medium text-secondary-foreground"
              >
                {" "}
                {item.title}{" "}
              </div>
            );
          })}
        </div>{" "}
      </div>
    </div>
  );
};
