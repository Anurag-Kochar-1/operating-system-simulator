// hooks/use-initial-settings.ts
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { api } from '@/lib/axios';
import { useApp } from '@/store/use-app';

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

    const { data: response, isLoading, error } = useQuery({
        queryKey: ['settings'],
        queryFn: async () => {
            const response = await api.get<SettingsResponse>('/settings');
            return response.data;
        }
    });

    useEffect(() => {
        if (response?.data?.wallpaper) {
            setWallpaper(response.data.wallpaper.thumbnail);
        }
    }, [response, setWallpaper]);

    return { isLoading, error };
}