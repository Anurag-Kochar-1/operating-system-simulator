import { IMAGE_LOADER_PATH } from "@/constants/loader";
import Image from "next/image";
import React from "react";

export const StudyMaterial = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Image
        src={`https://media1.tenor.com/m/hrqNvsgjQEIAAAAC/trollge-trollge-meme.gif`}
        alt="troll face gif"
        width={500}
        height={500}
        className="h-full w-full"
        placeholder="blur"
        blurDataURL={IMAGE_LOADER_PATH}
      />
    </div>
  );
};
