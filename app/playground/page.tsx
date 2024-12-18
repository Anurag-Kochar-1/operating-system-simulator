"use client";

import React, { useState, useRef, memo } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { cn } from "@/lib/utils";
import { useApp } from "@/store/use-app";
import { App as AppType } from "@/types";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { MusicPlayer } from "@/components/widgets/music-player";
import { PromotionWidget } from "@/components/widgets/promotion-widget";
import { UnderConstructionWidget } from "@/components/widgets/under-construction-widget";

const ResponsiveGridLayout = WidthProvider(Responsive);

const DraggableApp = memo(
  ({
    app,
    layoutKey,
    isDragging,
  }: {
    app: Omit<AppType, "content">;
    layoutKey: string;
    isDragging: boolean;
  }) => {
    const selectedAppId = useApp((state) => state.selectedAppId);
    const setSelectedAppId = useApp((state) => state.setSelectedAppId);
    const { addWindow } = useApp();

    const handleClick = (e: React.MouseEvent) => {
      if (!isDragging) {
        setSelectedAppId(app.id);
      }
    };

    const handleDoubleClick = (e: React.MouseEvent) => {
      if (!isDragging && selectedAppId === app.id) {
        addWindow({
          id: app.id,
          title: app.title,
          type: "APP",
        });
        setSelectedAppId(null);
      }
    };

    return (
      <div key={layoutKey} data-testid={`app-${app.id}`}>
        <ContextMenu
          onOpenChange={() => {
            if (!isDragging) {
              setSelectedAppId(app.id);
            }
          }}
        >
          <ContextMenuTrigger>
            <div
              className={cn(
                "flex w-min select-none flex-col items-start justify-start gap-1 border-2 border-transparent p-2 text-left transition-all duration-100 ease-in hover:cursor-pointer hover:border-blue-200 hover:bg-blue-200 hover:bg-opacity-50",
                {
                  "rounded-sm border-2 border-blue-400 bg-blue-400 bg-opacity-50":
                    selectedAppId === app.id && !isDragging,
                },
              )}
              onClick={handleClick}
              onDoubleClick={handleDoubleClick}
            >
              {app.icon}
              <span className="text-sm">{app.title}</span>
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem
              onClick={() => {
                if (!isDragging) {
                  addWindow({
                    id: app.id,
                    title: app.title,
                    type: "APP",
                  });
                  setSelectedAppId(null);
                }
              }}
            >
              Open
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>
    );
  },
);

DraggableApp.displayName = "DraggableApp";

const DesktopLayout = () => {
  const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;
  const { apps } = useApp();
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const dragStartTime = useRef(0);
  const dragTimeout = useRef<NodeJS.Timeout | null>(null);

  const generateLayout = () => {
    const appLayouts = apps
      ?.filter((app) => app.isOnDesktop === undefined || false)
      ?.map((app, index) => ({
        i: `app-${app.id}`,
        x: index % 2,
        y: Math.floor(index / 2),
        w: 1,
        h: 1,
      }));

    const widgetLayouts = [
      { i: "widget-music", x: 8, y: 0, w: 3, h: 2 },
      { i: "widget-promotion", x: 8, y: 2, w: 3, h: 2 },
      { i: "widget-construction", x: 8, y: 4, w: 3, h: 2 },
    ];

    return [...appLayouts, ...widgetLayouts];
  };

  const [layout, setLayout] = useState(generateLayout());

  const handleLayoutChange = (newLayout: any[]) => {
    const boundedLayout = newLayout.map((item) => {
      if (item.i.startsWith("widget-")) {
        return { ...item, x: Math.max(8, item.x) };
      } else {
        return { ...item, x: Math.min(item.x, 7) };
      }
    });
    setLayout(boundedLayout);
  };

  const handleDragStart = (
    layouts: any[],
    oldItem: any,
    newItem: any,
    placeholder: any,
    e: MouseEvent,
    element: HTMLElement,
  ) => {
    dragStartTime.current = Date.now();
    dragStartPos.current = { x: e.clientX, y: e.clientY };

    // Add a small delay before allowing drag
    dragTimeout.current = setTimeout(() => {
      const dx = Math.abs(e.clientX - dragStartPos.current.x);
      const dy = Math.abs(e.clientY - dragStartPos.current.y);

      // Only start drag if mouse has moved significantly
      if (dx > 5 || dy > 5) {
        setIsDragging(true);
      }
    }, 150);
  };

  const handleDrag = (
    layouts: any[],
    oldItem: any,
    newItem: any,
    placeholder: any,
    e: MouseEvent,
    element: HTMLElement,
  ) => {
    const dx = Math.abs(e.clientX - dragStartPos.current.x);
    const dy = Math.abs(e.clientY - dragStartPos.current.y);

    // Start drag if mouse has moved significantly
    if ((dx > 5 || dy > 5) && Date.now() - dragStartTime.current > 150) {
      setIsDragging(true);
    }
  };

  const handleDragStop = () => {
    if (dragTimeout.current) {
      clearTimeout(dragTimeout.current);
      dragTimeout.current = null;
    }
    // Add a small delay before resetting isDragging to allow click events to be processed
    setTimeout(() => {
      setIsDragging(false);
    }, 50);
  };

  return (
    <div
      className={cn(
        "h-screen w-full overflow-y-auto overflow-x-hidden bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center p-4",
        {
          "overflow-y-hidden": isDesktop,
        },
      )}
    >
      <div className="pb-20">
        <ResponsiveGridLayout
          className="layout"
          layouts={{ lg: layout }}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 8, sm: 6, xs: 4, xxs: 2 }}
          margin={[16, 16]}
          containerPadding={[16, 16]}
          rowHeight={100}
          onLayoutChange={handleLayoutChange}
          isDraggable={isDesktop}
          isResizable={false}
          compactType={null}
          preventCollision={true}
          maxRows={7}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragStop={handleDragStop}
        >
          {apps
            ?.filter((app) => app.isOnDesktop === undefined || false)
            ?.map((app) => (
              <div key={`app-${app.id}`}>
                <DraggableApp
                  app={app}
                  layoutKey={`app-${app.id}`}
                  isDragging={isDragging}
                />
              </div>
            ))}
          <div key="widget-music">
            <MusicPlayer />
          </div>
          <div key="widget-promotion">
            <PromotionWidget />
          </div>
          <div key="widget-construction">
            <UnderConstructionWidget />
          </div>
        </ResponsiveGridLayout>
      </div>
    </div>
  );
};

export default DesktopLayout;
