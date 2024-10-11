import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";

export function Menu() {
  return (
    <Menubar className="border-none">
      {/* ========== Portfolio ========== */}
      <MenubarMenu>
        <MenubarTrigger>Portfolio</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>About</MenubarItem>
          <MenubarItem>Experience</MenubarItem>
          <MenubarItem>Projects</MenubarItem>
          <MenubarItem>Skills</MenubarItem>
          <MenubarItem>Eudcation</MenubarItem>
          <MenubarItem>Resume</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      {/* ========== Games ========== */}
      <MenubarMenu>
        <MenubarTrigger>Games</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Car Racing</MenubarItem>
          <MenubarItem>DOOM</MenubarItem>
          <MenubarItem>Chess</MenubarItem>
          <MenubarItem disabled>GTA 6</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      {/* ========== Settings ========== */}
      <MenubarMenu>
        <MenubarTrigger>Settings</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Wallpapers</MenubarItem>
          <MenubarItem disabled>Accounts</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      {/* ========== Contact ========== */}
      <MenubarMenu>
        <MenubarTrigger>Contact</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Twitter</MenubarItem>
          <MenubarItem>LinkedIn</MenubarItem>
          <MenubarItem>Email</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
