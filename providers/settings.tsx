"use client";

import { useInitialSettings } from "@/hooks/use-initial-settings";

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  useInitialSettings();
  return <>{children}</>;
}
