import { useAuth } from '@/store/use-auth'
import axios from 'axios'

export const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true 
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            useAuth.getState().logout()
        }
        return Promise.reject(error)
    }
)