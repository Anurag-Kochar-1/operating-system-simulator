"use client";

import { forwardRef, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { usePaintStore } from "@/store/use-paint";

export const Canvas = forwardRef<HTMLCanvasElement>((_, ref) => {
  const { theme } = useTheme();
  const setColor = usePaintStore((state) => state.actions.setColor);
  const startPoint = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastDrawnState = useRef<ImageData | null>(null);

  const {
    tool,
    color,
    brushSize,
    isDrawing,
    history,
    historyIndex,
    actions: { setIsDrawing, addToHistory },
  } = usePaintStore();

  useEffect(() => {
    const canvas = (ref as React.RefObject<HTMLCanvasElement>).current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      ctx.fillStyle = theme === "dark" ? "#020817" : "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Restore drawing after resize if there's history
      if (history.length > 0 && historyIndex >= 0) {
        ctx.putImageData(history[historyIndex], 0, 0);
      }
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    if (history.length === 0) {
      const initialState = ctx.getImageData(0, 0, canvas.width, canvas.height);
      addToHistory(initialState);
    }

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, [ref, theme, history, historyIndex, addToHistory]);

  useEffect(() => {
    const canvas = (ref as React.RefObject<HTMLCanvasElement>).current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || history.length === 0) return;

    const currentDrawing = ctx.getImageData(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = theme === "dark" ? "#020817" : "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.putImageData(currentDrawing, 0, 0);
  }, [theme, history.length, ref]);

  const getPointerPos = (clientX: number, clientY: number) => {
    const canvas = (ref as React.RefObject<HTMLCanvasElement>).current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const handleStartDrawing = (x: number, y: number) => {
    const canvas = (ref as React.RefObject<HTMLCanvasElement>).current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const pos = getPointerPos(x, y);
    startPoint.current = pos;

    lastDrawnState.current = ctx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height,
    );
    setIsDrawing(true);
  };

  const draw = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.strokeStyle =
      tool === "eraser" ? (theme === "dark" ? "#020817" : "white") : color;

    switch (tool) {
      case "brush":
      case "eraser":
        ctx.beginPath();
        ctx.moveTo(startPoint.current.x, startPoint.current.y);
        ctx.lineTo(x, y);
        ctx.stroke();
        startPoint.current = { x, y };
        break;

      case "rectangle":
      case "circle":
        if (lastDrawnState.current) {
          ctx.putImageData(lastDrawnState.current, 0, 0);
        }

        ctx.beginPath();
        if (tool === "rectangle") {
          const width = x - startPoint.current.x;
          const height = y - startPoint.current.y;
          ctx.strokeRect(
            startPoint.current.x,
            startPoint.current.y,
            width,
            height,
          );
        } else {
          const radius =
            Math.sqrt(
              Math.pow(x - startPoint.current.x, 2) +
                Math.pow(y - startPoint.current.y, 2),
            ) / 2;

          const centerX = (startPoint.current.x + x) / 2;
          const centerY = (startPoint.current.y + y) / 2;

          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
          ctx.stroke();
        }
        break;
    }
  };

  const handleDrawing = (x: number, y: number) => {
    if (!isDrawing) return;

    const canvas = (ref as React.RefObject<HTMLCanvasElement>).current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const pos = getPointerPos(x, y);
    draw(ctx, pos.x, pos.y);
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      const canvas = (ref as React.RefObject<HTMLCanvasElement>).current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      const currentState = ctx.getImageData(0, 0, canvas.width, canvas.height);
      addToHistory(currentState);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    handleStartDrawing(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    handleDrawing(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleStartDrawing(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleDrawing(touch.clientX, touch.clientY);
  };

  useEffect(() => {
    setColor(theme === "light" ? "#020817" : "white");
  }, [theme]);

  return (
    <canvas
      ref={ref}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={stopDrawing}
      onTouchCancel={stopDrawing}
      className="h-full w-full touch-none bg-background"
    />
  );
});

Canvas.displayName = "Canvas";
