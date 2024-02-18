"use client";
import { useApp } from "@/hooks/store";
import { X } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { Button } from "../ui/button";
import { APP_TYPES } from "../constants/app-types.enum";
import { BackgroundGradient } from "../ui/background-gradient";
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
      handle=".bg-ub-window-title"
      cancel=".btn-cancel"
      grid={[1, 1]}
      scale={1}
      allowAnyClick={false}
      bounds="parent"
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
        <div className="flex h-full w-full items-start justify-start p-4">
          {getAppContentById({ id, type })}
        </div>
      </div>
    </Draggable>
  );
};

export default Window;
