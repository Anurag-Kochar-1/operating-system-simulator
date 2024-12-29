import { SidebarNavItem } from '@/types/settings'
import { create } from 'zustand'

interface StoreState {
    activeTab: SidebarNavItem
    setActiveTab: (activeTab: SidebarNavItem) => void
}

export const useSettingsStore = create<StoreState>((set) => ({
    activeTab: { id: 'about', title: 'About' },
    setActiveTab: (activeTab) => set({ activeTab }),
}))
