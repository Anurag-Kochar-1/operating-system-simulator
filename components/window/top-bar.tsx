import React from "react";
import { Button } from "../ui/button";
import { useApp } from "@/store/use-app";
import { Maximize2, Minimize2, X } from "lucide-react";

type TopbarProps = {
  title: string;
  id: string;
  setWidth: React.Dispatch<React.SetStateAction<number>>;
  setHeight: React.Dispatch<React.SetStateAction<number>>;
  width: number;
  onMaximizeToggle: () => void;
  isMaximized: boolean;
};

export const Topbar = ({
  title,
  id,
  onMaximizeToggle,
  isMaximized,
}: TopbarProps) => {
  const removeWindow = useApp((state) => state.removeWindow);
  const setIsWindowDragging = useApp((state) => state.setIsWindowDragging);

  return (
    <div
      className="window-top-bar flex h-12 w-full items-center justify-between rounded-t-lg border-b bg-secondary px-2 hover:cursor-grab"
      onMouseDown={() => setIsWindowDragging(true)}
      onMouseUp={() => setIsWindowDragging(false)}
    >
      <h2 className="text-sm font-medium">{title}</h2>

      <div className="flex items-center gap-1">
        {id !== "calculator" && (
          <Button
            onClick={onMaximizeToggle}
            size={"icon"}
            variant={"outline"}
            className="hidden h-7 w-7 rounded-sm transition-all duration-75 ease-in hover:bg-muted-foreground/20 lg:inline-flex"
          >
            {isMaximized ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
          </Button>
        )}
        <Button
          onClick={() => removeWindow(id)}
          size={"icon"}
          variant={"destructive"}
          className="btn-cancel h-7 w-7 rounded-sm transition-all duration-75 ease-in hover:bg-destructive hover:text-destructive-foreground"
        >
          <X size={12} />
        </Button>
      </div>
    </div>
  );
};
