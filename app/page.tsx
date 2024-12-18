import { AllApps } from "@/components/all-apps";
import { Dock } from "@/components/dock";
import { Header } from "@/components/header";
import { Windows } from "@/components/windows";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import { ContextMenuContentOptions } from "@/components/context-menu-content";
import { Wallpaper } from "@/components/wallpaper";
import { Widgets } from "@/components/widgets";
// import DesktopLayout from "./playground/page";
import DesktopLayout from "@/components/sandbox";
import DesktopSelectionBox from "@/components/desktop-selection-box";

export default function Home() {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <ContextMenuContentOptions />
        <DesktopSelectionBox>
          <main className="relative flex h-screen w-full flex-col overflow-y-auto bg-dot-black/[0.2] dark:bg-dot-white/[0.2] md:overflow-hidden select-none">
            <Wallpaper />
            <Windows />
            <Header />
            <section className="z-10 flex h-full w-full flex-col items-start justify-between gap-10 overflow-y-auto pb-72 md:h-[calc(100vh-128px)] md:max-h-[calc(100vh-40px)] md:flex-row md:overflow-y-hidden md:pb-0">
              {/* <DesktopLayout /> */}

              <AllApps />
              <Widgets />
              <Dock />
            </section>
          </main>
        </DesktopSelectionBox>
      </ContextMenuTrigger>
    </ContextMenu>
  );
}
