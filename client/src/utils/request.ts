import axios from 'axios'
import { useLogin } from '@/hooks/useLogin'

const request = axios.create({
    baseURL: import.meta.env.VITE_DEV_BASE_URL,
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

request.interceptors.request.use(
    (config) => {
        const { isLogin, user } = useLogin()
        if (isLogin.value) {
            config.headers.Authorization = `Bearer ${user.value.accessToken}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

request.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default request
