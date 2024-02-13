import { APPS } from "@/config/apps.config";
import { App, Window } from "@/types";
import { create } from "zustand";

type State = {
  windows: Window[];
  addWindow: (data: Window) => void;
  removeWindow: (id: string) => void;
  focusedWindow: Window | null;
  setFocusedWindow: (data: Window) => void;
  apps: App[];
};

export const useApp = create<State>()((set, get) => ({
  windows: [],
  addWindow: (data) => set((state) => ({ windows: [...state.windows, data] })),
  removeWindow: (id) =>
    set((state) => ({
      windows: state.windows.filter((window) => window.id !== id),
    })),
  focusedWindow: null,
  setFocusedWindow: (data) => set({ focusedWindow: data }),
  apps: APPS,
}));
