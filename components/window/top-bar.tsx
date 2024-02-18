import React from "react";
import { Button } from "../ui/button";
import { useApp } from "@/hooks/store";
import { Maximize, Minimize, X } from "lucide-react";

type TopbarProps = {
  title: string;
  id: string;
  setWidth: React.Dispatch<React.SetStateAction<number>>;
  setHeight: React.Dispatch<React.SetStateAction<number>>;
  width: number;
};

export const Topbar = ({
  title,
  id,
  width,
  setWidth,
  setHeight,
}: TopbarProps) => {
  const { removeWindow } = useApp();
  const handleMinimizeMaximize = () => {
    if (width === 100) {
      setWidth(60);
      setHeight(70);
    } else {
      setWidth(100);
      setHeight(100);
    }
  };
  return (
    <div
      className={
        "window-top-bar relative flex h-14 w-full select-none items-center justify-between rounded-b-none border-b-4 border-b-black border-opacity-5 px-3 py-1.5 text-foreground hover:cursor-move"
      }
    >
      <h2 className="mx-auto text-sm font-bold">{title}</h2>

      <div className="flex items-center justify-center gap-2">
        <Button
          onClick={() => removeWindow(id)}
          size={"icon"}
          variant={"destructive"}
          className="btn-cancel"
        >
          <X size={15} />
        </Button>
        <Button
          className="hidden lg:flex"
          onClick={handleMinimizeMaximize}
          size={"icon"}
          variant={"outline"}
        >
          {width === 100 ? <Minimize size={15} /> : <Maximize size={15} />}
        </Button>
      </div>
    </div>
  );
};
