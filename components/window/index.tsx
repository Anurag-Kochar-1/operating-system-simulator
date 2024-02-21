"use client";
import { useApp } from "@/hooks/use-app";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
  // console.log(`🍎 Window id ${id} rendered`)
  const { focusedWindow, setFocusedWindow, getAppContentById, windows } =
    useApp();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [width, setWidth] = useState(80);
  const [height, setHeight] = useState(75);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const trackPos = (data: any) => {
    setPosition({ x: data.x, y: data.y });
  };

  useEffect(() => {
    if (isDesktop) {
      setPosition({ x: 150, y: 75 });
    }
  }, [isDesktop]);

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
      onDrag={(e, data) => trackPos(data)}
      position={position}
      // defaultPosition={isDesktop ? { x: 150, y: 75 } : { x: 0, y: 0 }}
      // defaultPosition={defaultPosition}
      // positionOffset={isDesktop ? { x: 150, y: 75 } : { x: 0, y: 0 }}
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
        className={`flex-col bg-background 
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
        <div className="flex h-full w-full items-start justify-start overflow-y-auto overflow-x-hidden p-4">
          {getAppContentById({ id, type })}
        </div>
      </div>
    </Draggable>
  );
};

export default React.memo(Window);
