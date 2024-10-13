import { PROJECTS_BY_GROUPS } from "@/config/projects.config";
import { ProjectCard } from "./project-card";

export const ProjectsAppContent = () => {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-32">
      {PROJECTS_BY_GROUPS?.map((group) => (
        <div
          key={group.id}
          className="flex flex-col items-start justify-start gap-10"
        >
          <div className="grid w-full auto-rows-auto grid-cols-12 gap-4">
            {group.projects?.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      ))}

      <p className="text-sm font-medium">
        {" "}
        <a
          href="https://anurag-kochar.vercel.app/"
          target="_blank"
          className="text-sky-600 underline hover:text-sky-700"
        >
          Old portfolio
        </a>{" "}
      </p>
    </div>
  );
};
