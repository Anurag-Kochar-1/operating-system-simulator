import React from "react";

export const GameAppContent = () => {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-start gap-6 overflow-y-auto">
      <iframe
        src="https://cuberun.adamkarlsten.com/"
        className="absolute inset-0 h-full w-full"
        allowFullScreen
      ></iframe>{" "}
      <a
        href="https://github.com/akarlsten"
        target="_blank"
        className="absolute bottom-0 left-0 z-10 text-sm font-medium text-background"
      >
        Made by @akarlsten
      </a>
    </div>
  );
};
