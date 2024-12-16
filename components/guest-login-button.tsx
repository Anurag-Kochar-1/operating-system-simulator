import { useGuestLogin } from "@/hooks/use-authentication";
import { Button } from "./ui/button";

interface GuestLoginButtonProps {
  onSuccess?: () => void;
}

export function GuestLoginButton({ onSuccess }: GuestLoginButtonProps) {
  const { mutate: loginAsGuest, isPending } = useGuestLogin({
    onSuccess: () => {
      onSuccess?.();
    },
  });

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
