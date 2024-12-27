"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useGuestLogin } from "@/hooks/use-authentication";
import { useAuth } from "@/store/use-auth";
import { RegisterModal } from "./register-modal";
import { LoginModal } from "./login-modal";
import useMediaQuery from "@/hooks/use-media-query";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export function GettingStarted() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);

  const { isAuthenticated } = useAuth();
  const { mutate: loginAsGuest, isPending: isLoginasGuestPending } =
    useGuestLogin();

  const handleRegister = () => {
    setIsRegisterOpen(true);
  };

  if (isAuthenticated) {
    return null;
  }

  if (!isDesktop) {
    return (
      <>
        <Drawer>
          <DrawerTrigger asChild>
            <Button className="h-7 text-xs"> Get Started </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerFooter>
              <Button
                onClick={handleRegister}
                disabled={isLoginasGuestPending}
                size={"icon"}
                className="w-full px-4 text-xs"
              >
                Register
              </Button>
              <Button
                variant="outline"
                onClick={() => loginAsGuest()}
                disabled={isLoginasGuestPending}
                size={"icon"}
                className="w-full px-4 text-xs"
              >
                {isLoginasGuestPending
                  ? "Creating guest account..."
                  : "Continue as Guest"}
              </Button>

            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <RegisterModal
          isOpen={isRegisterOpen}
          onClose={() => setIsRegisterOpen(false)}
          onLoginClick={() => setIsLoginOpen(true)}
        />

        <LoginModal
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          onRegisterClick={() => setIsRegisterOpen(true)}
        />
      </>
    );
  }

  return (
    <>
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onLoginClick={() => setIsLoginOpen(true)}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onRegisterClick={() => setIsRegisterOpen(true)}
      />
      <div className="flex items-center justify-center gap-2">
        <Button
          onClick={handleRegister}
          disabled={isLoginasGuestPending}
          size={"icon"}
          className="h-7 w-max px-4 text-xs"
        >
          Register
        </Button>
        <Button
          variant="outline"
          onClick={() => loginAsGuest()}
          disabled={isLoginasGuestPending}
          size={"icon"}
          className="h-7 w-max px-4 text-xs"
        >
          {isLoginasGuestPending
            ? "Creating guest account..."
            : "Continue as Guest"}
        </Button>
      </div>
    </>
  );
}
