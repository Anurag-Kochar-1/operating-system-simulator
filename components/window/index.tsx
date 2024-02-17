"use client";
import { useApp } from "@/hooks/store";
import { X } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { Button } from "../ui/button";
import { APP_TYPES } from "../constants/app-types.enum";

interface WindowProps {
  id: string;
  title: string;
  type: APP_TYPES
}

const Window: React.FC<WindowProps> = (props) => {
  const { focusedWindow, setFocusedWindow, removeWindow, getAppContentById } =
    useApp();
  const [width, setWidth] = useState(60);
  const [height, setHeight] = useState(85);

  return (
    <Draggable
      axis="both"
      handle=".bg-ub-window-title"
      grid={[1, 1]}
      scale={1}
      allowAnyClick={false}
      defaultPosition={{ x: 60, y: 10 }}
      bounds="parent"
    >
      <div
        onClick={() => setFocusedWindow({ id: props.id, title: props.title, type: props.type })}
        style={{ width: `${width}%`, height: `${height}%` }}
        className={`flex-col bg-white 
         ${focusedWindow?.id === props.id ? "z-30 bg-blue-400" : "z-20"} 
        opened-window min-w-1/4 min-h-1/4 absolute flex overflow-hidden rounded-lg border-2 shadow-lg`}
        id={props.id}
      >
        {/* ========== Top bar ========== */}
        <div
          className={
            "bg-ub-window-title relative flex h-14 w-full select-none items-center justify-between rounded-b-none border-b-4 border-b-black border-opacity-5 px-3 py-1.5 text-foreground"
          }
        >
          <h2 className="mx-auto text-sm font-bold">{props.title}</h2>

          <Button
            onClick={() => removeWindow(props.id)}
            size={"icon"}
            variant={"destructive"}
            className="h-7 w-7"
          >
            <X size={15} />
          </Button>
        </div>
        {/* ========== Content ========== */}
        <div className="p-4">
          {getAppContentById({ id: props.id, type: props.type })}
        </div>
      </div>
    </Draggable>
  );
};

export default Window;
