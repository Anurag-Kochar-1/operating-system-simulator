import React from "react";

export const UnderConstructionWidget = () => {
  return (
    <div
      className={`mb-4 flex h-min w-full select-none items-center justify-start gap-2 rounded-xl border bg-secondary p-4 shadow-lg transition-all duration-150 ease-in hover:shadow-xl md:mx-0`}
    >
      <span className="text-lg">🚧</span>
      <div className="flex flex-col items-start justify-start">
        <span className="text-base   font-semibold text-foreground">
            This project is under construction.
        </span>
      </div>
    </div>
  );
};
