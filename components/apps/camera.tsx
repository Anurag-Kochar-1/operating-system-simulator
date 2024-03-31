import React, { useState } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export const CameraAppContent = () => {
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
        src={`https://wallpaperaccess.com/full/6999296.jpg`}
        alt="literally-me"
        width={500}
        height={500}
        className={`h-full w-full`}
        onLoad={handleLoad}
        onError={(e) => alert(e)}
      />
    </div>
  );
};
