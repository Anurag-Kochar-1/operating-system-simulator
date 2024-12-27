"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ChromePicker } from "react-color";
import {
  Brush,
  Eraser,
  Square,
  Circle,
  Undo,
  Redo,
  Download,
  Trash2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Tool = "brush" | "eraser" | "rectangle" | "circle";

export function PaintAppContent() {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<Tool>("brush");
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const startPoint = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastDrawnState = useRef<ImageData | null>(null);

  // Update canvas background color when theme changes
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || history.length === 0) return;

    // Store current drawing
    const currentDrawing = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Update background
    ctx.fillStyle = theme === "dark" ? "#020817" : "white"; // Using Tailwind dark background color
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Restore drawing
    ctx.putImageData(currentDrawing, 0, 0);
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      // Restore white or dark background based on theme
      ctx.fillStyle = theme === "dark" ? "#020817" : "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // Save initial state only if history is empty
    if (history.length === 0) {
      const initialState = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setHistory([initialState]);
      setHistoryIndex(0);
    }

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []); // Remove history and historyIndex from dependencies

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const pos = getMousePos(e);
    startPoint.current = pos;

    // Store the current canvas state before starting to draw
    lastDrawnState.current = ctx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height,
    );
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const { x, y } = getMousePos(e);

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
        // Restore the last known good state
        if (lastDrawnState.current) {
          ctx.putImageData(lastDrawnState.current, 0, 0);
        }

        // Draw the shape
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
          const radius = Math.sqrt(
            Math.pow(x - startPoint.current.x, 2) +
              Math.pow(y - startPoint.current.y, 2),
          );
          ctx.arc(
            startPoint.current.x,
            startPoint.current.y,
            radius,
            0,
            2 * Math.PI,
          );
          ctx.stroke();
        }
        break;
    }
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      const currentState = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(currentState);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  };

  const undo = () => {
    if (historyIndex > 0) {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      setHistoryIndex(historyIndex - 1);
      ctx.putImageData(history[historyIndex - 1], 0, 0);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      setHistoryIndex(historyIndex + 1);
      ctx.putImageData(history[historyIndex + 1], 0, 0);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.fillStyle = theme === "dark" ? "#020817" : "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const newState = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newState);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "paint-artwork.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="h-screen bg-background">
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        className="h-full w-full bg-background"
      />

      {/* Floating Toolbar */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 rounded-lg border bg-card shadow-lg">
        <div className="flex items-center gap-2 p-3">
          <Button
            variant={tool === "brush" ? "default" : "outline"}
            onClick={() => setTool("brush")}
          >
            <Brush className="h-4 w-4" />
          </Button>
          <Button
            variant={tool === "eraser" ? "default" : "outline"}
            onClick={() => setTool("eraser")}
          >
            <Eraser className="h-4 w-4" />
          </Button>
          <Button
            variant={tool === "rectangle" ? "default" : "outline"}
            onClick={() => setTool("rectangle")}
          >
            <Square className="h-4 w-4" />
          </Button>
          <Button
            variant={tool === "circle" ? "default" : "outline"}
            onClick={() => setTool("circle")}
          >
            <Circle className="h-4 w-4" />
          </Button>

          <div className="mx-2 h-8 w-px bg-border" />

          <div className="relative">
            <Button
              variant="outline"
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="h-10 w-10"
              style={{ backgroundColor: color }}
            />
            {showColorPicker && (
              <div className="absolute bottom-full left-0 mb-2">
                <ChromePicker
                  color={color}
                  onChange={(color) => setColor(color.hex)}
                />
              </div>
            )}
          </div>

          <div className="flex w-48 items-center gap-2">
            <Slider
              value={[brushSize]}
              onValueChange={(value) => setBrushSize(value[0])}
              min={1}
              max={50}
              step={1}
              className="[&_[role=slider]]:left-0"
            />
          </div>

          <div className="mx-2 h-8 w-px bg-gray-200" />

          <Button variant="outline" onClick={undo} disabled={historyIndex <= 0}>
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={redo}
            disabled={historyIndex >= history.length - 1}
          >
            <Redo className="h-4 w-4" />
          </Button>

          <div className="mx-2 h-8 w-px bg-gray-200" />

          <Button variant="outline" onClick={downloadCanvas}>
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={clearCanvas}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// "use client";
// import { Button } from "@/components/ui/button";
// import { useDraw } from "@/hooks/use-draw";
// import { Draw } from "@/types";
// import { Trash2 } from "lucide-react";
// import { useTheme } from "next-themes";
// import { useEffect, useRef, useState } from "react";

// export const PaintAppContent = ({}) => {
//   const { theme } = useTheme();
//   const [color, setColor] = useState<string>(
//     theme === "light" ? "#000" : "#fff",
//   );
//   const { canvasRef, onMouseDown, clear } = useDraw(drawLine);

//   const ref = useRef<HTMLDivElement>(null);

//   function drawLine({ prevPoint, currentPoint, ctx }: Draw) {
//     const { x: currX, y: currY } = currentPoint;
//     const lineColor = color;
//     const lineWidth = 5;

//     let startPoint = prevPoint ?? currentPoint;
//     ctx.beginPath();
//     ctx.lineWidth = lineWidth;
//     ctx.strokeStyle = lineColor;
//     ctx.moveTo(startPoint.x, startPoint.y);
//     ctx.lineTo(currX, currY);
//     ctx.stroke();

//     ctx.fillStyle = lineColor;
//     ctx.beginPath();
//     ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
//     ctx.fill();
//   }

//   useEffect(() => {
//     setColor(theme === "light" ? "#000" : "#fff");
//     clear();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [theme]);

//   useEffect(() => {
//     const drawDefaultState = () => {
//       const canvas = canvasRef.current;
//       if (!canvas) return;

//       const ctx = canvas.getContext("2d");
//       if (!ctx) return;

//       ctx.fillStyle = color;
//       ctx.font = 'bold 10px "Segoe UI", Arial, sans-serif';
//       ctx.textAlign = "center";
//       ctx.textBaseline = "middle";
//       ctx.fillText("🖌 Paint here :)", canvas.width / 2, canvas.height / 2);
//     };
//     drawDefaultState();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <div
//       className="relative h-full w-full overflow-hidden border bg-secondary"
//       ref={ref}
//     >
//       <Button
//         variant={"outline"}
//         size={"icon"}
//         onClick={clear}
//         className="absolute bottom-2 right-2 z-10"
//       >
//         <Trash2 color="red" size={15} />
//       </Button>
//       <canvas
//         ref={canvasRef}
//         onMouseDown={onMouseDown}
//         className="absolute inset-0 h-full w-full border-2"
//         width={ref.current?.clientWidth}
//         height={ref.current?.clientHeight}
//       />
//     </div>
//   );
// };
