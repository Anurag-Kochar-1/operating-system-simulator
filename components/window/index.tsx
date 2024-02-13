"use client";
import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";

interface WindowProps {
  id: string;
  title: string;
  focusedWindow: any;
  setFocusedWindow: any;
  handleRemoveWindow: (id: string) => void;
}

const Window: React.FC<WindowProps> = (props) => {
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
        onClick={() => props.setFocusedWindow(props.id)}
        style={{ width: `${width}%`, height: `${height}%` }}
        className={`flex-col bg-white 
         ${props.focusedWindow === props.id ? "z-30 bg-blue-400" : "z-20"} 
        opened-window min-w-1/4 min-h-1/4 main-window window-shadow border-blue-500rounded-xl absolute flex overflow-hidden border-4 border-opacity-40`}
        id={props.id}
      >
        <div
          className={
            " bg-ub-window-title relative w-full select-none rounded-b-none border-b-2 border-b-black border-opacity-5 px-3 py-1.5 text-foreground"
          }
        >
          <div className="flex justify-center text-sm font-bold">
            {props.title}
          </div>
        </div>
        {props.title}

        <button onClick={() => props.handleRemoveWindow(props.id)}>
          remove
        </button>
      </div>
    </Draggable>
  );
};

export default Window;
