import React, { useState } from "react";
import { Loader2 } from "lucide-react";

export const GameAppContent = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = (e: React.SyntheticEvent<HTMLIFrameElement, Event>) => {
    console.error("Failed to load game:", e);
    setIsLoading(false);
  };

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-start overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <Loader2 size={40} className="animate-spin text-blue-500" />
        </div>
      )}
      <iframe
        src="https://cuberun.adamkarlsten.com/"
        className="absolute inset-0 h-full w-full border-none"
        allowFullScreen
        onLoad={handleLoad}
        onError={handleError}
        title="Cube Run Game"
      />
      <a
        href="https://github.com/akarlsten"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-2 left-2 z-10 rounded bg-black bg-opacity-50 px-2 py-1 text-sm font-medium text-white"
      >
        Made by @akarlsten
      </a>
    </div>
  );
};
