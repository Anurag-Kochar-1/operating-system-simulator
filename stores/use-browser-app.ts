import { BrowserHistoryEntry, BrowserStatus } from '@/types/browser';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface BrowserState {
    history: BrowserHistoryEntry[];
    currentIndex: number;
    defaultUrl: string;
    status: BrowserStatus;
    setHistory: (history: BrowserHistoryEntry[]) => void;
    addToHistory: (entry: BrowserHistoryEntry) => void;
    goBack: () => void;
    goForward: () => void;
    goHome: (callback: () => void) => void;
    getCurrentUrl: () => string;
    setStatus: (status: BrowserStatus) => void;
}
export const useBrowserStore = create<BrowserState>()(
    devtools((set, get) => ({
        history: [{ url: 'https://www.anuragkochar.com', title: 'anuragkochar' }],
        currentIndex: 0,
        defaultUrl: 'https://www.anuragkochar.com',
        status: {
            isLoading: false,
            error: null,
        },

        setHistory: (history) => set({ history }),

        addToHistory: (entry) => set((state) => {
            const newHistory = [...state.history.slice(0, state.currentIndex + 1), entry];
            return {
                history: newHistory,
                currentIndex: newHistory.length - 1,
            };
        }),

        goBack: () => set((state) => ({
            currentIndex: Math.max(0, state.currentIndex - 1),
        })),

        goForward: () => set((state) => ({
            currentIndex: Math.min(state.history.length - 1, state.currentIndex + 1),
        })),

        goHome: () => set((state) => {
            const homeEntry = { url: state.defaultUrl, title: 'Home' };
            return {
                history: [...state.history, homeEntry],
                currentIndex: state.history.length,
            };
        }),

        getCurrentUrl: () => {
            const state = get();
            return state.history[state.currentIndex]?.url || state.defaultUrl;
        },

        setStatus: (status) => set({ status }),
    }))
);
