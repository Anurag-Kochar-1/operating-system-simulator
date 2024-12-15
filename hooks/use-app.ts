import { APP_TYPES } from "@/constants/app-types.enum";
import { APPS } from "@/config/apps.config";
import { PROJECTS_BY_GROUPS } from "@/config/projects.config";
import { App, Wallpaper, Window } from "@/types";
import { create } from "zustand";
import { WALLPAPERS } from "@/config/wallpapers.config";

type State = {
  windows: Window[];
  addWindow: (data: Window) => void;
  removeWindow: (id: string) => void;
  focusedWindow: Window | null;
  setFocusedWindow: (data: Window) => void;
  apps: Omit<App, "content">[];
  getAppContentById: (data: {
    id: string;
    type: APP_TYPES;
  }) => JSX.Element | null;
  currentWallpaper: Wallpaper;
  setWallpaper: (data: Wallpaper) => void;

  selectedAppId: string | null;
  setSelectedAppId: (data: string | null) => void;
};

export const useApp = create<State>()((set, get) => ({
  // 🟥 TODO: Make the default opened window dyanmic
  // { id: "0x", title: "About me", type: "APP" }
  windows: [],
  addWindow: (data) => {
    const isAlreadyAdded = get().windows.some((win) => win.id === data.id);
    if (isAlreadyAdded) {
      set({ focusedWindow: data });
      return;
    }
    set((state) => ({ windows: [...state.windows, data] }));
    set({ focusedWindow: data });
  },
  removeWindow: (id) =>
    set((state) => ({
      windows: state.windows.filter((window) => window.id !== id),
    })),
  focusedWindow: null,
  setFocusedWindow: (data) => set({ focusedWindow: data }),
  apps: APPS.map(({ content, ...rest }) => rest),
  getAppContentById({ id, type }) {
    switch (type) {
      case APP_TYPES.APP:
        return APPS?.filter((item) => item?.id === id)[0]?.content;
      case APP_TYPES.PROJECT:
        for (const group of PROJECTS_BY_GROUPS) {
          for (const project of group.projects) {
            if (project.id === id) {
              return project.content;
            }
          }
        }
        return null;
      default:
        return null;
    }
  },
  currentWallpaper: WALLPAPERS[0],
  setWallpaper(data) {
    set({ currentWallpaper: data });
  },
  selectedAppId: null,
  setSelectedAppId(data) {
    set({ selectedAppId: data });
  },
}));
