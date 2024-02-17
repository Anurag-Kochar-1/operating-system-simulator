import { AppsIcon } from "@/components/apps-icon";
import { Dock } from "@/components/dock";
import { Header } from "@/components/header";
import { Windows } from "@/components/windows";

export default function Home() {
  return (
    <main className="flex h-screen w-full flex-col overflow-hidden bg-background">
      <Windows />
      <Header />
      <section className="flex h-full max-h-[calc(100vh-56px)] w-full flex-row items-center justify-between overflow-y-hidden ">
        <AppsIcon />
        <Dock />
      </section>
    </main>
  );
}
