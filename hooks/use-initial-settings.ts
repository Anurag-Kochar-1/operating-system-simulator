import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { api } from "@/lib/axios";
import { useApp } from "@/stores/use-app";
import { useAuth } from "@/stores/use-auth";

interface Settings {
  wallpaper: {
    thumbnail: string;
  } | null;
  theme: string;
}

interface SettingsResponse {
  data: Settings;
  statusMessage: string;
}

export function useInitialSettings() {
  const setWallpaper = useApp((state) => state.setWallpaper);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  const {
    data: response,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      const response = await api.get<SettingsResponse>("/settings");
      return response.data;
    },
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (response?.data?.wallpaper) {
      setWallpaper(response.data.wallpaper.thumbnail);
    }
  }, [response, setWallpaper]);

  return { isLoading, error };
}
