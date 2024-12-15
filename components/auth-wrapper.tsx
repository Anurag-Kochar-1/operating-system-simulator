"use client";

import { useAuth } from "@/store/use-auth";
import { useCheckAuth } from "@/hooks/use-check-auth";
import { Loader2 } from "lucide-react";

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { isLoading } = useAuth();
  useCheckAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 size={45} className="animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
