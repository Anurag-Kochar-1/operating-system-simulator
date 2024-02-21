import React from "react";
import { PROJECTS } from "@/config/projects.config";
import { ProjectCard } from "./project-card";

export const Projects = () => {
  return (
    <div className="grid w-full auto-rows-auto grid-cols-12 gap-4">
      {PROJECTS?.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};
