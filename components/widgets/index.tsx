import React from "react";
import { MusicPlayer } from "./music-player";
import { WeatherWidget } from "./weather";
import { QuoteWidget } from "./quote";

export const Widgets = () => {
  return (
    <div className="mx-auto flex h-full w-[90%] flex-col items-start justify-start gap-10 md:mx-0 md:max-w-sm md:p-2 lg:max-w-md lg:flex-col-reverse lg:justify-between lg:gap-4 lg:p-4">
      <MusicPlayer />
      <QuoteWidget />
      <WeatherWidget />
    </div>
  );
};
