import { Button } from "@/components/ui/button";
import { Redo, Undo } from "lucide-react";
import { usePaintStore } from "@/stores/use-paint";

export function HistoryControls() {
  const {
    historyIndex,
    history,
    actions: { undo, redo },
  } = usePaintStore();

  return (
    <div className="flex shrink-0 gap-1">
      <Button
        variant="outline"
        onClick={undo}
        disabled={historyIndex <= 0}
        size="icon"
        className="h-8 w-8"
      >
        <Undo className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        onClick={redo}
        disabled={historyIndex >= history.length - 1}
        size="icon"
        className="h-8 w-8"
      >
        <Redo className="h-4 w-4" />
      </Button>
    </div>
  );
}
