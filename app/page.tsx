import { AppsIcon } from "@/components/apps-icon";
import { Dock } from "@/components/dock";
import { Header } from "@/components/header";
import { Windows } from "@/components/windows";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import { ContextMenuContentOptions } from "@/components/context-menu-content";
import { MusicPlayer } from "@/components/music-player";

export default function Home() {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <ContextMenuContentOptions />
        <main className="flex h-screen w-full flex-col overflow-hidden">
          {/* <div className="absolute inset-0 bg-purple-600 -z-40"></div> */}

          <Windows />
          <Header />
          <section className="flex h-full max-h-[calc(100vh-40px)] w-full flex-row items-start justify-between overflow-y-hidden ">
            <AppsIcon />
            <Dock />
            <MusicPlayer />
          </section>
        </main>
      </ContextMenuTrigger>
    </ContextMenu>
  );
}
