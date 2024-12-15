import { User } from '@/types/auth'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
    isAuthenticated: boolean
    user: User | null
    setAuth: (user: User) => void
    logout: () => void
    isLoading: boolean
    setLoading: (loading: boolean) => void

}

export const useAuth = create<AuthState>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            user: null,
            isLoading: true,
            setAuth: (user) => set({ isAuthenticated: true, user, isLoading: false }),
            setLoading: (loading) => set({ isLoading: loading }),
            logout: () => set({ isAuthenticated: false, user: null, isLoading: false }),
        }),
        {
            name: 'auth-storage',
        }
    )
)