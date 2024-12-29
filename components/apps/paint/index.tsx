import { useRef } from "react";
import { Canvas } from "./canvas";
import { Toolbar } from "./toolbar";

export function PaintAppContent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <div className="h-screen bg-background">
      <Canvas ref={canvasRef} />
      <Toolbar canvasRef={canvasRef} />
    </div>
  );
}
