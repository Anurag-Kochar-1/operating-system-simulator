import React, { useState } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export const StudyMaterial = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleLoad = () => {
    setIsLoading(false);
  };
  return (
    <div className="flex h-full w-full items-center justify-center">
      {isLoading ? (
        <Loader2 size={25} className="mx-auto my-auto animate-spin" />
      ) : null}

      <Image
        // src={`https://media1.tenor.com/m/hrqNvsgjQEIAAAAC/trollge-trollge-meme.gif`}
        src={`https://media1.tenor.com/m/DfSs6KiP6-kAAAAC/akshay-kumar-smile.gif`}
        alt="troll face gif"
        width={500}
        height={500}
        className={`h-full w-full`}
        onLoad={handleLoad}
        onError={(e) => alert(e)}
      />
    </div>
  );
};
