import { Button } from "@/components/ui/button";
import { SKILLS } from "@/config/skills.config";
import React from "react";

export const Skills = () => {
  return (
    <div className="flex w-full flex-wrap items-start justify-start gap-10 overflow-y-auto">
      {SKILLS?.map((skill) => (
        <Button
          key={skill.title}
          onClick={() => {
            alert(skill.title);
          }}
        >
          {" "}
          {skill.title}{" "}
        </Button>
      ))}
    </div>
  );
};
