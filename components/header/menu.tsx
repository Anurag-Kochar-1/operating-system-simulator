"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useApp } from "@/hooks/use-app";

export function Menu() {
  const addWindow = useApp((state) => state.addWindow);
  const apps = useApp((state) => state.apps);
  const openWindow = (
    type: "about" | "projects" | "skills" | "education" | "resume" | "car-game" | "settings",
  ) => {
    const window = apps.filter((app) => app.id === type)[0];
    if (window) {
      addWindow({
        id: window.id,
        title: window.title,
        type: "APP"
      });
    } else {
      alert("Error!");
    }
  };

  return (
    <Menubar className="border-none">
      {/* ========== Portfolio ========== */}
      <MenubarMenu>
        <MenubarTrigger>Portfolio</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => openWindow("about")}>About</MenubarItem>
          {/* <MenubarItem>Experience</MenubarItem> */}
          <MenubarItem onClick={() => openWindow("projects")}>Projects</MenubarItem>
          <MenubarItem onClick={() => openWindow("skills")}>Skills</MenubarItem>
          {/* <MenubarItem>Education</MenubarItem> */}
          <MenubarItem onClick={() => openWindow("resume")}>Resume</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      {/* ========== Games ========== */}
      <MenubarMenu>
        <MenubarTrigger>Games</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => openWindow("car-game")}>Car Racing</MenubarItem>
          <MenubarItem disabled>DOOM</MenubarItem>
          <MenubarItem disabled>Chess</MenubarItem>
          <MenubarItem disabled>GTA 6</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      {/* ========== Settings ========== */}
      <MenubarMenu>
        <MenubarTrigger>Settings</MenubarTrigger>
        <MenubarContent>
          <MenubarItem disabled>Wallpapers</MenubarItem>
          <MenubarItem disabled>Accounts</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      {/* ========== Contact ========== */}
      <MenubarMenu>
        <MenubarTrigger>Contact</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => window.open("https://x.com/anurag__kochar")}>Twitter</MenubarItem>
          <MenubarItem onClick={() => window.open("https://www.linkedin.com/in/anurag-kochar-527696242/")}>LinkedIn</MenubarItem>
          {/* <MenubarItem onClick={() => window.open("")}>Email</MenubarItem> */}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
