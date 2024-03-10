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
        <main className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex h-screen w-full flex-col overflow-y-auto md:overflow-hidden">
          <Windows />
          <Header />
          <section className="flex h-full w-full flex-col items-start justify-between gap-10  overflow-y-auto pb-72 md:max-h-[calc(100vh-40px)] md:flex-row md:overflow-y-hidden md:pb-0">
            <AppsIcon />
            <MusicPlayer />
            <Dock />
          </section>
        </main>
      </ContextMenuTrigger>
    </ContextMenu>
  );
}
