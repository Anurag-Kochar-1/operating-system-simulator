"use client";
import { useCheckAuth } from "@/hooks/use-check-auth";

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  useCheckAuth();
  return <>{children}</>;
}
