import { Button } from "@/components/ui/button";
import { Download, Trash2 } from "lucide-react";
import { useTheme } from "next-themes";
import { usePaintStore } from "@/stores/use-paint";

interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export function UtilityControls({ canvasRef }: Props) {
  const { theme } = useTheme();
  const { actions: { addToHistory } } = usePaintStore();

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.fillStyle = theme === "dark" ? "#020817" : "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const newState = ctx.getImageData(0, 0, canvas.width, canvas.height);
    addToHistory(newState);
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
    <div className="flex shrink-0 gap-1">
      <Button
        variant="outline"
        onClick={downloadCanvas}
        size="icon"
        className="h-8 w-8"
      >
        <Download className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        onClick={clearCanvas}
        size="icon"
        className="h-8 w-8 hover:bg-destructive hover:text-destructive-foreground"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}