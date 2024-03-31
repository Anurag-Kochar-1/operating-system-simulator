import { Loader2 } from "lucide-react";
import React, { useState } from "react";

export const ResumeAppContent = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleLoad = () => {
    setIsLoading(false);
  };
  return (
    <div className="flex h-full w-full flex-col items-center justify-start gap-6 overflow-y-auto">
      {isLoading ? (
        <Loader2 size={25} className="mx-auto my-auto animate-spin" />
      ) : null}
      <iframe
        src="https://docs.google.com/file/d/1wXPzS7NYn4tsVK4vxlXsN1BcmS8tkyvH/preview?usp=sharing"
        className="h-full w-full"
        allowFullScreen
        onLoad={handleLoad}
        onError={(e) => alert(e)}
      ></iframe>
    </div>
  );
};
