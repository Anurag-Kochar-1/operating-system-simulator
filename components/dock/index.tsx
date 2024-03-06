"use client";

import { Social } from "@/types";
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
import { SOCIALS } from "@/config/socials.config";

export function Dock() {
  let mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="fixed bottom-5 left-0 right-0 mx-auto flex h-16 w-min max-w-[85%] items-center justify-start gap-4 overflow-x-auto rounded-2xl border-2 bg-secondary px-4 scrollbar-hide lg:max-w-min lg:overflow-x-visible"
    >
      <TooltipProvider delayDuration={0}>
        {SOCIALS?.map((social, idx) => (
          <AppIcon mouseX={mouseX} key={idx} item={social} />
        ))}
      </TooltipProvider>
    </motion.div>
  );
}

function AppIcon({ mouseX, item }: { mouseX: MotionValue; item: Social }) {
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
          onClick={() => window.open(item.url, "_blank")}
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
