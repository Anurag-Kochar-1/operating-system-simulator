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
    <div className="window-top-bar flex h-10 w-full items-center justify-between border-b bg-muted px-2 hover:cursor-grab">
      <h2 className="text-sm font-medium">{title}</h2>

      <div className="flex items-center gap-1">
        <Button
          onClick={onMaximizeToggle}
          size={"icon"}
          variant={"ghost"}
          className="h-7 w-7 rounded-none hover:bg-muted-foreground/20"
        >
          {isMaximized ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
        </Button>
        <Button
          onClick={() => removeWindow(id)}
          size={"icon"}
          variant={"ghost"}
          className="h-7 w-7 rounded-none hover:bg-destructive hover:text-destructive-foreground"
        >
          <X size={12} />
        </Button>
      </div>
    </div>
  );
};
