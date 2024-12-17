import { api } from "@/lib/axios";
import type { Wallpaper } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

interface WallpaperResponse {
    data: Wallpaper[];
    statusMessage: string;
}


export function useWallpapers() {
    return useQuery<WallpaperResponse, Error>({
        queryKey: ['wallpapers'],
        queryFn: async () => {
            const response = await api.get<WallpaperResponse>('/wallpapers');
            return response.data;
        }
    });

}