"use client";
import { useApp } from "@/hooks/store";
import { X } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { Button } from "../ui/button";
import { APP_TYPES } from "../constants/app-types.enum";
import { BackgroundGradient } from "../ui/background-gradient";

interface WindowProps {
  id: string;
  title: string;
  type: APP_TYPES;
}

const Window: React.FC<WindowProps> = (props) => {
  const { focusedWindow, setFocusedWindow, removeWindow, getAppContentById } =
    useApp();
  const [width, setWidth] = useState(60);
  const [height, setHeight] = useState(85);

  const handleSomething = (e: any) => {
    console.log(e);
  };

  return (
    <Draggable
      axis="both"
      handle=".bg-ub-window-title"
      cancel=".btn-cancel"
      grid={[1, 1]}
      scale={1}
      allowAnyClick={false}
      defaultPosition={{ x: 250, y: 50 }}
      bounds="parent"
    >
      <div
        onClick={() =>
          setFocusedWindow({
            id: props.id,
            title: props.title,
            type: props.type,
          })
        }
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

          <div className="flex items-center justify-center gap-2">
            <Button
              onClick={() => {
                console.log(`clicked`);
                removeWindow(props.id);
              }}
              size={"icon"}
              variant={"destructive"}
              className="btn-cancel"
            >
              <X size={15} />
            </Button>
            <Button
              onClick={() => {
                if (width === 100 && height === 100) {
                  setWidth(50);
                  setHeight(50);
                } else {
                  setWidth(100);
                  setHeight(100);
                }
              }}
              size={"icon"}
              variant={"outline"}
            >
              m
            </Button>
          </div>
        </div>
        {/* ========== Content ========== */}
        <div className="flex h-full w-full items-start justify-start p-4">
          {getAppContentById({ id: props.id, type: props.type })}
        </div>
      </div>
    </Draggable>
  );
};

export default Window;
