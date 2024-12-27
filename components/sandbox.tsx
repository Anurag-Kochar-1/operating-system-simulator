"use client";

import React, { useState, memo, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { cn } from "@/lib/utils";
import { useApp } from "@/store/use-app";
import { App as AppType } from "@/types";
import { GripVertical } from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { MusicPlayer } from "./widgets/music-player";
import { PromotionWidget } from "./widgets/promotion-widget";
import { UnderConstructionWidget } from "./widgets/under-construction-widget";
import { APP_TYPES } from "@/constants/app-types.enum";

const ResponsiveGridLayout = WidthProvider(Responsive);

// Reusable drag handle component
const DragHandle = () => (
  <div className="drag-handle absolute right-1 top-1 z-10 hidden rounded-sm bg-white/10 p-1 backdrop-blur-sm hover:bg-white/20 group-hover:block">
    <GripVertical className="h-4 w-4 text-white" />
  </div>
);

const DraggableApp = memo(
  ({
    app,
    layoutKey,
  }: {
    app: Omit<AppType, "content">;
    layoutKey: string;
  }) => {
    const selectedAppId = useApp((state) => state.selectedAppId);
    const setSelectedAppId = useApp((state) => state.setSelectedAppId);
    const { addWindow } = useApp();

    const handleClick = () => {
      setSelectedAppId(app.id);
    };

    const handleDoubleClick = () => {
      if (selectedAppId === app.id) {
        addWindow({
          id: app.id,
          title: app.title,
          type: APP_TYPES.APP,
        });
        setSelectedAppId(null);
      }
    };

    return (
      <div key={layoutKey} className="group relative">
        <ContextMenu
          onOpenChange={() => {
            setSelectedAppId(app.id);
          }}
        >
          <ContextMenuTrigger>
            <div
              className={cn(
                "flex w-min select-none flex-col items-start justify-start gap-1 border-2 border-transparent p-2 text-left transition-all duration-100 ease-in hover:cursor-pointer hover:border-blue-200 hover:bg-blue-200 hover:bg-opacity-50",
                {
                  "rounded-sm border-2 border-blue-400 bg-blue-400 bg-opacity-50":
                    selectedAppId === app.id,
                },
              )}
              onClick={handleClick}
              onDoubleClick={handleDoubleClick}
            >
              {app.icon}
              <span className="text-sm">{app.title}</span>
            </div>
            <DragHandle />
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem
              onClick={() => {
                addWindow({
                  id: app.id,
                  title: app.title,
                  type: APP_TYPES.APP,
                });
                setSelectedAppId(null);
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

// Wrapped widget components with drag handle
const DraggableWidget = ({ children }: { children: React.ReactNode }) => (
  <div className="group relative">
    {children}
    <DragHandle />
  </div>
);

const DesktopLayout = () => {
  const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;
  const { apps } = useApp();

  // Generate initial layouts for all breakpoints
  const generateLayouts = () => {
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

    const layout = [...appLayouts, ...widgetLayouts];

    // Create responsive layouts
    return {
      lg: layout,
      md: layout.map((item) => ({
        ...item,
        w: item.i.startsWith("widget-") ? 2 : 1,
      })),
      sm: layout.map((item) => ({
        ...item,
        w: item.i.startsWith("widget-") ? 2 : 1,
      })),
      xs: layout.map((item) => ({
        ...item,
        w: item.i.startsWith("widget-") ? 2 : 1,
      })),
      xxs: layout.map((item) => ({
        ...item,
        w: item.i.startsWith("widget-") ? 2 : 1,
      })),
    };
  };

  const [layouts, setLayouts] = useState(() => {
    // Try to load layouts from localStorage on initial render
    if (typeof window !== "undefined") {
      const savedLayouts = localStorage.getItem("desktop-layouts");
      if (savedLayouts) {
        try {
          return JSON.parse(savedLayouts);
        } catch (error) {
          console.error("Error parsing saved layouts:", error);
          return generateLayouts();
        }
      }
    }
    return generateLayouts();
  });

  // Save layouts when they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("desktop-layouts", JSON.stringify(layouts));
    }
  }, [layouts]);

  const handleLayoutChange = (currentLayout: any[], allLayouts: any) => {
    // Update the layouts while maintaining bounds
    const updatedLayouts = Object.keys(allLayouts).reduce((acc, breakpoint) => {
      const boundedLayout = allLayouts[breakpoint].map((item: any) => {
        if (item.i.startsWith("widget-")) {
          return { ...item, x: Math.max(8, item.x) };
        } else {
          return { ...item, x: Math.min(item.x, 7) };
        }
      });
      return { ...acc, [breakpoint]: boundedLayout };
    }, {});

    setLayouts(updatedLayouts);
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
          layouts={{
            lg: layouts.lg,
            md: layouts.md,
            sm: layouts.sm,
            xs: layouts.xs,
            xxs: layouts.xxs,
          }}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 8, sm: 6, xs: 4, xxs: 2 }}
          margin={[16, 16]}
          containerPadding={[16, 16]}
          rowHeight={100}
          onLayoutChange={(currentLayout, allLayouts) =>
            handleLayoutChange(currentLayout, allLayouts)
          }
          isDraggable={isDesktop}
          isResizable={false}
          compactType={null}
          preventCollision={true}
          maxRows={7}
          draggableHandle=".drag-handle"
        >
          {apps
            ?.filter((app) => app.isOnDesktop === undefined || false)
            ?.map((app) => (
              <div key={`app-${app.id}`}>
                <DraggableApp app={app} layoutKey={`app-${app.id}`} />
              </div>
            ))}
          <div key="widget-music">
            <DraggableWidget>
              <MusicPlayer />
            </DraggableWidget>
          </div>
          <div key="widget-promotion">
            <DraggableWidget>
              <PromotionWidget />
            </DraggableWidget>
          </div>
          <div key="widget-construction">
            <DraggableWidget>
              <UnderConstructionWidget />
            </DraggableWidget>
          </div>
        </ResponsiveGridLayout>
      </div>
    </div>
  );
};

export default DesktopLayout;
