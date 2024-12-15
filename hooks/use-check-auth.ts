import { useEffect } from 'react'
import { useAuth } from '@/store/use-auth'
import { api } from '@/lib/axios'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function useCheckAuth() {
    const { setAuth, setLoading, logout } = useAuth()

    useEffect(() => {
        const checkAuth = async () => {
            await sleep(1500)
            try {
                const response = await api.get('/auth/me')
                if (response.data?.data?.user) {
                    setAuth(response.data.data.user)
                } else {
                    logout()
                }
            } catch (error) {
                logout()
            } finally {
                setLoading(false)
            }
        }

        checkAuth()
    }, [setAuth, setLoading, logout])
}