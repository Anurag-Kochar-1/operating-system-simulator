import { PROJECTS_BY_GROUPS } from "@/config/projects.config";
import { ProjectCard } from "./project-card";

export const Projects = () => {
  return (
    <div className="flex flex-col justify-start items-start w-full gap-32">
      {PROJECTS_BY_GROUPS?.map((group) => (
        <div
          key={group.id}
          className="flex flex-col items-start justify-start gap-10"
        >
          <h3 className="font-bold text-xl md:text-2xl lg:text-4xl"> {group.title} </h3>
          <div className="grid w-full auto-rows-auto grid-cols-12 gap-4">
            {group.projects?.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
