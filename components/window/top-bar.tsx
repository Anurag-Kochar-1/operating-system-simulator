import React from "react";
import { Button } from "../ui/button";
import { useApp } from "@/hooks/use-app";
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
  const { removeWindow } = useApp();

  return (
    <div className="window-top-bar flex h-12 w-full items-center justify-between border-b px-2 hover:cursor-grab bg-secondary rounded-t-lg">
      <h2 className="text-sm font-medium">{title}</h2>

      <div className="flex items-center gap-1">
        <Button
          onClick={onMaximizeToggle}
          size={"icon"}
          variant={"outline"}
          className="h-7 w-7 rounded-sm hover:bg-muted-foreground/20 hidden lg:inline-flex transition-all duration-75 ease-in"
        >
          {isMaximized ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
        </Button>
        <Button
          onClick={() => removeWindow(id)}
          size={"icon"}
          variant={"destructive"}
          className="h-7 w-7 rounded-sm hover:bg-destructive hover:text-destructive-foreground transition-all duration-75 ease-in"
        >
          <X size={12} />
        </Button>
      </div>
    </div>
  );
};
