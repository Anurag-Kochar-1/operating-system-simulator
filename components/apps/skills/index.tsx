import { SKILLS } from "@/config/skills.config";
import Image from "next/image";
import React from "react";

export const Skills = () => {
  return (
    <div className="grid w-full auto-rows-auto grid-cols-12 gap-6 md:gap-10 xl:gap-12">
      {SKILLS?.map((skill) => (
        <div
          key={skill.title}
          className="col-span-full sm:col-span-6 flex flex-col items-center justify-center gap-2 md:col-span-4 xl:col-span-2"
        >
          <Image
            src={skill.icon}
            alt={`${skill.title} icon`}
            width={100}
            height={100}
            draggable={false}
            className="aspect-square object-contain"
          />
          <span className="text-center font-semibold">{skill.title}</span>
        </div>
      ))}
    </div>
  );
};
