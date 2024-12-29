"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSettingsStore } from "@/stores/use-settings";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    id: string;
    title: string;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const activeTab = useSettingsStore((state) => state.activeTab);
  const setActiveTab = useSettingsStore((state) => state.setActiveTab);
  return (
    <nav
      className={cn(
        "flex space-x-2 md:flex-col gap-4",
        className,
      )}
      {...props}
    >
      {items.map((item) => (
        <Button
          key={item.id}
          variant={"ghost"}
          className={cn("justify-start hover:bg-transparent hover:underline", {
            "bg-muted hover:bg-muted": activeTab.id === item.id,
          })}
          onClick={() => setActiveTab(item)}
        >
          {item.title}
        </Button>
      ))}
    </nav>
  );
}
