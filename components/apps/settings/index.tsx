import { Separator } from "@/components/ui/separator";
import React from "react";
import { SidebarNav } from "./sidebar-nav";
import { sidebarNavItems } from "@/data/settings-sidebar-nav-items";
import { useSettingsStore } from "@/stores/use-settings";
import { SettingsAboutSection } from "./about";
import { WallpapersSection } from "./wallpaper";
import { ProfileSection } from "./profile";
4;
export const SettingsAppContent = () => {
  const { activeTab } = useSettingsStore();
  return (
    <div className="flex h-full w-full flex-col md:flex-row">
      <aside className="w-full p-4 md:max-w-[30%] md:border-r md:border-border/50 lg:max-w-[20%]">
        <SidebarNav items={sidebarNavItems} />
      </aside>
      <div className="h-full w-full overflow-y-auto p-4">
        {activeTab.id === "about" ? <SettingsAboutSection /> : null}
        {activeTab.id === "wallpaper" ? <WallpapersSection /> : null}
        {activeTab.id === "profile" ? <ProfileSection /> : null}
      </div>
    </div>
  );
};
