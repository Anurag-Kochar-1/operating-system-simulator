import { Check } from "lucide-react";
import { useApp } from "@/stores/use-app";
import { useUpdateSettings } from "@/hooks/use-settings";
import { useToast } from "@/hooks/use-toast";
import { useWallpapers } from "@/hooks/use-wallpapers";
import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";
import { RefreshCcw } from "lucide-react";
import { Wallpaper } from "@prisma/client";
import { useAuth } from "@/stores/use-auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export const WallpapersSection = () => {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const setWallpaper = useApp((state) => state.setWallpaper);
  const wallpaperUrl = useApp((state) => state.currentWallpaper);
  const { toast } = useToast();
  const { setTheme } = useTheme();
  const { data: wallpapers, isLoading, error, refetch } = useWallpapers();
  const { mutateAsync: updateSettings } = useUpdateSettings();

  const handleWallpaperSelect = async (wallpaper: Wallpaper) => {
    if (!isAuthenticated) {
      alert("Please login to apply wallpaper");
      return;
    }
    try {
      setWallpaper(wallpaper.thumbnail);
      setTheme(wallpaper.recommendedTheme.toLowerCase());

      await updateSettings({
        wallpaperId: wallpaper.id,
        theme: wallpaper.recommendedTheme,
      });

      toast({
        title: "Success",
        description: "Wallpaper and theme updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update wallpaper",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="grid w-full auto-rows-auto grid-cols-12 gap-4">
        {[1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className="col-span-full aspect-video animate-pulse rounded-lg bg-muted lg:col-span-6"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="flex flex-col items-center gap-4">
        <AlertDescription>
          Failed to load wallpapers: {error?.message}
        </AlertDescription>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          className="flex items-center gap-2"
        >
          <RefreshCcw className="h-4 w-4" />
          Try Again
        </Button>
      </Alert>
    );
  }

  if (wallpapers?.data?.length === 0) {
    return (
      <Alert variant="destructive" className="mx-auto max-w-md">
        <AlertTitle>Not found</AlertTitle>
        <AlertDescription>
          No wallpapers found. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }
  return (
    <div className="grid w-full auto-rows-auto grid-cols-12 gap-4">
      {wallpapers?.data?.map((wallpaper) => (
        <div
          key={wallpaper.id}
          className="relative col-span-full flex aspect-video h-full w-full flex-col items-start justify-start gap-2 overflow-hidden rounded-lg border-2 object-cover transition-all hover:cursor-pointer hover:border-primary lg:col-span-6"
        >
          <Image
            src={wallpaper.thumbnail}
            onClick={() => handleWallpaperSelect(wallpaper)}
            className="h-full w-full"
            width={450}
            height={450}
            alt={`${wallpaper.name} wallpaper`}
          />
          {wallpaperUrl === wallpaper.thumbnail && (
            <Check className="absolute left-1/2 top-1/2 z-10 h-8 w-8 -translate-x-1/2 -translate-y-1/2 text-white" />
          )}
        </div>
      ))}
    </div>
  );
};
