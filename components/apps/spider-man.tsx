import React, { useState, useRef, useEffect } from "react";

export const SpiderManAppContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.08;
    }
  }, []);

  const handleVideoLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        </div>
      )}
      <video
        ref={videoRef}
        className={`h-full ${isLoading ? "hidden" : ""}`}
        autoPlay
        onLoadedData={handleVideoLoad}
      >
        <source
          src="https://utfs.io/f/ffe2617c-957c-4761-8146-e4ce3bec2fb9-nb7uz5.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
};
