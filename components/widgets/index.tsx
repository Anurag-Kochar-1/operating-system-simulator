import React from "react";
import { MusicPlayer } from "./music-player";
import { UnderConstructionWidget } from "./under-construction-widget";
import { PromotionWidget } from "./promotion-widget";

export const Widgets = () => {
  return (
    <div className="mx-auto flex h-full w-[90%] flex-col items-start justify-start gap-10 md:mx-0 md:max-w-sm md:p-2 lg:max-w-md lg:flex-col-reverse lg:justify-between lg:gap-0 lg:p-4">
      <MusicPlayer />
      <PromotionWidget />
      <UnderConstructionWidget />
    </div>
  );
};
