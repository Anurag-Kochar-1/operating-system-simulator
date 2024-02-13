import { useApp } from "@/hooks/store";
import React from "react";

export const Apps = () => {
  const { apps, addWindow } = useApp();
  return (
    <div className="flex flex-col gap-10">
      {apps?.map((app) => {
        return (
          <div
            key={app.id}
            className="aspect-square border-black text-center"
            onClick={() =>
              addWindow({
                id: app.id,
                title: app.title,
              })
            }
          >
            {app.title}
          </div>
        );
      })}
    </div>
  );
};
