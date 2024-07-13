"use client";
import { Button } from "@/components/ui/button";
import { useDraw } from "@/hooks/use-draw";
import { Draw } from "@/types";
import { Trash2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

export const PaintAppContent = ({}) => {
  const { theme } = useTheme();
  const [color, setColor] = useState<string>(
    theme === "light" ? "#000" : "#fff",
  );
  const { canvasRef, onMouseDown, clear } = useDraw(drawLine);

  const ref = useRef<HTMLDivElement>(null);

  function drawLine({ prevPoint, currentPoint, ctx }: Draw) {
    const { x: currX, y: currY } = currentPoint;
    const lineColor = color;
    const lineWidth = 5;

    let startPoint = prevPoint ?? currentPoint;
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currX, currY);
    ctx.stroke();

    ctx.fillStyle = lineColor;
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  useEffect(() => {
    setColor(theme === "light" ? "#000" : "#fff");
    clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  useEffect(() => {
    const drawDefaultState = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.fillStyle = color;
      ctx.font = 'bold 10px "Segoe UI", Arial, sans-serif';
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("🖌 Paint here :)", canvas.width / 2, canvas.height / 2);
    };
    drawDefaultState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="relative h-full w-full overflow-hidden border bg-secondary"
      ref={ref}
    >
      <Button
        variant={"outline"}
        size={"icon"}
        onClick={clear}
        className="absolute bottom-2 right-2 z-10"
      >
        <Trash2 color="red" size={15} />
      </Button>
      <canvas
        ref={canvasRef}
        onMouseDown={onMouseDown}
        className="absolute inset-0 h-full w-full border-2"
        width={ref.current?.clientWidth}
        height={ref.current?.clientHeight}
      />
    </div>
  );
};
