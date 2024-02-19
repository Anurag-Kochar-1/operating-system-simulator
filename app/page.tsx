import { AppsIcon } from "@/components/apps-icon";
import { Dock } from "@/components/dock";
import { Header } from "@/components/header";
import { Windows } from "@/components/windows";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { ContextMenuContentOptions } from "@/components/context-menu-content";

export default function Home() {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <ContextMenuContentOptions />
        <main className="flex h-screen w-full flex-col overflow-hidden">
          <Windows />
          <Header />
          <section className="flex h-full max-h-[calc(100vh-40px)] w-full flex-row items-start justify-between overflow-y-hidden ">
            <AppsIcon />
            <Dock />
          </section>
        </main>
      </ContextMenuTrigger>
    </ContextMenu>
  );
}
