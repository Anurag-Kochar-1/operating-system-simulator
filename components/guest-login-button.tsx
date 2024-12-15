"use client";
    
import { Button } from "@/components/ui/button";
import { useGuestLogin } from "@/hooks/use-authentication";

export function GuestLoginButton() {
  const { mutate: loginAsGuest, isPending } = useGuestLogin();

  return (
    <Button
      variant="secondary"
      onClick={() => loginAsGuest()}
      disabled={isPending}
      className="w-full"
    >
      {isPending ? "Creating guest account..." : "Continue as Guest"}
    </Button>
  );
}
