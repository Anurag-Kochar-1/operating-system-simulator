import { Button } from "@/components/ui/button";
import { ProjectImagesCarousel } from "./images-carousel";
import { PROJECTS_BY_GROUPS } from "@/config/projects.config";
import { Project as ProjectType } from "@/types";
import { Badge } from "@/components/ui/badge";

type Props = {
  id: string;
};

export function Project({ id }: Props) {
  const getProject = (id: string): ProjectType | null => {
    for (const group of PROJECTS_BY_GROUPS) {
      for (const project of group.projects) {
        if (project.id === id) {
          return project;
        }
      }
    }
    return null;
  };
  const project = getProject(id);

  return (
    <div className="flex w-full flex-col items-start justify-start gap-12 py-4">
      <ProjectImagesCarousel images={project?.images || []} />

      {/* ========== Links ========== */}
      <div className="flex w-full items-center justify-center gap-4">
        <a href={project?.sourceCodeUrl} target="_blank">
          <Button variant={"secondary"}>Source code </Button>
        </a>
        <a href={project?.liveSiteUrl} target="_blank">
          <Button>Live Site </Button>
        </a>
      </div>

      {/* ========== Tech stack ========== */}
      <div className="flex flex-col items-start justify-start gap-2">
        <h3 className="text-2xl font-semibold"> Tech stack used </h3>
        <div className="flex flex-wrap items-center justify-start gap-4">
          {project?.techStack?.map((tech) => {
            return (
              <Badge key={tech.title} variant={"secondary"}>
                {" "}
                {tech?.title}{" "}
              </Badge>
            );
          })}
        </div>
      </div>
      {/* ========== Features ========== */}
      <div className="flex flex-col items-start justify-start gap-2">
        <h3 className="text-2xl font-semibold"> Features </h3>
        <ul className="flex list-disc flex-col gap-2 [&>li]:ml-4">
          {project?.features?.map((item) => (
            <li key={item} className="text-muted-foreground">
              {" "}
              {item}{" "}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
