import { Button } from "@/components/ui/button";
import { Brush, Circle, Eraser, Square } from "lucide-react";
import { usePaintStore } from "@/store/use-paint";

export function DrawingTools() {
  const {
    tool,
    actions: { setTool },
  } = usePaintStore();

  return (
    <div className="flex shrink-0 gap-1">
      <Button
        variant={tool === "brush" ? "default" : "outline"}
        onClick={() => setTool("brush")}
        size="icon"
        className="h-8 w-8"
      >
        <Brush className="h-4 w-4" />
      </Button>
      <Button
        variant={tool === "eraser" ? "default" : "outline"}
        onClick={() => setTool("eraser")}
        size="icon"
        className="h-8 w-8"
      >
        <Eraser className="h-4 w-4" />
      </Button>
      <Button
        variant={tool === "rectangle" ? "default" : "outline"}
        onClick={() => setTool("rectangle")}
        size="icon"
        className="h-8 w-8"
      >
        <Square className="h-4 w-4" />
      </Button>
      <Button
        variant={tool === "circle" ? "default" : "outline"}
        onClick={() => setTool("circle")}
        size="icon"
        className="h-8 w-8"
      >
        <Circle className="h-4 w-4" />
      </Button>
    </div>
  );
}
