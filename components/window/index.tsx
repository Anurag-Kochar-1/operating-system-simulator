"use client";
import { useApp } from "@/hooks/use-app";
import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { APP_TYPES } from "../../constants/app-types.enum";
import useMediaQuery from "@/hooks/use-media-query";
import { Topbar } from "./top-bar";
import { motion } from "framer-motion";

interface WindowProps {
  id: string;
  title: string;
  type: APP_TYPES;
}

interface WindowState {
  isMaximized: boolean;
  previousPosition: { x: number; y: number };
  previousSize: { width: number; height: number };
}

const Window: React.FC<WindowProps> = ({ id, title, type }) => {
  const { focusedWindow, setFocusedWindow, getAppContentById } = useApp();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [width, setWidth] = useState(80);
  const [height, setHeight] = useState(75);
  const [windowState, setWindowState] = useState<WindowState>({
    isMaximized: false,
    previousPosition: { x: 0, y: 0 },
    previousSize: { width: 80, height: 75 },
  });
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  function getRandomPair(): { x: number; y: number } {
    const minX = 75;
    const maxX = 150;
    const minY = 25;
    const maxY = 100;

    const randomX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    const randomY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;

    return { x: randomX, y: randomY };
  }

  useEffect(() => {
    if (isDesktop) {
      setPosition(getRandomPair());
    }
  }, [isDesktop]);

  const handleMaximizeToggle = () => {
    if (!windowState.isMaximized) {
      setWindowState((prev) => ({
        ...prev,
        isMaximized: true,
        previousPosition: position,
        previousSize: { width, height },
      }));
      setWidth(100);
      setHeight(100);
      setPosition({ x: 0, y: 0 });
    } else {
      setWidth(windowState.previousSize.width);
      setHeight(windowState.previousSize.height);
      setPosition(windowState.previousPosition);
      setWindowState((prev) => ({
        ...prev,
        isMaximized: false,
      }));
    }
  };

  return (
    <Draggable
      handle=".window-top-bar"
      cancel=".btn-cancel"
      bounds="parent"
      position={windowState.isMaximized ? { x: 0, y: 0 } : position}
      onStop={(_, data) => setPosition({ x: data.x, y: data.y })}
      disabled={windowState.isMaximized}
    >
      <div
        style={{
          position: "absolute",
          width: `${!isDesktop ? 100 : width}%`,
          height: `${!isDesktop ? 100 : height}%`,
        }}
        onClick={() => setFocusedWindow({ id, title, type })}
        className={`
          flex flex-col bg-background
          ${focusedWindow?.id === id ? "z-30" : "z-20"} 
          ${windowState.isMaximized ? "rounded-none" : "rounded-lg"}
          border-2 border-border
        `}
      >
        <Topbar
          id={id}
          setHeight={setHeight}
          width={width}
          setWidth={setWidth}
          title={title}
          onMaximizeToggle={handleMaximizeToggle}
          isMaximized={windowState.isMaximized}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            opacity: { duration: 0.15 },
            scale: { duration: 0.2, ease: [0.4, 0.0, 0.2, 1] }, // Smooth, no bounce
          }}
          className="flex h-full w-full items-start justify-start overflow-y-auto overflow-x-hidden p-4"
        >
          {getAppContentById({ id, type })}
        </motion.div>
      </div>
    </Draggable>
  );
};

export default React.memo(Window);
