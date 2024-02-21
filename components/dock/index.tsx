"use client";

import { APPS } from "@/config/apps.config";
import { useApp } from "@/hooks/use-app";
import { App } from "@/types";
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
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export function Dock() {
  let mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="scrollbar-hide fixed bottom-5 left-0 right-0 mx-auto flex h-16 w-full max-w-[85%] items-center justify-start gap-4 overflow-y-auto rounded-2xl border-2 bg-secondary px-4 lg:max-w-min"
    >
      <TooltipProvider delayDuration={0}>
        {APPS?.map((app, idx) => (
          <AppIcon mouseX={mouseX} key={idx} app={app} />
        ))}
      </TooltipProvider>
    </motion.div>
  );
}

function AppIcon({ mouseX, app }: { mouseX: MotionValue; app: App }) {
  const { addWindow } = useApp();
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
          onClick={() => {
            addWindow({
              id: app.id,
              title: app.title,
              type: "APP",
            });
          }}
        >
          <span className="text-xl font-bold text-secondary-foreground">
            {app.icon}
          </span>
        </motion.div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{app.title}</p>
      </TooltipContent>
    </Tooltip>
  );
}
