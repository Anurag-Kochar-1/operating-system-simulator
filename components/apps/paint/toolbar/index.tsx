import { DrawingTools } from "./drawing-tools";
import { ColorPicker } from "./color-picker";
import { BrushSize } from "./brush-size";
import { HistoryControls } from "./history-controls";
import { UtilityControls } from "./utility-controls";

interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export function Toolbar({ canvasRef }: Props) {
  return (
    <div className="fixed bottom-20 left-0 right-0 mx-auto w-full px-2 sm:left-1/2 sm:w-fit sm:-translate-x-1/2 sm:px-0 lg:bottom-8">
      <div className="mx-auto max-w-[90%] rounded-lg border  bg-card shadow-lg md:max-w-none">
        <div className="flex flex-wrap items-center justify-center gap-4 p-2 sm:gap-2 sm:p-3 md:flex-row md:flex-nowrap md:gap-1">
          <DrawingTools />
          <div className="hidden h-8 w-px shrink-0 bg-border md:block" />

          <ColorPicker />
          <div className="hidden h-8 w-px shrink-0 bg-border md:block" />

          <BrushSize />
          <div className="hidden h-8 w-px shrink-0 bg-border md:block" />

          <HistoryControls />
          <div className="hidden h-8 w-px shrink-0 bg-border md:block" />

          <UtilityControls canvasRef={canvasRef} />
        </div>
      </div>
    </div>
  );
}
