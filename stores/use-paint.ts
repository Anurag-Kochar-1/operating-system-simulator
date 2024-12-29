import { create } from 'zustand'

type Tool = "brush" | "eraser" | "rectangle" | "circle";

interface PaintState {
    tool: Tool;
    color: string;
    brushSize: number;
    history: ImageData[];
    historyIndex: number;
    isDrawing: boolean;
    actions: {
        setTool: (tool: Tool) => void;
        setColor: (color: string) => void;
        setBrushSize: (size: number) => void;
        setIsDrawing: (isDrawing: boolean) => void;
        addToHistory: (state: ImageData) => void;
        setHistoryIndex: (index: number) => void;
        undo: () => void;
        redo: () => void;
    }
}

export const usePaintStore = create<PaintState>((set, get) => ({
    tool: "brush",
    color: "#000000",
    brushSize: 5,
    history: [],
    historyIndex: -1,
    isDrawing: false,

    actions: {
        setTool: (tool) => set({ tool }),
        setColor: (color) => set({ color }),
        setBrushSize: (brushSize) => set({ brushSize }),
        setIsDrawing: (isDrawing) => set({ isDrawing }),

        addToHistory: (state) => {
            const { historyIndex, history } = get();
            const newHistory = history.slice(0, historyIndex + 1);
            newHistory.push(state);
            set({
                history: newHistory,
                historyIndex: newHistory.length - 1
            });
        },

        setHistoryIndex: (index) => set({ historyIndex: index }),

        undo: () => {
            const { historyIndex } = get();
            if (historyIndex > 0) {
                set({ historyIndex: historyIndex - 1 });
            }
        },

        redo: () => {
            const { historyIndex, history } = get();
            if (historyIndex < history.length - 1) {
                set({ historyIndex: historyIndex + 1 });
            }
        },
    },
}));