import { Loader2 } from "lucide-react";
import React, { useState } from "react";

export const ResumeAppContent = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleLoad = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };

  const handleError = (e: React.SyntheticEvent<HTMLIFrameElement, Event>) => {
    console.error("Failed to load resume:", e);
    setIsLoading(false);
  };

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-start overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <Loader2 size={40} className="animate-spin text-blue-500" />
        </div>
      )}
      <iframe
        src="https://docs.google.com/file/d/1wXPzS7NYn4tsVK4vxlXsN1BcmS8tkyvH/preview?usp=sharing"
        className="h-full w-full border-none"
        allowFullScreen
        onLoad={handleLoad}
        onError={handleError}
        title="Resume Preview"
      />
    </div>
  );
};