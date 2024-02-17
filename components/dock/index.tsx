"use client";

import { APPS } from "@/config/apps.config";
import { useApp } from "@/hooks/store";
import { App } from "@/types";
import {
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

export function Dock() {
  let mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="fixed bottom-5 left-0 right-0 mx-auto flex h-16 max-w-min items-center justify-center gap-4 rounded-2xl bg-foreground px-5"
    >
      {APPS?.map((app, idx) => <AppIcon mouseX={mouseX} key={idx} app={app} />)}
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
    <motion.div
      ref={ref}
      style={{ width }}
      className="flex aspect-square w-10 items-center justify-center rounded-full bg-secondary-foreground text-secondary border-2"
      onClick={() => {
        addWindow({
          id: app.id,
          title: app.title,
          type: "APP",
        });
      }}
    >
      <span className="text-sm font-bold">{app.icon}</span>
    </motion.div>
  );
}
