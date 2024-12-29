
import { useMutation } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { useAuth } from '@/stores/use-auth'
import { useRouter } from 'next/navigation'
import { toast } from '@/hooks/use-toast'
import { AuthResponse, LoginRequest, RegisterRequest } from '@/types/auth'
import { ApiResponse } from '@/utils/api-response'


interface AuthHookOptions {
    onSuccess?: () => void;
    onError?: () => void;
}


export function useRegister(callbacks?: AuthHookOptions) {
    const router = useRouter()
    const setAuth = useAuth((state) => state.setAuth)

    return useMutation({
        mutationFn: async (data: RegisterRequest) => {
            const response = await api.post<ApiResponse<AuthResponse>>('/api/v1/user/signup', data, {
                withCredentials: true
            })
            return response.data
        },
        onSuccess: (response) => {
            if (response.data?.user) {
                setAuth(response.data.user)
                toast({
                    title: 'Success',
                    description: response.statusMessage,
                })

                if (callbacks?.onSuccess) {
                    callbacks?.onSuccess()
                }
                router.push('/')
            }
        },
        onError: (error: any) => {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: error.response?.data?.statusMessage || 'Registration failed',
            })
            if (callbacks?.onError) {
                callbacks?.onError()
            }
        },
    })
}

export function useLogin(callbacks?: AuthHookOptions) {
    const router = useRouter()
    const setAuth = useAuth((state) => state.setAuth)

    return useMutation({
        mutationFn: async (data: LoginRequest) => {
            const response = await api.post<ApiResponse<AuthResponse>>('/auth/login', data, {
                withCredentials: true
            })
            return response.data
        },
        onSuccess: (response) => {
            if (response.data?.user) {
                setAuth(response.data.user)
                toast({
                    title: 'Success',
                    description: response.statusMessage,
                })
                if (callbacks?.onSuccess) {
                    callbacks?.onSuccess()
                }
                router.push('/')
            }
        },
        onError: (error: any) => {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: error.response?.data?.statusMessage || 'Login failed',
            })

            if (callbacks?.onSuccess) {
                callbacks?.onSuccess()
            }
        },
    })
}

export function useGuestLogin(callbacks?: AuthHookOptions) {
    const router = useRouter()
    const { setAuth } = useAuth()

    return useMutation({
        mutationFn: async () => {
            const response = await api.post<ApiResponse<AuthResponse>>('/auth/guest', undefined, {
                withCredentials: true
            })
            return response.data
        },
        onSuccess: (response) => {
            if (response.data?.user) {
                setAuth(response.data.user)
                toast({
                    title: 'Welcome, Guest!',
                    description: 'You are logged in as a guest user',
                })

                if (callbacks?.onSuccess) {
                    callbacks.onSuccess()
                }
                router.push('/')
            }
        },
        onError: (error: any) => {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: error.response?.data?.statusMessage || 'Guest login failed',
            })
            if (callbacks?.onError) {
                callbacks.onError()
            }
        },
    })
}

export function useLogout(callbacks?: AuthHookOptions) {
    const router = useRouter()
    const { logout } = useAuth()

    return useMutation({
        mutationFn: async () => {
            const response = await api.post<ApiResponse<null>>('/auth/logout')
            return response.data
        },
        onSuccess: () => {
            logout()
            router.push('/')
            if (callbacks?.onSuccess) {
                callbacks?.onSuccess()
            }
        },
        onError: (error: any) => {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: error.response?.data?.statusMessage || 'Logout failed',
            })
            if (callbacks?.onError) {
                callbacks?.onError()
            }
        }
    })
}
