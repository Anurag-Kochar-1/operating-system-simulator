import { AllApps } from "@/components/all-apps";
import { Dock } from "@/components/dock";
import { Header } from "@/components/header";
import { Windows } from "@/components/windows";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import { ContextMenuContentOptions } from "@/components/context-menu-content";
import { MusicPlayer } from "@/components/music-player";
import { PromotionWidget } from "@/components/promotion-widget";
import { UnderConstructionWidget } from "@/components/under-construction-widget";
import { Wallpaper } from "@/components/wallpaper";

export default function Home() {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <ContextMenuContentOptions />
        {/* <main className="relative flex h-[calc(100vh-80px)] w-full flex-col overflow-y-auto bg-dot-black/[0.2] dark:bg-dot-white/[0.2] md:overflow-hidden"> */}
        <main className="relative flex h-screen w-full flex-col overflow-y-auto bg-dot-black/[0.2] dark:bg-dot-white/[0.2] md:overflow-hidden">
          <Wallpaper />
          <Windows />
          <Header />
          <section className="z-10 flex h-full w-full flex-col items-start justify-between gap-10 overflow-y-auto pb-72 md:h-[calc(100vh-128px)] md:max-h-[calc(100vh-40px)] md:flex-row md:overflow-y-hidden md:pb-0">
            <AllApps />
            <div className="mx-auto flex h-full w-[90%] flex-col items-start justify-start gap-10 md:mx-0 md:max-w-sm md:p-2 lg:max-w-md lg:flex-col-reverse lg:justify-between lg:gap-0 lg:p-4 ">
              <MusicPlayer />
              {/* <PromotionWidget /> */}
              <UnderConstructionWidget />
            </div>
            <Dock />
          </section>
        </main>
      </ContextMenuTrigger>
    </ContextMenu>
  );
}
