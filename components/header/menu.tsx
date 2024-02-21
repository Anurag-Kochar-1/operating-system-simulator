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
      {/* ========== Finder ========== */}
      <MenubarMenu>
        <MenubarTrigger>Finder</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>About Finder</MenubarItem>
          <MenubarItem>Preferences</MenubarItem>
          <MenubarItem>Empty Trash</MenubarItem>
          <MenubarItem>Hide Finder</MenubarItem>
          <MenubarItem>Hide Others</MenubarItem>
          <MenubarItem>Show All</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      {/* ========== File ========== */}
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>New File Window</MenubarItem>
          <MenubarItem>New Window</MenubarItem>
          <MenubarItem disabled>New Folder with Selection</MenubarItem>
          <MenubarItem>New Smart Folder</MenubarItem>
          <MenubarItem>New tab</MenubarItem>
          <MenubarItem disabled>Open</MenubarItem>
          <MenubarItem disabled>Open With</MenubarItem>
          <MenubarItem disabled>Print</MenubarItem>
          <MenubarItem disabled>Close Window</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      {/* ========== Edit ========== */}
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem disabled>Undo</MenubarItem>
          <MenubarItem disabled>Redo</MenubarItem>
          <MenubarItem disabled>Cut</MenubarItem>
          <MenubarItem disabled>Copy</MenubarItem>
          <MenubarItem disabled>Paste</MenubarItem>
          <MenubarItem disabled>Paste All</MenubarItem>
          <MenubarItem>Show Clipboard</MenubarItem>
          <MenubarItem>Start Clipboard</MenubarItem>
          <MenubarItem>Emojis & Symbols</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      {/* ========== View ========== */}
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarItem disabled>As Icons</MenubarItem>
          <MenubarItem disabled>As List</MenubarItem>
          <MenubarItem disabled>As Columns</MenubarItem>
          <MenubarItem disabled>As Gallery</MenubarItem>
          <MenubarItem>Use Stacks</MenubarItem>
          <MenubarItem>Sort by</MenubarItem>
          <MenubarItem>Clean Up</MenubarItem>
          <MenubarItem>Clean Up By</MenubarItem>
          <MenubarItem disabled>Hide Sidebar</MenubarItem>
          <MenubarItem disabled>Hide Preview</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
