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
            config.headers.Authorization = user.value.accessToken
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

request.interceptors.response.use(
    (response) => {
        const { status } = response

        switch (status) {
            case 401:
                // 未登录
                console.log('未登录')
                break
            case 403:
                // 无权限
                break
            case 404:
                // 资源不存在
                break
            case 500:
                // 服务器错误
                break
        }
        return response.data
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default request
