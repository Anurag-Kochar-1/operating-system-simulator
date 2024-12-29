"use client";
import { DockItem } from "@/types";
import {
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DOCK_ITEMS } from "@/data/dock-items";
import { useApp } from "@/stores/use-app";
import { APP_TYPES } from "@/constants/app-types.enum";

export function Dock() {
  let mouseX = useMotionValue(Infinity);
  const addWindow = useApp((state) => state.addWindow);
  const setIsSearchCommandOpen = useApp(
    (state) => state.setIsSearchCommandOpen,
  );

  const getOnClick = (item: DockItem) => () => {
    if (item.id === "search") {
      setIsSearchCommandOpen(true);
      return;
    }
    addWindow({
      id: item.id,
      title: item.title,
      type: item.id === "game" ? APP_TYPES.GAME : APP_TYPES.APP,
    });
  };

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="fixed bottom-5 left-0 right-0 z-30 mx-auto flex h-16 w-min max-w-[85%] items-center justify-start gap-4 overflow-x-auto rounded-2xl border-2 bg-secondary px-4 scrollbar-hide lg:max-w-min lg:overflow-x-visible"
    >
      {DOCK_ITEMS?.map((item, idx) => (
        <AppIcon
          mouseX={mouseX}
          key={idx}
          item={item}
          onClick={getOnClick(item)}
        />
      ))}
    </motion.div>
  );
}

function AppIcon({
  mouseX,
  item,
  onClick,
}: {
  mouseX: MotionValue;
  item: DockItem;
  onClick: () => void;
}) {
  let ref = useRef<HTMLDivElement>(null);
  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  let widthSync = useTransform(distance, [-150, 0, 150], [40, 100, 40]);
  let width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <Tooltip>
      <TooltipTrigger>
        <motion.div
          ref={ref}
          style={{ width }}
          className="flex aspect-square w-10 items-center justify-center rounded-full border-2 bg-background hover:cursor-pointer"
          onClick={onClick}
        >
          <span className="text-sm">{item.icon}</span>
        </motion.div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{item.title}</p>
      </TooltipContent>
    </Tooltip>
  );
}
