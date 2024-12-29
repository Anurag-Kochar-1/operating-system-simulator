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

export function UserInfo() {
  const { isAuthenticated, user } = useAuth();
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
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem onClick={() => window.open(`https://github.com/Anurag-Kochar-1/operating-system-simulator`)}>Github <ExternalLink size={5} /> </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logout()} disabled={isPending} className="text-destructive">
          {isPending ? "Logging out..." : "Log out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
