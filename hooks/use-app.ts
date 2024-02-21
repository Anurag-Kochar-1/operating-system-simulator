import { APP_TYPES } from "@/components/constants/app-types.enum";
import { APPS } from "@/config/apps.config";
import { PROJECTS } from "@/config/projects.config";
import { App, Window } from "@/types";
import { create } from "zustand";

type State = {
  windows: Window[];
  addWindow: (data: Window) => void;
  removeWindow: (id: string) => void;
  focusedWindow: Window | null;
  setFocusedWindow: (data: Window) => void;
  apps: Omit<App, "content">[];
  getAppContentById: (data: { id: string; type: APP_TYPES }) => JSX.Element;
};

export const useApp = create<State>()((set, get) => ({
  // 🟥 TODO: Make the default opened window dyanmic
  // { id: "0x", title: "About me", type: "APP" }
  windows: [],
  addWindow: (data) => {
    const isAlreadyAdded = get().windows.some((win) => win.id === data.id);
    if (isAlreadyAdded) {
      alert("Already added");
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
    const getDataByType = () => {
      switch (type) {
        case APP_TYPES.APP:
          return APPS;
        case APP_TYPES.PROJECT:
          return PROJECTS;
        default:
          return APPS;
      }
    };
    const content = getDataByType()?.filter((item) => item?.id === id)[0]
      ?.content;
    return content;
  },
}));
