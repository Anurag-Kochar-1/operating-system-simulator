"use client";
import { useApp } from "@/hooks/store";
import React, { useState } from "react";
import Draggable from "react-draggable";
import { APP_TYPES } from "../constants/app-types.enum";
import useMediaQuery from "@/hooks/use-media-query";
import { Topbar } from "./top-bar";

interface WindowProps {
  id: string;
  title: string;
  type: APP_TYPES;
}

const Window: React.FC<WindowProps> = ({ id, title, type }) => {
  const { focusedWindow, setFocusedWindow, getAppContentById } = useApp();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [width, setWidth] = useState(60);
  const [height, setHeight] = useState(70);

  return (
    <Draggable
      axis="both"
      handle=".window-top-bar"
      cancel=".btn-cancel"
      grid={[1, 1]}
      scale={1}
      allowAnyClick={false}
      bounds="parent"
      disabled={!isDesktop}
    >
      <div
        onClick={() =>
          setFocusedWindow({
            id,
            title,
            type,
          })
        }
        style={{
          width: `${!isDesktop ? 100 : width}%`,
          height: `${!isDesktop ? 100 : height}%`,
        }}
        className={`myElement flex-col bg-background 
         ${focusedWindow?.id === id ? "z-30" : "z-20"} 
        opened-window min-w-1/4 min-h-1/4 absolute flex overflow-hidden rounded-lg border-2 shadow-lg`}
      >
        <Topbar
          id={id}
          setHeight={setHeight}
          width={width}
          setWidth={setWidth}
          title={title}
        />

        {/* ========== Content ========== */}
        <div className="flex h-full w-full items-start justify-start p-4 overflow-y-auto overflow-x-hidden">
          {getAppContentById({ id, type })}
        </div>
      </div>
    </Draggable>
  );
};

export default Window;
