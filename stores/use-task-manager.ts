import { create } from 'zustand';
import { ProcessData, Window } from '@/types';
import { APP_TYPES } from '@/constants/app-types.enum';

interface TaskManagerState {
    processes: ProcessData[];
    updateProcessData: () => void;
    addNewProcesses: (windows: Window[]) => void;
    removeProcess: (id: string) => void;
}

const defaultProcesses: ProcessData[] = [
    {
        id: '1',
        title: 'System',
        type: APP_TYPES.APP,
        status: 'Running',
        cpuUsage: 0.1,
        memoryUsage: 150,
        diskUsage: 0.2,
        networkUsage: 0.1,
        gpuUsage: 0,
        gpuEngine: 'N/A',
        powerUsage: 'Very low',
        powerUsageTrend: 'stable'
    }
];

const getRandomValue = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
};

const getPowerUsage = (cpuUsage: number): string => {
    if (cpuUsage < 5) return 'Very low';
    if (cpuUsage < 15) return 'Low';
    if (cpuUsage < 30) return 'Medium';
    if (cpuUsage < 50) return 'High';
    return 'Very high';
};

const getPowerTrend = (prev: number, current: number): 'up' | 'down' | 'stable' => {
    if (current > prev + 2) return 'up';
    if (current < prev - 2) return 'down';
    return 'stable';
};

const getNetworkUsage = () => {
    // Generate network usage with one decimal place from 0.1 to 2.0
    return Number((Math.floor(getRandomValue(1, 20)) / 10).toFixed(1));
};

const createInitialProcessData = (window: Window): ProcessData => {
    const initialCpuUsage = getRandomValue(0, 20);
    return {
        ...window,
        status: 'Running',
        cpuUsage: initialCpuUsage,
        memoryUsage: getRandomValue(100, 1000),
        diskUsage: getRandomValue(0, 5),
        networkUsage: getNetworkUsage(),
        gpuUsage: window.type === APP_TYPES.GAME ? getRandomValue(30, 45) : getRandomValue(0, 5),
        gpuEngine: window.type === APP_TYPES.GAME ? '3D' : 'N/A',
        powerUsage: getPowerUsage(initialCpuUsage),
        powerUsageTrend: 'stable'
    };
};

export const useTaskManager = create<TaskManagerState>((set, get) => ({
    processes: defaultProcesses,
    updateProcessData: () => {
        set((state) => ({
            processes: state.processes.map(process => {
                const prevCpuUsage = process.cpuUsage;
                const newCpuUsage = getRandomValue(
                    Math.max(0, prevCpuUsage - 5),
                    Math.min(100, prevCpuUsage + 5)
                );

                return {
                    ...process,
                    cpuUsage: parseFloat(newCpuUsage.toFixed(1)),
                    memoryUsage: parseFloat(getRandomValue(100, 3000).toFixed(0)),
                    diskUsage: parseFloat(getRandomValue(0, 10).toFixed(1)),
                    networkUsage: getNetworkUsage(),
                    gpuUsage: process.type === APP_TYPES.GAME ?
                        parseFloat(getRandomValue(30, 60).toFixed(1)) :
                        parseFloat(getRandomValue(0, 10).toFixed(1)),
                    powerUsage: getPowerUsage(newCpuUsage),
                    powerUsageTrend: getPowerTrend(prevCpuUsage, newCpuUsage)
                };
            })
        }));
    },
    addNewProcesses: (windows: Window[]) => {
        set((state) => {
            const existingIds = new Set(state.processes.map(p => p.id));
            const newWindows = windows.filter(w => !existingIds.has(w.id));

            if (newWindows.length === 0) return state;

            return {
                processes: [
                    ...state.processes,
                    ...newWindows.map(createInitialProcessData)
                ]
            };
        });
    },
    removeProcess: (id: string) => {
        set((state) => ({
            processes: state.processes.filter(process =>
                process.id === '1' || process.id !== id
            )
        }));
    }
}));