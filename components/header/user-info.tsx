"use client";

import { useAuth } from "@/stores/use-auth";
import { useCheckAuth } from "@/hooks/use-check-auth";
import { Button } from "../ui/button";
import { useLogout } from "@/hooks/use-authentication";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ExternalLink, User } from "lucide-react";
import { useApp } from "@/stores/use-app";
import { useSettingsStore } from "@/stores/use-settings";
import { APP_TYPES } from "@/constants/app-types.enum";

export function UserInfo() {
  const addWindow = useApp((state) => state.addWindow);
  const setActiveTab = useSettingsStore((state) => state.setActiveTab);
  const { mutate: logout, isPending } = useLogout();
  useCheckAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"icon"} variant={"outline"} className="h-7 w-7">
          {" "}
          <User size={15} />{" "}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            setActiveTab({ id: "profile", title: "Profile" });
            addWindow({
              id: "settings",
              title: "Settings",
              type: APP_TYPES.APP,
            });
          }}
        >
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setActiveTab({ id: "about", title: "About" });
            addWindow({
              id: "settings",
              title: "Settings",
              type: APP_TYPES.APP,
            });
          }}
        >
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            window.open(
              `https://github.com/Anurag-Kochar-1/operating-system-simulator`,
            )
          }
        >
          Github <ExternalLink size={5} />{" "}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => logout()}
          disabled={isPending}
          className="text-destructive"
        >
          {isPending ? "Logging out..." : "Log out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
