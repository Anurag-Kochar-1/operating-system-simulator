import { WALLPAPERS } from "@/config/wallpapers.config";
import Image from "next/image";
import React from "react";

export const WallpapersAppContent = () => {
  return (
    <div className="grid w-full auto-rows-auto grid-cols-12 gap-4">
      {WALLPAPERS?.map((item) => (
        <Image
          src={item.thumbnail}
          key={item.name}
          onClick={() => alert("Feature in progress :)")}
          className="col-span-full flex aspect-video h-full w-full flex-col items-start justify-start gap-2 overflow-hidden rounded-lg border-2 object-cover hover:cursor-pointer lg:col-span-6"
          width={450}
          height={450}
          alt={`wallpaper`}
        />
      ))}
    </div>
  );
};
