export interface SettingsResponse {
    id: string;
    theme: string;
    wallpaperId: string | null;
    wallpaper: {
        id: string;
        name: string;
        thumbnail: string;
    } | null;
}

export interface UpdateSettingsRequest {
    theme?: string;
    wallpaperId?: string | null;
}

export interface SidebarNavItem {
    id: string;
    title: string;
}