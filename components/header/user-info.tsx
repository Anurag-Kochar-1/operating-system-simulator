"use client";

import { useAuth } from "@/store/use-auth";
import { useCheckAuth } from "@/hooks/use-check-auth";
import { Button } from "../ui/button";
import { useLogout } from "@/hooks/use-authentication";

export function UserInfo() {
  const { isAuthenticated, user } = useAuth();
  const { mutate: logout, isPending } = useLogout();
  useCheckAuth();

  if (!isAuthenticated || !user) {
    return <span>No user</span>;
  }

  return (
    <>
      <span className="font-medium">
        {user.email} - {user.name}
      </span>
      <Button variant="outline" onClick={() => logout()} disabled={isPending}>
        {isPending ? "Logging out..." : "Logout"}
      </Button>
    </>
  );
}
