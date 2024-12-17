"use client";

import { useInitialSettings } from "@/hooks/use-initial-settings";

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const { isLoading } = useInitialSettings();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="font-medium italic">Apply settings...</p>
      </div>
    );
  }

  return <>{children}</>;
}
