import Image from "next/image";
import React from "react";

export const StudyMaterial = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Image
        // src={`https://media1.tenor.com/m/K68RqgZIYnIAAAAC/dog-smile-dog.gif`}
        src={`https://media1.tenor.com/m/hrqNvsgjQEIAAAAC/trollge-trollge-meme.gif`}
        alt="?"
        width={500}
        height={500}
        className="h-full w-full"
      />
    </div>
  );
};
