"use client";
import { useApp } from "@/stores/use-app";
import React from "react";
import { Project } from "@/types";
import Image from "next/image";
import { APP_TYPES } from "@/constants/app-types.enum";

export const ProjectCard = ({ project }: { project: Project }) => {
  const { addWindow } = useApp();
  return (
    <div
      key={project.title}
      className="group col-span-full flex flex-col items-start justify-start gap-2 overflow-hidden rounded-lg border-2 transition-all duration-75 ease-in hover:cursor-pointer hover:bg-secondary lg:col-span-6"
      onClick={() => {
        addWindow({
          id: project.id,
          title: project.title,
          type: APP_TYPES.PROJECT,
        });
      }}
    >
      <Image
        src={project.thumbnail}
        alt={`${project.title} thumbnail`}
        width={700}
        height={700}
        className="aspect-video h-full w-full border-b-2"
        draggable={false}
      />
      <div className="flex flex-col items-start justify-start gap-4 p-2 lg:p-4">
        <h4 className="text-lg font-bold text-foreground">{project.title}</h4>
        <p className="text-sm text-muted-foreground">{project.tagline}</p>
        <div className="flex flex-wrap gap-2 pt-4 lg:gap-4">
          {project?.techStack?.map((item, idx: number) => {
            return (
              <div
                key={idx}
                className="rounded-sm border-2 bg-secondary p-1.5 text-xs font-medium text-secondary-foreground group-hover:bg-background"
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
