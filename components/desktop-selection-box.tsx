"use client";

import { useApp } from "@/store/use-app";
import React, { useState, useRef, useCallback, ReactNode, use } from "react";

interface Position {
  x: number;
  y: number;
}

export const DesktopSelectionBox = ({ children }: { children: ReactNode }) => {
  const windows = useApp((state) => state.windows);
  const isWindowDragging = useApp((state) => state.isWindowDragging);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionBox, setSelectionBox] = useState<{
    start: Position;
    end: Position;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMouseDownRef = useRef(false);

  const getRelativePosition = useCallback(
    (e: React.MouseEvent | MouseEvent): Position => {
      if (!containerRef.current) return { x: 0, y: 0 };
      const rect = containerRef.current.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    },
    [],
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0) return;

      isMouseDownRef.current = true;
      const startPos = getRelativePosition(e);
      setSelectionBox({
        start: startPos,
        end: startPos,
      });
      setIsSelecting(true);
    },
    [getRelativePosition],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isMouseDownRef.current || !selectionBox || isWindowDragging) return;

      const currentPos = getRelativePosition(e);
      setSelectionBox((prev) => (prev ? { ...prev, end: currentPos } : null));
    },
    [getRelativePosition, selectionBox, isWindowDragging],
  );

  const handleMouseUp = useCallback(() => {
    isMouseDownRef.current = false;
    setIsSelecting(false);
    setSelectionBox(null);
  }, []);

  const getSelectionBoxStyle = useCallback(() => {
    if (!selectionBox) return {};

    const left = Math.min(selectionBox.start.x, selectionBox.end.x);
    const top = Math.min(selectionBox.start.y, selectionBox.end.y);
    const width = Math.abs(selectionBox.end.x - selectionBox.start.x);
    const height = Math.abs(selectionBox.end.y - selectionBox.start.y);

    return {
      left: `${left}px`,
      top: `${top}px`,
      width: `${width}px`,
      height: `${height}px`,
    };
  }, [selectionBox]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {children}

      {isSelecting && selectionBox && (
        <div
          className="pointer-events-none absolute z-10 border border-blue-500 bg-blue-400/20"
          style={getSelectionBoxStyle()}
        />
      )}
    </div>
  );
};

export default DesktopSelectionBox;
