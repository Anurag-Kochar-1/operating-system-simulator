import { api } from "@/lib/axios";
import { Settings, Theme } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface SettingsResponse {
    data: Settings;
    statusMessage: string;
}

interface UpdateSettingsParams {
    wallpaperId: string;
    theme: Theme;
}

export function useUpdateSettings() {
    const queryClient = useQueryClient();

    return useMutation<SettingsResponse, Error, UpdateSettingsParams>({
        mutationFn: async ({ wallpaperId, theme }: UpdateSettingsParams) => {
            const response = await api.patch<SettingsResponse>('/settings', {
                wallpaperId,
                theme
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['settings'] });
        }
    });
}
