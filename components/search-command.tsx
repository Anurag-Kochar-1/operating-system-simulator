"use client";

import * as React from "react";
import { User, Image as ImageIcon, Info } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useApp } from "@/stores/use-app";
import { APPS } from "@/config/apps.config";
import { capitalizeFirstLetter, getIcon } from "@/utils";
import { APP_TYPES } from "@/constants/app-types.enum";
import { useSettingsStore } from "@/stores/use-settings";
import { SOCIALS } from "@/data/socials";
import XIcon from "./ui/icons/x";
import GithubIcon from "./ui/icons/github";

export function SearchCommand() {
  const addWindow = useApp((state) => state.addWindow);
  const setActiveTab = useSettingsStore((state) => state.setActiveTab);
  const isSearchCommandOpen = useApp((state) => state.isSearchCommandOpen);
  const setIsSearchCommandOpen = useApp(
    (state) => state.setIsSearchCommandOpen,
  );

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchCommandOpen(!isSearchCommandOpen);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setIsSearchCommandOpen(false);
    command();
  }, []);

  const handleSettingsItemOnClick = (
    tab: "about" | "wallpaper" | "profile",
  ) => {
    setActiveTab({
      id: tab,
      title: capitalizeFirstLetter(tab),
    });
    addWindow({
      id: "settings",
      title: "Settings",
      type: APP_TYPES.APP,
    });
  };

  return (
    <>
      <p className="text-sm text-muted-foreground">
        Press{" "}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>J
        </kbd>
      </p>
      <CommandDialog
        open={isSearchCommandOpen}
        onOpenChange={setIsSearchCommandOpen}
      >
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Apps">
            {APPS.map((app) => (
              <CommandItem
                key={app.id}
                onSelect={() =>
                  runCommand(() => {
                    addWindow({
                      id: app.id,
                      title: app.title,
                      type:
                        app.id === "car-game" ? APP_TYPES.GAME : APP_TYPES.APP,
                    });
                  })
                }
              >
                {getIcon(app.icon)}
                <span>{app.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem
              onSelect={() =>
                runCommand(() => handleSettingsItemOnClick("about"))
              }
            >
              <Info />
              <span>About</span>
            </CommandItem>
            <CommandItem
              onSelect={() =>
                runCommand(() => handleSettingsItemOnClick("wallpaper"))
              }
            >
              <ImageIcon />
              <span>Wallpaper</span>
            </CommandItem>
            <CommandItem
              onSelect={() =>
                runCommand(() => handleSettingsItemOnClick("profile"))
              }
            >
              <User />
              <span>Profile</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Socials">
            {SOCIALS.map((social) => (
              <CommandItem
                key={social.id}
                onSelect={() =>
                  runCommand(() => {
                    window.open(social.href, "_blank");
                  })
                }
              >
                {social.icon === "twitter" ? <XIcon /> : <GithubIcon />}
                <span>{social.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
