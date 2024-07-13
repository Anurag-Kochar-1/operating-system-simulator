import React, { useState } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export const StudyMaterialAppContent = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error("Image failed to load:", e);
    setIsLoading(false);
  };

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 size={40} className="animate-spin text-blue-500" />
        </div>
      )}
      <Image
        src="https://media1.tenor.com/m/DfSs6KiP6-kAAAAC/akshay-kumar-smile.gif"
        alt="Akshay Kumar smiling gif"
        width={500}
        height={500}
        className={`h-full w-full object-cover ${isLoading ? "invisible" : ""}`}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
};
